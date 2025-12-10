import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const GlitchText = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Character set for the decoding effect
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*';

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    const maxIterations = 3; // How many times each letter scrambles before settling
    let interval = null;

    interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            // Keep spaces as spaces
            if (char === ' ') return ' ';

            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 5; // Speed of decoding (lower = slower)
    }, 50);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span
      ref={ref}
      className={`${className} inline-block bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent`}
    >
      {displayText || text}
    </span>
  );
};

export default GlitchText;
