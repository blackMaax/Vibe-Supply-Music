"use client"

import { motion, type MotionProps } from "framer-motion"
// Image import will be handled by LuxuryCard
import { getImageUrl } from "@/lib/static-data"
import LuxuryCard from "@/components/ui/luxury-card"
import type { HTMLAttributes } from "react"
import type { MeetTheFoundersSectionData, FounderItem } from '@/lib/queries';
import { urlForImage } from "@/lib/sanity-image";

// Founder data - REMOVE this hardcoded data
// const foundersData = [
//   {
//     name: "James Wilson",
// ... existing code ...
//   },
// ]

// Define motion props types including className
type MotionDivProps = MotionProps & HTMLAttributes<HTMLDivElement>;

// Define prop type
interface FoundersSectionProps {
  data: MeetTheFoundersSectionData;
}

export default function FoundersSection({ data }: FoundersSectionProps) {
  const sectionHeaderMotionProps: MotionDivProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true },
    className: "text-center mb-16 relative",
  };

  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div {...sectionHeaderMotionProps}>
          {/* Using LuxuryCard for the section title consistent with other pages */}
          <LuxuryCard 
            variant="default" 
            cornerAccents="none" 
            sparkleOverlay={true} 
            className="max-w-3xl mx-auto py-4 px-6 md:py-5 md:px-8" // Standard title card padding
          >
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4 gold-text pb-1 leading-relaxed">{data.title || "Meet the Founders"}</h2>
              <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-2 md:my-3 mx-auto"></div>
              {data.subtitle && <p className="text-white/80 max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans leading-relaxed">{data.subtitle}</p>}
            </div>
          </LuxuryCard>
        </motion.div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto items-stretch">
          {data.founders && data.founders.map((founder: FounderItem, index) => {
            const founderCardMotionProps: MotionDivProps = {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: index * 0.2 },
              viewport: { once: true },
              className: "h-full flex flex-col",
            };
            return (
              <motion.div key={founder.name} {...founderCardMotionProps}>
                <LuxuryCard
                  variant="band-member"
                  name={founder.name}
                  role={founder.role}
                  bio={founder.bio}
                  imageSrc={founder.image?.asset ? urlForImage(founder.image) || "/placeholder.svg" : "/placeholder.svg"}
                  cornerAccents="none"
                  className="h-full flex flex-col"
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
