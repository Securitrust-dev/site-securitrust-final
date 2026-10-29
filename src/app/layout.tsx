import './globals.css';
import { brandFont } from './brand-font';
import { ReactNode } from 'react';
import { FloatingCTA } from '@/components/floating-cta';
import { Metadata, Viewport } from 'next';
import { OrganizationSchema } from '@/components/StructuredData';
import { RouteBreadcrumbSchema } from '@/components/RouteBreadcrumbSchema';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import Script from 'next/script';
import { headers } from 'next/headers';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

const BASE_URL = 'https://www.securitrust.fr';

export const viewport: Viewport = {
  themeColor: '#030303',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SecuriTrust — Cabinet Cybersécurité, Pentest & Conformité | Paris',
    template: '%s | SecuriTrust',
  },
  // Description par défaut ; chaque page indexable définit la sienne (meta-descriptions.mjs).
  description: metaDescription('/'),
  authors: [{ name: 'SecuriTrust' }],
  creator: 'SecuriTrust',
  publisher: 'SecuriTrust',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Valeurs communes seulement : pas de title, description ni url ici. Une page sans bloc
  // openGraph propre hérite de ce bloc ; avec un og:url et un og:title d'accueil, elle était
  // partagée (LinkedIn, X) sous le titre et l'adresse de l'accueil. Sans eux, les réseaux
  // reprennent le <title>, la meta description et l'adresse de la page partagée.
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'SecuriTrust',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Nonce CSP de la requête (middleware.ts). Le lire rend chaque page dynamique : une
  // page mise en cache garderait un nonce périmé et ses scripts seraient bloqués.
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  return (
    <html lang="fr" className={brandFont.variable}>
      <body>
        {/* Google Tag Manager — init du dataLayer (inline, tout en haut du body) */}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});",
          }}
        />
        {/* GTM loader — <script async> hoisté dans le <head> par React 19 (détectable par Tag Assistant) */}
        <script async nonce={nonce} src="https://www.googletagmanager.com/gtm.js?id=GTM-P5D5S5WJ" />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P5D5S5WJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <link rel="stylesheet" href="/site-chrome.css" precedence="default" />
        <OrganizationSchema />
        <RouteBreadcrumbSchema />
        <AnalyticsTracker />
        {/* Suivi des leads (Calendly, tel, mailto, début de saisie) — commun avec les pages statiques */}
        <Script src="/site-tracking.js" strategy="afterInteractive" nonce={nonce} />
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
