"use client";

import Link from "next/link";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

import { courses } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { useThemeClasses } from "@/lib/theme-utils";
import { statusStyles } from "@/lib/style-utils";
import { cn } from "@/lib/utils";

type Props = {
  activeCourse: {
    id: number;
    title: string;
    imageSrc: string;
  };
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const UserProgress = ({ 
  activeCourse, 
  points, 
  hearts, 
  hasActiveSubscription
}: Props) => {
  const themeClasses = useThemeClasses();
  
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Button variant="ghost" className="flex items-center gap-x-2 hover:bg-neutral-100">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border border-neutral-200"
            width={32}
            height={32}
          />
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-xs text-muted-foreground">Switch Course</span>
            <span className="text-sm font-medium text-foreground truncate max-w-[120px]">
              {activeCourse.title}
            </span>
          </div>
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className={cn("gap-x-2", themeClasses.primaryText)}>
          <Image src="/points.svg" height={28} width={28} alt="Points" />
          <span className="font-medium">{points}</span>
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className={cn("gap-x-2", statusStyles.error.text)}>
          <Image src="/heart.svg" height={22} width={22} alt="Hearts" />
          <span className="font-medium">
            {hasActiveSubscription 
              ? <InfinityIcon className="h-4 w-4 stroke-[3]" /> 
              : hearts
            }
          </span>
        </Button>
      </Link>
    </div>
  );
};
