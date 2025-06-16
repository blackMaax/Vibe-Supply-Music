import Link from "next/link"
import LuxuryCard from "@/components/ui/luxury-card"
import { Metadata } from 'next'

// SEO metadata for Sitemap page
export const metadata: Metadata = {
  title: "Sitemap | Vibe Supply",
  description: "Navigate all pages of Vibe Supply's website to quickly find the information you need.",
  keywords: "website map, page directory, band site structure, find pages easily",
  openGraph: {
    title: "Sitemap | Vibe Supply",
    description: "Navigate all pages of Vibe Supply's website to quickly find the information you need.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitemap | Vibe Supply",
    description: "Navigate all pages of Vibe Supply's website to quickly find the information you need.",
  },
}

export default function SitemapPage() {
  const sitePages = [
    { name: "Home", path: "/", description: "Welcome to Vibe Supply" },
    { name: "About", path: "/about", description: "Meet the band and learn our story" },
    { name: "Packages", path: "/packages", description: "Our premium entertainment packages" },
    { name: "Contact", path: "/contact", description: "Get in touch with us" },
    { name: "Privacy Policy", path: "/privacy", description: "How we protect your data" },
    { name: "Terms & Conditions", path: "/terms", description: "Terms of service" },
    { name: "Cookie Policy", path: "/cookies", description: "Our cookie usage policy" },
    { name: "Legal", path: "/legal", description: "Legal information" },
  ]

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <LuxuryCard className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 gold-text">
              Sitemap
            </h1>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-4 mx-auto"></div>
            <p className="text-white/80 text-lg">
              Find all pages on our website
            </p>
          </div>

          <div className="space-y-4">
            {sitePages.map((page, index) => (
              <div key={index} className="border-b border-gold/20 pb-4">
                <Link 
                  href={page.path}
                  className="block hover:bg-black/20 p-4 rounded-lg transition-colors"
                >
                  <h3 className="text-xl font-bold gold-text mb-2">{page.name}</h3>
                  <p className="text-white/70 text-sm">{page.description}</p>
                  <span className="text-gold/60 text-xs">{page.path}</span>
                </Link>
              </div>
            ))}
          </div>
        </LuxuryCard>
      </div>
    </main>
  )
}
