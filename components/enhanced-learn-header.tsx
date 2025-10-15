/**
 * 📚 Enhanced Learn Page Header
 * 
 * Sticky header for the learn page with:
 * - Perfect contrast in light/dark modes
 * - Smooth backdrop blur and transparency
 * - Responsive progress cards
 * - Accessibility features
 * - Theme-aware styling
 */

"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Target, TrendingUp } from "lucide-react";

import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { EnhancedStickyWrapper } from "@/lib/enhanced-layout-system";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  totalUnits?: number;
  completedUnits?: number;
  totalLessons?: number;
  completedLessons?: number;
};

export const EnhancedLearnHeader = ({ 
  title, 
  totalUnits = 0, 
  completedUnits = 0, 
  totalLessons = 0, 
  completedLessons = 0 
}: Props) => {
  const unitProgress = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
  const lessonProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const overallProgress = Math.round((unitProgress + lessonProgress) / 2);
  
  return (
    <EnhancedStickyWrapper className="space-y-6">
      {/* Navigation and Title */}
      <div className="flex items-center justify-between">
        <Link href="/courses">
          <EnhancedButton 
            variant="ghost" 
            size="sm" 
            className="p-2 hover:bg-muted/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </EnhancedButton>
        </Link>
        
        <div className="text-center flex-1 mx-4">
          <h1 className="font-bold text-2xl text-foreground mb-1">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Continue your learning journey
          </p>
        </div>
        
        <div className="w-10" /> {/* Spacer for symmetry */}
      </div>
      
      {/* Progress Overview */}
      {(totalUnits > 0 || totalLessons > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Units Progress */}
          {totalUnits > 0 && (
            <EnhancedCard 
              variant="info"
              padding="sm"
              className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/50 dark:border-blue-800/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                    Units Progress
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    {completedUnits} of {totalUnits} completed
                  </div>
                </div>
                <div className="text-xl font-bold text-blue-700 dark:text-blue-300">
                  {unitProgress}%
                </div>
              </div>
              <div className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${unitProgress}%` }}
                />
              </div>
            </EnhancedCard>
          )}
          
          {/* Lessons Progress */}
          {totalLessons > 0 && (
            <EnhancedCard 
              variant="success"
              padding="sm"
              className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200/50 dark:border-green-800/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-green-800 dark:text-green-300">
                    Lessons Progress
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400">
                    {completedLessons} of {totalLessons} completed
                  </div>
                </div>
                <div className="text-xl font-bold text-green-700 dark:text-green-300">
                  {lessonProgress}%
                </div>
              </div>
              <div className="w-full bg-green-100 dark:bg-green-900/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${lessonProgress}%` }}
                />
              </div>
            </EnhancedCard>
          )}
          
          {/* Overall Progress */}
          <EnhancedCard 
            variant="default"
            padding="sm"
            className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200/50 dark:border-purple-800/50 sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                  Overall Progress
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  Keep up the great work!
                </div>
              </div>
              <div className="text-xl font-bold text-purple-700 dark:text-purple-300">
                {overallProgress}%
              </div>
            </div>
            <div className="w-full bg-purple-100 dark:bg-purple-900/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </EnhancedCard>
        </div>
      )}
    </EnhancedStickyWrapper>
  );
};