import { getImageUrl } from "./static-data"

// Mock image builder that returns static URLs
export const urlForImage = (source: any) => {
  // Extract the asset reference if it exists
  const assetRef = source?.asset?._ref || ""

  // Try to extract an image key from the asset reference
  let imageKey = "fallback"

  if (assetRef.includes("image-")) {
    // Extract a simple key from the asset reference
    const parts = assetRef.split("-")
    if (parts.length > 1) {
      imageKey = parts[1].toLowerCase()
    }
  }

  // Return an object with a url method that returns a static URL
  return {
    width: () => urlForImage(source),
    height: () => urlForImage(source),
    fit: () => urlForImage(source),
    auto: () => urlForImage(source),
    forceDownload: () => urlForImage(source),
    url: () => {
      // Try to get a matching image URL
      return getImageUrl(imageKey)
    },
  }
}
