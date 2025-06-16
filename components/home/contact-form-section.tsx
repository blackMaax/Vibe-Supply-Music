"use client"

import type { ReactNode, HTMLAttributes } from "react"
import { motion, type MotionProps } from "framer-motion"
import { Send, Mail, Instagram, Facebook, Twitter, Link as LinkIcon, Youtube } from "lucide-react"
import LuxuryCard from "@/components/ui/luxury-card"
import FeaturedImage from "@/components/contact/featured-image"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from "react";

// Lazy load reCAPTCHA
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
  loading: () => <div className="h-[60px] w-[60px] animate-pulse bg-gray-200/20 rounded" />
});

// Zod Schema for validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  email: z.string().email({ message: "Invalid email address." }).max(100),
  subject: z.string().max(150).optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

interface ContactFormSectionProps {
  title?: string
  subtitle?: string
  imageSrc: string
  imageAlt?: string
  featuredImageTitle?: string;
  featuredImageSubtitle?: string;
  className?: string
  children?: ReactNode
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: Array<{ _key?: string; platform?: string; url?: string }>;
}

const RECAPTCHA_ACTION = process.env.NEXT_PUBLIC_RECAPTCHA_V3_EXPECTED_ACTION || "submitContactForm";

const getSocialIcon = (platform?: string) => {
  switch (platform?.toLowerCase()) {
    case "instagram": return <Instagram width={20} height={20} />;
    case "facebook": return <Facebook width={20} height={20} />;
    case "twitter": return <Twitter width={20} height={20} />;
    case "youtube": return <Youtube width={20} height={20} />;
    default: return <LinkIcon width={20} height={20} />;
  }
};

