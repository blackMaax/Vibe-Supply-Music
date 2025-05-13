"use client"

import type { ReactNode } from "react"
import LuxuryCard from "@/components/ui/luxury-card"
import GalleryGrid from "@/components/gallery/gallery-grid"

interface GalleryPreviewSectionProps {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  className?: string
  images?: any[] // Using any[] to match GalleryGrid's expected type
  children?: ReactNode
  performanceMode?: boolean
}

const GalleryPreviewSection = ({
  title = "Experience the Vibe",
  subtitle = "Get a glimpse of our performances and the unforgettable atmosphere we create",
  buttonText = "View Full Gallery",
  buttonLink = "/gallery",
  className = "",
  images = [],
  children,
  performanceMode = false,
}: GalleryPreviewSectionProps) => {
  // Split the title to highlight the last word
  const titleParts = title.split(" ")
  const lastWord = titleParts.pop()
  const firstPart = titleParts.join(" ")

  return (
    <section className={`py-24 relative ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section header on card */}
        <div className="text-center mb-16">
          <LuxuryCard className="max-w-3xl mx-auto p-8" variant="default">
            <div className="text-center">
              <h2 className="section-title pb-2 leading-relaxed gold-text">
                {firstPart} {lastWord}
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-4 mx-auto"></div>
              <p className="text-white/80 max-w-2xl mx-auto">{subtitle}</p>
            </div>
          </LuxuryCard>
        </div>

        {/* Gallery content */}
        <LuxuryCard
          className="p-6 relative"
          variant="default"
          performanceMode={performanceMode}
          floatingParticles={!performanceMode}
          sparkleOverlay={!performanceMode}
        >
          {/* Gallery grid */}
          <div className="relative z-10">
            <GalleryGrid images={images} performanceMode={performanceMode} />
          </div>
        </LuxuryCard>

        {children ? (
          children
        ) : buttonText ? (
          <div className="text-center mt-12">
            <button
              className="bg-black text-white text-lg px-10 py-4 inline-block transition-transform duration-300 relative group overflow-hidden"
              style={{
                border: "1px solid rgba(212, 175, 55, 0.6)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2), 0 0 4px rgba(212, 175, 55, 0.3)",
                borderRadius: "9999px",
                willChange: "transform",
              }}
            >
              <span className="relative z-10">{buttonText}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/20 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default GalleryPreviewSection
