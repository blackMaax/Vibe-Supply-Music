"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export interface PackageFeature {
  text: string
  highlighted?: boolean
}

export interface PackageProps {
  id: string
  name: string
  price: string
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
  price,
  description,
  features,
  imageSrc,
  popular = false,
  ctaText = "Book Now",
  ctaLink = "/contact",
}: PackageProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div
        className={`rounded-xl overflow-hidden border ${
          popular ? "border-gold" : "border-gold/30"
        } bg-gradient-to-b from-zinc-900/90 to-black shadow-xl`}
      >
        {popular && (
          <div className="absolute top-0 right-0 bg-gold text-black font-bold py-1 px-4 rounded-bl-lg z-10">
            Most Popular
          </div>
        )}

        {/* Package image */}
        <div className="relative h-48 w-full">
          <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className={`text-2xl font-bold ${popular ? "text-gold" : "text-white"}`}>{name}</h3>
          </div>
        </div>

        <div className="p-6">
          {/* Price */}
          <div className="mb-4">
            <p className="text-3xl font-bold gold-text">{price}</p>
            <p className="text-white/70 text-sm">{description}</p>
          </div>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-gold shrink-0 mt-0.5 mr-2" />
                <span className={feature.highlighted ? "text-gold font-medium" : "text-white/80"}>{feature.text}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link
            href={ctaLink}
            className={`block text-center py-3 px-6 rounded-md transition-all duration-300 ${
              popular
                ? "bg-gold text-black hover:bg-gold/80"
                : "bg-white/10 text-white border border-gold/30 hover:bg-gold/20"
            }`}
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
