"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface SoundStyleCardProps {
  title: string
  description: string
  imageSrc: string
  index: number
}

export default function SoundStyleCard({ title, description, imageSrc, index }: SoundStyleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative rounded-xl overflow-hidden transition-all duration-300 group hover-lift"
    >
      {/* Top: Image section */}
      <div className="relative h-[225px] w-full overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Very subtle gradient at the bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
      </div>

      {/* Bottom: Content panel */}
      <div className="relative p-6 border-t border-gold/30">
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

        {/* Corner accents */}
        <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none z-10">
          <svg width="100%" height="100%" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M1,47 L1,33 M1,47 L15,47" stroke="#D4AF37" strokeWidth="1.5" fill="none" strokeOpacity="0.8" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none z-10">
          <svg width="100%" height="100%" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M47,47 L47,33 M47,47 L33,47" stroke="#D4AF37" strokeWidth="1.5" fill="none" strokeOpacity="0.8" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-4 pb-1 leading-relaxed gold-text-enhanced">{title}</h3>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-4 relative">
            <div className="absolute inset-0 blur-sm bg-gold/30"></div>
          </div>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl"
        style={{
          boxShadow: "0 0 20px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(212, 175, 55, 0.2)",
        }}
      ></div>
    </motion.div>
  )
}
