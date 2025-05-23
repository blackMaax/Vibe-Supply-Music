"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
import LuxuryCard from "@/components/ui/luxury-card"
import type { PackageItem } from "../../sanity/lib/queries"
import { urlForImage } from "@/lib/sanity-image"
import { Button } from "@/components/ui/button"

interface PackageCardProps {
  _key?: string
  name: string
  tagline?: string
  features?: string[]
  isPopular?: boolean
  image?: PackageItem['image']
}

const PackageCard = ({ name, tagline, features = [], isPopular = false, image }: PackageCardProps) => {
  // Get image URL from Sanity, ensuring it's always a string
  const resolvedImageSrc = image?.asset ? urlForImage(image) || "/placeholder.svg?height=600&width=800&text=Package" : "/placeholder.svg?height=600&width=800&text=Package"
  const imageAltText = image?.alt || `${name} package`

  return (
    <motion.div
      {...({ /* Motion props */
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: isPopular ? 0.1 : 0.2 },
        viewport: { once: true },
      } as any)} // Cast to any here
      className={`h-full flex flex-col relative rounded-xl overflow-hidden transition-all duration-300 group ${
        isPopular
          ? "transform scale-105 z-10 shadow-[0_0_25px_rgba(212,175,55,0.3)]"
          : "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:border-gold/50 border border-transparent"
      }`}
    >
      {/* Top: Image section with no overlaid text */}
      <div className="relative h-64 w-full overflow-hidden flex-shrink-0">
        {resolvedImageSrc && (
          <Image
            src={resolvedImageSrc}
            alt={imageAltText}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Very subtle gradient at the bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
      </div>

      {/* Bottom: Content panel with all details */}
      <div className={`flex-grow flex flex-col relative p-6 ${isPopular ? "border-t-2 border-gold" : "border-t border-white/10"}`}>
        {/* Near-black translucent background */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>

        {/* Gold glitter texture overlay */}
        <div
          className="absolute inset-0 opacity-20 z-0 gold-sparkle"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fillOpacity='0.4'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='50' r='0.8'/%3E%3Ccircle cx='50' cy='30' r='1.2'/%3E%3Ccircle cx='70' cy='70' r='0.6'/%3E%3Ccircle cx='90' cy='20' r='1'/%3E%3Ccircle cx='20' cy='90' r='0.8'/%3E%3Ccircle cx='60' cy='10' r='0.5'/%3E%3Ccircle cx='80' cy='40' r='1.2'/%3E%3Ccircle cx='40' cy='80' r='0.9'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
          }}
        ></div>

        {/* Feathered fade at the top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-[50px] z-0"
          style={{
            background: "linear-gradient(to bottom, rgba(212,175,55,0.1), transparent)",
          }}
        ></div>

        {/* Gold accent line */}
        <div
          className="absolute top-[30%] right-[10%] w-[80px] h-[1px] rotate-30 opacity-20 z-0"
          style={{
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
            boxShadow: "0 0 3px #D4AF37",
          }}
        ></div>

        {/* Subtle Corner Accents - Added */}
        <div className="absolute top-3 left-3 w-4 h-4 text-gold/60 pointer-events-none z-10">
          <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 16V1H16" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="absolute top-3 right-3 w-4 h-4 text-gold/60 pointer-events-none z-10">
          <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 16V1H0" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
        {/* End Subtle Corner Accents */}

        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-0 right-0 transform -translate-y-full z-10">
            <div className="bg-gold text-navy font-bold py-1 px-4 rounded-t-lg text-sm">MOST POPULAR</div>
          </div>
        )}

        {/* Content elements with proper z-index */}
        <div className="relative z-10 flex-grow flex flex-col">
          <div className="flex-grow">
            <div className="mb-4">
              <h3
                className={`text-2xl font-bold mb-1 font-display ${isPopular ? "gold-text" : "text-white"} pb-1 leading-relaxed`}
              >
                {name}
              </h3>
              {tagline && <p className="text-gray-300 text-sm">{tagline}</p>}
            </div>

            {/* Decorative divider */}
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-4"></div>

            {/* Features list */}
            <ul className="space-y-3 mb-6">
              {features.map((featureText, index) => (
                <li key={index} className="flex items-start">
                  <Check size={18} className={`mr-2 mt-1 ${isPopular ? "text-gold" : "text-gold/70"}`} />
                  <span className="text-gray-300 text-sm">{featureText}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Book button with increased z-index */}
          <div className="rainbow-border-wrapper mt-auto w-full relative z-10">
            <Link
              href="/contact"
              className="w-full text-center inline-block font-bold py-3 px-8 rounded-full text-neutral-800 bg-gradient-to-br from-gold-light via-gold to-gold-light shadow-lg hover:from-gold hover:via-gold-light hover:to-gold hover:scale-105 hover:shadow-xl hover:shadow-gold/50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Hover glow effect with reduced opacity */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl ${
          isPopular ? "bg-gold blur-md" : "bg-white blur-md"
        }`}
      ></div>
    </motion.div>
  )
}

interface CTASectionProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  image?: any // Sanity image asset
  packages?: PackageCardProps[] // Add packages prop
}

export default function CTASection({
  title = "Ready to Make Your Event Unforgettable?",
  subtitle = "Book a consultation with us today and let's create something special together.",
  ctaText = "Book a Consultation",
  ctaLink = "/contact",
  image,
  packages = [], // Default to empty array
}: CTASectionProps) {
  // Get image URL from Sanity, ensuring it's always a string
  const imageUrl = image?.asset ? urlForImage(image) || "/placeholder.svg?height=600&width=800&text=CTA+Image" : "/placeholder.svg?height=600&width=800&text=CTA+Image"

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Title Card */}
        <LuxuryCard className="max-w-3xl mx-auto py-4 px-6 md:py-5 md:px-8 mb-12" variant="default" cornerAccents="none">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4 gold-text pb-1 leading-relaxed">{title}</h2>
            <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-2 md:my-3 mx-auto"></div>
            <p className="text-white/80 max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans leading-relaxed">{subtitle}</p>
          </div>
        </LuxuryCard>
        {packages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {packages.map((pkg, idx) => (
              <PackageCard key={pkg._key || idx} {...pkg} />
            ))}
          </div>
        )}
        {/* Gold-tinted, rounded link for more details */}
        <div className="flex justify-center mb-8">
          <Link href="/packages" className="inline-flex items-center px-6 py-3 rounded-full bg-gold/10 hover:bg-gold/30 text-black font-medium shadow-md transition-all duration-200 border border-gold/40 backdrop-blur-md">
            <span className="mr-2">To view more details about the packages, <span className="font-bold">click here</span></span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
