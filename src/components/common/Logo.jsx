import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ className = '', size = 40 }) => {
    return (
        <motion.div
            className={`relative flex items-center gap-3 ${className}`}
            whileHover="hover"
            initial="initial"
        >
            <div className="relative" style={{ width: size, height: size }}>
                {/* Glow effect background */}
                <motion.div
                    className="absolute inset-0 bg-accent/20 blur-xl rounded-full"
                    variants={{
                        initial: { opacity: 0.5, scale: 0.8 },
                        hover: { opacity: 0.8, scale: 1.2 }
                    }}
                    transition={{ duration: 0.5 }}
                />

                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00d9ff" />
                            <stop offset="100%" stopColor="#4dfffe" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Main K Shape - Vertical Bar */}
                    <motion.path
                        d="M25 15 V85"
                        stroke="url(#logoGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        variants={{
                            initial: { pathLength: 1, opacity: 1 },
                            hover: { pathLength: 1, opacity: 1 } // Keep solid
                        }}
                    />

                    {/* Main K Shape - Upper Arm */}
                    <motion.path
                        d="M25 50 L75 15"
                        stroke="url(#logoGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        variants={{
                            initial: { pathLength: 1 },
                            hover: { pathLength: 1 }
                        }}
                    />

                    {/* Main K Shape - Lower Arm */}
                    <motion.path
                        d="M25 50 L75 85"
                        stroke="url(#logoGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        variants={{
                            initial: { pathLength: 1 },
                            hover: { pathLength: 1 }
                        }}
                    />

                    {/* Tech Nodes/Circuits - Decorative elements */}
                    {/* Node 1: Top Right */}
                    <motion.circle
                        cx="75"
                        cy="15"
                        r="4"
                        fill="#4dfffe"
                        variants={{
                            initial: { scale: 0 },
                            hover: { scale: 1 }
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    />

                    {/* Node 2: Bottom Right */}
                    <motion.circle
                        cx="75"
                        cy="85"
                        r="4"
                        fill="#00d9ff"
                        variants={{
                            initial: { scale: 0 },
                            hover: { scale: 1 }
                        }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    />

                    {/* Circuit Line 1 */}
                    <motion.path
                        d="M82 15 H90"
                        stroke="#4dfffe"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        variants={{
                            hover: { pathLength: 1, opacity: 1 }
                        }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    />

                    {/* Circuit Line 2 */}
                    <motion.path
                        d="M82 85 H90"
                        stroke="#00d9ff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        variants={{
                            hover: { pathLength: 1, opacity: 1 }
                        }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                    />
                </svg>
            </div>

            <div className="flex flex-col">
                <motion.span
                    className="text-xl font-bold bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent font-heading tracking-wider"
                    variants={{
                        initial: { letterSpacing: "0.05em" },
                        hover: { letterSpacing: "0.1em" }
                    }}
                    transition={{ duration: 0.3 }}
                >
                    KISAL
                </motion.span>
                <motion.span
                    className="text-xs font-semibold text-text-primary/70 tracking-[0.2em] uppercase"
                    variants={{
                        initial: { opacity: 0.7, x: 0 },
                        hover: { opacity: 1, x: 2 }
                    }}
                >
                    Kavinda
                </motion.span>
            </div>
        </motion.div>
    );
};

export default Logo;
