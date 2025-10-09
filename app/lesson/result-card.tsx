import Image from "next/image";

import { cn } from "@/lib/utils";
import { statusStyles } from "@/lib/style-utils";
import { useThemeClasses } from "@/lib/theme-utils";

type Props = {
  value: number;
  variant: "points" | "hearts";
};

export const ResultCard = ({ value, variant }: Props) => {
  const themeClasses = useThemeClasses();
  const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg"; 
  
  // Use consistent design system colors
  const variantStyles = {
    points: {
      bg: themeClasses.primaryButton.split(' ').find(c => c.startsWith('bg-')) || 'bg-blue-500',
      text: themeClasses.primaryText,
      border: themeClasses.primaryBorder?.replace('border-', '') || 'blue-500',
    },
    hearts: {
      bg: statusStyles.error.button.split(' ').find(c => c.startsWith('bg-')) || 'bg-red-500',
      text: statusStyles.error.text,
      border: statusStyles.error.border?.replace('border-', '') || 'red-500',
    }
  };

  const styles = variantStyles[variant];

  return (
    <div className={cn(
      "rounded-2xl border-2 w-full shadow-md",
      styles.bg,
      `border-${styles.border}`,
    )}>
      <div className={cn(
        "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
        styles.bg
      )}>
        {variant === "hearts" ? "Hearts Left" : "Total XP"}
      </div>
      <div className={cn(
        "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg shadow-inner",
        styles.text
      )}>
        <Image
          alt="Icon"
          src={imageSrc}
          height={30}
          width={30}
          className="mr-1.5"
        />
        {value}
      </div>
    </div>
  );
};
