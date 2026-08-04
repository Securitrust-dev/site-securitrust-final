import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';

/*
 * Polices des pages statiques (public/*.html), portées via next/font/google
 * pour éviter le FOUT/CLS. Noms de variable dédiés (--sfont-*) pour ne jamais
 * interférer avec les variables --font-* du reste du site (Tailwind).
 */
export const staticInter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--sfont-inter',
});

export const staticSpaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--sfont-space-grotesk',
});

export const staticJetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--sfont-jetbrains-mono',
});

export const staticThemeFontVars = [
  staticInter.variable,
  staticSpaceGrotesk.variable,
  staticJetBrainsMono.variable,
].join(' ');
