import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, projectCategories } from '../../data/projects'
import ProjectCard from '../ui/ProjectCard'
import ProjectDetailsModal from '../ui/ProjectDetailsModal'
import SearchBar from '../ui/SearchBar'
import SortDropdown from '../ui/SortDropdown'

const Projects = () => {
  const [filter, setFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')


  // Search handler
  const handleSearch = useCallback((term) => {
    setSearchTerm(term)
  }, [])

  // Filter, search, and sort projects
  let processedProjects = filter === 'All'
    ? projects
    : projects.filter(p =>
      Array.isArray(p.category)
        ? p.category.includes(filter)
        : p.category === filter
    )

  // Apply search
  if (searchTerm) {
    processedProjects = processedProjects.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }

  // Apply sorting
  processedProjects = [...processedProjects].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.id - a.id
      case 'oldest':
        return a.id - b.id
      case 'a-z':
        return a.title.localeCompare(b.title)
      case 'z-a':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })


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

        {/* Search and Sort Toolbar */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8 w-full items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchBar onSearch={handleSearch} placeholder="Search projects..." />
          <SortDropdown onSort={setSortBy} currentSort={sortBy} />
        </motion.div>

        {/* Project Filter */}
        <motion.div
          className="flex gap-4 mb-12 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {projectCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-lg transition-all font-semibold ${filter === cat
                ? 'bg-accent text-surface shadow-lg shadow-[0_0_40px_var(--accent-40)]'
                : 'bg-surface dark:bg-surface text-black text-text-primary hover:bg-accent/30'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>


        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {processedProjects.length > 0 ? (
            <motion.div
              key="projects-grid"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {processedProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onViewDetails={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              className="flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                🔍
              </motion.div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">No projects found</h3>
              <p className="text-text-primary/60">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </AnimatePresence>
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