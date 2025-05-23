"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

interface ComparisonFeature {
  name: string
  diamond: boolean
  vip: boolean
  elite: boolean
}

interface PackageComparisonProps {
  features: ComparisonFeature[]
}

export default function PackageComparison({ features }: PackageComparisonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="overflow-x-auto"
    >
      <div className="min-w-[768px]">
        <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-gold/20">
          <div className="text-white font-bold">Feature</div>
          <div className="text-center text-gold font-bold">Diamond</div>
          <div className="text-center text-white font-bold">VIP</div>
          <div className="text-center text-white/80 font-bold">Elite</div>
        </div>

        {features.map((feature, index) => (
          <div
            key={index}
            className={`grid grid-cols-4 gap-4 py-3 ${index % 2 === 0 ? "bg-white/5" : ""} rounded-lg items-center`}
          >
            <div className="text-white/80">{feature.name}</div>
            <div className="flex justify-center">
              {feature.diamond ? <Check className="h-5 w-5 text-gold" /> : <X className="h-5 w-5 text-white/30" />}
            </div>
            <div className="flex justify-center">
              {feature.vip ? <Check className="h-5 w-5 text-white" /> : <X className="h-5 w-5 text-white/30" />}
            </div>
            <div className="flex justify-center">
              {feature.elite ? <Check className="h-5 w-5 text-white/80" /> : <X className="h-5 w-5 text-white/30" />}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
