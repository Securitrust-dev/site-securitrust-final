import { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Blog Cybersécurité — Analyses, Conseils & Actualités',
  description: metaDescription('/articles'),
  alternates: {
    canonical: 'https://www.securitrust.fr/articles',
  },
  openGraph: {
    title: 'Blog Cybersécurité — Analyses, Conseils & Actualités',
    description: 'Articles et analyses cybersécurité par les experts SecuriTrust : pentest, RGPD, ISO 27001, NIS2, DORA, menaces cyber, gouvernance SSI.',
    url: 'https://www.securitrust.fr/articles',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Cybersécurité — Analyses, Conseils & Actualités',
    description: 'Articles et analyses cybersécurité par les experts SecuriTrust.',
  },
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}







