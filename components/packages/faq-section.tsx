"use client"

import { motion, type MotionProps } from "framer-motion"
import LuxuryCard from "@/components/ui/luxury-card"
import { HelpCircle } from "lucide-react"
import type { HTMLAttributes } from "react"
import Image from "next/image"
import { urlForImage } from "@/lib/sanity-image"
import type { SanityImageObject } from "@/lib/packages-data";

export interface FAQ {
  question: string
  answer: string
  image?: SanityImageObject | string;
  imagePosition?: 'left' | 'right';
}

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string;
  subtitle?: string;
}

export default function FAQSection({ faqs, title = "Frequently Asked Questions", subtitle }: FAQSectionProps) {
  const sectionHeaderMotionProps: MotionProps & HTMLAttributes<HTMLDivElement> = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
    viewport: { once: true },
    className: "text-center mb-12"
  };

  const faqCardMotionProps = (index: number): MotionProps & HTMLAttributes<HTMLDivElement> => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: index * 0.1 },
    viewport: { once: true },
    className: "w-full"
  });

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div {...sectionHeaderMotionProps}>
          <LuxuryCard
            variant="default"
            cornerAccents="none"
            className="max-w-2xl mx-auto py-6 px-6 md:py-8 md:px-10 mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 gold-text">{title}</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-6 mx-auto"></div>
            {subtitle && (
              <p className="text-white/80 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </LuxuryCard>
        </motion.div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div key={`faq-motion-${index}`} {...faqCardMotionProps(index)}>
              <LuxuryCard
                variant="default"
                cornerAccents="none"
                className="p-6 w-full"
              >
                <div className={`flex flex-col md:flex-row items-center gap-8 ${faq.imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  {faq.image && (
                    <div className="w-full md:w-1/3 h-[200px] relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={typeof faq.image === 'string' ? faq.image : urlForImage(faq.image) || '/placeholder.svg'}
                        alt={typeof faq.image === 'string' ? 'FAQ Image' : faq.image?.alt || 'FAQ Image'}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        priority={index < 2}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      <HelpCircle className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                      <h3 className="text-lg font-semibold gold-text">{faq.question}</h3>
                    </div>
                    <div className="pl-10">
                      <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
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
