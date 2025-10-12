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

export const EnhancedGridAppLayout = ({
  children,
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
  showQuests = true,
  additionalSidebarContent,
  className
}: Props) => {
  
  const sidebarContent = (
    <div className="space-y-4">
      {/* User Progress Card */}
      <UserProgress
        activeCourse={activeCourse}
        hearts={hearts}
        points={points}
        hasActiveSubscription={hasActiveSubscription}
      />
      
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
      <SidebarLayout 
        sidebar={sidebarContent}
        sidebarPosition="right"
        sidebarWidth="md"
        className="h-full"
      >
        {/* Main Content Area */}
        <div className="w-full space-y-6">
          {children}
        </div>
      </SidebarLayout>
    </div>
  );
};