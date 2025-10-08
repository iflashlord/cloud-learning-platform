"use client";

import Link from "next/link";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

import { courses } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { useThemeClasses } from "@/lib/theme-utils";
import { cn } from "@/lib/utils";

type Props = {
  activeCourse: typeof courses.$inferSelect;
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
        <Button variant="ghost" className="flex items-center gap-x-2 hover:bg-gray-100">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-xs text-gray-500">Switch Course</span>
            <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
              {activeCourse.title}
            </span>
          </div>
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className={themeClasses.primaryText}>
          <Image src="/points.svg" height={28} width={28} alt="Points" className="mr-2" />
          {points}
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image src="/heart.svg" height={22} width={22} alt="Hearts" className="mr-2" />
          {hasActiveSubscription 
            ? <InfinityIcon className="h-4 w-4 stroke-[3]" /> 
            : hearts
          }
        </Button>
      </Link>
    </div>
  );
};
