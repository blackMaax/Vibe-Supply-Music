"use client"

import { motion, type MotionProps } from "framer-motion"
import type { HTMLAttributes } from "react"
import { Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import LuxuryCard from "@/components/ui/luxury-card"

export interface PackageFeature {
  text: string
  highlighted?: boolean
}

export interface PackageProps {
  id: string
  name: string
  description: string
  features: PackageFeature[]
  imageSrc: string
  popular?: boolean
  ctaText?: string
  ctaLink?: string
}

export default function PackageCard({
  id,
  name,
  description,
  features,
  imageSrc,
  popular = false,
  ctaText = "Book Now",
  ctaLink = "/contact",
}: PackageProps) {
  const cardAssemblyMotionProps: MotionProps & HTMLAttributes<HTMLDivElement> = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.1 },
    viewport: { once: true },
    className: "flex flex-col h-full",
  }

  return (
    <motion.div {...cardAssemblyMotionProps}>
      <div className="relative h-56 w-full overflow-hidden rounded-t-xl shadow-lg z-10">
        <Image 
          src={imageSrc || "/placeholder.svg"} 
          alt={name} 
          fill 
          className="object-cover"
        />
        {popular && (
          <div className="absolute top-3 right-3 bg-gold text-black font-bold py-1 px-3 rounded-md z-20 text-xs shadow-md">
            Most Popular
          </div>
        )}
      </div>

      <LuxuryCard 
        className={`relative flex flex-col flex-grow h-full ${popular ? "border-gold" : "border-gold/30"} rounded-t-none shadow-lg`}
        variant="default" 
        cornerAccents="none"
      >
        <div className="p-6 flex flex-col flex-grow h-full">
          <h3 className={`text-2xl font-bold mb-3 ${popular ? "text-gold" : "text-white"}`}>{name}</h3>
          
          <div className="mb-5">
            <p className="text-white/70 text-sm">{description}</p>
          </div>

          <ul className="space-y-2 mb-6 flex-grow">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-gold shrink-0 mt-0.5 mr-2" />
                <span className={`${feature.highlighted ? "text-gold font-medium" : "text-white/80"} text-sm`}>{feature.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <Link
              href={ctaLink}
              className={`block text-center py-3 px-6 rounded-md transition-all duration-300 font-medium text-sm
                ${
                  popular
                    ? "bg-gold text-black hover:bg-gold/80 shadow-md hover:shadow-gold/50"
                    : "bg-white/10 text-white border border-gold/30 hover:bg-gold/20 hover:border-gold/60"
                }`}
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </LuxuryCard>
    </motion.div>
  )
}
