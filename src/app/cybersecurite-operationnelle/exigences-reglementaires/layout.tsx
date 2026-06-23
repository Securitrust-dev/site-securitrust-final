import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audit de Conformité & Cybersécurité Réglementaire | SecuriTrust',
  description: 'Audit de conformité cybersécurité pour PME françaises : NIS2, ISO 27001, DORA, RGPD. Configuration, architecture, code source, audit flash 48–72h. Livrables COMEX-ready.',
  keywords: ['audit conformité cybersécurité', 'cybersécurité réglementaire', 'audit ISO 27001 PME', 'audit NIS2', 'conformité DORA', 'audit RGPD entreprise'],
  openGraph: {
    title: 'Audit de Conformité & Cybersécurité Réglementaire | SecuriTrust',
    description: 'Services d\'audit cybersécurité et de conformité pour PME et ETI françaises. Configuration, architecture, code source, flash, COMEX. Experts certifiés.',
    url: 'https://www.securitrust.fr/cybersecurite-operationnelle/exigences-reglementaires',
  },
  alternates: {
    canonical: 'https://www.securitrust.fr/cybersecurite-operationnelle/exigences-reglementaires',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
