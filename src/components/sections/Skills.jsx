import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Layers } from 'lucide-react'

import { skills } from '../../data/skills';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Programming': return 'from-blue-400 to-blue-600';
      case 'AI/ML': return 'from-accent to-accent';
      case 'Data Science': return 'from-green-400 to-green-600';
      case 'IoT & Embedded': return 'from-teal-400 to-teal-600';
      case 'Web Development': return 'from-orange-400 to-orange-600';
      case 'Tools': return 'from-gray-400 to-gray-600';
      default: return 'from-accent to-highlight';
    }
  };

  const techStack = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      name: skill.name,
      icon: skill.icon,
      level: skill.level,
      color: getCategoryColor(category),
    });
    return acc;
  }, {});
  
  const categories = [
    { id: 'all', label: 'All', icon: Layers },
    ...Object.keys(techStack).map(cat => ({
      id: cat.toLowerCase().replace(/ & /g, '_and_').replace(/ /g, ''), // Convert "IoT & Embedded" to "iot_and_embedded"
      label: cat,
      icon: Code, // Placeholder icon, you might want to map specific icons
    }))
  ];

  const getFilteredStack = () => {
    if (activeCategory === 'all') {
      return Object.values(techStack).flat();
    }
    const categoryKey = categories.find(cat => cat.id === activeCategory)?.label;
    return techStack[categoryKey] || [];
  };

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* Separator line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-75 blur-sm z-0" />
      
      {/* Full section gradient overlay - transparent top, visible bottom */}
      <div className="absolute inset-0 pointer-events-none z-0 dark:bg-gradient-to-b dark:from-transparent dark:via-black/25 dark:to-black/55" />
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Tech <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">Stack</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeCategory === category.id
                  ? 'bg-accent text-surface shadow-lg shadow-[0_0_40px_rgba(0,217,255,0.4)]'
                  : 'bg-surface bg-surface/50 text-gray-700 dark:text-gray-300 hover:bg-accent/20'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon size={20} />
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tech Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          layout
        >
          {getFilteredStack().map((tech, index) => (
            <motion.div
              key={tech.name}
              className="relative bg-surface bg-surface/20 backdrop-blur-sm rounded-xl p-6 border border-accent/20 hover:border-accent/50 transition-all group overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.05 }}
              layout
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10 text-center">
                {/* Icon */}
                <motion.div
                  className="text-5xl mb-3"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.2, 1.2, 1.2, 1]
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {tech.icon}
                </motion.div>

                {/* Name */}
                <h3 className="font-bold text-lg mb-3 group-hover:text-accent transition-colors">
                  {tech.name}
                </h3>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-surface/30 bg-surface/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${tech.color} rounded-full relative`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                    >
                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 dark:bg-gradient-to-r dark:from-transparent dark:via-white/30 dark:to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </motion.div>
                  </div>
                  <span className="text-xs text-text-secondary mt-1 block">
                    {tech.level}%
                  </span>
                </div>
              </div>

              {/* Hover Glow */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                initial={{ opacity: 0, boxShadow: '0 0 0px rgba(0, 0, 0, 0)' }}
                whileHover={{
                  opacity: 1,
                  boxShadow: '0 0 15px var(--color-accent-60), 0 0 30px var(--color-accent-40)' // Using CSS variables for custom colors
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          {Object.entries(techStack).map(([category, skillsArray]) => (
            <motion.div
              key={category}
              className="text-center p-6 bg-surface dark:bg-surface/30 rounded-lg border border-accent/20"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-4xl font-bold text-accent mb-2">
                {skillsArray.length}
              </div>
              <div className="text-sm text-text-secondary">
                {category}
              </div>
            </motion.div>
          ))}
                                  <motion.div
                                              key="total-skills"
                                              className="text-center p-6 bg-surface dark:bg-surface/30 rounded-lg border border-accent/20"            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="text-4xl font-bold text-accent mb-2">
              {Object.values(techStack).flat().length}
            </div>
            <div className="text-sm text-text-secondary">
              Total Skills
            </div>
          </motion.div>
        </motion.div>


      </div>
    </section>
  )
}

export default Skills;