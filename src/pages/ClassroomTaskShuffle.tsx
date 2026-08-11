import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronLeft, RotateCcw, Shuffle, Sparkles, Trophy, Users } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import Confetti from "@/components/Confetti";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

const MANAGEMENT_STUDENTS = [
  "ANJELINA SHRESTHA",
  "ARVINDA REGMI",
  "BIRAJ SUNAR",
  "JANAKI BHANDARI",
  "NHUJA MAHARJAN",
  "NIJA MAHARJAN",
  "PRATIK WAIBA",
  "RITIKA SHRESTHA",
  "SAKAR BISHWAKARMA",
  "SAMPANNA BASNET",
  "SHAUNAK ACHARYA",
  "RAUNAK TANDUKAR",
  "SIMON RAMJALI",
  "SUSHIL MAHARJAN",
  "SUSHANT SHRESTHA",
  "VINIT BISTA",
];

const SCIENCE_STUDENTS = [
  "AADITYA RAJ SHAH",
  "ALISH OLI",
  "ARNOLD SHRESTHA",
  "AVIGYA RAJ UPRETI",
  "BIGYAN KHADKA",
  "BINISH MAHARJAN",
  "DEVIS MAHARJAN",
  "NAM O HANGMA RAI",
  "NITESH PRADHAN",
  "PARIESH BHUJEL",
  "PRABIN GOPALI",
  "PRAMIT MAHARJAN",
  "PRASANT BISTA",
  "PRASHANT NEPAL",
  "ROBERTO MAHARJAN",
  "SAFAL WAGLE",
  "SHREESH MAHARJAN",
  "SIJAN MAHARJAN",
  "SPARSH MAHARJAN",
];

const CLASSROOM_TASKS = [
  "Give a 30-second recap of the last lesson.",
  "Answer the teacher's bonus question.",
  "Share one useful idea with the class.",
  "Explain one key term from today's topic.",
  "Write the first answer on the board.",
  "Choose the next class activity.",
  "Ask the class one related question.",
  "Help keep score for the next round.",
  "Give a positive shout-out to a classmate.",
  "Solve one quick question chosen by the teacher.",
];

type GroupId = "management" | "science";

interface StudentGroup {
  id: GroupId;
  title: string;
  students: string[];
  description: string;
}

interface StudentMission {
  name: string;
  task: string;
}

const STUDENT_GROUPS: StudentGroup[] = [
  {
    id: "management",
    title: "Management",
    students: MANAGEMENT_STUDENTS,
    description: "Open the management student roster.",
  },
  {
    id: "science",
    title: "Science",
    students: SCIENCE_STUDENTS,
    description: "Open the science student roster.",
  },
];

