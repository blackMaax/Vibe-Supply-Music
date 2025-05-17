"use client"

import { motion, type MotionProps } from "framer-motion"
import LuxuryCard from "@/components/ui/luxury-card"
import { HelpCircle } from "lucide-react"
import type { HTMLAttributes } from "react"

export interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
}

export default function FAQSection({ faqs }: FAQSectionProps) {
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
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 gold-text">Frequently Asked Questions</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-6 mx-auto"></div>
          <p className="text-white/80 max-w-2xl mx-auto">
            Have questions about our packages? Find answers to common questions below.
          </p>
        </motion.div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div key={`faq-motion-${index}`} {...faqCardMotionProps(index)}>
              <LuxuryCard
                variant="default"
                cornerAccents="none"
                className="p-6 w-full"
              >
                <div className="flex items-start gap-4 mb-3">
                  <HelpCircle className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-semibold gold-text">{faq.question}</h3>
                </div>
                <div className="pl-10">
                  <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </LuxuryCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
