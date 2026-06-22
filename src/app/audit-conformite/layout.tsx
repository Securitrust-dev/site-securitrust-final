import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Audit de Conformité — RGPD, NIS2, DORA, ISO 27001, HDS | SecuriTrust',
  description: "Audit de conformité réglementaire en cybersécurité : RGPD, NIS2, DORA, ISO 27001, HDS. Évaluation de vos obligations légales, rapport d'écarts et plan de remédiation priorisé.",
  keywords: ['audit conformité', 'audit RGPD', 'audit NIS2', 'audit DORA', 'audit ISO 27001', 'audit HDS', 'conformité réglementaire'],
  alternates: {
    canonical: 'https://securitrust.fr/audit-conformite',
  },
  openGraph: {
    title: 'Audit de Conformité — RGPD, NIS2, DORA, ISO 27001, HDS',
    description: "Audit de conformité cybersécurité : RGPD, NIS2, DORA, ISO 27001, HDS. Rapport d'écarts et plan de remédiation. SecuriTrust.",
    url: 'https://securitrust.fr/audit-conformite',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Audit de Conformité Cybersécurité',
    description: "Audit de conformité : RGPD, NIS2, DORA, ISO 27001, HDS. Rapport et plan de remédiation.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Audit de Conformité — RGPD, NIS2, DORA, ISO 27001, HDS"
        description="Audit de conformité réglementaire en cybersécurité : RGPD, NIS2, DORA, ISO 27001, HDS. Évaluation de vos obligations légales, rapport d'écarts et plan de remédiation priorisé."
        url="https://securitrust.fr/audit-conformite"
      />
      {children}
    </>
  );
}
