/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
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
        source: '/(.*)',
        has: [{ type: 'host', value: 'securitrust.fr' }],
        destination: 'https://www.securitrust.fr/:path*',
        permanent: true,
      },
      { source: '/test-intrusion', destination: '/pentest-externe', permanent: true },
      { source: '/audit', destination: '/services', permanent: true },
      { source: '/conformite', destination: '/mise-en-conformite-rgpd', permanent: true },
      { source: '/rssi', destination: '/rssi-externalise', permanent: true },
      { source: '/services-cybersecurite', destination: '/services', permanent: true },
      { source: '/audit-securite', destination: '/audit-cybersecurite', permanent: true },
      { source: '/dpo-data-protection-officer', destination: '/dpo-externalise', permanent: true },
      { source: '/audit-conformite-sur-le-rgpd', destination: '/audit-conformite', permanent: true },
      { source: '/test-dintrusion', destination: '/pentest-externe', permanent: true },
      { source: '/rssi-automatise', destination: '/cyber-pilote', permanent: true },
      { source: '/rssi-automatise/:path*', destination: '/cyber-pilote/:path*', permanent: true },
      // L'ancienne URL de preview de la LP pointe désormais vers la page RSSI canonique.
      { source: '/rssi-externalise-lp', destination: '/rssi-externalise', permanent: true },
      // Article de blog qui cannibalisait la LP « RSSI externalisé » : on redirige
      // vers la LP canonique pour consolider le référencement sur une seule URL.
      { source: '/articles/rssi-externalise-prix-missions-et-roi-pour-les-pme', destination: '/rssi-externalise', permanent: true },
    ];
  },
  async rewrites() {
    return [
      // Pages HTML statiques (public/*.html) servies sur des URLs propres, sans l'extension .html
      { source: '/iso27001', destination: '/iso27001.html' },
      { source: '/nis2', destination: '/nis2.html' },
      { source: '/hds', destination: '/hds.html' },
      { source: '/tisax', destination: '/tisax.html' },
      { source: '/audit-o365', destination: '/audit-o365.html' },
      { source: '/pentest-web', destination: '/pentest-web.html' },
      { source: '/pentest-ad', destination: '/pentest-ad.html' },
      { source: '/pentest-mobile', destination: '/pentest-mobile.html' },
    ];
  },
  async headers() {
    // En dev, Next (webpack/HMR + react-refresh) exécute du code via eval() :
    // sans 'unsafe-eval' la CSP bloque l'hydratation de TOUTES les pages.
    // Autorisé en développement uniquement — la prod reste stricte (pas d'eval).
    const isDev = process.env.NODE_ENV !== 'production';
    // GTM (gtm.js) + tagmanager.google.com requis pour le mode Preview de Tag Assistant.
    // Domaines Google Ads (googleadservices / pagead2 / googleads.g.doubleclick) ajoutés
    // car le conteneur GTM fait tourner un tag Google Ads (AW-704286147) — cf. doc CSP Google.
    const scriptSrc =
      "script-src 'self' 'unsafe-inline'" +
      (isDev ? " 'unsafe-eval'" : '') +
      ' https://js.stripe.com https://vercel.live https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://code.iconify.design https://*.supabase.co https://*.googletagmanager.com https://tagmanager.google.com https://www.googleadservices.com https://www.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net';
    return [
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
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://randomuser.me https://logo.clearbit.com https://blogger.googleusercontent.com https://*.google-analytics.com https://*.googletagmanager.com https://ssl.gstatic.com https://www.gstatic.com https://www.google.com https://www.google.fr https://*.g.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com https://google.com",
              "connect-src 'self' https://*.supabase.co https://api.stripe.com https://vitals.vercel-insights.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.google.com https://www.google.fr https://*.g.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com https://ad.doubleclick.net https://google.com",
              "media-src 'self' https://*.supabase.co",
              "frame-src https://js.stripe.com https://hooks.stripe.com https://www.googletagmanager.com https://td.doubleclick.net",
              "object-src 'none'",
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
