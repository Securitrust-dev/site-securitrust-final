// Blocs JSON-LD des pages React. Les données communes (fiche du cabinet, fils
// d'Ariane) viennent de src/site-chrome/schema.mjs, partagé avec les pages statiques.
import {
  breadcrumbNode,
  faqNode,
  organizationNode,
  serializeJsonLd,
  serviceNode,
  websiteNode,
} from '@/site-chrome/schema.mjs';

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}

/** Fiche du cabinet (Organization + ProfessionalService) et site, sur toutes les pages. */
export function OrganizationSchema() {
  return <JsonLd data={[organizationNode(), websiteNode()]} />;
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return <JsonLd data={breadcrumbNode(items)} />;
}

export function ServiceSchema(props: { name: string; description: string; url: string; serviceType?: string }) {
  return <JsonLd data={serviceNode(props)} />;
}

/** À n'utiliser qu'avec les questions affichées telles quelles sur la page. */
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return <JsonLd data={faqNode(faqs)} />;
}
