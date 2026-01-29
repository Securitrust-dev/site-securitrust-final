/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
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
};

export default nextConfig;