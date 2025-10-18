/**
 * 📱 Enhanced Grid-Based App Layout
 * 
 * Modern CSS Grid app layout with:
 * - Semantic two-column grid
 * - Responsive sidebar behavior  
 * - Performance optimized
 * - Clean component architecture
 */

"use client";

import * as React from "react";
import { UserProgress } from "@/components/user-progress";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { SidebarLayout, ContentGrid } from "@/lib/css-grid-system";
import { cn } from "@/lib/utils";
import { zIndex } from "@/lib/z-index-system";

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
  gems: number;
  hasActiveSubscription: boolean;
  showQuests?: boolean;
  additionalSidebarContent?: React.ReactNode;
  className?: string;
};

export const EnhancedGridAppLayout = ({
  children,
  activeCourse,
  hearts,
  points,
  gems,
  hasActiveSubscription,
  showQuests = true,
  additionalSidebarContent,
  className
}: Props) => {
  
  const sidebarContent = (
    <div className="space-y-4">
      {/* Additional Custom Content */}
      {additionalSidebarContent}
      
      {/* Promotional Content */}
      {!hasActiveSubscription && <Promo />}
      
      {/* Quests Section */}
      {showQuests && <Quests points={points} />}
    </div>
  );

  return (
    <div className={cn("w-full h-full", className)}>
      {/* Top Navigation Bar - Switch Course and Shop Links */}
      <div className={`w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-[60px] mb-6 ${zIndex('TOP_NAVIGATION')}`}>
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <UserProgress
            activeCourse={activeCourse}
            hearts={hearts}
            points={points}
            gems={gems}
            hasActiveSubscription={hasActiveSubscription}
          />
        </div>
      </div>
      
      <SidebarLayout 
        sidebar={sidebarContent}
        sidebarPosition="right"
        sidebarWidth="md"
        className="h-full"
      >
        {/* Main Content Area */}
        <div className="w-full space-y-6 pb-20 lg:pb-6">
          {children}
        </div>
      </SidebarLayout>
    </div>
  );
};