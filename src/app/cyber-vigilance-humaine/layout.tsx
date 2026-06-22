import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Cyber-Vigilance Humaine & Sensibilisation Cybersécurité | SecuriTrust',
  description: "Programmes de cyber-vigilance humaine pour réduire le risque lié aux comportements en entreprise : phishing simulé, sensibilisation, coaching SSI. Experts certifiés à Paris.",
  keywords: ['cyber-vigilance humaine', 'sensibilisation cybersécurité', 'phishing simulation', 'formation cybersécurité', 'risque humain sécurité', 'OSINT formation'],
  alternates: {
    canonical: 'https://securitrust.fr/cyber-vigilance-humaine',
  },
  openGraph: {
    title: 'Cyber-Vigilance Humaine & Sensibilisation Cybersécurité',
    description: "Réduisez le risque humain en cybersécurité avec nos programmes de sensibilisation, phishing simulé et coaching SSI. SecuriTrust, experts certifiés à Paris.",
    url: 'https://securitrust.fr/cyber-vigilance-humaine',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber-Vigilance Humaine & Sensibilisation Cybersécurité',
    description: "Réduisez le risque humain avec nos programmes de sensibilisation et phishing simulé.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Cyber-Vigilance Humaine & Sensibilisation Cybersécurité"
        description="Programmes de cyber-vigilance humaine pour réduire le risque lié aux comportements en entreprise : phishing simulé, sensibilisation, coaching SSI."
        url="https://securitrust.fr/cyber-vigilance-humaine"
      />
      {children}
    </>
  );
}
