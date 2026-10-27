import { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Accompagnement Conformité Cybersécurité — ISO 27001, RGPD, NIS2 | SecuriTrust',
  description: metaDescription('/gouvernance-conformite/accompagnement'),
  alternates: {
    canonical: 'https://www.securitrust.fr/gouvernance-conformite/accompagnement',
  },
  openGraph: {
    title: 'Accompagnement Conformité Cybersécurité — ISO 27001, RGPD, NIS2',
    description: "Accompagnement sur-mesure pour votre conformité cybersécurité : ISO 27001, RGPD, NIS2, DORA, HDS. Experts SecuriTrust.",
    url: 'https://www.securitrust.fr/gouvernance-conformite/accompagnement',
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
