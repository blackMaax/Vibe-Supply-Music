import LuxuryCard from "@/components/ui/luxury-card"
import { Metadata } from 'next'

// SEO metadata for Cookies page
export const metadata: Metadata = {
  title: "Cookie Policy | Vibe Supply",
  description: "Find out how we use cookies to improve your experience and website functionality.",
  keywords: "cookie usage, tracking policy, cookie consent UK, website analytics",
  openGraph: {
    title: "Cookie Policy | Vibe Supply",
    description: "Find out how we use cookies to improve your experience and website functionality.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | Vibe Supply",
    description: "Find out how we use cookies to improve your experience and website functionality.",
  },
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <LuxuryCard className="p-8 md:p-12">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-8 gold-text text-center">
              Cookie Policy
            </h1>
            
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-8 mx-auto"></div>

            <div className="space-y-6 text-white/90 leading-relaxed">
              <p className="text-lg">
                This Cookie Policy explains how Vibe Supply uses cookies and similar technologies to recognize you when you visit our website.
              </p>

              <h2 className="text-2xl font-semibold gold-text mt-8 mb-4">What are cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                Cookies are widely used by website owners to make their websites work, or to work more efficiently, 
                as well as to provide reporting information.
              </p>

              <h2 className="text-2xl font-semibold gold-text mt-8 mb-4">How we use cookies</h2>
              <p>
                We use cookies for several reasons:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To ensure our website functions properly</li>
                <li>To analyze how visitors use our website</li>
                <li>To improve user experience</li>
                <li>To remember your preferences</li>
              </ul>

              <h2 className="text-2xl font-semibold gold-text mt-8 mb-4">Your choices regarding cookies</h2>
              <p>
                If you prefer to remove or disable cookies, you can do so through your browser settings. 
                However, please note that removing or disabling cookies may affect the functionality of our website.
              </p>

              <h2 className="text-2xl font-semibold gold-text mt-8 mb-4">Contact us</h2>
              <p>
                If you have any questions about our Cookie Policy, please contact us through our contact form.
              </p>
            </div>
          </div>
        </LuxuryCard>
      </div>
    </main>
  )
}
