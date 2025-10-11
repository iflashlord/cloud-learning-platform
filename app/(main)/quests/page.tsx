import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getUserSubscription, getCourses } from "@/db/queries";
import { Progress } from "@/components/ui/progress";
import { Promo } from "@/components/promo";
import { QuestAchievements } from "./quest-achievements";
import { QuestProgressTracker } from "./quest-progress-tracker";
import { quests, QUEST_ICON_MAP, type QuestIconKey } from "@/constants";
import { BRAND_CONFIG } from "@/lib/config";
import { Trophy, Crown, Star, Zap, Target, Award, CheckCircle, Lock, Gift, TrendingUp, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// QuestCard component for individual quest display
type QuestCardProps = {
  quest: {
    title: string;
    description: string;
    value: number;
    reward: {
      xp: number;
      hearts: number;
      badge: string;
    };
    icon: QuestIconKey;
    color: string;
    difficulty: string;
    category: string;
    type: string;
  };
  progress: number;
  userPoints: number;
  isCompleted: boolean;
  isNext: boolean;
};

const QuestCard = ({ quest, progress, userPoints, isCompleted, isNext }: QuestCardProps) => {
  const getColorClasses = (color: string, isCompleted: boolean = false) => {
    if (isCompleted) {
      return "bg-gradient-to-br from-green-100 to-green-50 border-green-300";
    }
    
    const colorMap: Record<string, string> = {
      green: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200",
      blue: "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200",
      orange: "bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200",
      purple: "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200",
      gold: "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300",
      platinum: "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300",
      rainbow: "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-pink-200",
      cyan: "bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-200",
    };
    
    return colorMap[color] || "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200";
  };

  const getDifficultyColor = (difficulty: string) => {
    const difficultyMap: Record<string, string> = {
      "Beginner": "bg-green-100 text-green-800 border-green-300",
      "Intermediate": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "Advanced": "bg-orange-100 text-orange-800 border-orange-300",
      "Expert": "bg-red-100 text-red-800 border-red-300",
    };
    
    return difficultyMap[difficulty] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const Icon = QUEST_ICON_MAP[quest.icon];

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg",
        getColorClasses(quest.color, isCompleted),
        isNext && "ring-2 ring-orange-400 ring-offset-2 shadow-lg",
        isCompleted && "opacity-90"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm border-2 font-bold flex-shrink-0",
                isCompleted 
                  ? "bg-green-500 border-green-600 text-white" 
                  : quest.color === 'gold' 
                    ? "bg-gradient-to-br from-yellow-400 to-amber-500 border-yellow-500 text-white"
                    : quest.color === 'platinum'
                      ? "bg-gradient-to-br from-gray-400 to-slate-500 border-gray-500 text-white"
                      : "bg-white border-gray-200"
              )}>
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>

          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-bold text-lg truncate",
              isCompleted ? "text-green-700" : "text-gray-800"
            )}>
              {quest.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={cn(
                "px-2 py-1 text-xs font-medium rounded-lg border whitespace-nowrap",
                getDifficultyColor(quest.difficulty)
              )}>
                {quest.difficulty}
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg whitespace-nowrap">
                {quest.category}
              </span>
            </div>
          </div>
        </div>

        {isNext && (
          <div className="flex items-center gap-1 px-3 py-1 bg-orange-200 text-orange-800 text-sm font-bold rounded-full flex-shrink-0">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">NEXT</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className={cn(
        "text-sm mb-4 leading-relaxed",
        isCompleted ? "text-green-600" : "text-gray-600"
      )}>
        {quest.description}
      </p>

      {/* Progress */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className={cn(
            "font-medium",
            isCompleted ? "text-green-600" : "text-gray-600"
          )}>
            Progress
          </span>
          <span className={cn(
            "font-bold",
            isCompleted ? "text-green-700" : "text-gray-700"
          )}>
            {Math.min(userPoints, quest.value)} / {quest.value} XP ({Math.round(progress)}%)
          </span>
        </div>
        <Progress 
          value={progress} 
          className={cn(
            "h-3",
            isCompleted ? "bg-green-100" : "bg-white/70"
          )}
        />
      </div>

      {/* Rewards */}
      <div className="bg-white/50 rounded-lg p-3 border border-white/70">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Quest Rewards:</span>
          {isCompleted && (
            <div className="flex items-center gap-1 text-sm font-bold text-green-600">
              <CheckCircle className="w-4 h-4" />
              CLAIMED
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">+{quest.reward.xp} XP</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="font-medium">+{quest.reward.hearts} Hearts</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Award className="w-4 h-4 text-purple-500" />
            <span className="font-medium capitalize">{quest.reward.badge} Badge</span>
          </div>
        </div>
      </div>

      {/* Completion Badge */}
      {isCompleted && (
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
          <Trophy className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Next Quest Glow Effect */}
      {isNext && (
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-xl pointer-events-none" />
      )}
    </div>
  );
};

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
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 via-yellow-500 to-red-500 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
                <Trophy className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Crown className="w-5 h-5 text-yellow-800" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              {BRAND_CONFIG.PLATFORM_NAME} Quest Arena
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-6">
              Embark on epic learning adventures! Complete quests to earn exclusive rewards, 
              unlock achievements, and become a technology champion.
            </p>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-green-100 to-emerald-50 p-4 rounded-xl border border-green-200 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-700">
                  {quests.filter(quest => userProgress.points >= quest.value).length}
                </div>
                <div className="text-sm text-green-600">Completed</div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-50 p-4 rounded-xl border border-blue-200 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  {quests.filter(quest => userProgress.points < quest.value).length}
                </div>
                <div className="text-sm text-blue-600">Available</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-amber-50 p-4 rounded-xl border border-yellow-200 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-yellow-700">
                  {userProgress.points}
                </div>
                <div className="text-sm text-yellow-600">Total XP</div>
              </div>
            </div>
          </div>

          {/* Quest Achievements */}
          <QuestAchievements 
            userPoints={userProgress.points}
            completedQuests={completedQuests.length}
            totalQuests={totalQuests}
          />

          {/* Quest Categories */}
          {(() => {
            const categories = Array.from(new Set(quests.map(quest => quest.category)));
            const availableQuests = quests.filter(quest => userProgress.points < quest.value);
            
            return (
              <div className="w-full space-y-8">
                {/* Available Quests */}
                {availableQuests.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Available Quests</h2>
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-orange-300 to-transparent"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {availableQuests.map((quest) => {
                        const progress = Math.min((userProgress.points / quest.value) * 100, 100);
                        const isNextQuest = availableQuests[0].title === quest.title;
                        
                        return (
                          <QuestCard
                            key={quest.title}
                            quest={quest}
                            progress={progress}
                            userPoints={userProgress.points}
                            isCompleted={false}
                            isNext={isNextQuest}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Completed Quests */}
                {completedQuests.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Completed Quests</h2>
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-green-300 to-transparent"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {completedQuests.map((quest) => (
                        <QuestCard
                          key={quest.title}
                          quest={quest}
                          progress={100}
                          userPoints={userProgress.points}
                          isCompleted={true}
                          isNext={false}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default QuestsPage;
