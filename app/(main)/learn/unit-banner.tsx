import Link from "next/link";
import { NotebookText, BookOpen, Target, Award } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
  lessonCount?: number;
  completedLessons?: number;
  isCompleted?: boolean;
};

export const UnitBanner = ({
  title,
  description,
  lessonCount = 0,
  completedLessons = 0,
  isCompleted = false,
}: Props) => {
  const progress = lessonCount > 0 ? Math.round((completedLessons / lessonCount) * 100) : 0;
  
  return (
    <div className={`w-full rounded-xl p-6 text-white flex items-center justify-between relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
      isCompleted 
        ? "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500" 
        : "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 opacity-20">
        {isCompleted ? <Award className="w-8 h-8" /> : <Target className="w-8 h-8" />}
      </div>
      
      <div className="space-y-3 flex-1 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
            isCompleted ? "bg-green-600" : "bg-blue-600"
          }`}>
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">
              {title}
            </h3>
            {isCompleted && (
              <div className="flex items-center gap-2 text-green-200">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">Unit Completed!</span>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-lg opacity-90 leading-relaxed">
          {description}
        </p>
        
        {/* Progress Info */}
        {lessonCount > 0 && (
          <div className="flex items-center gap-4 mt-4">
            <div className="bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
              <div className="text-sm font-medium">Progress</div>
              <div className="text-lg font-bold">{progress}%</div>
            </div>
            <div className="bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
              <div className="text-sm font-medium">Lessons</div>
              <div className="text-lg font-bold">{completedLessons}/{lessonCount}</div>
            </div>
            <div className="flex-1 bg-white/20 rounded-full h-2 backdrop-blur-sm">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
      
      <Link href="/lesson">
        <Button
          size="lg"
          variant="secondary"
          className="hidden xl:flex border-2 border-b-4 active:border-b-2 bg-white text-gray-800 hover:bg-gray-50 font-bold shadow-lg hover:shadow-xl transition-all duration-200 relative z-10"
        >
          <NotebookText className="mr-2" />
          {isCompleted ? "Review" : "Continue"}
        </Button>
      </Link>
    </div>
  );
};
