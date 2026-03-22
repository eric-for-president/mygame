import { createServer } from "node:http";
import { Server } from "socket.io";

const PORT = Number(process.env.BINGO_PORT || 4001);
const MAX_NUM = 75;
const WIN_LINES = (() => {
  const lines = [];
  for (let r = 0; r < 5; r += 1) {
    lines.push([0, 1, 2, 3, 4].map((c) => r * 5 + c));
  }
  for (let c = 0; c < 5; c += 1) {
    lines.push([0, 1, 2, 3, 4].map((r) => r * 5 + c));
  }
  lines.push([0, 6, 12, 18, 24]);
  lines.push([4, 8, 12, 16, 20]);
  return lines;
})();

/** @typedef {{ cardId: string, card: (number | null)[], marked: Set<number> }} CardState */
/** @typedef {{ socketId: string, name: string, cards: CardState[] }} PlayerState */
/** @typedef {{ id: string, status: "waiting"|"playing"|"finished", players: Map<string, PlayerState>, drawnNumbers: number[], remainingNumbers: number[], winnerSocketId: string | null, hostSocketId: string | null }} RoomState */

/** @type {Map<string, RoomState>} */
const rooms = new Map();

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getRange(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function pickUniqueFromRange(start, end, count) {
  return shuffle(getRange(start, end)).slice(0, count);
}

function createCard() {
  const columns = [
    pickUniqueFromRange(1, 15, 5),
    pickUniqueFromRange(16, 30, 5),
    pickUniqueFromRange(31, 45, 4),
    pickUniqueFromRange(46, 60, 5),
    pickUniqueFromRange(61, 75, 5),
  ];

  const card = Array(25).fill(null);
  for (let c = 0; c < 5; c += 1) {
    for (let r = 0; r < 5; r += 1) {
      const idx = r * 5 + c;
      if (idx === 12) {
        card[idx] = null;
        continue;
      }

      if (c === 2 && r > 1) {
        card[idx] = columns[c][r - 1];
      } else {
        card[idx] = columns[c][r];
      }
    }
  }

  return card;
}

function cardSignature(card) {
  return card.map((v) => (v === null ? "X" : String(v))).join("-");
}

function isWinningCard(card, calledSet) {
  for (const line of WIN_LINES) {
    const ok = line.every((idx) => {
      if (idx === 12) return true;
      const val = card[idx];
      return typeof val === "number" && calledSet.has(val);
    });

    if (ok) {
      return true;
    }
  }

  return false;
}

function createRoom(roomId, hostSocketId) {
  return {
    id: roomId,
    status: "waiting",
    players: new Map(),
    drawnNumbers: [],
    remainingNumbers: shuffle(Array.from({ length: MAX_NUM }, (_, i) => i + 1)),
    winnerSocketId: null,
    hostSocketId,
  };
}

function getOrCreateRoom(roomId, hostSocketId) {
  const existing = rooms.get(roomId);
  if (existing) return existing;
  const room = createRoom(roomId, hostSocketId);
  rooms.set(roomId, room);
  return room;
}

function sanitizeRoomId(roomId) {
  const normalized = String(roomId || "").trim().toUpperCase();
  return normalized || "MAIN";
}

function serializeRoom(room) {
  const winnerPlayer = room.winnerSocketId ? room.players.get(room.winnerSocketId) : null;

  return {
    roomId: room.id,
    status: room.status,
    drawnNumbers: room.drawnNumbers,
    winnerSocketId: room.winnerSocketId,
    winnerName: winnerPlayer ? winnerPlayer.name : null,
    players: [...room.players.values()].map((player) => ({
      socketId: player.socketId,
      name: player.name,
      isHost: room.hostSocketId === player.socketId,
    })),
  };
}

function emitRoomState(io, room) {
  io.to(room.id).emit("game_state", serializeRoom(room));
}

function createUniqueCardsForRoom(room, count) {
  const signatures = new Set();
  for (const player of room.players.values()) {
    for (const cardState of player.cards) {
      signatures.add(cardSignature(cardState.card));
    }
  }

  const cards = [];
  while (cards.length < count) {
    const card = createCard();
    const signature = cardSignature(card);
    if (signatures.has(signature)) {
      continue;
    }

    signatures.add(signature);
    cards.push(card);
  }

  return cards;
}

const httpServer = createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.writeHead(404);
  res.end();
});

