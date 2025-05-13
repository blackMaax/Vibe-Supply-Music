"use client"

import PageHero from "@/components/shared/page-hero"
import LuxuryCard from "@/components/ui/luxury-card"
import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Package, FileText } from "lucide-react"

export default function SitemapPage() {
  return (
    <div className="min-h-screen">
      <PageHero title="Sitemap" subtitle="Find your way around our website" />

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <LuxuryCard>
            <h2 className="text-3xl font-display font-bold mb-10 gold-text text-center">Website Navigation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

              {/* Services */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-pink flex items-center">
                  <Package className="mr-2 h-5 w-5" /> Our Services
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/packages#diamond"
                      className="text-white hover:text-gold transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                      Diamond Package
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/packages#vip"
                      className="text-white hover:text-gold transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                      VIP Package
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/packages#elite"
                      className="text-white hover:text-gold transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                      Elite Package
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-white hover:text-gold transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                      Custom Requests
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </LuxuryCard>
        </motion.div>
      </div>
    </div>
  )
}
