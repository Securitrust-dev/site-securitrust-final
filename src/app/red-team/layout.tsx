import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Red Team | Simulation d\'Attaque Réelle & Test de Résilience',
  description: metaDescription('/red-team'),
  alternates: {
    canonical: '/red-team',
  },
};

export default function RedTeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Red Team | Simulation d'Attaque Réelle & Test de Résilience"
        description="Évaluez la capacité de détection et de réponse de votre entreprise face à une cyberattaque ciblée. Simulation d'intrusion réaliste par nos experts Red Team."
        url="https://www.securitrust.fr/red-team"
      />
      {children}
    </>
  );
}
