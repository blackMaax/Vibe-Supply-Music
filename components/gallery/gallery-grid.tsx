"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { getGalleryImage } from "@/lib/static-data"
import LuxuryCard from "@/components/ui/luxury-card"

interface GalleryImage {
  _key: string
  alt?: string
  caption?: string
  asset: {
    _ref: string
  }
}

interface GalleryGridProps {
  images: GalleryImage[]
  performanceMode?: boolean
}

const GalleryGrid = ({ images = [], performanceMode = false }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

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

  // Get image URL with fallback
  const getImageSrc = (index: number): string => {
    return getGalleryImage(index)
  }

  const imageToDisplay = selectedImage || { _key: '', asset: { _ref: '' } }; // Ensure selectedImage isn't null
  const selectedImageSrc = selectedImage ? getImageSrc(displayImages.findIndex(img => img._key === selectedImage._key)) : null;

  return (
    <>
      {/* Custom grid layout based on the sketch */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Large vertical tile on the left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "100px" }}
          className="md:row-span-2 h-[500px] md:h-auto"
          style={{ willChange: "opacity, transform" }}
        >
          <LuxuryCard
            variant="gallery-item"
            className="h-full"
            title={(displayImages[0] && displayImages[0].caption) || "Performance 1"}
            imageSrc={getImageSrc(0) || "/placeholder.svg"}
            imageAlt={(displayImages[0] && displayImages[0].alt) || "Gallery image 1"}
            onClick={() => displayImages[0] && setSelectedImage(displayImages[0])}
            performanceMode={performanceMode}
            floatingParticles={!performanceMode}
            sparkleOverlay={!performanceMode}
          />
        </motion.div>

        {/* Two square tiles side by side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, margin: "100px" }}
          className="h-[240px]"
          style={{ willChange: "opacity, transform" }}
        >
          <LuxuryCard
            variant="gallery-item"
            className="h-full"
            title={(displayImages[1] && displayImages[1].caption) || "Performance 2"}
            imageSrc={getImageSrc(1) || "/placeholder.svg"}
            imageAlt={(displayImages[1] && displayImages[1].alt) || "Gallery image 2"}
            onClick={() => displayImages[1] && setSelectedImage(displayImages[1])}
            performanceMode={performanceMode}
            floatingParticles={!performanceMode}
            sparkleOverlay={!performanceMode}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "100px" }}
          className="h-[240px]"
          style={{ willChange: "opacity, transform" }}
        >
          <LuxuryCard
            variant="gallery-item"
            className="h-full"
            title={(displayImages[2] && displayImages[2].caption) || "Performance 3"}
            imageSrc={getImageSrc(2) || "/placeholder.svg"}
            imageAlt={(displayImages[2] && displayImages[2].alt) || "Gallery image 3"}
            onClick={() => displayImages[2] && setSelectedImage(displayImages[2])}
            performanceMode={performanceMode}
            floatingParticles={!performanceMode}
            sparkleOverlay={!performanceMode}
          />
        </motion.div>

        {/* Full-width rectangle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "100px" }}
          className="md:col-span-3 h-[300px]"
          style={{ willChange: "opacity, transform" }}
        >
          <LuxuryCard
            variant="gallery-item"
            className="h-full"
            title={(displayImages[3] && displayImages[3].caption) || "Performance 4"}
            imageSrc={getImageSrc(3) || "/placeholder.svg"}
            imageAlt={(displayImages[3] && displayImages[3].alt) || "Gallery image 4"}
            onClick={() => displayImages[3] && setSelectedImage(displayImages[3])}
            performanceMode={performanceMode}
            floatingParticles={!performanceMode}
            sparkleOverlay={!performanceMode}
          />
        </motion.div>

        {/* Wide horizontal rectangle and tall rectangle side by side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true, margin: "100px" }}
          className="md:col-span-2 h-[250px]"
          style={{ willChange: "opacity, transform" }}
        >
          <LuxuryCard
            variant="gallery-item"
            className="h-full"
            title={(displayImages[4] && displayImages[4].caption) || "Performance 5"}
            imageSrc={getImageSrc(4) || "/placeholder.svg"}
            imageAlt={(displayImages[4] && displayImages[4].alt) || "Gallery image 5"}
            onClick={() => displayImages[4] && setSelectedImage(displayImages[4])}
            performanceMode={performanceMode}
            floatingParticles={!performanceMode}
            sparkleOverlay={!performanceMode}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true, margin: "100px" }}
          className="h-[250px]"
          style={{ willChange: "opacity, transform" }}
        >
          <LuxuryCard
            variant="gallery-item"
            className="h-full"
            title={(displayImages[5] && displayImages[5].caption) || "Performance 6"}
            imageSrc={getImageSrc(5) || "/placeholder.svg"}
            imageAlt={(displayImages[5] && displayImages[5].alt) || "Gallery image 6"}
            onClick={() => displayImages[5] && setSelectedImage(displayImages[5])}
            performanceMode={performanceMode}
            floatingParticles={!performanceMode}
            sparkleOverlay={!performanceMode}
          />
        </motion.div>

        {/* Two smaller squares at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true, margin: "100px" }}
          className="md:col-span-1 h-[200px]"
          style={{ willChange: "opacity, transform" }}
        >
          <LuxuryCard
            variant="gallery-item"
            className="h-full"
            title={(displayImages[6] && displayImages[6].caption) || "Performance 7"}
            imageSrc={getImageSrc(6) || "/placeholder.svg"}
            imageAlt={(displayImages[6] && displayImages[6].alt) || "Gallery image 7"}
            onClick={() => displayImages[6] && setSelectedImage(displayImages[6])}
            performanceMode={performanceMode}
            floatingParticles={!performanceMode}
            sparkleOverlay={!performanceMode}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true, margin: "100px" }}
          className="md:col-span-2 h-[200px]"
          style={{ willChange: "opacity, transform" }}
        >
          <LuxuryCard
            variant="gallery-item"
            className="h-full"
            title={(displayImages[7] && displayImages[7].caption) || "Performance 8"}
            imageSrc={getImageSrc(7) || "/placeholder.svg"}
            imageAlt={(displayImages[7] && displayImages[7].alt) || "Gallery image 8"}
            onClick={() => displayImages[7] && setSelectedImage(displayImages[7])}
            performanceMode={performanceMode}
            floatingParticles={!performanceMode}
            sparkleOverlay={!performanceMode}
          />
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 bg-white/10 rounded-full p-2 text-white hover:bg-white/20 transition-colors duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>

          <div className="relative w-full max-w-5xl max-h-[80vh] rounded-xl overflow-hidden">
            <Image
              src={selectedImageSrc || getGalleryImage(0) || "/placeholder.svg"}
              alt={imageToDisplay.alt || "Selected gallery image"}
              width={1200}
              height={800}
              className="object-contain w-full h-full"
              loading="lazy"
              onError={(e) => {
                console.error("Error loading lightbox image:", e)
                // @ts-ignore - fallback to placeholder
                e.target.src = "/placeholder.svg?height=800&width=1200&text=Gallery+Image"
              }}
            />

            {imageToDisplay.caption || "No caption available"}
          </div>
        </motion.div>
      )}
    </>
  )
}

export default GalleryGrid
