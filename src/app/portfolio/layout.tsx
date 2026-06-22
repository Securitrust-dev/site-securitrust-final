import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio & Références — Réalisations Cybersécurité | SecuriTrust',
  description: "Découvrez les réalisations de SecuriTrust : missions de pentest au résultat, audits de sécurité, certifications ISO 27001 et HDS, accompagnement RGPD pour nos clients.",
  keywords: ['portfolio cybersécurité', 'références securitrust', 'réalisations pentest', 'cas clients cybersécurité', 'missions audit sécurité'],
  alternates: {
    canonical: 'https://securitrust.fr/portfolio',
  },
  openGraph: {
    title: 'Portfolio & Références — Réalisations Cybersécurité',
    description: "Les réalisations SecuriTrust : pentest, audits de sécurité, certifications ISO 27001, RGPD. Références clients.",
    url: 'https://securitrust.fr/portfolio',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio & Références — SecuriTrust',
    description: "Réalisations SecuriTrust : pentest, audits, ISO 27001, RGPD.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
