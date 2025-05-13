"use client"
import LuxuryCard from "@/components/ui/luxury-card"
import type { LucideIcon } from "lucide-react"

interface CoreValueCardProps {
  icon: LucideIcon
  title: string
  description: string
  index: number
  className?: string
}

export default function CoreValueCard({ icon: Icon, title, description, index, className = "" }: CoreValueCardProps) {
  return (
    <LuxuryCard
      variant="core-value"
      title={title}
      description={description}
      index={index}
      icon={<Icon size={32} className="text-pink" />}
      className={`!animate-none ${className}`}
      floatingParticles={false}
      sparkleOverlay={false}
    />
  )
}
