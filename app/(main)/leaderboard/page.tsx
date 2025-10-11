import { redirect } from "next/navigation";
import { Trophy } from "lucide-react";

import { 
  getTopTenUsers, 
  getTopTenUsersByCourse,
  getAllCoursesForLeaderboard,
  getUserProgress, 
  getUserSubscription 
} from "@/db/queries";
import { AppLayout } from "@/components/ui/app-layout";
import { CONFIG } from "@/lib/config";
import { LeaderboardTabs } from "./leaderboard-tabs";
import { LeaderboardHeader } from "@/components/ui/leaderboard-header";

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
    <AppLayout
      activeCourse={userProgress.activeCourse}
      hearts={userProgress.hearts}
      points={userProgress.points}
      hasActiveSubscription={isPro}
    >
      <div className="w-full flex flex-col items-center">
        <LeaderboardHeader
          title={`${CONFIG.PLATFORM_NAME} Champions`}
          description="Compete with fellow learners, track your progress, and celebrate achievements in our community of technology enthusiasts. Every challenge completed brings you closer to the top!"
          icon={
            <Trophy className="w-10 h-10 text-current" />
          }
          stats={[
            { label: "Live Rankings", color: "green", animated: true },
            { label: "Real-time Updates", color: "blue" },
            { label: "Fair Competition", color: "purple" }
          ]}
        />
        
        <LeaderboardTabs
          courses={courses}
          generalLeaderboard={generalLeaderboard}
          courseLeaderboard={courseLeaderboard}
          selectedCourse={selectedCourse}
          selectedCourseId={selectedCourseId}
        />
      </div>
    </AppLayout>
  );
};
 
export default LeaderboardPage;
