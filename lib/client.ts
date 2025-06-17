import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-12-17',
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

 
 
 
 
 
 