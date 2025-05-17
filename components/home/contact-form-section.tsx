"use client"

import type { ReactNode, FormEvent, HTMLAttributes } from "react"
import { useState } from "react"
import { motion, type MotionProps } from "framer-motion"
import { Send } from "lucide-react"
import LuxuryCard from "@/components/ui/luxury-card"
import FeaturedImage from "@/components/contact/featured-image"
import { Instagram, Facebook, Twitter, Link as LinkIcon, Youtube } from "lucide-react" // For social icons

interface ContactFormSectionProps {
  title?: string
  subtitle?: string
  imageSrc: string
  imageAlt?: string
  featuredImageTitle?: string; // New prop for FeaturedImage title
  featuredImageSubtitle?: string; // New prop for FeaturedImage subtitle
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

// Function to escape HTML special characters
const escapeHTML = (str: string) => {
  if (!str) return "";
  return str.replace(/[&<>"']/g, (match) => {
    switch (match) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return match;
    }
  });
};

// Function to strip HTML tags
const stripHTML = (html: string) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const ContactFormSection = ({
  title = "Get in Touch",
  subtitle = "Ready to elevate your event with unforgettable music? We'd love to hear from you.",
  imageSrc,
  imageAlt = "Vibe Supply Performance",
  featuredImageTitle, // This is correct (first instance for destructuring)
  featuredImageSubtitle, // This is correct (first instance for destructuring)
  className = "",
  children,
  contactEmail,    // Destructure new prop
  contactPhone,    // Destructure new prop
  socialLinks = [], // Destructure new prop with default
}: ContactFormSectionProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const sanitizedName = escapeHTML(name);
    const sanitizedEmail = escapeHTML(email); // Email validation usually handles most malicious inputs for its format
    const sanitizedSubject = escapeHTML(subject);
    const sanitizedMessage = stripHTML(message); // Or escapeHTML(message) if you prefer to keep tags but escape them

    console.log("Submitting sanitized data:", {
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
    });

    // Simulate API call
    try {
      // Replace with your actual API endpoint and submission logic
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: sanitizedName, email: sanitizedEmail, subject: sanitizedSubject, message: sanitizedMessage }),
      // });
      // if (!response.ok) throw new Error('Network response was not ok.');
      // const result = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      console.log("Form submitted successfully (simulated)");
      setSubmitStatus("success");
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting form (simulated):", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Split the title to highlight the last word
  const titleParts = title.split(" ")
  const lastWord = titleParts.pop()
  const firstPart = titleParts.join(" ")

  // Explicitly typed props for the right column motion.div to fix linter error
  const rightColumnMotionProps: MotionProps & HTMLAttributes<HTMLDivElement> = {
    initial: { opacity: 0, x: 20 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.7, delay: 0.2 },
    viewport: { once: true },
    className: "flex flex-col gap-8 h-full"
  };

  return (
    <section className={`pt-24 pb-12 relative ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section header on card - Updated to match GalleryPreview and CTA */}
        <div className="text-center mb-16">
          <LuxuryCard className="max-w-3xl mx-auto py-4 px-6 md:py-5 md:px-8" variant="default" cornerAccents="none">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4 gold-text pb-1 leading-relaxed">
                {title} {/* Use full title directly */}
              </h2>
              <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-2 md:my-3 mx-auto"></div>
              <p className="text-white/80 max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans leading-relaxed">{subtitle}</p>
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
            <LuxuryCard className="h-full" cornerAccents="none">
              <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold mb-6 gold-text">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white/90 mb-2 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/50 border border-gold/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                      placeholder="John Doe"
                      maxLength={100}
                      required
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/50 border border-gold/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                      placeholder="your@email.com"
                      maxLength={100}
                      required
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
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-black/50 border border-gold/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                      placeholder="Event Inquiry"
                      maxLength={150}
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
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-black/50 border border-gold/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                      placeholder="Tell us about your event and how we can help..."
                      maxLength={600}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-navy font-bold py-3 px-6 rounded-full relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative flex items-center justify-center">
                      {isSubmitting ? "Sending..." : "Send Message"} <Send className="ml-2 h-5 w-5" />
                    </span>
                  </button>
                  {submitStatus === "success" && (
                    <p className="text-green-400 text-sm mt-4 text-center">Message sent successfully! We'll be in touch soon.</p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-400 text-sm mt-4 text-center">There was an error sending your message. Please try again.</p>
                  )}
                </form>
              </div>
            </LuxuryCard>
          </motion.div>

          {/* Right Column - Image and Contact Info */}
          {/* @ts-ignore - Applying props directly as a workaround for the className issue if explicit typing fails */}
          <motion.div {...rightColumnMotionProps}>
            {/* Image Card */}
            <FeaturedImage
              imageSrc={imageSrc || "/placeholder.svg"}
              imageAlt={imageAlt}
              title={featuredImageTitle || "Unforgettable Experiences"}
              subtitle={featuredImageSubtitle || "Let's create magical moments for your special event"}
            />

            {/* Contact Info Card */}
            <LuxuryCard className="flex-grow" cornerAccents="none">
              <div className="relative z-10 flex flex-col h-full">
                <h2 className="text-3xl font-display font-bold mb-6 gold-text">Contact Information</h2>

                <div className="flex flex-col flex-grow gap-6">
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
