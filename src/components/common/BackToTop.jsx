import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            // Show button after scrolling 100vh
            if (window.scrollY > window.innerHeight) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed left-8 bottom-8 z-40 p-4 bg-accent text-surface rounded-full shadow-lg hover:shadow-accent/50 transition-all"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)' }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    aria-label="Back to top"
                >
                    <ArrowUp size={24} />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default BackToTop
