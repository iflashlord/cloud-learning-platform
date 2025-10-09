import { redirect } from "next/navigation";

import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
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
import { Header } from "./header";

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
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={activeCourseData || {
            ...userProgress.activeCourse,
            category: "",
            description: null,
            level: null,
            duration: null,
            themeConfig: null,
          }}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && (
          <Promo />
        )}
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <Header 
          title={userProgress.activeCourse.title}
          totalUnits={totalUnits}
          completedUnits={completedUnits}
          totalLessons={totalLessons}
          completedLessons={completedLessons}
        />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
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
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};
 
export default LearnPage;
