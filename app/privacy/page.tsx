"use client"

import PageHero from "@/components/shared/page-hero"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import LuxuryCard from "@/components/ui/luxury-card"
import { motion } from "framer-motion"
import { Shield, Lock, Eye, FileText } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <PageHero title="Privacy Policy" subtitle="How we collect, use, and protect your personal information" />

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          {/* Privacy highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <LuxuryCard className="text-center p-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 border border-gold/40">
                  <Shield className="text-gold h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 gold-text">Data Protection</h3>
                <p className="text-white/80 text-sm">Your data is protected by UK and EU regulations</p>
              </div>
            </LuxuryCard>

            <LuxuryCard className="text-center p-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 border border-gold/40">
                  <Lock className="text-gold h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 gold-text">Secure Storage</h3>
                <p className="text-white/80 text-sm">All personal data is stored securely and encrypted</p>
              </div>
            </LuxuryCard>

            <LuxuryCard className="text-center p-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 border border-gold/40">
                  <Eye className="text-gold h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 gold-text">No Tracking</h3>
                <p className="text-white/80 text-sm">We don't use invasive tracking technologies</p>
              </div>
            </LuxuryCard>

            <LuxuryCard className="text-center p-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 border border-gold/40">
                  <FileText className="text-gold h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 gold-text">Your Rights</h3>
                <p className="text-white/80 text-sm">Access, correct, or delete your data anytime</p>
              </div>
            </LuxuryCard>
          </div>

          <LuxuryCard>
            <div className="prose prose-lg prose-invert max-w-none">
              <h2 className="text-3xl font-display font-bold mb-6 gold-text">1. Information We Collect</h2>
              <p className="text-white/80">
                We collect personal information that you voluntarily provide to us when you express interest in
                obtaining information about our services, when you participate in activities on our website, or
                otherwise when you contact us.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">2. How We Use Your Information</h2>
              <p className="text-white/80">
                We use the information we collect to provide, maintain, and improve our services, to process your
                bookings, to communicate with you about upcoming events, and to comply with legal obligations.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">3. Information Sharing</h2>
              <p className="text-white/80">
                We do not sell, rent, or trade your personal information with third parties. We may share your
                information with trusted service providers who assist us in operating our website and conducting our
                business.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">4. Your Rights</h2>
              <p className="text-white/80">
                You have the right to access, correct, or delete your personal information at any time. You may also
                object to our processing of your personal data or request that we restrict the processing of your
                personal data.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">5. Data Security</h2>
              <p className="text-white/80">
                We have implemented appropriate technical and organizational security measures designed to protect the
                security of any personal information we process. However, please also remember that we cannot guarantee
                that the internet itself is 100% secure.
              </p>

              <h2 className="text-3xl font-display font-bold mb-6 mt-10 gold-text">6. Contact Us</h2>
              <p className="text-white/80">
                If you have questions or comments about this policy, you may email us at privacy@vibesupply.com.
              </p>

              <div className="mt-10 pt-6 border-t border-gold/20">
                <p className="text-white/60 text-sm">Last updated: May 7, 2025</p>
              </div>
            </div>
          </LuxuryCard>
        </motion.div>
      </div>
    </div>
  )
}
