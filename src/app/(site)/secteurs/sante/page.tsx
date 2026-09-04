import LandingSecteur from "@/components/secteurs/LandingSecteur";
import { SECTEURS } from "@/lib/secteurs-data";

const data = SECTEURS["sante"];

export const metadata = {
  title: `${data.label} — Cybersécurité & certification HDS | SecuriTrust`,
  description: data.hero.sousTitre.slice(0, 155),
};

export default function Page() {
  return <LandingSecteur data={data} />;
}
