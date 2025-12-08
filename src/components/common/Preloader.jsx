import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: '-100vh',
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };
  
  const logoVariants = {
      hidden: { opacity: 0, scale: 0.5 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay: 1 }
      }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-[#000000]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="relative w-24 h-24 flex justify-center items-center">
        {/* Central Logo */}
        <motion.div
          className="text-[#00d9ff] font-bold text-6xl"
          variants={logoVariants}
        >
          K
        </motion.div>
        
        {/* Animated Lines */}
        {/* Horizontal */}
      <div className="absolute top-0 left-0 w-full h-px bg-[#00d9ff]" />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-px bg-[#00d9ff]"
          variants={lineVariants}
        />
        {/* Vertical */}
      <div className="absolute top-0 left-0 w-px h-full bg-[#00d9ff] origin-top" />
      <div className="absolute top-0 right-0 w-px h-full bg-[#00d9ff] origin-top" />
      </div>
      <motion.p 
        className="text-[#00d9ff] mt-4 text-sm tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        LOADING...
      </motion.p>
    </motion.div>
  );
};

export default Preloader;
