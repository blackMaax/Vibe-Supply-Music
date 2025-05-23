"use client"

import dynamic from 'next/dynamic'
import HeroBanner from "@/components/home/hero-banner"
import { useIsMobile } from "@/hooks/use-mobile"
import type {
  SiteSettingsData,
  ExperienceTheVibeGalleryData,
  GalleryImageItemSanity,
  HeroImageItem,
  ContactSectionData,
  PackageSectionData
} from "../../lib/queries"
import { urlForImage } from "@/lib/sanity-image"
import { useRef } from 'react';

// Lazy load non-critical components with optimized loading states
const CTASection = dynamic(() => import("@/components/home/cta-section"), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse rounded-lg" />,
  ssr: true // Enable SSR for better initial load
})

const CTASectionMobile = dynamic(() => import("@/components/home/cta-section-mobile"), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse rounded-lg" />,
  ssr: true
})

const ContactFormSection = dynamic(() => import("@/components/home/contact-form-section"), {
  loading: () => <div className="h-[600px] bg-black/20 animate-pulse rounded-lg" />,
  ssr: false // Disable SSR for form to reduce initial bundle size
})

const GalleryPreviewSection = dynamic(() => import("@/components/home/gallery-preview-section"), {
  loading: () => <div className="h-[400px] bg-black/20 animate-pulse rounded-lg" />,
  ssr: true
})

interface HomePageClientProps {
  siteSettings: SiteSettingsData | null;
  heroImages: HeroImageItem[];
  packageSectionRef?: PackageSectionData;
  experienceTheVibeGallery?: ExperienceTheVibeGalleryData;
  contactSectionData?: ContactSectionData | null;
}

export default function HomePageClient({
  siteSettings,
  heroImages,
  packageSectionRef,
  experienceTheVibeGallery,
  contactSectionData
}: HomePageClientProps) {
  const isMobile = useIsMobile();
  const mainRef = useRef<HTMLElement>(null);
  
  const heroLogoUrl = siteSettings?.logo?.asset 
    ? urlForImage(siteSettings.logo as any) 
    : "/placeholder.svg"; 

  const transformedGalleryImages = experienceTheVibeGallery?.images?.map((item: GalleryImageItemSanity) => {
    return {
      _key: item._key,
      asset: item.image.asset,
      alt: item.alt || "Gallery image",
      caption: item.caption || "",
      showCaption: item.showCaption === undefined ? true : item.showCaption,
      url: item.image.asset.url
    };
  }) || [];

  const contactFormImageSrc = contactSectionData?.featuredImageCard?.image
    ? urlForImage(contactSectionData.featuredImageCard.image)
    : "/placeholder-contact.jpg";

  return (
    <>
      <HeroBanner 
        heroLogoUrl={heroLogoUrl}
        heroImages={heroImages}
      />
      <main ref={mainRef}>
        {packageSectionRef && (
          <CTASection
            title="Ready to Elevate Your Event?"
            subtitle="Whether it's an intimate wedding or a large corporate function, Vibe Supply brings the energy and creates unforgettable moments through music."
            buttonText="View Packages"
            buttonLink="/packages"
            packages={packageSectionRef.packages || []}
          />
        )}
        {experienceTheVibeGallery && (
          <GalleryPreviewSection 
            images={transformedGalleryImages}
            title={experienceTheVibeGallery.title}
            subtitle={experienceTheVibeGallery.subtitle}
            performanceMode={true}
          />
        )}
        {contactSectionData && (
          <ContactFormSection
            title={contactSectionData.sectionTitle || ""}
            subtitle={contactSectionData.sectionSubtitle || ""}
            imageSrc={contactFormImageSrc || "/placeholder-contact.jpg"}
            imageAlt={contactSectionData.featuredImageCard?.imageAlt || ""}
            featuredImageTitle={contactSectionData.featuredImageCard?.imageTitle || ""}
            featuredImageSubtitle={contactSectionData.featuredImageCard?.imageSubtitle || ""}
            contactEmail={siteSettings?.contactEmail || ""}
            contactPhone={siteSettings?.contactPhone || ""}
            socialLinks={siteSettings?.socialLinks || []}
          />
        )}
      </main>
    </>
  )
} 