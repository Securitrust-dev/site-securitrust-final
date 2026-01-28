import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stratégie de Cybersécurité | Conseil & Accompagnement SSI',
  description: 'Définissez une stratégie de cybersécurité alignée sur vos enjeux métier. Conseil expert pour structurer votre sécurité et protéger votre développement.',
  alternates: {
    canonical: '/strategie-cybersecurite',
  },
};

export default function StrategieLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
