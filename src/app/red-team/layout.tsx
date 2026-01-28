import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Red Team | Simulation d\'Attaque Réelle & Test de Résilience',
  description: 'Évaluez la capacité de détection et de réponse de votre entreprise face à une cyberattaque ciblée. Simulation d\'intrusion réaliste par nos experts Red Team.',
  alternates: {
    canonical: '/red-team',
  },
};

export default function RedTeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
