"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="w-full flex flex-col items-center py-4">
      <div className="h-px bg-gold w-56 md:w-[440px] mb-2"></div>
      <nav
        className="inline-flex items-center justify-center space-x-0"
      >
        <NavLink href="/" label="Home" currentPath={pathname} />
        <NavSpacer />
        <NavLink href="/about" label="About" currentPath={pathname} />
        <NavSpacer />
        <NavLink href="/packages" label="Packages" currentPath={pathname} />
        <NavSpacer />
        <NavLink href="/contact" label="Contact" currentPath={pathname} />
      </nav>
      <div className="h-px bg-gold w-56 md:w-[440px] mt-2"></div>
    </div>
  )
}

interface NavLinkProps {
  href: string
  label: string
  currentPath: string
}

function NavLink({ href, label, currentPath }: NavLinkProps) {
  const isActive = currentPath === href || (href !== "/" && currentPath.startsWith(href))

  return (
    <Link
      href={href}
      className={`font-medium transition-colors duration-300 relative \
                 px-2 text-xs \
                 md:px-3 md:py-1 md:text-base \
                 text-black`}
    >
      {label}
      {isActive && (
        <>
          <span
            className="absolute -bottom-0.5 left-0 h-[1px] bg-black w-full md:hidden shadow-nav-active-underline-black"
          />
          <span
            className="hidden md:block absolute -bottom-1 left-0 h-0.5 bg-black w-full shadow-nav-active-underline-black"
          />
        </>
      )}
    </Link>
  )
}

function NavSpacer() {
  return (
    <div className="mx-1 h-3 md:mx-3 md:h-5">
      <div
        className="h-full w-px bg-black md:hidden"
      ></div>
      <div
        className="hidden md:block h-full w-px bg-black"
      ></div>
    </div>
  )
}
