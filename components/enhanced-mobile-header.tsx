/**
 * 📱 Enhanced Mobile Header
 * 
 * Responsive mobile header with:
 * - Perfect contrast in light/dark modes
 * - Smooth animations and transitions
 * - Accessibility features
 * - Theme-aware styling
 */

"use client";

import * as React from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { CONFIG } from "@/lib/config";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { EnhancedMobileSidebar } from "@/components/enhanced-mobile-sidebar";

export const EnhancedMobileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <nav className={cn(
        "lg:hidden px-4 h-[60px] flex items-center justify-between",
        "bg-background/80 dark:bg-background/80 backdrop-blur-md",
        "border-b border-border/50 fixed top-0 w-full z-50",
        "shadow-sm"
      )}>
        {/* Left side - Menu and Logo */}
        <div className="flex items-center gap-3">
          <EnhancedButton
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="p-2"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </EnhancedButton>
          
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              "bg-gradient-to-br from-primary to-primary/80"
            )}>
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-foreground">
              {CONFIG.PLATFORM_NAME}
            </h1>
          </div>
        </div>

        {/* Right side - Theme and User */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher variant="compact" size="sm" />
          
          <div className="ml-1">
            <ClerkLoading>
              <div className="w-7 h-7 bg-muted rounded-full animate-pulse" />
            </ClerkLoading>
            <ClerkLoaded>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-7 h-7",
                  }
                }}
              />
            </ClerkLoaded>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Drawer */}
      <EnhancedMobileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};