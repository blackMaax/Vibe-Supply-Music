"use client"

import { useEffect, useState, useMemo } from "react"

export default function PageBackground() {
  const [mounted, setMounted] = useState(false)

  // Pre-calculate shimmer points to avoid recalculation on every render
  const shimmerPoints = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${15 + Math.random() * 20}s`,
    })), 
    [] // Empty dependency array since we only need to calculate once
  )

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
            {shimmerPoints.map((point, i) => (
              <div
                key={i}
                className="shimmer-point"
                style={{
                  left: point.left,
                  top: point.top,
                  animationDelay: point.delay,
                  animationDuration: point.duration,
                  willChange: 'transform, opacity', // Hint to browser for optimization
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
          willChange: 'opacity', // Hint to browser for optimization
        }}
      ></div>

      <style jsx>{`
        .shimmer-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          transform: translateZ(0); /* Force GPU acceleration */
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
          transform: translateZ(0); /* Force GPU acceleration */
        }
        
        @keyframes shimmerFloat {
          0% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(20px, -15px, 0);
          }
          50% {
            transform: translate3d(40px, 10px, 0);
          }
          75% {
            transform: translate3d(20px, 25px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
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
