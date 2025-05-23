/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    'next-sanity',
    'sanity',
  ],
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-toast',
      'framer-motion',
      'lucide-react',
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'sonner',
    ],
    // Enable modern JavaScript features
    modern: true,
    // Optimize CSS loading
    optimizeCss: true,
    // Enable granular chunks
    granularChunks: true,
  },
  // Configure webpack for better chunking
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Split chunks optimization
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      }
    }
    return config
  },
}

export default nextConfig
