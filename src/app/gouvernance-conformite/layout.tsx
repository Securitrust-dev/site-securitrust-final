import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Gouvernance & Conformité Cybersécurité — RGPD, ISO 27001, NIS2, DORA',
  description: metaDescription('/gouvernance-conformite'),
  alternates: {
    canonical: 'https://www.securitrust.fr/gouvernance-conformite',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Gouvernance & Conformité Cybersécurité — RGPD, ISO 27001, NIS2, DORA',
    description: "Structurez votre posture de sécurité et pilotez la conformité réglementaire avec SecuriTrust : RGPD, ISO 27001, NIS2, DORA, HDS. Experts à Paris.",
    url: 'https://www.securitrust.fr/gouvernance-conformite',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
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
