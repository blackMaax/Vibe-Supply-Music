import { Metadata } from 'next'
import { getPackagePageDataOptimized } from '@/lib/queries'
import PackagesClientPage from './PackagesClientPage'

// SEO metadata for Packages page
export const metadata: Metadata = {
  title: "Band Packages & Pricing | Vibe Supply Live Entertainment",
  description: "Choose from our premium live band packages for weddings, parties, and events. Compare features and pricing to find your perfect match.",
  keywords: "wedding band packages, live music pricing, function band hire, 5-piece band, DJ and band combo, party band options, event band tiers, compare band packages, music options, event band features, Diamond package, VIP band, Elite band package, music pricing, event cost, DJ + live band, vocals, brass section, lighting and sound, energy-filled performance",
  openGraph: {
    title: "Band Packages & Pricing | Vibe Supply Live Entertainment",
    description: "Choose from our premium live band packages for weddings, parties, and events. Compare features and pricing to find your perfect match.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Band Packages & Pricing | Vibe Supply Live Entertainment",
    description: "Choose from our premium live band packages for weddings, parties, and events. Compare features and pricing to find your perfect match.",
  },
}

// Add revalidation
// export const revalidate = 60 // Disabled for testing

export default async function PackagesPage() {
  const data = await getPackagePageDataOptimized()
  
  if (!data.siteSettings || !data.packagePageData) {
    return <div>Error loading packages data</div>
  }

  return (
    <PackagesClientPage 
      siteSettings={data.siteSettings}
      packagePageData={data.packagePageData}
    />
  )
}
