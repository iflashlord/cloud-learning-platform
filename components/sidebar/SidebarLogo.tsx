'use client';

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONFIG } from "@/lib/config";

interface SidebarLogoProps {
  isCollapsed?: boolean;
}

export const SidebarLogo = ({ isCollapsed = false }: SidebarLogoProps) => {
  return (
    <Link href="/learn" className="group">
      <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3 transition-all duration-200">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          "bg-gradient-to-br from-primary to-primary/80",
          "shadow-lg group-hover:shadow-xl transition-all duration-200"
        )}>
          <GraduationCap className="h-7 w-7 text-white" />
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <h1 className={cn(
              "text-xl font-bold tracking-wide truncate",
              "text-foreground dark:text-foreground",
              "group-hover:text-primary transition-colors duration-200"
            )}>
              {CONFIG.PLATFORM_NAME}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Learn & Grow
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};