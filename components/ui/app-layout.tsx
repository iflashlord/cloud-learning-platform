"use client";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

type Course = {
  id: number;
  title: string;
  imageSrc: string;
};

type Props = {
  children: React.ReactNode;
  activeCourse: Course;
  hearts: number;
  points: number;
  gems: number;
  hasActiveSubscription: boolean;
  showQuests?: boolean;
  additionalSidebarContent?: React.ReactNode;
  className?: string;
};

export const AppLayout = ({
  children,
  activeCourse,
  hearts,
  points,
  gems,
  hasActiveSubscription,
  showQuests = true,
  additionalSidebarContent,
  className = "flex flex-row-reverse gap-[48px] px-6"
}: Props) => {
  return (
    <div className={className}>
      <StickyWrapper>
        <UserProgress
          activeCourse={activeCourse}
          hearts={hearts}
          points={points}
          gems={gems}
          hasActiveSubscription={hasActiveSubscription}
        />
        
        {additionalSidebarContent}
        
        {!hasActiveSubscription && <Promo />}
        
        {showQuests && <Quests points={points} />}
      </StickyWrapper>
      
      <FeedWrapper>
        {children}
      </FeedWrapper>
    </div>
  );
};