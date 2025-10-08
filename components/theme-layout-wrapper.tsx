import { getUserProgress } from "@/db/queries";
import { AutoThemeProvider } from "@/lib/auto-theme";

/**
 * Server component that fetches user's active course and provides it to the theme system
 */
export const ThemeLayoutWrapper = async ({ children }: { children: React.ReactNode }) => {
  let activeCourseId: number | null = null;
  
  try {
    const userProgress = await getUserProgress();
    activeCourseId = userProgress?.activeCourseId || null;
  } catch (error) {
    // If there's an error (e.g., user not logged in), use default theme
    console.debug("Could not fetch user progress for theming:", error);
  }

  return (
    <AutoThemeProvider activeCourseId={activeCourseId}>
      {children}
    </AutoThemeProvider>
  );
};