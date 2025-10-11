import Link from "next/link";
import { ArrowLeft, BookOpen, Target, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { statusStyles } from "@/lib/style-utils";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  totalUnits?: number;
  completedUnits?: number;
  totalLessons?: number;
  completedLessons?: number;
};

export const Header = ({ 
  title, 
  totalUnits = 0, 
  completedUnits = 0, 
  totalLessons = 0, 
  completedLessons = 0 
}: Props) => {
  const unitProgress = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
  const lessonProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  
  return (
    <div className="sticky top-0 bg-background pb-4 lg:pt-[28px] lg:mt-[-28px] border-b-2 border-border mb-6 lg:z-50">
      {/* Navigation and Title */}
      <div className="flex items-center justify-between text-muted-foreground mb-4">
        <Link href="/courses">
          <Button variant="ghost" size="sm" className={cn("transition-colors", "hover:" + statusStyles.info.bg, "hover:" + statusStyles.info.text)}>
            <ArrowLeft className="h-5 w-5 stroke-2" />
          </Button>
        </Link>
        <div className="text-center flex-1 mx-4">
          <h1 className="font-bold text-xl text-foreground mb-1">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">Continue your learning journey</p>
        </div>
        <div className="w-10" /> {/* Spacer for symmetry */}
      </div>
      
      {/* Progress Overview */}
      {(totalUnits > 0 || totalLessons > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {totalUnits > 0 && (
            <div className={cn("bg-gradient-to-br rounded-lg p-3 border", statusStyles.info.bg.replace('bg-', 'from-') + " to-primary-100 dark:to-blue-900/20", statusStyles.info.border)}>
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", statusStyles.info.button)}>
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">Units Progress</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">{completedUnits} of {totalUnits} completed</div>
                </div>
                <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{unitProgress}%</div>
              </div>
              <div className="w-full bg-blue-200 dark:bg-blue-800/30 rounded-full h-1.5">
                <div 
                  className={cn("h-1.5 rounded-full transition-all duration-300", statusStyles.info.button.split(' ').find(c => c.startsWith('bg-')) || 'bg-primary-500')}
                  style={{ width: `${unitProgress}%` }}
                />
              </div>
            </div>
          )}
          
          {totalLessons > 0 && (
            <div className={cn("bg-gradient-to-br rounded-lg p-3 border", statusStyles.success.bg.replace('bg-', 'from-') + " to-emerald-100", statusStyles.success.border)}>
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", statusStyles.success.button)}>
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className={cn("text-sm font-semibold", statusStyles.success.text)}>Lessons Progress</div>
                  <div className={cn("text-xs", statusStyles.success.text)}>{completedLessons} of {totalLessons} completed</div>
                </div>
                <div className={cn("text-lg font-bold", statusStyles.success.text)}>{lessonProgress}%</div>
              </div>
              <div className={cn("w-full rounded-full h-1.5", statusStyles.success.border.replace('border-', 'bg-').replace('-500', '-200'))}>
                <div 
                  className={cn("h-1.5 rounded-full transition-all duration-300", statusStyles.success.button.split(' ').find(c => c.startsWith('bg-')) || 'bg-green-500')}
                  style={{ width: `${lessonProgress}%` }}
                />
              </div>
            </div>
          )}
          
          <div className={cn("bg-gradient-to-br rounded-lg p-3 border", "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20", "border-purple-200 dark:border-purple-700")}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-purple-800 dark:text-purple-300">Overall Progress</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">Keep up the great work!</div>
              </div>
              <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                {Math.round((unitProgress + lessonProgress) / 2)}%
              </div>
            </div>
            <div className="w-full bg-purple-200 dark:bg-purple-800/30 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.round((unitProgress + lessonProgress) / 2)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
