"use client"

import { motion, type MotionProps } from "framer-motion"
import Image from "next/image"

import type { HTMLAttributes } from "react"
import LuxuryCard from "@/components/ui/luxury-card"
import { urlForImage } from "@/lib/sanity-image"
import type { AboutUsSectionData, KeyPointItem, ParagraphItem } from '@/lib/queries';

// Define motion props types including className
type MotionDivProps = MotionProps & HTMLAttributes<HTMLDivElement>; // Keep this type for clarity

// Define prop type
interface AboutUsSectionProps {
  data: AboutUsSectionData;
}

export default function AboutUsSection({ data }: AboutUsSectionProps) {
  // Define base class names separately
  const leftColumnBaseClass = "relative h-full";
  const rightColumnBaseClass = "relative h-full";

  const leftColumnMotionProps: MotionProps = {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.8 },
    viewport: { once: true },
  };

  const geometricAccentMotionProps: MotionProps & { className?: string } = {
    initial: { opacity: 0 },
    whileInView: { opacity: 0.2 },
    transition: { duration: 1, delay: 0.5 },
    viewport: { once: true },
    className: "absolute -top-20 -left-20 w-[300px] h-[300px] pointer-events-none",
  };

  const rightColumnMotionProps: MotionProps = {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.8 },
    viewport: { once: true },
  };

  return (
    <section className="pb-0 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Main content and Ethos within a flex/grid container */}
        <div className="flex flex-col gap-12">
          {/* Ethos Section - Full Width */}
          <div className="max-w-4xl mx-auto">
            <LuxuryCard 
              variant="default" 
              cornerAccents="none" 
              sparkleOverlay={true} 
              floatingParticles={true}
              className="relative p-8"
            >
              <div className="relative z-10 flex flex-col gap-6">
                {/* Title with gold underline */}
                <div className="text-center">
                  <h2 className="text-3xl font-display font-bold gold-text mb-1">
                    {data.ethosTitle || "The Vibe Supply Ethos"}
                  </h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/70 to-transparent mt-2 mx-auto relative">
                    <div className="absolute inset-0 blur-sm bg-gold/30"></div>
                  </div>
                </div>
                <p className="text-white text-center max-w-3xl mx-auto text-lg leading-relaxed">
                  {data.ethosContent || "Whenever possible, we are committed to representation and diversity. We believe that having as many different kinds of people on stage not only makes for a more interesting show but enriches the music itself."}
                </p>
              </div>
            </LuxuryCard>
          </div>

          {/* Main About Us Content Section (formerly handled by the second AboutUsSection call) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-12 lg:items-stretch">
            {/* Left Column: Narrative */}
            <div
              className={`${leftColumnBaseClass} ${data.featuredImage?.position === 'left' ? 'lg:order-2' : 'lg:order-1'}`}
            >
              {/* Geometric Accent - Triangle (REMOVED) */}

              <LuxuryCard 
                variant="default" 
                cornerAccents="none" 
                sparkleOverlay={true} 
                floatingParticles={true}
                className="h-full relative p-8"
              >
                <div className="relative z-10 flex flex-col gap-6">
                  {/* Title with gold underline */}
                  <div className="text-center">
                    <h2 className="text-3xl font-display font-bold gold-text mb-1">{data.mainContentTitle || "Our Story"}</h2>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/70 to-transparent mt-2 mx-auto relative">
                      <div className="absolute inset-0 blur-sm bg-gold/30"></div>
                    </div>
                  </div>
                  {/* Paragraphs - support both new array format and legacy single paragraph */}
                  {data.ourStoryParagraphs && data.ourStoryParagraphs.length > 0 ? (
                    <div className="space-y-4">
                      {data.ourStoryParagraphs.map((paragraph: ParagraphItem) => (
                        <p key={paragraph._key} className="text-white text-left">
                          {paragraph.text}
                        </p>
                      ))}
                    </div>
                  ) : data.ourStoryParagraph ? (
                    <p className="text-white text-left">
                      {/* Backward compatibility with old single paragraph field */}
                      {data.ourStoryParagraph}
                    </p>
                  ) : null}
                  {/* Gold bullet points */}
                  {data.keyPoints && data.keyPoints.length > 0 && (
                    <ul className="space-y-2 text-gold font-medium text-left list-disc list-inside">
                      {data.keyPoints.map((item: KeyPointItem) => (
                        <li key={item._key}>{item.text}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </LuxuryCard>
            </div>

            {/* Right Column: Image */}
            <LuxuryCard
              variant="gallery-item"
              cornerAccents="none"
              sparkleOverlay={true}
              className={`min-h-[200px] sm:min-h-[225px] lg:min-h-0 h-auto lg:h-full ${data.featuredImage?.position === 'left' ? 'lg:order-1' : 'lg:order-2'}`}
              imageSrc={data.featuredImage?.asset ? urlForImage(data.featuredImage) || "/placeholder.svg" : "/placeholder.svg"}
              imageAlt="About Us Featured Image"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 