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
  // Move serverComponentsExternalPackages to top level
  serverExternalPackages: ['@sanity/image-url', 'nodemailer'],
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
      'date-fns',
      'recharts',
      'embla-carousel-react',
    ],
    // Optimize CSS loading
    optimizeCss: true,
    // Turbo mode for faster builds
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Configure webpack for better chunking
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Enable tree shaking for better dead code elimination
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Split chunks optimization
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          // Vendor chunks
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          // Radix UI components
          radixUI: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix-ui',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Framer Motion
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Sanity
          sanity: {
            test: /[\\/]node_modules[\\/](next-sanity|sanity|@sanity)[\\/]/,
            name: 'sanity',
            priority: 20,
            reuseExistingChunk: true,
          },
          // UI components
          ui: {
            test: /[\\/]components[\\/]ui[\\/]/,
            name: 'ui-components',
            priority: 15,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };

      // Minimize bundle size
      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'deterministic';
    }

    // Alias for smaller lodash imports
    config.resolve.alias = {
      ...config.resolve.alias,
      'lodash': 'lodash-es',
    };

    return config;
  },
  // Enable compression
  compress: true,
  // Reduce bundle size by excluding source maps in production
  productionBrowserSourceMaps: false,
  // Font optimization is now handled by Next.js automatically
}

export default nextConfig
