"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  BookOpen,
  ListChecks,
  FileQuestion,
  CheckCircle2,
  BarChart3,
  Settings,
  Users,
  CreditCard,
} from "lucide-react";

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    label: "AWS Certifications",
    href: "/admin/courses",
    icon: GraduationCap,
  },
  {
    label: "Units",
    href: "/admin/units",
    icon: BookOpen,
  },
  {
    label: "Lessons",
    href: "/admin/lessons",
    icon: ListChecks,
  },
  {
    label: "Questions",
    href: "/admin/challenges",
    icon: FileQuestion,
  },
  {
    label: "Answer Options",
    href: "/admin/challenge-options",
    icon: CheckCircle2,
  },
  {
    label: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Payments & Revenue",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        <p className="text-sm text-gray-500 mt-1">AWS Cloud Academy</p>
      </div>
      
      <nav className="px-4 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/admin" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-orange-100 text-orange-900 border-r-2 border-orange-500"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};