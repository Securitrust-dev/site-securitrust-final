import { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Audits Cybersécurité & Conformité — Livrables Actionnables | SecuriTrust',
  description: metaDescription('/gouvernance-conformite/audits'),
  alternates: {
    canonical: 'https://www.securitrust.fr/gouvernance-conformite/audits',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Audits Cybersécurité & Conformité — Livrables Actionnables',
    description: "Audits cybersécurité avec livrables actionnables : RGPD, ISO 27001, NIS2, DORA, audit organisationnel. SecuriTrust, experts certifiés.",
    url: 'https://www.securitrust.fr/gouvernance-conformite/audits',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
    card: 'summary_large_image',
    title: 'Audits Cybersécurité & Conformité',
    description: "Audits cybersécurité avec livrables actionnables : RGPD, ISO 27001, NIS2, DORA.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
