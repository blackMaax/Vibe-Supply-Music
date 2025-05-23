"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Home")
  const navItems = ["Home", "About", "Packages", "Contact"]
  const pathname = usePathname()

  useEffect(() => {
    const currentPath = pathname.split("/")[1] || "home"
    const localNavItems = ["Home", "About", "Packages", "Contact"]
    const activeNav = localNavItems.find(item => item.toLowerCase() === currentPath.toLowerCase())
    if (activeNav) {
      setActiveItem(activeNav)
    } else if (pathname === "/") {
      setActiveItem("Home")
    }
    // If no match and not home, decide on a default or leave as is
    // For now, if path is e.g. /terms, no nav item will be active, which is acceptable.
  }, [pathname])

  return (
    <header className="w-full py-6">
      <div className="container mx-auto">
        <nav className="flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center gap-2 sm:gap-4 md:gap-8 py-4">
            {navItems.map((item, index) => (
              <React.Fragment key={`nav-fragment-${item}`}>
                <NavItem
                  item={item}
                  isActive={activeItem === item}
                />
                {index < navItems.length - 1 && <div className="w-2 h-2 rotate-45 bg-black opacity-70" />}
              </React.Fragment>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}

interface NavItemProps {
  item: string
  isActive: boolean
}

function NavItem({ item, isActive }: NavItemProps) {
  return (
    <div className="relative">
      <Link
        href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
        className={cn(
          "relative z-10 px-2 sm:px-3 md:px-4 py-2 text-base font-medium transition-colors",
          isActive ? "text-black" : "text-black hover:text-black",
        )}
      >
        {item}

        {/* Geometric line accents that appear on hover and when active */}
        {isActive && (
          // @ts-ignore 
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </Link>
    </div>
  )
}
