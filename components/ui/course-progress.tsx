import { cn } from "@/lib/utils";

type Props = {
  progress: {
    percentage: number;
    totalChallenges: number;
    completedChallenges: number;
  };
  variant?: "compact" | "detailed";
  className?: string;
};

export const CourseProgress = ({ 
  progress, 
  variant = "detailed",
  className 
}: Props) => {
  if (variant === "compact") {
    return (
      <div className={cn("space-y-1", className)}>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Progress</span>
          <span className="font-medium">{progress.percentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div 
            className="h-1.5 bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>Progress</span>
        <span className="font-medium">{progress.percentage}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="h-2 bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground text-center">
        {progress.completedChallenges} of {progress.totalChallenges} challenges completed
      </div>
    </div>
  );
};