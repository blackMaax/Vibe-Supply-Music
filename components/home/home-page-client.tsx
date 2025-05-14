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
import type { SiteSettingsData, PackageCtaSectionData, MeetTheTeamSectionData, BandMemberData as SanityBandMemberData, SanityImageReference } from "../../sanity/lib/queries"
import { urlForImage } from "@/lib/sanity-image"

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
  packageCtaSection?: PackageCtaSectionData;
  meetTheTeamSection?: MeetTheTeamSectionData;
  // Add other data props as needed, e.g., testimonials, galleryImages, bandMembers if fetched server-side
}

// Band member data - will be removed as it comes from props now
// const bandMembers = [
//   {
//     name: "James Wilson",
//     role: "Lead Vocalist & Frontman",
//     bio: "With over a decade of experience, James brings charisma and energy to every performance, ensuring your guests are entertained from start to finish.",
//     imageSrc: getImageUrl("bandMember1"), // This will change to urlFor
//   },
//   {
//     name: "Sarah Mitchell",
//     role: "Lead Guitarist & Vocals",
//     bio: "A classically trained musician with a passion for rock and pop, Sarah's guitar skills and harmonies add depth and dimension to our sound.",
//     imageSrc: getImageUrl("bandMember2"),
//   },
//   {
//     name: "Michael Thompson",
//     role: "Drums & Percussion",
//     bio: "The heartbeat of Vibe Supply, Michael's precise rhythms and dynamic playing style keep the dance floor packed all night long.",
//     imageSrc: getImageUrl("bandMember3"),
//   },
// ];

// Placeholder for gallery images, can also be passed as prop
const galleryImages: any[] = [];

export default function HomePageClient({ siteSettings, heroImages, aboutVibeSupply, packageCtaSection, meetTheTeamSection }: HomePageClientProps) {
  const isMobile = useIsMobile();
  
  const heroLogoUrl = siteSettings?.logo?.asset 
    ? urlForImage(siteSettings.logo as SanityImageReference) 
    : null; 

  const ctaTitle = packageCtaSection?.title || "Ready to Elevate Your Event?";
  const ctaSubtitle = packageCtaSection?.subtitle || "Whether it's an intimate wedding or a large corporate function, Vibe Supply brings the energy and creates unforgettable moments through music.";
  const ctaButtonText = packageCtaSection?.buttonText || "View Our Packages";
  const ctaButtonLink = packageCtaSection?.buttonLink || "/packages";
  const ctaPackages = packageCtaSection?.packages || []; 

  let ctaSectionImageSrc: string;
  if (siteSettings?.defaultSeoImage?.asset) {
    const imgUrl = urlForImage(siteSettings.defaultSeoImage as SanityImageReference);
    ctaSectionImageSrc = imgUrl || "/placeholder.svg";
  } else {
    ctaSectionImageSrc = "/placeholder.svg";
  }

  const aboutImageSanityAsset = aboutVibeSupply?.image?.asset;
  const aboutImageSrc = aboutImageSanityAsset && aboutVibeSupply?.image
    ? (urlForImage(aboutVibeSupply.image as SanityImageReference) || "/placeholder.svg")
    : "/placeholder.svg";
  const aboutLogoUrl = aboutVibeSupply?.logo?.asset && aboutVibeSupply?.logo
    ? (urlForImage(aboutVibeSupply.logo as SanityImageReference))
    : null;

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

      <section className="py-12 relative pt-24 -mt-1">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <LuxuryCard className="max-w-3xl mx-auto p-8" variant="default">
              <div className="text-center">
                <h2 className="section-title pb-2 leading-relaxed gold-text">
                  {meetTheTeamSection?.title || "Meet the Team"}
                </h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-6 mx-auto"></div>
                <p className="text-white/80 max-w-2xl mx-auto">
                  {meetTheTeamSection?.subtitle || "The talented musicians who bring the energy and create unforgettable moments"}
                </p>
              </div>
            </LuxuryCard>
          </div>
          {/* Main grid for image and member cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12 items-start">
            {/* Left Column: Large Decorative Image - Wrapped for hover effects */}
            {(() => {
              const MotionDiv: any = motion.div; 
              const imageMotionProps = {
                initial: { opacity: 0, x: -20 },
                whileInView: { opacity: 1, x: 0 },
                whileHover: { scale: 1.03 },
                transition: { duration: 0.7, delay: 0.1 },
                viewport: { once: true },
              };
              const mainImageSrc = meetTheTeamSection?.mainImage?.asset 
                ? urlForImage(meetTheTeamSection.mainImage)
                : "/placeholder.svg";
              const mainImageAlt = meetTheTeamSection?.mainImage?.alt || "Vibe Supply Team Performance";

              return (
                <MotionDiv 
                  {...imageMotionProps}
                  className="group relative rainbow-border-image-hover rounded-xl h-full overflow-hidden"
                >
                  <div className="h-full rounded-xl overflow-hidden"> 
                    <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full">
                      <Image
                        src={mainImageSrc || "/placeholder.svg"}
                        alt={mainImageAlt}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </MotionDiv>
              );
            })()}

            {/* Right Column: Grid of Band Member Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
              {(meetTheTeamSection?.bandMembers && meetTheTeamSection.bandMembers.length > 0 ? meetTheTeamSection.bandMembers : []).map((member: SanityBandMemberData, index: number) => {
                const isLastItem = index === (meetTheTeamSection?.bandMembers?.length || 0) - 1;
                const isOddNumberOfItems = (meetTheTeamSection?.bandMembers?.length || 0) % 2 !== 0;
                
                let conditionalClasses = "";
                if (isLastItem && isOddNumberOfItems) {
                  conditionalClasses = "sm:col-span-2 mx-auto";
                }
                const memberImageSrc = member.image?.asset 
                  ? urlForImage(member.image)
                  : "/placeholder.svg";

                return (
                  <LuxuryCard
                    key={member._key || index}
                    variant="band-member"
                    name={member.name || "Band Member"}
                    role={member.role || "Musician"}
                    bio={member.bio || "Bio pending..."}
                    imageSrc={memberImageSrc || "/placeholder.svg"}
                    index={index}
                    className={`h-full ${conditionalClasses}`.trim()}
                    floatingParticles={false}
                    sparkleOverlay={false}
                  />
                );
              })}
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