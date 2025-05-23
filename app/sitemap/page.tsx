"use client"

import LuxuryCard from "@/components/ui/luxury-card"
import { motion, type MotionProps } from "framer-motion"
import Link from "next/link"
import { Home, Package, FileText } from "lucide-react"
import type { HTMLAttributes } from "react"
import Image from 'next/image'
import Navbar from '@/components/layout/navbar'
import { urlForImage } from "@/lib/sanity-image"
import { getSiteSettingsOptimized, SiteSettingsData } from "@/lib/queries"
import { useEffect, useState } from "react"

export default function SitemapPage() {
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

  const pageTitle = "Sitemap"
  const pageSubtitle = "Find your way around our website"

  const motionDivProps: MotionProps & HTMLAttributes<HTMLDivElement> = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
    className: "max-w-5xl mx-auto" // Kept original max-w-5xl for sitemap content
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
            <h2 className="text-3xl font-display font-bold mb-10 gold-text text-center">Website Navigation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {/* Main Pages */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-pink flex items-center">
                  <Home className="mr-2 h-5 w-5" /> Main Pages
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="text-white hover:text-gold transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-white hover:text-gold transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/packages"
                      className="text-white hover:text-gold transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                      Packages
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-white hover:text-gold transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal Pages */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-pink flex items-center">
                  <FileText className="mr-2 h-5 w-5" /> Legal Information
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/terms"
                      className="text-white hover:text-gold transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-white hover:text-gold transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="text-white hover:text-gold transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sitemap"
                      className="text-white hover:text-gold transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </LuxuryCard>
        </motion.div>
      </div>
    </main>
  )
}
