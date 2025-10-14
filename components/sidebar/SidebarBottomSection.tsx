'use client';

import Link from "next/link";
import { Settings } from "lucide-react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { cn } from "@/lib/utils";

interface SidebarBottomSectionProps {
  isCollapsed?: boolean;
  showThemeSwitcher?: boolean;
  showSettings?: boolean;
}

export const SidebarBottomSection = ({ 
  isCollapsed = false, 
  showThemeSwitcher = true,
  showSettings = true 
}: SidebarBottomSectionProps) => {
  return (
    <div className="px-4 pb-4 space-y-4">
      {/* Divider */}
      <div className="border-t border-border/50" />
      
      {/* Theme Switcher */}
      {showThemeSwitcher && !isCollapsed && (
        <div className="flex justify-center">
          <ThemeSwitcher variant="compact" size="sm" />
        </div>
      )}

      {/* Settings */}
      {showSettings && (
        <EnhancedButton
          variant="ghost"
          size="sm"
          className={cn(
            "w-full transition-all duration-200",
            isCollapsed ? "justify-center px-2" : "justify-start"
          )}
          asChild
          title={isCollapsed ? "Settings" : undefined}
        >
          <Link href="/settings">
            <Settings className={cn(
              "h-4 w-4 transition-all duration-200",
              isCollapsed ? "mr-0" : "mr-2"
            )} />
            {!isCollapsed && "Settings"}
          </Link>
        </EnhancedButton>
      )}
    </div>
  );
};