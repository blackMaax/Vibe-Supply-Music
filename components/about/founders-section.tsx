"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { getImageUrl } from "@/lib/static-data"
import LuxuryCard from "@/components/ui/luxury-card"

// Founder data
const foundersData = [
  {
    name: "James Wilson",
    role: "Creative Director & Lead Vocalist",
    bio: "With over a decade of experience in the music industry, James brings his exceptional vocal talent and creative vision to every Vibe Supply performance. His ability to connect with audiences and create unforgettable moments has been the cornerstone of our success.",
    imageSrc: "bandMember1",
  },
  {
    name: "Sarah Mitchell",
    role: "Musical Director & Lead Guitarist",
    bio: "A classically trained musician with a passion for contemporary sounds, Sarah's technical expertise and artistic sensibility ensure that every Vibe Supply performance is musically flawless. Her innovative arrangements and attention to detail elevate our offerings beyond the ordinary.",
    imageSrc: "bandMember2",
  },
]

export default function FoundersSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <LuxuryCard className="p-8 max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-gold to-pink bg-clip-text text-transparent">
                Meet the Founders
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">The visionaries behind Vibe Supply</p>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-4 mx-auto"></div>
            </div>
          </LuxuryCard>
        </motion.div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {foundersData.map((founder, index) => (
            <FounderCard
              key={index}
              name={founder.name}
              role={founder.role}
              bio={founder.bio}
              imageSrc={getImageUrl(founder.imageSrc)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Founder Card Component
interface FounderCardProps {
  name: string
  role: string
  bio: string
  imageSrc: string
  index: number
}

const FounderCard = ({ name, role, bio, imageSrc, index }: FounderCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover-lift group"
      style={{
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(212, 175, 55, 0.3)",
        boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Gold sparkle texture overlay */}
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fillOpacity='0.4'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='50' r='0.8'/%3E%3Ccircle cx='50' cy='30' r='1.2'/%3E%3Ccircle cx='70' cy='70' r='0.6'/%3E%3Ccircle cx='90' cy='20' r='1'/%3E%3Ccircle cx='20' cy='90' r='0.8'/%3E%3Ccircle cx='60' cy='10' r='0.5'/%3E%3Ccircle cx='80' cy='40' r='1.2'/%3E%3Ccircle cx='40' cy='80' r='0.9'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      ></div>

      {/* Corner accents - top right and bottom left */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M63,1 L63,20 M63,1 L44,1" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M1,63 L1,44 M1,63 L20,63" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
        </svg>
      </div>

      <div className="flex flex-col items-center text-center relative z-10">
        {/* Circular portrait with geometric spotlight halo */}
        <div className="relative mb-6">
          {/* Geometric spotlight halo */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-30"
          >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.8" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.6" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="#D4AF37" strokeWidth="0.2" strokeOpacity="0.4" />
            </svg>
          </motion.div>

          {/* Portrait */}
          <div className="w-40 h-40 rounded-full overflow-hidden relative z-10 gold-border">
            <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
        </div>

        {/* Name */}
        <h3 className="text-2xl font-bold mb-2 pb-1 leading-relaxed bg-gradient-to-r from-gold to-pink bg-clip-text text-transparent">
          {name}
        </h3>

        {/* Role */}
        <p className="text-pink text-sm font-medium mb-4 tracking-wider uppercase">{role}</p>

        {/* Decorative divider */}
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-4"></div>

        {/* Bio */}
        <p className="text-gray-300">{bio}</p>
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
        style={{
          boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
          borderRadius: "1rem",
        }}
      ></div>
    </motion.div>
  )
}
