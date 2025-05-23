import Image from "next/image"

interface FeaturedImageProps {
  imageSrc: string
  imageAlt?: string
  title?: string
  subtitle?: string
}

export default function FeaturedImage({
  imageSrc,
  imageAlt = "Vibe Supply Performance",
  title = "Unforgettable Experiences",
  subtitle = "Let's create magical moments for your special event",
}: FeaturedImageProps) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-gold/30 bg-black/75 backdrop-blur-md h-[300px] lg:h-[250px]">
      {/* Corner accents - REMOVED */}
      {/*
      <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
        <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M1,1 L1,20 M1,1 L20,1" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
        <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M63,1 L63,20 M63,1 L44,1" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
        <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M1,63 L1,44 M1,63 L20,63" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
        <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M63,63 L63,44 M63,63 L44,63" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
        </svg>
      </div>
      */}

      <div className="relative w-full h-full">
        <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-display font-bold gold-text mb-2">{title}</h3>
          <p className="text-white/80">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
