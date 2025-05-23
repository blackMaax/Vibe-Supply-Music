"use client"

import type React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import SectionDivider from "@/components/layout/section-divider"
import { urlForImage } from "@/lib/sanity-image"
import LuxuryCard from "@/components/ui/luxury-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  backgroundImageAsset?: any // Sanity image asset
  showDivider?: boolean
  className?: string
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  backgroundImageAsset,
  showDivider = true,
  className = "",
}: PageHeroProps) {
  // Get image URL from Sanity or use provided backgroundImage
  const imageUrl = backgroundImageAsset ? urlForImage(backgroundImageAsset) : backgroundImage

  return (
    <section
      className={`relative overflow-hidden text-white pt-32 mt-24 pb-32 min-h-[600px] flex items-center ${className}`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl || "/placeholder.svg?height=600&width=1200&text=Hero+Image"}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Gold line patterns */}
        <div className="absolute inset-0 opacity-20">
          {/* Diagonal gold beam */}
          <div
            className="absolute top-[20%] right-[15%] w-[300px] h-[1px] rotate-45 opacity-60"
            style={{
              background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
              boxShadow: "0 0 8px #D4AF37",
            }}
          ></div>

          {/* Bottom left diagonal beam */}
          <div
            className="absolute bottom-[30%] left-[10%] w-[400px] h-[1px] -rotate-30 opacity-40"
            style={{
              background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
              boxShadow: "0 0 5px #D4AF37",
            }}
          ></div>

          {/* Middle vertical beam */}
          <div
            className="absolute top-[40%] left-[50%] w-[1px] h-[300px] opacity-30"
            style={{
              background: "linear-gradient(180deg, transparent, #D4AF37, transparent)",
              boxShadow: "0 0 6px #D4AF37",
            }}
          ></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10 w-full">
        <LuxuryCard
          className="max-w-4xl mx-auto py-12"
          cornerAccents="all"
          gradientOverlay={true}
          sparkleOverlay={true}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative"
          >
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 gold-text text-shadow-gold pb-2 leading-relaxed">
              {title}
            </h1>
            {subtitle && <p className="text-xl text-white max-w-3xl mx-auto">{subtitle}</p>}
          </motion.div>
        </LuxuryCard>
      </div>

      {/* Geometric Accent - Rotating Hexagon */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.15, rotate: 360 }}
        transition={{ duration: 100, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
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

      {/* Add a more prominent gold border at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/20 via-gold/80 to-gold/20 z-30">
        <div className="absolute inset-0 blur-sm bg-gold/50"></div>
      </div>

      {/* Wave Divider */}
      {showDivider && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <SectionDivider />
        </div>
      )}
    </section>
  )
}
