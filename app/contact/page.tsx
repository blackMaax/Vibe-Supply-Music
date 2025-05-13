"use client"

import { motion } from "framer-motion"
import { getImageUrl } from "@/lib/static-data"
import PageHero from "@/components/shared/page-hero"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import FeaturedImage from "@/components/contact/featured-image"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        title="Contact Us"
        subtitle="Ready to elevate your event with unforgettable music? We'd love to hear from you."
      />

      <div className="container mx-auto px-4 py-20">
        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>

          {/* Right Column - Image and Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            {/* Image Card */}
            <FeaturedImage imageSrc={getImageUrl("performance5") || "/placeholder.svg?key=qta1e"} />

            {/* Contact Info Card */}
            <ContactInfo />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
