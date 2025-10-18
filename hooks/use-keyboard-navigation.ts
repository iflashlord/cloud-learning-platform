/**
 * Enhanced Keyboard Navigation Hook for Dialogs
 * 
 * Provides comprehensive keyboard navigation support for dialogs including:
 * - Escape key handling
 * - Enter key confirmation
 * - Focus trapping and management
 * - Arrow key navigation for buttons
 */

import { useCallback, useEffect, useRef } from "react"

interface UseKeyboardNavigationOptions {
  /**
   * Whether the dialog is open
   */
  isOpen: boolean
  
  /**
   * Callback when Escape key is pressed
   */
  onEscape?: () => void
  
  /**
   * Callback when Enter key is pressed
   */
  onEnter?: () => void
  
  /**
   * Whether to trap focus within the dialog
   */
  trapFocus?: boolean
  
  /**
   * Whether to restore focus to the trigger element when dialog closes
   */
  restoreFocus?: boolean
  
  /**
   * Custom focus selector for initial focus
   */
  initialFocusSelector?: string
}

export function useKeyboardNavigation({
  isOpen,
  onEscape,
  onEnter,
  trapFocus = true,
  restoreFocus = true,
  initialFocusSelector,
}: UseKeyboardNavigationOptions) {
  const dialogRef = useRef<HTMLElement>(null)
  const previousActiveElementRef = useRef<HTMLElement | null>(null)
  const focusableElementsRef = useRef<NodeListOf<Element> | null>(null)
  
  // Store the previously focused element when dialog opens
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement
    } else if (restoreFocus && previousActiveElementRef.current) {
      // Restore focus when dialog closes
      previousActiveElementRef.current.focus()
      previousActiveElementRef.current = null
    }
  }, [isOpen, restoreFocus])
  
  // Set initial focus when dialog opens
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const focusElement = initialFocusSelector 
        ? dialogRef.current.querySelector(initialFocusSelector) as HTMLElement
        : dialogRef.current.querySelector('[data-autofocus]') as HTMLElement ||
          dialogRef.current.querySelector('button:not([disabled])') as HTMLElement ||
          dialogRef.current.querySelector('input:not([disabled])') as HTMLElement ||
          dialogRef.current.querySelector('[tabindex="0"]') as HTMLElement ||
          dialogRef.current
      
      if (focusElement) {
        // Small delay to ensure element is rendered
        setTimeout(() => {
          focusElement.focus()
        }, 0)
      }
    }
  }, [isOpen, initialFocusSelector])
  
  // Get all focusable elements
  const getFocusableElements = useCallback((): Element[] => {
    if (!dialogRef.current) return []
    
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"]):not([disabled])',
    ].join(', ')
    
    return Array.from(dialogRef.current.querySelectorAll(focusableSelectors))
  }, [])
  
  // Handle keyboard events
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return
    
    const { key, shiftKey } = event
    
    switch (key) {
      case 'Escape':
        event.preventDefault()
        onEscape?.()
        break
        
      case 'Enter':
        // Only trigger on Enter if we're not in a form element that should handle Enter naturally
        if (
          onEnter && 
          !['TEXTAREA', 'INPUT', 'SELECT'].includes((event.target as HTMLElement).tagName)
        ) {
          event.preventDefault()
          onEnter()
        }
        break
        
      case 'Tab':
        if (trapFocus) {
          const focusableElements = getFocusableElements()
          
          if (focusableElements.length === 0) {
            event.preventDefault()
            return
          }
          
          const firstElement = focusableElements[0] as HTMLElement
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
          const currentElement = document.activeElement
          
          if (shiftKey) {
            // Shift + Tab (backward)
            if (currentElement === firstElement) {
              event.preventDefault()
              lastElement.focus()
            }
          } else {
            // Tab (forward)
            if (currentElement === lastElement) {
              event.preventDefault()
              firstElement.focus()
            }
          }
        }
        break
        
      case 'ArrowUp':
      case 'ArrowDown':
        // Navigate between buttons with arrow keys
        const focusableElements = getFocusableElements()
        const buttons = focusableElements.filter(el => el.tagName === 'BUTTON') as HTMLElement[]
        
        if (buttons.length > 1) {
          const currentIndex = buttons.findIndex(button => button === document.activeElement)
          
          if (currentIndex !== -1) {
            event.preventDefault()
            const nextIndex = key === 'ArrowDown' 
              ? (currentIndex + 1) % buttons.length
              : (currentIndex - 1 + buttons.length) % buttons.length
            
            buttons[nextIndex].focus()
          }
        }
        break
    }
  }, [isOpen, onEscape, onEnter, trapFocus, getFocusableElements])
  
  // Attach keyboard event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])
  
  // Prevent background scrolling when dialog is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])
  
  return {
    dialogRef,
    /**
     * Properties to spread on the dialog container element
     */
    dialogProps: {
      ref: dialogRef,
      role: 'dialog',
      'aria-modal': 'true',
      tabIndex: -1,
    },
  }
}