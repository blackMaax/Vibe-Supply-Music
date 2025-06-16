import ContactFormSection from "@/components/home/contact-form-section";
import { getSiteSettingsOptimized, getContactSectionData } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity-image";
import type { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/layout/navbar';

// SEO metadata for Contact page
export const metadata: Metadata = {
  title: "Contact Vibe Supply | Book Live Music for Your Event",
  description: "Get in touch with Vibe Supply to check availability, request a quote, or discuss your wedding or event entertainment needs.",
  keywords: "contact live band, book a wedding band, music enquiry, event availability, hire a function band, get a quote, band enquiry form, booking request, contact musicians, spam protection, secure form, contact confirmation, live band email, response automation",
  openGraph: {
    title: "Contact Vibe Supply | Book Live Music for Your Event",
    description: "Get in touch with Vibe Supply to check availability, request a quote, or discuss your wedding or event entertainment needs.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Vibe Supply | Book Live Music for Your Event",
    description: "Get in touch with Vibe Supply to check availability, request a quote, or discuss your wedding or event entertainment needs.",
  },
};

// Add revalidation
export const revalidate = 60; // Or set to a higher value like 60 for production

export default async function ContactPage() {
  const siteSettings = await getSiteSettingsOptimized();
  const contactSectionData = await getContactSectionData();
  
  if (!siteSettings) {
    return <div>Error loading site settings</div>;
  }

  const logoToDisplay = siteSettings?.logo?.asset ? urlForImage(siteSettings.logo) : "/placeholder.svg";

  // Get the contact image from Sanity or fallback
  const imageSrc = contactSectionData?.featuredImageCard?.image
    ? urlForImage(contactSectionData.featuredImageCard.image)
    : "/placeholder.jpg";

  const contactFormProps = {
    title: contactSectionData?.sectionTitle || "Get in Touch",
    subtitle: contactSectionData?.sectionSubtitle || "Ready to elevate your event? Contact us.",
    imageSrc: imageSrc || "/placeholder.jpg",
    imageAlt: contactSectionData?.featuredImageCard?.imageAlt || "Contact Vibe Supply",
    featuredImageTitle: contactSectionData?.featuredImageCard?.imageTitle,
    featuredImageSubtitle: contactSectionData?.featuredImageCard?.imageSubtitle,
    contactEmail: siteSettings?.contactEmail,
    contactPhone: siteSettings?.contactPhone,
    socialLinks: siteSettings?.socialLinks,
  };

  return (
    <main className="pt-10 md:pt-12">
      {logoToDisplay && (
        <div className="container mx-auto px-4 mb-8 flex justify-center">
          <Image 
            src={logoToDisplay}
            alt={siteSettings?.logo?.alt || "Vibe Supply Logo"}
            width={850}
            height={340}
            className="object-contain h-52 sm:h-60 md:h-72 lg:h-80 w-auto"
            priority
          />
        </div>
      )}

      <Navbar />

      <ContactFormSection {...contactFormProps} />
    </main>
  );
} 