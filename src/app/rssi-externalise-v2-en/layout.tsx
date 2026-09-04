import { Metadata } from "next";
import { ServiceSchema } from "@/components/StructuredData";

/* ============================================================================
   DRAFT — English version of the securitrust.fr home page, in the LP design.

   `noindex, nofollow` until Charles signs it off.

   ⚠️ i18n : the root layout hard-codes <html lang="fr">, so the language is
   declared on the #lp-root wrapper instead. A real bilingual setup would need
   an /en segment with its own layout plus hreflang alternates — out of scope
   for a draft, flagged for the production hand-over.

   Terminology: « RSSI externalisé » is rendered as "Outsourced CISO"
   throughout. "vCISO" / "Fractional CISO" are the higher-volume search terms
   on the English-speaking market — swap if the goal is SEO rather than a
   faithful translation of the brand wording.
   ============================================================================ */

export const metadata: Metadata = {
  title: "Outsourced CISO — take back control of your security",
  description:
    "Cybersecurity consultancy in Paris. Outsourced CISO on a fractional basis, results-guaranteed penetration testing, ISO 27001, NIS2 and DORA compliance. Strategic security leadership without the cost of a full-time hire.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "SecuriTrust — Outsourced CISO, steering your security",
    description:
      "Cybersecurity consultancy in Paris. Outsourced CISO on a fractional basis, results-guaranteed penetration testing, ISO 27001, NIS2 and DORA compliance.",
    type: "website",
    locale: "en_GB",
  },
};

export default function HomeDesignLPEnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Cybersecurity consultancy"
        description="Cybersecurity consultancy based in Paris since 2016: outsourced CISO on a fractional basis, Cyber-Pilote, results-guaranteed penetration testing, ISO 27001, NIS2, DORA and GDPR compliance. Accredited AFNOR auditor."
        url="https://www.securitrust.fr/en"
      />
      {children}
    </>
  );
}
