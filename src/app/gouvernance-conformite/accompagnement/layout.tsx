import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accompagnement Conformité Cybersécurité — ISO 27001, RGPD, NIS2 | SecuriTrust',
  description: "Accompagnement sur-mesure dans votre démarche de conformité cybersécurité : ISO 27001, RGPD, NIS2, DORA, HDS. Méthodologie éprouvée adaptée à votre secteur et vos objectifs.",
  keywords: ['accompagnement conformité', 'accompagnement ISO 27001', 'accompagnement RGPD', 'conseil cybersécurité', 'certification sécurité', 'conformité NIS2'],
  alternates: {
    canonical: 'https://securitrust.fr/gouvernance-conformite/accompagnement',
  },
  openGraph: {
    title: 'Accompagnement Conformité Cybersécurité — ISO 27001, RGPD, NIS2',
    description: "Accompagnement sur-mesure pour votre conformité cybersécurité : ISO 27001, RGPD, NIS2, DORA, HDS. Experts SecuriTrust.",
    url: 'https://securitrust.fr/gouvernance-conformite/accompagnement',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accompagnement Conformité Cybersécurité',
    description: "Accompagnement ISO 27001, RGPD, NIS2, DORA, HDS avec SecuriTrust.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
