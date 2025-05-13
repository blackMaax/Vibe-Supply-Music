"use client"

import { motion } from "framer-motion"
import LuxuryCard from "@/components/ui/luxury-card"

interface PageHeroProps {
  title: string
  subtitle?: string
  className?: string
}

export default function PageHero({ title, subtitle, className = "" }: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden text-white pt-20 mt-6 pb-10 min-h-[500px] flex items-center ${className}`}
    >
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
    </section>
  )
}
