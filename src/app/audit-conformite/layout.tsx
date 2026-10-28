import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Audit de Conformité — RGPD, NIS2, DORA, ISO 27001, HDS',
  description: metaDescription('/audit-conformite'),
  alternates: {
    canonical: 'https://www.securitrust.fr/audit-conformite',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Audit de Conformité — RGPD, NIS2, DORA, ISO 27001, HDS',
    description: "Audit de conformité cybersécurité : RGPD, NIS2, DORA, ISO 27001, HDS. Rapport d'écarts et plan de remédiation. SecuriTrust.",
    url: 'https://www.securitrust.fr/audit-conformite',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
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
        url="https://www.securitrust.fr/audit-conformite"
      />
      {children}
    </>
  );
}
