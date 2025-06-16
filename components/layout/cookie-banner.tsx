"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const preference = localStorage.getItem("cookie-preference")

    // Show banner if no preference is set
    if (!preference) {
      // Small delay to prevent banner from showing immediately on page load
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-preference", "accepted")
    setShowBanner(false)
    // Here you would initialize analytics or other cookie-dependent services
    // Development only: console.log("Cookies accepted")
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-preference", "declined")
    setShowBanner(false)
    // Development only: console.log("Cookies declined")
  }

  if (!showBanner) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4 mx-auto max-w-4xl animate-fade-in-up">
      <div
        className="relative overflow-hidden rounded-xl border border-gold/30 backdrop-blur-md"
        style={{
          background: "rgba(0, 0, 0, 0.75)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(212, 175, 55, 0.2)",
        }}
      >
        {/* Gold line at the top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-gold/10 via-gold/60 to-gold/10">
          <div className="absolute inset-0 blur-sm bg-gold/30"></div>
        </div>

        {/* Gold pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="cookiePattern"
                width="50"
                height="43.4"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(3)"
              >
                <polygon
                  points="25,0 50,14.4 50,43.4 25,57.8 0,43.4 0,14.4"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cookiePattern)" />
          </svg>
        </div>

        <div className="relative p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-white/90 text-sm md:text-base mb-1">
              We use cookies to enhance your experience on our site.
            </p>
            <p className="text-white/70 text-xs">
              By clicking "Accept", you agree to our use of cookies. Learn more in our{" "}
              <Link href="/cookies" className="text-gold hover:text-gold-light underline">
                Cookie Policy
              </Link>
              .
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3 self-end md:self-auto">
            <button
              onClick={handleDecline}
              className="text-white/80 hover:text-white text-sm px-4 py-2 rounded-full border border-white/20 hover:border-white/40 transition-colors duration-300"
            >
              Decline
            </button>

            <button
              onClick={handleAccept}
              className="bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-navy font-medium text-sm px-4 py-2 rounded-full relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10">Accept</span>
            </button>

            <button
              onClick={() => setShowBanner(false)}
              className="text-white/70 hover:text-white p-1 rounded-full transition-colors duration-300"
              aria-label="Close cookie banner"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default CookieBanner
