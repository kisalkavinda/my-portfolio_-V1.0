import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Calendar, Award, BookOpen, Code, Briefcase, Rocket } from 'lucide-react'
import GlitchText from '../common/GlitchText'

import { timelineEvents } from '../../data/timeline'

const Timeline = () => {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"]
  });

  const scrollHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const height = useTransform(scrollHeight, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-20 px-4 relative overflow-hidden">
      {/* Separator line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-75 blur-sm z-0" />

      {/* Full section gradient overlay - transparent top, visible bottom */}
      <div className="absolute inset-0 pointer-events-none z-0 dark:bg-gradient-to-b dark:from-transparent dark:via-black/25 dark:to-black/55" />
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-highlight rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block p-4 bg-accent/10 rounded-full mb-4"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Calendar size={48} className="text-accent" />
          </motion.div>

          <h2 className="relative text-4xl md:text-5xl font-bold mb-4 font-heading">
            My <GlitchText text="Journey" />
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From first line of code to ML engineer in the making
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Central Line - Background (full height, dimmed) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent/20 via-highlight/20 to-accent/20 hidden md:block" />

          {/* Central Line - Animated (grows with scroll) */}
          {/* Central Line - Animated (grows with scroll) */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1.5 bg-gradient-to-b from-accent via-highlight to-accent hidden md:block shadow-[0_0_20px_rgba(124,58,237,0.6)]"
            style={{ height }}
          />

          {/* Animated Droplet at the end of the line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-accent to-highlight rounded-full hidden md:block shadow-[0_0_25px_rgba(124,58,237,0.8)] animate-pulse"
            style={{ top: height }}
          />

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col gap-2`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Branch Line - connects center to card */}
                <motion.div
                  className={`absolute hidden md:block h-0.5 bg-gradient-to-r ${index % 2 === 0
                    ? 'from-accent/60 to-transparent left-1/2'
                    : 'from-transparent to-accent/60 right-1/2'
                    } w-[4%] top-1/2 transform -translate-y-1/2 shadow-[0_0_10px_rgba(124,58,237,0.4)]`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                />
                {/* Content Card */}
                <motion.div
                  className={`w-full md:w-[48%] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-surface bg-surface/20 backdrop-blur-sm rounded-xl p-6 border-2 border-accent/40 hover:border-accent/50 transition-all group">
                    {/* Year Badge */}
                    <motion.div
                      className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${event.color} text-white font-bold mb-4 shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {event.year}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {event.title}
                    </h3>

                    {/* Organization */}
                    <p className={`text-accent font-semibold mb-3 flex items-center gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                      <Briefcase size={16} />
                      {event.organization}
                    </p>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Achievements */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                      {event.achievements.map((achievement, i) => (
                        <motion.span
                          key={`${event.id}-${achievement}`}
                          className="px-3 py-1 text-xs bg-accent/10 border-2 border-accent/50 rounded-full text-accent"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          {achievement}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Center Icon */}
                <motion.div
                  className={`absolute hidden md:block ${index % 2 === 0 ? 'md:left-[calc(50%+1rem)]' : 'md:right-[calc(50%+1rem)]'
                    }`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    type: "spring"
                  }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <div className={`p-4 bg-gradient-to-r ${event.color} rounded-full shadow-lg border-4 border-surface dark:border-background-main`}>
                    <event.icon size={24} className="text-surface" />
                  </div>
                </motion.div>

                {/* Spacer for opposite side */}
                <div className="w-full md:w-[48%] hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Continue Journey CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-block p-6 bg-gradient-to-r from-accent/10 to-highlight/10 rounded-2xl border-2 border-accent/40">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 justify-center">
              <Rocket className="w-6 h-6 text-accent" />
              The Journey Continues...
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Always learning, always building, always growing 🚀
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline;