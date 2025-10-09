import Image from "next/image";
import { redirect } from "next/navigation";

import { Promo } from "@/components/promo";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getUserSubscription, getCourses } from "@/db/queries";

import { Items } from "./items";
import { Quests } from "@/components/quests";
import { BRAND_CONFIG } from "@/lib/config";

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
        <div className="w-full flex flex-col items-center max-w-4xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
                <Image
                  src="/shop.svg"
                  alt="Shop"
                  height={48}
                  width={48}
                  className="relative drop-shadow-lg filter brightness-0 invert"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-yellow-800 text-xs font-bold">💰</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {BRAND_CONFIG.PLATFORM_NAME} Marketplace
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-6">
              Spend your hard-earned XP points on useful items and power-ups to enhance your learning journey.
            </p>

            {/* User Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-50 p-4 rounded-xl border border-blue-200 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="text-2xl font-bold text-blue-700">{userProgress.points}</div>
                <div className="text-sm text-blue-600">XP Points</div>
              </div>
              <div className="bg-gradient-to-br from-red-100 to-pink-50 p-4 rounded-xl border border-red-200 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl">❤️</span>
                </div>
                <div className="text-2xl font-bold text-red-700">{userProgress.hearts}</div>
                <div className="text-sm text-red-600">Hearts</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-amber-50 p-4 rounded-xl border border-yellow-200 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl">{isPro ? '👑' : '🎯'}</span>
                </div>
                <div className="text-lg font-bold text-yellow-700">{isPro ? 'PRO' : 'FREE'}</div>
                <div className="text-sm text-yellow-600">Status</div>
              </div>
            </div>
          </div>

          {/* Shopping Tips */}
          <div className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg">💡</span>
              </div>
              <div>
                <h3 className="font-bold text-indigo-800 mb-2">Shopping Tips</h3>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• Earn XP by completing lessons and quests</li>
                  <li>• Hearts are used when you make mistakes during lessons</li>
                  <li>• Pro membership gives you unlimited hearts and exclusive features</li>
                  <li>• Check back regularly for new items and special offers!</li>
                </ul>
              </div>
            </div>
          </div>

          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default ShopPage;
