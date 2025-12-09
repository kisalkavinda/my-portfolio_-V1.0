import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50, rotateX: 0, rotateY: 0, boxShadow: "0 0px 0px rgba(0, 0, 0, 0)" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
        rotateX: 3,
        rotateY: 3,
        boxShadow: "0 10px 30px rgba(168, 85, 247, 0.6)",
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 10
        }
      }}
      style={{
        transformPerspective: '1000px', // Establishes the 3D perspective
      }}
    >
      {/* Holographic Border Effect */}
      <motion.div
        className="absolute inset-[-2px] rounded-xl z-20 pointer-events-none"
        initial={{ opacity: 0, backgroundSize: "0% 100%" }}
        animate={isHovered ? {
          opacity: 1,
          background: "linear-gradient(90deg, transparent, #00d9ff, transparent, #4dfffe, transparent)",
          backgroundSize: "200% 100%",
          animation: "holographic-scan 2s linear infinite"
        } : {
          opacity: 0,
          backgroundSize: "0% 100%", // Explicitly set animatable value
          animation: "none"
        }}
        transition={{ duration: 0.5 }}
      />

      <motion.div 
                    className="relative bg-[#0a0a0a] dark:bg-[#0a0a0a]/50 backdrop-blur-sm p-6 rounded-xl border-2 border-[#00d9ff]/40 transition-all overflow-hidden h-full"        // The whileHover scale and y: -5 are moved to the parent motion.div for 3D effect
        transition={{ duration: 0.3 }}
      >
        {/* Animated Background Gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/0 to-[#4dfffe]/0 group-hover:from-[#00d9ff]/20 group-hover:to-[#4dfffe]/20 transition-all duration-500"
          animate={isHovered ? {
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1]
          } : {
            opacity: 0,
            scale: 1
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Particle Effect */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#00d9ff] rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}

        {/* Icon */}
        <motion.div 
          className="text-4xl mb-4 relative z-10"
          animate={isHovered ? { 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ duration: 0.5 }}
        >
          {skill.icon}
        </motion.div>

        {/* Skill Name */}
        <motion.h3 
          className="text-lg font-bold mb-2 relative z-10"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          {skill.name}
        </motion.h3>

        {/* Progress Bar */}
        {skill.level && (
          <div className="relative z-10 mb-3">
            <div className="flex justify-between mb-1 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
              <span className="text-[#00d9ff] font-semibold">{skill.level}%</span>
            </div>
            <div className="w-full bg-[#0a0a0a]/30 dark:bg-[#0a0a0a]/50 rounded-full h-2 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#00d9ff] to-[#4dfffe] rounded-full relative"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.1 + 0.3,
                  ease: "easeOut"
                }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 dark:bg-gradient-to-r dark:from-transparent dark:via-white/30 dark:to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </motion.div>
            </div>
          </div>
        )}

        {/* Description */}
        {skill.description && (
          <motion.p 
            className="text-sm text-gray-600 dark:text-gray-400 relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            {skill.description}
          </motion.p>
        )}
      </motion.div>
    </motion.div>  );
};

export default SkillCard;