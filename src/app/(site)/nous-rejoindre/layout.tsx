import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rejoindre SecuriTrust — Carrières en Cybersécurité à Paris | SecuriTrust',
  description: "Rejoignez l'équipe SecuriTrust : offres d'emploi en cybersécurité, pentest, audit SSI, conformité RGPD/ISO 27001. Cabinet expert basé à Paris 75116. Devenez expert certifié.",
  keywords: ['emploi cybersécurité', 'recrutement pentest', 'carrière sécurité informatique', 'offre emploi audit SSI', 'rejoindre cabinet cybersécurité Paris'],
  alternates: {
    canonical: 'https://www.securitrust.fr/nous-rejoindre',
  },
  openGraph: {
    title: 'Rejoindre SecuriTrust — Carrières en Cybersécurité à Paris',
    description: "Rejoignez SecuriTrust : pentest, audit SSI, conformité. Offres d'emploi en cybersécurité à Paris.",
    url: 'https://www.securitrust.fr/nous-rejoindre',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carrières en Cybersécurité — SecuriTrust Paris',
    description: "Rejoignez SecuriTrust : pentest, audit SSI, conformité. Offres d'emploi cybersécurité à Paris.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
