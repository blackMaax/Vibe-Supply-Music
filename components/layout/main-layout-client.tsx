"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import dynamic from 'next/dynamic'
import { ThemeProvider } from "@/components/theme-provider"
import type { SiteSettingsData } from "@/sanity/lib/queries"
import { urlForImage as urlFor } from "@/lib/sanity-image"
import { Suspense } from 'react'

// Lazy load non-critical components with better error handling
const DebugInfo = dynamic(() => import("@/components/layout/debug-info"), {
  ssr: false,
  loading: () => null
})

const CookieBanner = dynamic(() => import("@/components/layout/cookie-banner"), {
  ssr: false,
  loading: () => null
})

// Add Footer as a dynamic import with fallback
const Footer = dynamic(() => import("@/components/layout/footer"), {
  loading: () => <div className="h-32 bg-black/50" />,
  ssr: true
})

// Add PageBackground as a dynamic import
const PageBackground = dynamic(() => import("@/components/layout/page-background"), {
  loading: () => null,
  ssr: false
})

interface MainLayoutClientProps {
  children: React.ReactNode;
  siteSettings: SiteSettingsData | null;
}

export default function MainLayoutClient({ children, siteSettings }: MainLayoutClientProps) {
  const pathname = usePathname()
  const isHomepage = pathname === "/"
  const isStudioRoute = pathname.startsWith("/studio")

  if (isStudioRoute) {
    // For Sanity Studio routes, render children directly, optionally within ThemeProvider if Studio uses it.
    // Studio typically manages its own full-page UI.
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system" // Or a specific theme for the studio if needed
        enableSystem
        disableTransitionOnChange
      >
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </ThemeProvider>
    )
  }

  // Safely get footer logo URL
  let footerLogoUrl: string | null = null;
  try {
    footerLogoUrl = siteSettings?.logoWhite ? urlFor(siteSettings.logoWhite) : null;
  } catch (error) {
    // Silently handle image URL errors
    footerLogoUrl = null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Suspense fallback={null}>
        <PageBackground />
      </Suspense>
      <main className={`min-h-screen relative z-10`}>
        <Suspense fallback={<div className="min-h-screen bg-black/20" />}>
          {children}
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-32 bg-black/50" />}>
        <Footer 
          logoUrl={footerLogoUrl}
          contactEmail={siteSettings?.contactEmail}
          contactPhone={siteSettings?.contactPhone}
          socialLinks={siteSettings?.socialLinks}
          footerText={siteSettings?.footerText}
        />
      </Suspense>
      <Suspense fallback={null}>
        <DebugInfo />
      </Suspense>
      <Suspense fallback={null}>
        <CookieBanner />
      </Suspense>
    </ThemeProvider>
  )
} 