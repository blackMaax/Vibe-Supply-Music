import { ComponentType, lazy } from 'react'

/**
 * Performance Configuration for Vibe Supply
 * Defines which components should be lazy-loaded to reduce initial bundle size
 */

// Lazy load heavy components
export const LazyChart = lazy(() => import('@/components/ui/chart'))
export const LazyCarousel = lazy(() => import('@/components/ui/carousel'))
export const LazyCommand = lazy(() => import('@/components/ui/command'))
export const LazyDrawer = lazy(() => import('@/components/ui/drawer'))
export const LazySidebar = lazy(() => import('@/components/ui/sidebar'))
export const LazyCalendar = lazy(() => import('@/components/ui/calendar'))
export const LazyNavigationMenu = lazy(() => import('@/components/ui/navigation-menu'))
export const LazyMenubar = lazy(() => import('@/components/ui/menubar'))
export const LazyContextMenu = lazy(() => import('@/components/ui/context-menu'))
export const LazyDropdownMenu = lazy(() => import('@/components/ui/dropdown-menu'))

// Loading fallback components
export const ChartSkeleton = () => (
  <div className="h-32 w-full animate-pulse bg-gray-200 rounded" />
)

export const CardSkeleton = () => (
  <div className="h-64 w-full animate-pulse bg-gray-200 rounded" />
)

export const NavigationSkeleton = () => (
  <div className="h-12 w-full animate-pulse bg-gray-200 rounded" />
)

export const SidebarSkeleton = () => (
  <div className="h-screen w-64 animate-pulse bg-gray-200" />
)

// Performance configuration
export const PERFORMANCE_CONFIG = {
  // Components to lazy load
  LAZY_LOAD_COMPONENTS: [
    'Chart',
    'Carousel', 
    'Command',
    'Drawer',
    'Sidebar',
    'Calendar',
    'NavigationMenu',
    'Menubar',
    'ContextMenu',
    'DropdownMenu'
  ],
  
  // Intersection Observer options for lazy loading
  INTERSECTION_OBSERVER_OPTIONS: {
    rootMargin: '50px',
    threshold: 0.1
  },
  
  // Bundle size thresholds (in KB)
  BUNDLE_SIZE_THRESHOLDS: {
    WARNING: 200,
    ERROR: 500
  },
  
  // Performance metrics targets
  PERFORMANCE_TARGETS: {
    FCP: 1500, // First Contentful Paint
    LCP: 2500, // Largest Contentful Paint
    FID: 100,  // First Input Delay
    CLS: 0.1,  // Cumulative Layout Shift
    TBT: 300   // Total Blocking Time
  }
}

// Helper function to create lazy component with fallback
export function createLazyComponent<T = {}>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  fallback: ComponentType = () => <div>Loading...</div>
) {
  const LazyComponent = lazy(importFn)
  
  return function LazyWrapper(props: T) {
    return (
      <LazyComponent {...props} />
    )
  }
}

// Performance monitoring utilities
export const performanceMonitor = {
  // Measure component render time
  measureRenderTime: (componentName: string, renderFn: () => void) => {
    const start = performance.now()
    renderFn()
    const end = performance.now()
    console.log(`${componentName} render time: ${end - start}ms`)
  },
  
  // Log bundle size warnings
  checkBundleSize: (size: number, componentName: string) => {
    if (size > PERFORMANCE_CONFIG.BUNDLE_SIZE_THRESHOLDS.ERROR) {
      console.error(`⚠️ ${componentName} bundle size (${size}KB) exceeds error threshold`)
    } else if (size > PERFORMANCE_CONFIG.BUNDLE_SIZE_THRESHOLDS.WARNING) {
      console.warn(`⚠️ ${componentName} bundle size (${size}KB) exceeds warning threshold`)
    }
  },
  
  // Monitor performance metrics
  logPerformanceMetrics: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paint = performance.getEntriesByType('paint')
      
      console.log('Performance Metrics:', {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime
      })
    }
  }
} 