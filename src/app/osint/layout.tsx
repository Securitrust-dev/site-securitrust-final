import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Audit OSINT | Renseignements en Sources Ouvertes',
  description: metaDescription('/osint'),
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
