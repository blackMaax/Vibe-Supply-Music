// Static data to completely replace Sanity API calls
export const staticData = {
  homepage: {
    headline: "Make Your Event Unforgettable",
    subheadline: "Live music for weddings & private events",
    ctaText: "Book a Consultation",
    heroImage: null,
  },

  testimonials: [
    {
      name: "Sarah & James",
      quote:
        "Vibe Supply transformed our wedding into an unforgettable celebration. Their energy was infectious and they had everyone on the dance floor all night long.",
      image: null,
    },
    {
      name: "Michael Thompson",
      quote:
        "We hired Vibe Supply for our corporate event and they were incredibly professional. Their performance was the highlight of the evening!",
      image: null,
    },
    {
      name: "Emma & David",
      quote:
        "The band was amazing! They learned our first dance song and performed it beautifully. All our guests were impressed with their talent and style.",
      image: null,
    },
  ],

  packages: [
    {
      tier: "Silver",
      title: "Standard",
      lineup: ["Lead Vocalist", "Guitarist", "Bassist", "Drummer"],
      djType: "Standard",
      description: [],
      isHighlighted: false,
    },
    {
      tier: "Gold",
      title: "Premium",
      lineup: ["Lead Vocalist", "Guitarist", "Bassist", "Drummer", "Keyboardist"],
      djType: "Premium",
      description: [],
      isHighlighted: false,
    },
    {
      tier: "Diamond",
      title: "Luxury",
      lineup: ["Lead Vocalist", "Guitarist", "Bassist", "Drummer", "Keyboardist", "Saxophonist"],
      djType: "Luxury",
      description: [],
      isHighlighted: true,
    },
  ],

  about: {
    title: "About Vibe Supply",
    body: [],
    images: [],
  },

  gallery: {
    images: Array(9)
      .fill(0)
      .map((_, i) => ({
        _key: `gallery-${i}`,
        alt: `Gallery image ${i + 1}`,
        caption: `Performance ${i + 1}`,
        asset: { _ref: "" },
      })),
  },

  contact: {
    email: "info@vibesupply.com",
    socialLinks: ["https://instagram.com", "https://facebook.com", "https://twitter.com"],
  },
}

// Function to get a placeholder image URL
export function getPlaceholderUrl(key: string): string {
  return `/placeholder.svg?height=600&width=800&text=${key}`
}

// Function to get a gallery image from Sanity
export function getGalleryImage(index: number, images: any[] = []): string {
  if (images && images.length > 0) {
    const image = images[index % images.length]
    return image?.url || getPlaceholderUrl('gallery')
  }
  return getPlaceholderUrl('gallery')
}