const io = new Server(httpServer, {
  cors: {
    origin: process.env.BINGO_CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_game", (payload = {}) => {
    const roomId = sanitizeRoomId(payload.roomId);
    const name = String(payload.playerName || "Player").trim().slice(0, 24) || "Player";
    const requestedCardCount = Number(payload.cardCount || 1);
    const cardCount = Math.max(1, Math.min(3, requestedCardCount));

    const room = getOrCreateRoom(roomId, socket.id);
    socket.join(roomId);

    const cards = createUniqueCardsForRoom(room, cardCount).map((card, idx) => ({
      cardId: `${socket.id}-${idx + 1}`,
      card,
      marked: new Set([12]),
    }));

    room.players.set(socket.id, {
      socketId: socket.id,
      name,
      cards,
    });

    socket.emit(
      "your_card",
      cards.map((c) => ({ cardId: c.cardId, card: c.card, marked: [...c.marked] })),
    );

    emitRoomState(io, room);
  });

  socket.on("start_game", ({ roomId }) => {
    const room = rooms.get(sanitizeRoomId(roomId));
    if (!room || room.hostSocketId !== socket.id) return;

    if (room.status === "finished") {
      return;
    }

    room.status = "playing";
    emitRoomState(io, room);
  });

  socket.on("draw_number", ({ roomId }) => {
    const room = rooms.get(sanitizeRoomId(roomId));
    if (!room || room.hostSocketId !== socket.id) return;
    if (room.status === "finished" || room.remainingNumbers.length === 0) return;

    room.status = "playing";
    const nextNumber = room.remainingNumbers.pop();
    if (typeof nextNumber !== "number") return;

    room.drawnNumbers.push(nextNumber);
    io.to(room.id).emit("number_called", {
      roomId: room.id,
      number: nextNumber,
      drawnNumbers: room.drawnNumbers,
    });

    emitRoomState(io, room);
  });

  socket.on("mark_number", ({ roomId, cardId, index }) => {
    const room = rooms.get(sanitizeRoomId(roomId));
    if (!room) return;

    const player = room.players.get(socket.id);
    if (!player) return;

    const targetCard = player.cards.find((c) => c.cardId === cardId) || player.cards[0];
    if (!targetCard) return;

    const idx = Number(index);
    if (!Number.isInteger(idx) || idx < 0 || idx >= 25) return;

    if (idx === 12) {
      targetCard.marked.add(12);
      socket.emit("mark_updated", { cardId: targetCard.cardId, marked: [...targetCard.marked] });
      return;
    }

    const value = targetCard.card[idx];
    if (typeof value !== "number") return;

    const calledSet = new Set(room.drawnNumbers);
    if (!calledSet.has(value)) {
      socket.emit("mark_rejected", { cardId: targetCard.cardId, index: idx, reason: "Number has not been called yet." });
      return;
    }

    targetCard.marked.add(idx);
    socket.emit("mark_updated", { cardId: targetCard.cardId, marked: [...targetCard.marked] });
  });

  socket.on("bingo_claim", ({ roomId, cardId }) => {
    const room = rooms.get(sanitizeRoomId(roomId));
    if (!room) return;

    const player = room.players.get(socket.id);
    if (!player) return;

    const card = cardId ? player.cards.find((c) => c.cardId === cardId) : player.cards[0];
    if (!card) return;

    if (room.status !== "playing") {
      io.to(socket.id).emit("bingo_result", {
        valid: false,
        roomId: room.id,
        claimantSocketId: socket.id,
        claimantName: player.name,
        cardId: card.cardId,
        message: "Game is not in playing state.",
      });
      return;
    }

    const calledSet = new Set(room.drawnNumbers);
    const valid = isWinningCard(card.card, calledSet);

    if (!valid) {
      io.to(room.id).emit("bingo_result", {
        valid: false,
        roomId: room.id,
        claimantSocketId: socket.id,
        claimantName: player.name,
        cardId: card.cardId,
        message: `${player.name}'s Bingo claim was rejected.`,
      });
      return;
    }

    room.status = "finished";
    room.winnerSocketId = socket.id;

    io.to(room.id).emit("bingo_result", {
      valid: true,
      roomId: room.id,
      claimantSocketId: socket.id,
      claimantName: player.name,
      winnerSocketId: socket.id,
      winnerName: player.name,
      cardId: card.cardId,
      message: `${player.name} has Bingo!`,
    });

    emitRoomState(io, room);
  });

  socket.on("restart_game", ({ roomId }) => {
    const room = rooms.get(sanitizeRoomId(roomId));
    if (!room || room.hostSocketId !== socket.id) return;

    room.status = "waiting";
    room.drawnNumbers = [];
    room.remainingNumbers = shuffle(Array.from({ length: MAX_NUM }, (_, i) => i + 1));
    room.winnerSocketId = null;

    const signatures = new Set();
    for (const player of room.players.values()) {
      for (const cardState of player.cards) {
        let card = createCard();
        while (signatures.has(cardSignature(card))) {
          card = createCard();
        }
        signatures.add(cardSignature(card));
        cardState.card = card;
        cardState.marked = new Set([12]);
      }

      io.to(player.socketId).emit(
        "your_card",
        player.cards.map((c) => ({ cardId: c.cardId, card: c.card, marked: [...c.marked] })),
      );
    }

    emitRoomState(io, room);
  });

  socket.on("disconnect", () => {
    for (const [roomId, room] of rooms.entries()) {
      if (!room.players.has(socket.id)) {
        continue;
      }

      room.players.delete(socket.id);
      if (room.hostSocketId === socket.id) {
        const nextHost = room.players.values().next().value;
        room.hostSocketId = nextHost ? nextHost.socketId : null;
      }

      if (room.players.size === 0) {
        rooms.delete(roomId);
      } else {
        emitRoomState(io, room);
      }
    }
  });
});

httpServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Bingo server listening on http://localhost:${PORT}`);
});
