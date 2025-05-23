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

// Direct image URLs that are guaranteed to work
export const directImageUrls = {
  logo: "https://res.cloudinary.com/dtowd0j7j/image/upload/v1746711559/vibe_supply_pink_quavers_u7uowi.png",
  logoWhite: "https://res.cloudinary.com/dtowd0j7j/image/upload/v1746711559/vibe_supply_pink_quavers_u7uowi.png",
  heroImage:
    "https://res.cloudinary.com/dtowd0j7j/image/upload/v1746194928/WhatsApp_Image_2025-04-20_at_22.27.19_78e42c49_mel962.jpg",
  performance1:
    "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696121/artem-polezhaev-1P9ZVlqMmAw-unsplash_1_vablvm.jpg",
  performance2:
    "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696119/bernie-almanzar-wiHKRoNKJYw-unsplash_1_ngk0qu.jpg",
  performance3:
    "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696119/hamza-nouasria--3pvRUfQc-c-unsplash_1_y0aww7.jpg",
  performance4:
    "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696119/jim-nyamao-B5DIuNGvEvM-unsplash_1_enecup.jpg",
  performance5:
    "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696118/kari-bjorn-photography-mF-K6v-fIqg-unsplash_1_ffdtax.jpg",
  performance6:
    "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696119/cord-allman-hHg9eWmvaP0-unsplash_1_lstbvu.jpg",
  performance7:
    "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696118/jim-nyamao-2_D8oTC10Sk-unsplash_1_pftrxm.jpg",
  performance8:
    "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696117/alan-morales-6FhP-g2M1xc-unsplash_1_f5brcu.jpg",
  performance9:
    "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696118/jahanzeb-ahsan-im7H-OKyrug-unsplash_1_lyy4pr.jpg",
  performance10:
    "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696117/nice-m-nshuti-ZtVLotTFjhs-unsplash_1_duoyx2.jpg",
  performance11: "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696117/IMG-20250420-WA0011_sws2s7.jpg",
  bandMember1: "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696573/IMG-20250420-WA0012_ah4rsa.jpg",
  bandMember2: "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696573/IMG-20250420-WA0008_zphxeq.jpg",
  bandMember3: "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696572/IMG-20250420-WA0010_eejakt.jpg",
  bandMember4: "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696573/IMG-20250420-WA0009_gppdgf.jpg",
  goldBackground:
    "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696122/designecologist-At-k-FQrwJM-unsplash_1_jvndd7.jpg",
}

// Function to get an image URL with fallback
export function getImageUrl(key: string): string {
  // If we have a direct URL for this key, use it
  if (key in directImageUrls) {
    return directImageUrls[key as keyof typeof directImageUrls]
  }

  // Otherwise use a placeholder
  return `/placeholder.svg?height=600&width=800&text=${key}`
}

// Function to get a gallery image
export function getGalleryImage(index: number): string {
  const galleryKeys = [
    "performance1",
    "performance2",
    "performance3",
    "performance4",
    "performance5",
    "performance6",
    "performance7",
    "performance8",
    "performance9",
  ]

  // Use modulo to cycle through available gallery images
  const key = galleryKeys[index % galleryKeys.length]
  return getImageUrl(key)
}
