// Remove the static-data import, we no longer need it for this function
// import { getImageUrl } from "./static-data"

// Helper to construct Sanity CDN URLs
export const urlForImage = (source: any): string | null => {
  // console.log("urlForImage received source:", JSON.stringify(source, null, 2)); // DEBUG LINE REMOVED
  
  // First, check if the asset is already expanded and has a direct URL
  if (source?.asset?.url) {
    return source.asset.url;
  }

  // If not, proceed with the original logic using _ref
  if (!source || !source.asset || !source.asset._ref) {
    // console.log("urlForImage returning null due to missing source/asset/_ref and no direct source.asset.url"); // DEBUG LINE REMOVED
    return null; // Or a fallback placeholder URL
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    console.error("Sanity project ID or dataset (using NEXT_PUBLIC_ prefix) not configured in environment variables.");
    return null; // Or a fallback placeholder URL
  }

  // Example asset._ref: "image-a0b1c2d3e4f5a0b1c2d3e4f5-1200x800-jpg"
  const ref = source.asset._ref;
  const parts = ref.split('-');
  if (parts.length < 4 || parts[0] !== 'image') {
    console.error("Invalid Sanity image asset _ref format:", ref);
    return null; // Or a fallback placeholder URL
  }

  const assetId = parts[1];
  const dimensions = parts[2]; // e.g., "1200x800"
  const format = parts[3];    // e.g., "jpg"

  // Basic URL construction
  // You can add query parameters for width, height, format, quality, etc.
  // e.g., `?w=300&h=200&fit=crop&auto=format`
  // For now, let's return the original uploaded image.
  const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}`;
  
  // This is a simplified builder. The official @sanity/image-url offers more features
  // like cropping, resizing, formatting, etc. For basic display, this should work.
  // If you need those advanced features, we might need to rethink how to make
  // a lightweight version of the builder available or ensure @sanity/image-url can be used.

  return imageUrl;
};

// If you still need the old getImageUrl for other purposes, keep it.
// For now, I'm assuming urlForImage is the primary concern for Sanity images.
// If getImageUrl from static-data.ts IS used for actual Sanity images,
// then that's where the logic needs to change.
// Based on the file name `sanity-image.ts`, this function is intended for Sanity images.

/*
// Original static data approach (commented out or removed if not needed elsewhere)
import { getImageUrl as getStaticImageUrl } from "./static-data"

export const urlForImage_StaticFallback = (source: any) => {
  const assetRef = source?.asset?._ref || ""
  let imageKey = "fallback"
  if (assetRef.includes("image-")) {
    const parts = assetRef.split("-")
    if (parts.length > 1) {
      imageKey = parts[1].toLowerCase()
    }
  }
  return getStaticImageUrl(imageKey)
}
*/
