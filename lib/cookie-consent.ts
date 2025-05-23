// Cookie consent utility functions

// Check if cookies are accepted
export function areCookiesAccepted(): boolean {
  if (typeof window === "undefined") return false

  const preference = localStorage.getItem("cookie-preference")
  return preference === "accepted"
}

// Set cookie preference
export function setCookiePreference(accepted: boolean): void {
  if (typeof window === "undefined") return

  localStorage.setItem("cookie-preference", accepted ? "accepted" : "declined")
}

// Clear cookie preference (useful for testing)
export function clearCookiePreference(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("cookie-preference")
}

// Initialize analytics or other cookie-dependent services
export function initializeServices(): void {
  if (!areCookiesAccepted()) return

  // Here you would initialize analytics services like Google Analytics, etc.
  console.log("Initializing cookie-dependent services")

  // Example: Initialize Google Analytics (commented out)
  /*
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
  */
}
