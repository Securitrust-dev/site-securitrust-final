import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Évaluation de Maturité Cybersécurité — Diagnostic SSI Entreprise | SecuriTrust',
  description: "Évaluez le niveau de maturité cybersécurité de votre organisation selon des référentiels reconnus (ISO 27001, NIST, CMMI). Diagnostic complet, rapport détaillé et plan de remédiation.",
  keywords: ['évaluation maturité cybersécurité', 'diagnostic SSI', 'maturité sécurité', 'audit maturité cyber', 'référentiel ISO 27001', 'NIST CSF'],
  alternates: {
    canonical: 'https://www.securitrust.fr/evaluation-maturite',
  },
  openGraph: {
    title: 'Évaluation de Maturité Cybersécurité — Diagnostic SSI Entreprise',
    description: "Mesurez votre niveau de maturité cybersécurité avec SecuriTrust. Diagnostic basé sur ISO 27001, NIST, CMMI avec plan de remédiation prioritisé.",
    url: 'https://www.securitrust.fr/evaluation-maturite',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Évaluation de Maturité Cybersécurité',
    description: "Mesurez votre maturité cybersécurité selon ISO 27001, NIST, CMMI. Diagnostic et plan de remédiation.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Évaluation de Maturité Cybersécurité — Diagnostic SSI Entreprise"
        description="Évaluez le niveau de maturité cybersécurité de votre organisation selon des référentiels reconnus (ISO 27001, NIST, CMMI). Diagnostic complet, rapport détaillé et plan de remédiation."
        url="https://www.securitrust.fr/evaluation-maturite"
      />
      {children}
    </>
  );
}
