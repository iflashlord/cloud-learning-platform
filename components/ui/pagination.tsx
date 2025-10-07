"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showTotal?: boolean;
  totalItems?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showTotal = false,
  totalItems = 0,
}: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center text-sm text-muted-foreground">
        {showTotal && (
          <div>
            Showing {Math.min((currentPage - 1) * 10 + 1, totalItems)} to{" "}
            {Math.min(currentPage * 10, totalItems)} of {totalItems} entries
          </div>
        )}
      </div>

      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-8 w-8 p-0 border border-slate-200"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getVisiblePages().map((page, index) => {
          if (page === "...") {
            return (
              <Button
                key={`dots-${index}`}
                variant="ghost"
                size="sm"
                disabled
                className="h-8 w-8 p-0 border border-slate-200"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            );
          }

          return (
            <Button
              key={page}
              variant={currentPage === page ? "primary" : "ghost"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className={cn(
                "h-8 w-8 p-0",
                currentPage === page 
                  ? "bg-sky-500 text-white border-sky-600" 
                  : "border border-slate-200"
              )}
            >
              {page}
            </Button>
          );
        })}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="h-8 w-8 p-0 border border-slate-200"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}