"use client"

import Image from "next/image"; // Added Image import
import LuxuryCard from "@/components/ui/luxury-card"; // Added LuxuryCard
import { motion, type MotionProps } from "framer-motion" // Added MotionProps for typing
import type { HTMLAttributes } from "react"; // Added HTMLAttributes for typing
import PackageCard from "@/components/packages/package-card"
// import PackageComparison from "@/components/packages/package-comparison" // REMOVED
import TestimonialSection from "@/components/packages/testimonial-section"
import FAQSection from "@/components/packages/faq-section"
import { packages, /* comparisonFeatures, */ packageFAQs, packageTestimonials } from "@/lib/packages-data" // REMOVED comparisonFeatures
import type { SiteSettingsData } from "@/lib/queries"; // Added SiteSettingsData import
import { urlForImage } from "@/lib/sanity-image"; // Added urlForImage import
import Navbar from "@/components/layout/navbar"; // Added Navbar import

interface PackagesClientPageProps {
  siteSettings: SiteSettingsData | null;
}

export default function PackagesClientPage({ siteSettings }: PackagesClientPageProps) {
  const pageTitle = "Our Packages";
  const pageSubtitle = "Premium entertainment packages for your special event";

  const logoToDisplay = siteSettings?.logo?.asset ? urlForImage(siteSettings.logo) : "/placeholder.svg";

  const sectionHeaderMotionProps = (delay = 0, customClassName = "text-center mb-12"): MotionProps & HTMLAttributes<HTMLDivElement> => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay },
    viewport: { once: true },
    className: customClassName
  });

  const ctaSectionMotionProps: MotionProps & HTMLAttributes<HTMLDivElement> = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
    viewport: { once: true },
    className: "max-w-3xl mx-auto"
  };

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
      
      {/* Packages Section Intro - (was motion.div for title/subtitle, now just for spacing if needed) */}
      <section className="pt-8 pb-12"> {/* Reduced vertical padding */}
        <div className="container mx-auto px-4">
          {/* This motion.div used to hold a subtitle. Now it's effectively a spacer or for future content. */}
          {/* Using sectionHeaderMotionProps with only a margin class. */}
          <motion.div {...sectionHeaderMotionProps(0, "mb-8")}> {/* Reduced bottom margin for spacer */}
            {/* Content was removed, this div is for spacing/animation consistency if items are added back */}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection testimonials={packageTestimonials} />

      {/* FAQ Section */}
      <FAQSection faqs={packageFAQs} />

      {/* CTA Section */}
      <section className="py-16 bg-black/40">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...ctaSectionMotionProps}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 gold-text">Ready to Book?</h2>
            <p className="text-white/80 mb-8">
              Contact us today to check availability for your event date and discuss your specific requirements.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gold text-black font-bold py-3 px-8 rounded-md hover:bg-gold/80 transition-colors duration-300"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
