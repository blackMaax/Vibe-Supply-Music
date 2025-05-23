"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { devMedia } from "@/lib/devMedia"
import LuxuryCard from "@/components/ui/luxury-card"

interface PackageFeature {
  text: string
}

interface PackageCardProps {
  name: string
  tagline: string
  price: string
  features: PackageFeature[]
  isPopular?: boolean
  imageSrc?: string
}

// Responsive Package Card that switches between layouts based on screen size
const ResponsivePackageCard = (props: PackageCardProps) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // Initial check
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Convert features array from objects to strings
  const featureStrings = props.features.map((feature) => feature.text)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: props.isPopular ? 0.1 : 0.2 }}
      viewport={{ once: true }}
    >
      <LuxuryCard
        variant="package"
        title={props.name}
        subtitle={props.tagline}
        price={props.price}
        features={featureStrings}
        isHighlighted={props.isPopular}
        imageSrc={props.imageSrc || devMedia.performance3}
        actionLink="/contact"
        actionText="Book Now"
        className={isMobile ? "mobile-package-card" : "desktop-package-card"}
      />
    </motion.div>
  )
}

export default ResponsivePackageCard
