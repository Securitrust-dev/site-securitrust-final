import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'ISO 27001 & ISO 27701 — Certification & Accompagnement',
  description: 'Préparation et accompagnement à la certification ISO 27001, ISO 27701 et HDS. Auditeur officiel AFNOR. SecuriTrust, cabinet cybersécurité Paris.',
  alternates: {
    canonical: 'https://www.securitrust.fr/iso27001-hds',
  },
};

export default function ISO27001HDSLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="ISO 27001 & ISO 27701 — Certification & Accompagnement"
        description="Préparation et accompagnement à la certification ISO 27001, ISO 27701 et HDS. Auditeur officiel AFNOR. SecuriTrust, cabinet cybersécurité Paris."
        url="https://www.securitrust.fr/iso27001-hds"
      />
      {children}
    </>
  );
}
