"use client"

import type { ReactNode } from "react"
import LuxuryCard from "@/components/ui/luxury-card"
// import GalleryGrid from "@/components/gallery/gallery-grid" // Will be replaced
import { motion, type MotionProps } from "framer-motion"
import Image from "next/image"
import { urlForImage } from "@/lib/sanity-image" // Assuming gallery images might come from Sanity
import { getGalleryImage } from "@/lib/static-data" // Fallback for static images
import Link from "next/link"

interface GalleryImage {
  _key: string
  alt?: string
  caption?: string
  showCaption?: boolean
  asset: {
    _ref: string // For Sanity images
    // Add other fields if your static data uses a different structure
  }
  // Add 'src' if your static data provides direct src
  src?: string
  url?: string
}

interface GalleryPreviewSectionProps {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  className?: string
  images?: GalleryImage[]
  children?: ReactNode
  performanceMode?: boolean
}

const GalleryPreviewSection = ({
  title = "Experience the Vibe",
  subtitle = "Get a glimpse of our performances and the unforgettable atmosphere we create",
  buttonText = "View Full Gallery",
  buttonLink = "/gallery",
  className = "",
  images = [], // Default to empty array
  children,
  performanceMode = false, // performanceMode might not be relevant for this new layout
}: GalleryPreviewSectionProps) => {
  const titleParts = title.split(" ")
  const lastWord = titleParts.pop()
  const firstPart = titleParts.join(" ")

  // Use all images passed from Sanity, or an empty array if none
  const displayImages = images && images.length > 0 ? images : [];

  const imageCardsContainerMotionProps: MotionProps & React.HTMLAttributes<HTMLDivElement> = {
    className: "w-full flex flex-row flex-wrap justify-center items-stretch gap-y-4 sm:gap-y-6 md:gap-y-8 gap-x-2 sm:gap-x-3 md:gap-x-4 mt-8 md:mt-12" // Changed from justify-around to justify-center
  };

  const individualCardBaseMotionProps: Omit<MotionProps, 'transition'> & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className={`pt-8 pb-8 relative ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section header on card */}
        <div className="text-center mb-12 md:mb-16"> {/* Adjusted bottom margin */}
          <LuxuryCard className="max-w-3xl mx-auto py-4 px-6 md:py-5 md:px-8" variant="default" cornerAccents="none">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4 gold-text pb-1 leading-relaxed">
                {firstPart} {lastWord}
              </h2>
              <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-2 md:my-3 mx-auto"></div>
              <p className="text-white/80 max-w-xl mx-auto text-xs sm:text-sm md:text-base">{subtitle}</p>
            </div>
          </LuxuryCard>
        </div>

        {/* Gallery content - New Hero-like layout */}
        <motion.div {...imageCardsContainerMotionProps}>
          {displayImages.length === 0 && (
            <div className="text-center text-white/70 py-8 col-span-full">
              <p>No images available in the gallery at the moment. Check back soon!</p>
            </div>
          )}
          {displayImages.map((img, index) => {
            // Get image URL from Sanity
            const imageUrl = img.url || (img.asset && img.asset.url) || null;
            
            if (!imageUrl) {
              console.error("No valid image URL found for gallery image:", img);
              return null;
            }

            const cardKey = img._key || `gallery-preview-${index}`;
            const motionAttributes: MotionProps & React.HTMLAttributes<HTMLDivElement> = {
              ...individualCardBaseMotionProps,
              transition: { duration: 0.6, delay: 0.2 + index * 0.15 }, // Staggered delay
              className: `w-[31%] sm:w-[30%] aspect-[3/2] bg-black/30 rounded-lg sm:rounded-xl shadow-lg md:shadow-xl border border-gold/10 md:border-gold/20 hover:shadow-gold/20 md:hover:shadow-gold/30 transition-all duration-300 transform hover:scale-105 cursor-pointer group`
            };

            return (
              <motion.div key={cardKey} {...motionAttributes}>
                <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={img.alt || `Gallery Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  {img.caption && img.showCaption && (
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 md:bottom-4 md:left-4 md:right-4 text-center flex justify-center items-center">
                      <LuxuryCard
                        className="py-1 px-2 sm:py-1.5 sm:px-3 !rounded-md bg-black/50 backdrop-blur-sm border-gold/30 max-w-[90%]"
                        variant="nested"
                        floatingParticles={false}
                        sparkleOverlay={false}
                        cornerAccents="none"
                      >
                        <h3 className="font-display gold-text text-xs sm:text-sm md:text-base leading-tight shadow-md truncate">
                          {img.caption}
                        </h3>
                      </LuxuryCard>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {children ? (
          children
        ) : null}
      </div>
    </section>
  )
}

export default GalleryPreviewSection
