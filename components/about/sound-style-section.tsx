"use client"

import { motion } from "framer-motion"
import { getImageUrl } from "@/lib/static-data"
import LuxuryCard from "@/components/ui/luxury-card"
import SoundStyleCard from "./sound-style-card"

// Sound style data
const soundStyleData = [
  {
    title: "Lead Vocals & Frontman",
    description: "Powerful, soulful vocals that command the room and keep guests on their feet.",
    imageSrc: "bandMember1",
  },
  {
    title: "Guitar & Harmony",
    description: "From classic rock riffs to smooth jazz chords, our guitar work layers depth and emotion.",
    imageSrc: "bandMember2",
  },
  {
    title: "Drums & Percussion",
    description: "Driving rhythms—tight snares, booming kicks, and world-beat percussion—to fuel the dance floor.",
    imageSrc: "bandMember3",
  },
  {
    title: "Bass & Keys",
    description: "Funky bass grooves and lush keyboard pads that anchor your event with warmth and groove.",
    imageSrc: "bandMember4",
  },
  {
    title: "Brass & Woodwinds",
    description: "Live brass and woodwind accents for extra punch, soul, or romantic flair.",
    imageSrc: "performance3",
  },
  {
    title: "DJ & Remixes",
    description: "Seamless DJ sets and live remix mash-ups to close the night on a high.",
    imageSrc: "performance7",
  },
]

export default function SoundStyleSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-black/40">
      <div className="container mx-auto px-4 relative z-10">
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
                Our Signature Sound & Style
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                What makes Vibe Supply the ultimate live experience
              </p>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-4 mx-auto"></div>
            </div>
          </LuxuryCard>
        </motion.div>

        {/* Sound & Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {soundStyleData.map((item, index) => (
            <SoundStyleCard
              key={index}
              title={item.title}
              description={item.description}
              imageSrc={getImageUrl(item.imageSrc) || "/placeholder.svg"}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
