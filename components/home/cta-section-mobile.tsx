"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
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
  // const titleParts = title.split(" "); // Old title splitting logic
  // let mainTitle = titleParts.slice(0, -1).join(" "); 
  // let goldPart = titleParts.slice(-1).join(" ");    
  // if (titleParts.length <=2 ) { 
  //     mainTitle = titleParts.length > 1 ? titleParts[0] : ""; 
  //     goldPart = titleParts.length > 1 ? titleParts.slice(1).join(" ") : titleParts[0]; 
  // }

  return (
    <section className="pt-12 pb-8 relative">
      <div className="container mx-auto px-4">
        {/* New Title Card Structure for Mobile */}
        <div className="text-center mb-8"> {/* Matches original CTASectionMobile bottom margin */}
          <LuxuryCard className="max-w-xl mx-auto py-3 px-4" variant="default" cornerAccents="none">
            <div className="text-center">
              <h2 className="text-2xl font-display font-bold mb-2 gold-text pb-1 leading-relaxed">
                {title}
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-2 mx-auto"></div>
              <p className="text-white/80 max-w-lg mx-auto text-xs font-sans leading-relaxed">
                {subtitle}
              </p>
            </div>
          </LuxuryCard>
        </div>
        {/* End New Title Card Structure for Mobile */}

        {/* Package Cards - Single column for mobile */}
        <div className="space-y-8">
          {packages.map((pkg) => (
            <MobilePackageCard key={pkg._key} name={pkg.name} description={pkg.tagline} features={pkg.features} image={pkg.image} isPopular={pkg.isPopular} />
          ))}
        </div>

        {/* View More Details Link */}
        <div className="text-center mt-8">
          <Link
            href="/packages"
            className="inline-flex items-center py-2 px-5 bg-gold-light/30 hover:bg-gold-light/40 border border-gold/30 hover:border-gold/50 rounded-full text-black group text-sm transition-all duration-300 shadow-md hover:shadow-lg"
          >
            To view more details about the packages,
            <span className="font-semibold mx-1 group-hover:underline">click here</span>
            <ChevronRight size={16} className="ml-0.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Button - Hiding this entire block */}
        <div className="text-center mt-6 hidden"> {/* Added hidden class */}
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
