import { redirect } from "next/navigation";
import { AppLayout } from "@/components/ui/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getUserProgress, getUserSubscription, getCourses } from "@/db/queries";
import { Items } from "./items";
import { BRAND_CONFIG } from "@/lib/config";
import { Zap, Heart, Crown, Target, Lightbulb } from "lucide-react";

const ShopPage = async () => {
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
    <AppLayout
      activeCourse={activeCourseData ? {
        id: activeCourseData.id,
        title: activeCourseData.title,
        imageSrc: activeCourseData.imageSrc
      } : userProgress.activeCourse}
      hearts={userProgress.hearts}
      points={userProgress.points}
      hasActiveSubscription={isPro}
    >
      <div className="w-full flex flex-col items-center max-w-4xl mx-auto">
        {/* Enhanced Header Section */}
        <PageHeader
          variant="gradient"
          title={`${BRAND_CONFIG.PLATFORM_NAME} Marketplace`}
          description="Spend your hard-earned XP points on useful items and power-ups to enhance your learning journey."
          badge={<Badge variant={isPro ? "success" : "warning"}>{isPro ? "PRO Member" : "Free Account"}</Badge>}
        />

        {/* User Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 w-full max-w-3xl">
          <StatCard
            variant="info"
            icon={<Zap className="w-6 h-6" />}
            title="XP Points"
            value={userProgress.points.toString()}
            subtitle="Available to spend"
          />
          <StatCard
            variant="danger"
            icon={<Heart className="w-6 h-6" />}
            title="Hearts"
            value={userProgress.hearts.toString()}
            subtitle="Health remaining"
          />
          <StatCard
            variant={isPro ? "success" : "warning"}
            icon={isPro ? <Crown className="w-6 h-6" /> : <Target className="w-6 h-6" />}
            title="Status"
            value={isPro ? 'PRO' : 'FREE'}
            subtitle={isPro ? "Premium member" : "Basic account"}
          />
        </div>

        {/* Shopping Tips */}
        <Alert className="w-full mb-8">
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <div className="font-semibold">Shopping Tips:</div>
              <div>• Earn XP by completing lessons and quests</div>
              <div>• Hearts are used when you make mistakes during lessons</div>
              <div>• Pro membership gives you unlimited hearts and exclusive features</div>
              <div>• Check back regularly for new items and special offers!</div>
            </div>
          </AlertDescription>
        </Alert>

        <Items
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </div>
    </AppLayout>
  );
};
 
export default ShopPage;
