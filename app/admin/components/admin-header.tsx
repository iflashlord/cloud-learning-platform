"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

import { DarkModeToggle } from "@/components/dark-mode-toggle";

export const AdminHeader = () => {
  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center">
        <Link href="/admin" className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Learning Platform
        </Link>
        <span className="ml-2 px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 rounded">
          Admin
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <DarkModeToggle />
        
        <Link href="/">
          <Button variant="outline" size="sm">
            <User className="w-4 h-4 mr-2" />
            View Site
          </Button>
        </Link>
        
        <Button variant="outline" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
};