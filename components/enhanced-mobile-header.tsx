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
import { GraduationCap, Crown, Settings, RotateCcw } from "lucide-react";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { CONFIG } from "@/lib/config";
import { zIndex } from "@/lib/z-index-system";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Header navigation items (different from bottom nav to avoid duplication)
const getHeaderNavItems = (isAdmin: boolean, isLoggedIn: boolean) => [
  { label: "Pro", href: "/pro", icon: Crown, activeColor: "text-yellow-500 dark:text-yellow-400" },
  ...(isLoggedIn ? [{ label: "Reset", href: "#", icon: RotateCcw, activeColor: "text-orange-500 dark:text-orange-400", action: "reset" }] : []),
  ...(isAdmin && isLoggedIn ? [{ label: "Admin", href: "/admin", icon: Settings, activeColor: "text-red-500 dark:text-red-400" }] : []),
];

interface HeaderNavItemProps {
  item: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    activeColor: string;
    action?: string;
  };
  isActive: boolean;
  onAction?: (action: string) => void;
}

const HeaderNavItem = ({ item, isActive, onAction }: HeaderNavItemProps) => {
  const { label, href, icon: Icon, activeColor, action } = item;

  const handleClick = (e: React.MouseEvent) => {
    if (action && onAction) {
      e.preventDefault();
      onAction(action);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
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
  const { isAdmin, isLoggedIn } = useIsAdmin();
  const [showResetDialog, setShowResetDialog] = React.useState(false);
  
  const headerNavItems = getHeaderNavItems(isAdmin, isLoggedIn);

  const handleAction = (action: string) => {
    if (action === 'reset') {
      setShowResetDialog(true);
    }
  };

  const handleResetProgress = async () => {
    try {
      const response = await fetch('/api/progress/reset', {
        method: 'POST',
      });
      
      if (response.ok) {
        // Reload the page to show updated progress
        window.location.reload();
      } else {
        console.error('Failed to reset progress');
      }
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
    setShowResetDialog(false);
  };

  return (
    <nav className={cn(
      "px-4 h-[60px] flex items-center justify-between",
      "bg-background dark:bg-background backdrop-blur-md",
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
            key={item.href + item.label}
            item={item}
            isActive={pathname === item.href}
            onAction={handleAction}
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

      {/* Reset Progress Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Progress</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset all your progress? This action cannot be undone and will permanently delete:
              <ul className="mt-2 ml-4 list-disc">
                <li>All completed lessons and units</li>
                <li>Your current points and hearts</li>
                <li>All quest completions</li>
                <li>Your leaderboard progress</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleResetProgress}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Reset Everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  );
};