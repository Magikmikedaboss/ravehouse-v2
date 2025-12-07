import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'suspexraveoutfits.com',
        pathname: '/cdn/shop/files/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Optimize bundle analysis and chunking
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
          priority: 40,
          enforce: true,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name: 'lib',
          priority: 30,
          chunks: 'all',
        },
      };
    }
    return config;
  },
  // Enable compression and optimization
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
