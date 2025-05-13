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
    '@sanity/ui',
    '@sanity/vision',
    'next-sanity',
    'sanity',
    'framer-motion',
  ],
}

export default nextConfig
