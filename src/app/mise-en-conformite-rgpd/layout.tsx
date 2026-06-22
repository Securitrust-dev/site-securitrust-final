import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Mise en Conformité RGPD — DPO Externalisé',
  description: 'Accompagnement complet à la conformité RGPD : audit, registre des traitements, DPO externalisé, formation. Cabinet spécialisé cybersécurité à Paris.',
  alternates: {
    canonical: 'https://securitrust.fr/mise-en-conformite-rgpd',
  },
};

export default function RGPDLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Mise en Conformité RGPD — DPO Externalisé"
        description="Accompagnement complet à la conformité RGPD : audit, registre des traitements, DPO externalisé, formation. Cabinet spécialisé cybersécurité à Paris."
        url="https://securitrust.fr/mise-en-conformite-rgpd"
      />
      {children}
    </>
  );
}
