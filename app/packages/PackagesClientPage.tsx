"use client"

import PageHero from "@/components/shared/page-hero"
import { motion } from "framer-motion"
import PackageCard from "@/components/packages/package-card"
import PackageComparison from "@/components/packages/package-comparison"
import TestimonialSection from "@/components/packages/testimonial-section"
import FAQSection from "@/components/packages/faq-section"
import { packages, comparisonFeatures, packageFAQs, packageTestimonials } from "@/lib/packages-data"

export default function PackagesClientPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        title="Our Packages"
        subtitle="Premium entertainment packages for your special event"
        backgroundImage="https://res.cloudinary.com/dtowd0j7j/image/upload/v1746194928/WhatsApp_Image_2025-04-20_at_22.27.19_78e42c49_mel962.jpg"
        showDivider={true}
      />

      {/* Packages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 gold-text">Choose Your Experience</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-6 mx-auto"></div>
            <p className="text-white/80 max-w-2xl mx-auto">
              Select the perfect entertainment package for your event. All packages include professional musicians,
              high-quality sound equipment, and personalized service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Package Comparison Section */}
      <section className="py-16 bg-black/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 gold-text">Package Comparison</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-6 mx-auto"></div>
            <p className="text-white/80 max-w-2xl mx-auto">
              Compare our packages to find the perfect fit for your event needs and budget.
            </p>
          </motion.div>

          <PackageComparison features={comparisonFeatures} />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection testimonials={packageTestimonials} />

      {/* FAQ Section */}
      <FAQSection faqs={packageFAQs} />

      {/* CTA Section */}
      <section className="py-16 bg-black/40">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
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
