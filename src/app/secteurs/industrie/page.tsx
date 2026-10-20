import LandingSecteur from "@/components/secteurs/LandingSecteur";
import { SECTEURS } from "@/lib/secteurs-data";

const data = SECTEURS["industrie"];

export const metadata = {
  title: `${data.label} — Cybersécurité OT/IT & conformité NIS2`,
  description: data.hero.sousTitre.slice(0, 155),
  alternates: { canonical: 'https://www.securitrust.fr/secteurs/industrie' },
};

export default function Page() {
  return <LandingSecteur data={data} />;
}
