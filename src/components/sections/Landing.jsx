import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Sparkles, ArrowRight, MousePointer2 } from 'lucide-react'
import { personalInfo } from '../../data/personalInfo'

const Landing = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // 1. Prevent scrolling while landing page is active
    document.body.style.overflow = 'hidden'
    
    // 2. Trigger content animation
    const timer = setTimeout(() => setShowContent(true), 500)

    return () => {
      // Cleanup: Re-enable scrolling when component unmounts
      document.body.style.overflow = 'unset'
      clearTimeout(timer)
    }
  }, [])

  const handleEnter = () => {
    onComplete()
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3 
      }
    },
    exit: { 
      opacity: 0, 
      y: -50, 
      transition: { duration: 0.8, ease: "easeInOut" } 
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="landing-overlay"
        // Fixed positioning with explicit viewport sizing and high z-index
        className="fixed inset-0 z-[9999] h-screen w-screen flex items-center justify-center overflow-hidden bg-[#000000]"
        initial={{ opacity: 1 }}
        exit="exit"
        variants={containerVariants}
      >
        {/* --- BACKGROUND LAYERS --- */}
        
        {/* 1. Base Gradient (Dark Theme #1e293b) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] z-0" />

        {/* 2. Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d9ff1a_1px,transparent_1px),linear-gradient(to_bottom,#00d9ff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none" />

        {/* 3. Glowing Orbs (Theme Colors) */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00d9ff]/20 rounded-full blur-[100px]" />
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-highlight/20 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />

        {/* 4. Floating Particles */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={'particle-' + i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                y: [null, Math.random() * -100],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* --- CONTENT --- */}
        <motion.div 
          className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={showContent ? "visible" : "hidden"}
        >
          {/* Logo / Brain Icon */}
          <motion.div variants={itemVariants} className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-[#00d9ff] blur-2xl opacity-20 animate-pulse" />
            <div className="relative p-6 bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-[0_0_40px_rgba(0,217,255,0.4)] ring-1 ring-white/20">
              <Brain size={64} className="text-[#00d9ff] drop-shadow-[0_0_15px_rgba(0,217,255,0.5)]" />
            </div>
            
            {/* Floating decorators around icon */}
            <motion.div 
              className="absolute -top-2 -right-2 text-highlight"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={24} />
            </motion.div>
          </motion.div>

          {/* Welcome Text */}
          <motion.div variants={itemVariants} className="space-y-2 mb-8">
            <div className="flex items-center justify-center gap-3 text-[#00d9ff]/80 font-mono text-sm tracking-[0.2em] uppercase">
              <span className="w-8 h-[1px] bg-[#00d9ff]/50" />
              <span>Welcome to my universe</span>
              <span className="w-8 h-[1px] bg-[#00d9ff]/50" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tight">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#00d9ff] via-[#4dfffe] to-[#00d9ff] animate-gradient-x pb-2">
                {personalInfo.name}
              </span>
            </h1>

            <motion.p 
              className="text-lg md:text-xl text-[#c0c0c0] max-w-2xl mx-auto font-light"
              variants={itemVariants}
            >
              {personalInfo.title}
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={handleEnter}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,229,255,0.8)] border border-[#00d9ff]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button Gradient Background (animated on hover) */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff] to-[#4dfffe] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Button Border Gradient (default state) */}
              <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-transparent transition-all" />

              <span className="relative z-10 font-medium text-gray-400 text-lg tracking-wide group-hover:text-surface">
                Enter Portfolio
              </span>
              
              <motion.div 
                className="relative z-10 bg-[#00d9ff]/20 p-1 rounded-full group-hover:bg-[#00d9ff]/30 transition-colors"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={18} className="text-gray-400 group-hover:text-surface" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Footer Hint */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex flex-col items-center gap-2 opacity-50"
          >
            <MousePointer2 size={20} className="text-[#00d9ff] animate-bounce" />
            <span className="text-xs text-[#00d9ff] uppercase tracking-widest">
              Interactive Experience
            </span>
          </motion.div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Landing