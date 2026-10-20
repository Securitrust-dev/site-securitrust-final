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
      { source: '/test-intrusion', destination: '/pentest-externe', permanent: true },
      { source: '/audit', destination: '/services', permanent: true },
      { source: '/conformite', destination: '/rgpd', permanent: true },
      { source: '/rssi', destination: '/rssi-externalise', permanent: true },
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
      { source: '/audit-conformite-sur-le-rgpd', destination: '/audit-conformite', permanent: true },
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
    // En dev, Next (webpack/HMR + react-refresh) exécute du code via eval() :
    // sans 'unsafe-eval' la CSP bloque l'hydratation de TOUTES les pages.
    // Autorisé en développement uniquement — la prod reste stricte (pas d'eval).
    const isDev = process.env.NODE_ENV !== 'production';
    // Sources de scripts limitées au strict nécessaire : chaque domaine qui héberge du
    // JS arbitraire (CDN publics, stockage Supabase…) permettrait de contourner la CSP.
    //  - GTM (gtm.js) + tagmanager.google.com : mode Preview de Tag Assistant ;
    //  - googleadservices / pagead2 / googleads.g.doubleclick : tag Google Ads
    //    (AW-704286147) du conteneur GTM — cf. doc CSP Google ;
    //  - static.axept.io : bandeau de consentement Axeptio, injecté par GTM ;
    //  - assets.calendly.com : widget de prise de rendez-vous (/prise-de-rdv).
    // 'unsafe-inline' reste nécessaire : Next.js et GTM injectent des scripts inline,
    // et le retirer imposerait des nonces, donc un rendu dynamique de toutes les pages
    // (plus de cache CDN). C'est ce qui plafonne la note securityheaders à A.
    const scriptSrc =
      "script-src 'self' 'unsafe-inline'" +
      (isDev ? " 'unsafe-eval'" : '') +
      ' https://*.googletagmanager.com https://tagmanager.google.com https://www.googleadservices.com https://www.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://static.axept.io https://assets.calendly.com';
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
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              scriptSrc,
              // Domaines Google : liste officielle CSP pour GTM + GA4 + Google Ads (+ mode Preview Tag Assistant)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com https://assets.calendly.com https://fonts.axept.io",
              "font-src 'self' https://fonts.gstatic.com https://fonts.axept.io",
              "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://randomuser.me https://logo.clearbit.com https://blogger.googleusercontent.com https://*.google-analytics.com https://*.googletagmanager.com https://ssl.gstatic.com https://www.gstatic.com https://www.google.com https://www.google.fr https://*.g.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com https://google.com https://*.axept.io https://axeptio.imgix.net",
              "connect-src 'self' https://*.supabase.co https://*.axept.io https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.google.com https://www.google.fr https://*.g.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com https://ad.doubleclick.net https://google.com",
              "media-src 'self' https://*.supabase.co",
              "frame-src https://www.googletagmanager.com https://td.doubleclick.net https://calendly.com https://www.youtube-nocookie.com https://www.youtube.com",
              "object-src 'none'",
              // Équivalent moderne de X-Frame-Options (conservé pour les anciens navigateurs).
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
