"use client";

import Link from "next/link";
import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import "react-circular-progressbar/dist/styles.css";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage
}: Props) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;

  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  return (
    <Link 
      href={href} 
      aria-disabled={locked} 
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <div className="h-[102px] w-[102px] relative">
            <div className="absolute -top-8 left-2.5 px-3 py-2 border-2 font-bold uppercase text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl animate-pulse tracking-wide z-10 shadow-lg">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {percentage > 0 ? "Continue" : "Start"}
              </span>
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-green-500 transform -translate-x-1/2" />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: "#10b981",
                  strokeWidth: 6,
                },
                trail: {
                  stroke: "#e5e7eb",
                  strokeWidth: 6,
                },
              }}
            >
              <Button
                size="icon"
                variant={locked ? "outline" : "secondary"}
                className={`h-[70px] w-[70px] border-b-8 transition-all duration-200 hover:scale-110 ${
                  percentage > 0 
                    ? "bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600" 
                    : "bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                } text-white shadow-lg hover:shadow-xl`}
              >
                <Icon
                  className="h-10 w-10 text-white drop-shadow-lg"
                />
              </Button>
            </CircularProgressbarWithChildren>
            {percentage > 0 && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {Math.round(percentage)}%
              </div>
            )}
          </div>
        ) : (
          <Button
            size="icon"
            variant={locked ? "outline" : "secondary"}
            className={cn(
              "h-[70px] w-[70px] border-b-8 transition-all duration-200 hover:scale-105 shadow-lg",
              isCompleted && "bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-xl",
              isLast && !locked && !isCompleted && "bg-gradient-to-br from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white",
              locked && "opacity-50 cursor-not-allowed"
            )}
          >
            <Icon
              className={cn(
                "h-10 w-10",
                locked
                  ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                  : isCompleted
                    ? "text-white drop-shadow-lg"
                    : isLast
                      ? "text-white drop-shadow-lg"
                      : "fill-primary-foreground text-primary-foreground",
                isCompleted && "fill-none stroke-[4]"
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
};
