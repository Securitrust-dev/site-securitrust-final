import { Metadata } from "next";
import { ServiceSchema } from "@/components/StructuredData";
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

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
  description: metaDescription('/en/outsourced-ciso'),
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${BASE_URL}/en/outsourced-ciso`,
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
    card: "summary_large_image",
    title: "SecuriTrust — Outsourced CISO, steering your security",
    description:
      "Outsourced CISO on a fractional basis, penetration testing, ISO 27001, NIS2 and DORA compliance.",
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: "SecuriTrust — Outsourced CISO, steering your security",
    description:
      "Cybersecurity consultancy. Outsourced CISO on a fractional basis, penetration testing, ISO 27001, NIS2 and DORA compliance.",
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
        description="Cybersecurity consultancy since 2016: outsourced CISO on a fractional basis, penetration testing, ISO 27001, NIS2, DORA and GDPR compliance. Accredited AFNOR auditor."
        url={`${BASE_URL}/en/outsourced-ciso`}
      />
      {children}
    </>
  );
}
