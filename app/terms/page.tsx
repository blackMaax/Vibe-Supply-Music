"use client"

import PageHero from "@/components/shared/page-hero"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import LuxuryCard from "@/components/ui/luxury-card"
import { motion } from "framer-motion"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <PageHero title="Terms & Conditions" subtitle="Please read these terms carefully before using our services" />

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <LuxuryCard>
            <div className="prose prose-lg prose-invert max-w-none">
              <h2 className="text-3xl font-display font-bold mb-6 gold-text">1. Introduction</h2>
              <p className="text-white/80">
                Welcome to Vibe Supply. These Terms and Conditions govern your use of our services and website. By
                accessing our services, you agree to be bound by these Terms.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">2. Booking Process</h2>
              <p className="text-white/80">
                All bookings are subject to availability and confirmation. A 50% deposit is required to secure your
                booking date, with the remaining balance due 14 days prior to the event.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">3. Cancellation Policy</h2>
              <p className="text-white/80">
                Cancellations must be made in writing. Deposits are non-refundable for cancellations made within 90 days
                of the event date. For cancellations made earlier, a 50% refund of the deposit will be issued.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">4. Performance Details</h2>
              <p className="text-white/80">
                Vibe Supply will provide the agreed services as outlined in your booking confirmation. Any changes to
                the performance requirements must be agreed in writing at least 14 days before the event.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">5. Technical Requirements</h2>
              <p className="text-white/80">
                The client is responsible for providing adequate space, power supply, and access for setup as specified
                in our technical rider. Failure to meet these requirements may affect the performance quality.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">6. Force Majeure</h2>
              <p className="text-white/80">
                Vibe Supply shall not be liable for any failure to perform due to causes beyond its reasonable control,
                including but not limited to acts of God, war, pandemic, or severe illness of band members.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">7. Contact Us</h2>
              <p className="text-white/80">
                If you have any questions about these Terms and Conditions, please contact us at info@vibesupply.com.
              </p>

              <div className="mt-10 pt-6 border-t border-gold/20">
                <p className="text-white/60 text-sm">Last updated: May 7, 2025</p>
              </div>
            </div>
          </LuxuryCard>
        </motion.div>
      </div>
    </div>
  )
}
