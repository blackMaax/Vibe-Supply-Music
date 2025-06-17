"use client"

import Image from "next/image"; // Added Image import
import LuxuryCard from "@/components/ui/luxury-card"; // Added LuxuryCard
import { motion, type MotionProps } from "framer-motion" // Added MotionProps for typing
import type { HTMLAttributes } from "react"; // Added HTMLAttributes for typing
import PackageCard from "@/components/packages/package-card"
// import PackageComparison from "@/components/packages/package-comparison" // REMOVED
import FAQSection from "@/components/packages/faq-section"
import { SiteSettingsData, PackagePageData } from "@/lib/queries"; // Import getPackagePageData
import { urlForImage } from "@/lib/sanity-image"; // Added urlForImage import
import Navbar from "@/components/layout/navbar"; // Added Navbar import
import CTASection from "@/components/home/cta-section";
import CTASectionMobile from "@/components/home/cta-section-mobile";
import { useIsMobile } from "@/hooks/use-mobile"; // Import useIsMobile hook

interface PackagesClientPageProps {
  siteSettings: SiteSettingsData | null;
  packagePageData: PackagePageData | null;
}

export default function PackagesClientPage({ 
  siteSettings, 
  packagePageData 
}: PackagesClientPageProps) {
  // Extract data from the referenced package section
  const packagesData = packagePageData?.packageSectionRef?.packages || [];
  const faqData = packagePageData?.faqSection?.faqs || [];



  const pageTitle = packagePageData?.title || "Our Packages";
  const pageSubtitle = packagePageData?.subtitle || "Premium entertainment packages for your special event";
  const ratesConsultationData = packagePageData?.ratesAndConsultationSection;

  const logoToDisplay = siteSettings?.logo?.asset ? urlForImage(siteSettings.logo) : "/placeholder.svg";

  const sectionHeaderMotionProps = (delay = 0, customClassName = "text-center mb-12"): MotionProps & HTMLAttributes<HTMLDivElement> => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay },
    viewport: { once: true },
    className: customClassName
  });

  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen pt-6 pb-12"> {/* Adjusted top padding */}
      {/* Logo */}
      {logoToDisplay && (
        <div className="container mx-auto px-4 mb-6 sm:mb-7 md:mb-8 flex justify-center"> {/* Reduced bottom margin */}
          <Image 
            src={logoToDisplay}
            alt={siteSettings?.logo?.alt || "Vibe Supply Logo"}
            width={850} // Further increased width
            height={340} // Further increased height
            className="object-contain h-52 sm:h-60 md:h-72 lg:h-80 w-auto" // Further adjusted responsive height
            priority
          />
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      {/* New Title Card for Packages Page */}
      <div className="container mx-auto px-4 mt-12 mb-16"> {/* Adjusted margins */}
        <LuxuryCard 
          className="max-w-3xl mx-auto py-4 px-6 md:py-5 md:px-8" 
          variant="default" 
          cornerAccents="none"
        >
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4 gold-text pb-1 leading-relaxed">
              {pageTitle}
            </h1>
            <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-2 md:my-3 mx-auto"></div>
            <p className="text-white/80 max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans leading-relaxed">
              {pageSubtitle}
            </p>
          </div>
        </LuxuryCard>
      </div>
      
      {/* Packages Section */}
      <section className="pb-12"> {/* Removed pt-8 */}
        <div className="container mx-auto px-4">
          {/* This motion.div used to hold a subtitle. Now it's effectively a spacer or for future content. */}
          {/* Using sectionHeaderMotionProps with only a margin class. */}
          <motion.div {...sectionHeaderMotionProps(0, "mb-8")}> {/* Reduced bottom margin for spacer */}
            {/* Content was removed, this div is for spacing/animation consistency if items are added back */}
          </motion.div>

          {/* Render packages using fetched data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packagesData.map((pkg) => (
              <PackageCard 
                key={pkg._key} 
                id={pkg._key} // Using _key as id
                name={pkg.name}
                description={pkg.tagline || ''} // Using tagline as description
                features={(pkg.features || []).map(feature => ({ text: feature }))}
                imageSrc={pkg.image ? urlForImage(pkg.image) || '/placeholder.svg' : '/placeholder.svg'} // Handle optional image
                popular={pkg.isPopular}
                price={pkg.price}
                // ctaText and ctaLink can come from a higher level CTA section if needed
              />
            ))}
          </div>
        </div>
      </section>

      {/* Rates & Consultation Section */}
      {ratesConsultationData && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
              {/* Text Card */}
              <LuxuryCard 
                variant="default" 
                cornerAccents="none" 
                className="h-full p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="text-center md:text-left">
                    {ratesConsultationData.title && (
                      <h2 className="text-3xl font-display font-bold gold-text mb-2">
                        {ratesConsultationData.title}
                      </h2>
                    )}
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/70 to-transparent mt-2 mb-4 md:mx-0 mx-auto relative">
                      <div className="absolute inset-0 blur-sm bg-gold/30"></div>
                    </div>
                    {ratesConsultationData.content && (
                      <p className="text-white/80">
                        {ratesConsultationData.content}
                      </p>
                    )}
                  </div>
                </div>
              </LuxuryCard>
              {/* Image Card */}
              {ratesConsultationData.image && (
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden gold-border">
                  <Image
                    src={urlForImage(ratesConsultationData.image) || "/placeholder.jpg"}
                    alt={ratesConsultationData.image.alt || "Rates & Consultation"}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl"
                    style={{
                      boxShadow: "inset 0 0 15px rgba(212, 175, 55, 0.3)",
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqData.length > 0 && (
        <FAQSection 
          title={packagePageData?.faqSection?.title}
          subtitle={packagePageData?.faqSection?.subtitle}
          faqs={faqData.map(faq => ({
            question: faq.question,
            answer: faq.answer,
            image: faq.image ? urlForImage(faq.image) || undefined : undefined,
            imagePosition: faq.imagePosition
          }))}
        />
      )}
    </div>
  )
}
