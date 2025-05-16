import { client } from './sanity'

// Define a reusable Sanity Image Asset Reference type
export interface SanityAsset {
  _id: string;
  _ref: string;
  url?: string; 
  metadata?: { 
    dimensions?: { 
      width?: number; 
      height?: number; 
      aspectRatio?: number 
    } 
  };
}

export interface SanityImageObject {
  asset: SanityAsset;
  alt?: string;
}

export interface SiteSettingsData {
  defaultSeoTitle?: string
  defaultSeoDescription?: string
  defaultSeoImage?: SanityImageObject 
  logo?: SanityImageObject 
  contactEmail?: string
  contactPhone?: string
  socialLinks?: { _key?: string; platform?: string; url?: string }[]
}

export interface PackageItem {
  _key: string;
  name: string;
  tagline?: string;
  features?: string[];
  isPopular?: boolean;
  image?: SanityImageObject; 
}

export interface PackageCtaSectionData {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  packages?: PackageItem[];
}

export interface HeroImageItem {
  _key?: string;
  alt?: string;
  title?: string; 
  asset: SanityAsset;
}

export interface MainHeroData {
  images?: HeroImageItem[];
}

export interface GalleryImageItemSanity {
  _key: string;
  alt?: string;
  caption?: string;
  showCaption?: boolean;
  image: SanityImageObject;
}

export interface ExperienceTheVibeGalleryData {
  title?: string;
  subtitle?: string;
  images?: GalleryImageItemSanity[];
}

// BandMemberData and MeetTheTeamSectionData are intentionally removed.

export interface HomepageData {
  title?: string; 
  mainHero?: MainHeroData;
  packageCtaSection?: PackageCtaSectionData;
  experienceTheVibeGallery?: ExperienceTheVibeGalleryData;
  // aboutVibeSupply and meetTheTeamSection are now fully removed.
}

// Interface for the new Contact Section data
export interface ContactSectionData {
  _type: "contactSection";
  _id: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  featuredImageCard?: {
    image?: SanityImageObject;
    imageAlt?: string;
    imageTitle?: string;
    imageSubtitle?: string;
  };
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

export async function getHomepageData(): Promise<HomepageData | null> {
  try {
    // The GROQ query itself is broad with '...' so it fetches what's defined.
    // No specific changes needed here for removed sections, as they won't be in the schema.
    const query = `*[_type == "homepage"][0] {
      ...,
      mainHero {
        ...,
        images[] {
          ...,
          asset -> {
            _id,
            _ref,
            url,
            metadata {
              dimensions
            }
          }
        }
      },
      packageCtaSection {
        ...,
        packages[] {
          ...,
          image {
            ...,
            asset -> {
              _id,
              _ref,
              url,
              metadata {
                dimensions
              }
            }
          }
        }
      },
      experienceTheVibeGallery {
        title,
        subtitle,
        images[] {
          _key,
          alt,
          caption,
          showCaption,
          image {
            asset -> {
              _id,
              _ref,
              url,
              metadata {
                dimensions
              }
            }
          }
        }
      }
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error("Error fetching homepage data:", error)
    return null
  }
} 

// Function to fetch Contact Section data
export async function getContactSectionData(): Promise<ContactSectionData | null> {
  try {
    const query = `*[_type == "contactSection"][0] {
      _id,
      _type,
      sectionTitle,
      sectionSubtitle,
      featuredImageCard {
        image {
          asset -> {
            _id,
            _ref,
            url,
            metadata {
              dimensions
            }
          }
        },
        imageAlt,
        imageTitle,
        imageSubtitle
      }
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error("Error fetching contact section data:", error)
    return null
  }
}

 
 
 
 