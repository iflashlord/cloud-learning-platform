"use client";

import { Grid, List as ListIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

type Props = {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
};

export const ViewModeToggle = ({
  viewMode,
  onViewModeChange,
  className
}: Props) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground mb-2">
        View Mode
      </label>
      <div className="flex border-2 border-border rounded-xl p-1 bg-muted">
        <button
          onClick={() => onViewModeChange("grid")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all focus:ring-2 focus:ring-primary focus:ring-offset-2",
            viewMode === "grid" 
              ? "bg-primary text-primary-foreground shadow-sm" 
              : "text-muted-foreground hover:bg-background hover:text-foreground"
          )}
          aria-pressed={viewMode === "grid"}
          aria-label="Grid view"
        >
          <Grid className="w-4 h-4" />
          <span className="hidden sm:inline">Grid</span>
        </button>
        <button
          onClick={() => onViewModeChange("list")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all focus:ring-2 focus:ring-primary focus:ring-offset-2",
            viewMode === "list" 
              ? "bg-primary text-primary-foreground shadow-sm" 
              : "text-muted-foreground hover:bg-background hover:text-foreground"
          )}
          aria-pressed={viewMode === "list"}
          aria-label="List view"
        >
          <ListIcon className="w-4 h-4" />
          <span className="hidden sm:inline">List</span>
        </button>
      </div>
    </div>
  );
};