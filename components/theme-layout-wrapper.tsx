import { getUserProgress } from "@/db/queries";

/**
 * Server component that provides theme layout (simplified without auto-theme)
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
    <div data-course-id={activeCourseId}>
      {children}
    </div>
  );
};