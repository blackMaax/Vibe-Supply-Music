"use client"

import Navbar from "./navbar" // Re-added Navbar import
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react" // Added useState, useEffect, and useRef

interface HeaderProps {
  // heroMode?: boolean // Ensure this is removed if still present
}

export default function Header({ /* heroMode = false */ }: HeaderProps) { // Ensure heroMode is removed from destructuring
  const pathname = usePathname()
  const [headerVisible, setHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  // Effect to set base visibility on route change & reset scroll position
  useEffect(() => {
    setHeaderVisible(pathname !== "/");
    lastScrollY.current = window.scrollY; // Reset scrollY tracking on route change
    // Manually trigger a scroll check if needed after route change, though usually covered by scroll listener
  }, [pathname])

  // Effect for scroll-based visibility (SIMPLIFIED FOR DEBUGGING - Restoring pathname dependency)
  useEffect(() => {
    // lastScrollY.current = window.scrollY; // Already set in the above effect or on initial ref declaration

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY <= 0) {
            setHeaderVisible(true)
          } else {
            if (currentScrollY > lastScrollY.current) {
              setHeaderVisible(false) // Scrolling down
            } else if (currentScrollY < lastScrollY.current) {
              setHeaderVisible(true) // Scrolling up
            }
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, headerVisible]); // Using pathname and headerVisible in dependencies

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out ${
        headerVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Re-added div to center Navbar */}
      <div className="container mx-auto px-4 flex justify-center py-2">
        <Navbar />
      </div>
    </header>
  )
}
