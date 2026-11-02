import { Metadata } from 'next';
import { preload } from 'react-dom';

/* ============================================================================
   /lp/rssi-externalise — page d'atterrissage des campagnes Google Ads.

   Même contenu que /rssi-externalise, sans le guide long : courte, centrée sur le
   formulaire. noindex pour ne pas concurrencer la page de référence dans Google
   (canonique sur elle-même : noindex + canonique vers une autre URL = signaux
   contradictoires) ; volontairement absente du sitemap. Ne pas la bloquer dans
   robots.txt : Google doit pouvoir lire le noindex, et AdsBot doit l'explorer pour
   évaluer l'expérience sur la page de destination.
   ============================================================================ */

export const metadata: Metadata = {
  title: 'RSSI externalisé : un RSSI senior, sans recruter',
  description:
    'Un RSSI senior certifié pilote votre cybersécurité et votre conformité NIS2, ISO 27001 et DORA, à temps partagé. Rappel sous 2h, NDA dès le premier échange.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.securitrust.fr/lp/rssi-externalise' },
};

export default function LpRssiLayout({ children }: { children: React.ReactNode }) {
  preload('/rssi-lp/hero-bg.webp', { as: 'image', fetchPriority: 'high' });
  return <>{children}</>;
}
