"use client"

import type { ReactNode } from "react"
import LuxuryCard from "@/components/ui/luxury-card"

interface AboutCardProps {
  title: string
  description?: string
  children?: ReactNode
  imageSrc?: string
  imageAlt?: string
  actionButton?: ReactNode
  backgroundImage?: string
}

const AboutCard = ({
  title,
  description,
  children,
  imageSrc,
  imageAlt = "Vibe Supply",
  actionButton,
  backgroundImage,
}: AboutCardProps) => {
  return (
    <section className="relative">
      {/* Thin gold border at the top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-gold/10 via-gold/60 to-gold/10">
        <div className="absolute inset-0 blur-sm bg-gold/30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-16 pb-24">
        <LuxuryCard
          variant="about"
          title={title}
          description={description}
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          actionButton={actionButton}
        >
          {children}
        </LuxuryCard>
      </div>
    </section>
  )
}

export default AboutCard
