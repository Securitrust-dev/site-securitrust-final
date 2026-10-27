import { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Domaines d\'Expertise Cybersécurité — Secteurs & Réglementations | SecuriTrust',
  description: metaDescription('/gouvernance-conformite/domaines-expertise'),
  alternates: {
    canonical: 'https://www.securitrust.fr/gouvernance-conformite/domaines-expertise',
  },
  openGraph: {
    title: 'Domaines d\'Expertise Cybersécurité — Secteurs & Réglementations',
    description: "Vos obligations réglementaires par secteur : santé, finance, industrie, collectivités. RGPD, HDS, DORA, NIS2, TISAX. SecuriTrust.",
    url: 'https://www.securitrust.fr/gouvernance-conformite/domaines-expertise',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Domaines d\'Expertise Cybersécurité par Secteur',
    description: "Obligations réglementaires par secteur : HDS, DORA, NIS2, TISAX, RGPD, ISO 27001.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
