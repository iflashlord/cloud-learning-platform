"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
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
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  icon: any;
  submenu?: MenuItem[];
}

const sidebarItems: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    label: "AWS Certifications",
    href: "/admin/courses",
    icon: GraduationCap,
    submenu: [
      {
        label: "Courses",
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
    ],
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
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isMenuExpanded = (label: string) => expandedMenus.includes(label);

  const isSubmenuActive = useCallback((submenu: MenuItem[]) => {
    return submenu.some(item => item.href === pathname);
  }, [pathname]);

  // Auto-expand AWS Certifications menu if any submenu item is active on initial load
  useEffect(() => {
    const awsCertificationsItem = sidebarItems.find(item => item.label === "AWS Certifications");
    if (awsCertificationsItem?.submenu && isSubmenuActive(awsCertificationsItem.submenu)) {
      setExpandedMenus(["AWS Certifications"]);
    }
  }, [pathname, isSubmenuActive]);

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        <p className="text-sm text-gray-500 mt-1">AWS Cloud Academy</p>
      </div>
      
      <nav className="px-4 space-y-1">
        {sidebarItems.map((item) => {
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isActive = pathname === item.href || 
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const isExpanded = isMenuExpanded(item.label);
          const submenuActive = hasSubmenu && item.submenu && isSubmenuActive(item.submenu);



          return (
            <div key={item.label} className="space-y-1">
              {hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      submenuActive || isActive
                        ? "bg-orange-100 text-orange-900 border-r-2 border-orange-500"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {isExpanded && item.submenu && (
                    <div className="ml-6 space-y-1">
                      {item.submenu.map((subItem) => {
                        const subIsActive = pathname === subItem.href;
                        
                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                              subIsActive
                                ? "bg-orange-50 text-orange-800 border-l-2 border-orange-500"
                                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                            )}
                          >
                            <subItem.icon className="w-4 h-4 mr-3" />
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
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
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};