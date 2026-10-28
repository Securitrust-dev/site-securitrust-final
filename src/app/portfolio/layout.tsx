import { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Portfolio & Références — Réalisations Cybersécurité',
  description: metaDescription('/portfolio'),
  alternates: {
    canonical: 'https://www.securitrust.fr/portfolio',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Portfolio & Références — Réalisations Cybersécurité',
    description: "Les réalisations SecuriTrust : pentest, audits de sécurité, certifications ISO 27001, RGPD. Références clients.",
    url: 'https://www.securitrust.fr/portfolio',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
    card: 'summary_large_image',
    title: 'Portfolio & Références — SecuriTrust',
    description: "Réalisations SecuriTrust : pentest, audits, ISO 27001, RGPD.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
