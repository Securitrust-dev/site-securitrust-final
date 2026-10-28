import { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Rejoindre SecuriTrust — Carrières en Cybersécurité à Paris',
  description: metaDescription('/nous-rejoindre'),
  alternates: {
    canonical: 'https://www.securitrust.fr/nous-rejoindre',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Rejoindre SecuriTrust — Carrières en Cybersécurité à Paris',
    description: "Rejoignez SecuriTrust : pentest, audit SSI, conformité. Offres d'emploi en cybersécurité à Paris.",
    url: 'https://www.securitrust.fr/nous-rejoindre',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
    card: 'summary_large_image',
    title: 'Carrières en Cybersécurité — SecuriTrust Paris',
    description: "Rejoignez SecuriTrust : pentest, audit SSI, conformité. Offres d'emploi cybersécurité à Paris.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
