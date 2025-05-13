import { staticData } from "./static-data"

// Define types for your Sanity data
export interface HomepageData {
  headline: string
  subheadline: string
  ctaText: string
  heroImage?: {
    asset: {
      _ref: string
    }
  }
}

export interface AboutData {
  title: string
  body: any[] // Portable Text format
  images?: Array<{
    asset: {
      _ref: string
    }
  }>
}

export interface PackageData {
  tier: string
  title: string
  lineup: string[]
  djType: string
  description: any[] // Portable Text format
  isHighlighted?: boolean
}

export interface TestimonialData {
  name: string
  quote: string
  image?: {
    asset: {
      _ref: string
    }
  }
}

export interface ContactData {
  email: string
  phone: string
  socialLinks: string[]
}

// Add this interface to the existing types
export interface GalleryImage {
  _key: string
  alt?: string
  caption?: string
  asset: {
    _ref: string
  }
}

// Mock client that returns static data instead of making API calls
export const client = {
  fetch: async (query: string) => {
    console.log("Mock Sanity client fetch:", query)

    // Determine what data to return based on the query
    if (query.includes("homepage")) {
      return staticData.homepage
    } else if (query.includes("about")) {
      return staticData.about
    } else if (query.includes("package")) {
      return staticData.packages
    } else if (query.includes("testimonial")) {
      return staticData.testimonials
    } else if (query.includes("contact")) {
      return staticData.contact
    } else if (query.includes("gallery")) {
      return staticData.gallery
    }

    // Default fallback
    return {}
  },
  config: () => ({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  }),
}

// In-memory cache for frequently accessed data
let homepageCache: HomepageData | null = null
let testimonialsCache: TestimonialData[] | null = null

export async function getHomepage(): Promise<HomepageData> {
  // Return cached data if available
  if (homepageCache) {
    return homepageCache
  }

  try {
    // Use static data instead of fetching from Sanity
    const data = staticData.homepage

    // Cache the result
    homepageCache = data
    return data
  } catch (error) {
    console.error("Error getting homepage data:", error)
    return {
      headline: "Make Your Event Unforgettable",
      subheadline: "Live music for weddings & private events",
      ctaText: "Book a Consultation",
    }
  }
}

export async function getAbout(): Promise<AboutData> {
  try {
    return staticData.about
  } catch (error) {
    console.error("Error getting about data:", error)
    return {
      title: "About Vibe Supply",
      body: [],
    }
  }
}

export async function getPackages(): Promise<PackageData[]> {
  try {
    return staticData.packages
  } catch (error) {
    console.error("Error getting packages data:", error)
    return []
  }
}

export async function getTestimonials(): Promise<TestimonialData[]> {
  // Return cached data if available
  if (testimonialsCache) {
    return testimonialsCache
  }

  try {
    // Use static data instead of fetching from Sanity
    const data = staticData.testimonials

    // Cache the result
    testimonialsCache = data
    return data
  } catch (error) {
    console.error("Error getting testimonials data:", error)
    return []
  }
}

export async function getContact(): Promise<ContactData> {
  try {
    return staticData.contact
  } catch (error) {
    console.error("Error getting contact data:", error)
    return {
      email: "info@vibesupply.com",
      phone: "+44 123 456 7890",
      socialLinks: [],
    }
  }
}

// Add this function after the getContact function
export async function getGallery() {
  try {
    return staticData.gallery
  } catch (error) {
    console.error("Error getting gallery data:", error)
    return { images: [] }
  }
}
