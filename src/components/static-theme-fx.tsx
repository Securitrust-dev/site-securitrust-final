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

    const onEnter = () => cursor?.classList.add('hot');
    const onLeave = () => cursor?.classList.remove('hot');
    const hoverables = new Set<Element>();
    const attachHover = (el: Element) => {
      if (hoverables.has(el)) return;
      hoverables.add(el);
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    };
    document
      .querySelectorAll('.static-theme a, .static-theme button, .static-theme [data-hot]')
      .forEach(attachHover);

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

    // Le contenu chargé après le montage (ex: cartes d'articles récupérées via
    // fetch dans ArticlesClient) apparaît dans le DOM une fois que ce scan
    // initial est déjà passé — sans ce MutationObserver, ces éléments .reveal
    // restent bloqués à opacity:0 pour toujours (visibles nulle part, mais
    // toujours cliquables puisque opacity n'affecte pas les pointer-events).
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches('.reveal')) io.observe(node);
          node.querySelectorAll?.('.reveal').forEach((el) => io.observe(el));

          if (node.matches('a, button, [data-hot]')) attachHover(node);
          node.querySelectorAll?.('a, button, [data-hot]').forEach(attachHover);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div id="grain" />
      <div id="cursor" className="hidden md:block" />
    </>
  );
}
