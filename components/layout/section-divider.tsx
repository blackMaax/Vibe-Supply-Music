"use client"

import { useState, useEffect } from "react"

interface SectionDividerProps {
  className?: string
  position?: "top" | "bottom"
  connectToHeader?: boolean
  height?: number
}

const SectionDivider = ({
  className = "",
  position = "bottom",
  connectToHeader = false,
  height = 80,
}: SectionDividerProps) => {
  const isTop = position === "top"
  const marginClass = connectToHeader ? "-mt-0" : ""

  // Add state to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false)

  // Add effect to check screen width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div
      className={`relative w-full overflow-hidden ${className} ${marginClass} z-20`}
      style={{
        height: `${height}px`,
        transform: isTop ? "rotate(180deg)" : "none",
      }}
    >
      {/* SVG with asymmetrical angled facets and gold pattern overlay */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0"
      >
        <defs>
          {/* Gold glow for top edge */}
          <filter id="goldGlow" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Ultra-simplified gold pattern - using diagonal lines only */}
          <pattern id="goldPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            {/* Diagonal lines only - no horizontal elements */}
            <path d="M0,40 L40,0" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />
            <path d="M0,20 L20,0" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />
            <path d="M20,40 L40,20" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />

            {/* Small dots at intersections */}
            <circle cx="20" cy="20" r="0.8" fill="#D4AF37" fillOpacity="0.4" />
            <circle cx="0" cy="0" r="0.5" fill="#D4AF37" fillOpacity="0.4" />
            <circle cx="40" cy="0" r="0.5" fill="#D4AF37" fillOpacity="0.4" />
            <circle cx="0" cy="40" r="0.5" fill="#D4AF37" fillOpacity="0.4" />
            <circle cx="40" cy="40" r="0.5" fill="#D4AF37" fillOpacity="0.4" />
          </pattern>
        </defs>

        {/* Conditional path based on screen size */}
        {isMobile ? (
          // Smoother, curved path for mobile
          <>
            <path d="M0,30 C240,10 480,40 720,20 C960,0 1200,30 1440,20 L1440,120 L0,120 Z" fill="#000000" />

            {/* Gold pattern overlay */}
            <path
              d="M0,30 C240,10 480,40 720,20 C960,0 1200,30 1440,20 L1440,120 L0,120 Z"
              fill="url(#goldPattern)"
              opacity="0.6"
            />

            {/* Gold curved line along top edge with glow */}
            <path
              d="M0,30 C240,10 480,40 720,20 C960,0 1200,30 1440,20"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeOpacity="0.5"
              filter="url(#goldGlow)"
            />
          </>
        ) : (
          // Original spikey path for desktop
          <>
            <path
              d="M0,30 L120,0 L240,25 L360,10 L480,35 L600,15 L720,40 L840,10 L960,30 L1080,0 L1200,25 L1320,10 L1440,20 L1440,120 L0,120 Z"
              fill="#000000"
            />

            {/* Gold pattern overlay */}
            <path
              d="M0,30 L120,0 L240,25 L360,10 L480,35 L600,15 L720,40 L840,10 L960,30 L1080,0 L1200,25 L1320,10 L1440,20 L1440,120 L0,120 Z"
              fill="url(#goldPattern)"
              opacity="0.6"
            />

            {/* Gold zigzag line along top edge with glow */}
            <polyline
              points="0,30 120,0 240,25 360,10 480,35 600,15 720,40 840,10 960,30 1080,0 1200,25 1320,10 1440,20"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeOpacity="0.5"
              filter="url(#goldGlow)"
            />
          </>
        )}
      </svg>
    </div>
  )
}

export default SectionDivider
