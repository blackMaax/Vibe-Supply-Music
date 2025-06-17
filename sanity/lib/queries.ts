import { client } from './client';

// GROQ query to fetch the siteSettings singleton document
const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  // Specify the fields you want to fetch from siteSettings
  // Example: logo, favicon, contactEmail, contactPhone, socialLinks, footerText
  ...
}`;

// Interface for the expected shape of siteSettings data
// You should update this to match the fields you defined in your siteSettings.ts schema
export interface SiteSettingsData {
  logo?: { asset?: { _ref?: string, url?: string } }; // Adjust based on actual image field structure
  favicon?: { asset?: { _ref?: string, url?: string } };
  siteBackgroundImage?: { 
    asset?: { 
      _id?: string,
      _ref?: string, 
      url?: string,
      metadata?: {
        dimensions?: {
          width?: number,
          height?: number
        }
      }
    },
    alt?: string
  };
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: Array<{ platform?: string; url?: string }>;
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
    favicon,
    siteBackgroundImage {
      asset-> {
        _id,
        _ref,
        url,
        metadata {
          dimensions
        }
      },
      alt
    },
    contactEmail,
    contactPhone,
    socialLinks[]{
      platform,
      url
    },
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

// Interfaces for PackageCtaSection
export interface PackageFeature { // This might be redundant if features are just strings
  _key: string; 
  text: string;
}

export interface PackageItem {
  _key: string;
  name: string;
  tagline?: string;
  features?: string[]; 
  image?: {
    asset?: { _ref?: string; _id?: string; url?: string };
    alt?: string;
  };
  isPopular?: boolean;
}

export interface PackageCtaSectionData {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  packages?: PackageItem[];
}

// Added common type for Sanity image references
export interface SanityImageReference {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string; // Typically added after resolving the reference
  };
  alt?: string;
}

// Added type for individual Band Member
export interface BandMemberData {
  _key: string; // Sanity adds a _key for array items
  name?: string;
  role?: string;
  bio?: string;
  image?: SanityImageReference;
}

// Added type for the Meet The Team section data
export interface MeetTheTeamSectionData {
  title?: string;
  subtitle?: string;
  mainImage?: SanityImageReference;
  bandMembers?: BandMemberData[];
}

export interface HomepageHeroImage {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
  title?: string;
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
  packageCtaSection?: PackageCtaSectionData;
  meetTheTeamSection?: MeetTheTeamSectionData; // Added meetTheTeamSection here
}

// GROQ query to fetch the homepage singleton document
const homepageQuery = `*[_type == "homepage"][0]{
  mainHero {
    images[]{
      asset-> {
        _id,
        url
      },
      alt,
      title
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
  },
  packageCtaSection {
    title,
    subtitle,
    buttonText,
    buttonLink,
    packages[]{
      _key,
      name,
      tagline,
      features[],
      image {
        asset->{_id, url},
        alt
      },
      isPopular
    }
  },
  meetTheTeamSection {  // Added meetTheTeamSection to the query
    title,
    subtitle,
    mainImage {
      asset->{_id, url},
      alt
    },
    bandMembers[]{
      _key,
      name,
      role,
      bio,
      image {
        asset->{_id, url},
        alt
      }
    }
  }
}`;

export async function getHomepageData(): Promise<HomepageData | null> {
  try {
    const data = await client.fetch<HomepageData>(homepageQuery);
    return data || null;
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
    return null;
  }
} 