import { createClient } from 'next-sanity'
import { client } from './client'

// Export the actual Sanity client instead of the mock
export { client }

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

export async function getAbout(): Promise<AboutData> {
  try {
    const query = `*[_type == "about"][0]{
      title,
      body
    }`
    const data = await client.fetch<AboutData>(query)
    return data || { title: "About Vibe Supply", body: [] }
  } catch (error) {
    console.error("Error getting about data:", error)
    return { title: "About Vibe Supply", body: [] }
  }
}

export async function getPackages(): Promise<PackageData[]> {
  try {
    const query = `*[_type == "package"]{
      tier,
      title,
      lineup,
      djType,
      description,
      isHighlighted
    }`
    const data = await client.fetch<PackageData[]>(query)
    return data || []
  } catch (error) {
    console.error("Error getting packages data:", error)
    return []
  }
}

export async function getTestimonials(): Promise<TestimonialData[]> {
  try {
    const query = `*[_type == "testimonial"]{
      name,
      quote,
      image {
        asset-> {
          _ref
        }
      }
    }`
    const data = await client.fetch<TestimonialData[]>(query)
    return data || []
  } catch (error) {
    console.error("Error getting testimonials data:", error)
    return []
  }
}

export async function getContact(): Promise<ContactData> {
  try {
    const query = `*[_type == "contact"][0]{
      email,
      phone,
      socialLinks
    }`
    const data = await client.fetch<ContactData>(query)
    return data || {
      email: "info@vibesupply.com",
      phone: "+44 123 456 7890",
      socialLinks: []
    }
  } catch (error) {
    console.error("Error getting contact data:", error)
    return {
      email: "info@vibesupply.com",
      phone: "+44 123 456 7890",
      socialLinks: []
    }
  }
}

// Add this function after the getContact function
export async function getGallery(): Promise<any> {
  try {
    const query = `*[_type == "gallery"][0]{
      images[] {
        _key,
        alt,
        caption,
        asset-> {
          _ref
        }
      }
    }`
    const data = await client.fetch<any>(query)
    return data || { images: [] }
  } catch (error) {
    console.error("Error getting gallery data:", error)
    return { images: [] }
  }
}
