import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Audit OSINT | Renseignements en Sources Ouvertes',
  description: 'Identifiez les informations sensibles de votre entreprise exposées publiquement sur Internet. Audit OSINT complet pour prévenir l\'espionnage et les cyberattaques.',
  alternates: {
    canonical: '/osint',
  },
};

export default function OSINTLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Audit OSINT"
        serviceType="Renseignement en sources ouvertes (OSINT)"
        description="Identification des informations sensibles de l'entreprise exposées publiquement sur Internet, pour prévenir l'espionnage et les cyberattaques."
        url="/osint"
      />
      {children}
    </>
  );
}
