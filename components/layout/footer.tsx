"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter, Mail, Phone, Clock, Link as LinkIcon, Youtube, Linkedin, MessageCircle, Pin, Film } from "lucide-react"
import { useState, useEffect } from "react"
import React from "react"
import { urlForImage } from "@/lib/sanity-image"

// Define the props for the Footer component
interface FooterProps {
  logoUrl?: string | null;
  logoAsset?: any; // Sanity image asset
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: Array<{ _key?: string; platform?: string; url?: string }>;
  footerText?: string; // For copyright or general text
}

// Helper to get appropriate icon based on platform
const getSocialIcon = (platform?: string) => {
  if (!platform) return <LinkIcon size={18} className="text-gold" />;
  const cleanedPlatform = platform.replace(/[^a-zA-Z0-9]/g, '');
  
  switch (cleanedPlatform.toLowerCase()) {
    case "instagram": return <Instagram size={18} className="text-gold" />;
    case "facebook": return <Facebook size={18} className="text-gold" />;
    case "twitter": case "x": return <Twitter size={18} className="text-gold" />;
    case "youtube": return <Youtube size={18} className="text-gold" />;
    case "linkedin": return <Linkedin size={18} className="text-gold" />;
    case "whatsapp": return <MessageCircle size={18} className="text-gold" />;
    case "pinterest": return <Pin size={18} className="text-gold" />;
    case "tiktok": return <Film size={18} className="text-gold" />;
    default: return <LinkIcon size={18} className="text-gold" />;
  }
};

const Footer = ({ 
  logoUrl, 
  logoAsset, 
  contactEmail, 
  contactPhone, 
  socialLinks = [],
  footerText 
}: FooterProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get logo URL from Sanity or use provided logoUrl
  const displayLogo = logoAsset ? urlForImage(logoAsset) : logoUrl || "/placeholder.svg?height=100&width=200&text=Logo";
  const displayEmail = contactEmail || "info@example.com";
  const displayPhone = contactPhone || "+1 234 567 8900";
  const currentYear = new Date().getFullYear();
  const displayFooterText = footerText || `© ${currentYear} Vibe Supply. All rights reserved.`;

  return (
    <footer className="relative w-full z-10 mt-auto">
      {/* Gold top border with subtle glow - REMOVED
      <div className="h-px w-full bg-gradient-to-r from-gold/10 via-gold/60 to-gold/10 relative">
        <div className="absolute inset-0 blur-sm bg-gold/30"></div>
      </div>
      */}

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 bg-black/75 backdrop-blur-md border border-gold/30 rounded-2xl p-8 shadow-[inset_0_0_15px_rgba(0,0,0,0.3),0_10px_30px_rgba(0,0,0,0.15)] relative overflow-hidden">
          {/* Animated floating particles inside the card - Render only on client after mount */}
          {isMounted && (
            <div className="absolute inset-0 pointer-events-none z-0">
              {[...Array(50).keys()].map((i) => (
                <div
                  key={`footer-card-particle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-gold/30"
                  style={{
                    left: `${5 + Math.random() * 90}%`,
                    top: `${5 + Math.random() * 90}%`,
                    filter: "blur(0.5px)",
                    animation: `float-${(i % 3) + 1} ${18 + Math.random() * 25}s linear infinite`,
                    opacity: 0.2 + Math.random() * 0.4,
                    willChange: "transform, opacity",
                  }}
                ></div>
              ))}
            </div>
          )}
          
          {/* Content columns (relative z-10 to be above particles) */}
          {/* Removed Logo and Description Section */}

          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-6 relative inline-block font-display gold-text">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold/70"></span>
            </h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-200 hover:text-[var(--color-warm-gold)] transition-colors duration-300 flex items-center"><span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>Home</Link></li>
              <li><Link href="/about" className="text-gray-200 hover:text-[var(--color-warm-gold)] transition-colors duration-300 flex items-center"><span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>About</Link></li>
              <li><Link href="/packages" className="text-gray-200 hover:text-[var(--color-warm-gold)] transition-colors duration-300 flex items-center"><span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>Packages</Link></li>
              <li><Link href="/contact" className="text-gray-200 hover:text-[var(--color-warm-gold)] transition-colors duration-300 flex items-center"><span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>Contact</Link></li>
            </ul>
          </div>

          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-6 relative inline-block font-display gold-text">
              Legal
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold/70"></span>
            </h3>
            <ul className="space-y-4">
              <li><Link href="/terms" className="text-gray-200 hover:text-[var(--color-warm-gold)] transition-colors duration-300 flex items-center"><span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-gray-200 hover:text-[var(--color-warm-gold)] transition-colors duration-300 flex items-center"><span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-gray-200 hover:text-[var(--color-warm-gold)] transition-colors duration-300 flex items-center"><span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>Cookie Policy</Link></li>
              <li><Link href="/sitemap" className="text-gray-200 hover:text-[var(--color-warm-gold)] transition-colors duration-300 flex items-center"><span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>Sitemap</Link></li>
            </ul>
          </div>

          <div className="relative z-10 col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 relative inline-block font-display gold-text">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold/70"></span>
            </h3>
            <ul className="space-y-4">
              {displayEmail && (
              <li className="flex items-center group">
                <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mr-3 group-hover:bg-gold transition-colors duration-300 border border-gold/40">
                  <Mail size={18} className="text-gold group-hover:text-neutral-900 transition-colors duration-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-300 mb-0.5">Email</p>
                  <a href={`mailto:${displayEmail}`} className="text-sm text-gray-200 hover:text-[var(--color-warm-gold)] transition-colors duration-300 break-words">{displayEmail}</a>
                </div>
              </li>
              )}
              <li className="flex items-center group">
                <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mr-3 group-hover:bg-gold transition-colors duration-300 border border-gold/40">
                  <Clock size={18} className="text-gold group-hover:text-neutral-900 transition-colors duration-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-300 mb-0.5">Working Hours</p>
                  <p className="text-sm text-gray-200">Mon - Fri: 9am - 6pm</p>
                </div>
              </li>
               {socialLinks && socialLinks.length > 0 && (
                <li>
                  <div className="flex items-center">
                    <div className="flex space-x-3">
                      {socialLinks.map((link) => link.url && (
                        <Link
                          key={link._key || link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-white/10 border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-neutral-900 transition-colors duration-300"
                          aria-label={link.platform || "Social media link"}
                        >
                          {getSocialIcon(link.platform)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-400">
          <p className="text-sm">{displayFooterText}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
