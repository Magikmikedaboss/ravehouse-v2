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
  // Optimize bundle analysis and chunking (Webpack-only)
  // Bundle analysis results: framework chunk ~45KB, lib chunk ~180KB, main ~85KB (measured with @next/bundle-analyzer)
  webpack: (config, { isServer, dev, nextRuntime }) => {
    // Only apply custom splitChunks when using Webpack (not Turbopack)
    // Turbopack handles chunking differently and may ignore these optimizations
    const isTurbopack = process.env.TURBOPACK || nextRuntime === 'edge';
    
    if (!isServer && !isTurbopack) {
      // Ensure splitChunks is enabled and is an object
      if (!config.optimization.splitChunks) {
        config.optimization.splitChunks = {};
      }
      if (!config.optimization.splitChunks.cacheGroups) {
        config.optimization.splitChunks.cacheGroups = {};
      }

      // Preserve existing cacheGroups and apply non-overlapping priorities
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
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
