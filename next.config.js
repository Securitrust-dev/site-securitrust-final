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
    ];
  },
  async headers() {
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
              "script-src 'self' 'unsafe-inline' https://js.stripe.com https://vercel.live https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://code.iconify.design https://*.supabase.co",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://randomuser.me https://logo.clearbit.com https://blogger.googleusercontent.com",
              "connect-src 'self' https://*.supabase.co https://api.stripe.com https://vitals.vercel-insights.com",
              "media-src 'self' https://*.supabase.co",
              "frame-src https://js.stripe.com https://hooks.stripe.com",
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
