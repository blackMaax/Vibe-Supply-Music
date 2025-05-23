import { urlForImage } from "@/lib/sanity-image"

/**
 * Development-only media map
 * Provides placeholder URLs for all image fields when CMS data is not available
 */

// Create a type-safe devMedia object that uses urlForImage
export const devMedia: Record<string, string> = new Proxy(
  {},
  {
    get: (target, prop) => {
      return getPlaceholderUrl(prop as string)
    },
  },
)

// Function to safely get media with fallbacks
export function getDevMedia(source: any, fallbackType = "default"): string {
  try {
    // Try to get the Sanity image URL first
    const url = urlForImage(source)
    if (url) return url
    
    // Fallback to placeholder if no Sanity image
    return getPlaceholderUrl(fallbackType)
  } catch (error) {
    console.error(`Error accessing devMedia:`, error)
    return getPlaceholderUrl(fallbackType)
  }
}

// Helper function for placeholder URLs
function getPlaceholderUrl(key: string): string {
  return `/placeholder.svg?height=600&width=800&text=${key}`
}
