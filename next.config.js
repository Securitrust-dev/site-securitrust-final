import { readFileSync } from 'node:fs';
import { buildCsp, STATIC_PAGES } from './src/site-chrome/csp.mjs';

// Empreintes des scripts inline des pages statiques (écrites par `npm run chrome:sync`,
// lancé en prebuild).
const STATIC_CSP_HASHES = JSON.parse(readFileSync(new URL('./src/site-chrome/generated/static-csp.json', import.meta.url), 'utf8'));

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Cache navigateur/CDN des images optimisées (/_next/image) : 30 jours.
    minimumCacheTTL: 2592000,
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'blogger.googleusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      // non-www → www canonical redirect
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'securitrust.fr' }],
        destination: 'https://www.securitrust.fr/:path*',
        permanent: true,
      },
      // Les landing pages statiques sont servies sur des URLs propres (rewrites plus bas) :
      // leur adresse technique en .html est un doublon, renvoyé vers l'URL propre.
      ...Object.entries(STATIC_PAGES).map(([route, file]) => ({ source: `/${file}`, destination: route, permanent: true })),
      { source: '/test-intrusion', destination: '/pentest-externe', permanent: true },
      { source: '/audit', destination: '/services', permanent: true },
      { source: '/conformite', destination: '/rgpd', permanent: true },
      { source: '/rssi', destination: '/rssi-externalise', permanent: true },
      { source: '/portfolio', destination: '/cas-clients', permanent: true },
      { source: '/certification-iso-27001', destination: '/iso27001', permanent: true },
      // Fusions du 29/10/2026 : pages faibles supprimées, redirigées vers la page qui reprend le sujet.
      { source: '/cybersecurite-operationnelle/proteger-chiffre-affaires', destination: '/cybersecurite-operationnelle', permanent: true },
      { source: '/cybersecurite-operationnelle/exigences-reglementaires', destination: '/cybersecurite-operationnelle', permanent: true },
      { source: '/cybersecurite-operationnelle/preserver-image-confiance', destination: '/cybersecurite-operationnelle', permanent: true },
      { source: '/gouvernance-conformite/services-externalises', destination: '/rssi-externalise', permanent: true },
      { source: '/gouvernance-conformite/audits', destination: '/audit-cybersecurite', permanent: true },
      { source: '/gouvernance-conformite/domaines-expertise', destination: '/gouvernance-conformite', permanent: true },
      { source: '/audit-architecture', destination: '/audit-securite-technique', permanent: true },
      { source: '/audit-configuration', destination: '/audit-securite-technique', permanent: true },
      { source: '/audit-conformite', destination: '/gap-analysis', permanent: true },
      { source: '/gestion-risques', destination: '/ebios-rm', permanent: true },
      { source: '/cyber-vigilance-humaine', destination: '/sensibilisation-formation', permanent: true },
      { source: '/protection-ransomware', destination: '/cybersecurite-operationnelle', permanent: true },
      { source: '/strategie-cybersecurite', destination: '/rssi-externalise', permanent: true },
      { source: '/osint', destination: '/pentest-externe', permanent: true },
      { source: '/accueil-2', destination: '/', permanent: true },
      { source: '/rssi-a-temps-partage', destination: '/rssi-externalise', permanent: true },
      { source: '/cybersecurite-rssi-externalise-temps-partage', destination: '/rssi-externalise', permanent: true },
      // Doublons (cannibalisation) : l'ancienne page React renvoie vers la landing page
      // exposée dans le menu, qui devient l'unique URL de référence du sujet.
      { source: '/conformite-nis2', destination: '/nis2', permanent: true },
      { source: '/conformite-dora', destination: '/dora', permanent: true },
      { source: '/iso27001-hds', destination: '/iso27001', permanent: true },
      { source: '/hds-certification', destination: '/hds', permanent: true },
      { source: '/tisax-security', destination: '/tisax', permanent: true },
      { source: '/mise-en-conformite-rgpd', destination: '/rgpd', permanent: true },
      { source: '/pentest-web-mobile', destination: '/pentest-web', permanent: true },
      { source: '/services-cybersecurite', destination: '/services', permanent: true },
      { source: '/audit-securite', destination: '/audit-cybersecurite', permanent: true },
      { source: '/dpo-data-protection-officer', destination: '/dpo-externalise', permanent: true },
      { source: '/audit-conformite-sur-le-rgpd', destination: '/gap-analysis', permanent: true },
      { source: '/test-dintrusion', destination: '/pentest-externe', permanent: true },
      // Offre Cyber-Pilote retirée : ses anciennes URLs pointent vers le RSSI externalisé.
      { source: '/rssi-automatise', destination: '/rssi-externalise', permanent: true },
      { source: '/rssi-automatise/:path*', destination: '/rssi-externalise', permanent: true },
      { source: '/cyber-pilote', destination: '/rssi-externalise', permanent: true },
      { source: '/cyber-pilote/:path*', destination: '/rssi-externalise', permanent: true },
      { source: '/cyber-pilote2', destination: '/rssi-externalise', permanent: true },
      // L'ancienne URL de preview de la LP pointe désormais vers la page RSSI canonique.
      // Le segment de langue seul ne doit pas renvoyer un 404.
      { source: '/en', destination: '/en/outsourced-ciso', permanent: false },
      { source: '/rssi-externalise-lp', destination: '/rssi-externalise', permanent: true },
      // Article de blog qui cannibalisait la LP « RSSI externalisé » : on redirige
      // vers la LP canonique pour consolider le référencement sur une seule URL.
      { source: '/articles/rssi-externalise-prix-missions-et-roi-pour-les-pme', destination: '/rssi-externalise', permanent: true },
      // Même cas (29/10/2026) : 88 impressions en position 48 contre 2 717 en 22,8 pour la page service.
      { source: '/articles/rssi-externalise-la-reponse-cybersecurite-adaptee-aux-pme-et-eti', destination: '/rssi-externalise', permanent: true },
      // Quasi-doublon GuardFall : on garde la version la plus complète (source citée, impacts, action).
      { source: '/articles/guardfall-expose-les-agents-de-codage-d-ia-open-source-a-des-risques-d-injection-de-shell-vieux-de-plusieurs-decennies', destination: '/articles/guardfall-les-agents-ia-open-source-vulnerables-a-l-injection-shell-classique', permanent: true },
      // Offre « pentest au résultat » retirée : la page et tout son parcours commercial
      // (éligibilité, proposition, signature, paiement) renvoient vers la page Pentest.
      { source: '/pentest-au-resultat', destination: '/pentest', permanent: true },
      { source: '/eligibilite', destination: '/pentest', permanent: true },
      { source: '/non-eligible-offre-15', destination: '/pentest', permanent: true },
      { source: '/proposition', destination: '/pentest', permanent: true },
      { source: '/proposition-commerciale', destination: '/pentest', permanent: true },
      { source: '/informations-prestation', destination: '/pentest', permanent: true },
      { source: '/signer-proposition/:path*', destination: '/pentest', permanent: true },
      { source: '/signer-signwell', destination: '/pentest', permanent: true },
      { source: '/signature-complete', destination: '/pentest', permanent: true },
      { source: '/paiement/:path*', destination: '/pentest', permanent: true },
      { source: '/articles/pentest-au-resultat-evaluer-l-impact-reel-des-tests-d-intrusion-sur-votre-si', destination: '/pentest', permanent: true },
    ];
  },
  async rewrites() {
    return {
      // beforeFiles : prioritaire sur les routes Next.js existantes (nécessaire pour
      // remplacer la home app router par la page statique public/index.html, et pour
      // /dora qui a une route React concurrente sous src/app/dora/).
      beforeFiles: [
        { source: '/', destination: '/index.html' },
        { source: '/dora', destination: '/dora.html' },
      ],
      // afterFiles : ces sources n'ont pas de route Next.js concurrente, un rewrite
      // standard suffit pour servir les pages HTML statiques (public/*.html) sur des
      // URLs propres, sans l'extension .html.
      afterFiles: [
        { source: '/iso27001', destination: '/iso27001.html' },
        { source: '/nis2', destination: '/nis2.html' },
        { source: '/hds', destination: '/hds.html' },
        { source: '/tisax', destination: '/tisax.html' },
        { source: '/audit-o365', destination: '/audit-o365.html' },
        { source: '/pentest-web', destination: '/pentest-web.html' },
        { source: '/pentest-ad', destination: '/pentest-ad.html' },
        { source: '/pentest-mobile', destination: '/pentest-mobile.html' },
        { source: '/rgpd', destination: '/rgpd.html' },
      ],
    };
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production';
    // CSP (src/site-chrome/csp.mjs) : les pages React reçoivent la leur, avec un nonce
    // par requête, de middleware.ts ; les landing pages statiques reçoivent ici une CSP
    // fondée sur les empreintes de leurs scripts inline (générées par chrome:sync).
    const staticCsp = (source, file) => ({
      source,
      headers: [{ key: 'Content-Security-Policy', value: buildCsp({ hashes: STATIC_CSP_HASHES[file] || [], dev: isDev }) }],
    });
    // Fichiers de public/ : Vercel les sert par défaut en max-age=0 (revalidation à
    // chaque visite). Leurs noms ne sont pas hashés, d'où un cache borné plutôt
    // qu'immutable : 30 jours pour les médias, 1 h pour la feuille du header/footer
    // commun, susceptible de changer plus souvent. /_next/static garde le cache
    // immutable de Next.
    const cache = (source, value) => ({ source, headers: [{ key: 'Cache-Control', value }] });
    return [
      cache('/:all*(png|jpg|jpeg|webp|avif|gif|svg|ico|woff|woff2)', 'public, max-age=2592000, stale-while-revalidate=86400'),
      cache('/site-chrome.css', 'public, max-age=3600, stale-while-revalidate=86400'),
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      ...Object.entries(STATIC_PAGES).flatMap(([route, file]) => [staticCsp(route, file), staticCsp(`/${file}`, file)]),
    ];
  },
};

export default nextConfig;
