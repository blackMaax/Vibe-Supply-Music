"use client"

import HeroBanner from "@/components/home/hero-banner"
import CTASection from "@/components/home/cta-section"
import LuxuryCard from "@/components/ui/luxury-card"
import ContactFormSection from "@/components/home/contact-form-section"
import GalleryPreviewSection from "@/components/home/gallery-preview-section"
import CTASectionMobile from "@/components/home/cta-section-mobile"
import { useIsMobile } from "@/hooks/use-mobile"
import type { 
  SiteSettingsData, 
  PackageCtaSectionData, 
  ExperienceTheVibeGalleryData, 
  GalleryImageItemSanity, 
  HeroImageItem,
  ContactSectionData
} from "../../lib/queries"
import { urlForImage } from "@/lib/sanity-image"

interface HomePageClientProps {
  siteSettings: SiteSettingsData | null;
  heroImages: HeroImageItem[];
  packageCtaSection?: PackageCtaSectionData;
  experienceTheVibeGallery?: ExperienceTheVibeGalleryData;
  contactSectionData?: ContactSectionData | null;
}

export default function HomePageClient({ 
  siteSettings, 
  heroImages, 
  packageCtaSection, 
  experienceTheVibeGallery, 
  contactSectionData
}: HomePageClientProps) {
  const isMobile = useIsMobile();
  
  const heroLogoUrl = siteSettings?.logo?.asset 
    ? urlForImage(siteSettings.logo as any) 
    : null; 

  const ctaTitle = packageCtaSection?.title || "Ready to Elevate Your Event?";
  const ctaSubtitle = packageCtaSection?.subtitle || "Whether it's an intimate wedding or a large corporate function, Vibe Supply brings the energy and creates unforgettable moments through music.";
  const ctaButtonText = packageCtaSection?.buttonText || "View Packages";
  const ctaButtonLink = packageCtaSection?.buttonLink || "/packages";
  const ctaPackages = packageCtaSection?.packages || []; 

  const transformedGalleryImages = experienceTheVibeGallery?.images?.map((item: GalleryImageItemSanity) => {
    const imageAsset = item.image?.asset;
    return {
      _key: item._key,
      asset: imageAsset ? { _ref: imageAsset._ref, _id: imageAsset._id } : { _ref: '', _id: '' }, 
      alt: item.alt || "Gallery image",
      caption: item.caption || "",
      showCaption: item.showCaption === undefined ? true : item.showCaption,
    };
  }) || [];

  const contactFormImageSrc = contactSectionData?.featuredImageCard?.image
    ? urlForImage(contactSectionData.featuredImageCard.image)
    : "/placeholder-contact.jpg";

  return (
    <>
      <HeroBanner heroLogoUrl={heroLogoUrl} heroImages={heroImages} />

      {isMobile ? (
        <CTASectionMobile 
          title={ctaTitle} 
          subtitle={ctaSubtitle} 
          buttonText={ctaButtonText}
          buttonLink={ctaButtonLink}
          packages={ctaPackages}
        />
      ) : (
        <CTASection
          title={ctaTitle} 
          subtitle={ctaSubtitle}
          buttonText={ctaButtonText}
          buttonLink={ctaButtonLink}
          packages={ctaPackages}
        />
      )}

      <GalleryPreviewSection 
        images={transformedGalleryImages} 
        title={experienceTheVibeGallery?.title} 
        subtitle={experienceTheVibeGallery?.subtitle}
        performanceMode={true} 
      />
      <ContactFormSection 
        title={contactSectionData?.sectionTitle}
        subtitle={contactSectionData?.sectionSubtitle}
        imageSrc={contactFormImageSrc || "/placeholder-contact.jpg"}
        imageAlt={contactSectionData?.featuredImageCard?.imageAlt}
        featuredImageTitle={contactSectionData?.featuredImageCard?.imageTitle}
        featuredImageSubtitle={contactSectionData?.featuredImageCard?.imageSubtitle}
        contactEmail={siteSettings?.contactEmail}
        contactPhone={siteSettings?.contactPhone}
        socialLinks={siteSettings?.socialLinks}
      />
    </>
  )
} 