import imageUrlBuilder from '@sanity/image-url'
import { client } from './client' // Assumes your Sanity client is exported from here
import type { SanityImageSource } from '@sanity/image-url/lib/types/types' // Import the type for better safety

const builder = imageUrlBuilder(client)

/**
 * Generates a URL for a Sanity image asset.
 * @param source - The Sanity image source object (e.g., an asset reference, an image object from Sanity, or an asset ID string).
 * @returns A string representing the image URL, or null if the source is invalid or empty.
 */
export function urlFor(source: SanityImageSource | undefined | null): string | null {
  if (!source) {
    return null // Return null if source is undefined, null, or empty string
  }
  try {
    // The builder can handle various forms of SanityImageSource directly.
    // Adding auto format and fit max for basic optimization.
    return builder.image(source).auto('format').fit('max').url()
  } catch (error) {
    console.error("Error building image URL:", error, "Source:", source);
    return null; // Or return a placeholder image URL
  }
}

/**
 * Example of how to get a URL with specific dimensions:
 * export function urlForThumbnail(source: SanityImageSource | undefined | null): string | null {
 *   if (!source) return null;
 *   try {
 *     return builder.image(source).width(200).height(200).fit('crop').url();
 *   } catch (error) {
 *     console.error("Error building thumbnail URL:", error, "Source:", source);
 *     return null;
 *   }
 * }
 */
