"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { getImageUrl } from "@/lib/static-data"
import Navbar from "@/components/layout/navbar"

interface HeroBannerProps {
  heroLogoUrl?: string | null;
  heroImages: { asset: { _id: string; url: string }; alt?: string }[];
}

export default function HeroBanner({ heroLogoUrl, heroImages }: HeroBannerProps) {
  // Determine the logo source: dynamic prop or fallback
  const logoToDisplay = heroLogoUrl || getImageUrl("logo") || "/placeholder.svg";

  return (
    <section className="relative overflow-hidden text-white min-h-screen flex flex-col">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0"></div>

      {/* Hero Content Container - Using fixed lg padding for testing */}
      <div className="container mx-auto px-4 relative z-10 flex-grow flex flex-col items-center justify-start text-center space-y-3 md:space-y-4 lg:space-y-3 pt-[4vh] md:pt-[5vh] lg:pt-20 xl:pt-[3vh]">
        {/* Logo - Removed specific top margin */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full flex justify-center items-center"
        >
          <Image
            src={logoToDisplay}
            alt="Vibe Supply Logo"
            width={600}
            height={240}
            className="object-contain w-4/5 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            style={{
              filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.7))",
            }}
            priority
          />
        </motion.div>

        {/* Navbar - Removed specific top padding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full md:pt-0" 
        >
          <Navbar />
        </motion.div>

        {/* Image Cards Section - Adjusted margin-top for lg/xl */}
        <motion.div 
          className="w-full flex flex-row justify-around items-stretch gap-2 sm:gap-3 md:gap-4 mt-2 md:mt-3 lg:mt-2 px-0 sm:px-1"
        >
          {heroImages && heroImages.length > 0 ? heroImages.map((img, index) => {
            const isOuterCard = index === 0 || index === heroImages.length - 1;
            return (
              <motion.div
                key={img.asset._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className={`w-[31%] sm:w-[30%] md:w-[30%] lg:w-[31%] xl:w-[31%] aspect-[3/4] bg-black/30 rounded-lg sm:rounded-xl shadow-lg md:shadow-xl border border-gold/10 md:border-gold/20 hover:shadow-gold/20 md:hover:shadow-gold/30 transition-all duration-300 transform hover:scale-105 cursor-pointer group ${isOuterCard ? "mt-5 md:mt-6 lg:mt-8" : ""}`}
              >
                <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden">
                  <Image
                    src={img.asset.url}
                    alt={img.alt || `Hero Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 30vw, 31vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            )
          }) : null}
        </motion.div>
      </div>

      {/* Geometric Accent - Rotating Hexagon */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.15, rotate: 360 }}
        transition={{ duration: 100, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[800px] pointer-events-none"
      >
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
      </motion.div>
    </section>
  )
}
