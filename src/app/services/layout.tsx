import { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Services Cybersécurité : Pentest, Audit, RGPD, RSSI',
  description: metaDescription('/services'),
  alternates: {
    canonical: 'https://www.securitrust.fr/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
