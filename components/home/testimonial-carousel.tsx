"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import type { TestimonialData } from "@/lib/sanity"
import Image from "next/image"
import { urlForImage } from "@/lib/sanity-image"
import { devMedia } from "@/lib/devMedia"

interface TestimonialCarouselProps {
  testimonials: TestimonialData[]
}

const TestimonialCarousel = ({ testimonials = [] }: TestimonialCarouselProps) => {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  // If no testimonials are provided, use fallback data
  const fallbackTestimonials = [
    {
      name: "Sarah & James",
      quote:
        "Vibe Supply transformed our wedding into an unforgettable celebration. Their energy was infectious and they had everyone on the dance floor all night long.",
      image: null,
    },
    {
      name: "Michael Thompson",
      quote:
        "We hired Vibe Supply for our corporate event and they were incredibly professional. Their performance was the highlight of the evening!",
      image: null,
    },
    {
      name: "Emma & David",
      quote:
        "The band was amazing! They learned our first dance song and performed it beautifully. All our guests were impressed with their talent and style.",
      image: null,
    },
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === displayTestimonials.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, displayTestimonials.length])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === displayTestimonials.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === 0 ? displayTestimonials.length - 1 : prev - 1))
  }

  // Update the getTestimonialImage function to use the band member images
  const getTestimonialImage = (index: number, testimonial: TestimonialData) => {
    if (testimonial.image && testimonial.image.asset && testimonial.image.asset._ref) {
      return urlForImage(testimonial.image).width(96).height(96).url()
    }

    // Use the appropriate placeholder based on index
    switch (index % 4) {
      case 0:
        return devMedia.testimonial1
      case 1:
        return devMedia.testimonial2
      case 2:
        return devMedia.testimonial3
      case 3:
        return devMedia.testimonial4
      default:
        return devMedia.fallbackSquare
    }
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-pink/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-gold/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-accent-purple/10 blur-xl"></div>
      </div>

      <div className="relative bg-navy/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 gold-border gold-shadow">
        <div className="absolute -top-6 -left-6 text-gold/20">
          <Quote size={80} fill="currentColor" />
        </div>

        <div className="absolute -bottom-6 -right-6 text-gold/20 transform rotate-180">
          <Quote size={80} fill="currentColor" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden gold-border">
                <Image
                  src={getTestimonialImage(current, displayTestimonials[current]) || "/placeholder.svg"}
                  alt={displayTestimonials[current].name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mb-6 flex justify-center">
              <div className="text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} fill="currentColor" className="inline-block mx-0.5" />
                ))}
              </div>
            </div>

            <blockquote className="text-xl md:text-2xl font-display italic mb-8 text-white pb-2 leading-relaxed">
              "{displayTestimonials[current].quote}"
            </blockquote>

            <div>
              <p className="font-bold text-lg gold-text pb-1">{displayTestimonials[current].name}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-1/2 -left-5 transform -translate-y-1/2">
          <button
            onClick={prev}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gold hover:text-white transition-colors duration-300 gold-border"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="absolute top-1/2 -right-5 transform -translate-y-1/2">
          <button
            onClick={next}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gold hover:text-white transition-colors duration-300 gold-border"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {displayTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false)
                  setCurrent(index)
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === current ? "bg-gold" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCarousel
