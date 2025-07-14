
"use client";

import { useEffect, useRef, useState } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const animationNames = ['Particles', 'Waves', 'Matrix', 'Geometric', 'Off'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || currentAnimation === 4) return; // 4 is 'Off' state

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let smoothMouseX = mouseX;
    let smoothMouseY = mouseY;

    // Mouse move handler with smooth interpolation
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation 1: Particles (original)
    const particleAnimation = () => {
      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        opacity: number;
        color: string;
      }> = [];

      // Create particles
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          color: ['#64ffda', '#bb86fc', '#03dac6'][Math.floor(Math.random() * 3)]
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Smooth mouse movement interpolation
        smoothMouseX += (mouseX - smoothMouseX) * 0.05;
        smoothMouseY += (mouseY - smoothMouseY) * 0.05;

        particles.forEach((particle, index) => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Smooth mouse interaction
          const dx = smoothMouseX - particle.x;
          const dy = smoothMouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const force = (150 - distance) / 150;
            const angle = Math.atan2(dy, dx);
            particle.x += Math.cos(angle) * force * 2;
            particle.y += Math.sin(angle) * force * 2;
          }

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          // Draw particle
          ctx.save();
          ctx.globalAlpha = particle.opacity;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Draw connections
          particles.forEach((otherParticle, otherIndex) => {
            if (index === otherIndex) return;

            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.save();
              ctx.globalAlpha = (120 - distance) / 120 * 0.3;
              ctx.strokeStyle = particle.color;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              ctx.restore();
            }
          });
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();
    };

    // Animation 2: Waves
    const waveAnimation = () => {
      let time = 0;
      const waves = [
        { amplitude: 50, frequency: 0.02, phase: 0, color: '#64ffda' },
        { amplitude: 30, frequency: 0.03, phase: Math.PI / 2, color: '#bb86fc' },
        { amplitude: 40, frequency: 0.025, phase: Math.PI, color: '#03dac6' }
      ];

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Smooth mouse movement interpolation
        smoothMouseX += (mouseX - smoothMouseX) * 0.05;
        smoothMouseY += (mouseY - smoothMouseY) * 0.05;

        waves.forEach((wave, index) => {
          ctx.save();
          ctx.globalAlpha = 0.3;
          ctx.strokeStyle = wave.color;
          ctx.lineWidth = 2;
          ctx.beginPath();

          const mouseInfluence = Math.sqrt(
            Math.pow(smoothMouseX - canvas.width / 2, 2) + 
            Math.pow(smoothMouseY - canvas.height / 2, 2)
          ) / 200;

          for (let x = 0; x < canvas.width; x += 5) {
            const y = canvas.height / 2 + 
              Math.sin(x * wave.frequency + time + wave.phase) * wave.amplitude * 
              (1 + mouseInfluence * 0.5);
            
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.stroke();
          ctx.restore();
        });

        time += 0.02;
        animationId = requestAnimationFrame(animate);
      };

      animate();
    };

    // Animation 3: Matrix-like
    const matrixAnimation = () => {
      const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const drops: Array<{ x: number; y: number; speed: number; char: string; opacity: number }> = [];

      // Create drops
      for (let i = 0; i < 30; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 1,
          char: characters[Math.floor(Math.random() * characters.length)],
          opacity: Math.random() * 0.8 + 0.2
        });
      }

      const animate = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Smooth mouse movement interpolation
        smoothMouseX += (mouseX - smoothMouseX) * 0.05;
        smoothMouseY += (mouseY - smoothMouseY) * 0.05;

        drops.forEach((drop) => {
          // Mouse interaction
          const dx = smoothMouseX - drop.x;
          const dy = smoothMouseY - drop.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            drop.x += dx * force * 0.02;
            drop.y += dy * force * 0.02;
          }

          drop.y += drop.speed;

          if (drop.y > canvas.height) {
            drop.y = -20;
            drop.x = Math.random() * canvas.width;
            drop.char = characters[Math.floor(Math.random() * characters.length)];
          }

          ctx.save();
          ctx.globalAlpha = drop.opacity;
          ctx.fillStyle = '#00ff00';
          ctx.font = '20px monospace';
          ctx.fillText(drop.char, drop.x, drop.y);
          ctx.restore();
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();
    };

    // Animation 4: Geometric
    const geometricAnimation = () => {
      const shapes: Array<{
        x: number;
        y: number;
        size: number;
        rotation: number;
        rotationSpeed: number;
        type: 'triangle' | 'square' | 'circle';
        color: string;
        opacity: number;
      }> = [];

      // Create shapes
      for (let i = 0; i < 20; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 30 + 10,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type: ['triangle', 'square', 'circle'][Math.floor(Math.random() * 3)] as 'triangle' | 'square' | 'circle',
          color: ['#64ffda', '#bb86fc', '#03dac6'][Math.floor(Math.random() * 3)],
          opacity: Math.random() * 0.6 + 0.2
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Smooth mouse movement interpolation
        smoothMouseX += (mouseX - smoothMouseX) * 0.05;
        smoothMouseY += (mouseY - smoothMouseY) * 0.05;

        shapes.forEach((shape) => {
          // Mouse interaction
          const dx = smoothMouseX - shape.x;
          const dy = smoothMouseY - shape.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            shape.x += dx * force * 0.01;
            shape.y += dy * force * 0.01;
            shape.size += force * 5;
          }

          shape.rotation += shape.rotationSpeed;

          ctx.save();
          ctx.translate(shape.x, shape.y);
          ctx.rotate(shape.rotation);
          ctx.globalAlpha = shape.opacity;
          ctx.strokeStyle = shape.color;
          ctx.lineWidth = 2;

          if (shape.type === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(0, -shape.size);
            ctx.lineTo(-shape.size * 0.866, shape.size * 0.5);
            ctx.lineTo(shape.size * 0.866, shape.size * 0.5);
            ctx.closePath();
            ctx.stroke();
          } else if (shape.type === 'square') {
            ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
            ctx.stroke();
          }

          ctx.restore();
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();
    };

    // Select animation based on currentAnimation state
    switch (currentAnimation) {
      case 0:
        particleAnimation();
        break;
      case 1:
        waveAnimation();
        break;
      case 2:
        matrixAnimation();
        break;
      case 3:
        geometricAnimation();
        break;
      default:
        break;
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [currentAnimation]);

  const nextAnimation = () => {
    setCurrentAnimation((prev) => (prev + 1) % animationNames.length);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500 ${
          currentAnimation === 4 ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ background: 'transparent' }}
      />

      {/* Toggle Button */}
      <button
        onClick={nextAnimation}
        className="fixed bottom-8 right-8 z-50 backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 flex flex-col items-center"
        title={`Current: ${animationNames[currentAnimation]}`}
      >
        <span className="text-lg mb-1">
          {currentAnimation === 4 ? '💤' : '🎨'}
        </span>
        <span className="text-xs font-mono">
          {animationNames[currentAnimation]}
        </span>
      </button>
    </>
  );
}
