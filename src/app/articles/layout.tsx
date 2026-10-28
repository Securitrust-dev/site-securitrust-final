import { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Blog Cybersécurité — Analyses, Conseils & Actualités',
  description: metaDescription('/articles'),
  alternates: {
    canonical: 'https://www.securitrust.fr/articles',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Blog Cybersécurité — Analyses, Conseils & Actualités',
    description: 'Articles et analyses cybersécurité par les experts SecuriTrust : pentest, RGPD, ISO 27001, NIS2, DORA, menaces cyber, gouvernance SSI.',
    url: 'https://www.securitrust.fr/articles',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
    card: 'summary_large_image',
    title: 'Blog Cybersécurité — Analyses, Conseils & Actualités',
    description: 'Articles et analyses cybersécurité par les experts SecuriTrust.',
  },
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}







