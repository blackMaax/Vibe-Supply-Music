// "use client" // REMOVED - This is now a Server Component

import type React from "react"
import "./globals.css"
import { Montserrat, Playfair_Display } from "next/font/google"
// ThemeProvider and other layout components moved to MainLayoutClient
import MainLayoutClient from "@/components/layout/main-layout-client" // Import the new client component
import { getSiteSettings, type SiteSettingsData } from "@/sanity/lib/queries" // Import the fetch function and type
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
export const metadata = {
  title: "Vibe Supply - Default Title", // Placeholder
  description: "Default description from layout", // Placeholder
  // generator: 'v0.dev' // This was here before, keeping it for now
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSettings: SiteSettingsData | null = await getSiteSettings();
  
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

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${playfairDisplay.variable} font-sans scroll-smooth`}>
        {/* Pass siteSettings to MainLayoutClient if it needs it, or use a Context Provider */}
        <MainLayoutClient siteSettings={siteSettings}>{children}</MainLayoutClient>
      </body>
    </html>
  )
}
