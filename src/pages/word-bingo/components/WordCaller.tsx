import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface WordCallerProps {
  currentWord: string | null;
  calledWords: string[];
  totalWords: number;
}

const WordCaller = ({ currentWord, calledWords, totalWords }: WordCallerProps) => {
  const definitionCacheRef = useRef<Map<string, string>>(new Map());
  const [currentMeaning, setCurrentMeaning] = useState<string>("Waiting for the first word call.");
  const [isMeaningLoading, setIsMeaningLoading] = useState(false);

  useEffect(() => {
    if (!currentWord) {
      setCurrentMeaning("Waiting for the first word call.");
      setIsMeaningLoading(false);
      return;
    }

    const rawWord = currentWord.trim();
    const normalizedKey = rawWord.toLowerCase();

    if (definitionCacheRef.current.has(normalizedKey)) {
      setCurrentMeaning(definitionCacheRef.current.get(normalizedKey)!);
      setIsMeaningLoading(false);
      return;
    }

    if (rawWord === "★ FREE") {
      const freeMeaning = "A free center tile that is automatically marked in Bingo.";
      definitionCacheRef.current.set(normalizedKey, freeMeaning);
      setCurrentMeaning(freeMeaning);
      setIsMeaningLoading(false);
      return;
    }

    const controller = new AbortController();
    const lookup = async () => {
      try {
        setIsMeaningLoading(true);
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(rawWord)}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Definition not found");
        }

        const payload = await response.json();
        const definition = payload?.[0]?.meanings?.[0]?.definitions?.[0]?.definition;
        const cleaned = typeof definition === "string" && definition.trim().length > 0
          ? definition.trim()
          : "Meaning not available for this term.";

        definitionCacheRef.current.set(normalizedKey, cleaned);
        setCurrentMeaning(cleaned);
      } catch {
        const fallback = "Meaning not available for this term.";
        definitionCacheRef.current.set(normalizedKey, fallback);
        setCurrentMeaning(fallback);
      } finally {
        setIsMeaningLoading(false);
      }
    };

    lookup();

    return () => {
      controller.abort();
    };
  }, [currentWord]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3">
      <p className="text-center text-xs sm:text-sm text-muted-foreground font-body uppercase tracking-wider">
        Called: {calledWords.length} / {totalWords}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-3 items-stretch">
        <div className="min-h-[72px] flex items-center justify-center rounded-xl border border-neon-purple/25 bg-card/40 p-4">
          <AnimatePresence mode="wait">
            {currentWord ? (
              <motion.div
                key={currentWord}
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="px-6 py-3 rounded-xl bg-neon-purple/20 border border-neon-purple/40 shadow-[0_0_25px_hsl(270_80%_60%/0.3)]"
              >
                <span className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-foreground text-glow-purple">
                  {currentWord}
                </span>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground font-body text-lg"
              >
                Waiting to start...
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 p-4 text-left">
          <p className="text-[11px] font-body uppercase tracking-widest text-neon-cyan mb-2">Meaning</p>
          <p className="text-sm sm:text-base font-body text-foreground leading-relaxed">
            {isMeaningLoading ? "Looking up meaning..." : currentMeaning}
          </p>
        </div>
      </div>

      {calledWords.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center max-h-24 overflow-y-auto px-2">
          {calledWords.slice(0, -1).reverse().map((w, i) => (
            <span key={i} className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-body">
              {w}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default WordCaller;
