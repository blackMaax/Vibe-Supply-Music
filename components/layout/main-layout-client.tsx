"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageBackground from "@/components/layout/page-background"
import DebugInfo from "@/components/layout/debug-info"
import CookieBanner from "@/components/layout/cookie-banner"
import type { SiteSettingsData } from "@/sanity/lib/queries"
import { urlForImage as urlFor } from "@/lib/sanity-image"

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