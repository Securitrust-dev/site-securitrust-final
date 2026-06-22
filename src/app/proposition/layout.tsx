import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proposition Commerciale | SecuriTrust',
  alternates: { canonical: 'https://securitrust.fr/proposition' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
