// Fallback images that will always work in production
export const FALLBACK_IMAGES = {
  // Logo
  logo: "/images/logo.png",
  logoWhite: "/images/logo-white.png",

  // Hero
  heroImage: "/images/hero.jpg",

  // Band members
  bandMember1: "/images/band-member-1.jpg",
  bandMember2: "/images/band-member-2.jpg",
  bandMember3: "/images/band-member-3.jpg",

  // Performances
  performance1: "/images/performance-1.jpg",
  performance2: "/images/performance-2.jpg",
  performance3: "/images/performance-3.jpg",
  performance4: "/images/performance-4.jpg",
  performance11: "/images/performance-11.jpg",

  // Gallery
  gallery1: "/images/gallery-1.jpg",
  gallery2: "/images/gallery-2.jpg",
  gallery3: "/images/gallery-3.jpg",
  gallery4: "/images/gallery-4.jpg",
  gallery5: "/images/gallery-5.jpg",
  gallery6: "/images/gallery-6.jpg",
  gallery7: "/images/gallery-7.jpg",
  gallery8: "/images/gallery-8.jpg",
  gallery9: "/images/gallery-9.jpg",

  // Default fallback
  fallback: "/images/fallback.jpg",
}

// Function to get a fallback image with console logging
export function getFallbackImage(key: string): string {
  // Development only: console.log(`Getting fallback image for key: ${key}`)

  // If the key exists in our fallback map, return it
  if (key in FALLBACK_IMAGES) {
    const imagePath = FALLBACK_IMAGES[key as keyof typeof FALLBACK_IMAGES]
    // Development only: console.log(`Found fallback image: ${imagePath}`)
    return imagePath
  }

  // Otherwise return a placeholder
  // Development only: console.log(`No fallback found for ${key}, using default placeholder`)
  return `/placeholder.svg?height=600&width=800&text=${key}`
}
