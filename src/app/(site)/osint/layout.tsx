import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audit OSINT | Renseignements en Sources Ouvertes',
  description: 'Identifiez les informations sensibles de votre entreprise exposées publiquement sur Internet. Audit OSINT complet pour prévenir l\'espionnage et les cyberattaques.',
  alternates: {
    canonical: '/osint',
  },
};

export default function OSINTLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
