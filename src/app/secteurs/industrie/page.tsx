import LandingSecteur from "@/components/secteurs/LandingSecteur";
import { SECTEURS } from "@/lib/secteurs-data";
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

const data = SECTEURS["industrie"];

export const metadata = {
  title: `${data.label} — Cybersécurité OT/IT & conformité NIS2`,
  description: metaDescription('/secteurs/industrie'),
  alternates: { canonical: 'https://www.securitrust.fr/secteurs/industrie' },
};

export default function Page() {
  return <LandingSecteur data={data} />;
}
