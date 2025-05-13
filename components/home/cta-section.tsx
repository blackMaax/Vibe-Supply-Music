"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { getImageUrl } from "@/lib/image-loader"
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

const PackageCard = ({ name, tagline, price, features, isPopular = false, imageSrc }: PackageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isPopular ? 0.1 : 0.2 }}
      viewport={{ once: true }}
      className={`relative rounded-xl overflow-hidden transition-all duration-300 group ${
        isPopular
          ? "transform scale-105 z-10 shadow-[0_0_25px_rgba(212,175,55,0.3)]"
          : "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
      }`}
    >
      {/* Top: Image section with no overlaid text */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imageSrc || getImageUrl("performance3")}
          alt={`${name} package`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Very subtle gradient at the bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
      </div>

      {/* Bottom: Content panel with all details */}
      <div className={`relative p-6 ${isPopular ? "border-t border-gold" : "border-t border-white/10"}`}>
        {/* Near-black translucent background */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>

        {/* Gold glitter texture overlay */}
        <div
          className="absolute inset-0 opacity-20 z-0 gold-sparkle"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fillOpacity='0.4'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='50' r='0.8'/%3E%3Ccircle cx='50' cy='30' r='1.2'/%3E%3Ccircle cx='70' cy='70' r='0.6'/%3E%3Ccircle cx='90' cy='20' r='1'/%3E%3Ccircle cx='20' cy='90' r='0.8'/%3E%3Ccircle cx='60' cy='10' r='0.5'/%3E%3Ccircle cx='80' cy='40' r='1.2'/%3E%3Ccircle cx='40' cy='80' r='0.9'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
          }}
        ></div>

        {/* Feathered fade at the top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-[50px] z-0"
          style={{
            background: "linear-gradient(to bottom, rgba(212,175,55,0.1), transparent)",
          }}
        ></div>

        {/* Gold accent line */}
        <div
          className="absolute top-[30%] right-[10%] w-[80px] h-[1px] rotate-30 opacity-20 z-0"
          style={{
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
            boxShadow: "0 0 3px #D4AF37",
          }}
        ></div>

        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-0 right-0 transform -translate-y-full z-10">
            <div className="bg-gold text-navy font-bold py-1 px-4 rounded-t-lg text-sm">MOST POPULAR</div>
          </div>
        )}

        {/* Content elements with proper z-index */}
        <div className="relative z-10">
          {/* Package name and tagline */}
          <div className="mb-4">
            <h3
              className={`text-2xl font-bold mb-1 font-display ${isPopular ? "gold-text" : "text-white"} pb-1 leading-relaxed`}
            >
              {name}
            </h3>
            <p className="text-gray-300 text-sm">{tagline}</p>
          </div>

          {/* Decorative divider */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-4"></div>

          {/* Features list */}
          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check size={18} className={`mr-2 mt-1 ${isPopular ? "text-gold" : "text-pink"}`} />
                <span className="text-gray-300 text-sm">{feature.text}</span>
              </li>
            ))}
          </ul>

          {/* Book button with increased z-index */}
          <Link
            href="/contact"
            className={`w-full text-center py-3 px-4 rounded-full transition-all duration-300 relative z-20 ${
              isPopular
                ? "bg-gold text-navy hover:bg-gold-dark font-medium"
                : "bg-white/80 text-navy hover:bg-white border border-white/30 font-medium"
            }`}
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Hover glow effect with reduced opacity */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl ${
          isPopular ? "bg-gold blur-md" : "bg-white blur-md"
        }`}
      ></div>
    </motion.div>
  )
}

interface CTASectionProps {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  imageSrc?: string
}

const CTASection = ({
  title = "Choose Your Perfect Package",
  subtitle = "Tailored entertainment solutions for your special event",
  buttonText = "View Our Packages",
  buttonLink = "/packages",
  imageSrc = "",
}: CTASectionProps) => {
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
        { text: "Professional sound engineer" },
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
        { text: "Custom first dance arrangement" },
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
        { text: "Pre-event consultation & planning" },
      ],
      imageSrc: getImageUrl("performance4"),
    },
  ]

  return (
    <section className="py-24 relative my-12 rounded-lg text-white">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header on card */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto p-8 relative"
          >
            <LuxuryCard className="p-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 gold-text pb-2 leading-relaxed">
                {title}
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-4 mx-auto"></div>
              <p className="text-white/80 max-w-2xl mx-auto">{subtitle}</p>
            </LuxuryCard>
          </motion.div>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <PackageCard key={index} {...pkg} />
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-12">
          <Link href={buttonLink} className="btn-primary gold-border hover:gold-shadow">
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection
