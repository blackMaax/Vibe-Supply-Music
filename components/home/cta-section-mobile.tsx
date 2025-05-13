"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { devMedia } from "@/lib/devMedia"
import { getImageUrl } from "@/lib/image-loader"

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

// Mobile-optimized version of the PackageCard
const MobilePackageCard = ({ name, tagline, price, features = [], isPopular = false, imageSrc }: PackageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isPopular ? 0.1 : 0.2 }}
      viewport={{ once: true }}
      className={`relative rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 group ${
        isPopular ? "transform scale-105 z-10 shadow-[0_0_25px_rgba(212,175,55,0.3)]" : "hover:shadow-lg"
      }`}
    >
      {/* Top: Image section (1/3 of card height) */}
      <div className="relative h-48 w-full">
        <Image src={imageSrc || devMedia.performance3} alt={`${name} package`} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>

        {/* Package name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3
            className={`text-xl font-bold font-display ${isPopular ? "gold-text" : "text-white"} pb-1 leading-relaxed`}
          >
            {name}
          </h3>
        </div>
      </div>

      {/* Bottom: Content section */}
      <div
        className={`relative p-5 ${
          isPopular
            ? "bg-gradient-to-br from-zinc-900/90 to-zinc-900/95 border-t border-gold"
            : "bg-gradient-to-br from-zinc-900/80 to-zinc-900/90 border-t border-white/10"
        }`}
      >
        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-0 right-0 transform -translate-y-full">
            <div className="bg-gold text-navy font-bold py-1 px-4 rounded-t-lg text-sm">MOST POPULAR</div>
          </div>
        )}

        <p className="text-gray-300 text-sm mb-2">{tagline}</p>
        <div className="mb-4">
          <span className={`text-2xl font-bold ${isPopular ? "gold-text" : "text-white"}`}>{price}</span>
          <span className="text-gray-400 text-sm ml-1">per event</span>
        </div>

        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-4"></div>

        <ul className="space-y-2 mb-5">
          {features &&
            features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check size={16} className={`mr-2 mt-0.5 ${isPopular ? "text-gold" : "text-pink"}`} />
                <span className="text-gray-300 text-xs">{feature.text}</span>
              </li>
            ))}
        </ul>

        <Link
          href="/contact"
          className={`w-full text-center py-2.5 px-4 rounded-full transition-all duration-300 ${
            isPopular
              ? "bg-gold text-navy hover:bg-gold-dark"
              : "bg-white/10 text-white hover:bg-white/20 border border-white/30"
          }`}
        >
          Book Now
        </Link>
      </div>
    </motion.div>
  )
}

interface CTASectionMobileProps {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
}

const CTASectionMobile = ({
  title = "Choose Your Perfect Package",
  subtitle = "Tailored entertainment solutions for your special event",
  buttonText = "View All Packages",
  buttonLink = "/packages",
}: CTASectionMobileProps) => {
  // Package data
  const packages = [
    {
      name: "Diamond",
      tagline: "Premium entertainment for luxury events",
      price: "£3,500",
      features: [
        { text: "Full 6-piece band with brass section" },
        { text: "Up to 3 hours of live performance" },
        { text: "Custom song requests included" },
      ],
      imageSrc: getImageUrl("performance1"),
    },
    {
      name: "VIP",
      tagline: "Our most popular comprehensive package",
      price: "£4,500",
      features: [
        { text: "Full 6-piece band with brass section" },
        { text: "Up to 4 hours of live performance" },
        { text: "DJ service between sets & after party" },
      ],
      isPopular: true,
      imageSrc: getImageUrl("performance2"),
    },
    {
      name: "Elite",
      tagline: "The ultimate luxury experience",
      price: "£6,000",
      features: [
        { text: "Full 8-piece band with string section" },
        { text: "Unlimited performance time" },
        { text: "Custom musical arrangements" },
      ],
      imageSrc: getImageUrl("performance4"),
    },
  ]

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-display gold-text mb-3">{title}</h2>
          <p className="text-white/80 max-w-md mx-auto text-sm">{subtitle}</p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent my-4 mx-auto"></div>
        </div>

        {/* Package Cards - Single column for mobile */}
        <div className="space-y-8">
          {packages.map((pkg, index) => (
            <MobilePackageCard key={index} {...pkg} />
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-10">
          <Link
            href={buttonLink}
            className="inline-block py-2.5 px-6 rounded-full bg-transparent border border-gold text-gold hover:bg-gold hover:text-navy transition-all duration-300"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASectionMobile
