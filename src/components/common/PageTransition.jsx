import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const PageTransition = ({ children }) => {
  const location = useLocation()

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    enter: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.48, 0.15, 0.25, 0.96]
      }
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.48, 0.15, 0.25, 0.96]
      }
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition