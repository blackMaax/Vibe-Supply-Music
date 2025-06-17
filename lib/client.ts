import { createClient } from 'next-sanity'

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-17'
console.log('🔧 Sanity Client API Version:', apiVersion)

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: apiVersion,
  useCdn: false, // Disabled CDN for testing - re-enable for production
  perspective: 'published', // Only fetch published documents
  stega: {
    enabled: false,
    studioUrl: undefined,
  },
  // Force fresh data
  token: undefined, // Ensure no token caching
  ignoreBrowserTokenWarning: true,
  requestTagPrefix: 'sanity-no-cache',
}) 

 
 
 
 
 
 