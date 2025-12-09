import React, { useRef, useEffect, useCallback } from 'react';
// FIXED: Added an extra "../" to reach the src folder


const DigitalRainBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const darkMode = true; // Hardcode to dark mode

  const resizeCanvas = useCallback((canvas, ctx, columns, drops, fontSize) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
    
    // Set initial background clear
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    return { columns, drops };
  }, [darkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const fontSize = 14; 
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1); 

    // Matrix colors matching your theme (Purple/Pink/Slate)
    const currentColors = [
      '#00d9ff', // accent
      '#4dfffe', // highlight
      'rgba(0, 217, 255, 0.7)', // a slightly transparent version of accent
      'rgba(77, 255, 254, 0.7)', // a slightly transparent version of highlight
    ];

    const draw = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`; 

      for (let i = 0; i < drops.length; i++) {
        // Random characters
        const text = String.fromCharCode(
          Math.random() > 0.5 
            ? 0x30A0 + Math.random() * 96 
            : 0x0021 + Math.random() * 93
        );
        
        const color = currentColors[Math.floor(Math.random() * currentColors.length)];
        ctx.fillStyle = color;

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }

        drops[i]++;
      }
      animationFrameId.current = requestAnimationFrame(draw);
    };

    // Initial setup
    let currentCols = columns;
    let currentDrops = drops;

    const handleResize = () => {
      const { columns: newCols, drops: newDrops } = resizeCanvas(canvas, ctx, currentCols, currentDrops, fontSize);
      currentCols = newCols;
      currentDrops = newDrops;
      drops = newDrops;
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [resizeCanvas]); 

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-0 w-full h-full pointer-events-none opacity-40"
      aria-hidden="true"
    />
  );
};

export default DigitalRainBackground;