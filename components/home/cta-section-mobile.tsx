"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
import LuxuryCard from "@/components/ui/luxury-card"
import type { PackageItem } from "../../sanity/lib/queries"
import { urlForImage } from "@/lib/sanity-image"
import { Button } from "@/components/ui/button"

interface MobilePackageCardProps {
  _key?: string
  name: string
  description?: string
  features?: string[]
  isPopular?: boolean
  image?: PackageItem['image']
}

// Mobile-optimized version of the PackageCard
const MobilePackageCard = ({ name, description, features = [], isPopular = false, image }: MobilePackageCardProps) => {
  // Get image URL from Sanity, ensuring it's always a string
  const resolvedImageSrc = image?.asset ? urlForImage(image) || "/placeholder.svg?height=600&width=800&text=Package" : "/placeholder.svg?height=600&width=800&text=Package"
  const imageAltText = image?.alt || `${name} package`

  return (
    <motion.div
      {...({
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: isPopular ? 0.1 : 0.2 },
        viewport: { once: true },
      } as any)}
      className={`relative rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 group ${
        isPopular 
          ? "transform scale-105 z-10 shadow-[0_0_25px_rgba(212,175,55,0.3)]" 
          : "hover:shadow-lg hover:border-gold/50 border border-transparent"
      }`}
    >
      {/* Top: Image section (1/3 of card height) */}
      <div className="relative h-48 w-full">
        {resolvedImageSrc && (
          <Image src={resolvedImageSrc} alt={imageAltText} fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>

        {/* Package name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3
            className={`text-xl font-bold font-display ${isPopular ? "gold-text" : "text-white"} pb-1 leading-relaxed`}
          >
            {name}
          </h3>
        </div>
      </div>

      {/* Bottom: Content section */}
      <div
        className={`relative p-5 ${
          isPopular
            ? "bg-gradient-to-br from-zinc-900/90 to-zinc-900/95 border-t-2 border-gold"
            : "bg-gradient-to-br from-zinc-900/80 to-zinc-900/90 border-t border-white/10"
        }`}
      >
        {/* SVG Corner Accents */}
        {!isPopular && (
          <>
            <svg
              className="absolute top-2 left-2 w-4 h-4 text-gold/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M L0,8 L0,0 L8,0" />
            </svg>
            <svg
              className="absolute top-2 right-2 w-4 h-4 text-gold/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M L16,0 L24,0 L24,8" />
            </svg>
          </>
        )}

        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-0 right-0 transform -translate-y-full">
            <div className="bg-gold text-navy font-bold py-1 px-4 rounded-t-lg text-sm">MOST POPULAR</div>
          </div>
        )}

        {description && <p className="text-gray-300 text-sm mb-2">{description}</p>}

        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-4"></div>

        <ul className="space-y-2 mb-5">
          {features &&
            features.map((featureText, index) => (
              <li key={index} className="flex items-start">
                <Check size={16} className={`mr-2 mt-0.5 ${isPopular ? "text-gold" : "text-gold/70"}`} />
                <span className="text-gray-300 text-xs">{featureText}</span>
              </li>
            ))}
        </ul>

        <div className="rainbow-border-wrapper w-full">
          <Link
            href="/contact"
            className="w-full text-center inline-block font-bold py-2.5 px-6 rounded-full text-neutral-800 bg-gradient-to-br from-gold-light via-gold to-gold-light shadow-lg hover:from-gold hover:via-gold-light hover:to-gold hover:scale-105 hover:shadow-xl hover:shadow-gold/50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

interface CTASectionMobileProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  image?: any // Sanity image asset
}

export default function CTASectionMobile({
  title = "Ready to Make Your Event Unforgettable?",
  subtitle = "Book a consultation with us today and let's create something special together.",
  ctaText = "Book a Consultation",
  ctaLink = "/contact",
  image,
}: CTASectionMobileProps) {
  // Get image URL from Sanity, ensuring it's always a string
  const imageUrl = image?.asset ? urlForImage(image) || "/placeholder.svg?height=600&width=800&text=CTA+Image" : "/placeholder.svg?height=600&width=800&text=CTA+Image"

  return (
    <section className="py-12 md:hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-base text-gray-600 mb-6">{subtitle}</p>
            <Link href={ctaLink}>
              <Button size="lg" className="w-full bg-black text-white hover:bg-gray-800">
                {ctaText}
              </Button>
            </Link>
          </div>
          <div>
            <LuxuryCard
              className="h-full"
              title="Your Event"
              imageSrc={imageUrl}
              imageAlt="Event consultation"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
