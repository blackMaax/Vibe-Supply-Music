import dynamic from 'next/dynamic'

// Lazy load heavy components to reduce initial bundle size
export const Chart = dynamic(() => import('./chart'), {
  loading: () => <div className="h-32 w-full animate-pulse bg-gray-200 rounded" />,
  ssr: false, // Charts usually don't need SSR
})

export const LuxuryCard = dynamic(() => import('./luxury-card'), {
  loading: () => <div className="h-64 w-full animate-pulse bg-gray-200 rounded" />,
})

export const Carousel = dynamic(() => import('./carousel'), {
  loading: () => <div className="h-48 w-full animate-pulse bg-gray-200 rounded" />,
})

export const Command = dynamic(() => import('./command'), {
  loading: () => <div className="h-32 w-full animate-pulse bg-gray-200 rounded" />,
})

export const Drawer = dynamic(() => import('./drawer'), {
  loading: () => <div className="fixed inset-0 bg-black/50 animate-pulse" />,
  ssr: false,
})

export const Sidebar = dynamic(() => import('./sidebar'), {
  loading: () => <div className="h-screen w-64 animate-pulse bg-gray-200" />,
  ssr: false,
})

// Form components can be loaded when needed
export const Calendar = dynamic(() => import('./calendar'), {
  loading: () => <div className="h-64 w-64 animate-pulse bg-gray-200 rounded" />,
  ssr: false,
})

// Navigation components
export const NavigationMenu = dynamic(() => import('./navigation-menu'), {
  loading: () => <div className="h-12 w-full animate-pulse bg-gray-200 rounded" />,
})

export const Menubar = dynamic(() => import('./menubar'), {
  loading: () => <div className="h-10 w-full animate-pulse bg-gray-200 rounded" />,
})

// Context menus - only load when needed
export const ContextMenu = dynamic(() => import('./context-menu'), {
  loading: () => null,
  ssr: false,
})

export const DropdownMenu = dynamic(() => import('./dropdown-menu'), {
  loading: () => null,
  ssr: false,
}) 