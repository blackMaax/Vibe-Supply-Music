"use client"

import Link from "next/link"
import { Cookie } from "lucide-react"
import LuxuryCard from "@/components/ui/luxury-card"
import { motion, type MotionProps } from "framer-motion"
import type { HTMLAttributes } from "react";
import Image from 'next/image'
import Navbar from '@/components/layout/navbar'
import { urlForImage } from "@/lib/sanity-image"
import { getSiteSettingsOptimized, SiteSettingsData } from "@/lib/queries"
import { useEffect, useState } from "react";

export default function CookiePolicyPage() {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData | null>(null);
  const [logoToDisplay, setLogoToDisplay] = useState<string>("/placeholder.svg");

  useEffect(() => {
    async function fetchData() {
      const settings = await getSiteSettingsOptimized();
      setSiteSettings(settings);
      if (settings?.logo?.asset) {
        const imageUrl = urlForImage(settings.logo);
        if (typeof imageUrl === 'string') {
          setLogoToDisplay(imageUrl);
        } else if (imageUrl && typeof (imageUrl as any).url === 'function') {
          setLogoToDisplay((imageUrl as any).url());
        }
      }
    }
    fetchData();
  }, []);

  const pageTitle = "Cookie Policy";
  const pageSubtitle = "How we use cookies and similar technologies on our website";

  const motionDivProps: MotionProps & HTMLAttributes<HTMLDivElement> = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
    className: "max-w-4xl mx-auto"
  };

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
              <h2 className="text-3xl font-display font-bold mb-6 gold-text">1. What Are Cookies</h2>
              <p className="text-white/80">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website.
                They are widely used to make websites work more efficiently and provide information to the owners of the
                site.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">2. How We Use Cookies</h2>
              <p className="text-white/80">
                We use cookies to understand how you use our website and to improve your experience. This includes
                personalizing content, providing social media features, and analyzing our traffic.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">3. Types of Cookies We Use</h2>

              <h3 className="text-xl font-bold mb-2 text-pink">Essential Cookies</h3>
              <p className="text-white/80">
                These cookies are necessary for the website to function properly. They enable basic functions like page
                navigation and access to secure areas of the website. The website cannot function properly without these
                cookies.
              </p>

              <h3 className="text-xl font-bold mb-2 mt-6 text-pink">Performance Cookies</h3>
              <p className="text-white/80">
                These cookies help us understand how visitors interact with our website by collecting and reporting
                information anonymously. They help us improve the way our website works.
              </p>

              <h3 className="text-xl font-bold mb-2 mt-6 text-pink">Functionality Cookies</h3>
              <p className="text-white/80">
                These cookies allow the website to remember choices you make (such as your username, language, or the
                region you are in) and provide enhanced, more personal features.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">4. Managing Cookies</h2>
              <p className="text-white/80">
                Most web browsers allow you to control cookies through their settings preferences. However, if you limit
                the ability of websites to set cookies, you may worsen your overall user experience, as it will no
                longer be personalized to you.
              </p>
              <p className="text-white/80 mt-4">
                We also provide a cookie banner that allows you to accept or decline non-essential cookies. Your
                preference is saved and remembered for future visits. You can change your preference at any time by
                clearing your browser's cookies and local storage.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">5. Contact Us</h2>
              <p className="text-white/80">
                If you have any questions about our use of cookies, please contact us at info@vibesupply.com.
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
