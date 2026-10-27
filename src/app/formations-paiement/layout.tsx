import { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Paiement Formation',
  description: metaDescription('/formations-paiement'),
  alternates: { canonical: 'https://www.securitrust.fr/formations-paiement' },
  robots: { index: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
