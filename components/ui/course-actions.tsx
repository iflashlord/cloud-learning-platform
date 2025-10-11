import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  isActive?: boolean;
  hasProgress?: boolean;
  onAction: () => void;
  disabled?: boolean;
  variant?: "full" | "compact";
  className?: string;
};

export const CourseActions = ({ 
  isActive, 
  hasProgress, 
  onAction, 
  disabled,
  variant = "full",
  className 
}: Props) => {
  const getButtonText = () => {
    if (isActive) {
      return variant === "compact" ? "Continue" : "Continue Learning";
    }
    if (hasProgress) {
      return variant === "compact" ? "Switch" : "Switch to Course";
    }
    return variant === "compact" ? "Start" : "Start Course";
  };

  if (isActive) {
    return (
      <Button
        onClick={onAction}
        disabled={disabled}
        className={cn(
          variant === "full" ? "w-full py-3 px-4" : "py-2 px-4 whitespace-nowrap",
          "font-medium text-sm transition-colors hover:opacity-90",
          className
        )}
      >
        {getButtonText()}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={onAction}
      disabled={disabled}
      className={cn(
        variant === "full" ? "w-full py-3 px-4" : "py-2 px-4 whitespace-nowrap",
        "font-medium text-sm transition-colors",
        className
      )}
    >
      {getButtonText()}
    </Button>
  );
};