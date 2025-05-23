// "use client" // REMOVED - This is now a Server Component

import type React from "react"
import "./globals.css"
import { Montserrat, Playfair_Display } from "next/font/google"
// ThemeProvider and other layout components moved to MainLayoutClient
import MainLayoutClient from "@/components/layout/main-layout-client" // Import the new client component
import { getSiteSettings, type SiteSettingsData } from "@/sanity/lib/queries" // Corrected import path for SiteSettingsData and getSiteSettings
import { urlFor } from "@/sanity/lib/image"; // Correct import for Sanity image URL builder
import type { Metadata } from 'next' // Import Metadata type
// usePathname import REMOVED

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
})

// metadata can now be safely exported
// We will update this later to use fetched SEO defaults
// export const metadata = {
//   title: "Vibe Supply - Default Title", // Placeholder
//   description: "Default description from layout", // Placeholder
//   // generator: 'v0.dev' // This was here before, keeping it for now
// }

// Function to generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  let faviconUrl = "/favicon.ico"; // Default fallback
  if (settings && settings.favicon && typeof settings.favicon === 'object' && 'asset' in settings.favicon) {
    const builtUrl = urlFor(settings.favicon as any); // Use urlFor, cast for now
    if (builtUrl) {
      faviconUrl = builtUrl;
    }
  }

  return {
    title: settings?.defaultSeoTitle || "Vibe Supply",
    description: settings?.defaultSeoDescription || "High-energy live band for unforgettable events.",
    icons: {
      icon: faviconUrl,
      // You can add other icon types here if configured in Sanity
      // apple: appleIconUrl,
    },
    // Add other metadata fields from settings as needed
    // openGraph: {
    //   title: settings?.defaultSeoTitle || "Vibe Supply",
    //   description: settings?.defaultSeoDescription || "Default description",
    //   images: settings?.defaultSeoImage?.asset?.url ? [getImageUrl(settings.defaultSeoImage.asset as any)] : [],
    // },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await getSiteSettings();
  
  // Log to server console to verify fetching
  // console.log("Fetched Site Settings in RootLayout:", siteSettings);

  // We will pass siteSettings to MainLayoutClient or use it directly here later
  // For now, just fetching and logging (on server side)

  // TODO: Use siteSettings.defaultSeoTitle, etc. to dynamically set metadata
  // For example:
  // export async function generateMetadata(): Promise<Metadata> {
  //   const settings = await getSiteSettings();
  //   return {
  //     title: settings?.defaultSeoTitle || 'Vibe Supply',
  //     description: settings?.defaultSeoDescription || 'Default description',
  //   };
  // }

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
