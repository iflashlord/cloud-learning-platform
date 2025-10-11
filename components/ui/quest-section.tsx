"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  icon: LucideIcon;
  iconBgClass: string;
  children: React.ReactNode;
  className?: string;
};

export const QuestSection = ({
  title,
  icon: Icon,
  iconBgClass,
  children,
  className
}: Props) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", iconBgClass)}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/30 to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
};