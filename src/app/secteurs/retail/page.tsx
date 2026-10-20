import LandingSecteur from "@/components/secteurs/LandingSecteur";
import { SECTEURS } from "@/lib/secteurs-data";

const data = SECTEURS["retail"];

export const metadata = {
  title: `${data.label} — Cybersécurité & conformité PCI DSS`,
  description: data.hero.sousTitre.slice(0, 155),
  alternates: { canonical: 'https://www.securitrust.fr/secteurs/retail' },
};

export default function Page() {
  return <LandingSecteur data={data} />;
}
