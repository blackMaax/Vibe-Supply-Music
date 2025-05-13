"use client"

import SectionDivider from "@/components/layout/section-divider"
import PageHero from "@/components/shared/page-hero"
import ContactFormSection from "@/components/home/contact-form-section"
import StorySection from "@/components/about/story-section"
import SoundStyleSection from "@/components/about/sound-style-section"
import FoundersSection from "@/components/about/founders-section"
import { getImageUrl } from "@/lib/static-data"

export default function AboutPage() {
  return (
    <>
      {/* Hero section */}
      <PageHero
        title="About Vibe Supply"
        subtitle="Elevating events with unforgettable live music experiences"
        backgroundImage="https://res.cloudinary.com/dtowd0j7j/image/upload/v1746194928/WhatsApp_Image_2025-04-20_at_22.27.19_78e42c49_mel962.jpg"
      />

      {/* Mission & Story Section */}
      <section className="relative overflow-hidden">
        {/* Section Divider at the top */}
        <div className="absolute top-0 left-0 right-0 -mt-20 z-10">
          <SectionDivider position="top" />
        </div>

        {/* Thin gold divider at the top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-gold/10 via-gold/60 to-gold/10">
          <div className="absolute inset-0 blur-sm bg-gold/30"></div>
        </div>

        <StorySection />
      </section>

      {/* Signature Sound & Style Showcase */}
      <SoundStyleSection />

      {/* Meet the Founders */}
      <FoundersSection />

      {/* Contact Form Section */}
      <ContactFormSection
        title="Book Your Event"
        subtitle="Ready to elevate your event with unforgettable music? Get in touch with us today."
        imageSrc={getImageUrl("performance5") || "/placeholder.svg"}
        imageAlt="Vibe Supply Performance"
        className="my-12 bg-black/40"
      />
    </>
  )
}
