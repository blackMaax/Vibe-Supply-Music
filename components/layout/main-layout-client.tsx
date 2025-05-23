"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import dynamic from 'next/dynamic'
import { ThemeProvider } from "@/components/theme-provider"
import type { SiteSettingsData } from "@/sanity/lib/queries"
import { urlForImage as urlFor } from "@/lib/sanity-image"

// Lazy load non-critical components
const DebugInfo = dynamic(() => import("@/components/layout/debug-info"), {
  ssr: false,
  loading: () => null
})

const CookieBanner = dynamic(() => import("@/components/layout/cookie-banner"), {
  ssr: false,
  loading: () => null
})

// Add Footer as a dynamic import
const Footer = dynamic(() => import("@/components/layout/footer"), {
  loading: () => <div className="h-32 bg-black/50" />
})

// Add PageBackground as a dynamic import
const PageBackground = dynamic(() => import("@/components/layout/page-background"), {
  loading: () => null
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
        {children} 
      </ThemeProvider>
    )
  }

  // Default layout for the rest of the site
  const footerLogoUrl = siteSettings?.logoWhite ? urlFor(siteSettings.logoWhite) : null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PageBackground />
      <main className={`min-h-screen relative z-10`}>
        {children}
      </main>
      <Footer 
        logoUrl={footerLogoUrl}
        contactEmail={siteSettings?.contactEmail}
        contactPhone={siteSettings?.contactPhone}
        socialLinks={siteSettings?.socialLinks}
        footerText={siteSettings?.footerText}
      />
      <DebugInfo />
      <CookieBanner />
    </ThemeProvider>
  )
} 