const randomItem = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const ClassroomTaskShuffle = () => {
  const [activeGroupId, setActiveGroupId] = useState<GroupId | null>(null);
  const [remainingByGroup, setRemainingByGroup] = useState<Record<GroupId, string[]>>({
    management: MANAGEMENT_STUDENTS,
    science: SCIENCE_STUDENTS,
  });
  const [historyByGroup, setHistoryByGroup] = useState<Record<GroupId, StudentMission[]>>({
    management: [],
    science: [],
  });
  const [displayName, setDisplayName] = useState("Ready to shuffle");
  const [selectedMission, setSelectedMission] = useState<StudentMission | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearShuffleTimers = useCallback(() => {
    timersRef.current.forEach((timer) => {
      clearTimeout(timer);
      clearInterval(timer);
    });
    timersRef.current = [];
  }, []);

  useEffect(() => clearShuffleTimers, [clearShuffleTimers]);

  const activeGroup = activeGroupId
    ? STUDENT_GROUPS.find((group) => group.id === activeGroupId) ?? null
    : null;
  const activeStudents = activeGroupId ? remainingByGroup[activeGroupId] : [];
  const activeHistory = activeGroupId ? historyByGroup[activeGroupId] : [];
  const selectedCount = activeGroup ? activeGroup.students.length - activeStudents.length : 0;
  const isRoundComplete = activeGroup !== null && activeStudents.length === 0;

  const openGroup = (groupId: GroupId) => {
    if (isShuffling) return;
    setActiveGroupId(groupId);
    setDisplayName("Ready to shuffle");
    setSelectedMission(null);
    setShowConfetti(false);
    setAnimationKey((key) => key + 1);
  };

  const returnToGroups = () => {
    if (isShuffling) return;
    clearShuffleTimers();
    setActiveGroupId(null);
    setDisplayName("Ready to shuffle");
    setSelectedMission(null);
    setShowConfetti(false);
  };

  const chooseStudent = useCallback(() => {
    if (!activeGroupId || isShuffling || activeStudents.length === 0) return;

    const groupId = activeGroupId;
    const winner = randomItem(activeStudents);
    const mission: StudentMission = { name: winner, task: randomItem(CLASSROOM_TASKS) };
    const totalFlips = 24;
    const flipInterval = 120;
    let flip = 0;
    let lastPreview = "";

    clearShuffleTimers();
    setIsShuffling(true);
    setSelectedMission(null);
    setShowConfetti(false);

    const showNextName = () => {
      const previewPool = activeStudents.filter((student) => student !== winner);
      const candidates = (previewPool.length > 0 ? previewPool : activeStudents)
        .filter((student) => student !== lastPreview);
      const nextName = randomItem(candidates.length > 0 ? candidates : activeStudents);

      lastPreview = nextName;
      setDisplayName(nextName);
      setAnimationKey((key) => key + 1);
      flip += 1;
    };

    const revealWinner = () => {
      setDisplayName(winner);
      setAnimationKey((key) => key + 1);
      setRemainingByGroup((groups) => ({
        ...groups,
        [groupId]: groups[groupId].filter((student) => student !== winner),
      }));
      setHistoryByGroup((groups) => ({
        ...groups,
        [groupId]: [mission, ...groups[groupId]],
      }));
      setSelectedMission(mission);
      setIsShuffling(false);
      setShowConfetti(true);

      const confettiTimer = setTimeout(() => setShowConfetti(false), 4000);
      timersRef.current.push(confettiTimer);
    };

    showNextName();
    const ticker = setInterval(() => {
      showNextName();

      if (flip >= totalFlips) {
        clearInterval(ticker);
        const revealTimer = setTimeout(revealWinner, 360);
        timersRef.current.push(revealTimer);
      }
    }, flipInterval);

    timersRef.current.push(ticker);
  }, [activeGroupId, activeStudents, clearShuffleTimers, isShuffling]);

  const resetActiveGroup = () => {
    if (!activeGroup || isShuffling) return;

    clearShuffleTimers();
    setRemainingByGroup((groups) => ({ ...groups, [activeGroup.id]: activeGroup.students }));
    setHistoryByGroup((groups) => ({ ...groups, [activeGroup.id]: [] }));
    setDisplayName("Ready to shuffle");
    setSelectedMission(null);
    setIsShuffling(false);
    setShowConfetti(false);
    setAnimationKey((key) => key + 1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <ParticleBackground />
      {showConfetti && <Confetti />}

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-neon-pink/10 blur-[130px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[550px] w-[550px] rounded-full bg-neon-cyan/10 blur-[150px]" />
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-neon-purple/10 blur-[110px]" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-10">
        <header className="mb-10 flex items-center justify-between gap-4 animate-fade-in">
          <Link
            to="/"
            className="font-display text-xs font-bold tracking-[0.18em] text-muted-foreground transition-colors hover:text-neon-cyan sm:text-sm"
          >
            ← BACK TO GAMES
          </Link>
          <ThemeToggle />
        </header>

        <section className="mb-8 text-center animate-fade-in">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-neon-pink/30 bg-neon-pink/10 px-4 py-2 text-xs font-display font-bold tracking-[0.17em] text-neon-pink">
            <Sparkles className="h-4 w-4" /> CLASSROOM RANDOMIZER
          </div>
          <h1 className="font-display text-3xl font-black text-foreground text-glow-purple sm:text-5xl">
            Student Mission
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base text-muted-foreground sm:text-lg">
            Choose a group, open its student roster, then let the shuffle choose the next name.
          </p>
        </section>

        {!activeGroup ? (
          <section className="mx-auto grid w-full max-w-4xl gap-5 md:grid-cols-2">
            {STUDENT_GROUPS.map((group) => {
              const remaining = remainingByGroup[group.id].length;
              const selected = group.students.length - remaining;
              const isScience = group.id === "science";

              return (
                <article
                  key={group.id}
                  className={`glass-panel relative overflow-hidden p-6 sm:p-8 ${isScience ? "border-neon-cyan/30" : "border-neon-purple/30"}`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 ${isScience ? "bg-neon-cyan" : "bg-neon-purple"}`} />
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${isScience ? "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan" : "border-neon-purple/30 bg-neon-purple/10 text-neon-purple"}`}>
                      <Users className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-border bg-background/40 px-3 py-1 font-display text-xs font-bold tracking-[0.12em] text-muted-foreground">
                      {group.students.length} STUDENTS
                    </span>
                  </div>
                  <p className={`mb-2 font-display text-xs font-bold tracking-[0.22em] ${isScience ? "text-neon-cyan" : "text-neon-purple"}`}>STUDENT GROUP</p>
                  <h2 className="font-display text-2xl font-black text-foreground sm:text-3xl">{group.title}</h2>
                  <p className="mt-3 font-body text-base text-muted-foreground">{group.description}</p>
                  {group.id === "management" || group.id === "science" ? (
                    <div className={`mt-4 rounded-xl border p-3 ${isScience ? "border-neon-cyan/20 bg-background/40" : "border-neon-purple/20 bg-background/40"}`}>
                      <p className={`mb-2 font-display text-[10px] font-bold tracking-[0.2em] ${isScience ? "text-neon-cyan" : "text-neon-purple"}`}>
                        {group.id === "management" ? "MANAGEMENT ROSTER" : "SCIENCE ROSTER"}
                      </p>
                      <ul className="max-h-40 space-y-1.5 overflow-y-auto pr-1">
                        {group.students.map((student) => (
                          <li key={student} className="font-body text-sm text-muted-foreground">
                            {student}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <p className="mt-5 font-body text-sm text-muted-foreground">
                    {selected === 0 ? "No names picked yet." : `${selected} picked · ${remaining} remaining`}
                  </p>
                  <Button
                    onClick={() => openGroup(group.id)}
                    className={`mt-7 h-12 w-full font-display text-sm font-black tracking-[0.14em] text-white ${isScience ? "bg-neon-cyan hover:bg-neon-cyan/90" : "bg-neon-purple hover:bg-neon-purple/90"}`}
                  >
                    OPEN STUDENT LIST
                  </Button>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="animate-fade-in">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={returnToGroups}
                disabled={isShuffling}
                className="inline-flex items-center gap-1 font-display text-xs font-bold tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" /> ALL GROUPS
              </button>
              <div className="rounded-full border border-border bg-background/40 px-4 py-2 font-display text-xs font-bold tracking-[0.12em] text-muted-foreground">
                {activeStudents.length} LEFT IN {activeGroup.title.toUpperCase()}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
              <section className="glass-panel relative overflow-hidden p-5 sm:p-8">
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${activeGroup.id === "science" ? "via-neon-cyan" : "via-neon-purple"} to-transparent`} />
                <div className="mb-7 flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${activeGroup.id === "science" ? "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan" : "border-neon-purple/30 bg-neon-purple/10 text-neon-purple"}`}>
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-black text-foreground">{activeGroup.title} Group</p>
                    <p className="font-body text-sm text-muted-foreground">{activeGroup.students.length} students in this roster</p>
                  </div>
                </div>

                <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-neon-purple/25 bg-gradient-to-br from-neon-purple/10 via-background/20 to-neon-cyan/10 px-4 py-10 text-center sm:min-h-[310px]">
                  <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--neon-cyan)/0.15),transparent_62%)] transition-opacity duration-500 ${isShuffling ? "opacity-100" : "opacity-35"}`} />
                  <div className="relative z-10 w-full">
                    <p className={`mb-4 font-display text-[10px] font-bold tracking-[0.3em] sm:text-xs ${activeGroup.id === "science" ? "text-neon-cyan" : "text-neon-purple"}`}>
                      {isShuffling ? "SHUFFLING THE ROSTER" : selectedMission ? "MISSION ASSIGNED" : "NEXT STUDENT"}
                    </p>
                    <div className="mx-auto flex min-h-[104px] max-w-2xl items-center justify-center">
                      <h2
                        key={animationKey}
                        aria-live="polite"
                        className={`font-display text-2xl font-black leading-tight text-foreground sm:text-4xl md:text-5xl ${isShuffling ? "animate-shuffle-slide" : ""}`}
                      >
                        {displayName}
                      </h2>
                    </div>
                    {selectedMission && !isShuffling && (
                      <div className="mx-auto mt-5 max-w-xl rounded-xl border border-neon-pink/30 bg-neon-pink/10 px-5 py-4 animate-fade-in">
                        <p className="font-display text-[10px] font-bold tracking-[0.24em] text-neon-pink">RANDOM CLASSROOM TASK</p>
                        <p className="mt-2 font-body text-lg font-semibold leading-snug text-foreground sm:text-xl">{selectedMission.task}</p>
                      </div>
                    )}
                    {isRoundComplete && !isShuffling && (
                      <div className="mx-auto mt-5 flex max-w-xl items-center justify-center gap-2 text-neon-cyan animate-fade-in">
                        <Trophy className="h-5 w-5" />
                        <span className="font-display text-sm font-bold tracking-wider">EVERY STUDENT HAS BEEN SELECTED!</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={chooseStudent}
                    disabled={isShuffling || isRoundComplete}
                    className={`h-12 flex-1 font-display text-sm font-black tracking-[0.15em] text-white ${activeGroup.id === "science" ? "bg-neon-cyan hover:bg-neon-cyan/90 shadow-[0_0_24px_hsl(185_80%_50%/0.35)]" : "bg-neon-purple hover:bg-neon-purple/90 shadow-[0_0_24px_hsl(270_80%_60%/0.35)]"}`}
                  >
                    <Shuffle className={`h-4 w-4 ${isShuffling ? "animate-spin" : ""}`} />
                    {isShuffling ? "SHUFFLING..." : isRoundComplete ? "ROUND COMPLETE" : "SHUFFLE NAME"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetActiveGroup}
                    disabled={isShuffling || selectedCount === 0}
                    className="h-12 border-border bg-background/40 font-display text-xs font-bold tracking-[0.12em]"
                  >
                    <RotateCcw className="h-4 w-4" /> RESET GROUP
                  </Button>
                </div>
                <p className="mt-4 text-center font-body text-sm text-muted-foreground">
                  Picked students are marked in the list and will not be selected again this round.
                </p>
              </section>

              <aside className="glass-panel p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="font-display text-sm font-bold text-foreground">Student List</p>
                    <p className="mt-1 font-body text-sm text-muted-foreground">{selectedCount} of {activeGroup.students.length} selected</p>
                  </div>
                  <span className="rounded-full bg-neon-cyan/10 px-3 py-1 font-display text-xs font-bold text-neon-cyan">OPEN</span>
                </div>

                <ol className="max-h-[480px] space-y-2 overflow-y-auto pr-1">
                  {activeGroup.students.map((student, index) => {
                    const wasSelected = !activeStudents.includes(student);

                    return (
                      <li
                        key={student}
                        className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${wasSelected ? "border-neon-green/20 bg-neon-green/5 text-muted-foreground" : "border-border bg-background/35 text-foreground"}`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 font-display text-[10px] font-black text-muted-foreground">
                          {index + 1}
                        </span>
                        <span className={`min-w-0 flex-1 font-display text-xs font-bold ${wasSelected ? "line-through" : ""}`}>{student}</span>
                        {wasSelected && <Check className="h-4 w-4 shrink-0 text-neon-green" aria-label="Selected" />}
                      </li>
                    );
                  })}
                </ol>

                {activeHistory.length > 0 && (
                  <div className="mt-4 rounded-xl border border-neon-pink/20 bg-neon-pink/5 p-3">
                    <p className="font-display text-[10px] font-bold tracking-[0.16em] text-neon-pink">LATEST MISSION</p>
                    <p className="mt-1 font-display text-xs font-bold text-foreground">{activeHistory[0].name}</p>
                    <p className="mt-1 font-body text-sm leading-snug text-muted-foreground">{activeHistory[0].task}</p>
                  </div>
                )}
              </aside>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ClassroomTaskShuffle;
