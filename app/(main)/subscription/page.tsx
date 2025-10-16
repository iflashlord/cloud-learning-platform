import { redirect } from "next/navigation";
import { DashboardLayout, ContentGrid } from "@/lib/css-grid-system";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription, getCourses } from "@/db/queries";
import { SubscriptionManager } from "./subscription-manager";

const SubscriptionPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const coursesData = getCourses();

  const [
    userProgress,
    userSubscription,
    courses,
  ] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    coursesData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  // Find the complete course data
  const activeCourseData = courses.find(course => course.id === userProgress.activeCourse?.id);

  return (
    <div className="w-full min-h-screen">
      {/* Top Navigation */}
      <div className="w-full border-b border-border bg-background/95 backdrop-blur sticky top-[60px] z-50">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <UserProgress
            activeCourse={activeCourseData ? {
              id: activeCourseData.id,
              title: activeCourseData.title,
              imageSrc: activeCourseData.imageSrc
            } : userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-4">
        <DashboardLayout>
          <ContentGrid cols={1} gap="xl" className="max-w-5xl mx-auto py-8">
            <SubscriptionManager 
              userProgress={userProgress}
              subscription={userSubscription}
              isPro={isPro}
            />
          </ContentGrid>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default SubscriptionPage;