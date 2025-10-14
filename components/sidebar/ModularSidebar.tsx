'use client';

import { BookOpen, Trophy, Target, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/lib/enhanced-layout-system";
import { useSidebar } from "@/lib/sidebar-context";
import { SidebarProps, SidebarItem } from "./types";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarProUpgrade } from "./SidebarProUpgrade";
import { SidebarBottomSection } from "./SidebarBottomSection";
import { SidebarUserProfile } from "./SidebarUserProfile";
import { SidebarToggle } from "./SidebarToggle";

const defaultSidebarItems: SidebarItem[] = [
  { label: "Learn", href: "/learn", icon: BookOpen },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { label: "Quests", href: "/quests", icon: Target, badge: "3" },
  { label: "Shop", href: "/shop", icon: ShoppingCart },
  { label: "Courses", href: "/courses", icon: BookOpen },
];

export const ModularSidebar = ({ 
  className,
  items = defaultSidebarItems,
  showProUpgrade = true,
  showThemeSwitcher = true,
  showSettings = true
}: SidebarProps) => {
  const { isMobile } = useResponsive();
  const { isCollapsed, setIsCollapsed, sidebarWidth } = useSidebar();

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
      <SidebarToggle 
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Logo and Title */}
      <SidebarLogo isCollapsed={isCollapsed} />

      {/* Navigation Items */}
      <SidebarNavigation items={items} isCollapsed={isCollapsed} />

      {/* Bottom Section */}
      <SidebarBottomSection 
        isCollapsed={isCollapsed}
        showThemeSwitcher={showThemeSwitcher}
        showSettings={showSettings}
      />

      {/* Pro Upgrade Card */}
      {showProUpgrade && (
        <div className="px-4 pb-4">
          <SidebarProUpgrade isCollapsed={isCollapsed} />
        </div>
      )}

      {/* User Profile */}
      <SidebarUserProfile isCollapsed={isCollapsed} />
    </div>
  );
};