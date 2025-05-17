// "use client" // Converted to Server Component

import SectionDivider from "@/components/layout/section-divider"
// import PageHero from "@/components/shared/page-hero" // REMOVED
import ContactFormSection from "@/components/home/contact-form-section"
// import StorySection from "@/components/about/story-section" // REMOVED
import AboutUsSection from "@/components/about/about-us-section"
// import SoundStyleSection from "@/components/about/sound-style-section" // REMOVED
import FoundersSection from "@/components/about/founders-section"
import { getImageUrl } from "@/lib/static-data"
import LuxuryCard from "@/components/ui/luxury-card"

import Image from 'next/image'
import Navbar from '@/components/layout/navbar'
import { getSiteSettings, type SiteSettingsData, getContactSectionData, type ContactSectionData } from "@/lib/queries"
import { urlForImage } from "@/lib/sanity-image"
import type { Metadata } from 'next'

// Basic metadata, can be enhanced later
export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Vibe Supply and our mission.',
};

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();
  const logoToDisplay = siteSettings?.logo?.asset ? urlForImage(siteSettings.logo) : "/placeholder.svg";
  const contactSectionData = await getContactSectionData();

  return (
    <main className="pt-10 md:pt-12">
      {/* Logo */}
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

      {/* Navbar */}
      <Navbar />

      {/* Mission & Story Section */}
      <section className="relative overflow-hidden mt-12 md:mt-16">
        {/* New Title Card for About Us Section */}
        <div className="container mx-auto px-4 mt-0 mb-8 md:mb-10">
          <LuxuryCard 
            className="max-w-3xl mx-auto py-4 px-6 md:py-5 md:px-8" 
            variant="default" 
            cornerAccents="none"
          >
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4 gold-text pb-1 leading-relaxed">
                About Us
              </h1>
              <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-2 md:my-3 mx-auto"></div>
              <p className="text-white/80 max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans leading-relaxed">
                Discover the passion and people behind Vibe Supply.
              </p>
            </div>
          </LuxuryCard>
        </div>

        {/* Section Divider at the top */}
        {/* <div className="absolute top-0 left-0 right-0 -mt-20 z-10">
          <SectionDivider position="top" />
        </div> */}

        {/* Thin gold divider at the top */}
        {/* <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-gold/10 via-gold/60 to-gold/10">
          <div className="absolute inset-0 blur-sm bg-gold/30"></div>
        </div> */}

        <AboutUsSection />
      </section>

      {/* Signature Sound & Style Showcase - REMOVED
      <SoundStyleSection />
      */}

      {/* Meet the Founders */}
      <FoundersSection />

      {/* Contact Form Section */}
      {contactSectionData && (
        <ContactFormSection
          title={contactSectionData.sectionTitle || "Get in Touch"}
          subtitle={contactSectionData.sectionSubtitle || "Ready to elevate your event? Contact us."}
          imageSrc={urlForImage(contactSectionData.featuredImageCard?.image) || "/placeholder.svg"}
          imageAlt={contactSectionData.featuredImageCard?.imageAlt || contactSectionData.featuredImageCard?.image?.alt || "Contact image"}
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
