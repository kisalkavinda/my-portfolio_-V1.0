import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Github, Sparkles } from 'lucide-react';

// Spark Component for button click effect
const Spark = ({ x, y, _id, color }) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      initial={{
        x: x,
        y: y,
        scale: 0.1,
        opacity: 1,
        backgroundColor: color,
        boxShadow: `0 0 5px ${color}, 0 0 10px ${color}`
      }}
      animate={{
        scale: [0.1, 1, 0],
        opacity: [1, 0.5, 0],
        x: [x, x + (Math.random() - 0.5) * 50],
        y: [y, y + (Math.random() - 0.5) * 50]
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        width: '8px',
        height: '8px',
      }}
    />
  );
};

// Data Flow Animation Component
const DataFlowAnimation = ({ isHovered }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 bg-accent"
          style={{
            left: `${15 * i + 10}%`,
            top: '-5px',
          }}
          animate={isHovered ? {
            y: [0, 400],
            opacity: [0, 1, 1, 0],
            scale: [1, 1.5, 1, 0.5]
          } : {}}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Circuit Pattern Component
const CircuitPattern = ({ _isHovered }) => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
      <defs>
        <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1" fill="currentColor" className="text-accent" />
          <circle cx="35" cy="5" r="1" fill="currentColor" className="text-accent" />
          <circle cx="5" cy="35" r="1" fill="currentColor" className="text-accent" />
          <circle cx="35" cy="35" r="1" fill="currentColor" className="text-accent" />
          <line x1="5" y1="5" x2="35" y2="5" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
          <line x1="5" y1="5" x2="5" y2="35" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );
};

const ProjectCard = ({ project, index, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [sparks, setSparks] = useState([]);
  const sparkIdCounter = useRef(0);
  const cardRef = useRef(null);


  const handleSpark = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newSpark = {
      id: sparkIdCounter.current++, // Use the incrementing counter
      x: x,
      y: y,
      color: Math.random() > 0.5 ? '#00d9ff' : '#4dfffe',
    };
    setSparks((prevSparks) => [...prevSparks, newSpark]);
    setTimeout(() => {
      setSparks((prevSparks) => prevSparks.filter((spark) => spark.id !== newSpark.id));
    }, 600); // Remove spark after animation
  };

  return (
    <motion.div
      ref={cardRef}
      className="h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
    >
      <Tilt
        options={{
          max: 15,
          scale: 1.05,
          speed: 1000,
          glare: true,
          "max-glare": 0.5,
        }}
        className="group relative rounded-xl overflow-hidden border-2 border-accent/40 backdrop-blur-sm min-h-[25rem] h-full transform-style-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >


        {/* Background and Inner Content */}
        <div className="relative bg-[#0a0a0a]/80 dark:bg-[#0a0a0a]/50 backdrop-blur-xl rounded-xl h-full w-full flex flex-col" style={{
          background: isHovered ? 'linear-gradient(135deg, rgba(10,10,10,0.7) 0%, rgba(0,217,255,0.05) 100%)' : undefined
        }}>        {/* Background Effects */}
          <DataFlowAnimation isHovered={isHovered} />
          <CircuitPattern isHovered={isHovered} />



          {/* Project Image/Icon */}
          <motion.div
            className="relative text-6xl p-8 bg-gradient-to-br from-accent/20 to-highlight/20 text-center overflow-hidden h-48 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {project.image}
            </motion.div>

            {/* Corner Accent */}
            <motion.div
              className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent to-transparent opacity-0 group-hover:opacity-30"
              initial={{ scale: 0, rotate: 0 }}
              whileHover={{ scale: 1, rotate: 45 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <div className="relative p-6 flex flex-col flex-grow">
            {/* Title and Badge */}
            <div className="flex items-center justify-between mb-3">
              <motion.h3
                className="text-xl font-bold"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {project.title}
              </motion.h3>
              {project.featured && (
                <motion.span
                  className="px-2 py-1 text-xs bg-accent text-surface rounded-full flex items-center gap-1"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Sparkles size={12} />
                  Featured
                </motion.span>
              )}
            </div>

            {/* Description */}
            <motion.p
              className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed flex-grow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {project.description}
            </motion.p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4 flex-grow-0">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={`${project.id}-${tech}`}
                  className="px-2 py-1 text-xs bg-surface/20 dark:bg-surface/50 rounded-md text-gray-600 dark:text-gray-400 border border-accent/0 hover:border-accent/30 transition-colors cursor-default"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 + i * 0.05 }}
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                    backgroundColor: 'rgba(0, 229, 255, 0.5)'
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-3 mt-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <motion.button
                onClick={(e) => {
                  onViewDetails();
                  handleSpark(e);
                }}
                className="group/btn flex items-center gap-2 px-4 py-2 bg-[#00d9ff] hover:bg-[#4dfffe] rounded-lg text-sm transition-all flex-1 justify-center text-surface relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={16} className="relative z-10 group-hover/btn:animate-pulse" />
                <span className="relative z-10">Details</span>
                <AnimatePresence>
                  {sparks.map((spark) => (
                    <Spark key={spark.id} {...spark} />
                  ))}
                </AnimatePresence>
              </motion.button>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] hover:bg-[#0a0a0a] rounded-lg text-sm transition-all flex-1 justify-center relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSpark}
              >
                <Github size={16} className="relative z-10 group-hover/btn:rotate-12 transition-transform" />
                <span className="relative z-10">Code</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-[#0a0a0a]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <AnimatePresence>
                  {sparks.map((spark) => (
                    <Spark key={spark.id} {...spark} />
                  ))}
                </AnimatePresence>
              </motion.a>

            </motion.div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};


export default ProjectCard;