import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { skills } from '../../data/skills'

const Skills = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Programming': return 'from-blue-400 to-blue-600';
      case 'AI/ML': return 'from-accent to-accent';
      case 'Data Science': return 'from-green-400 to-green-600';
      case 'IoT & Embedded': return 'from-teal-400 to-teal-600';
      case 'Web Development': return 'from-accent to-highlight';
      case 'Tools': return 'from-gray-400 to-gray-600';
      default: return 'from-accent to-highlight';
    }
  };

  const allSkills = skills.map(skill => ({
    ...skill,
    color: getCategoryColor(skill.category),
  }));

  const techStack = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  // Get unique categories
  const categories = ['All', ...Object.keys(techStack)]

  // Filter skills based on selected category
  const filteredSkills = selectedCategory === 'All'
    ? allSkills
    : allSkills.filter(skill => skill.category === selectedCategory)

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [selectedCategory])

  const paginate = (newDirection) => {
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = filteredSkills.length - 1
      if (nextIndex >= filteredSkills.length) nextIndex = 0
      return nextIndex
    })
  }

  // Auto-play: advance to next skill every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1)
    }, 2000) // Changed from 4000 to 2000

    return () => clearInterval(interval)
  }, [currentIndex, filteredSkills.length])

  // Get previous, current, and next skills from filtered list
  const getPrevIndex = () => {
    if (filteredSkills.length === 0) return 0
    return (currentIndex - 1 + filteredSkills.length) % filteredSkills.length
  }

  const getNextIndex = () => {
    if (filteredSkills.length === 0) return 0
    return (currentIndex + 1) % filteredSkills.length
  }

  const prevSkill = filteredSkills.length > 0 ? filteredSkills[getPrevIndex()] : null
  const currentSkill = filteredSkills.length > 0 ? filteredSkills[currentIndex] : null
  const nextSkill = filteredSkills.length > 0 ? filteredSkills[getNextIndex()] : null

  // Skill Card Component
  const SkillCard = ({ skill, position }) => {
    if (!skill) return null // Safety check for null skills

    const isCenter = position === 'center'
    const isLeft = position === 'left'
    const isRight = position === 'right'

    return (
      <motion.div
        className={`absolute ${isCenter
          ? 'z-30 scale-100'
          : 'z-10 scale-75 opacity-60'
          } ${isLeft ? '-translate-x-[280px]' : isRight ? 'translate-x-[280px]' : 'translate-x-0'
          }`}
        animate={{
          scale: isCenter ? 1 : 0.75,
          opacity: isCenter ? 1 : 0.6,
          x: isLeft ? -280 : isRight ? 280 : 0,
          y: isCenter ? 0 : 20,
        }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smooth easing
        }}
        whileHover={isCenter ? {
          scale: 1.05,
          transition: { duration: 0.2, ease: "easeOut" }
        } : {}}
      >
        <div className={`relative bg-gradient-to-br from-surface/60 to-surface/30 backdrop-blur-xl rounded-2xl border-2 overflow-hidden ${isCenter
          ? 'w-64 h-64 border-accent/50 shadow-[0_0_40px_rgba(0,217,255,0.4)]'
          : 'w-64 h-64 border-accent/20'
          }`}>
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} ${isCenter ? 'opacity-15' : 'opacity-10'}`} />

          {/* Rotating glow - only on center card */}
          {isCenter && (
            <motion.div
              className="absolute inset-0 opacity-40"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.3), transparent 70%)`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          )}

          <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 gap-3">
            {/* Icon */}
            <motion.div
              className={isCenter ? 'text-6xl' : 'text-5xl'}
              animate={isCenter ? {
                rotate: [0, -5, 5, -5, 0],
              } : {}}
              transition={isCenter ? {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              } : {}}
            >
              {skill.icon}
            </motion.div>

            {/* Name */}
            <h4 className={`font-bold text-center ${isCenter ? 'text-xl text-accent' : 'text-base text-text-primary'
              }`}>
              {skill.name}
            </h4>

            {/* Progress Bar - only on center */}
            {isCenter && (
              <div className="w-full mt-2">
                <div className="w-full bg-surface/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.div>
                </div>
                <span className="text-xs text-accent font-bold mt-1 block text-center">
                  {skill.level}%
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* Separator line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-75 blur-sm z-0" />

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-highlight rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            Tech <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">Stack</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and frameworks I leverage to build innovative solutions
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg transition-all font-semibold ${selectedCategory === category
                ? 'bg-accent text-surface shadow-lg shadow-[0_0_40px_var(--accent-40)]'
                : 'bg-surface dark:bg-surface text-black text-text-primary hover:bg-accent/30'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* 3-Card Carousel */}
        <div className="relative h-80 flex items-center justify-center mb-12">
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            <SkillCard skill={prevSkill} position="left" />
            <SkillCard skill={currentSkill} position="center" />
            <SkillCard skill={nextSkill} position="right" />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-surface/80 backdrop-blur-md rounded-full border border-accent/30 hover:border-accent/60 hover:bg-accent/20 transition-all group"
            aria-label="Previous skill"
          >
            <ChevronLeft className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-surface/80 backdrop-blur-md rounded-full border border-accent/30 hover:border-accent/60 hover:bg-accent/20 transition-all group"
            aria-label="Next skill"
          >
            <ChevronRight className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1.5 z-40">
            {filteredSkills.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentIndex
                  ? 'bg-accent w-6'
                  : 'bg-accent/30 hover:bg-accent/50'
                  }`}
                aria-label={`Go to skill ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {Object.entries(techStack).map(([category, skillsArray], index) => (
            <motion.div
              key={category}
              className="text-center p-4 md:p-6 bg-gradient-to-br from-surface/40 to-surface/20 backdrop-blur-sm rounded-2xl border border-accent/20 hover:border-accent/40 transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent mb-2">
                {skillsArray.length}
              </div>
              <div className="text-xs md:text-sm text-text-secondary font-medium">
                {category}
              </div>
            </motion.div>
          ))}

          <motion.div
            className="text-center p-4 md:p-6 bg-gradient-to-br from-accent/20 to-highlight/10 backdrop-blur-sm rounded-2xl border border-accent/40 hover:border-accent/60 transition-all"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent mb-2">
              {skills.length}
            </div>
            <div className="text-xs md:text-sm text-accent font-semibold">
              Total Skills
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills