"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { devMedia } from "@/lib/devMedia"
import { getImageUrl } from "@/lib/image-loader"
import LuxuryCard from "@/components/ui/luxury-card"
import type { PackageItem } from "../../sanity/lib/queries"
import { urlForImage as urlFor } from "@/lib/sanity-image"

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
  const resolvedImageSrc = (image && image.asset ? urlFor(image as any) : null) || devMedia.performance3
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
  buttonText?: string
  buttonLink?: string
  packages?: PackageItem[]
}

const CTASectionMobile = ({
  title = "Choose Your Perfect Package",
  subtitle = "Tailored entertainment solutions for your special event",
  buttonText = "View All Packages",
  buttonLink = "/packages",
  packages = [],
}: CTASectionMobileProps) => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        {/* Section header - NOW WRAPPED IN LUXURYCARD */}
        <div className="text-center mb-10">
          <LuxuryCard className="p-6 md:p-8" floatingParticles={false} sparkleOverlay={false}>
            <h2 className="text-3xl font-bold font-display gold-text mb-3">{title}</h2>
            <p className="text-white/80 max-w-md mx-auto text-sm">{subtitle}</p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent my-4 mx-auto"></div>
          </LuxuryCard>
        </div>

        {/* Package Cards - Single column for mobile */}
        <div className="space-y-8">
          {packages.map((pkg) => (
            <MobilePackageCard key={pkg._key} name={pkg.name} description={pkg.tagline} features={pkg.features} image={pkg.image} isPopular={pkg.isPopular} />
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-10">
          <Link
            href={buttonLink || "/packages"}
            className="inline-block py-2.5 px-6 rounded-full bg-transparent border border-gold text-gold hover:bg-gold hover:text-navy transition-all duration-300"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASectionMobile
