import { Metadata } from 'next';
import { SITE_URL } from '@/site-chrome/schema.mjs';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Certifications & accréditations',
  description: metaDescription('/certifications'),
  alternates: { canonical: `${SITE_URL}/certifications` },
};

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
