import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ text, className, delay = 0, initial = {}, animate = {}, transition = {} }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) { // 5% chance to glitch every few seconds
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
        }, Math.random() * 200 + 100); // Glitch duration between 100ms and 300ms
      }
    }, Math.random() * 3000 + 2000); // Check for glitch every 2-5 seconds

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.span
      className={`${className} relative inline-block bg-gradient-to-r from-[#00d9ff] via-[#4dfffe] to-[#00d9ff] bg-clip-text text-transparent`}
      initial={initial}
      animate={animate}
      transition={{ ...transition, delay: transition.delay || delay }} // Incorporate delay here
      style={{
        filter: isGlitching ? 'url(#glitch)' : 'none',
        transition: 'filter 0.1s ease-in-out',
        transform: isGlitching ? `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)` : 'none',
      }}
    >
      {text}
    </motion.span>
  );
};

export default GlitchText;
