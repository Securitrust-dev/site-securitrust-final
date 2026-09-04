import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paiement Formation | SecuriTrust',
  alternates: { canonical: 'https://www.securitrust.fr/formations-paiement' },
  robots: { index: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
