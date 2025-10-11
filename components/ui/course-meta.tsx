import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  duration?: string;
  level?: string;
  getLevelColor?: (level: string) => string;
  getLevelIcon?: (level: string) => React.ReactNode;
  variant?: "horizontal" | "vertical";
  className?: string;
};

export const CourseMeta = ({ 
  duration, 
  level, 
  getLevelColor,
  getLevelIcon,
  variant = "horizontal",
  className 
}: Props) => {
  const containerClass = variant === "vertical" ? "space-y-3" : "flex items-center gap-4";

  return (
    <div className={cn(containerClass, className)}>
      {level && getLevelColor && (
        <div className={cn("px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1", getLevelColor(level))}>
          {getLevelIcon && getLevelIcon(level)}
          <span>{level}</span>
        </div>
      )}
      
      {duration && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
      )}
    </div>
  );
};