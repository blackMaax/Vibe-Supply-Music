import { getImageUrl } from "./static-data"
import type { PackageFeature } from "@/components/packages/package-card"
import type { FAQ as FAQComponentType } from "@/components/packages/faq-section"
import type { Testimonial } from "@/components/packages/testimonial-section"

// Define a type for the image that aligns with potential Sanity structure
export interface SanityImageObject {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

// Update the FAQ interface to include an optional image
export interface FAQ extends FAQComponentType {
  image?: SanityImageObject | string; // Allow either Sanity object or simple string for placeholders
}

export interface PackageData {
  id: string
  name: string
  price: string
  description: string
  features: PackageFeature[]
  imageSrc: string
  popular?: boolean
}

export const packages: PackageData[] = [
  {
    id: "diamond",
    name: "Diamond Package",
    price: "£3,500",
    description: "Our premium all-inclusive entertainment package",
    popular: true,
    imageSrc: getImageUrl("performance1"),
    features: [
      { text: "Full 5-piece band for up to 3 hours", highlighted: true },
      { text: "Professional DJ service for up to 5 hours", highlighted: true },
      { text: "Custom song requests (up to 3 songs)" },
      { text: "Professional sound system & lighting" },
      { text: "Dedicated sound engineer" },
      { text: "Early setup & soundcheck" },
      { text: "MC services for announcements" },
      { text: "Acoustic ceremony music" },
    ],
  },
  {
    id: "vip",
    name: "VIP Package",
    price: "£2,500",
    description: "Perfect for weddings and medium-sized events",
    imageSrc: getImageUrl("performance2"),
    features: [
      { text: "Full 5-piece band for up to 2 hours" },
      { text: "Professional DJ service for up to 4 hours" },
      { text: "Custom song requests (1 song)" },
      { text: "Professional sound system & lighting" },
      { text: "Dedicated sound engineer" },
      { text: "Standard setup & soundcheck" },
      { text: "MC services for announcements" },
    ],
  },
  {
    id: "elite",
    name: "Elite Package",
    price: "£1,800",
    description: "Great for smaller events and intimate gatherings",
    imageSrc: getImageUrl("performance3"),
    features: [
      { text: "3-piece band for up to 2 hours" },
      { text: "Professional DJ service for up to 3 hours" },
      { text: "Professional sound system" },
      { text: "Basic lighting setup" },
      { text: "Standard setup & soundcheck" },
    ],
  },
]

export const comparisonFeatures = [
  { name: "Full 5-piece band", diamond: true, vip: true, elite: false },
  { name: "3-piece band", diamond: false, vip: false, elite: true },
  { name: "Professional DJ service", diamond: true, vip: true, elite: true },
  { name: "Custom song requests", diamond: true, vip: true, elite: false },
  { name: "Professional sound system", diamond: true, vip: true, elite: true },
  { name: "Premium lighting", diamond: true, vip: true, elite: false },
  { name: "Dedicated sound engineer", diamond: true, vip: true, elite: false },
  { name: "Early setup & soundcheck", diamond: true, vip: false, elite: false },
  { name: "MC services", diamond: true, vip: true, elite: false },
  { name: "Acoustic ceremony music", diamond: true, vip: false, elite: false },
]

export const packageFAQs: FAQ[] = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 6-9 months in advance for weddings and 3-6 months for other events to ensure availability, especially during peak season (May-September).",
    image: getImageUrl("performance1")
  },
  {
    question: "Can you perform our first dance song live?",
    answer:
      "Yes! We can learn and perform your first dance song live with our Diamond and VIP packages. This is included in your custom song requests.",
    image: getImageUrl("performance1")
  },
  {
    question: "Do you provide all the equipment needed?",
    answer:
      "Yes, all our packages include a complete professional sound system, microphones, and lighting appropriate for the package level. We're entirely self-contained.",
    image: getImageUrl("performance1")
  },
  {
    question: "How much space do you need to set up?",
    answer:
      "For our full 5-piece band, we ideally need a space of approximately 4m x 3m. For our 3-piece configuration, we need about 3m x 2m. We can be flexible depending on your venue.",
    image: getImageUrl("performance1")
  },
  {
    question: "Can we see you perform before booking?",
    answer:
      "We occasionally perform at showcase events which are open to potential clients. Contact us for our upcoming showcase dates or to view video recordings of our recent performances.",
    image: getImageUrl("performance1")
  },
  {
    question: "What happens if a band member is ill on the day?",
    answer:
      "We maintain a network of professional musicians who can step in if needed. In the unlikely event of illness, we guarantee to provide a replacement of equal caliber so your event can proceed as planned.",
    image: getImageUrl("performance1")
  },
]

export const packageTestimonials: Testimonial[] = [
  {
    quote:
      "Vibe Supply made our wedding absolutely unforgettable! The dance floor was packed all night, and our guests are still talking about how amazing the band was.",
    author: "Sarah & James",
    event: "Wedding at The Grand Hotel",
    imageSrc: "/happy-couple-park.png",
    package: "Diamond",
  },
  {
    quote:
      "Booking the VIP package was the best decision we made for our corporate event. Professional, talented, and they read the room perfectly.",
    author: "Michael Thompson",
    event: "Annual Corporate Gala",
    imageSrc: "/confident-businessman.png",
    package: "VIP",
  },
  {
    quote:
      "The Elite package was perfect for our intimate birthday celebration. The trio created exactly the atmosphere we wanted, and the DJ kept everyone dancing afterward.",
    author: "Emma Wilson",
    event: "40th Birthday Party",
    imageSrc: "/diverse-woman-smiling.png",
    package: "Elite",
  },
]
