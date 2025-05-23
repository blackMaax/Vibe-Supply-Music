import { createClient } from 'next-sanity'

// These are client-side variables, so we keep NEXT_PUBLIC_ prefix
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable')
}

// Create a client with different settings for development and production
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-09',
  // In development, we want to see changes immediately
  // In production, we use the CDN for better performance but with a shorter cache time
  useCdn: process.env.NODE_ENV === 'production',
  // Add a cache time of 60 seconds in production
  // This means content will update within a minute of changes
  perspective: 'published',
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
  },
})
