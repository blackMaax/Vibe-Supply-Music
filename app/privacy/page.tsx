"use client"

import Link from "next/link"
import { Shield, Lock, Eye, FileText } from "lucide-react"
import LuxuryCard from "@/components/ui/luxury-card"
import { motion, type MotionProps } from "framer-motion"
import type { HTMLAttributes } from "react"
import Image from 'next/image'
import Navbar from '@/components/layout/navbar'
import { urlForImage } from "@/lib/sanity-image"
import { getSiteSettingsOptimized, SiteSettingsData } from "@/lib/queries"
import { useEffect, useState } from "react"

export default function PrivacyPage() {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData | null>(null)
  const [logoToDisplay, setLogoToDisplay] = useState<string>("/placeholder.svg")

  useEffect(() => {
    async function fetchData() {
      const settings = await getSiteSettingsOptimized()
      setSiteSettings(settings)
      if (settings?.logo?.asset) {
        // Assuming urlForImage returns an object with a url() method.
        // If it directly returns a string, this should be: setLogoToDisplay(urlForImage(settings.logo))
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

  const pageTitle = "Privacy Policy"
  const pageSubtitle = "How we collect, use, and protect your personal information"

  const motionDivProps: MotionProps & HTMLAttributes<HTMLDivElement> = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
    className: "max-w-4xl mx-auto"
  }

  return (
    <div className="min-h-screen">
      {/* Placeholder for PageHero - will be removed/replaced */}
      {/* <PageHero title="Privacy Policy" subtitle="How we collect, use, and protect your personal information" /> */}

      <main className="pt-10 md:pt-12">
        {/* Logo */}
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

        {/* Navbar */}
        <Navbar />

        {/* Title Card for the page */}
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
            {/* Privacy highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <LuxuryCard className="text-center p-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 border border-gold/40">
                    <Shield className="text-gold h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 gold-text">Data Protection</h3>
                  <p className="text-white/80 text-sm">Your data is protected by UK and EU regulations</p>
                </div>
              </LuxuryCard>

              <LuxuryCard className="text-center p-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 border border-gold/40">
                    <Lock className="text-gold h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 gold-text">Secure Storage</h3>
                  <p className="text-white/80 text-sm">All personal data is stored securely and encrypted</p>
                </div>
              </LuxuryCard>

              <LuxuryCard className="text-center p-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 border border-gold/40">
                    <Eye className="text-gold h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 gold-text">No Tracking</h3>
                  <p className="text-white/80 text-sm">We don't use invasive tracking technologies</p>
                </div>
              </LuxuryCard>

              <LuxuryCard className="text-center p-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 border border-gold/40">
                    <FileText className="text-gold h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 gold-text">Your Rights</h3>
                  <p className="text-white/80 text-sm">Access, correct, or delete your data anytime</p>
                </div>
              </LuxuryCard>
            </div>

            <LuxuryCard>
              <div className="prose prose-lg prose-invert max-w-none">
                <h2 className="text-3xl font-display font-bold mb-6 gold-text">1. Information We Collect</h2>
                <p className="text-white/80">
                  We collect personal information that you voluntarily provide to us when you express interest in
                  obtaining information about our services, when you participate in activities on our website, or
                  otherwise when you contact us.
                </p>

                <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">2. How We Use Your Information</h2>
                <p className="text-white/80">
                  We use the information we collect to provide, maintain, and improve our services, to process your
                  bookings, to communicate with you about upcoming events, and to comply with legal obligations.
                </p>

                <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">3. Information Sharing</h2>
                <p className="text-white/80">
                  We do not sell, rent, or trade your personal information with third parties. We may share your
                  information with trusted service providers who assist us in operating our website and conducting our
                  business.
                </p>

                <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">4. Your Rights</h2>
                <p className="text-white/80">
                  You have the right to access, correct, or delete your personal information at any time. You may also
                  object to our processing of your personal data or request that we restrict the processing of your
                  personal data.
                </p>

                <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">5. Data Security</h2>
                <p className="text-white/80">
                  We have implemented appropriate technical and organizational security measures designed to protect the
                  security of any personal information we process. However, please also remember that we cannot guarantee
                  that the internet itself is 100% secure.
                </p>

                <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">6. Contact Us</h2>
                <p className="text-white/80">
                  If you have questions or comments about this policy, you may email us at privacy@vibesupply.com.
                </p>

                <div className="mt-10 pt-6 border-t border-gold/20">
                  <p className="text-white/60 text-sm">Last updated: May 7, 2025</p>
                </div>
              </div>
            </LuxuryCard>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
