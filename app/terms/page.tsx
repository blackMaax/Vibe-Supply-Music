"use client"

import Link from "next/link"
import LuxuryCard from "@/components/ui/luxury-card"
import { motion, type MotionProps } from "framer-motion"
import type { HTMLAttributes } from "react"
import Image from 'next/image'
import Navbar from '@/components/layout/navbar'
import { urlForImage } from "@/lib/sanity-image"
import { getSiteSettingsOptimized, SiteSettingsData } from "@/lib/queries"
import { useEffect, useState } from "react"

export default function TermsPage() {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData | null>(null)
  const [logoToDisplay, setLogoToDisplay] = useState<string>("/placeholder.svg")

  useEffect(() => {
    async function fetchData() {
      const settings = await getSiteSettingsOptimized()
      setSiteSettings(settings)
      if (settings?.logo?.asset) {
        const imageUrl = urlForImage(settings.logo)
        if (typeof imageUrl === 'string') {
          setLogoToDisplay(imageUrl)
        } else if (imageUrl && typeof (imageUrl as any).url === 'function') {
          setLogoToDisplay((imageUrl as any).url())
        }
      }
    }
    fetchData()
  }, [])

  const pageTitle = "Terms & Conditions"
  const pageSubtitle = "Please read these terms carefully before using our services"

  const motionDivProps: MotionProps & HTMLAttributes<HTMLDivElement> = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
    className: "max-w-4xl mx-auto"
  }

  return (
    <main className="pt-10 md:pt-12">
      {logoToDisplay && (
        <div className="container mx-auto px-4 mb-8 flex justify-center">
          <Image 
            src={logoToDisplay}
            alt={siteSettings?.logo?.alt || "Vibe Supply Logo"}
            width={850}
            height={340}
            className="object-contain h-52 sm:h-60 md:h-72 lg:h-80 w-auto"
            priority
          />
        </div>
      )}

      <Navbar />

      <div className="container mx-auto px-4 mt-12 md:mt-16 mb-8 md:mb-10">
        <LuxuryCard 
          className="max-w-3xl mx-auto py-4 px-6 md:py-5 md:px-8"
          variant="default" 
          cornerAccents="none"
        >
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4 gold-text pb-1 leading-relaxed">{pageTitle}</h1>
            <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-2 md:my-3 mx-auto"></div>
            {pageSubtitle && <p className="text-white/80 max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans leading-relaxed">{pageSubtitle}</p>}
          </div>
        </LuxuryCard>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <motion.div {...motionDivProps}>
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
    </main>
  )
}
