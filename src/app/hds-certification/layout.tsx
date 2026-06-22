import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Certification HDS | Hébergement de Données de Santé',
  description: 'Obtenez la certification HDS (Hébergeur de Données de Santé) avec SecuriTrust. Accompagnement complet : gap analysis, SMSI santé, audit de certification HDS.',
  alternates: {
    canonical: 'https://securitrust.fr/hds-certification',
  },
};

export default function HDSCertificationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Certification HDS | Hébergement de Données de Santé"
        description="Obtenez la certification HDS (Hébergeur de Données de Santé) avec SecuriTrust. Accompagnement complet : gap analysis, SMSI santé, audit de certification HDS."
        url="https://securitrust.fr/hds-certification"
      />
      {children}
    </>
  );
}
