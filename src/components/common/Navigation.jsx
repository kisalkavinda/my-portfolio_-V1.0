import React from 'react';
import { motion } from 'framer-motion';
import { useScrollTo } from '../../hooks/useScrollTo';

const Navigation = ({ activeSection, className = '', onItemClick }) => {
  const scrollToSection = useScrollTo();

  const navItems = [
    { id: 'home', label: 'Home', sections: ['home'] },
    { id: 'about', label: 'About', sections: ['about'] },
    { id: 'skills', label: 'Skills', sections: ['skills', 'tech-stack'] },
    { id: 'projects', label: 'Projects', sections: ['projects', 'github-stats'] },
    { id: 'certificates', label: 'Certificates', sections: ['certificates'] },
    { id: 'contact', label: 'Contact', sections: ['contact'] },
  ];

  const handleClick = (sectionId) => {
    scrollToSection(sectionId);
    if (onItemClick) {
      onItemClick();
    }
  };

  const isActive = (item) => {
    return item.sections.includes(activeSection);
  };

  return (
    <nav className={className}>
      <ul className="flex items-center p-1.5 bg-gradient-to-b from-surface/90 to-background-main/90 backdrop-blur-md rounded-full border border-accent/20 shadow-[0_0_15px_rgba(0,217,255,0.05)]">
        {navItems.map((item) => (
          <li key={item.id} className="relative z-0">
            <button
              onClick={() => handleClick(item.id)}
              className={`relative px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-full font-sans ${isActive(item) ? 'text-black' : 'text-text-primary/70 hover:text-white'
                }`}
            >
              <span className="relative z-10">{item.label}</span>

              {isActive(item) && (
                <motion.div
                  className="absolute inset-0 bg-accent rounded-full -z-0"
                  layoutId="activePill"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
