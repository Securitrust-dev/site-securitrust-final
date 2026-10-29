import { Space_Grotesk } from 'next/font/google';

// Police de la charte (identique à /rssi-externalise), exposée sur <html>
// via la variable --font-brand pour tout le site (Tailwind, en-tête, pied de page).
export const brandFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-brand',
});
