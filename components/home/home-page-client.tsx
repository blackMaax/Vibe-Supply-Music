"use client"

import HeroBanner from "@/components/home/hero-banner"
import CTASection from "@/components/home/cta-section"
import { motion, type HTMLMotionProps } from "framer-motion"
import { getImageUrl } from "@/lib/static-data"
import Image from "next/image"
import LuxuryCard from "@/components/ui/luxury-card"
import ContactFormSection from "@/components/home/contact-form-section"
import GalleryPreviewSection from "@/components/home/gallery-preview-section"
import AboutSection from "@/components/home/about-section"
import CTASectionMobile from "@/components/home/cta-section-mobile"
import { useIsMobile } from "@/hooks/use-mobile"
import type { SiteSettingsData } from "../../sanity/lib/queries"
import { urlForImage as urlFor } from "@/lib/sanity-image"

interface HomePageClientProps {
  siteSettings: SiteSettingsData | null;
  heroImages: { asset: { _id: string; _ref: string } }[];
  aboutVibeSupply?: {
    title?: string;
    content?: any[];
    image?: { asset?: { _id: string; _ref: string }; imageTitle?: string; imageSubtitle?: string };
    footer?: string;
    logo?: { asset?: { _id: string; _ref: string } };
    featuresIntro?: string;
    features?: { text: string }[];
  };
  // Add other data props as needed, e.g., testimonials, galleryImages, bandMembers if fetched server-side
}

// Band member data - can be passed as prop or remain static here if not from CMS yet
const bandMembers = [
  {
    name: "James Wilson",
    role: "Lead Vocalist & Frontman",
    bio: "With over a decade of experience, James brings charisma and energy to every performance, ensuring your guests are entertained from start to finish.",
    imageSrc: getImageUrl("bandMember1"),
  },
  {
    name: "Sarah Mitchell",
    role: "Lead Guitarist & Vocals",
    bio: "A classically trained musician with a passion for rock and pop, Sarah's guitar skills and harmonies add depth and dimension to our sound.",
    imageSrc: getImageUrl("bandMember2"),
  },
  {
    name: "Michael Thompson",
    role: "Drums & Percussion",
    bio: "The heartbeat of Vibe Supply, Michael's precise rhythms and dynamic playing style keep the dance floor packed all night long.",
    imageSrc: getImageUrl("bandMember3"),
  },
];

// Placeholder for gallery images, can also be passed as prop
const galleryImages = getImageUrl("gallery") ? [{_key: '1', asset: { _ref: getImageUrl("gallery")}}] : [];

export default function HomePageClient({ siteSettings, heroImages, aboutVibeSupply }: HomePageClientProps) {
  const isMobile = useIsMobile();
  const heroLogoUrl = siteSettings?.logo ? urlFor(siteSettings.logo) : null;

  // Use fields from siteSettings if they exist, otherwise use fallbacks
  const ctaTitle = siteSettings?.defaultSeoTitle || "Ready to Elevate Your Event?";
  const ctaSubtitle = siteSettings?.defaultSeoDescription || "Whether it's an intimate wedding or a large corporate function, Vibe Supply brings the energy and creates unforgettable moments through music.";
  const ctaButtonText = "View Our Packages"; // This was not in siteSettings schema, using fallback
  // Use defaultSeoImage for CTA image, or a fallback
  const ctaImageSrc = siteSettings?.defaultSeoImage ? urlFor(siteSettings.defaultSeoImage) : "/placeholder.svg";

  // Generate URLs for AboutSection images using urlFor
  // Ensure aboutImageSrc has a definite string value for AboutSection's prop type
  const aboutImageSanityUrl = aboutVibeSupply?.image ? urlFor(aboutVibeSupply.image) : null;
  const aboutImageSrc = aboutImageSanityUrl || "/placeholder.svg"; // Ensure fallback to a string
  
  const aboutLogoUrl = aboutVibeSupply?.logo ? urlFor(aboutVibeSupply.logo) : null;

  return (
    <>
      <HeroBanner heroLogoUrl={heroLogoUrl} heroImages={heroImages} />

      <AboutSection
        imageSrc={aboutImageSrc}
        footer={aboutVibeSupply?.footer}
        logoUrl={aboutLogoUrl}
        features={aboutVibeSupply?.features?.map(f => typeof f === 'string' ? { text: f } : f)}
        featuresIntro={aboutVibeSupply?.featuresIntro}
        imageTitle={aboutVibeSupply?.image?.imageTitle}
        imageSubtitle={aboutVibeSupply?.image?.imageSubtitle}
      />

      {isMobile ? (
        <CTASectionMobile />
      ) : (
        <CTASection
          title={ctaTitle} 
          subtitle={ctaSubtitle}
          buttonText={ctaButtonText} 
          buttonLink="/packages"
          imageSrc={ctaImageSrc || getImageUrl("performance3")}
        />
      )}

      <section className="py-12 relative pt-24 -mt-1">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <LuxuryCard className="max-w-3xl mx-auto p-8" variant="default">
              <div className="text-center">
                <h2 className="section-title pb-2 leading-relaxed gold-text">Meet the Team</h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-6 mx-auto"></div>
                <p className="text-white/80 max-w-2xl mx-auto">
                  The talented musicians who bring the energy and create unforgettable moments
                </p>
              </div>
            </LuxuryCard>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              style={{ position: 'relative', height: '100%', minHeight: '600px' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="rounded-xl overflow-hidden h-full shadow-lg border border-gold/30 relative">
                <div className="absolute inset-0">
                  <Image
                    src={getImageUrl("performance11") || "/placeholder.svg"}
                    alt="Vibe Supply Band"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-2xl font-bold gold-text mb-2">Vibe Supply</h3>
                  <p className="text-white/80">Bringing energy and unforgettable performances to every event</p>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-col space-y-6">
              {bandMembers.map((member, index) => (
                <LuxuryCard
                  key={index}
                  variant="band-member"
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  imageSrc={member.imageSrc}
                  index={index}
                  className="!animate-none !h-auto py-4" 
                  floatingParticles={false} 
                  sparkleOverlay={false} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <GalleryPreviewSection images={galleryImages} buttonText="See More Photos" performanceMode={true} />
      <ContactFormSection 
        imageSrc={getImageUrl("performance5") || "/placeholder.svg?key=w8pgw"}
        contactEmail={siteSettings?.contactEmail}
        contactPhone={siteSettings?.contactPhone}
        socialLinks={siteSettings?.socialLinks}
      />
    </>
  )
} 