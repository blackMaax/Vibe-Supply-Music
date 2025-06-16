import Image from 'next/image'
import Navbar from '@/components/layout/navbar'
import { urlForImage } from "@/lib/sanity-image"
import { getSiteSettingsOptimized } from "@/lib/queries"
import { Metadata } from 'next'
import LuxuryCard from "@/components/ui/luxury-card"
import PrivacyContent from "./privacy-content"

// SEO metadata for Privacy page
export const metadata: Metadata = {
  title: "Privacy Policy | Vibe Supply",
  description: "Vibe Supply respects your privacy. Read how we handle your data when you book our live music services.",
  keywords: "privacy policy, event booking data, GDPR compliance, personal data protection",
  openGraph: {
    title: "Privacy Policy | Vibe Supply",
    description: "Vibe Supply respects your privacy. Read how we handle your data when you book our live music services.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Vibe Supply",
    description: "Vibe Supply respects your privacy. Read how we handle your data when you book our live music services.",
  },
}

export default async function PrivacyPage() {
  const siteSettings = await getSiteSettingsOptimized()
  const logoToDisplay = siteSettings?.logo?.asset ? urlForImage(siteSettings.logo) : "/placeholder.svg"

  return (
    <div className="min-h-screen">
      <main className="pt-10 md:pt-12">
        {logoToDisplay && (
          <div className="container mx-auto px-4 mb-8 flex justify-center">
            <Image 
              src={logoToDisplay}
              alt={siteSettings?.logo?.alt || "Vibe Supply Logo"}
              width={850}
              height={340}
              className="object-contain h-52 sm:h-60 md:h-72 lg:h-80 w-auto"
              priority
            />
          </div>
        )}

        <Navbar />

        <div className="container mx-auto px-4 mt-12 md:mt-16 mb-8 md:mb-10">
          <LuxuryCard 
            className="max-w-3xl mx-auto py-4 px-6 md:py-5 md:px-8"
            variant="default" 
            cornerAccents="none"
          >
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4 gold-text pb-1 leading-relaxed">Privacy Policy</h1>
              <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-2 md:my-3 mx-auto"></div>
              <p className="text-white/80 max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans leading-relaxed">How we collect, use, and protect your personal information</p>
            </div>
          </LuxuryCard>
        </div>

        <PrivacyContent />
      </main>
    </div>
  )
}
