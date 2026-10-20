import LandingSecteur from "@/components/secteurs/LandingSecteur";
import { SECTEURS } from "@/lib/secteurs-data";

const data = SECTEURS["banque-finance"];

export const metadata = {
  title: `${data.label} — Cybersécurité & conformité DORA`,
  description: data.hero.sousTitre.slice(0, 155),
  alternates: { canonical: 'https://www.securitrust.fr/secteurs/banque-finance' },
};

export default function Page() {
  return <LandingSecteur data={data} />;
}
