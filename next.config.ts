import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'suspexraveoutfits.com',
        pathname: '/cdn/shop/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Next.js 15 has sophisticated built-in chunking optimizations
  // Removed custom webpack splitChunks config to use Next.js defaults
  // Enable compression and optimization
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
