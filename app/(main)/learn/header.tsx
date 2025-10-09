import Link from "next/link";
import { ArrowLeft, BookOpen, Target, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";

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
    <div className="sticky top-0 bg-white pb-4 lg:pt-[28px] lg:mt-[-28px] border-b-2 mb-6 lg:z-50">
      {/* Navigation and Title */}
      <div className="flex items-center justify-between text-neutral-400 mb-4">
        <Link href="/courses">
          <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-5 w-5 stroke-2" />
          </Button>
        </Link>
        <div className="text-center flex-1 mx-4">
          <h1 className="font-bold text-xl text-gray-800 mb-1">
            {title}
          </h1>
          <p className="text-sm text-gray-600">Continue your learning journey</p>
        </div>
        <div className="w-10" /> {/* Spacer for symmetry */}
      </div>
      
      {/* Progress Overview */}
      {(totalUnits > 0 || totalLessons > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {totalUnits > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-blue-800">Units Progress</div>
                  <div className="text-xs text-blue-600">{completedUnits} of {totalUnits} completed</div>
                </div>
                <div className="text-lg font-bold text-blue-700">{unitProgress}%</div>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${unitProgress}%` }}
                />
              </div>
            </div>
          )}
          
          {totalLessons > 0 && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-green-800">Lessons Progress</div>
                  <div className="text-xs text-green-600">{completedLessons} of {totalLessons} completed</div>
                </div>
                <div className="text-lg font-bold text-green-700">{lessonProgress}%</div>
              </div>
              <div className="w-full bg-green-200 rounded-full h-1.5">
                <div 
                  className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${lessonProgress}%` }}
                />
              </div>
            </div>
          )}
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-purple-800">Overall Progress</div>
                <div className="text-xs text-purple-600">Keep up the great work!</div>
              </div>
              <div className="text-lg font-bold text-purple-700">
                {Math.round((unitProgress + lessonProgress) / 2)}%
              </div>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-1.5">
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
