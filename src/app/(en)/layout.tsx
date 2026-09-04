import '../globals.css';
import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import { OrganizationSchema, LocalBusinessSchema } from '@/components/StructuredData';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

/* ============================================================================
   Root layout ANGLAIS.

   App Router n'autorise qu'un seul <html> par arbre : c'est pourquoi le site
   est découpé en deux route groups avec chacun son root layout —
   (site) sert le français en <html lang="fr">, (en) sert l'anglais en
   <html lang="en">. Les groups ne changent pas les URLs : /en reste /en.

   Ce layout reprend volontairement le même socle que (site)/layout.tsx (GTM,
   schemas Organization/LocalBusiness, tracking analytics) pour que la version
   anglaise ne soit pas un angle mort de la mesure d'audience. Il n'inclut pas
   le FloatingCTA : les pages de ce groupe portent déjà leur propre CTA.
   ============================================================================ */

const BASE_URL = 'https://www.securitrust.fr';

export const viewport: Viewport = {
  themeColor: '#030303',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SecuriTrust — Cybersecurity consultancy in Paris',
    template: '%s | SecuriTrust',
  },
  description:
    "Cybersecurity consultancy in Paris. Outsourced CISO, results-guaranteed penetration testing, ISO 27001, NIS2, DORA and GDPR compliance. 15 years of expertise, accredited AFNOR auditor.",
  authors: [{ name: 'SecuriTrust' }],
  creator: 'SecuriTrust',
  publisher: 'SecuriTrust',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    alternateLocale: ['fr_FR'],
    url: `${BASE_URL}/en`,
    siteName: 'SecuriTrust',
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function EnRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Google Tag Manager — init du dataLayer (inline, tout en haut du body) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});",
          }}
        />
        <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-P5D5S5WJ" />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P5D5S5WJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <OrganizationSchema />
        <LocalBusinessSchema />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
