import Image from "next/image";
import { Check, Clock, BookOpen, Star, Award, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { statusStyles } from "@/lib/style-utils";
import { CourseProgress } from "@/components/ui/course-progress";
import { CourseMeta } from "@/components/ui/course-meta";
import { CourseActions } from "@/components/ui/course-actions";

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
      case "Beginner": return cn(statusStyles.success.bg, statusStyles.success.text);
      case "Intermediate": return cn(statusStyles.warning.bg, statusStyles.warning.text);
      case "Advanced": return cn(statusStyles.error.bg, statusStyles.error.text);
      default: return cn(statusStyles.neutral.bg, statusStyles.neutral.text);
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
          "h-full border-2 rounded-xl border-b-4 hover:bg-muted/50 cursor-pointer active:border-b-2 flex flex-col p-6 transition-all duration-200 bg-card",
          "min-h-[320px] max-w-[350px] shadow-sm hover:shadow-lg focus:ring-2 focus:ring-primary focus:outline-none",
          active && "ring-2 ring-primary border-primary bg-primary/10",
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
            <div className={cn("rounded-md flex items-center justify-center p-1.5", statusStyles.success.button)}>
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
          <h3 className="text-lg font-bold text-foreground text-center mb-3 line-clamp-2">
            {title}
          </h3>
          
          {description && (
            <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-3 flex-1">
              {description}
            </p>
          )}

          {/* Course Meta */}
          <div className="space-y-3">
            <CourseMeta 
              duration={duration}
              level={level}
              getLevelColor={getLevelColor}
              getLevelIcon={getLevelIcon}
              variant="vertical"
              className="items-center"
            />

            {/* Progress Bar */}
            {progress && (
              <CourseProgress progress={progress} variant="detailed" />
            )}

            {/* Action Button */}
            <div className="mt-4">
              <CourseActions
                isActive={active}
                hasProgress={!!(progress && progress.percentage > 0)}
                onAction={() => onClick(id)}
                disabled={disabled}
                variant="full"
              />
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
        "border-2 rounded-xl hover:bg-muted/50 cursor-pointer transition-all duration-200 p-4 bg-card",
        "shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary focus:outline-none",
        active && "ring-2 ring-primary border-primary bg-primary/10",
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
            <h3 className="text-lg font-bold text-foreground line-clamp-1 flex-1">
              {title}
            </h3>
            {active && (
              <div className={cn("ml-2 rounded-md flex items-center justify-center p-1", statusStyles.success.button)}>
                <Check className="text-white stroke-[4] h-3 w-3" />
              </div>
            )}
          </div>

          {description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {description}
            </p>
          )}

          {/* Meta and Progress */}
          <CourseMeta 
            duration={duration}
            level={level}
            getLevelColor={getLevelColor}
            getLevelIcon={getLevelIcon}
            variant="horizontal"
            className="mb-3"
          />

          {/* Progress Bar */}
          {progress && (
            <CourseProgress progress={progress} variant="compact" className="mb-3" />
          )}
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0 ml-4">
          <CourseActions
            isActive={active}
            hasProgress={!!(progress && progress.percentage > 0)}
            onAction={() => onClick(id)}
            disabled={disabled}
            variant="compact"
          />
        </div>
      </div>
    </div>
  );
};
