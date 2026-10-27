import LandingSecteur from "@/components/secteurs/LandingSecteur";
import { SECTEURS } from "@/lib/secteurs-data";
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

const data = SECTEURS["tech"];

export const metadata = {
  title: `${data.label} — Cybersécurité & conformité ISO 27001`,
  description: metaDescription('/secteurs/tech'),
  alternates: { canonical: 'https://www.securitrust.fr/secteurs/tech' },
};

export default function Page() {
  return <LandingSecteur data={data} />;
}
