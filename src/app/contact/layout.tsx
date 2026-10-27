import { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Contact — Demandez votre Devis Cybersécurité',
  description: metaDescription('/contact'),
  alternates: {
    canonical: 'https://www.securitrust.fr/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
