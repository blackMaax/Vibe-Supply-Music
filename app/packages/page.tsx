import type { Metadata } from "next"
import PackagesClientPage from "./PackagesClientPage"
import { getSiteSettings, type SiteSettingsData } from "@/lib/queries"

export const metadata: Metadata = {
  title: "Packages | Vibe Supply",
  description: "Explore our premium entertainment packages for your special event.",
}

export const revalidate = 60;

export default async function PackagesPage() {
  const siteSettings: SiteSettingsData | null = await getSiteSettings();
  return <PackagesClientPage siteSettings={siteSettings} />
}
