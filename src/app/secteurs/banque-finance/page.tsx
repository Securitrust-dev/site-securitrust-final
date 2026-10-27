import LandingSecteur from "@/components/secteurs/LandingSecteur";
import { SECTEURS } from "@/lib/secteurs-data";
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

const data = SECTEURS["banque-finance"];

export const metadata = {
  title: `${data.label} — Cybersécurité & conformité DORA`,
  description: metaDescription('/secteurs/banque-finance'),
  alternates: { canonical: 'https://www.securitrust.fr/secteurs/banque-finance' },
};

export default function Page() {
  return <LandingSecteur data={data} />;
}
