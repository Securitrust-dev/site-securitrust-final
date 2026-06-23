const BASE_URL = 'https://www.securitrust.fr';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SecuriTrust',
    url: BASE_URL,
    logo: `${BASE_URL}/og-image.png`,
    description: "Cabinet de conseil en cybersécurité spécialisé en pentest au résultat, audit de sécurité, conformité RGPD et ISO 27001.",
    foundingDate: '2016',
    founder: {
      '@type': 'Person',
      name: 'Jad Joumblat',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '11 Rue Saint-Didier',
      addressLocality: 'Paris',
      postalCode: '75116',
      addressCountry: 'FR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33-6-08-94-87-97',
      email: 'contact@securitrust.fr',
      contactType: 'customer service',
      availableLanguage: ['French', 'English'],
      areaServed: 'FR',
    },
    sameAs: [
      'https://www.linkedin.com/company/securitrust',
    ],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', name: 'ISO 27001 Lead Auditor' },
      { '@type': 'EducationalOccupationalCredential', name: 'ISO 27001 Lead Implementer' },
      { '@type': 'EducationalOccupationalCredential', name: 'OSCP' },
      { '@type': 'EducationalOccupationalCredential', name: 'CEH' },
      { '@type': 'EducationalOccupationalCredential', name: 'EBIOS Risk Manager' },
      { '@type': 'EducationalOccupationalCredential', name: 'CRTE' },
      { '@type': 'EducationalOccupationalCredential', name: 'CRTP' },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SecuriTrust',
    image: `${BASE_URL}/og-image.png`,
    url: BASE_URL,
    telephone: '+33-6-08-94-87-97',
    email: 'contact@securitrust.fr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '11 Rue Saint-Didier',
      addressLocality: 'Paris',
      postalCode: '75116',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8649,
      longitude: 2.2856,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:30',
    },
    priceRange: '€€€',
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    serviceType: [
      "Test d'intrusion (Pentest)",
      'Audit de cybersécurité',
      'RSSI externalisé',
      'DPO externalisé',
      'Conformité RGPD',
      'Certification ISO 27001',
      'Conformité NIS2',
      'Conformité DORA',
      'Formation cybersécurité',
      'Gouvernance SSI',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
    provider: {
      '@type': 'Organization',
      name: 'SecuriTrust',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
    datePublished,
    dateModified,
    image,
    author: {
      '@type': 'Organization',
      name: 'SecuriTrust',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SecuriTrust',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/og-image.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
