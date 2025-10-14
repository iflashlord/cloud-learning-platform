'use client';

import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
} from "@clerk/nextjs";

interface SidebarUserProfileProps {
  isCollapsed?: boolean;
}

export const SidebarUserProfile = ({ isCollapsed = false }: SidebarUserProfileProps) => {
  return (
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
  );
};