import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import { FloatingCTA } from '@/components/floating-cta';
import { Metadata, Viewport } from 'next';
import { JsonLd } from '@/components/json-ld';

export const viewport: Viewport = {
  themeColor: '#030303',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://site-web-aura-3d-s-curitrust.vercel.app'),
  title: {
    default: 'SecuriTrust | Expert en Pentest & Audit Cybersécurité',
    template: '%s | SecuriTrust'
  },
  description: 'SecuriTrust est un cabinet d’audit en cybersécurité spécialisé en Pentest (test d’intrusion), GRC (Gouvernance, Risques, Conformité) et Red Team. Sécurisez vos systèmes avec nos experts.',
  keywords: ['pentest', 'test d’intrusion', 'audit cybersécurité', 'GRC', 'gouvernance risques conformité', 'red team', 'sécurité informatique', 'cabinet cybersécurité', 'conformité ISO 27001', 'sécurité des systèmes d’information', 'cybersécurité entreprise'],
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
    url: 'https://site-web-aura-3d-s-curitrust.vercel.app',
    siteName: 'SecuriTrust',
    title: 'SecuriTrust | Expert en Pentest & Audit Cybersécurité',
    description: 'Expert en audit cybersécurité, pentest et conformité GRC. Sécurisez votre entreprise avec nos solutions sur mesure.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SecuriTrust Cybersécurité',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SecuriTrust | Expert en Pentest & Audit Cybersécurité',
    description: 'Expert en audit cybersécurité, pentest et conformité GRC.',
    images: ['/og-image.png'],
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

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SecuriTrust',
  url: 'https://site-web-aura-3d-s-curitrust.vercel.app',
  logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-SecuriTrust-bleu-blanc-768x158-1764257964299.png',
  description: 'Cabinet d’audit et de conseil en cybersécurité spécialisé en Pentest, GRC et Red Team.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: ['French', 'English'],
  },
  sameAs: [
    // Add social media links here if available
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <JsonLd data={organizationSchema} />
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="8aebdc26-3d06-42e3-bb7c-f1c035c7f99b"
        />
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
