import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contactez SecuriTrust | Expert en Cybersécurité',
  description: 'Besoin d\'un audit, d\'un pentest ou d\'un conseil en cybersécurité ? Contactez nos experts pour sécuriser votre infrastructure et vos données.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
