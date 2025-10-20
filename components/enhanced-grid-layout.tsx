/**
 * 🏗️ Enhanced Grid Layout
 *
 * Modern CSS Grid-based main layout with:
 * - Semantic grid areas
 * - Responsive grid templates
 * - Performance optimized
 * - Accessibility focused
 * - Clean architecture
 */

"use client"

import * as React from "react"
import { EnhancedSidebar } from "@/components/enhanced-sidebar"
import { EnhancedMobileHeaderSimple } from "@/components/enhanced-mobile-header-simple"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { BackgroundProvider, useResponsive } from "@/lib/enhanced-layout-system"
import { SidebarProvider, useSidebar } from "@/lib/sidebar-context"
import { AppGrid, PageGrid } from "@/lib/css-grid-system"
import { cn } from "@/lib/utils"
import { zIndex } from "@/lib/z-index-system"

type Props = {
  children: React.ReactNode
}

const GridLayoutContent = ({ children }: Props) => {
  const { sidebarWidth } = useSidebar()
  const { shouldShowSidebar, isMobile, isClient } = useResponsive()

  return (
    <div className='min-h-screen bg-transparent block'>
      {/* Mobile Header with Logo - Always shown */}
      <header
        className={cn(
          "bg-card/95 backdrop-blur-md border-b border-border/50 fixed top-0 w-full",
          zIndex("MOBILE_HEADER"),
        )}
      >
        <EnhancedMobileHeaderSimple />
      </header>

      {/* Main Content Area - Always with mobile spacing */}
      <main className='min-h-screen w-full pt-16 pb-20'>
        <PageGrid template='single' container='xl' padding='none' className='h-full'>
          {children}
        </PageGrid>
      </main>

      {/* Mobile Bottom Navigation - Always shown */}
      <MobileBottomNav />
    </div>
  )
}

const EnhancedGridLayout = ({ children }: Props) => {
  return (
    <BackgroundProvider variant='learning'>
      <SidebarProvider>
        <GridLayoutContent>{children}</GridLayoutContent>
      </SidebarProvider>
    </BackgroundProvider>
  )
}

export default EnhancedGridLayout
