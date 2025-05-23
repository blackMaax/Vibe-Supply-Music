"use client"

import type React from "react"
import LuxuryCard from "@/components/ui/luxury-card"

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  index: number
}

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => {
  return (
    <LuxuryCard
      variant="core-value"
      title={title}
      description={description}
      index={index}
      icon={Icon && <Icon size={32} className="text-pink" />}
      className="text-center"
      cornerAccents="none"
      sparkleOverlay={false}
      floatingParticles={false}
    />
  )
}

export default FeatureCard
