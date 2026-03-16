import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SENTENCES = [
  "Ok. Welcome to OpenStays!",
  "First, let's keep it cool.",
  "This is a beta version of our first minimal viable product production of this platform.",
  "So loading times may be slow...",
  "But we promise to make it under 2 seconds by the end of the month.",
  "For now, OpenStays enables you to explore our unique selection of special places to stay and exceptional experiences across the Kenyan coast, and request reservations directly with us.",
  "And without further ado...",
];

const TOTAL_TIME = 120;

function LoadingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  // rotate text
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SENTENCES.length);
    }, 4500);

    return () => clearInterval(textInterval);
  }, []);

  // countdown timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const progress = ((TOTAL_TIME - timeLeft) / TOTAL_TIME) * 100;

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <main className="fixed inset-0 bg-white flex flex-col items-center justify-center p-6 sm:p-12">

      <div className="w-full max-w-3xl flex flex-col items-center justify-center flex-1">

        {/* Rolling text */}
        <div className="relative w-full min-h-[160px] sm:min-h-[200px] flex items-center justify-center text-center">

          <AnimatePresence mode="wait">
            <motion.h1
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111] tracking-tight leading-snug max-w-2xl"
            >
              {SENTENCES[currentIndex]}
            </motion.h1>
          </AnimatePresence>

        </div>

        {/* Bottom section */}
        <div className="mt-20 flex flex-col items-center w-full max-w-xs gap-6">

          {/* timer */}
          <div className="text-4xl sm:text-5xl font-light text-gray-400 tabular-nums tracking-widest">
            {minutes}:{seconds}
          </div>

          {/* progress bar */}
          <div className="w-full flex flex-col gap-3">

            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#111] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs font-medium text-gray-400 uppercase tracking-wider">
              <span>Loading</span>
              <span>{Math.round(progress)}%</span>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default LoadingScreen;
