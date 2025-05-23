"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, type HTMLMotionProps } from "framer-motion"
import { X } from "lucide-react"
import { urlForImage } from "@/lib/sanity-image"
import LuxuryCard from "@/components/ui/luxury-card"

interface GalleryImage {
  _key: string
  alt?: string
  caption?: string
  asset: {
    _ref: string
    url?: string
  }
}

interface GalleryGridProps {
  images: GalleryImage[]
  performanceMode?: boolean
}

// Create a properly typed motion div component that accepts HTML attributes
const MotionDiv = motion<HTMLMotionProps<"div">>("div")

const GalleryGrid = ({ images = [], performanceMode = false }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [viewportWidth, setViewportWidth] = useState<number>(0)

  // Update viewport width on mount and resize
  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth)
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Calculate appropriate image sizes based on viewport
  const getImageSize = (isFullscreen: boolean = false) => {
    if (isFullscreen) {
      // For fullscreen view, use viewport width
      return { width: viewportWidth, height: Math.round(viewportWidth * 0.75) }
    }
    // For grid view, use smaller sizes
    if (viewportWidth >= 1536) return { width: 800, height: 600 } // 2xl
    if (viewportWidth >= 1280) return { width: 600, height: 450 } // xl
    if (viewportWidth >= 1024) return { width: 500, height: 375 } // lg
    if (viewportWidth >= 768) return { width: 400, height: 300 }  // md
    return { width: 300, height: 225 } // sm and below
  }

  // Get image URL from Sanity with appropriate size
  const getImageSrc = (image: GalleryImage, isFullscreen: boolean = false): string => {
    const size = getImageSize(isFullscreen)
    return urlForImage(image, size.width, size.height) || "/placeholder.svg?height=600&width=800&text=gallery"
  }

  // If no images are provided, use fallback data
  const fallbackImages = [
    {
      _key: "1",
      alt: "Wedding performance",
      caption: "Wedding Reception",
      asset: { _ref: "" },
    },
    {
      _key: "2",
      alt: "Corporate event",
      caption: "Corporate Event",
      asset: { _ref: "" },
    },
    {
      _key: "3",
      alt: "Private party",
      caption: "Private Party",
      asset: { _ref: "" },
    },
    {
      _key: "4",
      alt: "Live performance",
      caption: "Live Performance",
      asset: { _ref: "" },
    },
    {
      _key: "5",
      alt: "Band setup",
      caption: "Band Setup",
      asset: { _ref: "" },
    },
    {
      _key: "6",
      alt: "Audience dancing",
      caption: "Audience Dancing",
      asset: { _ref: "" },
    },
    {
      _key: "7",
      alt: "Concert lighting",
      caption: "Concert Lighting",
      asset: { _ref: "" },
    },
    {
      _key: "8",
      alt: "Backstage preparation",
      caption: "Backstage Preparation",
      asset: { _ref: "" },
    },
  ]

  const displayImages = images.length > 0 ? images : fallbackImages

  const imageToDisplay = selectedImage || { _key: '', asset: { _ref: '' } }; // Ensure selectedImage isn't null
  const selectedImageSrc = selectedImage ? getImageSrc(selectedImage) : null;

  return (
    <div className="relative w-full">
      {/* Grid view */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayImages.map((img, index) => (
          <MotionDiv
            key={img._key || `gallery-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={getImageSrc(img)}
              alt={img.alt || "Gallery image"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority={index < 4} // Prioritize loading first 4 images
            />
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-sm">
                {img.caption}
              </div>
            )}
          </MotionDiv>
        ))}
      </div>

      {/* Fullscreen view */}
      {selectedImage && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
            <Image
              src={getImageSrc(selectedImage, true)}
              alt={selectedImage.alt || "Gallery image"}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
            >
              <X className="w-6 h-6" />
            </button>
            {selectedImage.caption && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 p-4 text-white rounded-lg">
                {selectedImage.caption}
              </div>
            )}
          </div>
        </MotionDiv>
      )}
    </div>
  )
}

export default GalleryGrid
