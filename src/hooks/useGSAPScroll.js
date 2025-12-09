import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

/**
 * Custom hook for GSAP ScrollTrigger animations
 * Provides replayable scroll animations that work on both scroll down and scroll up
 * 
 * @param {Object} options - Animation options
 * @param {string} options.trigger - CSS selector or ref for trigger element
 * @param {string} options.animation - Animation type: 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'scale', 'stagger'
 * @param {number} options.duration - Animation duration in seconds (default: 0.8)
 * @param {number} options.delay - Animation delay in seconds (default: 0)
 * @param {string} options.easing - GSAP easing function (default: 'power2.out')
 * @param {number} options.stagger - Stagger delay for child elements (default: 0.1)
 * @param {Array} options.dependencies - React dependencies array for re-initialization
 */
export const useGSAPScroll = ({
    trigger,
    animation = 'fade-up',
    duration = 0.8,
    delay = 0,
    easing = 'power2.out',
    stagger = 0.1,
    dependencies = []
} = {}) => {
    const elementRef = useRef(null)

    useEffect(() => {
        const element = trigger || elementRef.current
        if (!element) return

        // Get the target elements
        const targets = typeof element === 'string'
            ? document.querySelectorAll(element)
            : element

        if (!targets || (targets.length !== undefined && targets.length === 0)) return

        // Define animation configurations
        const animations = {
            'fade-up': {
                from: { opacity: 0, y: 60 },
                to: { opacity: 1, y: 0 }
            },
            'fade-down': {
                from: { opacity: 0, y: -60 },
                to: { opacity: 1, y: 0 }
            },
            'fade-left': {
                from: { opacity: 0, x: -60 },
                to: { opacity: 1, x: 0 }
            },
            'fade-right': {
                from: { opacity: 0, x: 60 },
                to: { opacity: 1, x: 0 }
            },
            'scale': {
                from: { opacity: 0, scale: 0.8 },
                to: { opacity: 1, scale: 1 }
            },
            'stagger': {
                from: { opacity: 0, y: 40 },
                to: { opacity: 1, y: 0 }
            }
        }

        const config = animations[animation] || animations['fade-up']

        // Set initial state
        gsap.set(targets, config.from)

        // Create the ScrollTrigger animation
        const scrollTrigger = ScrollTrigger.create({
            trigger: targets.length !== undefined ? targets[0] : targets,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
            onEnter: () => {
                if (animation === 'stagger' && targets.length > 1) {
                    gsap.to(targets, {
                        ...config.to,
                        duration,
                        ease: easing,
                        stagger: stagger,
                        delay: delay
                    })
                } else {
                    gsap.to(targets, {
                        ...config.to,
                        duration,
                        ease: easing,
                        delay: delay
                    })
                }
            },
            onLeaveBack: () => {
                gsap.to(targets, {
                    ...config.from,
                    duration: duration * 0.6,
                    ease: easing
                })
            }
        })

        // Cleanup
        return () => {
            scrollTrigger.kill()
        }
    }, [trigger, animation, duration, delay, easing, stagger, ...dependencies])

    return elementRef
}

/**
 * Utility function to create scroll animations imperatively
 * Useful for more complex animation sequences
 */
export const createScrollAnimation = (target, options = {}) => {
    const {
        from = { opacity: 0, y: 60 },
        to = { opacity: 1, y: 0 },
        duration = 0.8,
        delay = 0,
        easing = 'power2.out',
        start = 'top 85%',
        end = 'bottom 15%',
        scrub = false
    } = options

    gsap.set(target, from)

    return gsap.to(target, {
        ...to,
        duration,
        delay,
        ease: easing,
        scrollTrigger: {
            trigger: target,
            start,
            end,
            toggleActions: 'play reverse play reverse',
            scrub
        }
    })
}

export default useGSAPScroll
