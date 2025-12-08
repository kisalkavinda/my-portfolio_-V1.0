import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Github, ExternalLink, Star, ChevronRight, Eye,
  Calendar, Users, Code, Layers, Shield, Zap, Clock, TrendingUp,
  BarChart, Cpu, Database, Cloud, Smartphone, Globe
} from 'lucide-react'
import { projects } from '../../data/projects'
import DigitalRainBackground from '../common/DigitalRainBackground'
import ThemeToggle from '../common/ThemeToggle'
import ImageSlideshowModal from '../ui/ImageSlideshowModal'
import ProjectProgress from '../ui/ProjectProgress'
import TechBadge from '../ui/TechBadge'
import CodeSnippet from '../ui/CodeSnippet'

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [relatedProjects, setRelatedProjects] = useState([])
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    performance: 95,
    accessibility: 88,
    bestPractices: 92,
    seo: 85
  })

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(id))
    if (foundProject) {
      setProject(foundProject)
      // Find related projects in same category
      const related = projects
        .filter(p => p.category === foundProject.category && p.id !== foundProject.id)
        .slice(0, 3)
      setRelatedProjects(related)
      
      // Simulate fetching performance stats
      setTimeout(() => {
        setStats({
          performance: Math.floor(Math.random() * 20) + 80,
          accessibility: Math.floor(Math.random() * 20) + 80,
          bestPractices: Math.floor(Math.random() * 20) + 80,
          seo: Math.floor(Math.random() * 20) + 80
        })
      }, 1000)
    }
  }, [id])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Layers size={18} /> },
    { id: 'features', label: 'Features', icon: <Zap size={18} /> },
    { id: 'architecture', label: 'Architecture', icon: <Code size={18} /> },
    { id: 'stats', label: 'Analytics', icon: <BarChart size={18} /> }
  ]

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] dark:bg-[#000000] flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative mx-auto mb-8">
            <motion.div 
              className="w-16 h-16 border-4 border-[#00d9ff] border-t-transparent rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 border-2 border-highlight border-t-transparent rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading project details...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  // Generate mock analytics data
  const generateChartData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      visits: Math.floor(Math.random() * 1000) + 500,
      engagement: Math.floor(Math.random() * 30) + 60
    }))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] dark:bg-[#000000] text-black text-text-primary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00d9ff]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Enhanced top gradient */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-highlight via-accent to-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Gradient overlay with animation */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 dark:bg-gradient-to-b dark:from-transparent dark:via-black/25 dark:to-black/55"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <DigitalRainBackground />
      
      {/* Fixed Header with enhanced effects */}
      <motion.header 
        className="fixed top-0 w-full bg-[#0a0a0a]/90 dark:bg-[#000000]/90 backdrop-blur-xl z-50 border-b border-[#00d9ff]/30 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/">
                          <motion.button
                            className="flex items-center gap-2 px-4 py-2.5 bg-[#00d9ff] hover:bg-[#4dfffe] rounded-xl transition-all group shadow-lg hover:shadow-[0_0_40px_rgba(0,217,255,0.4)]"                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold">Back to Portfolio</span>
              </motion.button>
            </Link>
            
            {/* Breadcrumb navigation */}
            <div className="hidden md:flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Link to="/" className="hover:text-[#00d9ff] transition-colors">Portfolio</Link>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-[#00d9ff] font-semibold">{project.category}</span>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-text-primary font-semibold">{project.title}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-[#00d9ff]/10 rounded-lg border border-[#00d9ff]/30">
              <Clock size={16} className="text-[#00d9ff]" />
              <span className="text-sm font-medium">Last updated: 2 days ago</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Project Header with enhanced layout */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Project Header with Image and Stats */}
            <div className="flex flex-col lg:flex-row gap-8 mb-8">
              {/* Main Image/Icon */}
              <motion.div 
                className="lg:w-2/3"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                  {project.image.includes('.') ? (
                    <>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-auto max-h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <motion.div 
                      className="w-full h-96 flex items-center justify-center bg-gradient-to-br from-[#00d9ff]/30 to-[#4dfffe]/30"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-9xl">{project.image}</span>
                    </motion.div>
                  )}
                  
                  {/* View Gallery Button on Image */}
                  {project.gallery && project.gallery.length > 0 && (
                    <motion.button
                      onClick={() => setIsSlideshowOpen(true)}
                      className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-lg transition-all group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={18} className="group-hover:rotate-12 transition-transform" />
                      <span className="text-sm font-medium">View Gallery ({project.gallery.length})</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>

              {/* Quick Stats Sidebar */}
              <div className="lg:w-1/3 space-y-4">
                <motion.div 
                  className="bg-[#0a0a0a] dark:bg-[#0a0a0a]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#00d9ff]/20"
>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-[#00d9ff]" />
                    Project Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Performance</span>
                      <span className="font-bold text-green-400">{stats.performance}%</span>
                    </div>
                    <ProjectProgress value={stats.performance} color="bg-green-500" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Accessibility</span>
                      <span className="font-bold text-blue-400">{stats.accessibility}%</span>
                    </div>
                    <ProjectProgress value={stats.accessibility} color="bg-blue-500" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Best Practices</span>
                      <span className="font-bold text-yellow-400">{stats.bestPractices}%</span>
                    </div>
                    <ProjectProgress value={stats.bestPractices} color="bg-yellow-500" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">SEO</span>
                      <span className="font-bold text-highlight">{stats.seo}%</span>
                    </div>
                    <ProjectProgress value={stats.seo} color="bg-highlight" />
                  </div>
                </motion.div>

                {/* Quick Info Card */}
                <motion.div 
                  className="bg-[#0a0a0a] dark:bg-[#0a0a0a]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#00d9ff]/20"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-[#00d9ff]" />
                    Project Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-sm">Completed: {project.date || 'Dec 2024'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={16} className="text-gray-500" />
                      <span className="text-sm">Contributors: {project.contributors || '1'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Code size={16} className="text-gray-500" />
                      <span className="text-sm">Lines of Code: {project.loc || '5,000+'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield size={16} className="text-gray-500" />
                      <span className="text-sm">Status: {project.status || 'Production'}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Title and Metadata */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#4dfffe] bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {project.title}
                </motion.h1>
                
                <div className="flex flex-wrap gap-2">
                  {project.featured && (
                    <motion.span 
                      className="px-3 py-1 bg-gradient-to-r from-[#00d9ff] to-[#4dfffe] text-surface rounded-full flex items-center gap-2 text-sm font-semibold shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Star size={14} />
                      Featured
                    </motion.span>
                  )}
                  <motion.span 
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {project.category}
                  </motion.span>
                </div>
              </div>

              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.description}
              </motion.p>

              {/* Enhanced Action Buttons */}
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3.5 bg-[#0a0a0a] hover:bg-[#0a0a0a] rounded-xl transition-all group shadow-lg hover:shadow-black/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} className="group-hover:rotate-12 transition-transform" />
                  <span className="font-semibold">View Source Code</span>
                </motion.a>
                
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-[#00d9ff] to-[#4dfffe] hover:from-[#00d9ff]/80 hover:to-[#4dfffe]/80 rounded-xl transition-all group shadow-lg hover:shadow-accent/25"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                  <span className="font-semibold">Live Demo</span>
                </motion.a>
                
                {project.docs && (
                  <motion.a
                    href={project.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all group shadow-lg hover:shadow-blue-500/20"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Layers size={20} className="group-hover:rotate-12 transition-transform" />
                    <span className="font-semibold">Documentation</span>
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Image Slideshow Modal */}
          {isSlideshowOpen && project.gallery && (
            <ImageSlideshowModal
              images={project.gallery}
              onClose={() => setIsSlideshowOpen(false)}
            />
          )}

          {/* Navigation Tabs */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-wrap gap-2 border-b border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-all relative ${
                    activeTab === tab.id 
                      ? 'text-[#00d9ff]' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00d9ff] to-[#4dfffe]"
                      layoutId="activeTab"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <div className="mb-12">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Technologies Used with enhanced badges */}
                <div className="bg-surface bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-[#00d9ff]/20">
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, i) => (
                      <TechBadge 
                        key={tech} 
                        tech={tech} 
                        delay={i * 0.05}
                      />
                    ))}
                  </div>
                  
                  {/* Tech Stack Categories */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-blue-400">
                        <Cpu size={18} />
                        <h4 className="font-semibold">Frontend</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-green-400">
                        <Database size={18} />
                        <h4 className="font-semibold">Backend</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(3, 6).map(tech => (
                          <span key={tech} className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Cloud size={18} />
                        <h4 className="font-semibold">Infrastructure</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(6, 9).map(tech => (
                          <span key={tech} className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-highlight">
                        <Smartphone size={18} />
                        <h4 className="font-semibold">Tools</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(9, 12).map(tech => (
                          <span key={tech} className="px-3 py-1 bg-[#4dfffe]/10 text-highlight rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="bg-[#0a0a0a] dark:bg-[#0a0a0a]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#00d9ff]/20">
                  <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-[#00d9ff] mb-4 flex items-center gap-2">
                        <Zap size={20} />
                        Key Features
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          'Advanced machine learning algorithms implementation with real-time processing',
                          'Responsive and intuitive user interface with dark/light theme support',
                          'Comprehensive testing suite with 95%+ code coverage',
                          'Production-ready deployment with CI/CD pipeline',
                          'Real-time data visualization and analytics dashboard',
                          'Secure authentication and authorization system'
                        ].map((feature, i) => (
                          <motion.div
                            key={i}
                            className="flex items-start gap-3 p-4 bg-[#0a0a0a]/50 dark:bg-[#0a0a0a]/30 rounded-xl"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="p-2 bg-[#00d9ff]/20 rounded-lg">
                              <Zap size={16} className="text-[#00d9ff]" />
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#00d9ff] mb-4 flex items-center gap-2">
                        <Shield size={20} />
                        Technical Highlights
                      </h3>
                      <ul className="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300 pl-4">
                        <li>Implemented using modern best practices and design patterns for scalability</li>
                        <li>Optimized for performance with lazy loading and code splitting</li>
                        <li>Clean, maintainable, and well-documented codebase with TypeScript</li>
                        <li>Comprehensive error handling and validation systems</li>
                        <li>Microservices architecture with containerized deployment</li>
                        <li>Real-time WebSocket integration for live updates</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#00d9ff] mb-4 flex items-center gap-2">
                        <Globe size={20} />
                        Challenges & Solutions
                      </h3>
                      <div className="bg-gradient-to-r from-[#00d9ff]/10 to-[#4dfffe]/10 p-6 rounded-xl border border-[#00d9ff]/30">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          This project presented unique challenges in balancing performance with accuracy. 
                          Through iterative development and continuous testing, we implemented solutions 
                          that achieved optimal results while maintaining code quality and user experience.
                          The main challenge was scaling the machine learning model for real-time predictions,
                          which was solved by implementing a distributed computing approach and optimizing 
                          the inference pipeline. Another significant challenge was ensuring cross-platform 
                          compatibility, which was addressed through responsive design and progressive 
                          enhancement strategies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-[#00d9ff]/20"
              >
                <h2 className="text-2xl font-bold mb-8">Detailed Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: <Zap />, title: 'Real-time Processing', desc: 'Live data processing with WebSocket integration' },
                    { icon: <Shield />, title: 'Security', desc: 'End-to-end encryption and secure authentication' },
                    { icon: <TrendingUp />, title: 'Analytics', desc: 'Comprehensive analytics dashboard with real-time metrics' },
                    { icon: <Smartphone />, title: 'Responsive Design', desc: 'Mobile-first approach with adaptive layouts' },
                    { icon: <Database />, title: 'Data Management', desc: 'Efficient data storage and retrieval systems' },
                    { icon: <Cloud />, title: 'Cloud Integration', desc: 'Seamless cloud services integration' },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className="p-6 bg-surface/50 bg-surface/30 rounded-xl border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-[#00d9ff] to-[#4dfffe] rounded-xl group-hover:rotate-12 transition-transform">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'architecture' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Code Snippet Example */}
                <div className="bg-surface bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-[#00d9ff]/20">
                  <h3 className="text-xl font-semibold mb-4">Example Implementation</h3>
                  <CodeSnippet 
                    language="javascript"
                    code={`// Main service implementation
class DataProcessor {
  constructor(config) {
    this.config = config;
    this.cache = new Map();
  }

  async processData(data) {
    try {
      // Real-time data transformation
      const processed = await this.transform(data);
      
      // Cache optimization
      this.cache.set(data.id, processed);
      
      // Return processed results
      return {
        success: true,
        data: processed,
        timestamp: Date.now()
      };
    } catch (error) {
      // Comprehensive error handling
      return {
        success: false,
        error: error.message,
        timestamp: Date.now()
      };
    }
  }
}`}
                  />
                </div>

                {/* System Architecture */}
                <div className="bg-surface bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-[#00d9ff]/20">
                  <h3 className="text-xl font-semibold mb-6">System Architecture</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: 'Frontend Layer', tech: 'React, Redux, WebSocket' },
                      { title: 'Backend Services', tech: 'Node.js, Microservices, Redis' },
                      { title: 'Data Layer', tech: 'PostgreSQL, MongoDB, Elasticsearch' },
                    ].map((layer, i) => (
                      <motion.div
                        key={i}
                        className="p-6 bg-gradient-to-br from-[#00d9ff]/10 to-[#4dfffe]/10 rounded-xl border border-[#00d9ff]/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        <h4 className="font-bold mb-2">{layer.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{layer.tech}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-[#00d9ff]/20"
              >
                <h2 className="text-2xl font-bold mb-8">Project Analytics</h2>
                
                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: 'Daily Active Users', value: '2.5K', change: '+12%', icon: <Users /> },
                    { label: 'API Requests', value: '150K', change: '+8%', icon: <Globe /> },
                    { label: 'Uptime', value: '99.9%', change: '+0.1%', icon: <Shield /> },
                    { label: 'Response Time', value: '85ms', change: '-15%', icon: <Zap /> },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="p-6 bg-[#0a0a0a]/50 dark:bg-[#0a0a0a]/30 rounded-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-[#00d9ff]/20 rounded-lg">
                          {stat.icon}
                        </div>
                        <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart Simulation */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-6">Monthly Performance</h3>
                  <div className="h-64 bg-[#0a0a0a]/50 dark:bg-[#0a0a0a]/30 rounded-xl p-6">
                    <div className="flex items-end h-48 gap-2">
                      {generateChartData().map((data, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-[#00d9ff] to-[#4dfffe] rounded-t"
                          initial={{ height: 0 }}
                          animate={{ height: `${data.visits / 20}%` }}
                          transition={{ delay: i * 0.01, duration: 0.5 }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>Start</span>
                      <span>End</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Related Projects with enhanced design */}
          {relatedProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Related Projects</h2>
                <Link to="/" className="text-[#00d9ff] hover:text-[#4dfffe] transition-colors flex items-center gap-2">
                  View all projects
                  <ChevronRight size={18} />
                </Link>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject, index) => (
                  <motion.div
                    key={relatedProject.id}
                    className="bg-[#0a0a0a] dark:bg-[#0a0a0a]/50 backdrop-blur-sm rounded-xl p-6 border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all cursor-pointer group overflow-hidden relative"
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => navigate(`/project/${relatedProject.id}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Hover effect background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/0 via-[#00d9ff]/5 to-[#4dfffe]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {relatedProject.image}
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-[#00d9ff] transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {relatedProject.description}
                      </p>
                      <div className="flex items-center text-[#00d9ff] text-sm font-semibold">
                        View Project Details
                        <ChevronRight size={16} className="ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
