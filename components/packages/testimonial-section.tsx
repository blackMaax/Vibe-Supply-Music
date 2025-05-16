"use client"

import { motion, type MotionProps } from "framer-motion"
import { Quote } from "lucide-react"
import Image from "next/image"
import LuxuryCard from "@/components/ui/luxury-card"
import type { HTMLAttributes } from "react"

export interface Testimonial {
  quote: string
  author: string
  event: string
  imageSrc?: string
  package?: string
}

interface TestimonialSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const sectionHeaderMotionProps: MotionProps & HTMLAttributes<HTMLDivElement> = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
    viewport: { once: true },
    className: "text-center mb-12"
  };

  const testimonialCardMotionProps = (/* index: number */): Omit<MotionProps & HTMLAttributes<HTMLDivElement>, 'key'> => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true },
    className: "h-full"
  });

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div {...sectionHeaderMotionProps}>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 gold-text">What Our Clients Say</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-6 mx-auto"></div>
          <p className="text-white/80 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what some of our happy clients have to say about their experience
            with Vibe Supply.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={`testimonial-motion-${index}`} 
              {...testimonialCardMotionProps()} 
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <LuxuryCard
                key={index}
                className="p-6 relative h-full"
                variant="default"
                cornerAccents="none"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-gold/20" />

                <div className="mb-6">
                  <p className="text-white/90 italic">{testimonial.quote}</p>
                </div>

                <div className="flex items-center">
                  {testimonial.imageSrc && (
                    <div className="mr-4 relative w-12 h-12 rounded-full overflow-hidden border border-gold/30">
                      <Image
                        src={testimonial.imageSrc || "/placeholder.svg"}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gold">{testimonial.author}</p>
                    <p className="text-white/60 text-sm">{testimonial.event}</p>
                    {testimonial.package && <p className="text-white/40 text-xs mt-1">{testimonial.package} Package</p>}
                  </div>
                </div>
              </LuxuryCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
