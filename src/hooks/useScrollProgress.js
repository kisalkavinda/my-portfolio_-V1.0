import { useState, useEffect } from 'react';

const useScrollProgress = (sectionRef) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { scrollTop, clientHeight } = document.documentElement;
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;

        let progress = 0;
        if (scrollTop > sectionTop) {
          progress = Math.min(
            100,
            ((scrollTop - sectionTop) / (sectionHeight - clientHeight)) * 100
          );
        }
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRef]);

  return scrollProgress;
};

export default useScrollProgress;