"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { CONFIG } from "@/lib/config";
import { useThemeClasses } from "@/lib/theme-utils";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

import { SidebarItem } from "./sidebar-item";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const themeClasses = useThemeClasses();
  
  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className={cn("text-2xl font-extrabold tracking-wide", themeClasses.primaryText)}>
            {CONFIG.PLATFORM_NAME}
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem 
          label="Learn" 
          href="/learn"
          iconSrc="/learn.svg"
        />
        <SidebarItem 
          label="Leaderboard" 
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem 
          label="Quests" 
          href="/quests"
          iconSrc="/quests.svg"
        />
        <SidebarItem 
          label="Shop" 
          href="/shop"
          iconSrc="/shop.svg"
        />
        <SidebarItem 
          label="Courses" 
          href="/courses"
          iconSrc="/learn.svg"
        />
      </div>
      <div className="px-4 pb-4">
        <div className="border-t pt-4 space-y-4">
          <SidebarItem 
            label="Upgrade" 
            href="/pro"
            iconSrc="/unlimited.svg"
          />
          <div className="flex justify-center">
            <ThemeSwitcher variant="compact" size="sm" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
