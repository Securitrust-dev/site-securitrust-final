import LandingSecteur from "@/components/secteurs/LandingSecteur";
import { SECTEURS } from "@/lib/secteurs-data";
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

const data = SECTEURS["sante"];

export const metadata = {
  title: `${data.label} — Cybersécurité & certification HDS`,
  description: metaDescription('/secteurs/sante'),
  alternates: { canonical: 'https://www.securitrust.fr/secteurs/sante' },
};

export default function Page() {
  return <LandingSecteur data={data} />;
}
