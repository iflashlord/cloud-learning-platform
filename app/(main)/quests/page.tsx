import Image from "next/image";
import { redirect } from "next/navigation";

import { DashboardLayout, ContentGrid } from "@/lib/css-grid-system";
import { UserProgress } from "@/components/user-progress";
import { Promo } from "@/components/promo";
import { getUserProgress, getUserSubscription, getCourses } from "@/db/queries";
import { QuestCard } from "@/components/ui/quest-card";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { QuestAchievements } from "./quest-achievements";
import { QuestProgressTrackerComponent } from "./quest-progress-tracker";
import { QuestPageHeader } from "@/components/ui/quest-page-header";
import { QuestStats } from "@/components/ui/quest-stats";
import { QuestListing } from "@/components/ui/quest-listing";
import { quests } from "@/constants";



const QuestsPage = async () => {
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

  // Find the active course with complete data
  const activeCourseData = courses.find(course => course.id === userProgress.activeCourse?.id);
  
  // Calculate quest completion stats
  const completedQuests = quests.filter(quest => userProgress.points >= quest.value);
  const totalQuests = quests.length;

  return (
    <div className="w-full min-h-screen">
      {/* Top Navigation */}
      <div className="w-full border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50 mb-6">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <UserProgress
            activeCourse={activeCourseData ? {
              id: activeCourseData.id,
              title: activeCourseData.title,
              imageSrc: activeCourseData.imageSrc
            } : userProgress.activeCourse!}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </div>

      <div className="flex w-full max-w-[1200px] mx-auto px-4 gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <DashboardLayout
            header={<QuestPageHeader />}
          >
            <ContentGrid cols={1} gap="lg" className="max-w-4xl mx-auto">
              {/* Stats Overview */}
              <QuestStats
                completedQuests={completedQuests.length}
                availableQuests={quests.filter(quest => userProgress.points < quest.value).length}
                totalPoints={userProgress.points}
              />

              {/* Quest Achievements */}
              <QuestAchievements 
                userPoints={userProgress.points}
                completedQuests={completedQuests.length}
                totalQuests={totalQuests}
              />

              {/* Quest Listing */}
              <QuestListing
                quests={quests}
                userPoints={userProgress.points}
              />
            </ContentGrid>
          </DashboardLayout>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 space-y-4">
          <QuestProgressTrackerComponent 
            quests={quests}
            userPoints={userProgress.points}
            className="mb-4"
          />
          {!isPro && <Promo />}
        </div>
      </div>
    </div>
  );
};
 
export default QuestsPage;
