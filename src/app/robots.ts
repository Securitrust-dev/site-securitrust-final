import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/paiement/success', '/signer-proposition/success', '/api/'],
    },
    sitemap: 'https://site-web-aura-3d-s-curitrust.vercel.app/sitemap.xml',
  };
}
