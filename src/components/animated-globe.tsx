'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedGlobe() {
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

    // Globe parameters
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const globeRadius = Math.min(canvas.width, canvas.height) * 0.35;

    // Create dots for the globe
    interface Dot {
      theta: number;
      phi: number;
      x: number;
      y: number;
      z: number;
      alpha: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }

    const dots: Dot[] = [];
    const numDots = 800;

    // Generate dots on sphere surface
    for (let i = 0; i < numDots; i++) {
      const theta = Math.random() * Math.PI * 2; // Longitude
      const phi = Math.acos(2 * Math.random() - 1); // Latitude
      
      dots.push({
        theta,
        phi,
        x: 0,
        y: 0,
        z: 0,
        alpha: Math.random(),
        twinkleSpeed: 0.5 + Math.random() * 1.5,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }

    let rotation = 0;

    function draw() {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update rotation
      rotation += 0.002;

      // Sort dots by z-index for proper rendering
      dots.forEach(dot => {
        // Convert spherical to cartesian coordinates
        const x = globeRadius * Math.sin(dot.phi) * Math.cos(dot.theta + rotation);
        const y = globeRadius * Math.sin(dot.phi) * Math.sin(dot.theta + rotation);
        const z = globeRadius * Math.cos(dot.phi);

        dot.x = x;
        dot.y = y;
        dot.z = z;

        // Twinkle effect
        const time = Date.now() * 0.001;
        dot.alpha = 0.3 + Math.sin(time * dot.twinkleSpeed + dot.twinkleOffset) * 0.7;
      });

      // Sort by z (back to front)
      dots.sort((a, b) => a.z - b.z);

      // Draw dots
      dots.forEach(dot => {
        const screenX = centerX + dot.x;
        const screenY = centerY + dot.y;

        // Only draw dots on visible hemisphere
        if (dot.z > -globeRadius * 0.1) {
          // Size varies with distance (perspective)
          const scale = (dot.z + globeRadius) / (2 * globeRadius);
          const size = 1 + scale * 1.5;

          // Opacity based on distance and twinkle
          const opacity = dot.alpha * scale * 0.8;

          // Gradient from cyan to blue
          const hue = 190 + Math.sin(dot.theta * 2 + rotation) * 10;
          
          ctx.beginPath();
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
          ctx.fill();

          // Add glow for brighter dots
          if (dot.alpha > 0.7) {
            ctx.beginPath();
            ctx.arc(screenX, screenY, size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${opacity * 0.3})`;
            ctx.fill();
          }
        }
      });

      // Draw connection lines between nearby dots
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < dots.length; i++) {
        const dot1 = dots[i];
        if (dot1.z < -globeRadius * 0.1) continue;

        for (let j = i + 1; j < Math.min(i + 5, dots.length); j++) {
          const dot2 = dots[j];
          if (dot2.z < -globeRadius * 0.1) continue;

          const dx = dot1.x - dot2.x;
          const dy = dot1.y - dot2.y;
          const dz = dot1.z - dot2.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 50) {
            const alpha = (1 - distance / 50) * 0.3;
            ctx.beginPath();
            ctx.moveTo(centerX + dot1.x, centerY + dot1.y);
            ctx.lineTo(centerX + dot2.x, centerY + dot2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.stroke();
          }
        }
      }
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -3 }}
    />
  );
}