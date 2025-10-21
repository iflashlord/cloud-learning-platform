"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className='toaster group'
      position='bottom-left'
      offset='20px'
      gap={16}
      visibleToasts={4}
      closeButton
      richColors
      expand={true}
      toastOptions={{
        duration: 4000,
        style: {
          pointerEvents: "auto",
          zIndex: 1000,
          backdropFilter: "blur(8px)",
          boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background/95 group-[.toaster]:backdrop-blur-sm group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl group-[.toaster]:rounded-lg group-[.toaster]:border-2 group-[.toaster]:pointer-events-auto group-[.toaster]:font-medium",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:font-normal",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:hover:bg-primary/90",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:hover:bg-muted/90",
          closeButton:
            "group-[.toast]:bg-background/90 group-[.toast]:text-foreground group-[.toast]:border-border group-[.toast]:hover:bg-muted group-[.toast]:shadow-sm",
          success:
            "group-[.toast]:bg-green-50/95 group-[.toast]:text-green-900 group-[.toast]:border-green-300 dark:group-[.toast]:bg-green-950/30 dark:group-[.toast]:text-green-100 dark:group-[.toast]:border-green-700/50 group-[.toast]:shadow-green-200/20 dark:group-[.toast]:shadow-green-900/20",
          error:
            "group-[.toast]:bg-red-50/95 group-[.toast]:text-red-900 group-[.toast]:border-red-300 dark:group-[.toast]:bg-red-950/30 dark:group-[.toast]:text-red-100 dark:group-[.toast]:border-red-700/50 group-[.toast]:shadow-red-200/20 dark:group-[.toast]:shadow-red-900/20",
          warning:
            "group-[.toast]:bg-yellow-50/95 group-[.toast]:text-yellow-900 group-[.toast]:border-yellow-300 dark:group-[.toast]:bg-yellow-950/30 dark:group-[.toast]:text-yellow-100 dark:group-[.toast]:border-yellow-700/50 group-[.toast]:shadow-yellow-200/20 dark:group-[.toast]:shadow-yellow-900/20",
          info: "group-[.toast]:bg-blue-50/95 group-[.toast]:text-blue-900 group-[.toast]:border-blue-300 dark:group-[.toast]:bg-blue-950/30 dark:group-[.toast]:text-blue-100 dark:group-[.toast]:border-blue-700/50 group-[.toast]:shadow-blue-200/20 dark:group-[.toast]:shadow-blue-900/20",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