const ContactFormSection = ({
  title = "Get in Touch",
  subtitle = "Ready to elevate your event with unforgettable music? We\'d love to hear from you.",
  imageSrc,
  imageAlt = "Vibe Supply Performance",
  featuredImageTitle,
  featuredImageSubtitle,
  className = "",
  children,
  contactEmail,
  contactPhone,
  socialLinks = [],
}: ContactFormSectionProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    trigger,
    watch,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange"
  });
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  const recaptchaRef = useRef<any>(null);
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  const watchedFields = watch();
  useEffect(() => {
    if (Object.keys(dirtyFields).length > 0 && formSuccessMessage) {
      setFormSuccessMessage(null);
    }
  }, [watchedFields, dirtyFields, formSuccessMessage]);

  // Only load reCAPTCHA when form is interacted with
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsRecaptchaLoaded(true);
          // Set ready state after a short delay to ensure reCAPTCHA is fully loaded
          setTimeout(() => {
            setIsRecaptchaReady(true);
          }, 2000);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const formElement = document.querySelector('form');
    if (formElement) {
      observer.observe(formElement);
    }

    return () => observer.disconnect();
  }, []);

  const handleRecaptcha = async () => {
    if (!recaptchaRef.current) {
      toast.error("Security verification is loading. Please wait a moment and try again.");
      return null;
    }
    
    try {
      // Reset the reCAPTCHA before getting a new token
      recaptchaRef.current.reset();
      const token = await recaptchaRef.current.executeAsync();
      
      if (token) {
        return token;
      } else {
        toast.error("Security verification failed. Please try again.");
        return null;
      }
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      toast.error("Security verification error. Please refresh the page and try again.");
      return null;
    }
  };

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setFormSuccessMessage(null);
    
    // Show loading state immediately
    toast.loading("Sending your message...", { id: "contact-form" });
    
    // Wait a moment for reCAPTCHA to be ready if needed
    if (!recaptchaRef.current) {
      toast.loading("Preparing security verification...", { id: "contact-form" });
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const token = await handleRecaptcha();

    if (!token) {
      toast.error("Security verification failed. Please try again.", { id: "contact-form" });
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: data.name, 
          email: data.email, 
          subject: data.subject, 
          message: data.message,
          recaptchaToken: token,
          recaptchaAction: RECAPTCHA_ACTION
        }), 
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Contact form error:', result);
        throw new Error(result.error || 'Failed to send message.');
      }
      
      toast.success("Message sent successfully! We'll be in touch soon.", { id: "contact-form" });
      setFormSuccessMessage("Message sent successfully! We'll be in touch soon.");
      reset();
    } catch (error) {
      console.error('Contact form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
      toast.error(errorMessage, { id: "contact-form" });
      setFormSuccessMessage(null);
    }
  };

  const titleParts = title.split(" ")
  const lastWord = titleParts.pop()
  const firstPart = titleParts.join(" ")

  const rightColumnMotionProps: MotionProps & HTMLAttributes<HTMLDivElement> = {
    initial: { opacity: 0, x: 20 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.7, delay: 0.2 },
    viewport: { once: true },
    className: "flex flex-col gap-8 h-full"
  };

  return (
    <section className={`pb-12 relative ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <LuxuryCard className="max-w-3xl mx-auto py-4 px-6 md:py-5 md:px-8" variant="default" cornerAccents="none">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4 gold-text pb-1 leading-relaxed">
                {title}
              </h2>
              <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-2 md:my-3 mx-auto"></div>
              <p className="text-white/80 max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans leading-relaxed">{subtitle}</p>
            </div>
          </LuxuryCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <LuxuryCard className="h-full" cornerAccents="none">
              <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold mb-6 gold-text">Send Us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white/90 mb-2 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className="w-full bg-black/50 border border-gold/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                      placeholder="John Doe"
                      maxLength={100}
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/90 mb-2 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="w-full bg-black/50 border border-gold/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                      placeholder="your@email.com"
                      maxLength={100}
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-white/90 mb-2 font-medium">
                      Subject <span className="text-white/50">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register("subject")}
                      className="w-full bg-black/50 border border-gold/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                      placeholder="Event Inquiry"
                      maxLength={150}
                    />
                    {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/90 mb-2 font-medium">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register("message")}
                      className="w-full bg-black/50 border border-gold/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                      placeholder="Tell us about your event and how we can help..."
                      maxLength={1000} 
                    ></textarea>
                    {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !isRecaptchaLoaded}
                    className="w-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-navy font-bold py-3 px-6 rounded-full relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative flex items-center justify-center">
                      {isSubmitting ? "Sending..." : !isRecaptchaLoaded ? "Loading..." : "Send Message"} <Send className="ml-2 h-5 w-5" />
                    </span>
                  </button>

                  {formSuccessMessage && (
                    <div className="mt-4 p-3 text-center bg-green-500/20 border border-green-500/50 rounded-md text-green-300">
                      {formSuccessMessage}
                    </div>
                  )}

                  <div className="mt-3 text-center">
                    {isRecaptchaLoaded && (
                      <div className="recaptcha-badge-wrapper" style={{ transform: 'scale(0.77)', transformOrigin: 'center', display: 'inline-block', height: '60px' }}>
                        <ReCAPTCHA
                          ref={(ref) => { recaptchaRef.current = ref; }}
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                          size="invisible"
                          badge="inline"
                        />
                      </div>
                    )}
                    <style jsx global>{`
                      .grecaptcha-badge {
                        visibility: hidden !important;
                        opacity: 0 !important;
                        display: none !important;
                      }
                      .recaptcha-badge-wrapper > div > iframe {
                        visibility: hidden !important;
                        opacity: 0 !important;
                        display: none !important;
                      }
                    `}</style>
                    <p className="text-xs text-white/50 mt-1">
                      This site is protected by reCAPTCHA and the Google
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold/70"> Privacy Policy</a> and
                      <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold/70"> Terms of Service</a> apply.
                    </p>
                  </div>
                </form>
              </div>
            </LuxuryCard>
          </motion.div>

          {/* Right Column - Featured Image and Contact Details */}
          <motion.div {...rightColumnMotionProps}>
            <FeaturedImage 
              imageSrc={imageSrc} 
              imageAlt={imageAlt || "Vibe Supply Live Performance"} 
              title={featuredImageTitle}
              subtitle={featuredImageSubtitle}
            />

            {/* Contact Details Card */}
            {(contactEmail || contactPhone || (socialLinks && socialLinks.length > 0)) && (
              <LuxuryCard className="flex-grow h-full" cornerAccents="none">
                <h3 className="text-2xl font-display font-bold mb-6 gold-text">Contact Information</h3>
                {contactEmail && (
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-white/80 mb-1">Email</p>
                    <div className="flex items-center text-white/90 hover:text-gold transition-colors">
                      <Mail className="mr-3 h-5 w-5 flex-shrink-0" />
                      <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                    </div>
                  </div>
                )}
                {socialLinks && socialLinks.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-white/80 mb-3">Follow Us</h4>
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((link) => (
                        <a
                          key={link._key || link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow us on ${link.platform}`}
                          className="p-2.5 bg-black/40 rounded-full hover:bg-gold/20 text-gold hover:text-gold-dark transition-all duration-300 border border-gold/20 hover:border-gold/50"
                        >
                          {getSocialIcon(link.platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </LuxuryCard>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
