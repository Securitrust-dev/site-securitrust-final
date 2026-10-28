import { Metadata } from 'next';
import { SITE_URL } from '@/site-chrome/schema.mjs';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

const PATH = '/formations/construire-smsi-iso-27001';
const TITLE = 'Formation SMSI ISO 27001 — 3 jours en présentiel à Paris';

export const metadata: Metadata = {
  title: TITLE,
  description: metaDescription(PATH),
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    images: [{ url: '/og/formation-smsi-iso-27001.jpg', width: 1200, height: 630, alt: 'Formation Construire un SMSI ISO 27001 — 3 jours en présentiel à Paris' }],
    title: TITLE,
    description: metaDescription(PATH),
    url: `${SITE_URL}${PATH}`,
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
};

export default function FormationSmsiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
