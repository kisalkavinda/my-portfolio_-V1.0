import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';

const messages = [
  "INITIALIZING...",
  "LOADING ASSETS...",
  "ESTABLISHING CONNECTION...",
  "WELCOME"
];

const Preloader = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  // Decoding effect
  useEffect(() => {
    const targetText = messages[textIndex];
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(prev =>
        targetText.split("")
          .map((letter, index) => {
            if (index < iterations) {
              return targetText[index];
            }
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"[Math.floor(Math.random() * 36)];
          })
          .join("")
      );

      if (iterations >= targetText.length) {
        clearInterval(interval);
        // Move to next message
        if (textIndex < messages.length - 1) {
          setTimeout(() => setTextIndex(prev => prev + 1), 800);
        }
      }

      iterations += 1 / 2; // Speed of decoding
    }, 30);

    return () => clearInterval(interval);
  }, [textIndex]);

  const containerVariants = {
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      y: '-100vh',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-black"
      variants={containerVariants}
      initial="visible"
      animate="visible"
      exit="exit"
    >
      <div className="relative mb-8">
        {/* Central Logo with Glitch */}
        <div className="relative w-32 h-32 flex justify-center items-center border border-accent/30 rounded-full bg-accent/5 backdrop-blur-sm">
          <div className="absolute inset-0 rounded-full border-t border-accent animate-spin-slow" />
          <GlitchText
            text="K"
            className="text-6xl font-bold font-display"
            delay={1}
          />
        </div>
      </div>

      <div className="h-6 font-mono text-accent/80 text-sm tracking-[0.2em] min-w-[200px] text-center">
        {displayText}
        <span className="animate-pulse">_</span>
      </div>

      {/* Loading bar */}
      <div className="mt-8 w-64 h-1 bg-accent/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent box-shadow-[0_0_10px_var(--accent)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export default Preloader;
