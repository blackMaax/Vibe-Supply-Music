import { client } from './sanity'

export interface SiteSettingsData {
  defaultSeoTitle?: string
  defaultSeoDescription?: string
  defaultSeoImage?: { asset: { _ref: string } }
  logo?: { asset: { _ref: string } }
  contactEmail?: string
  contactPhone?: string
  socialLinks?: { platform?: string; url?: string }[]
}

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  try {
    const query = `*[_type == "siteSettings"][0]`
    return await client.fetch(query)
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return null
  }
}

export async function getHomepageData() {
  try {
    const query = `*[_type == "homepage"][0]`
    return await client.fetch(query)
  } catch (error) {
    console.error("Error fetching homepage data:", error)
    return null
  }
} 
 
 
 
 