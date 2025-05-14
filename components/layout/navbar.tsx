"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import FiligreeDivider from "@/components/decorations/FiligreeDivider"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="w-full flex flex-col items-center py-2 md:py-3">
      <div className="flex flex-col items-center w-auto">
        <FiligreeDivider className="w-full max-w-[250px] md:max-w-[300px] lg:max-w-[350px] h-auto text-black my-0 transform scale-y-[-1]" />
        <nav
          className="inline-flex items-center justify-center space-x-3 sm:space-x-4 md:space-x-6 py-1"
        >
          <NavLink href="/" label="Home" currentPath={pathname} />
          <NavLink href="/about" label="About" currentPath={pathname} />
          <NavLink href="/packages" label="Packages" currentPath={pathname} />
          <NavLink href="/contact" label="Contact" currentPath={pathname} />
        </nav>
        <FiligreeDivider className="w-full max-w-[250px] md:max-w-[300px] lg:max-w-[350px] h-auto text-black my-0" />
      </div>
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
      className={`font-display relative group transition-colors duration-300 \
                 px-2 py-2 text-sm \
                 md:px-3 md:text-base \
                 ${isActive ? "text-black" : "text-black hover:text-neutral-700"}`}
    >
      {label}
      <span className="absolute left-0 bottom-[-4px] block w-full">
        {isActive && (
          <span className="block h-[2px] w-full bg-black"></span>
        )}
        {!isActive && (
          <span
            className="block h-px w-0 bg-black transition-all duration-300 group-hover:w-full"
          ></span>
        )}
      </span>
    </Link>
  )
}
