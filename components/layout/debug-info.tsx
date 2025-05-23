"use client"

import { useState, useEffect } from "react"

export default function DebugInfo() {
  const [isOpen, setIsOpen] = useState(false)
  const [imageStatus, setImageStatus] = useState<Record<string, string>>({})
  const [browserInfo, setBrowserInfo] = useState<Record<string, string>>({})

  useEffect(() => {
    // Get browser information
    if (typeof window !== "undefined") {
      setBrowserInfo({
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        vendor: navigator.vendor,
        language: navigator.language,
        cookiesEnabled: navigator.cookieEnabled.toString(),
        doNotTrack: navigator.doNotTrack || "Not available",
        screenWidth: window.screen.width.toString(),
        screenHeight: window.screen.height.toString(),
        windowWidth: window.innerWidth.toString(),
        windowHeight: window.innerHeight.toString(),
        pixelRatio: window.devicePixelRatio.toString(),
      })
    }

    // Test loading placeholder image
    const testImage = {
      key: "placeholder",
      url: "/placeholder.svg?height=200&width=200&text=Test"
    }

    const img = new Image()
    img.onload = () => setImageStatus((prev) => ({ ...prev, [testImage.key]: "Loaded" }))
    img.onerror = () => setImageStatus((prev) => ({ ...prev, [testImage.key]: "Failed" }))
    img.src = testImage.url
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-black/80 text-white px-4 py-2 rounded-full text-sm">
        {isOpen ? "Hide Debug" : "Show Debug"}
      </button>

      {isOpen && (
        <div className="bg-black/90 text-white p-4 rounded-lg mt-2 max-w-md max-h-96 overflow-auto">
          <h3 className="font-bold mb-2">Debug Info</h3>
          <div className="text-xs">
            <p>Environment: {process.env.NODE_ENV}</p>
            <p>Next Public Sanity Project ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "Not set"}</p>
            <p>Next Public Sanity Dataset: {process.env.NEXT_PUBLIC_SANITY_DATASET || "Not set"}</p>
            <p>Next Public Sanity API Version: {process.env.NEXT_PUBLIC_SANITY_API_VERSION || "Not set"}</p>
            <p>Sanity Preview Mode: {process.env.SANITY_PREVIEW_MODE || "Not set"}</p>

            <h4 className="font-bold mt-4 mb-2">Browser Info:</h4>
            {Object.entries(browserInfo).map(([key, value]) => (
              <p key={key}>
                {key}: {value}
              </p>
            ))}

            <h4 className="font-bold mt-4 mb-2">Image Test Results:</h4>
            {Object.entries(imageStatus).map(([key, status]) => (
              <p key={key}>
                {key}: <span className={status === "Loaded" ? "text-green-500" : "text-red-500"}>{status}</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
