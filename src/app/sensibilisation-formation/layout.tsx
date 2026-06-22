import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Formation & Sensibilisation Cybersécurité en Entreprise',
  description: "Formations cybersécurité et campagnes de sensibilisation au phishing pour vos équipes. Exercices pratiques et simulations d'attaques. SecuriTrust Paris.",
  alternates: {
    canonical: 'https://securitrust.fr/sensibilisation-formation',
  },
};

export default function SensibilisationFormationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Formation & Sensibilisation Cybersécurité en Entreprise"
        description="Formations cybersécurité et campagnes de sensibilisation au phishing pour vos équipes. Exercices pratiques et simulations d'attaques. SecuriTrust Paris."
        url="https://securitrust.fr/sensibilisation-formation"
      />
      {children}
    </>
  );
}
