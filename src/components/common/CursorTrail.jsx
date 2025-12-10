import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const TrailParticle = ({ id, x, y, color }) => (
  <motion.div
    key={id}
    className="fixed pointer-events-none z-50 rounded-full"
    style={{
      left: x,
      top: y,
      width: 20,
      height: 20,
      background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
      opacity: 0.8,
    }}
    initial={{ scale: 1, opacity: 0.8 }}
    animate={{ scale: 0, opacity: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.2, ease: 'easeOut' }}
  />
);

const CursorTrail = () => {
  const [particles, setParticles] = useState([]);
  const particleId = useRef(0); // Use a ref for unique IDs
  const trailColor = '#4dfffe'; // Highlight color

  useEffect(() => {
    const mouseMove = (e) => {
      // Throttle trail creation
      const now = Date.now();
      if (now - (window.lastParticleTime || 0) > 50) {
        setParticles((prev) => [
          ...prev,
          {
            id: `${now}-${particleId.current++}`,
            x: e.clientX - 10,
            y: e.clientY - 10,
            color: trailColor,
          },
        ]);
        window.lastParticleTime = now;
      }
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [trailColor]);

  useEffect(() => {
    // Clean up old particles
    const interval = setInterval(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - parseInt(p.id.split('-')[0]) < 1000));
    }, 500);
    return () => clearInterval(interval);
  }, []);



  return (
    <AnimatePresence>

      {particles.map((p) => (
        <TrailParticle key={p.id} {...p} />
      ))}
    </AnimatePresence>
  );
};

export default CursorTrail;