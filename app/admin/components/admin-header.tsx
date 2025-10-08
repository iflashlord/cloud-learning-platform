"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export const AdminHeader = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <Link href="/admin" className="text-xl font-bold text-gray-800">
          Learning Platform
        </Link>
        <span className="ml-2 px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">
          Admin
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="primaryOutline" size="sm">
            <User className="w-4 h-4 mr-2" />
            View Site
          </Button>
        </Link>
        
        <Button variant="dangerOutline" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
};