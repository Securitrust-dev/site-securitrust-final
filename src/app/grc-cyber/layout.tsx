import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GRC Cyber | Gouvernance, Risques et Conformité',
  description: 'Gérez vos risques cyber et assurez votre conformité réglementaire. Accompagnement expert en GRC pour structurer votre cybersécurité et protéger vos actifs.',
  alternates: {
    canonical: '/grc-cyber',
  },
};

export default function GRCLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
