"use client"

import { motion, type MotionProps } from "framer-motion"
// Image import will be handled by LuxuryCard
import { getImageUrl } from "@/lib/static-data"
import LuxuryCard from "@/components/ui/luxury-card"
import type { HTMLAttributes } from "react"

// Founder data
const foundersData = [
  {
    name: "James Wilson",
    role: "Creative Director & Lead Vocalist",
    bio: "With over a decade of experience in the music industry, James brings his exceptional vocal talent and creative vision to every Vibe Supply performance. His ability to connect with audiences and create unforgettable moments has been the cornerstone of our success.",
    imageSrc: "bandMember1", // Corresponds to image keys in static-data.ts
  },
  {
    name: "Sarah Mitchell",
    role: "Musical Director & Lead Guitarist",
    bio: "A classically trained musician with a passion for contemporary sounds, Sarah's technical expertise and artistic sensibility ensure that every Vibe Supply performance is musically flawless. Her innovative arrangements and attention to detail elevate our offerings beyond the ordinary.",
    imageSrc: "bandMember2", // Corresponds to image keys in static-data.ts
  },
]

// Define motion props types including className
type MotionDivProps = MotionProps & HTMLAttributes<HTMLDivElement>;

export default function FoundersSection() {
  const sectionHeaderMotionProps: MotionDivProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true },
    className: "text-center mb-16 relative",
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div {...sectionHeaderMotionProps}>
          {/* Using LuxuryCard for the section title consistent with other pages */}
          <LuxuryCard 
            variant="default" 
            cornerAccents="none" 
            sparkleOverlay={false} 
            className="max-w-3xl mx-auto py-4 px-6 md:py-5 md:px-8" // Standard title card padding
          >
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4 gold-text pb-1 leading-relaxed">
                Meet the Founders
              </h2>
              <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-2 md:my-3 mx-auto"></div>
              <p className="text-white/80 max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans leading-relaxed">
                The visionaries behind Vibe Supply
              </p>
            </div>
          </LuxuryCard>
        </motion.div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {foundersData.map((founder, index) => {
            const founderCardMotionProps: MotionDivProps = {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: index * 0.2 },
              viewport: { once: true },
              className: "h-full", // Ensure motion div takes full height for card alignment
            };
            return (
              <motion.div key={founder.name} {...founderCardMotionProps}>
                <LuxuryCard
                  variant="band-member"
                  name={founder.name}
                  role={founder.role}
                  bio={founder.bio}
                  imageSrc={getImageUrl(founder.imageSrc) || "/placeholder.svg"} // Ensure placeholder if getImageUrl returns null
                  // The band-member variant in LuxuryCard handles its own specific styling for image, text, etc.
                  // cornerAccents and sparkleOverlay will use defaults from LuxuryCard's band-member variant or overall defaults.
                  // We can explicitly set them if needed: cornerAccents="none" sparkleOverlay={false}
                  className="h-full" // Make LuxuryCard take full height of its motion container
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

// FounderCard component and its props are no longer needed and have been removed.
