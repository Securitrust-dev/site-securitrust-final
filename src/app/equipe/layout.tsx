import { Metadata } from 'next';
import { JsonLd } from '@/components/StructuredData';
import { ORG_ID, SITE_URL } from '@/site-chrome/schema.mjs';
import { EXPERTS } from '@/content/equipe';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Notre équipe — Experts cybersécurité',
  description: metaDescription('/equipe'),
  alternates: { canonical: `${SITE_URL}/equipe` },
};

// Chaque expert est rattaché au cabinet par worksFor (l'organisation, par son @id).
const personNodes = EXPERTS.map((e) => ({
  '@type': 'Person',
  '@id': `${SITE_URL}/equipe#${e.slug}`,
  name: e.name,
  jobTitle: e.role,
  worksFor: { '@id': ORG_ID },
  ...(e.linkedin ? { sameAs: [e.linkedin] } : {}),
  ...(e.alumniOf ? { alumniOf: { '@type': 'CollegeOrUniversity', name: e.alumniOf } } : {}),
}));

export default function EquipeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          '@type': 'AboutPage',
          '@id': `${SITE_URL}/equipe`,
          name: 'Notre équipe — SecuriTrust',
          url: `${SITE_URL}/equipe`,
          about: { '@id': ORG_ID },
        }}
      />
      {personNodes.map((n) => (
        <JsonLd key={n['@id']} data={n} />
      ))}
      {children}
    </>
  );
}
