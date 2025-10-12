/**
 * 📱 Enhanced Mobile Sidebar
 * 
 * Mobile drawer sidebar with:
 * - Smooth slide animations
 * - Perfect contrast in light/dark modes  
 * - Touch-friendly interactions
 * - Accessibility features
 * - Theme-aware styling
 */

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  X, 
  BookOpen,
  Trophy,
  Target,
  ShoppingCart,
  Infinity,
  Settings,
  GraduationCap
} from "lucide-react";

import { cn } from "@/lib/utils";
import { CONFIG } from "@/lib/config";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedCard } from "@/components/ui/enhanced-card";

interface EnhancedMobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MobileSidebarItemProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string | number;
  onClose: () => void;
}

const MobileSidebarItem: React.FC<MobileSidebarItemProps> = ({
  label,
  icon: Icon,
  href,
  badge,
  onClose,
}) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <EnhancedButton
      variant={active ? "primary" : "ghost"}
      className="justify-start h-12 w-full group relative"
      asChild
      onClick={onClose}
    >
      <Link href={href}>
        <Icon className={cn(
          "h-5 w-5 mr-3 transition-colors duration-200",
          active 
            ? "text-primary-foreground" 
            : "text-muted-foreground group-hover:text-foreground"
        )} />
        <span className={cn(
          "font-medium transition-colors duration-200",
          active 
            ? "text-primary-foreground" 
            : "text-foreground group-hover:text-primary"
        )}>
          {label}
        </span>
        {badge && (
          <span className={cn(
            "absolute -top-1 -right-1 min-w-[18px] h-4 px-1",
            "bg-red-500 text-white text-xs font-bold rounded-full",
            "flex items-center justify-center"
          )}>
            {badge}
          </span>
        )}
      </Link>
    </EnhancedButton>
  );
};

export const EnhancedMobileSidebar: React.FC<EnhancedMobileSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const sidebarItems = [
    { label: "Learn", href: "/learn", icon: BookOpen },
    { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { label: "Quests", href: "/quests", icon: Target, badge: "3" },
    { label: "Shop", href: "/shop", icon: ShoppingCart },
    { label: "Courses", href: "/courses", icon: BookOpen },
  ];

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[280px] transform transition-transform duration-300 ease-out lg:hidden",
          "bg-background/95 dark:bg-background/95 backdrop-blur-md",
          "border-r border-border/50 shadow-2xl",
          "flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <Link href="/learn" onClick={onClose} className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              "bg-gradient-to-br from-primary to-primary/80"
            )}>
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                {CONFIG.PLATFORM_NAME}
              </h1>
              <p className="text-xs text-muted-foreground">
                Learn & Grow
              </p>
            </div>
          </Link>
          
          <EnhancedButton
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </EnhancedButton>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="flex flex-col gap-y-2 px-4">
            {sidebarItems.map((item) => (
              <MobileSidebarItem
                key={item.href}
                label={item.label}
                href={item.href}
                icon={item.icon}
                badge={item.badge}
                onClose={onClose}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 p-4 space-y-4">
          {/* Premium Upgrade Card */}
          <EnhancedCard 
            variant="interactive"
            padding="sm"
            className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200/50 dark:border-amber-800/50"
          >
            <Link href="/pro" onClick={onClose} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Infinity className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                  Upgrade to Pro
                </div>
                <div className="text-xs text-amber-600 dark:text-amber-400">
                  Unlock all features
                </div>
              </div>
            </Link>
          </EnhancedCard>

          {/* Settings */}
          <EnhancedButton
            variant="ghost"
            className="w-full justify-start"
            asChild
          >
            <Link href="/settings" onClick={onClose}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </EnhancedButton>
        </div>
      </div>
    </>
  );
};