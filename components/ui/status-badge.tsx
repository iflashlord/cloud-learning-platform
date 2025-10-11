import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "inactive" | "draft" | "published" | "completed" | "in-progress" | "locked";
  children?: React.ReactNode;
  className?: string;
}

export const StatusBadge = ({ status, children, className }: StatusBadgeProps) => {
  const getStatusStyles = (status: StatusBadgeProps["status"]) => {
    const styles = {
      active: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-700",
      inactive: "bg-muted text-muted-foreground border-border",
      draft: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700",
      published: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-700",
      completed: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-700",
      "in-progress": "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 border-orange-200 dark:border-orange-700",
      locked: "bg-muted text-muted-foreground/60 border-border"
    };
    
    return styles[status];
  };

  const getStatusText = (status: StatusBadgeProps["status"]) => {
    const text = {
      active: "Active",
      inactive: "Inactive", 
      draft: "Draft",
      published: "Published",
      completed: "Completed",
      "in-progress": "In Progress",
      locked: "Locked"
    };
    
    return text[status];
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      getStatusStyles(status),
      className
    )}>
      {children || getStatusText(status)}
    </span>
  );
};