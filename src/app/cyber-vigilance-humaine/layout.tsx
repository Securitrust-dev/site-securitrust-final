import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Cyber-Vigilance Humaine & Sensibilisation Cybersécurité',
  description: metaDescription('/cyber-vigilance-humaine'),
  alternates: {
    canonical: 'https://www.securitrust.fr/cyber-vigilance-humaine',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Cyber-Vigilance Humaine & Sensibilisation Cybersécurité',
    description: "Réduisez le risque humain en cybersécurité avec nos programmes de sensibilisation, phishing simulé et coaching SSI. SecuriTrust, experts certifiés à Paris.",
    url: 'https://www.securitrust.fr/cyber-vigilance-humaine',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
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
        url="https://www.securitrust.fr/cyber-vigilance-humaine"
      />
      {children}
    </>
  );
}
