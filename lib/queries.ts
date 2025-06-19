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
  caption?: string;
}

export interface SiteSettingsData {
  logo?: SanityImageObject 
  title?: string;
  siteBackgroundImage?: SanityImageObject;
  contactEmail?: string
  contactPhone?: string
  socialLinks?: { _key?: string; platform?: string; url?: string }[]
}

// --- Reusable Package Section Interfaces ---
export interface CtaSectionData {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface PackageItemData {
  _key: string;
  name: string;
  price?: string;
  tagline?: string;
  image?: SanityImageObject; 
  isPopular?: boolean;
  features?: string[];
}

export interface PackageSectionData {
  _id: string;
  _type: "packageSection";
  sectionTitle?: string;
  packages?: PackageItemData[];
}

// --- Page Specific Interfaces ---

export interface HeroImageItem {
  _key?: string;
  title?: string; 
  asset: SanityAsset;
}

export interface MainHeroData {
  images?: HeroImageItem[];
}

export interface GalleryImageItemSanity {
  _key: string;
  caption?: string;
  showCaption?: boolean;
  image: SanityImageObject;
}

export interface ExperienceTheVibeGalleryData {
  title?: string;
  subtitle?: string;
  images?: GalleryImageItemSanity[];
}

export interface HomepageData {
  _id: string; // Added _id to match query
  _type: "homepage"; // Added _type to match query
  title?: string; 
  mainHero?: MainHeroData;
  // packageCtaSection is replaced by packageSectionRef
  packageSectionRef?: PackageSectionData; // Changed to reference type
  experienceTheVibeGallery?: ExperienceTheVibeGalleryData;
}

// Interface for the new Contact Section data
export interface ContactSectionData {
  _type: "contactSection";
  _id: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
}

// --- About Page Interfaces ---

export interface KeyPointItem {
  _key: string;
  text: string;
}

export interface ParagraphItem {
  _key: string;
  text: string;
}

export interface AboutUsSectionData {
  ethosTitle?: string;
  ethosContent?: string;
  mainContentTitle?: string;
  ourStoryParagraphs?: ParagraphItem[];
  // Keep old field for backward compatibility
  ourStoryParagraph?: string;
  keyPoints?: KeyPointItem[];
  featuredImage?: {
    asset: {
      _id: string;
      _ref: string;
      url?: string;
      metadata?: {
        dimensions?: {
          width?: number;
          height?: number;
          aspectRatio?: number;
        };
      };
    };
    position?: 'left' | 'right';
  };
}

export interface FounderItem {
  _key: string;
  name: string;
  role?: string;
  bio?: string;
  image?: SanityImageObject;
  socialLinks?: { _key?: string; platform?: string; url?: string }[]; // Reusing from SiteSettingsData
}

export interface MeetTheFoundersSectionData {
  isHidden?: boolean;
  title?: string;
  subtitle?: string;
  founders?: FounderItem[];
}

export interface FAQItem {
  _key: string;
  question: string;
  answer: string;
  image?: SanityImageObject;
  imagePosition: 'left' | 'right';
}

export interface FAQSectionData {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
}

export interface RatesAndConsultationSectionData {
  title?: string;
  content?: string;
  image?: SanityImageObject; 
}

export interface PackagePageData {
  _id: string;
  _type: "packagePage";
  title?: string;
  subtitle?: string;
  packageSectionRef?: PackageSectionData;
  ratesAndConsultationSection?: RatesAndConsultationSectionData;
  faqSection?: FAQSectionData;
}

export interface AboutPageData {
  aboutUsSection: {
    ethosTitle?: string;
    ethosContent?: string;
    mainContentTitle?: string;
    ourStoryParagraphs?: ParagraphItem[];
    // Keep old field for backward compatibility
    ourStoryParagraph?: string;
    keyPoints?: KeyPointItem[];
    featuredImage?: {
      asset: {
        _id: string;
        _ref: string;
        url?: string;
        metadata?: {
          dimensions?: {
            width?: number;
            height?: number;
            aspectRatio?: number;
          };
        };
      };
      position?: 'left' | 'right';
    };
  };
  meetTheFoundersSection?: {
    title?: string;
    subtitle?: string;
    isHidden?: boolean;
    founders?: FounderItem[];
  };
}

// --- Fetch Functions ---

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  try {
    const query = `*[_type == "siteSettings"][0]{
      ...,
      siteBackgroundImage {
        asset->{
          _id,
          _ref,
          url,
          metadata {
            dimensions
          }
        }
      }
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return null
  }
}

export async function getSiteSettingsOptimized(): Promise<SiteSettingsData | null> {
  const query = `*[_type == "siteSettings"][0]{
    logo,
    title,
    siteBackgroundImage {
      asset->{
        _id,
        _ref,
        url,
        metadata {
          dimensions
        }
      }
    },
    contactEmail,
    contactPhone,
    socialLinks
  }`
  try {
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error("Error fetching optimized site settings:", error)
    return null
  }
}

export async function getHomepageData(): Promise<HomepageData | null> {
  try {
    const query = `*[_type == "homepage"][0] {
      _id,
      _type,
      title,
      mainHero {
        images[] {
          _key,
          title,
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
      // Fetch referenced package section data
      packageSectionRef -> {
        _id,
        _type,
        sectionTitle,
        packages[] {
          _key,
          name,
          price,
          tagline,
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
          isPopular,
          features
        }
      },
      experienceTheVibeGallery {
        title,
        subtitle,
        images[] {
          _key,
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
      sectionSubtitle
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error("Error fetching contact section data:", error)
    return null
  }
}

// Optimized query for Homepage that combines all needed data
export async function getHomepageDataOptimized(): Promise<{
  homepageData: HomepageData | null;
  contactSectionData: ContactSectionData | null;
}> {
  try {
    const query = `{
      "homepageData": *[_type == "homepage"][0] {
        _id,
        _type,
        title,
        mainHero {
          images[] {
            _key,
            title,
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
        packageSectionRef -> {
          _id,
          _type,
          sectionTitle,
          packages[] {
            _key,
            name,
            price,
            tagline,
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
            isPopular,
            features
          }
        },
        experienceTheVibeGallery {
          title,
          subtitle,
          images[] {
            _key,
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
      },
      "contactSectionData": *[_type == "contactSection"][0] {
        _id,
        _type,
        sectionTitle,
        sectionSubtitle
      }
    }`;
    const result = await client.fetch(query);
    return {
      homepageData: result.homepageData || null,
      contactSectionData: result.contactSectionData || null,
    };
  } catch (error) {
    console.error("Error fetching optimized homepage data:", error);
    return {
      homepageData: null,
      contactSectionData: null,
    };
  }
}

// Optimized query for About page that combines all needed data
export async function getAboutPageDataOptimized(): Promise<{
  siteSettings: SiteSettingsData;
  aboutPageData: AboutPageData;
  contactSectionData: ContactSectionData;
} | null> {
  try {
    const query = `{
      "siteSettings": *[_type == "siteSettings"][0] {
        logo {
          asset-> {
            _id,
            _ref,
            url
          }
        },
        contactEmail,
        contactPhone,
        socialLinks
      },
      "aboutPageData": *[_type == "aboutPage"][0] {
        aboutUsSection {
          ethosTitle,
          ethosContent,
          mainContentTitle,
          ourStoryParagraphs[] {
            _key,
            text
          },
          ourStoryParagraph,
          keyPoints[] {
            _key,
            text
          },
          featuredImage {
            asset-> {
              _id,
              _ref,
              url,
              metadata {
                dimensions
              }
            },
            position
          }
        },
        meetTheFoundersSection {
          isHidden,
          title,
          subtitle,
          founders[] {
            _key,
            name,
            role,
            bio,
            image {
              asset-> {
                _id,
                _ref,
                url
              }
            },
            socialLinks[] {
              _key,
              platform,
              url
            }
          }
        }
              },
        "contactSectionData": *[_type == "contactSection"][0] {
          _id,
          _type,
          sectionTitle,
          sectionSubtitle
        }
      }`

    const data = await client.fetch(query)
    
    if (!data?.siteSettings || !data?.aboutPageData) {
      throw new Error('Required data missing from Sanity')
    }

    return {
      siteSettings: data.siteSettings,
      aboutPageData: data.aboutPageData,
      contactSectionData: data.contactSectionData || null,
    }
  } catch (error) {
    console.error("Error fetching about page data:", error)
    return null
  }
}

export async function getPackagePageData(): Promise<PackagePageData | null> {
  try {
    const query = `*[_type == "packagePage"][0] {
      _id,
      _type,
      title,
      subtitle,
      packageSectionRef -> {
        _id,
        _type,
        sectionTitle,
        packages[] {
          _key,
          name,
          price,
          tagline,
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
          isPopular,
          features
        }
      },
      ratesAndConsultationSection {
        title,
        content,
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
      },
      faqSection {
        title,
        subtitle,
        faqs[] {
          _key,
          question,
          answer,
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
          imagePosition
        }
      }
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error("Error fetching package page data:", error)
    return null
  }
}

// Optimized query for Package page that combines all needed data
export async function getPackagePageDataOptimized(): Promise<{
  siteSettings: SiteSettingsData | null;
  packagePageData: PackagePageData | null;
}> {
  try {
    const query = `{
      "siteSettings": *[_type == "siteSettings"][0] {
        logo {
          asset-> {
            _id,
            _ref,
            url
          }
        },
        contactEmail,
        contactPhone,
        socialLinks
      },
      "packagePageData": *[_type == "packagePage"][0] {
        _id,
        _type,
        title,
        subtitle,
        packageSectionRef -> {
          _id,
          _type,
          sectionTitle,
          packages[] {
            _key,
            name,
            price,
            tagline,
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
            isPopular,
            features
          }
        },
        ratesAndConsultationSection {
          title,
          content,
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
        },
        faqSection {
          title,
          subtitle,
          faqs[] {
            _key,
            question,
            answer,
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
            imagePosition
          }
        }
      }
    }`

    const result = await client.fetch(query);
    
    return {
      siteSettings: result.siteSettings || null,
      packagePageData: result.packagePageData || null,
    };
  } catch (error) {
    console.error("Error fetching optimized package page data:", error);
    return {
      siteSettings: null,
      packagePageData: null,
    };
  }
}

 
 
 
 