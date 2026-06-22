import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audits Cybersécurité & Conformité — Livrables Actionnables | SecuriTrust',
  description: "Audits cybersécurité et conformité avec livrables actionnables : audit RGPD, ISO 27001, NIS2, DORA, audit organisationnel, audit technique. SecuriTrust, experts certifiés.",
  keywords: ['audit cybersécurité', 'audit conformité', 'audit RGPD', 'audit ISO 27001', 'audit NIS2', 'audit technique sécurité', 'rapport audit'],
  alternates: {
    canonical: 'https://securitrust.fr/gouvernance-conformite/audits',
  },
  openGraph: {
    title: 'Audits Cybersécurité & Conformité — Livrables Actionnables',
    description: "Audits cybersécurité avec livrables actionnables : RGPD, ISO 27001, NIS2, DORA, audit organisationnel. SecuriTrust, experts certifiés.",
    url: 'https://securitrust.fr/gouvernance-conformite/audits',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Audits Cybersécurité & Conformité',
    description: "Audits cybersécurité avec livrables actionnables : RGPD, ISO 27001, NIS2, DORA.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
