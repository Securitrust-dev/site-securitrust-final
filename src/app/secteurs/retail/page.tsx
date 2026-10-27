import LandingSecteur from "@/components/secteurs/LandingSecteur";
import { SECTEURS } from "@/lib/secteurs-data";
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

const data = SECTEURS["retail"];

export const metadata = {
  title: `${data.label} — Cybersécurité & conformité PCI DSS`,
  description: metaDescription('/secteurs/retail'),
  alternates: { canonical: 'https://www.securitrust.fr/secteurs/retail' },
};

export default function Page() {
  return <LandingSecteur data={data} />;
}
