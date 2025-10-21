"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./theme";

/**
 * Hook to automatically set theme based on provided course ID
 */
export const useAutoTheme = (activeCourseId?: number | null) => {
  const { setThemeByCourse } = useTheme();
  const lastCourseIdRef = useRef<number | null | undefined>(undefined);

  useEffect(() => {
    // Only set theme when course ID changes
    if (lastCourseIdRef.current !== activeCourseId) {
      setThemeByCourse(activeCourseId || null);
      lastCourseIdRef.current = activeCourseId;
    }
  }, [setThemeByCourse, activeCourseId]);
};

/**
 * Component to enable auto-theming based on user's active course
 * Accepts course ID from server-side props to avoid API calls
 */
export const AutoThemeProvider = ({ 
  children, 
  activeCourseId 
}: { 
  children: React.ReactNode;
  activeCourseId?: number | null;
}) => {
  useAutoTheme(activeCourseId);
  return <>{children}</>;
};