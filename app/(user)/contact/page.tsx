import ContactFormSection from "@/components/home/contact-form-section";
import { getContactSectionData, getSiteSettings } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity-image";
import type { Metadata } from 'next';

// Add revalidation
export const revalidate = 0; // Or set to a higher value like 60 for production

// Basic metadata, can be enhanced with Sanity data later if needed
export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Vibe Supply for your event needs.',
};

export default async function ContactPage() {
  const contactSectionData = await getContactSectionData();
  const siteSettings = await getSiteSettings(); // For global contact info like email/phone

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
    <main>
      <ContactFormSection {...contactFormProps} />
    </main>
  );
} 