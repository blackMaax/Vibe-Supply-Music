import { getImageUrl } from "./static-data"

/**
 * Development-only media map
 * Provides placeholder URLs for all image fields when CMS data is not available
 */

// Create a type-safe devMedia object that uses getImageUrl
export const devMedia: Record<string, string> = new Proxy(
  {},
  {
    get: (target, prop) => {
      return getImageUrl(prop as string)
    },
  },
)

// Function to safely get media with fallbacks
export function getDevMedia(key: string, fallbackType = "default"): string {
  try {
    // Use the image loader to ensure we have a fallback
    return getImageUrl(key)
  } catch (error) {
    console.error(`Error accessing devMedia.${key}:`, error)
    return `/placeholder.svg?height=600&width=800&text=${key}`
  }
}
