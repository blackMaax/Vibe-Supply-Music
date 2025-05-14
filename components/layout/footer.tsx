"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter, Mail, Phone, Link as LinkIcon, Youtube, Linkedin, MessageCircle, Pin, Film } from "lucide-react"
import { getImageUrl } from "@/lib/static-data"

// Define the props for the Footer component
interface FooterProps {
  logoUrl?: string | null;
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: Array<{ _key?: string; platform?: string; url?: string }>;
  footerText?: string; // For copyright or general text
}

// Helper to get appropriate icon based on platform
const getSocialIcon = (platform?: string) => {
  if (!platform) return <LinkIcon size={18} />;
  // Aggressively clean the platform string: remove anything not a letter or number
  const cleanedPlatform = platform.replace(/[^a-zA-Z0-9]/g, '');
  
  switch (cleanedPlatform.toLowerCase()) {
    case "instagram":
      return <Instagram size={18} />;
    case "facebook":
      return <Facebook size={18} />;
    case "twitter":
    case "x":
      return <Twitter size={18} />;
    case "youtube":
      return <Youtube size={18} />;
    case "linkedin":
      return <Linkedin size={18} />;
    case "whatsapp":
      return <MessageCircle size={18} />;
    case "pinterest":
      return <Pin size={18} />;
    case "tiktok":
      return <Film size={18} />;
    // Add more cases for other platforms if needed
    default:
      return <LinkIcon size={18} />; // Default link icon
  }
};

const Footer = ({ 
  logoUrl, 
  contactEmail, 
  contactPhone, 
  socialLinks = [], // Default to empty array
  footerText 
}: FooterProps) => {
  const displayLogo = logoUrl || getImageUrl("logoWhite") || "/placeholder.svg";
  const displayEmail = contactEmail || "info@example.com";
  const displayPhone = contactPhone || "+1 234 567 8900";
  const currentYear = new Date().getFullYear();
  const displayFooterText = footerText || `© ${currentYear} Vibe Supply. All rights reserved.`;

  return (
    <footer className="relative border-t border-gold/30 w-full z-10 mt-auto">
      {/* Stage-like background */}
      <div className="absolute inset-0 bg-[#0A0A14] z-0"></div>

      {/* Club-light orbs with pulse animation - removed animation that could cause scroll issues */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-pink/30 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/20 blur-[150px]"></div>

      {/* Spotlight/shimmer texture - simplified to avoid scroll performance issues */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpolygon points='0,50 50,0 100,50 50,100' /%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "30px 30px",
        }}
      ></div>

      {/* Gold top border with subtle glow */}
      <div className="h-px w-full bg-gradient-to-r from-gold/10 via-gold/60 to-gold/10 relative">
        <div className="absolute inset-0 blur-sm bg-gold/30"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-start backdrop-blur-md bg-white/5 p-6 rounded-xl border border-gold/30 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <Image
              src={displayLogo}
              alt="Vibe Supply Logo"
              width={180}
              height={72}
              className="h-16 w-auto mb-6"
              onError={(e) => {
                console.error("Error loading footer logo:", e)
                // @ts-ignore - fallback to placeholder
                e.target.src = "/placeholder.svg?height=72&width=180&text=Logo"
              }}
            />
            <p className="text-sm text-gray-200 mb-8 max-w-xs">
              Elevating events with unforgettable live music experiences. Luxury entertainment for weddings and private
              functions.
            </p>
            <div className="flex space-x-4">
              {socialLinks && socialLinks.length > 0 ? (
                socialLinks.map((link) => link.url && (
              <Link
                    key={link._key || link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink hover:text-white transition-colors duration-300 border border-gold/40"
                    aria-label={link.platform || "Social media link"}
              >
                    {getSocialIcon(link.platform)}
              </Link>
                ))
              ) : (
                <>
                  {/* Fallback static links if socialLinks prop is empty/not provided */}
                  <Link href="https://instagram.com" className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink hover:text-white transition-colors duration-300 border border-gold/40" aria-label="Instagram"><Instagram size={18} /></Link>
                  <Link href="https://facebook.com" className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink hover:text-white transition-colors duration-300 border border-gold/40" aria-label="Facebook"><Facebook size={18} /></Link>
                  <Link href="https://twitter.com" className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink hover:text-white transition-colors duration-300 border border-gold/40" aria-label="Twitter"><Twitter size={18} /></Link>
                </>
              )}
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-gold/30 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <h3 className="text-lg font-bold mb-6 relative inline-block font-display gold-text">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-pink"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-200 hover:text-pink transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-200 hover:text-pink transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-gray-200 hover:text-pink transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-200 hover:text-pink transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-gold/30 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <h3 className="text-lg font-bold mb-6 relative inline-block font-display gold-text">
              Legal
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-pink"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-200 hover:text-pink transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-200 hover:text-pink transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-200 hover:text-pink transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="text-gray-200 hover:text-pink transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-gold/30 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <h3 className="text-lg font-bold mb-6 relative inline-block font-display gold-text">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-pink"></span>
            </h3>
            <ul className="space-y-4">
              {displayPhone && (
              <li className="flex items-center group">
                <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mr-3 group-hover:bg-pink transition-colors duration-300 border border-gold/40">
                  <Phone size={18} className="text-gold group-hover:text-white transition-colors duration-300" />
                </div>
                  <div className="min-w-0">
                  <p className="text-sm text-gray-300">Phone</p>
                    <a href={`tel:${displayPhone}`} className="text-sm text-gray-200 hover:text-pink transition-colors duration-300 break-words">
                      {displayPhone}
                  </a>
                </div>
              </li>
              )}
              {displayEmail && (
              <li className="flex items-center group">
                <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mr-3 group-hover:bg-pink transition-colors duration-300 border border-gold/40">
                  <Mail size={18} className="text-gold group-hover:text-white transition-colors duration-300" />
                </div>
                  <div className="min-w-0">
                  <p className="text-sm text-gray-300 mb-0.5">Email</p>
                  <a
                      href={`mailto:${displayEmail}`}
                      className="text-sm text-gray-200 hover:text-pink transition-colors duration-300 break-words"
                  >
                      {displayEmail}
                  </a>
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
