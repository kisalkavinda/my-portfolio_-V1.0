import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Github } from 'lucide-react';

const ProjectDetailsModal = ({ project, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const hasGallery = project?.gallery && project.gallery.length > 0;

  // Preload images
  useEffect(() => {
    if (!project) return; // Ensure project is defined before accessing its properties
    if (hasGallery) {
      project.gallery.forEach((imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
      });
    }
  }, [project, hasGallery]);

  if (!project) return null;

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const handleNext = () => {
    if (!hasGallery) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % project.gallery.length);
  };

  const handlePrev = () => {
    if (!hasGallery) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + project.gallery.length) % project.gallery.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
                  className="bg-[#0a0a0a] dark:bg-[#0a0a0a]/90 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden border border-[#00d9ff]/20"        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Slideshow Section */}
                    <div className="w-full md:w-1/2 relative bg-[#0a0a0a] dark:bg-[#000000] flex items-center justify-center overflow-hidden">          {hasGallery ? (
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={project.gallery[currentIndex]}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                alt={`slide ${currentIndex}`}
                className="absolute w-full h-full object-cover"
              />
            </AnimatePresence>
          ) : (
             project.image.includes('.') ? 
              <img src={project.image} alt={project.title} className="w-full h-64 md:h-full object-cover" /> :
              <div className="text-8xl">{project.image}</div>
          )}

          {hasGallery && (
            <>
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-surface/40 text-text-primary hover:bg-surface/60 rounded-full p-2 transition-colors z-20"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-surface/40 text-text-primary hover:bg-surface/60 rounded-full p-2 transition-colors z-20"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          <h2 className="text-3xl font-bold mb-3 text-gray-900 text-text-primary">{project.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{project.description}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 text-sm bg-[#0a0a0a] dark:bg-[#0a0a0a]/80 rounded-full text-gray-700 dark:text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#00d9ff] hover:bg-[#4dfffe] rounded-lg text-surface font-semibold transition-all"
          >
            <Github size={18} />
            View Code on GitHub
          </a>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/40 text-text-primary hover:bg-black/60 rounded-full p-2 transition-colors z-20"
        >
          <X size={20} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetailsModal;
