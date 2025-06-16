// "use client" // REMOVED - This is now a Server Component

import type React from "react"
import "./globals.css"
import { Montserrat, Playfair_Display } from "next/font/google"
// ThemeProvider and other layout components moved to MainLayoutClient
import MainLayoutClient from "@/components/layout/main-layout-client" // Import the new client component
import { getSiteSettings, type SiteSettingsData } from "@/sanity/lib/queries" // Corrected import path for SiteSettingsData and getSiteSettings
import { urlFor } from "@/sanity/lib/image"; // Correct import for Sanity image URL builder
import type { Metadata, Viewport } from 'next' // Import Metadata and Viewport types
// usePathname import REMOVED

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', 'arial'],
  weight: ['300', '400', '500', '600', '700'], // Only load needed weights
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['Georgia', 'serif'],
  weight: ['400', '500', '600', '700'], // Only load needed weights
})

// Viewport configuration - separated from metadata
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

// Hardcoded SEO metadata - optimized with user keywords
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  let faviconUrl = "/favicon.ico"; // Default fallback
  if (settings && settings.favicon && typeof settings.favicon === 'object' && 'asset' in settings.favicon) {
    const builtUrl = urlFor(settings.favicon as any);
    if (builtUrl) {
      faviconUrl = builtUrl;
    }
  }

  return {
    title: "Live Wedding & Event Band | Vibe Supply UK",
    description: "High-energy live music for weddings, parties, and events. Vibe Supply brings unforgettable performances across the UK with top-tier musicians.",
    keywords: "live band for hire, wedding band UK, event entertainment, party band, function band, cover band, live music UK, soul band, club band hire",
    icons: {
      icon: faviconUrl,
    },
    robots: 'index, follow',
    openGraph: {
      title: "Live Wedding & Event Band | Vibe Supply UK",
      description: "High-energy live music for weddings, parties, and events. Vibe Supply brings unforgettable performances across the UK with top-tier musicians.",
      type: "website",
      siteName: "Vibe Supply",
    },
    twitter: {
      card: "summary_large_image",
      title: "Live Wedding & Event Band | Vibe Supply UK",
      description: "High-energy live music for weddings, parties, and events. Vibe Supply brings unforgettable performances across the UK with top-tier musicians.",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await getSiteSettings();

  let bodyStyle = {};
  // Check if siteSettings and siteBackgroundImage and its asset exist
  if (siteSettings && siteSettings.siteBackgroundImage && siteSettings.siteBackgroundImage.asset) {
    const bgImageUrl = urlFor(siteSettings.siteBackgroundImage); // urlFor now returns string or null
    if (bgImageUrl) {
      bodyStyle = {
        backgroundImage: `url("${bgImageUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      };
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body 
        className={`${montserrat.variable} ${playfairDisplay.variable} font-sans scroll-smooth`}
        style={bodyStyle}
      >
        {/* Pass siteSettings to MainLayoutClient if it needs it, or use a Context Provider */}
        <MainLayoutClient siteSettings={siteSettings}>{children}</MainLayoutClient>
      </body>
    </html>
  )
}
