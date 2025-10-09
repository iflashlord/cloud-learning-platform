"use client";

import { useMemo } from "react";

const BUTTON_BASE = [
  "inline-flex items-center justify-center",
  "rounded-full font-semibold tracking-wide",
  "px-[var(--ds-space-lg)] py-[calc(var(--ds-space-sm)*1.5)]",
  "transition-transform duration-200 ease-out",
  "focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--ds-primary-500))]",
  "disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0",
];

const outlineButtonBase = [
  ...BUTTON_BASE,
  "border-2",
];

/**
 * Utility hook that exposes pre-built, theme-aware class strings.
 * All colors flow through CSS variables so button, text, and surfaces
 * react instantly to theme changes without hard-coded Tailwind tokens.
 */
export const useThemeClasses = () => {
  return useMemo(() => {
    const primaryButton = [
      ...BUTTON_BASE,
      "shadow-[0_18px_32px_rgba(var(--ds-primary-rgb),0.25)]",
      "bg-[linear-gradient(135deg,hsl(var(--ds-primary-400)),hsl(var(--ds-primary-600)))]",
      "text-[hsl(var(--ds-primary-foreground))]",
      "hover:-translate-y-0.5",
      "hover:shadow-[0_22px_40px_rgba(var(--ds-primary-rgb),0.32)]",
    ].join(" ");

    return {
      primaryButton,
      secondaryButton: [
        ...outlineButtonBase,
        "border-[hsl(var(--ds-primary-200))]",
        "text-[hsl(var(--ds-primary-600))]",
        "bg-[hsl(var(--ds-primary-50))]",
        "hover:bg-[hsl(var(--ds-primary-100))]",
        "hover:-translate-y-0.5",
      ].join(" "),
      successButton: [
        ...BUTTON_BASE,
        "shadow-[0_16px_30px_rgba(var(--ds-success-rgb),0.22)]",
        "bg-[linear-gradient(135deg,hsl(var(--ds-success-400)),hsl(var(--ds-success-600)))]",
        "text-[hsl(var(--ds-success-foreground))]",
        "hover:-translate-y-0.5",
        "hover:shadow-[0_20px_38px_rgba(var(--ds-success-rgb),0.3)]",
      ].join(" "),
      errorButton: [
        ...BUTTON_BASE,
        "shadow-[0_16px_30px_rgba(var(--ds-error-rgb),0.22)]",
        "bg-[linear-gradient(135deg,hsl(var(--ds-error-400)),hsl(var(--ds-error-600)))]",
        "text-[hsl(var(--ds-error-foreground))]",
        "hover:-translate-y-0.5",
        "hover:shadow-[0_20px_38px_rgba(var(--ds-error-rgb),0.3)]",
      ].join(" "),
      infoButton: [
        ...BUTTON_BASE,
        "shadow-[0_16px_30px_rgba(var(--ds-info-rgb),0.22)]",
        "bg-[linear-gradient(135deg,hsl(var(--ds-info-400)),hsl(var(--ds-info-600)))]",
        "text-[hsl(var(--ds-info-foreground))]",
        "hover:-translate-y-0.5",
        "hover:shadow-[0_20px_38px_rgba(var(--ds-info-rgb),0.3)]",
      ].join(" "),
      neutralButton: [
        ...outlineButtonBase,
        "border-[hsl(var(--ds-neutral-300))]",
        "text-[hsl(var(--ds-neutral-700))]",
        "bg-[hsl(var(--ds-neutral-50))]",
        "hover:bg-[hsl(var(--ds-neutral-100))]",
        "hover:-translate-y-0.5",
      ].join(" "),
      successText: "text-[hsl(var(--ds-success-600))]",
      successBg: "bg-[hsl(var(--ds-success-50))]",
      successBorder: "border-[hsl(var(--ds-success-200))]",
      errorText: "text-[hsl(var(--ds-error-600))]",
      errorBg: "bg-[hsl(var(--ds-error-50))]",
      errorBorder: "border-[hsl(var(--ds-error-200))]",
      infoText: "text-[hsl(var(--ds-info-600))]",
      infoBg: "bg-[hsl(var(--ds-info-50))]",
      infoBorder: "border-[hsl(var(--ds-info-200))]",
      neutralText: "text-[hsl(var(--ds-neutral-600))]",
      neutralBg: "bg-[hsl(var(--ds-neutral-50))]",
      neutralBorder: "border-[hsl(var(--ds-neutral-200))]",
      primaryText: "text-[hsl(var(--ds-primary-600))]",
      primaryBg: "bg-[hsl(var(--ds-primary-50))]",
      primaryBorder: "border-[hsl(var(--ds-primary-200))]",
      themeName: "dynamic",
    };
  }, []);
};
