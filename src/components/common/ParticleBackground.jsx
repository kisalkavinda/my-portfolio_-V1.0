import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.color = color;
        this.radius = Math.random() * 1.5 + 1;
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, this.color + '40');
        gradient.addColorStop(1, this.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;

        this.vx *= 0.99;
        this.vy *= 0.99;
      }
    }

    const colors = ['#00e5ff', '#00ffff', '#4dfffe'];
    const particles = [];
    const numParticles = 200;

    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, color));
    }

    const rules = {
      '#00e5ff': { '#00e5ff': 0.01, '#00ffff': -0.015, '#4dfffe': 0.02 },
      '#00ffff': { '#00e5ff': -0.015, '#00ffff': 0.01, '#4dfffe': -0.01 },
      '#4dfffe': { '#00e5ff': 0.02, '#00ffff': -0.01, '#4dfffe': 0.015 },
    };

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let mouseInfluence = 0;

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseInfluence = 1;
    });

    canvas.addEventListener('mouseleave', () => {
      mouseInfluence = 0;
    });

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p1 => {
        particles.forEach(p2 => {
          if (p1 === p2) return;

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120 && dist > 0) {
            const force = (rules[p1.color][p2.color] || 0) * 0.5;
            const angle = Math.atan2(dy, dx);
            p1.vx += Math.cos(angle) * force;
            p1.vy += Math.sin(angle) * force;

            if (dist < 80) {
              ctx.strokeStyle = `${p1.color}${Math.floor((1 - dist / 80) * 50).toString(16).padStart(2, '0')}`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });

        if (mouseInfluence > 0) {
          const dx = mouseX - p1.x;
          const dy = mouseY - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const force = (1 - dist / 150) * 0.3 * mouseInfluence;
            const angle = Math.atan2(dy, dx);
            p1.vx -= Math.cos(angle) * force;
            p1.vy -= Math.sin(angle) * force;
          }
        }

        p1.update();
        p1.draw();
      });

      mouseInfluence *= 0.95;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default ParticleBackground;