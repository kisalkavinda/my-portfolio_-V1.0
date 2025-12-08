import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, projectCategories } from '../../data/projects'
import ProjectCard from '../ui/ProjectCard'
import ProjectDetailsModal from '../ui/ProjectDetailsModal'

const Projects = () => {
  const [filter, setFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => 
        Array.isArray(p.category) 
          ? p.category.includes(filter) 
          : p.category === filter
      )

  return (
    <section id="projects" className="min-h-screen flex flex-col items-center px-4 py-20 relative overflow-hidden">
      {/* Separator line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-75 blur-sm z-0" />
      
      {/* Full section gradient overlay - transparent top, visible bottom */}
      <div className="absolute inset-0 pointer-events-none z-0 dark:bg-gradient-to-b dark:from-transparent dark:via-black/25 dark:to-black/55" />

      <div className="relative z-10 w-full max-w-6xl">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-accent">Projects</span>
        </motion.h2>

        {/* Project Filter */}
        <motion.div 
          className="flex gap-4 mb-12 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {projectCategories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-lg transition-all font-semibold ${
                filter === cat 
                  ? 'bg-accent text-surface shadow-lg shadow-[0_0_40px_var(--accent-40)]' 
                  : 'bg-surface dark:bg-surface text-black text-text-primary hover:bg-accent/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onViewDetails={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal 
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects