import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Navigation from './Navigation'
import Logo from './Logo'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { useScrollTo } from '../../hooks/useScrollTo'
import MagneticButton from '../ui/MagneticButton'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollTo = useScrollTo()

  // Include ALL sections including tech-stack and github-stats
  const activeSection = useScrollSpy([
    'home',
    'about',
    'skills',
    'tech-stack',
    'projects',
    'github-stats',
    'certificates',
    'neural-network',
    'contact'
  ])

  // Detect scroll to shrink header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-accent/10`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background layer */}
      <div className={`absolute inset-0 bg-background-main/80 backdrop-blur-md transition-all duration-300 ${isScrolled ? 'shadow-lg shadow-black/20' : ''
        }`} />

      {/* Animated gradient overlay (fainter for this clean look) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className={`relative w-full px-3 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'
        }`}>
        {/* Logo Section - Responsive width */}
        <div className="flex-shrink-0">
          <Logo size={32} />
        </div>

        {/* Desktop Navigation - Centered Pill */}
        <div className="hidden md:flex flex-1 justify-center">
          <Navigation
            activeSection={activeSection}
            className=""
          />
        </div>

        {/* Actions Section - CTA Button & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-4 justify-end"
        >
          {/* CTA Button */}
          <MagneticButton
            onClick={() => scrollTo('contact')}
            className="hidden md:block px-6 py-2.5 bg-accent text-black font-semibold rounded-full text-sm shadow-[0_0_15px_rgba(0,217,255,0.3)] border border-accent/50"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(0, 217, 255, 0.5)",
              backgroundColor: "#4dfffe" // lighter cyan on hover
            }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </MagneticButton>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-full bg-surface/50 border border-accent/20 text-accent shadow-[0_0_10px_rgba(0,217,255,0.1)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={20} className="text-accent" /> : <Menu size={20} className="text-accent" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full bg-background-main/95 backdrop-blur-xl border-b border-accent/20 shadow-2xl overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex flex-col p-6 gap-4">
              <Navigation
                activeSection={activeSection}
                className="flex flex-col w-full gap-2 items-start"
                onItemClick={() => setIsMenuOpen(false)}
              />
              <motion.button
                onClick={() => {
                  setIsMenuOpen(false);
                  setTimeout(() => scrollTo('contact'), 100);
                }}
                className="w-full py-3 mt-2 bg-accent/10 border border-accent text-accent font-bold rounded-xl hover:bg-accent hover:text-black transition-all"
                whileTap={{ scale: 0.98 }}
              >
                Let's Talk
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header