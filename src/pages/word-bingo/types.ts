export type WordGameStatus = "waiting" | "playing" | "finished";

export interface WordGamePlayer {
  socketId: string;
  name: string;
  isHost: boolean;
}

export interface WordGameStatePayload {
  roomId: string;
  status: WordGameStatus;
  players: WordGamePlayer[];
  calledWords: string[];
  winnerSocketId: string | null;
  winnerName: string | null;
  categoryName: string | null;
}

export interface WordCalledPayload {
  roomId: string;
  word: string;
  calledWords: string[];
}

export interface WordCardPayload {
  card: (string | null)[];
  marked: number[];
}

export interface WordBingoResultPayload {
  valid: boolean;
  roomId: string;
  claimantSocketId: string;
  claimantName: string;
  winnerSocketId?: string;
  winnerName?: string;
  message: string;
}
