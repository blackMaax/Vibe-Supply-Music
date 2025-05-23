"use client"

import { motion, type MotionProps } from "framer-motion"
import Image from "next/image"
// import { getImageUrl } from "@/lib/static-data" // Commented out as logoToDisplay now uses a direct fallback
import Navbar from "@/components/layout/navbar"
import { urlForImage } from "@/lib/sanity-image"
import React, { type HTMLAttributes } from "react"
import LuxuryCard from "@/components/ui/luxury-card"
import type { HeroImageItem } from "../../lib/queries"

interface HeroBannerProps {
  heroLogoUrl?: string | null;
  heroImages: HeroImageItem[];
}

// Define a type for motion div props to include className explicitly if needed
// type MotionDivProps = HTMLMotionProps<"div"> & { className?: string };

export default function HeroBanner({ heroLogoUrl, heroImages }: HeroBannerProps) {
  const logoToDisplay = heroLogoUrl || "/placeholder.svg";

  // Removed explicit HTMLMotionProps type to let TypeScript infer
  const logoMotionProps = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1 },
    className: "w-full flex justify-center items-center"
  };

  // Explicitly typed props for the Navbar motion.div
  const navbarMotionWrapperProps: MotionProps & HTMLAttributes<HTMLDivElement> = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.5 },
    className: "w-full"
  };

  // Image Cards Section motion props
  const imageCardsSectionMotionProps: MotionProps & HTMLAttributes<HTMLDivElement> = {
    className: "w-full flex flex-row justify-around items-stretch gap-2 sm:gap-3 md:gap-4"
  };
  
  // Props for individual image card - transition delay is dynamic, so we handle it inside the map
  // We define common props here and merge transition inside the map for individual cards
  const individualCardBaseMotionProps: Omit<MotionProps, 'transition'> & Omit<HTMLAttributes<HTMLDivElement>, 'className'> = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  const geometricAccentMotionProps: MotionProps & HTMLAttributes<HTMLDivElement> = {
    initial: { opacity: 0, rotate: 0 },
    animate: { opacity: 0.15, rotate: 360 },
    transition: { duration: 100, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
    className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[800px] pointer-events-none"
  };

  return (
    <section className="relative overflow-hidden text-white min-h-screen flex flex-col">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0"></div>

      {/* Hero Content Container - Revised padding and spacing */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 pt-16 sm:pt-20 md:pt-24 pb-2 sm:pb-4 md:pb-6">
        <motion.div {...logoMotionProps}>
          <Image
            src={logoToDisplay}
            alt="Vibe Supply Logo"
            width={600}
            height={240}
            className="object-contain w-4/5 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            priority
          />
        </motion.div>

        {/* Navbar */}
        <motion.div {...navbarMotionWrapperProps}>
          <Navbar />
        </motion.div>

        {/* Image Cards Section */}
        <motion.div {...imageCardsSectionMotionProps}>
          {heroImages && heroImages.length > 0 ? heroImages.map((img, index) => {
            const isOuterCard = index === 0 || index === heroImages.length - 1;
            const imageUrl = urlForImage(img);

            if (!imageUrl) return null;

            // Explicitly define key and other attributes separately
            const cardKey = img.asset?._id ? `${img.asset._id}-${index}` : `hero-image-${index}`;
            const motionAttributes: MotionProps & HTMLAttributes<HTMLDivElement> = {
              ...individualCardBaseMotionProps,
              transition: { duration: 0.6, delay: 0.8 + index * 0.2 },
              className: `w-[31%] sm:w-[30%] md:w-[30%] lg:w-[31%] xl:w-[31%] aspect-[3/4] bg-black/30 rounded-lg sm:rounded-xl shadow-lg md:shadow-xl border border-gold/10 md:border-gold/20 hover:shadow-gold/20 md:hover:shadow-gold/30 transition-all duration-300 transform hover:scale-105 cursor-pointer group ${isOuterCard ? "mt-5 md:mt-6 lg:mt-8" : ""}`
            };

            return (
              <motion.div key={cardKey} {...motionAttributes}>
                <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={img.alt || `Hero Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 30vw, 31vw"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                  
                  {img.title && (
                    <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 md:top-4 md:left-4 md:right-4 text-center flex justify-center items-center">
                      <LuxuryCard 
                        className="py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 !rounded-md bg-black/50 backdrop-blur-sm border-gold/30 max-w-[90%]"
                        variant="nested"
                        floatingParticles={false} 
                        sparkleOverlay={false}
                        cornerAccents="none"
                      >
                        <h3 className="font-display gold-text text-xs sm:text-sm md:text-base lg:text-lg leading-tight shadow-md truncate">
                          {img.title}
                        </h3>
                      </LuxuryCard>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          }) : null}
        </motion.div>
      </div>

      {/* Geometric Accent - Rotating Hexagon */}
      {/* <motion.div {...geometricAccentMotionProps}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="50,3 97,25 97,75 50,97 3,75 3,25"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.5"
            strokeOpacity="0.6"
          />
          <polygon
            points="50,15 85,35 85,65 50,85 15,65 15,35"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.3"
            strokeOpacity="0.4"
          />
        </svg>
      </motion.div> */}
    </section>
  )
}
