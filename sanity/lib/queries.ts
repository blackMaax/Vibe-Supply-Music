import { client } from './client';

// GROQ query to fetch the siteSettings singleton document
const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  // Specify the fields you want to fetch from siteSettings
  // Example: logo, logoWhite, favicon, contactEmail, contactPhone, socialLinks, 
  // defaultSeoTitle, defaultSeoDescription, defaultSeoImage, footerText
  ...
}`;

// Interface for the expected shape of siteSettings data
// You should update this to match the fields you defined in your siteSettings.ts schema
export interface SiteSettingsData {
  logo?: { asset?: { _ref?: string, url?: string } }; // Adjust based on actual image field structure
  logoWhite?: { asset?: { _ref?: string, url?: string } };
  favicon?: { asset?: { _ref?: string, url?: string } };
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: Array<{ platform?: string; url?: string }>;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultSeoImage?: { asset?: { _ref?: string, url?: string } };
  footerText?: string;
  // Add any other fields you have in your siteSettings schema
}

/**
 * Fetches the site settings data from Sanity.
 * @returns A promise that resolves to the site settings data or null if not found.
 */
export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  // To make the query more specific and fetch only what you need, 
  // list the exact fields within the curly braces of the query.
  // For example: `*[_type == "siteSettings"][0]{ logo, contactEmail, socialLinks }`
  // For now, using "..." to fetch all fields for simplicity, but it's less efficient.
  const query = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
    logo,
    logoWhite,
    favicon,
    contactEmail,
    contactPhone,
    socialLinks[]{
      platform,
      url
    },
    defaultSeoTitle,
    defaultSeoDescription,
    defaultSeoImage,
    footerText
  }`;
  
  try {
    const settings = await client.fetch<SiteSettingsData>(query);
    return settings || null;
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return null;
  }
}

// GROQ query to fetch the homepage singleton document
const homepageQuery = `*[_type == "homepage"][0]{
  mainHero {
    images[]{
      asset-> {
        _id,
        url
      },
      alt
    }
  },
  aboutVibeSupply {
    title,
    content,
    image {
      asset-> {
        _id,
        url
      },
      imageTitle,
      imageSubtitle
    },
    footer,
    logo {
      asset-> {
        _id,
        url
      }
    },
    featuresIntro,
    features[] {
      text
    }
  }
}`;

export interface HomepageHeroImage {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

export interface HomepageData {
  mainHero?: {
    images?: HomepageHeroImage[];
  };
  aboutVibeSupply?: {
    title?: string;
    content?: any[];
    image?: { asset?: { _id: string; url: string }, imageTitle?: string, imageSubtitle?: string };
    footer?: string;
    logo?: { asset?: { _id: string; url: string } };
    featuresIntro?: string;
    features?: { text: string }[];
  };
}

export async function getHomepageData(): Promise<HomepageData | null> {
  try {
    const data = await client.fetch<HomepageData>(homepageQuery);
    return data || null;
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
    return null;
  }
} 