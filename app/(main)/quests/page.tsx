import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getUserSubscription, getCourses } from "@/db/queries";
import { QuestCard } from "@/components/ui/quest-card";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { Promo } from "@/components/promo";
import { QuestAchievements } from "./quest-achievements";
import { QuestProgressTracker } from "./quest-progress-tracker";
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
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
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
        <QuestProgressTracker 
          quests={quests}
          userPoints={userProgress.points}
          className="mb-4"
        />
        {!isPro && (
          <Promo />
        )}
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center max-w-4xl mx-auto">
          {/* Enhanced Header */}
          <QuestPageHeader />

          {/* Stats Overview */}
          <QuestStats
            completedQuests={completedQuests.length}
            availableQuests={quests.filter(quest => userProgress.points < quest.value).length}
            totalPoints={userProgress.points}
            className="mb-8"
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
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default QuestsPage;
