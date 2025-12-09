import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150; // Increased offset for better detection
      
      let current = 'home';
      
      // Iterate through sections from bottom to top
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        const element = document.getElementById(sectionId);
        
        if (element) {
          const { offsetTop } = element;
          
          // If we've scrolled past this section, it's the active one
          if (scrollPos >= offsetTop) {
            current = sectionId;
            break;
          }
        }
      }
      
      setActiveSection(current);
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
};