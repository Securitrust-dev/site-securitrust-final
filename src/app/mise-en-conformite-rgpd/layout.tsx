import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mise en Conformité RGPD | Audit & Accompagnement DPO',
  description: 'Sécurisez vos données personnelles et assurez votre conformité au RGPD. Diagnostic, registre des traitements et accompagnement par nos experts DPO.',
  alternates: {
    canonical: '/mise-en-conformite-rgpd',
  },
};

export default function RGPDLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
