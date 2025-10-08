import Image from "next/image";
import { Check, Clock, BookOpen, Star, Award } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
  description?: string;
  level?: string;
  duration?: string;
  progress?: {
    percentage: number;
    totalChallenges: number;
    completedChallenges: number;
  } | null;
  viewMode?: "grid" | "list";
};

export const Card = ({
  title,
  id,
  imageSrc,
  disabled,
  onClick,
  active,
  description,
  level,
  duration,
  progress,
  viewMode = "grid",
}: Props) => {
  const getLevelColor = (level?: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelIcon = (level?: string) => {
    switch (level) {
      case "Beginner": return <BookOpen className="w-3 h-3" />;
      case "Intermediate": return <Star className="w-3 h-3" />;
      case "Advanced": return <Award className="w-3 h-3" />;
      default: return <BookOpen className="w-3 h-3" />;
    }
  };

  // Grid View (default)
  if (viewMode === "grid") {
    return (
      <div
        onClick={() => onClick(id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(id);
          }
        }}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label={`${active ? 'Continue' : 'Start'} ${title} course`}
        className={cn(
          "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col p-6 transition-all duration-200",
          "min-h-[320px] max-w-[350px] shadow-sm hover:shadow-lg focus:ring-2 focus:ring-orange-500 focus:outline-none",
          active && "ring-2 ring-green-500 border-green-500",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        {/* Header with status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {level && (
              <div className={cn("px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1", getLevelColor(level))}>
                {getLevelIcon(level)}
                <span>{level}</span>
              </div>
            )}
          </div>
          {active && (
            <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
              <Check className="text-white stroke-[4] h-4 w-4" />
            </div>
          )}
        </div>

        {/* Course Image */}
        <div className="flex-shrink-0 flex justify-center mb-4">
          <Image
            src={imageSrc}
            alt={title}
            height={90}
            width={120}
            className="rounded-lg drop-shadow-md border object-cover"
          />
        </div>

        {/* Course Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-neutral-800 text-center mb-3 line-clamp-2">
            {title}
          </h3>
          
          {description && (
            <p className="text-sm text-neutral-600 text-center mb-4 line-clamp-3 flex-1">
              {description}
            </p>
          )}

          {/* Course Meta */}
          <div className="space-y-3">
            {duration && (
              <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
            )}

            {/* Progress Bar */}
            {progress && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-neutral-600">
                  <span>Progress</span>
                  <span className="font-medium">{progress.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-neutral-500 text-center">
                  {progress.completedChallenges} of {progress.totalChallenges} challenges
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-4">
              {active ? (
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium text-sm hover:bg-green-700 transition-colors">
                  Continue Learning
                </button>
              ) : (
                <button className="w-full border-2 border-neutral-300 text-neutral-700 py-3 px-4 rounded-lg font-medium text-sm hover:bg-neutral-50 transition-colors">
                  {progress && progress.percentage > 0 ? "Switch to Course" : "Start Course"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div
      onClick={() => onClick(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(id);
        }
      }}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`${active ? 'Continue' : 'Start'} ${title} course`}
      className={cn(
        "border-2 rounded-xl hover:bg-black/5 cursor-pointer transition-all duration-200 p-4",
        "shadow-sm hover:shadow-md focus:ring-2 focus:ring-orange-500 focus:outline-none",
        active && "ring-2 ring-green-500 border-green-500 bg-green-50/30",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Course Image */}
        <div className="flex-shrink-0">
          <Image
            src={imageSrc}
            alt={title}
            height={80}
            width={80}
            className="rounded-lg drop-shadow-sm border object-cover"
          />
        </div>

        {/* Course Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-neutral-800 line-clamp-1 flex-1">
              {title}
            </h3>
            {active && (
              <div className="ml-2 rounded-md bg-green-600 flex items-center justify-center p-1">
                <Check className="text-white stroke-[4] h-3 w-3" />
              </div>
            )}
          </div>

          {description && (
            <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
              {description}
            </p>
          )}

          {/* Meta and Progress */}
          <div className="flex items-center gap-4 mb-3">
            {level && (
              <div className={cn("px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1", getLevelColor(level))}>
                {getLevelIcon(level)}
                <span>{level}</span>
              </div>
            )}
            
            {duration && (
              <div className="flex items-center gap-1 text-sm text-neutral-600">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {progress && (
            <div className="mb-3">
              <div className="flex justify-between items-center text-xs text-neutral-600 mb-1">
                <span>Progress</span>
                <span className="font-medium">{progress.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                {progress.completedChallenges} of {progress.totalChallenges} challenges completed
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0 ml-4">
          {active ? (
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-green-700 transition-colors whitespace-nowrap">
              Continue
            </button>
          ) : (
            <button className="border-2 border-neutral-300 text-neutral-700 py-2 px-4 rounded-lg font-medium text-sm hover:bg-neutral-50 transition-colors whitespace-nowrap">
              {progress && progress.percentage > 0 ? "Switch" : "Start"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
