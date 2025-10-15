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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, BookOpen, Trophy, Target, ShoppingCart } from "lucide-react";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { CONFIG } from "@/lib/config";
import { zIndex } from "@/lib/z-index-system";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

// Mobile navigation items
const mobileNavItems = [
  { label: "Learn", href: "/learn", icon: BookOpen, activeColor: "text-blue-500 dark:text-blue-400" },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy, activeColor: "text-amber-500 dark:text-amber-400" },
  { label: "Quests", href: "/quests", icon: Target, activeColor: "text-green-500 dark:text-green-400" },
  { label: "Shop", href: "/shop", icon: ShoppingCart, activeColor: "text-purple-500 dark:text-purple-400" },
];

interface MobileNavItemProps {
  item: typeof mobileNavItems[0];
  isActive: boolean;
}

const MobileNavItem = ({ item, isActive }: MobileNavItemProps) => {
  const { label, href, icon: Icon, activeColor } = item;

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center relative",
        "min-w-0 flex-1 py-1 px-2",
        "transition-all duration-200 ease-out",
        "active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        "rounded-lg"
      )}
    >
      <Icon className={cn(
        "h-5 w-5 transition-all duration-200",
        isActive 
          ? activeColor
          : "text-muted-foreground"
      )} />
      <span className={cn(
        "text-xs font-medium mt-0.5 truncate w-full text-center",
        "transition-all duration-200",
        isActive 
          ? activeColor
          : "text-muted-foreground"
      )}>
        {label}
      </span>
    </Link>
  );
};

export const EnhancedMobileHeader: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className={cn(
      "lg:hidden px-4 h-[60px] flex items-center justify-between",
      "bg-background/80 dark:bg-background/80 backdrop-blur-md",
      "border-b border-border/50 fixed top-0 w-full",
      "shadow-sm",
      zIndex('MOBILE_HEADER')
    )}>
      {/* Left side - Logo */}
      <Link href="/learn" className="flex items-center gap-2">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center",
          "bg-gradient-to-br from-primary to-primary/80"
        )}>
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-lg font-bold text-foreground">
          {CONFIG.PLATFORM_NAME}
        </h1>
      </Link>

      {/* Center - Navigation Icons */}
      <div className="flex items-center justify-center flex-1 mx-4">
        {mobileNavItems.map((item) => (
          <MobileNavItem
            key={item.href}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
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
  );
};