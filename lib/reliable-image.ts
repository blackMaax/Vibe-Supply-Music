import { urlForImage } from "@/lib/sanity-image"

// Function to get an image with multiple fallbacks
export function getReliableImage(source: any): string {
  // Development only: console.log(`Getting reliable image for source:`, source)
  const url = urlForImage(source)
  return url || `/placeholder.svg?height=600&width=800&text=fallback`
}
