import { Metadata } from 'next';
import { SITE_URL } from '@/site-chrome/schema.mjs';

export const metadata: Metadata = {
  title: 'Certifications & accréditations',
  description:
    "Les certifications et accréditations de SecuriTrust et de ses consultants : ISO 27001, HDS et RGPD (AFAQ / AFNOR), ISO 27001 Lead Auditor & Lead Implementer, EBIOS Risk Manager, OSCP, CEH, PNPT, CRTP, CRTE.",
  alternates: { canonical: `${SITE_URL}/certifications` },
};

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
