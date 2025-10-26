"use client"

/**
 * Centralized upgrade navigation logic
 * All upgrade buttons should redirect to /pro for consistent user experience
 */
export const navigateToUpgrade = (source?: string) => {
  // Log analytics for tracking upgrade button sources
  if (typeof window !== "undefined" && source) {
    console.log(`Upgrade navigation from: ${source}`)
  }

  // Always redirect to /pro page
  if (typeof window !== "undefined") {
    window.location.href = "/pro"
  }
}

/**
 * Hook for upgrade navigation in client components
 */
export const useUpgradeNavigation = () => {
  return {
    goToUpgrade: (source?: string) => navigateToUpgrade(source),
  }
}
