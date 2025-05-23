"use client"

import { useEffect, useState } from "react"

export default function PageBackground() {
  const [mounted, setMounted] = useState(false)

  // Only render animations after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Removed hardcoded gold image background. Only overlays/animations remain. */}

      {/* Subtle shimmer animation - drifting pinpoints of light */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="shimmer-container">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="shimmer-point"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 20}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Subtle vignette effect for depth - reduced opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
          opacity: 0.5,
        }}
      ></div>

      <style jsx>{`
        .shimmer-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        
        .shimmer-point {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: #D4AF37;
          border-radius: 50%;
          opacity: 0;
          filter: blur(1px);
          box-shadow: 0 0 4px #D4AF37;
          animation: shimmerFloat linear infinite, shimmerPulse ease-in-out infinite;
        }
        
        @keyframes shimmerFloat {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(20px, -15px);
          }
          50% {
            transform: translate(40px, 10px);
          }
          75% {
            transform: translate(20px, 25px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        
        @keyframes shimmerPulse {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}
