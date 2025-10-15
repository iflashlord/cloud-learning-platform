/**
 * 📐 Z-Index Management System
 * 
 * Centralized z-index values to prevent layering conflicts and maintain
 * consistent stacking order throughout the application.
 * 
 * Higher numbers appear above lower numbers.
 */

// ============================================================================
// Z-INDEX CONSTANTS
// ============================================================================

/**
 * Z-Index Layer System
 * 
 * Each layer reserves a range of 10 values to allow for fine-tuning
 * within that layer without affecting other layers.
 */
export const Z_INDEX = {
  // Base Layer (0-9): Normal content
  BASE: 0,
  CONTENT: 1,
  
  // Interactive Layer (10-19): Hover states, focus indicators
  INTERACTIVE: 10,
  HOVER: 11,
  FOCUS: 12,
  
  // Fixed Elements Layer (20-39): Fixed positioned elements
  FIXED_FOOTER: 20,
  FIXED_HEADER: 30,
  
  // Sticky Elements Layer (40-59): Sticky positioned elements  
  STICKY_WRAPPER: 40,
  STICKY_CONTENT: 45,
  STICKY_HEADER: 50,
  
  // Navigation Layer (80-99): Navigation elements (HIGHEST PRIORITY)
  TOP_NAVIGATION: 50,
  MOBILE_HEADER: 90,
  MOBILE_SIDEBAR_BACKDROP: 85,
  MOBILE_SIDEBAR: 87,
  MOBILE_BOTTOM_NAV: 100,
  
  // Sidebar Layer (60-79): Desktop navigation sidebar
  SIDEBAR_BACKDROP: 60,
  SIDEBAR: 70,
  SIDEBAR_TOGGLE: 75,
  
  // Overlay Layer (200-299): Overlays and temporary content
  DROPDOWN: 200,
  TOOLTIP: 210,
  POPOVER: 220,
  
  // Modal Layer (300-399): Modal dialogs and sheets
  MODAL_BACKDROP: 300,
  MODAL: 350,
  SHEET: 360,
  
  // Toast Layer (400-499): Notifications and toasts
  TOAST: 400,
  ALERT: 410,
  
  // Debug Layer (500+): Development and debugging tools
  DEBUG: 500,
  DEV_TOOLS: 510,
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get z-index value by name
 */
export const getZIndex = (layer: keyof typeof Z_INDEX): number => {
  return Z_INDEX[layer];
};

/**
 * Create z-index CSS class
 */
export const zIndex = (layer: keyof typeof Z_INDEX): string => {
  return `z-[${Z_INDEX[layer]}]`;
};

/**
 * Create inline z-index style
 */
export const zIndexStyle = (layer: keyof typeof Z_INDEX): { zIndex: number } => {
  return { zIndex: Z_INDEX[layer] };
};

// ============================================================================
// COMPONENT HELPERS
// ============================================================================

/**
 * Common z-index combinations for components
 */
export const COMPONENT_Z_INDEX = {
  // Sidebar system
  DESKTOP_SIDEBAR: Z_INDEX.SIDEBAR,
  DESKTOP_SIDEBAR_TOGGLE: Z_INDEX.SIDEBAR_TOGGLE,
  MOBILE_SIDEBAR: Z_INDEX.MOBILE_SIDEBAR,
  MOBILE_SIDEBAR_BACKDROP: Z_INDEX.MOBILE_SIDEBAR_BACKDROP,
  
  // Headers
  MOBILE_HEADER: Z_INDEX.MOBILE_HEADER,
  MOBILE_BOTTOM_NAV: Z_INDEX.MOBILE_BOTTOM_NAV,
  STICKY_HEADER: Z_INDEX.STICKY_HEADER,
  
  // Modals and overlays
  MODAL: Z_INDEX.MODAL,
  MODAL_BACKDROP: Z_INDEX.MODAL_BACKDROP,
  DROPDOWN: Z_INDEX.DROPDOWN,
  TOOLTIP: Z_INDEX.TOOLTIP,
  
  // Notifications
  TOAST: Z_INDEX.TOAST,
  ALERT: Z_INDEX.ALERT,
} as const;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate z-index hierarchy
 * Ensures that critical elements maintain proper stacking order
 */
export const validateZIndexHierarchy = (): boolean => {
  const criticalOrder = [
    'CONTENT',
    'STICKY_HEADER', 
    'MOBILE_HEADER',
    'MOBILE_SIDEBAR',
    'SIDEBAR',
    'SIDEBAR_TOGGLE',
    'MODAL_BACKDROP',
    'MODAL',
    'TOAST'
  ] as const;
  
  for (let i = 0; i < criticalOrder.length - 1; i++) {
    const current = Z_INDEX[criticalOrder[i]];
    const next = Z_INDEX[criticalOrder[i + 1]];
    
    if (current >= next) {
      console.error(`Z-Index hierarchy violation: ${criticalOrder[i]} (${current}) should be lower than ${criticalOrder[i + 1]} (${next})`);
      return false;
    }
  }
  
  return true;
};

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ZIndexLayer = keyof typeof Z_INDEX;
export type ComponentZIndex = keyof typeof COMPONENT_Z_INDEX;