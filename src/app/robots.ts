import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin-stats'],
    },
    sitemap: 'https://www.securitrust.fr/sitemap.xml',
    host: 'https://www.securitrust.fr',
  };
}
