#!/usr/bin/env node

/**
 * Bundle Analysis Script for Vibe Supply
 * Helps identify performance bottlenecks and optimize JavaScript payload
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing bundle size and performance...\n');

// Install webpack-bundle-analyzer if not present
try {
  require.resolve('@next/bundle-analyzer');
} catch (e) {
  console.log('📦 Installing bundle analyzer...');
  execSync('npm install --save-dev @next/bundle-analyzer', { stdio: 'inherit' });
}

// Create bundle analyzer config
const bundleAnalyzerConfig = `
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

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
      'date-fns',
      'recharts',
      'embla-carousel-react',
    ],
    optimizeCss: true,
    serverComponentsExternalPackages: ['@sanity/image-url', 'nodemailer'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          radixUI: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix-ui',
            priority: 20,
            reuseExistingChunk: true,
          },
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 20,
            reuseExistingChunk: true,
          },
          sanity: {
            test: /[\\/]node_modules[\\/](next-sanity|sanity|@sanity)[\\/]/,
            name: 'sanity',
            priority: 20,
            reuseExistingChunk: true,
          },
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

      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'deterministic';
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      'lodash': 'lodash-es',
    };

    return config;
  },
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
}

module.exports = withBundleAnalyzer(nextConfig)
`;

// Write the config
fs.writeFileSync('next.config.analyzer.mjs', bundleAnalyzerConfig);

console.log('🚀 Running bundle analysis...');
console.log('   This will build your app and open the bundle analyzer in your browser.\n');

// Run the analysis
try {
  execSync('ANALYZE=true npm run build', { 
    stdio: 'inherit',
    env: { ...process.env, ANALYZE: 'true' }
  });
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
  process.exit(1);
}

console.log('\n✅ Bundle analysis complete!');
console.log('📊 The bundle analyzer should have opened in your browser.');
console.log('🔍 Look for:');
console.log('   • Large dependencies that could be optimized');
console.log('   • Unused code that can be removed');
console.log('   • Components that could be lazy-loaded');
console.log('   • Duplicate dependencies');

// Performance recommendations
console.log('\n💡 Performance Recommendations:');
console.log('1. Use dynamic imports for heavy components');
console.log('2. Implement code splitting at route level');
console.log('3. Optimize images and fonts');
console.log('4. Remove unused dependencies');
console.log('5. Use React.memo for expensive components');
console.log('6. Implement virtual scrolling for long lists');
console.log('7. Use service workers for caching');

// Clean up
fs.unlinkSync('next.config.analyzer.mjs'); 