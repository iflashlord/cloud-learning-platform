/**
 * 📱 Enhanced App Layout
 * 
 * Main app layout with:
 * - Responsive sidebar behavior
 * - Enhanced mobile header
 * - Proper responsive breakpoints
 * - Theme-aware styling
 * - Accessibility features
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { EnhancedAppLayout, useResponsive } from "@/lib/enhanced-layout-system";
import { EnhancedSidebar } from "@/components/enhanced-sidebar";
import { EnhancedMobileHeader } from "@/components/enhanced-mobile-header";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

type Course = {
  id: number;
  title: string;
  imageSrc: string;
};

type Props = {
  children: React.ReactNode;
  activeCourse: Course;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
  showQuests?: boolean;
  additionalSidebarContent?: React.ReactNode;
  className?: string;
};

export const EnhancedAppLayoutComponent = ({
  children,
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
  showQuests = true,
  additionalSidebarContent,
  className
}: Props) => {
  const { isMobile } = useResponsive();

  const sidebarContent = (
    <>
      <UserProgress
        activeCourse={activeCourse}
        hearts={hearts}
        points={points}
        hasActiveSubscription={hasActiveSubscription}
      />
      
      {additionalSidebarContent}
      
      {!hasActiveSubscription && <Promo />}
      
      {showQuests && <Quests points={points} />}
    </>
  );

  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      {isMobile && <EnhancedMobileHeader />}
      
      {/* Desktop Sidebar */}
      {!isMobile && <EnhancedSidebar />}
      
      {/* Main Content Area */}
      <div className={cn(
        "transition-all duration-300",
        // Account for desktop sidebar
        !isMobile ? "lg:pl-[280px]" : "",
        // Account for mobile header
        isMobile ? "pt-[60px]" : "",
        className
      )}>
        <EnhancedAppLayout
          background="learning"
          sidebar={sidebarContent}
          stickyOffset={isMobile ? "custom" : "none"}
          customStickyOffset={isMobile ? "top-[60px]" : "top-0"}
          className="px-4 sm:px-6"
        >
          {children}
        </EnhancedAppLayout>
      </div>
    </div>
  );
};