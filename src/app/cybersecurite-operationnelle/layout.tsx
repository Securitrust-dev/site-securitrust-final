import type { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Cybersécurité Opérationnelle — Pentest Entreprise & Audit',
  description: metaDescription('/cybersecurite-operationnelle'),
  openGraph: {
    title: 'Cybersécurité Opérationnelle — Pentest & Audit Cybersécurité | SecuriTrust',
    description: 'Pentest entreprise, audit cybersécurité PME, test d\'intrusion en France. 3 piliers : protection financière, réputation, conformité. Experts certifiés à Paris.',
    url: 'https://www.securitrust.fr/cybersecurite-operationnelle',
  },
  alternates: {
    canonical: 'https://www.securitrust.fr/cybersecurite-operationnelle',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Cybersécurité Opérationnelle — Pentest Entreprise & Audit"
        description="Cabinet de cybersécurité opérationnelle à Paris. Pentest entreprise, audit cybersécurité PME et test d'intrusion en France. Experts certifiés OSCP."
        url="https://www.securitrust.fr/cybersecurite-operationnelle"
      />
      {children}
    </>
  );
}
