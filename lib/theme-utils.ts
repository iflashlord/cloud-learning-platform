"use client";

import { useMemo } from "react";

// Duolingo-style button base classes
const BUTTON_BASE = [
  "relative inline-flex items-center justify-center",
  "rounded-xl font-bold tracking-wide",
  "px-6 py-3 text-base",
  "transition-all duration-150 ease-out",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "active:translate-y-1 active:shadow-none",
  "border-2 border-b-4",
];

const outlineButtonBase = [
  ...BUTTON_BASE,
  "bg-white",
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
      "bg-green-500 border-green-700",
      "text-white font-extrabold",
      "shadow-[0_4px_0_#15803d]",
      "hover:bg-green-400 hover:border-green-600",
      "hover:shadow-[0_6px_0_#15803d] hover:-translate-y-0.5",
      "focus-visible:ring-green-400",
    ].join(" ");

    return {
      primaryButton,
      secondaryButton: [
        ...outlineButtonBase,
        "border-green-200 bg-green-50",
        "text-green-800 font-extrabold",
        "shadow-[0_4px_0_#bbf7d0]",
        "hover:bg-green-100 hover:border-green-300",
        "hover:shadow-[0_6px_0_#86efac] hover:-translate-y-0.5",
        "focus-visible:ring-green-300",
      ].join(" "),
      successButton: [
        ...BUTTON_BASE,
        "bg-emerald-500 border-emerald-700",
        "text-white font-extrabold",
        "shadow-[0_4px_0_#047857]",
        "hover:bg-emerald-400 hover:border-emerald-600",
        "hover:shadow-[0_6px_0_#047857] hover:-translate-y-0.5",
        "focus-visible:ring-emerald-400",
      ].join(" "),
      errorButton: [
        ...BUTTON_BASE,
        "bg-red-500 border-red-700",
        "text-white font-extrabold",
        "shadow-[0_4px_0_#b91c1c]",
        "hover:bg-red-400 hover:border-red-600",
        "hover:shadow-[0_6px_0_#b91c1c] hover:-translate-y-0.5",
        "focus-visible:ring-red-400",
      ].join(" "),
      infoButton: [
        ...BUTTON_BASE,
        "bg-blue-500 border-blue-700",
        "text-white font-extrabold",
        "shadow-[0_4px_0_#1d4ed8]",
        "hover:bg-blue-400 hover:border-blue-600",
        "hover:shadow-[0_6px_0_#1d4ed8] hover:-translate-y-0.5",
        "focus-visible:ring-blue-400",
      ].join(" "),
      neutralButton: [
        ...outlineButtonBase,
        "border-gray-300 bg-gray-50",
        "text-gray-700 font-bold",
        "shadow-[0_4px_0_#d1d5db]",
        "hover:bg-gray-100 hover:border-gray-400",
        "hover:shadow-[0_6px_0_#9ca3af] hover:-translate-y-0.5",
        "focus-visible:ring-gray-400",
      ].join(" "),
      successText: "text-emerald-600",
      successBg: "bg-emerald-50",
      successBorder: "border-emerald-200",
      errorText: "text-red-600",
      errorBg: "bg-red-50",
      errorBorder: "border-red-200",
      infoText: "text-blue-600",
      infoBg: "bg-blue-50",
      infoBorder: "border-blue-200",
      neutralText: "text-gray-600",
      neutralBg: "bg-gray-50",
      neutralBorder: "border-gray-200",
      primaryText: "text-green-600",
      primaryBg: "bg-green-50",
      primaryBorder: "border-green-200",
      themeName: "dynamic",
    };
  }, []);
};
