// "use client" // Converted to Server Component

import SectionDivider from "@/components/layout/section-divider"
// import PageHero from "@/components/shared/page-hero" // REMOVED
import ContactFormSection from "@/components/home/contact-form-section"
// import StorySection from "@/components/about/story-section" // REMOVED
import AboutUsSection from "@/components/about/about-us-section"
// import SoundStyleSection from "@/components/about/sound-style-section" // REMOVED
import FoundersSection from "@/components/about/founders-section"
import LuxuryCard from "@/components/ui/luxury-card"

import Image from 'next/image'
import Navbar from '@/components/layout/navbar'
import { getAboutPageDataOptimized } from "@/lib/queries"
import { urlForImage } from "@/lib/sanity-image"
import type { Metadata } from 'next'

// Force dynamic rendering - fetch fresh data on every request
export const dynamic = 'force-dynamic'

// SEO metadata for About page
export const metadata: Metadata = {
  title: "About Vibe Supply | Meet the Band Behind the Music",
  description: "Learn about Vibe Supply's story, meet our band members, and discover what makes our performances unforgettable.",
  keywords: "about Vibe Supply, professional musicians, live band team, UK event band, wedding music group, meet the band, band background, music experience, event performers, live entertainment team, vocalist, guitarist, bassist, drummer, saxophonist, professional band members, live music values, band mission, event entertainment principles, quality performance",
  openGraph: {
    title: "About Vibe Supply | Meet the Band Behind the Music",
    description: "Learn about Vibe Supply's story, meet our band members, and discover what makes our performances unforgettable.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Vibe Supply | Meet the Band Behind the Music",
    description: "Learn about Vibe Supply's story, meet our band members, and discover what makes our performances unforgettable.",
  },
}

// Add revalidation
// export const revalidate = 60 // Disabled for testing

export default async function AboutPage() {
  const data = await getAboutPageDataOptimized();

  if (!data) {
    return <div>Error loading about page data.</div>;
  }

  const { siteSettings, aboutPageData, contactSectionData } = data;
  const { aboutUsSection, meetTheFoundersSection } = aboutPageData;
  const logoToDisplay = siteSettings?.logo?.asset ? urlForImage(siteSettings.logo) : "/placeholder.svg";

  return (
    <main className="pt-10 md:pt-12">
      {/* Logo */}
      {logoToDisplay && (
        <div className="container mx-auto px-4 mb-8 flex justify-center">
          <Image 
            src={logoToDisplay}
            alt="Vibe Supply Logo"
            width={850}
            height={340}
            className="object-contain h-52 sm:h-60 md:h-72 lg:h-80 w-auto"
            priority
          />
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      {/* Mission & Story Section */}
      {aboutUsSection && (
        <section className="relative overflow-hidden mt-12 md:mt-16 pb-12 md:pb-16">
          {/* New Title Card for About Us Section */}
          <div className="container mx-auto px-4 mt-0 mb-8 md:mb-10">
            <LuxuryCard 
              className="max-w-3xl mx-auto py-4 px-6 md:py-5 md:px-8"
              variant="default" 
              cornerAccents="none"
            >
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4 gold-text pb-1 leading-relaxed">{aboutUsSection.title || "About Us"}</h1>
                <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-2 md:my-3 mx-auto"></div>
                {aboutUsSection.subtitle && <p className="text-white/80 max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans leading-relaxed">{aboutUsSection.subtitle}</p>}
              </div>
            </LuxuryCard>
          </div>

          <AboutUsSection data={aboutUsSection} />
        </section>
      )}

      {/* Signature Sound & Style Showcase - REMOVED
      <SoundStyleSection />
      */}

      {/* Meet the Founders */}
      {meetTheFoundersSection && !meetTheFoundersSection.isHidden && <FoundersSection data={meetTheFoundersSection} />}

      {/* Contact Form Section */}
      {contactSectionData && (
        <ContactFormSection
          title={contactSectionData.sectionTitle || "Get in Touch"}
          subtitle={contactSectionData.sectionSubtitle || "Ready to elevate your event? Contact us."}
          imageSrc={urlForImage(contactSectionData.featuredImageCard?.image) || "/placeholder.svg"}
          imageAlt="Contact image"
          featuredImageTitle={contactSectionData.featuredImageCard?.imageTitle}
          featuredImageSubtitle={contactSectionData.featuredImageCard?.imageSubtitle}
          contactEmail={siteSettings?.contactEmail}
          contactPhone={siteSettings?.contactPhone}
          socialLinks={siteSettings?.socialLinks}
          className=""
        />
      )}
    </main>
  )
}
