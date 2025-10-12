/**
 * 🧭 Enhanced Sidebar Component
 * 
 * Fully responsive sidebar with:
 * - Perfect contrast in light/dark modes
 * - Smooth animations and interactions
 * - Mobile-first responsive design
 * - Accessibility features
 * - Theme-aware styling
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
} from "@clerk/nextjs";
import { 
  Loader2, 
  GraduationCap,
  BookOpen,
  Trophy,
  Target,
  ShoppingCart,
  Infinity,
  Settings,
  Menu,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { CONFIG } from "@/lib/config";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { useResponsive } from "@/lib/enhanced-layout-system";
import { useSidebar } from "@/lib/sidebar-context";
import { zIndex, COMPONENT_Z_INDEX } from "@/lib/z-index-system";

// ============================================================================
// ENHANCED SIDEBAR ITEM
// ============================================================================

interface EnhancedSidebarItemProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string | number;
  disabled?: boolean;
  isCollapsed?: boolean;
}

const EnhancedSidebarItem: React.FC<EnhancedSidebarItemProps> = ({
  label,
  icon: Icon,
  href,
  badge,
  disabled = false,
  isCollapsed = false,
}) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <EnhancedButton
      legacyVariant={active ? "sidebarOutline" : "sidebar"}
      className={cn(
        "h-[52px] w-full group relative",
        "transition-all duration-200 ease-out",
        isCollapsed ? "justify-center px-2" : "justify-start",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      asChild
      disabled={disabled}
      title={isCollapsed ? label : undefined}
    >
      <Link href={disabled ? "#" : href}>
        <Icon className={cn(
          "h-6 w-6 transition-colors duration-200 flex-shrink-0",
          isCollapsed ? "mr-0" : "mr-4",
          active 
            ? "text-primary dark:text-primary-foreground" 
            : "text-muted-foreground group-hover:text-foreground"
        )} />
        {!isCollapsed && (
          <span className={cn(
            "font-semibold transition-colors duration-200 truncate",
            active 
              ? "text-primary dark:text-primary-foreground" 
              : "text-muted-foreground group-hover:text-foreground"
          )}>
            {label}
          </span>
        )}
        {badge && !isCollapsed && (
          <span className={cn(
            "absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5",
            "bg-red-500 text-white text-xs font-bold rounded-full",
            "flex items-center justify-center",
            "animate-pulse"
          )}>
            {badge}
          </span>
        )}
        {badge && isCollapsed && (
          <span className={cn(
            "absolute -top-1 -right-1 w-3 h-3",
            "bg-red-500 rounded-full",
            "animate-pulse"
          )} />
        )}
      </Link>
    </EnhancedButton>
  );
};

// ============================================================================
// MAIN SIDEBAR COMPONENT
// ============================================================================

interface EnhancedSidebarProps {
  className?: string;
}

export const EnhancedSidebar: React.FC<EnhancedSidebarProps> = ({ className }) => {
  const { isMobile } = useResponsive();
  const { isCollapsed, setIsCollapsed, sidebarWidth } = useSidebar();

  const sidebarItems = [
    { label: "Learn", href: "/learn", icon: BookOpen },
    { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { label: "Quests", href: "/quests", icon: Target, badge: "3" },
    { label: "Shop", href: "/shop", icon: ShoppingCart },
    { label: "Courses", href: "/courses", icon: BookOpen },
  ];

  const sidebarContent = (
    <>
      {/* Logo and Title */}
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

      {/* Navigation Items */}
      <div className="flex flex-col gap-y-2 flex-1 px-2">
        {sidebarItems.map((item) => (
          <EnhancedSidebarItem
            key={item.href}
            label={item.label}
            href={item.href}
            icon={item.icon}
            badge={item.badge}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="px-4 pb-4 space-y-4">
        {/* Divider */}
        <div className="border-t border-border/50" />
        
        {/* Premium Upgrade */}
        <EnhancedCard 
          variant="interactive"
          padding="sm"
          className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200/50 dark:border-amber-800/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Infinity className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                  Upgrade to Pro
                </div>
                <div className="text-xs text-amber-600 dark:text-amber-400">
                  Unlock all features
                </div>
              </div>
            )}
          </div>
        </EnhancedCard>

        {/* Theme Switcher */}
        {!isCollapsed && (
          <div className="flex justify-center">
            <ThemeSwitcher variant="compact" size="sm" />
          </div>
        )}

        {/* Settings */}
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
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          <ClerkLoading>
            <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                }
              }}
            />
          </ClerkLoaded>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground">
                Welcome back!
              </div>
              <div className="text-xs text-muted-foreground">
                Keep learning
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Mobile Version (Hidden Drawer)
  if (isMobile) {
    return null; // Mobile sidebar is handled by MobileSidebar component
  }

  // Desktop Version - Relative positioning within CSS Grid
  return (
    <div 
      className={cn(
        "flex h-full relative flex-col",
        "bg-card/95 dark:bg-card/95 backdrop-blur-md",
        "border-r border-border/50 shadow-lg",
        "transition-all duration-300 ease-out",
        "sticky top-0", // Stick to top when scrolling
        className,
      )}
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* Collapse Toggle */}
      <EnhancedButton
        variant="ghost"
        size="sm"
        className={cn(
          "absolute -right-3 top-6 w-6 h-6 rounded-full shadow-md bg-background border border-border/50",
          "z-10" // Relative z-index within grid context
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <Menu className="h-3 w-3" />
        ) : (
          <X className="h-3 w-3" />
        )}
      </EnhancedButton>

      {sidebarContent}
    </div>
  );
};

export default EnhancedSidebar;