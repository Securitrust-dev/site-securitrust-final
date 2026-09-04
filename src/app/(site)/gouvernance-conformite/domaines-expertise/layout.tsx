import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domaines d\'Expertise Cybersécurité — Secteurs & Réglementations | SecuriTrust',
  description: "Cartographie de vos obligations réglementaires par secteur : santé (HDS), finance (DORA), industrie (TISAX), collectivités (NIS2). RGPD, ISO 27001, experts SecuriTrust.",
  keywords: ['domaines expertise cybersécurité', 'réglementation secteur', 'HDS santé', 'DORA finance', 'TISAX automobile', 'NIS2 collectivités', 'conformité sectorielle'],
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
