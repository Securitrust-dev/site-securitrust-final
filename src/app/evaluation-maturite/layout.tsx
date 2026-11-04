import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Diagnostic de maturité cybersécurité',
  description: metaDescription('/evaluation-maturite'),
  alternates: {
    canonical: 'https://www.securitrust.fr/evaluation-maturite',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Diagnostic de maturité cybersécurité',
    description: "Mesurez votre niveau de maturité cybersécurité avec SecuriTrust. Diagnostic basé sur ISO 27001, NIST, CMMI avec plan de remédiation prioritisé.",
    url: 'https://www.securitrust.fr/evaluation-maturite',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
    card: 'summary_large_image',
    title: 'Évaluation de Maturité Cybersécurité',
    description: "Mesurez votre maturité cybersécurité selon ISO 27001, NIST, CMMI. Diagnostic et plan de remédiation.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Diagnostic de maturité cybersécurité"
        description="Évaluez le niveau de maturité cybersécurité de votre organisation selon des référentiels reconnus (ISO 27001, NIST, CMMI). Diagnostic complet, rapport détaillé et plan de remédiation."
        url="https://www.securitrust.fr/evaluation-maturite"
      />
      {children}
    </>
  );
}
