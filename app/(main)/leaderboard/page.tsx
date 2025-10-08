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
          {/* Enhanced Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl">
                <Image
                  src="/leaderboard.svg"
                  alt="Leaderboard"
                  height={40}
                  width={40}
                  className="filter brightness-0 invert"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xs font-bold text-white">🏆</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              {CONFIG.PLATFORM_NAME} Champions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Compete with fellow learners, track your progress, and celebrate achievements 
              in our community of technology enthusiasts. Every challenge completed brings you closer to the top!
            </p>
            
            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Rankings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Real-time Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Fair Competition</span>
              </div>
            </div>
          </div>
          
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
