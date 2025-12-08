import React from 'react'
import { motion } from 'framer-motion'

const InfiniteMarquee = ({ items, direction = 'left', speed = 30 }) => {
    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items]

    return (
        <div className="relative overflow-hidden py-4">
            <motion.div
                className="flex gap-6"
                animate={{
                    x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: speed,
                        ease: 'linear',
                    },
                }}
                style={{ width: 'max-content' }}
            >
                {duplicatedItems.map((item, index) => (
                    <motion.div
                        key={`${item.name}-${index}`}
                        className="flex-shrink-0 group"
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="relative bg-surface/30 backdrop-blur-sm rounded-xl px-6 py-4 border border-accent/20 hover:border-accent/50 transition-all min-w-[140px]">
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />

                            <div className="relative z-10 flex flex-col items-center gap-2">
                                {/* Icon */}
                                <motion.div
                                    className="text-4xl"
                                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {item.icon}
                                </motion.div>

                                {/* Name */}
                                <h4 className="font-semibold text-sm text-center group-hover:text-accent transition-colors">
                                    {item.name}
                                </h4>

                                {/* Level Badge */}
                                <div className="text-xs text-text-secondary bg-surface/50 px-2 py-1 rounded-full">
                                    {item.level}%
                                </div>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_20px_rgba(0,217,255,0.3)]" />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default InfiniteMarquee
