import { getImageUrl } from "./static-data"

// Function to get an image with multiple fallbacks
export function getReliableImage(key: string): string {
  console.log(`Getting reliable image for key: ${key}`)
  return getImageUrl(key)
}
