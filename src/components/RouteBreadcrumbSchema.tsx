'use client';

// Fil d'Ariane JSON-LD de la page courante, d'après la hiérarchie déclarée dans
// src/site-chrome/schema.mjs. Rendu côté serveur comme le reste de la page ; ne
// produit rien pour les pages qui n'y figurent pas (blog, pages statiques).
import { usePathname } from 'next/navigation';
import { breadcrumbNode, breadcrumbTrail, serializeJsonLd } from '@/site-chrome/schema.mjs';

export function RouteBreadcrumbSchema() {
  const trail = breadcrumbTrail(usePathname() || '/');
  if (!trail) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbNode(trail)) }} />;
}
