import React, { useRef, useEffect } from 'react';

const DigitalRain = ({
  color = '#00ff88',
  charSize = 14,
  speed = 1.0,        // multiplier for drop speed
  density = 0.5,      // 0..1, how many columns are active
  interactive = false,
  mixBlendMode = 'screen',
  className = ''
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({ cols: [], width: 0, height: 0, columns: 0, mouseX: 0, mouseY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * devicePixelRatio);
      canvas.height = Math.floor(h * devicePixelRatio);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const columns = Math.floor(w / charSize);
      stateRef.current = {
        ...stateRef.current,
        width: w,
        height: h,
        columns,
        cols: new Array(columns).fill(0).map(() => Math.random() < density ? Math.floor(Math.random() * h / charSize) : 0)
      };
      ctx.font = `${charSize}px monospace`;
      ctx.textBaseline = 'top';
    };

    const onMouseMove = e => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouseX = (e.clientX - rect.left) / rect.width;
      stateRef.current.mouseY = (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener('resize', resize, { passive: true });
    if (interactive) canvas.addEventListener('mousemove', onMouseMove, { passive: true });

    resize();

    const draw = () => {
      const s = stateRef.current;
      // semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, s.width, s.height);

      for (let i = 0; i < s.columns; i++) {
        if (s.cols[i] <= 0 && Math.random() > density) {
          // leave column blank occasionally
          continue;
        }
        const x = i * charSize;
        let yIndex = s.cols[i];
        // if interactive, bias drops towards mouse X
        const bias = interactive ? (1 - Math.abs((i / s.columns) - stateRef.current.mouseX)) : 0;
        const localSpeed = (speed * (0.5 + Math.random() * 0.75)) + bias * speed * 3;

        // draw a few characters per column to give streak
        const streakLen = 1 + Math.floor(Math.random() * 3);
        for (let j = 0; j < streakLen; j++) {
          const ch = chars.charAt(Math.floor(Math.random() * chars.length));
          const y = (yIndex - j) * charSize;
          // bright head
          if (j === 0) {
            ctx.fillStyle = color;
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillText(ch, x, y);
          } else {
            ctx.fillStyle = 'rgba(0,255,140,0.25)';
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillText(ch, x, y);
          }
        }

        s.cols[i] = yIndex + localSpeed;
        // reset if off-screen
        if (s.cols[i] * charSize > s.height + Math.random() * 1000) {
          s.cols[i] = Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 10) - 10;
        }
      }

      // restore composite op
      ctx.globalCompositeOperation = 'source-over';
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (interactive) canvas.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [charSize, speed, density, color, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ mixBlendMode }}
    />
  );
};

export default DigitalRain;
