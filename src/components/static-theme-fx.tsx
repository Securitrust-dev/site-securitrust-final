'use client';

import { useEffect } from 'react';

/**
 * Effets partagés avec les pages statiques (public/*.html) : grain overlay,
 * curseur personnalisé et reveal-on-scroll pour les éléments `.reveal`.
 * À monter une fois par page, à l'intérieur du wrapper `.static-theme`.
 */
export function StaticThemeFX() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const onMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };
    document.addEventListener('mousemove', onMove);

    const hoverables = document.querySelectorAll('.static-theme a, .static-theme button, .static-theme [data-hot]');
    const onEnter = () => cursor?.classList.add('hot');
    const onLeave = () => cursor?.classList.remove('hot');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    document.querySelectorAll('.static-theme .reveal').forEach((el) => io.observe(el));

    return () => {
      document.removeEventListener('mousemove', onMove);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      io.disconnect();
    };
  }, []);

  return (
    <>
      <div id="grain" />
      <div id="cursor" className="hidden md:block" />
    </>
  );
}
