import { redirect } from "next/navigation";
import { EnhancedGridAppLayout } from "@/components/enhanced-grid-app-layout";
import { ContentGrid } from "@/lib/css-grid-system";
import { lessons, units as unitsSchema } from "@/db/schema";
import { 
  getCourseProgress, 
  getLessonPercentage, 
  getUnits, 
  getUserProgress,
  getUserSubscription,
  getCourses
} from "@/db/queries";
import { Unit } from "./unit";
import { EnhancedLearnHeader } from "@/components/enhanced-learn-header";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();
  const userSubscriptionData = getUserSubscription();
  const coursesData = getCourses();

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
    courses,
  ] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData,
    coursesData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  // Find the complete course data
  const activeCourseData = courses.find(course => course.id === userProgress.activeCourse?.id);

  // Calculate progress statistics
  const totalUnits = units.length;
  const completedUnits = units.filter(unit => 
    unit.lessons.every(lesson => lesson.completed)
  ).length;
  
  const totalLessons = units.reduce((total, unit) => total + unit.lessons.length, 0);
  const completedLessons = units.reduce((total, unit) => 
    total + unit.lessons.filter(lesson => lesson.completed).length, 0
  );

  return (
    <EnhancedGridAppLayout
      activeCourse={activeCourseData ? {
        id: activeCourseData.id,
        title: activeCourseData.title,
        imageSrc: activeCourseData.imageSrc
      } : userProgress.activeCourse}
      hearts={userProgress.hearts}
      points={userProgress.points}
      hasActiveSubscription={isPro}
    >
      {/* Page Header */}
      <EnhancedLearnHeader 
        title={userProgress.activeCourse.title}
        totalUnits={totalUnits}
        completedUnits={completedUnits}
        totalLessons={totalLessons}
        completedLessons={completedLessons}
      />
      
      {/* Units Content */}
      <ContentGrid cols={1} gap="lg" className="mt-6">
        {units.map((unit) => (
          <Unit
            key={unit.id}
            id={unit.id}
            order={unit.order}
            description={unit.description}
            title={unit.title}
            lessons={unit.lessons}
            activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
              unit: typeof unitsSchema.$inferSelect;
            } | undefined}
            activeLessonPercentage={lessonPercentage}
          />
        ))}
      </ContentGrid>
    </EnhancedGridAppLayout>
  );
};
 
export default LearnPage;
