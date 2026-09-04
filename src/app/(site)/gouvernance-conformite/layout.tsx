import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Gouvernance & Conformité Cybersécurité — RGPD, ISO 27001, NIS2, DORA | SecuriTrust',
  description: "Structurez votre gouvernance cybersécurité et pilotez la conformité réglementaire : RGPD, ISO 27001, NIS2, DORA, HDS. Experts en gouvernance SSI à Paris.",
  keywords: ['gouvernance cybersécurité', 'conformité RGPD', 'ISO 27001', 'NIS2', 'DORA', 'HDS', 'gouvernance SSI', 'conformité réglementaire'],
  alternates: {
    canonical: 'https://www.securitrust.fr/gouvernance-conformite',
  },
  openGraph: {
    title: 'Gouvernance & Conformité Cybersécurité — RGPD, ISO 27001, NIS2, DORA',
    description: "Structurez votre posture de sécurité et pilotez la conformité réglementaire avec SecuriTrust : RGPD, ISO 27001, NIS2, DORA, HDS. Experts à Paris.",
    url: 'https://www.securitrust.fr/gouvernance-conformite',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gouvernance & Conformité Cybersécurité',
    description: "Gouvernance SSI, RGPD, ISO 27001, NIS2, DORA, HDS. Experts en conformité réglementaire à Paris.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Gouvernance & Conformité Cybersécurité — RGPD, ISO 27001, NIS2, DORA"
        description="Structurez votre gouvernance cybersécurité et pilotez la conformité réglementaire : RGPD, ISO 27001, NIS2, DORA, HDS. Experts en gouvernance SSI à Paris."
        url="https://www.securitrust.fr/gouvernance-conformite"
      />
      {children}
    </>
  );
}
