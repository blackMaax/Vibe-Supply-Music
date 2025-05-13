"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { getImageUrl } from "@/lib/static-data"

export default function StorySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Geometric Accent - Triangle */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.2 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -top-20 -left-20 w-[300px] h-[300px] pointer-events-none"
            >
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon
                  points="50,10 90,90 10,90"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                  strokeOpacity="0.6"
                />
              </svg>
            </motion.div>

            <div className="bg-black/70 backdrop-blur-md p-8 rounded-xl border border-gold/30 relative z-10 overflow-hidden group hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10 z-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.3)_0%,_transparent_70%)]"></div>

              {/* Subtle diagonal accent lines */}
              <div
                className="absolute top-[15%] right-[10%] w-[120px] h-[1px] rotate-30 opacity-20 z-0"
                style={{
                  background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                  boxShadow: "0 0 3px #D4AF37",
                }}
              ></div>
              <div
                className="absolute bottom-[20%] left-[15%] w-[150px] h-[1px] -rotate-30 opacity-20 z-0"
                style={{
                  background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                  boxShadow: "0 0 3px #D4AF37",
                }}
              ></div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1,1 L1,20 M1,1 L20,1" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
                </svg>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M63,63 L63,44 M63,63 L44,63"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    fill="none"
                    strokeOpacity="0.8"
                  />
                </svg>
              </div>

              {/* Enhanced border glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl"
                style={{
                  boxShadow: "inset 0 0 15px rgba(212, 175, 55, 0.3)",
                }}
              ></div>

              <h2 className="text-4xl font-display font-bold mb-6 gold-text relative">
                Our Story
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/70 to-transparent mt-2 relative">
                  <div className="absolute inset-0 blur-sm bg-gold/30"></div>
                </div>
              </h2>

              <div className="prose prose-lg prose-invert relative z-10">
                {/* First paragraph with enhanced styling */}
                <p className="text-gray-300 mb-6 relative">
                  <span className="text-gold font-medium">Founded by two friends</span>—a brilliant singer and a
                  show-stopping frontman—Vibe Supply was born from a
                  <span className="relative inline-block mx-1">
                    <span className="relative z-10">shared love of inclusive, high-energy performances</span>
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></span>
                  </span>
                  . From basement jams to sold-out weddings, our mission has always been the same:
                  <span className="italic text-gold/90 font-medium"> make every event unforgettable</span>.
                  <span className="absolute -left-3 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-gold/30 to-transparent"></span>
                </p>

                {/* Second paragraph with different accent style */}
                <p className="text-gray-300 mb-6 relative">
                  With <span className="text-gold font-medium">years of experience</span> in the music industry, we've
                  curated a team of
                  <span className="relative inline-block mx-1">
                    <span className="relative z-10">exceptional musicians</span>
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></span>
                  </span>
                  who bring passion, skill, and professionalism to every performance. Our journey has taken us from
                  intimate gatherings to grand celebrations, each event adding to our
                  <span className="relative inline-block mx-1">
                    <span className="relative z-10">repertoire and refining our craft</span>
                    <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20"></span>
                  </span>
                  .
                  <span className="absolute -right-3 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-gold/30 to-transparent"></span>
                </p>

                {/* Third paragraph with quote-like styling */}
                <p className="text-gray-300 relative pl-4 border-l-2 border-gold/30">
                  Today, <span className="text-gold font-medium">Vibe Supply</span> stands as a
                  <span className="relative inline-block mx-1">
                    <span className="relative z-10">premier choice for luxury entertainment</span>
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></span>
                  </span>
                  , known for our ability to read the room, adapt to any atmosphere, and create moments that
                  <span className="italic text-gold/90 font-medium"> resonate long after the final note</span>.
                  <span className="absolute -left-1 top-1/4 w-6 h-6 opacity-20">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 21V5L12 12L21 5V21H3Z" stroke="#D4AF37" strokeWidth="1" />
                    </svg>
                  </span>
                  <span className="absolute -right-1 bottom-1/4 w-6 h-6 opacity-20 rotate-180">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 21V5L12 12L21 5V21H3Z" stroke="#D4AF37" strokeWidth="1" />
                    </svg>
                  </span>
                </p>

                {/* Decorative element at the bottom */}
                <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mt-6"></div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[600px] rounded-xl overflow-hidden gold-border">
              <Image
                src={getImageUrl("performance11") || "/placeholder.svg"}
                alt="Vibe Supply in action"
                fill
                className="object-cover"
              />

              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1,1 L1,20 M1,1 L20,1" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M63,1 L63,20 M63,1 L44,1" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1,63 L1,44 M1,63 L20,63" stroke="#D4AF37" strokeWidth="2" fill="none" strokeOpacity="0.8" />
                </svg>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M63,63 L63,44 M63,63 L44,63"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    fill="none"
                    strokeOpacity="0.8"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
