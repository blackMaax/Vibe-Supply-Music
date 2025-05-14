"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import LuxuryCard from "@/components/ui/luxury-card"
import { Check } from "lucide-react"

interface AboutSectionProps {
  imageSrc: string
  imageAlt?: string
  className?: string
  footer?: string
  logoUrl?: string | null
  features?: { text: string }[]
  featuresIntro?: string
  imageTitle?: string
  imageSubtitle?: string
}

const AboutSection = ({
  imageSrc,
  imageAlt = "Vibe Supply Performance",
  className = "",
  footer,
  logoUrl,
  features,
  featuresIntro,
  imageTitle,
  imageSubtitle,
}: AboutSectionProps) => {

  const textCardMotionProps = {
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.7 },
    viewport: { once: true },
  };

  const imageCardMotionProps = {
    initial: { opacity: 0, x: 20 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.7, delay: 0.2 },
    viewport: { once: true },
  };

  return (
    <section className={`pt-24 pb-12 relative ${className}`}>
      <div className="container mx-auto px-4">
        {/* Image and content */}
        <div className="grid gap-8 max-w-6xl mx-auto lg:grid-cols-5 items-start lg:items-stretch">
          {/* Content - spans 2 columns on lg */}
          <motion.div 
            {...(textCardMotionProps as any)} 
            className="w-full lg:col-span-2 flex flex-col h-full"
          >
            <LuxuryCard className="h-full flex flex-col">
              <div className="relative z-10 flex flex-col justify-between p-6 h-full">
                <div className="flex-grow">
                  <div className="flex justify-center mb-10">
                    {logoUrl && (
                      <span className="inline-block align-middle">
                        <Image
                          src={logoUrl}
                          alt="Vibe Supply Logo"
                          width={200}
                          height={60}
                          className="object-contain"
                        />
                      </span>
                    )}
                  </div>
                  <div className="space-y-6">
                    {featuresIntro && (
                      <p className="text-white/80">
                        {featuresIntro}
                      </p>
                    )}
                    <ul className="space-y-3">
                      {features && features.length > 0 ? features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-gold shrink-0 mt-0.5 mr-2" />
                          <span className="text-white/90 text-base">{feature.text}</span>
                        </li>
                      )) : null}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="w-24 h-0.5 bg-gradient-to-r from-gold/50 to-transparent mb-4"></div>
                  <p className="text-gold italic">{footer || "Elevating events since 2015"}</p>
                </div>
              </div>
            </LuxuryCard>
          </motion.div>

          {/* Image - spans 3 columns on lg */}
          <motion.div 
            {...(imageCardMotionProps as any)} 
            className="w-full lg:col-span-3 flex flex-col h-full"
          >
            <LuxuryCard className="h-full flex flex-col">
              <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] flex flex-col">
                <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-display font-bold gold-text mb-2">{imageTitle || "Unforgettable Experiences"}</h3>
                  <p className="text-white/80">{imageSubtitle || "Let's create magical moments for your special event"}</p>
                </div>
              </div>
            </LuxuryCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
