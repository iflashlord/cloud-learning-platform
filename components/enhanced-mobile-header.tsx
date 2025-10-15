/**
 * 📱 Enhanced Universal Header
 * 
 * Universal header for all screen sizes with:
 * - Perfect contrast in light/dark modes
 * - Smooth animations and transitions
 * - Accessibility features
 * - Theme-aware styling
 * - Unique navigation items (not duplicating bottom nav)
 */

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Crown, Settings, Library } from "lucide-react";
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { CONFIG } from "@/lib/config";
import { zIndex } from "@/lib/z-index-system";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

// Admin user IDs (should match server-side config)
const adminIds = [
  "user_2swsZKlEAZZ8Xqqt5gtocD95RI4", // Behrouz 
];

// Header navigation items (different from bottom nav to avoid duplication)
const getHeaderNavItems = (isAdmin: boolean) => [
  { label: "Courses", href: "/courses", icon: Library, activeColor: "text-indigo-500 dark:text-indigo-400" },
  { label: "Pro", href: "/pro", icon: Crown, activeColor: "text-yellow-500 dark:text-yellow-400" },
  ...(isAdmin ? [{ label: "Admin", href: "/admin", icon: Settings, activeColor: "text-red-500 dark:text-red-400" }] : []),
];

interface HeaderNavItemProps {
  item: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    activeColor: string;
  };
  isActive: boolean;
}

const HeaderNavItem = ({ item, isActive }: HeaderNavItemProps) => {
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
  const { user } = useUser();
  
  // Check if current user is admin
  const isUserAdmin = user?.id ? adminIds.includes(user.id) : false;
  const headerNavItems = getHeaderNavItems(isUserAdmin);

  return (
    <nav className={cn(
      "px-4 h-[60px] flex items-center justify-between",
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
        {headerNavItems.map((item) => (
          <HeaderNavItem
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