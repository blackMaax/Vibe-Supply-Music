// This is now a Server Component, it can be async and fetch data
import HomePageClient from "@/components/home/home-page-client" // Import the new client component
import { getSiteSettings, type SiteSettingsData, getHomepageData } from "@/lib/queries"

// Add revalidation every 60 seconds
export const revalidate = 60

export default async function Home() {
  const siteSettings: SiteSettingsData | null = await getSiteSettings();
  const homepageData = await getHomepageData();
  const heroImages = homepageData?.mainHero?.images || [];
  const aboutVibeSupply = homepageData?.aboutVibeSupply;
  // Fetch any other data needed for the homepage here if it's coming from Sanity
  // For example, testimonials, gallery images (actual data, not placeholders), etc.

  return <HomePageClient 
    siteSettings={siteSettings} 
    heroImages={heroImages} 
    aboutVibeSupply={aboutVibeSupply} 
    packageCtaSection={homepageData?.packageCtaSection}
    meetTheTeamSection={homepageData?.meetTheTeamSection}
  />;
}
