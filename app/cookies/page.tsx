"use client"

import PageHero from "@/components/shared/page-hero"
import Link from "next/link"
import { ChevronLeft, Cookie } from "lucide-react"
import LuxuryCard from "@/components/ui/luxury-card"
import { motion } from "framer-motion"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <PageHero title="Cookie Policy" subtitle="How we use cookies and similar technologies on our website" />

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
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
    </div>
  )
}
