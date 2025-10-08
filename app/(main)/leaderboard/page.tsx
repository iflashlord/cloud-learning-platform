import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { 
  getTopTenUsers, 
  getTopTenUsersByCourse,
  getAllCoursesForLeaderboard,
  getUserProgress, 
  getUserSubscription 
} from "@/db/queries";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { CONFIG } from "@/lib/config";
import { LeaderboardTabs } from "./leaderboard-tabs";

type Props = {
  searchParams: {
    course?: string;
  };
};

const LeaderboardPage = async ({ searchParams }: Props) => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const leaderboardData = getTopTenUsers();
  const coursesData = getAllCoursesForLeaderboard();

  const [
    userProgress,
    userSubscription,
    generalLeaderboard,
    courses,
  ] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    leaderboardData,
    coursesData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;
  
  // Use active course by default, allow URL override
  const defaultCourseId = userProgress.activeCourse?.id || null;
  const selectedCourseId = searchParams.course ? parseInt(searchParams.course) : defaultCourseId;

  // Get course-specific leaderboard for active course by default
  let courseLeaderboard = null;
  let selectedCourse = null;
  if (selectedCourseId) {
    courseLeaderboard = await getTopTenUsersByCourse(selectedCourseId);
    selectedCourse = courses.find(course => course.id === selectedCourseId) || null;
  }

  return ( 
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
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
        <div className="w-full flex flex-col items-center">
          <Image
            src="/leaderboard.svg"
            alt="Leaderboard"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            {CONFIG.PLATFORM_NAME} Leaderboard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            See where you rank among other technology learners in the community.
          </p>
          
          <LeaderboardTabs
            courses={courses}
            generalLeaderboard={generalLeaderboard}
            courseLeaderboard={courseLeaderboard}
            selectedCourse={selectedCourse}
            selectedCourseId={selectedCourseId}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default LeaderboardPage;
