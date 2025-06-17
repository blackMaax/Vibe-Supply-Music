// This is now a Server Component, it can be async and fetch data
import HomePageClient from "@/components/home/home-page-client" // Import the new client component
import { getSiteSettings, type SiteSettingsData, getHomepageDataOptimized, type HomepageData, type ContactSectionData } from "@/lib/queries" // Added getContactSectionData and ContactSectionData

// Force dynamic rendering - fetch fresh data on every request
export const dynamic = 'force-dynamic'

export default async function Home() {
  const siteSettings: SiteSettingsData | null = await getSiteSettings(); 
  const { homepageData, contactSectionData } = await getHomepageDataOptimized();
  
  const heroImages = homepageData?.mainHero?.images || [];
  const packageSectionRef = homepageData?.packageSectionRef;
  const experienceTheVibeGallery = homepageData?.experienceTheVibeGallery;

  return <HomePageClient 
    siteSettings={siteSettings}
    heroImages={heroImages} 
    packageSectionRef={packageSectionRef}
    experienceTheVibeGallery={experienceTheVibeGallery}
    contactSectionData={contactSectionData}
  />;
}
