import LandingSecteur from "@/components/secteurs/LandingSecteur";
import { SECTEURS } from "@/lib/secteurs-data";
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

const data = SECTEURS["public"];

export const metadata = {
  title: `${data.label} — Cybersécurité & conformité NIS2`,
  description: metaDescription('/secteurs/public'),
  alternates: { canonical: 'https://www.securitrust.fr/secteurs/public' },
};

export default function Page() {
  return <LandingSecteur data={data} />;
}
