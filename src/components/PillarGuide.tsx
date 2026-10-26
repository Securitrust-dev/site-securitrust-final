// Guide de page pilier rendu dans une page React (J2.3/J3.5).
// Même source et même rendu que les landing pages statiques (src/site-chrome/pillars/*
// + pillar-render.mjs), mais pré-rendu par `npm run chrome:sync` dans un module généré
// (src/site-chrome/generated/<slug>.ts) : la page cliente n'importe qu'une chaîne, sans
// embarquer blog-articles.json ni la logique de rendu. Le formulaire éventuel est pris en
// charge par public/site-tracking.js, chargé sur toutes les pages.

import { html as rssiHtml, schema as rssiSchema } from '@/site-chrome/generated/rssi-externalise';

const GUIDES: Record<string, { html: string; schema: object }> = {
  'rssi-externalise': { html: rssiHtml, schema: rssiSchema },
};

export function PillarGuide({ slug }: { slug: string }) {
  const guide = GUIDES[slug];
  if (!guide) return null;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guide.schema).replace(/</g, '\\u003c') }}
      />
      <div dangerouslySetInnerHTML={{ __html: guide.html }} />
    </>
  );
}
