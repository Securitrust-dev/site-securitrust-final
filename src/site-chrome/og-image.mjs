// Image de partage (Open Graph / LinkedIn / X) par défaut des pages React.
// Les landing pages statiques (public/*.html) ont leur propre image dans public/og/.
// Une page qui définit `openGraph` remplace celui du layout racine en entier : elle
// doit donc reprendre `images` elle-même, sinon elle est partagée sans visuel.

export const DEFAULT_OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'SecuriTrust — cabinet de cybersécurité à Paris',
};
