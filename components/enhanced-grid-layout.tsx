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

"use client";

import * as React from "react";
import { EnhancedSidebar } from "@/components/enhanced-sidebar";
import { EnhancedMobileHeader } from "@/components/enhanced-mobile-header";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { BackgroundProvider, useResponsive } from "@/lib/enhanced-layout-system";
import { SidebarProvider, useSidebar } from "@/lib/sidebar-context";
import { AppGrid, PageGrid } from "@/lib/css-grid-system";
import { cn } from "@/lib/utils";
import { zIndex } from "@/lib/z-index-system";

type Props = {
  children: React.ReactNode;
};

const GridLayoutContent = ({ children }: Props) => {
  const { sidebarWidth } = useSidebar();
  const { shouldShowSidebar, isMobile, isClient } = useResponsive();

  return (
    <div 
      className={cn(
        "min-h-screen bg-transparent",
        // Desktop: CSS Grid layout with sidebar + content
        !isMobile && "lg:grid lg:grid-cols-[var(--sidebar-width,280px)_1fr]",
        // Mobile: Simple block layout
        isMobile && "block"
      )}
      style={{
        '--sidebar-width': `${sidebarWidth}px`
      } as React.CSSProperties & { '--sidebar-width': string }}
    >
      {/* Mobile Header - Only shown on mobile */}
      {isMobile && (
        <header className={cn("lg:hidden bg-card/95 backdrop-blur-md border-b border-border/50", zIndex('MOBILE_HEADER'))}>
          <EnhancedMobileHeader />
        </header>
      )}

      {/* Desktop Sidebar - Only shown on desktop */}
      {!isMobile && (
        <aside className="hidden lg:block">
          <EnhancedSidebar />
        </aside>
      )}

      {/* Main Content Area */}
      <main className={cn(
        "min-h-screen w-full",
        // Mobile: spacing for header and bottom nav
        isMobile && "pt-4 pb-20",
        // Desktop: padding only (grid handles layout)
        !isMobile && "pt-6"
      )}>
        <PageGrid 
          template="single"
          container="xl"
          padding="md"
          className="h-full"
        >
          {children}
        </PageGrid>
      </main>

      {/* Mobile Bottom Navigation - Only shown on mobile */}
      {isMobile && <MobileBottomNav />}
    </div>
  );
};

const EnhancedGridLayout = ({ children }: Props) => {
  return (
    <BackgroundProvider variant="learning">
      <SidebarProvider>
        <GridLayoutContent>
          {children}
        </GridLayoutContent>
      </SidebarProvider>
    </BackgroundProvider>
  );
};

export default EnhancedGridLayout;