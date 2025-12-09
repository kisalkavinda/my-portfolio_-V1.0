import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Brain, Sparkles, Code, Download } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'

// Data Imports
import { personalInfo } from '../../data/personalInfo'
import { useScrollTo } from '../../hooks/useScrollTo'
import GlitchText from '../common/GlitchText'
import TextType from '../common/TextType'
import { PDFDownloadLink } from '@react-pdf/renderer'
import CVDocument from '../pdf/CVDocument'

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// =====================================
//  Background Neural Network
// =====================================
const NeuralNetwork = () => {
  const nodes = [
    { x: 15, y: 40, layer: 0 },
    { x: 15, y: 60, layer: 0 },
    { x: 50, y: 35, layer: 1 },
    { x: 50, y: 50, layer: 1 },
    { x: 50, y: 65, layer: 1 },
    { x: 85, y: 45, layer: 2 },
    { x: 85, y: 55, layer: 2 }
  ]

  return (
    <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
      {nodes.map((node, i) =>
        nodes.slice(i + 1).map((targetNode, j) => {
          const k = i + 1 + j
          if (targetNode.layer === node.layer + 1) {
            return (
              <motion.line
                key={`${i}-${k}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${targetNode.x}%`}
                y2={`${targetNode.y}%`}
                stroke="currentColor"
                className="text-[var(--accent)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            )
          }
          return null
        })
      )}
    </svg>
  )
}

// =====================================
//  Main Hero Component
// =====================================
const Hero = () => {
  const scrollToSection = useScrollTo()
  const [currentRole, setCurrentRole] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // GSAP refs
  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const greetingRef = useRef(null)
  const nameRef = useRef(null)
  const roleRef = useRef(null)
  const descRef = useRef(null)
  const buttonsRef = useRef(null)
  const badgesRef = useRef(null)
  const modelRef = useRef(null)

  const roles = [
    'ML Enthusiast',
    'Computer Engineering Student',
    'IoT & Sensor Developer',
    'Future ML Engineer'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!heroRef.current) return

    const ctx = gsap.context(() => {
      // Logo animation
      gsap.from(logoRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })

      // Greeting text
      gsap.from(greetingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })

      // Name
      gsap.from(nameRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })

      // Description - animates on page load (no ScrollTrigger needed since it's at top)
      gsap.fromTo(descRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.2,
          ease: 'power3.out'
        }
      )

      // Buttons
      gsap.from(buttonsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })

      // Tech badges stagger
      if (badgesRef.current) {
        const badges = badgesRef.current.children
        gsap.from(badges, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          delay: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        })
      }

      // 3D Model
      gsap.from(modelRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = personalInfo.resume
    link.download = 'Kisal_Kavinda_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const techColors = {
    TensorFlow: {
      bg: "bg-accent/10",
      border: "border-accent/40",
      text: "text-accent",
      hoverBorder: "hover:border-highlight"
    },
    Python: {
      bg: "bg-accent/10",
      border: "border-accent/40",
      text: "text-accent",
      hoverBorder: "hover:border-highlight"
    },
    HTML: {
      bg: "bg-accent/10",
      border: "border-accent/40",
      text: "text-accent",
      hoverBorder: "hover:border-highlight"
    },
    CSS: {
      bg: "bg-accent/10",
      border: "border-accent/40",
      text: "text-accent",
      hoverBorder: "hover:border-highlight"
    },
    Java: {
      bg: "bg-accent/10",
      border: "border-accent/40",
      text: "text-accent",
      hoverBorder: "hover:border-highlight"
    },
    PHP: {
      bg: "bg-accent/10",
      border: "border-accent/40",
      text: "text-accent",
      hoverBorder: "hover:border-highlight"
    },
    PyCharm: {
      bg: "bg-accent/10",
      border: "border-accent/40",
      text: "text-accent",
      hoverBorder: "hover:border-highlight"
    },
    default: {
      bg: "bg-accent/10",
      border: "border-accent/40",
      text: "text-accent",
      hoverBorder: "hover:border-highlight"
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center w-full px-3 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 sm:pb-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-75 blur-sm z-0" />
      <div className="absolute inset-0 pointer-events-none z-0 dark:bg-gradient-to-b dark:from-transparent dark:via-black/25 dark:to-black/55" />
      <NeuralNetwork />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ================= LEFT COLUMN ================= */}
          <div className="text-center lg:text-left">
            <motion.div
              ref={logoRef}
              className="inline-block relative mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <motion.div
                className="absolute inset-0 bg-[var(--accent)] rounded-full opacity-60 blur-xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative p-4 bg-[var(--accent)]/10 backdrop-blur-sm rounded-full border border-[var(--accent)]">
                <Brain size={64} className="text-[var(--accent)]" />
              </div>
            </motion.div>

            <motion.div
              ref={greetingRef}
              className="mb-1"
            >
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent text-sm sm:text-base">
                <Sparkles className="w-4 h-4 text-accent" />
                {"Hello, I'm".split(" ").map((word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="inline-block"
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </span>
            </motion.div>

            <motion.h1
              ref={nameRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-1"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <GlitchText
                text={personalInfo.name}
                className="bg-gradient-to-r from-highlight via-accent to-highlight bg-clip-text text-transparent font-display"
                delay={0.3}
              />
            </motion.h1>

            <div ref={roleRef} className="h-14 sm:h-16 md:h-20 mb-2 relative overflow-hidden">
              <TextType
                text={roles}
                as="h2"
                className="absolute inset-x-0 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-text-primary/70 via-text-primary to-text-primary/70 bg-clip-text text-transparent font-heading"
                typingSpeed={70}
                deletingSpeed={40}
              />
            </div>

            <motion.p
              ref={descRef}
              className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              I&apos;m an innovative Computer Engineering student passionate about crafting intelligent systems and exploring emerging technologies.
            </motion.p>

            <motion.div
              ref={buttonsRef}
              className="flex gap-4 justify-center lg:justify-start flex-wrap mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-3 bg-[var(--accent)] rounded-lg font-semibold transition-all shadow-lg hover:shadow-[0_0_40px_rgba(var(--accent-rgb),0.8)] hover:bg-transparent border border-transparent hover:border-[var(--accent)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2 text-black group-hover:text-[var(--accent)]">
                  View Projects
                  <Code className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>                                </motion.button>
              <PDFDownloadLink
                document={<CVDocument />}
                fileName="Kisal_Kavinda_CV.pdf"
                className="text-decoration-none"
                style={{ textDecoration: 'none' }}
              >
                {({ loading }) => (
                  <motion.button
                    className="group px-8 py-3 border-2 border-[var(--accent)] rounded-lg font-semibold transition-all backdrop-blur-sm hover:bg-[var(--accent)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-2 text-[var(--accent)] group-hover:text-surface">
                      <Download className="w-5 h-5 group-hover:animate-bounce" />
                      {loading ? 'Preparing...' : 'Download CV'}
                    </span>
                  </motion.button>
                )}
              </PDFDownloadLink>            </motion.div>

            <motion.div
              ref={badgesRef}
              className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {['TensorFlow', 'Python', 'HTML', 'CSS', 'Java', 'PHP', 'PyCharm'].map(
                (tech, i) => {
                  const colors = techColors[tech] || techColors.default;
                  return (
                    <motion.span
                      key={tech}
                      className={`px-3 py-1.5 md:px-4 md:py-2 ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-full text-xs md:text-sm ${colors.text} ${colors.hoverBorder} transition-all cursor-default`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  )
                }
              )}
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN (3D Model) ================= */}
          <motion.div
            ref={modelRef}
            className="w-full h-[380px] sm:h-[450px] md:h-[500px] lg:h-[600px] relative flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              className="relative w-full max-w-[450px] md:max-w-[500px] lg:max-w-[550px] aspect-square mx-auto cursor-pointer group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* ✅ Fixed Lottie Animation (centered & proportional) */}
              <motion.div
                className="relative z-10 w-full h-full flex items-center justify-center"
                animate={{
                  scale: isHovering ? 1.08 : 1,
                  rotate: isHovering ? 3 : 0
                }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 180 }}
              >
                <DotLottieReact
                  src={`${import.meta.env.BASE_URL}animations/Ai Robot Vector Art.json`}
                  loop
                  autoplay
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 text-[var(--accent)] hover:text-[var(--cyan-light)] transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.3 },
            y: { duration: 2, repeat: Infinity }
          }}
        >
          <ChevronDown size={32} />
        </motion.button>
      </div>
    </section>
  )
}

export default Hero