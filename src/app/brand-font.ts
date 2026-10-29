import { Inter, Space_Grotesk } from 'next/font/google';

// Police de la charte (identique à /rssi-externalise), exposée sur <html>
// via la variable --font-brand pour tout le site (Tailwind, en-tête, pied de page).
export const brandFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-brand',
});

// Police du texte courant : Inter, plus lisible que Space Grotesk dans les paragraphes.
// Space Grotesk reste la police des titres, boutons et libellés.
export const textFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-text',
});
