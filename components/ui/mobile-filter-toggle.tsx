"use client";

import { Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
};

export const MobileFilterToggle = ({
  isOpen,
  onToggle,
  className
}: Props) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center justify-between w-full p-3 border border-border rounded-lg bg-muted hover:bg-muted/80 transition-colors lg:hidden",
        className
      )}
      aria-expanded={isOpen}
      aria-controls="filters-content"
    >
      <span className="flex items-center gap-2 font-medium text-foreground">
        <Filter className="w-4 h-4" />
        Filters & View
      </span>
      <ChevronDown className={cn("w-4 h-4 transition-transform text-muted-foreground", isOpen && "rotate-180")} />
    </button>
  );
};