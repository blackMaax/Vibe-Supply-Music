import type { Metadata } from "next"
import PackagesClientPage from "./PackagesClientPage"

export const metadata: Metadata = {
  title: "Packages | Vibe Supply",
  description: "Explore our premium entertainment packages for your special event.",
}

export default function PackagesPage() {
  return <PackagesClientPage />
}
