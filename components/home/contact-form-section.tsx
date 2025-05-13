"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import LuxuryCard from "@/components/ui/luxury-card"
import FeaturedImage from "@/components/contact/featured-image"
import { Instagram, Facebook, Twitter, Link as LinkIcon, Youtube } from "lucide-react" // For social icons

interface ContactFormSectionProps {
  title?: string
  subtitle?: string
  imageSrc: string
  imageAlt?: string
  className?: string
  children?: ReactNode
  contactEmail?: string; // New prop
  contactPhone?: string; // New prop
  socialLinks?: Array<{ _key?: string; platform?: string; url?: string }>; // New prop
}

// Helper to get appropriate icon (can be shared or defined locally)
const getSocialIcon = (platform?: string) => {
  switch (platform?.toLowerCase()) {
    case "instagram":
      return <Instagram width={20} height={20} />;
    case "facebook":
      return <Facebook width={20} height={20} />;
    case "twitter":
      return <Twitter width={20} height={20} />;
    case "youtube":
      return <Youtube width={20} height={20} />;
    default:
      return <LinkIcon width={20} height={20} />;
  }
};

const ContactFormSection = ({
  title = "Get in Touch",
  subtitle = "Ready to elevate your event with unforgettable music? We'd love to hear from you.",
  imageSrc,
  imageAlt = "Vibe Supply Performance",
  className = "",
  children,
  contactEmail,    // Destructure new prop
  contactPhone,    // Destructure new prop
  socialLinks = [] // Destructure new prop with default
}: ContactFormSectionProps) => {
  // Split the title to highlight the last word
  const titleParts = title.split(" ")
  const lastWord = titleParts.pop()
  const firstPart = titleParts.join(" ")

  return (
    <section className={`py-24 relative ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section header on card */}
        <div className="text-center mb-16">
          <LuxuryCard className="max-w-3xl mx-auto p-8" variant="default">
            <div className="text-center">
              <h2 className="section-title pb-2 leading-relaxed gold-text">
                {firstPart} {lastWord}
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-4 mx-auto"></div>
              <p className="text-white/80 max-w-2xl mx-auto">{subtitle}</p>
            </div>
          </LuxuryCard>
        </div>

        {/* Contact Form and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <LuxuryCard className="h-full">
              <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold mb-6 gold-text">Send Us a Message</h2>

                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white/90 mb-2 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-black/50 border border-gold/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/90 mb-2 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-black/50 border border-gold/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-white/90 mb-2 font-medium">
                      Subject <span className="text-white/50">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full bg-black/50 border border-gold/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                      placeholder="Event Inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/90 mb-2 font-medium">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full bg-black/50 border border-gold/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                      placeholder="Tell us about your event and how we can help..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-navy font-bold py-3 px-6 rounded-full relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative flex items-center justify-center">
                      Send Message <Send className="ml-2 h-5 w-5" />
                    </span>
                  </button>
                </form>
              </div>
            </LuxuryCard>
          </motion.div>

          {/* Right Column - Image and Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            {/* Image Card */}
            <FeaturedImage
              imageSrc={imageSrc || "/placeholder.svg"}
              imageAlt={imageAlt}
              title="Unforgettable Experiences"
              subtitle="Let's create magical moments for your special event"
            />

            {/* Contact Info Card */}
            <LuxuryCard>
              <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold mb-6 gold-text">Contact Information</h2>

                <div className="space-y-6">
                  {contactEmail && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                    <a
                        href={`mailto:${contactEmail}`}
                      className="text-gold hover:text-gold-light transition-colors duration-300"
                    >
                        {contactEmail}
                    </a>
                  </div>
                  )}

                  {contactPhone && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                    <a
                        href={`tel:${contactPhone}`}
                      className="text-gold hover:text-gold-light transition-colors duration-300"
                    >
                        {contactPhone}
                    </a>
                  </div>
                  )}

                  {socialLinks && socialLinks.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                        {socialLinks.map((link) => link.url && (
                      <a
                            key={link._key || link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-black/50 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 transition-all duration-300"
                            aria-label={link.platform || "Social media link"}
                          >
                            {getSocialIcon(link.platform)}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </LuxuryCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactFormSection
