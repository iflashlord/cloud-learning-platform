"use client";

import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, User } from "lucide-react";

import { ThemeSwitcher } from "@/components/ui/theme-switcher";

export const AdminHeader = () => {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Learning Platform
        </Link>
        <Badge variant="warning" className="text-xs">
          Admin
        </Badge>
      </div>
      
      <div className="flex items-center space-x-4">
        <ThemeSwitcher variant="compact" size="sm" />
        
        <Link href="/">
          <Button variant="outline" size="sm">
            <User className="w-4 h-4 mr-2" />
            View Site
          </Button>
        </Link>
        
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
};
