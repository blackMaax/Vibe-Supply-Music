// This is now a Server Component, it can be async and fetch data
import HomePageClient from "@/components/home/home-page-client" // Import the new client component
import { getSiteSettings, type SiteSettingsData, getHomepageData, type HomepageData, getContactSectionData, type ContactSectionData } from "@/lib/queries" // Added getContactSectionData and ContactSectionData

// Add revalidation every 60 seconds
export const revalidate = 60

export default async function Home() {
  const siteSettings: SiteSettingsData | null = await getSiteSettings();
  const homepageData: HomepageData | null = await getHomepageData();
  const contactSectionData: ContactSectionData | null = await getContactSectionData(); // Fetch contact section data
  const heroImages = homepageData?.mainHero?.images || [];
  // const aboutVibeSupply = homepageData?.aboutVibeSupply; // REMOVE
  const packageCtaSection = homepageData?.packageCtaSection; // Keep
  // const meetTheTeamSection = homepageData?.meetTheTeamSection; // REMOVE
  const experienceTheVibeGallery = homepageData?.experienceTheVibeGallery; // Keep
  // Fetch any other data needed for the homepage here if it's coming from Sanity
  // For example, testimonials, gallery images (actual data, not placeholders), etc.

  return <HomePageClient 
    siteSettings={siteSettings} 
    heroImages={heroImages} 
    // aboutVibeSupply={aboutVibeSupply} // REMOVE
    packageCtaSection={packageCtaSection}
    // meetTheTeamSection={meetTheTeamSection} // REMOVE
    experienceTheVibeGallery={experienceTheVibeGallery}
    contactSectionData={contactSectionData} // Pass contact section data to client component
  />;
}
