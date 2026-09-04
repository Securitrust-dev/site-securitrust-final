import { Metadata } from "next";
import { ServiceSchema } from "@/components/StructuredData";

/* ============================================================================
   DRAFT — English home page, served at /en/outsourced-ciso.

   `noindex, nofollow` until Charles signs it off. At go-live: drop the
   `robots` block below, and keep the hreflang alternates — Google only honours
   them when they are reciprocal, so the French counterpart declares this page
   in return (see (site)/rssi-externalise-v2/layout.tsx).

   Terminology: « RSSI externalisé » is rendered as "Outsourced CISO".
   "vCISO" / "Fractional CISO" carry more search volume on the English-speaking
   market — worth revisiting if the goal is acquisition rather than a faithful
   translation of the brand wording.
   ============================================================================ */

const BASE_URL = "https://www.securitrust.fr";

export const metadata: Metadata = {
  title: "Outsourced CISO — take back control of your security",
  description:
    "Cybersecurity consultancy in Paris. Outsourced CISO on a fractional basis, results-guaranteed penetration testing, ISO 27001, NIS2 and DORA compliance. Strategic security leadership without the cost of a full-time hire.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${BASE_URL}/en/outsourced-ciso`,
    languages: {
      "en-GB": `${BASE_URL}/en/outsourced-ciso`,
      "fr-FR": `${BASE_URL}/rssi-externalise`,
      "x-default": `${BASE_URL}/rssi-externalise`,
    },
  },
  openGraph: {
    title: "SecuriTrust — Outsourced CISO, steering your security",
    description:
      "Cybersecurity consultancy in Paris. Outsourced CISO on a fractional basis, results-guaranteed penetration testing, ISO 27001, NIS2 and DORA compliance.",
    type: "website",
    locale: "en_GB",
    url: `${BASE_URL}/en/outsourced-ciso`,
  },
};

export default function EnHomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Cybersecurity consultancy"
        description="Cybersecurity consultancy based in Paris since 2016: outsourced CISO on a fractional basis, Cyber-Pilote, results-guaranteed penetration testing, ISO 27001, NIS2, DORA and GDPR compliance. Accredited AFNOR auditor."
        url={`${BASE_URL}/en/outsourced-ciso`}
      />
      {children}
    </>
  );
}
