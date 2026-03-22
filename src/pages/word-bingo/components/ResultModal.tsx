import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Confetti from "@/components/Confetti";

interface ResultModalProps {
  timeElapsed: number;
  wordsCalledCount: number;
  mistakes: number;
  onRestart: () => void;
  onChangeCategory: () => void;
}

const ResultModal = ({ timeElapsed, wordsCalledCount, mistakes, onRestart, onChangeCategory }: ResultModalProps) => {
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <>
      <Confetti />
      <motion.div
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed right-3 top-20 sm:right-5 sm:top-24 z-40 pointer-events-none"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="glass-panel pointer-events-auto p-5 sm:p-6 w-[min(92vw,380px)] text-center space-y-4 border border-neon-purple/30 shadow-[0_0_30px_hsl(270_80%_60%/0.25)]"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl sm:text-6xl"
          >
            🎉
          </motion.div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-foreground text-glow-purple">
            BINGO!
          </h2>
          <div className="space-y-2 text-muted-foreground font-body text-sm">
            <p>⏱ Time: <span className="text-foreground font-semibold">{formatTime(timeElapsed)}</span></p>
            <p>📢 Words Called: <span className="text-foreground font-semibold">{wordsCalledCount}</span></p>
            <p>❌ Mistakes: <span className="text-foreground font-semibold">{mistakes}</span></p>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={onRestart} className="font-display tracking-wider">
              🔄 Restart Game
            </Button>
            <Button variant="outline" onClick={onChangeCategory} className="font-display tracking-wider">
              📚 Change Category
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ResultModal;
