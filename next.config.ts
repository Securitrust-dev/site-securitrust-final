import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Nous avons supprimé la partie "eslint" (car elle n'est plus supportée dans Next 16)
  // Nous avons supprimé la partie "turbopack" (pour utiliser Webpack et éviter le crash "Is a directory")
};

export default nextConfig;