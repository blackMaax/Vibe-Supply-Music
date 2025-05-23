import type { Metadata } from "next"
import PackagesClientPage from "./PackagesClientPage"
import { getPackagePageDataOptimized, type SiteSettingsData, type PackagePageData } from "@/lib/queries"

export const metadata: Metadata = {
  title: "Packages | Vibe Supply",
  description: "Explore our premium entertainment packages for your special event.",
}

// Increase revalidation time to 5 minutes to reduce API calls
export const revalidate = 30;

export default async function PackagesPage() {
  const { siteSettings, packagePageData } = await getPackagePageDataOptimized();

  return (
    <PackagesClientPage 
      siteSettings={siteSettings} 
      packagePageData={packagePageData}
    />
  );
}
