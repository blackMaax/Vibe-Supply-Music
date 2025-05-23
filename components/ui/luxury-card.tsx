"use client"

import type React from "react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"

// Define all possible props for the consolidated card component
interface LuxuryCardProps {
  children?: ReactNode
  className?: string
  variant?:
    | "default"
    | "core-value"
    | "band-member"
    | "package"
    | "feature"
    | "gallery-item"
    | "about"
    | "nested"
    | "hero"
  cornerAccents?: "all" | "top" | "bottom" | "left" | "right" | "none"
  sparkleOverlay?: boolean
  floatingParticles?: boolean
  performanceMode?: boolean
  title?: string
  subtitle?: string
  description?: string
  icon?: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  features?: string[]
  isHighlighted?: boolean
  price?: string
  actionButton?: ReactNode
  actionLink?: string
  actionText?: string
  index?: number
  onClick?: () => void
  role?: string
  bio?: string
  name?: string
  gradientOverlay?: boolean
  buttonOutside?: boolean
  hideInSection?: string
}

// Make sure the LuxuryCard doesn't interfere with navbar positioning
export default function LuxuryCard({
  children,
  className = "",
  variant = "default",
  cornerAccents = "all",
  sparkleOverlay = true,
  floatingParticles = false,
  performanceMode = false,
  title,
  subtitle,
  description,
  icon,
  imageSrc,
  imageAlt = "Image",
  features = [],
  isHighlighted = false,
  price,
  actionButton,
  actionLink,
  actionText,
  index = 0,
  onClick,
  role,
  bio,
  name,
  gradientOverlay = true,
  buttonOutside = false,
  hideInSection,
}: LuxuryCardProps) {
  const [mounted, setMounted] = useState(false)
  const [shouldHide, setShouldHide] = useState(false)
  const [currentSection, setCurrentSection] = useState<string | null>(null)

  // Check if we should hide this card in the current section
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentSection(document.querySelector("section[data-section-id]")?.getAttribute("data-section-id") || null)
    }
  }, [])

  useEffect(() => {
    setShouldHide(hideInSection ? currentSection === hideInSection : false)
  }, [hideInSection, currentSection])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Always initialize shouldHide to avoid conditional hook calls
  useEffect(() => {
    let isHidden = false
    if (hideInSection) {
      isHidden = currentSection === hideInSection
    }
    setShouldHide(isHidden)
  }, [hideInSection, currentSection])

  if (shouldHide) {
    return null
  }

  // Only render animations after component is mounted to avoid hydration issues

  // Determine if this is a clickable card
  const isClickable = !!onClick || !!actionLink

  // Determine if this is a nested card (to avoid duplicate visual elements)
  const isNested = variant === "nested"

  // Determine background style based on variant and isHighlighted
  const getBackgroundStyle = () => {
    if (isNested) {
      return {}
    }

    if (variant === "gallery-item") {
      return {
        border: "1px solid rgba(212, 175, 55, 0.3)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      }
    }

    if (variant === "package" && isHighlighted) {
      return {
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(212, 175, 55, 0.5)",
        boxShadow: "inset 0 0 15px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.15)",
      }
    }

    return {
      background: "rgba(0, 0, 0, 0.65)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(212, 175, 55, 0.3)",
      boxShadow: "inset 0 0 15px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.15)",
    }
  }

  // Determine padding based on variant
  const getPadding = () => {
    if (isNested) return "p-0"
    if (variant === "gallery-item") return "p-0"
    if (variant === "core-value") return "p-6"
    if (variant === "band-member") return "p-6"
    if (variant === "hero") return "py-3 px-4 md:py-4 md:px-6"
    return "p-8"
  }

  // Render the card content based on variant
  const renderCardContent = () => {
    switch (variant) {
      case "core-value":
        return (
          <div className="flex flex-col items-center text-center relative z-10">
            {icon && (
              <div className="bg-black/50 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink/20 transition-colors duration-300 border border-gold/40 relative overflow-hidden">
                {/* Animated glow behind icon */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
                <div className="relative z-10">{icon}</div>
              </div>
            )}

            {title && (
              <div className="mb-4">
                <h3 className="text-xl font-bold gold-text" style={{ lineHeight: "1.8", marginBottom: "8px" }}>
                  {title}
                </h3>
              </div>
            )}

            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-4 relative">
              <div className="absolute inset-0 blur-sm bg-gold/30"></div>
            </div>

            {description && <p className="text-gray-300 leading-relaxed mb-2">{description}</p>}
          </div>
        )

      case "band-member":
        return (
          <div className="flex flex-col items-center text-center relative z-10 flex-1 h-full">
            {/* Circular image positioned to overlap, but in normal flow */}
            {imageSrc && (
              <div className="mx-auto -mt-16 mb-4 relative z-20 w-32 h-32 rounded-full overflow-hidden border-4 border-neutral-800 shadow-lg">
                <Image
                  src={imageSrc || "/placeholder.svg"}
                  alt={name || "Band Member"}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Name with enhanced styling */}
            {name && (
              <div className="mb-1 mt-8">
                <h3 className="text-2xl font-bold gold-text font-display">
                  {name}
                </h3>
              </div>
            )}

            {/* Role with distinct styling */}
            {role && <p className="text-pink text-sm font-medium mb-3 tracking-wider uppercase">{role}</p>}

            {/* Decorative divider */}
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-4 mx-auto"></div>

            {/* Bio with improved readability and flex-grow */}
            {bio && <p className="text-gray-300 text-sm leading-relaxed px-2 flex-grow height-auto min-h-0">{bio}</p>}
          </div>
        )

      case "package":
        return (
          <div className="relative z-10">
            {isHighlighted && (
              <div className="absolute top-0 right-0">
                <div className="bg-gold text-navy font-bold py-1 px-4 rounded-bl-lg text-sm">MOST POPULAR</div>
              </div>
            )}

            <div className="mb-6 relative z-10">
              {title && (
                <div className="mb-2">
                  <h3
                    className="text-2xl font-bold font-display gold-text"
                    style={{ lineHeight: "1.8", marginBottom: "8px" }}
                  >
                    {title}
                  </h3>
                </div>
              )}
              {subtitle && <p className={isHighlighted ? "text-gray-300" : "text-gray-600"}>{subtitle}</p>}
              {description && (
                <p className={isHighlighted ? "text-gray-300 mt-2 mb-2" : "text-gray-600 mt-2 mb-2"}>{description}</p>
              )}
            </div>

            {price && (
              <div className="mb-4">
                <span className={`text-3xl font-bold ${isHighlighted ? "gold-text" : "text-white"}`}>{price}</span>
                <span className="text-gray-400 text-sm ml-1">per event</span>
              </div>
            )}

            {features.length > 0 && (
              <div className="flex-grow relative z-10">
                <ul className="space-y-4 mb-8">
                  {features.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={18} className={`mr-3 mt-1 ${isHighlighted ? "text-gold" : "text-pink"}`} />
                      <span className={isHighlighted ? "text-gray-200" : "text-gray-700"}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {actionLink && (
              <Link
                href={actionLink}
                className={`flex items-center justify-center py-3 px-6 rounded-full relative z-10 transition-all duration-300 ${
                  isHighlighted
                    ? "bg-gold text-navy hover:bg-gold-dark font-medium"
                    : "bg-white/80 text-navy hover:bg-white border border-gold/30 hover:bg-gold/10 font-medium"
                }`}
              >
                {actionText || "Book Now"}
              </Link>
            )}
          </div>
        )

      case "gallery-item":
        return (
          <div className="w-full h-full relative">
            {/* Image container */}
            {imageSrc && (
              <div className="absolute inset-0 w-full h-full">
                <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Text content */}
            {title && (
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-bold font-display gold-text">{title}</h3>
              </div>
            )}
          </div>
        )

      case "about":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            <div className="p-6 lg:p-8 flex flex-col justify-center items-center text-center">
              {title && <LuxuryTitle>{title}</LuxuryTitle>}
              {description && <p className="text-white mb-8 text-lg max-w-md mx-auto">{description}</p>}
              {children && (
                <div className="text-white/90 mb-10 text-lg max-w-md mx-auto leading-relaxed">{children}</div>
              )}
              {actionButton && <div>{actionButton}</div>}
            </div>

            {imageSrc && (
              <div className="relative h-[400px] lg:h-auto overflow-hidden rounded-lg">
                <div className="absolute inset-0">
                  <Image
                    src={imageSrc || "/placeholder.svg"}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            )}
          </div>
        )

      case "hero":
        return (
          <div className="text-center overflow-hidden w-full">
            <div className="mb-3 md:mb-4 overflow-hidden">
              <h1
                className="gold-text text-shadow-gold font-display font-bold truncate-multiline-2"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 4.5rem)",
                  lineHeight: "1.1",
                  marginBottom: "8px",
                }}
              >
                {title}
              </h1>
            </div>
            {description && (
              <p
                className="text-xs md:text-base lg:text-xl text-white max-w-3xl mx-auto text-shadow-sm truncate-multiline-3"
                style={{ lineHeight: "1.4" }}
              >
                {description}
              </p>
            )}
            {children}
          </div>
        )

      default:
        // If buttonOutside is true, filter out the action button from children
        if (buttonOutside) {
          return children
        }
        return children
    }
  }

  // Determine animation settings based on variant
  const getAnimationSettings = () => {
    const baseSettings = {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
    }

    if (variant === "core-value" || variant === "band-member") {
      return {
        ...baseSettings,
        transition: { duration: 0.5, delay: 0.1 * index },
      }
    }

    return {
      ...baseSettings,
      transition: { duration: 0.7 },
    }
  }

  // Determine additional classes based on variant
  const getAdditionalClasses = () => {
    let classes = "group"

    if (variant === "core-value") {
      classes += " float-animation-subtle"
    }

    if (variant === "gallery-item" || isClickable) {
      classes += " cursor-pointer"
    }

    if (!isNested) {
      classes += " hover-lift"
    }

    return classes
  }

  const animationSettings = getAnimationSettings();

  // Consolidate props for the motion component
  const motionComponentProps: any = {
    ...animationSettings,
    className: `relative rounded-2xl ${
          variant === "gallery-item"
            ? "overflow-hidden"
            : variant === "hero"
              ? "overflow-hidden flex justify-center items-center"
              : "overflow-visible"
    } transition-all duration-500 ${getPadding()} ${getAdditionalClasses()} ${className}`,
    style: {
          ...getBackgroundStyle(),
          animationDelay: variant === "core-value" || variant === "band-member" ? `${index * 0.2}s` : undefined,
          height: variant === "gallery-item" ? "100%" : "auto",
          maxHeight: variant === "hero" ? "calc(100vh - 250px)" : "none",
          minHeight: "fit-content",
    },
  };

  if (onClick) {
    motionComponentProps.onClick = onClick;
  }

  // For static/default variant, render a regular div (no motion)
  if (variant === "default" && !onClick && !actionLink) {
    return (
      <div
        className={`relative rounded-2xl transition-all duration-500 ${getPadding()} ${getAdditionalClasses()} ${className}`}
        style={{
          ...getBackgroundStyle(),
          minHeight: "fit-content",
        }}
      >
        {renderCardContent()}
      </div>
    )
  }

  // Render the card
  // If it's a clickable card with an actionLink, wrap with Link and use motion.a
  if (isClickable && actionLink) {
    // Note: motion.a might also need specific typing if issues arise, but Framer Motion typically handles this.
    return (
      <Link href={actionLink} passHref legacyBehavior>
        <motion.a {...motionComponentProps}>
          {/* Enhanced hover glow effect */}
          {!isNested && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
              style={{
                boxShadow: "0 0 20px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(212, 175, 55, 0.2)",
                borderRadius: "1rem",
                zIndex: 1,
              }}
            ></div>
          )}

          {/* Gradient overlay for depth */}
          {gradientOverlay && !isNested && (
            <div
              className="absolute inset-0 opacity-30 z-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(212, 175, 55, 0.15), transparent 70%), radial-gradient(circle at bottom left, rgba(255, 62, 150, 0.1), transparent 70%)",
              }}
            ></div>
          )}

          {/* Gold sparkle overlay with improved pattern */}
          {sparkleOverlay && !isNested && (
            <div
              className="absolute inset-0 opacity-15 pointer-events-none z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fillOpacity='0.4'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='50' r='0.8'/%3E%3Ccircle cx='50' cy='30' r='1.2'/%3E%3Ccircle cx='70' cy='70' r='0.6'/%3E%3Ccircle cx='90' cy='20' r='1'/%3E%3Ccircle cx='20' cy='90' r='0.8'/%3E%3Ccircle cx='60' cy='10' r='0.5'/%3E%3Ccircle cx='80' cy='40' r='1.2'/%3E%3Ccircle cx='40' cy='80' r='0.9'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "100px 100px",
              }}
            ></div>
          )}

          {/* Animated shimmer points - reduced for performance */}
          {sparkleOverlay && mounted && !isNested && !performanceMode && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {[...Array(performanceMode ? 3 : 12)].map((_, i) => (
                <div
                  key={i}
                  className="shimmer-point"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${15 + Math.random() * 20}s`,
                    willChange: "transform, opacity",
                  }}
                ></div>
              ))}
            </div>
          )}

          {/* Enhanced corner accents with animation - TOP LEFT - INSET */}
          {!isNested && (cornerAccents === "all" || cornerAccents === "top" || cornerAccents === "left") && (
            <div className="absolute top-4 left-4 w-16 h-16 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1,1 L1,20 M1,1 L20,1"
                  stroke="url(#goldGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeOpacity="0.8"
                >
                  <animate attributeName="strokeOpacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
                </path>
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#F8E9A1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {/* Enhanced corner accents with animation - TOP RIGHT - INSET */}
          {!isNested && (cornerAccents === "all" || cornerAccents === "top" || cornerAccents === "right") && (
            <div className="absolute top-4 right-4 w-16 h-16 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M63,1 L63,20 M63,1 L44,1"
                  stroke="url(#goldGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeOpacity="0.8"
                >
                  <animate attributeName="strokeOpacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
          )}

          {/* Enhanced corner accents with animation - BOTTOM LEFT - INSET */}
          {!isNested && (cornerAccents === "all" || cornerAccents === "bottom" || cornerAccents === "left") && (
            <div className="absolute bottom-4 left-4 w-16 h-16 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1,63 L1,44 M1,63 L20,63"
                  stroke="url(#goldGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeOpacity="0.8"
                >
                  <animate attributeName="strokeOpacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
          )}

          {/* Enhanced corner accents with animation - BOTTOM RIGHT - INSET */}
          {!isNested && (cornerAccents === "all" || cornerAccents === "bottom" || cornerAccents === "right") && (
            <div className="absolute bottom-4 right-4 w-16 h-16 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M63,63 L63,44 M63,63 L44,63"
                  stroke="url(#goldGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeOpacity="0.8"
                >
                  <animate attributeName="strokeOpacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
          )}

          {/* Subtle diagonal gold accent lines */}
          {!isNested && (
            <>
              <div
                className="absolute top-[15%] right-[10%] w-[80px] h-[1px] rotate-30 opacity-20 z-0"
                style={{
                  background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                  boxShadow: "0 0 3px #D4AF37",
                }}
              ></div>

              <div
                className="absolute bottom-[20%] left-[15%] w-[100px] h-[1px] -rotate-30 opacity-20 z-0"
                style={{
                  background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                  boxShadow: "0 0 3px #D4AF37",
                }}
              ></div>
            </>
          )}

          {/* Decorative hexagon pattern */}
          {mounted && !isNested && (
            <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="hexPattern"
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
                <rect width="100%" height="100%" fill="url(#hexPattern)" />
              </svg>
            </div>
          )}

          {/* Animated floating particles - reduced for performance */}
          {floatingParticles && mounted && !isNested && !performanceMode && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {[0, 1, 2].map((i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-gold/30"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    filter: "blur(1px)",
                    animation: `float-${(i % 3) + 1} ${10 + Math.random() * 15}s linear infinite`,
                    opacity: 0.4 + Math.random() * 0.3,
                    willChange: "transform",
                  }}
                ></div>
              ))}
            </div>
          )}

          <div className="relative z-20 overflow-visible break-words w-full h-full">{renderCardContent()}</div>
        </motion.a>
      </Link>
    );
  }

  // Default case: render motion.div
  return (
    <>
      <motion.div {...motionComponentProps}>
        {/* Enhanced hover glow effect */}
        {!isNested && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
            style={{
              boxShadow: "0 0 20px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(212, 175, 55, 0.2)",
              borderRadius: "1rem",
              zIndex: 1,
            }}
          ></div>
        )}

        {/* Gradient overlay for depth */}
        {gradientOverlay && !isNested && (
          <div
            className="absolute inset-0 opacity-30 z-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(212, 175, 55, 0.15), transparent 70%), radial-gradient(circle at bottom left, rgba(255, 62, 150, 0.1), transparent 70%)",
            }}
          ></div>
        )}

        {/* Gold sparkle overlay with improved pattern */}
        {sparkleOverlay && !isNested && (
          <div
            className="absolute inset-0 opacity-15 pointer-events-none z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fillOpacity='0.4'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='50' r='0.8'/%3E%3Ccircle cx='50' cy='30' r='1.2'/%3E%3Ccircle cx='70' cy='70' r='0.6'/%3E%3Ccircle cx='90' cy='20' r='1'/%3E%3Ccircle cx='20' cy='90' r='0.8'/%3E%3Ccircle cx='60' cy='10' r='0.5'/%3E%3Ccircle cx='80' cy='40' r='1.2'/%3E%3Ccircle cx='40' cy='80' r='0.9'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "100px 100px",
            }}
          ></div>
        )}

        {/* Animated shimmer points - reduced for performance */}
        {sparkleOverlay && mounted && !isNested && !performanceMode && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(performanceMode ? 3 : 12)].map((_, i) => (
              <div
                key={i}
                className="shimmer-point"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 20}s`,
                  willChange: "transform, opacity",
                }}
              ></div>
            ))}
          </div>
        )}

        {/* Enhanced corner accents with animation - TOP LEFT - INSET */}
        {!isNested && (cornerAccents === "all" || cornerAccents === "top" || cornerAccents === "left") && (
          <div className="absolute top-4 left-4 w-16 h-16 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1,1 L1,20 M1,1 L20,1"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.8"
              >
                <animate attributeName="strokeOpacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
              </path>
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#F8E9A1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}

        {/* Enhanced corner accents with animation - TOP RIGHT - INSET */}
        {!isNested && (cornerAccents === "all" || cornerAccents === "top" || cornerAccents === "right") && (
          <div className="absolute top-4 right-4 w-16 h-16 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M63,1 L63,20 M63,1 L44,1"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.8"
              >
                <animate attributeName="strokeOpacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
        )}

        {/* Enhanced corner accents with animation - BOTTOM LEFT - INSET */}
        {!isNested && (cornerAccents === "all" || cornerAccents === "bottom" || cornerAccents === "left") && (
          <div className="absolute bottom-4 left-4 w-16 h-16 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1,63 L1,44 M1,63 L20,63"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.8"
              >
                <animate attributeName="strokeOpacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
        )}

        {/* Enhanced corner accents with animation - BOTTOM RIGHT - INSET */}
        {!isNested && (cornerAccents === "all" || cornerAccents === "bottom" || cornerAccents === "right") && (
          <div className="absolute bottom-4 right-4 w-16 h-16 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M63,63 L63,44 M63,63 L44,63"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.8"
              >
                <animate attributeName="strokeOpacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
        )}

        {/* Subtle diagonal gold accent lines */}
        {!isNested && (
          <>
            <div
              className="absolute top-[15%] right-[10%] w-[80px] h-[1px] rotate-30 opacity-20 z-0"
              style={{
                background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                boxShadow: "0 0 3px #D4AF37",
              }}
            ></div>

            <div
              className="absolute bottom-[20%] left-[15%] w-[100px] h-[1px] -rotate-30 opacity-20 z-0"
              style={{
                background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                boxShadow: "0 0 3px #D4AF37",
              }}
            ></div>
          </>
        )}

        {/* Decorative hexagon pattern */}
        {mounted && !isNested && (
          <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="hexPattern"
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
              <rect width="100%" height="100%" fill="url(#hexPattern)" />
            </svg>
          </div>
        )}

        {/* Animated floating particles - reduced for performance */}
        {floatingParticles && mounted && !isNested && !performanceMode && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {[0, 1, 2].map((i) => (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-gold/30"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  filter: "blur(1px)",
                  animation: `float-${(i % 3) + 1} ${10 + Math.random() * 15}s linear infinite`,
                  opacity: 0.4 + Math.random() * 0.3,
                  willChange: "transform",
                }}
              ></div>
            ))}
          </div>
        )}

        <div className="relative z-20 overflow-visible break-words w-full h-full">{renderCardContent()}</div>

        {/* Add CSS animations */}
        <style jsx global>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
          
          @keyframes float-1 {
            0% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, -20px) rotate(120deg); }
            66% { transform: translate(-20px, 15px) rotate(240deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
          }
          
          @keyframes float-2 {
            0% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(-25px, -15px) rotate(120deg); }
            66% { transform: translate(15px, 25px) rotate(240deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
          }
          
          @keyframes float-3 {
            0% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(15px, 25px) rotate(120deg); }
            66% { transform: translate(-20px, -15px) rotate(240deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
          }

          .truncate-multiline-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .truncate-multiline-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          /* Add these new styles for text handling */
          .luxury-card-content {
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          }
        `}</style>
      </motion.div>

      {/* Render action button outside the card if buttonOutside is true */}
      {buttonOutside && actionLink && (
        <div className="mt-6">
          <Link
            href={actionLink}
            className="bg-black text-gold font-medium py-2 md:py-4 px-6 md:px-10 rounded-full shadow-md hover:bg-black/80 transition-all duration-300 transform hover:scale-105 border border-gold/50 text-sm md:text-base"
            style={{
              boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
            }}
          >
            {actionText || "Book Now"}
          </Link>
        </div>
      )}
    </>
  )
}

// Keep the LuxuryTitle component with enhanced styling
export function LuxuryTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mb-6 ${className}`}>
      <h2
        className="text-4xl md:text-5xl font-display font-bold gold-text"
        style={{ lineHeight: "1.8", marginBottom: "12px" }}
      >
        {children}
      </h2>
      <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/70 to-transparent mt-2 relative">
        <div className="absolute inset-0 blur-sm bg-gold/30"></div>
      </div>
    </div>
  )
}
