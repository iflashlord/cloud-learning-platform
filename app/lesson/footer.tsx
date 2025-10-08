import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useThemeClasses } from "@/lib/theme-utils";

type Props = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: number;
};

export const Footer = ({ 
  onCheck, 
  status, 
  disabled, 
  lessonId,
}: Props) => {
  const themeClasses = useThemeClasses();
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width: 1024px)");

  return (
    <footer className={cn(
      "lg:h-[100px] h-[80px] border-t-2",
      status === "correct" && `border-transparent ${themeClasses.successBg}`,
      status === "wrong" && `border-transparent ${themeClasses.errorBg}`,
    )}>
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className={cn("font-bold text-base lg:text-2xl flex items-center", themeClasses.successText)}>
            <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Nicely done!
          </div>
        )}
        {status === "wrong" && (
          <div className={cn("font-bold text-base lg:text-2xl flex items-center", themeClasses.errorText)}>
            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Try again.
          </div>
        )}
        {status === "completed" && (
          <Button
            variant="default"
            size={isMobile ? "sm" : "lg"}
            onClick={() => window.location.href = `/lesson/${lessonId}`}
          >
            Practice again
          </Button>
        )}
        <Button
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  );
};
