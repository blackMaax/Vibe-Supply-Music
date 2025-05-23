// A simple, reliable image loader that works in both development and production
export const getImageUrl = (key: string): string => {
  // Cloudinary URLs
  const imageMap: Record<string, string> = {
    // Logo
    logo: "https://res.cloudinary.com/dtowd0j7j/image/upload/v1746189493/vibe_supply_pink_quavers-2_ejbm30.png",
    logoWhite: "https://res.cloudinary.com/dtowd0j7j/image/upload/v1746189493/vibe_supply_pink_quavers-2_ejbm30.png",

    // Hero
    heroImage:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1746194928/WhatsApp_Image_2025-04-20_at_22.27.19_78e42c49_mel962.jpg",

    // Band members
    bandMember1: "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696573/IMG-20250420-WA0012_ah4rsa.jpg",
    bandMember2: "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696573/IMG-20250420-WA0008_zphxeq.jpg",
    bandMember3: "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696572/IMG-20250420-WA0010_eejakt.jpg",

    // Performances
    performance1:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696121/artem-polezhaev-1P9ZVlqMmAw-unsplash_1_vablvm.jpg",
    performance2:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696119/bernie-almanzar-wiHKRoNKJYw-unsplash_1_ngk0qu.jpg",
    performance3:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696119/hamza-nouasria--3pvRUfQc-c-unsplash_1_y0aww7.jpg",
    performance4:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696119/jim-nyamao-B5DIuNGvEvM-unsplash_1_enecup.jpg",
    performance11: "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696117/IMG-20250420-WA0011_sws2s7.jpg",

    // Gallery
    gallery1:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696121/artem-polezhaev-1P9ZVlqMmAw-unsplash_1_vablvm.jpg",
    gallery2:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696119/bernie-almanzar-wiHKRoNKJYw-unsplash_1_ngk0qu.jpg",
    gallery3:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696119/hamza-nouasria--3pvRUfQc-c-unsplash_1_y0aww7.jpg",
    gallery4:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696119/jim-nyamao-B5DIuNGvEvM-unsplash_1_enecup.jpg",
    gallery5:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696118/kari-bjorn-photography-mF-K6v-fIqg-unsplash_1_ffdtax.jpg",
    gallery6:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696119/cord-allman-hHg9eWmvaP0-unsplash_1_lstbvu.jpg",
    gallery7:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696118/jim-nyamao-2_D8oTC10Sk-unsplash_1_pftrxm.jpg",
    gallery8:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696117/alan-morales-6FhP-g2M1xc-unsplash_1_f5brcu.jpg",
    gallery9:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696118/jahanzeb-ahsan-im7H-OKyrug-unsplash_1_lyy4pr.jpg",

    // Fallbacks
    fallback:
      "https://res.cloudinary.com/dtowd0j7j/image/upload/v1745696119/jim-nyamao-B5DIuNGvEvM-unsplash_1_enecup.jpg",
  }

  // Return the URL if it exists, otherwise return a placeholder
  return imageMap[key] || `/placeholder.svg?height=600&width=800&text=${key}`
}

// Function to get gallery image with index-based fallback
export const getGalleryImage = (index: number): string => {
  const galleryKeys = [
    "gallery1",
    "gallery2",
    "gallery3",
    "gallery4",
    "gallery5",
    "gallery6",
    "gallery7",
    "gallery8",
    "gallery9",
  ]

  // Use modulo to cycle through available gallery images
  const key = galleryKeys[index % galleryKeys.length]
  return getImageUrl(key)
}
