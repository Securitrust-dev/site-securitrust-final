import LandingSecteur from "@/components/secteurs/LandingSecteur";
import { SECTEURS } from "@/lib/secteurs-data";

const data = SECTEURS["tech"];

export const metadata = {
  title: `${data.label} — Cybersécurité & conformité ISO 27001 | SecuriTrust`,
  description: data.hero.sousTitre.slice(0, 155),
};

export default function Page() {
  return <LandingSecteur data={data} />;
}
