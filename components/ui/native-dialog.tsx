"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NativeDialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  showCloseButton?: boolean
}

const NativeDialog = React.forwardRef<HTMLDialogElement, NativeDialogProps>(
  ({ className, children, open, onOpenChange, showCloseButton = true, ...props }, ref) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null)

    React.useImperativeHandle(ref, () => dialogRef.current!)

    React.useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return

      if (open) {
        dialog.showModal()
      } else {
        dialog.close()
      }
    }, [open])

    React.useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return

      const handleClose = () => {
        onOpenChange?.(false)
      }

      const handleCancel = (e: Event) => {
        e.preventDefault()
        onOpenChange?.(false)
      }

      const handleClickOutside = (e: MouseEvent) => {
        const rect = dialog.getBoundingClientRect()
        const isInDialog =
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        if (!isInDialog) {
          onOpenChange?.(false)
        }
      }

      dialog.addEventListener("close", handleClose)
      dialog.addEventListener("cancel", handleCancel)
      dialog.addEventListener("click", handleClickOutside)

      return () => {
        dialog.removeEventListener("close", handleClose)
        dialog.removeEventListener("cancel", handleCancel)
        dialog.removeEventListener("click", handleClickOutside)
      }
    }, [onOpenChange])

    return (
      <dialog
        ref={dialogRef}
        className={cn(
          // Base dialog styles
          "bg-background border border-border rounded-lg shadow-lg",
          "w-full max-w-lg p-0 m-auto overflow-hidden",
          // Backdrop styles (using CSS custom properties for better browser support)
          "[&::backdrop]:bg-black/80 [&::backdrop]:backdrop-blur-sm",
          className,
        )}
        {...props}
      >
        <div className='relative'>
          {showCloseButton && (
            <button
              type='button'
              onClick={() => onOpenChange?.(false)}
              className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10'
            >
              <X className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </button>
          )}
          {children}
        </div>
      </dialog>
    )
  },
)
NativeDialog.displayName = "NativeDialog"

const NativeDialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props}>
      {children}
    </div>
  ),
)
NativeDialogContent.displayName = "NativeDialogContent"

const NativeDialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)}
      {...props}
    />
  ),
)
NativeDialogHeader.displayName = "NativeDialogHeader"

const NativeDialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4",
        className,
      )}
      {...props}
    />
  ),
)
NativeDialogFooter.displayName = "NativeDialogFooter"

const NativeDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
NativeDialogTitle.displayName = "NativeDialogTitle"

const NativeDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
NativeDialogDescription.displayName = "NativeDialogDescription"

export {
  NativeDialog,
  NativeDialogContent,
  NativeDialogHeader,
  NativeDialogFooter,
  NativeDialogTitle,
  NativeDialogDescription,
}
