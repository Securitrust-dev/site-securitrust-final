import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import { FloatingCTA } from '@/components/floating-cta';
import { Metadata, Viewport } from 'next';
import { OrganizationSchema, LocalBusinessSchema } from '@/components/StructuredData';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

const BASE_URL = 'https://www.securitrust.fr';

export const viewport: Viewport = {
  themeColor: '#030303',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SecuriTrust — Cabinet Cybersécurité & Pentest au Résultat | Paris',
    template: '%s | SecuriTrust',
  },
  description: "Cabinet de cybersécurité à Paris. Pentest au résultat, audit de sécurité, RSSI externalisé, conformité RGPD, ISO 27001, NIS2 & DORA. +15 ans d'expertise. Auditeur officiel AFNOR.",
  keywords: [
    'pentest', "test d'intrusion", 'audit cybersécurité', 'cabinet cybersécurité Paris',
    'RSSI externalisé', 'DPO externalisé', 'conformité RGPD', 'ISO 27001',
    'NIS2', 'DORA', 'pentest au résultat', 'audit sécurité informatique',
    'gouvernance SSI', 'GRC cyber', "sécurité des systèmes d'information",
  ],
  authors: [{ name: 'SecuriTrust' }],
  creator: 'SecuriTrust',
  publisher: 'SecuriTrust',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    siteName: 'SecuriTrust',
    title: 'SecuriTrust — Cabinet Cybersécurité & Pentest au Résultat | Paris',
    description: 'Cabinet de cybersécurité à Paris. Pentest au résultat garanti, audit de sécurité, RSSI externalisé, conformité RGPD & ISO 27001.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SecuriTrust - Cabinet de cybersécurité à Paris',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SecuriTrust — Cabinet Cybersécurité & Pentest au Résultat',
    description: 'Pentest au résultat, audit cybersécurité, RSSI externalisé, RGPD, ISO 27001. Paris.',
    images: ['/og-image.png'],
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* Google Tag Manager — site-wide, chargé dans le <head> (beforeInteractive) pour être détecté par Tag Assistant */}
        <Script id="gtm-P5D5S5WJ" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5D5S5WJ');`}
        </Script>
        {/* Google Tag Manager (noscript) */}
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
        <FloatingCTA />
      </body>
    </html>
  );
}
