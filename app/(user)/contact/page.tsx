import ContactFormSection from "@/components/home/contact-form-section";
import { getContactSectionData, getSiteSettings } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity-image";
import type { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/layout/navbar';

// Add revalidation
export const revalidate = 30; // Or set to a higher value like 60 for production

// Basic metadata, can be enhanced with Sanity data later if needed
export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Vibe Supply for your event needs.',
};

export default async function ContactPage() {
  const contactSectionData = await getContactSectionData();
  const siteSettings = await getSiteSettings(); // For global contact info like email/phone

  const logoToDisplay = siteSettings?.logo?.asset ? urlForImage(siteSettings.logo) : "/placeholder.svg";

  const imageSrc = contactSectionData?.featuredImageCard?.image
    ? urlForImage(contactSectionData.featuredImageCard.image)
    : "/placeholder-contact.jpg"; // Fallback image

  const contactFormProps = {
    title: contactSectionData?.sectionTitle,
    subtitle: contactSectionData?.sectionSubtitle,
    imageSrc: imageSrc || "/placeholder-contact.jpg",
    imageAlt: contactSectionData?.featuredImageCard?.imageAlt,
    featuredImageTitle: contactSectionData?.featuredImageCard?.imageTitle,
    featuredImageSubtitle: contactSectionData?.featuredImageCard?.imageSubtitle,
    contactEmail: siteSettings?.contactEmail,
    contactPhone: siteSettings?.contactPhone,
    socialLinks: siteSettings?.socialLinks,
  };

  return (
    <main className="pt-6">
      {logoToDisplay && (
        <div className="container mx-auto px-4 mb-6 sm:mb-7 md:mb-8 flex justify-center">
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