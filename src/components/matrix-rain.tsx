'use client';

import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Matrix characters - numbers and symbols
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Array of drops - one per column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Draw function
    function draw() {
      if (!ctx || !canvas) return;

      // Black background with higher opacity for more subtle trail
      ctx.fillStyle = 'rgba(2, 4, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties - lighter color with lower opacity
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)'; // Very subtle cyan
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw character
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        // Reset drop to top randomly after it crosses the screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment Y coordinate
        drops[i]++;
      }
    }

    // Animation loop - slower for more subtle effect
    const interval = setInterval(draw, 60);

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      // Recalculate drops
      const newColumns = canvas.width / fontSize;
      drops.length = 0;
      for (let i = 0; i < newColumns; i++) {
        drops[i] = Math.random() * -100;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -5 }}
    />
  );
}