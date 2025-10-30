"use client"

import { forwardRef } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AiDialogProps = React.DialogHTMLAttributes<HTMLDialogElement> & {
  title: string
  subtitle?: string
  onClose: () => void
  footer?: React.ReactNode
  bodyClassName?: string
  maxHeightClassName?: string
  closeButtonAriaLabel?: string
}

export const AiDialog = forwardRef<HTMLDialogElement, AiDialogProps>(
  (
    {
      title,
      subtitle,
      onClose,
      footer,
      className,
      children,
      bodyClassName,
      maxHeightClassName = "max-h-[80vh]",
      closeButtonAriaLabel = "Close dialog",
      ...dialogProps
    },
    ref,
  ) => {
    return (
      <dialog
        ref={ref}
        className={cn(
          "backdrop:bg-black/50 rounded-xl p-0 border border-border shadow-2xl max-w-2xl w-[min(90vw,640px)]",
          className,
        )}
        {...dialogProps}
      >
        <div className={cn("flex flex-col", maxHeightClassName)}>
          <div className='flex items-start justify-between gap-4 border-b border-border px-6 py-4'>
            <div>
              <h2 className='text-lg font-semibold text-foreground dark:text-gray-800'>{title}</h2>
              {subtitle ? (
                <p className='text-sm text-muted-foreground dark:text-gray-600'>{subtitle}</p>
              ) : null}
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8'
              onClick={onClose}
              aria-label={closeButtonAriaLabel}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>

          <div className={cn("flex-1 overflow-y-auto px-6 py-4 space-y-4", bodyClassName)}>
            {children}
          </div>

          {footer ? (
            <div className='flex justify-end gap-2 border-t border-border px-6 py-4'>{footer}</div>
          ) : null}
        </div>
      </dialog>
    )
  },
)

AiDialog.displayName = "AiDialog"
