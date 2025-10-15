import { lessons, units } from "@/db/schema"
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";
import { Check } from "lucide-react";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson: typeof lessons.$inferSelect & {
    unit: typeof units.$inferSelect;
  } | undefined;
  activeLessonPercentage: number;
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const isCompleted = completedLessons === lessons.length;
  
  return (
    <div data-unit-id={id} className="unit-container scroll-mt-24">
      <div className="sticky top-[133px] z-30 mb-6">
        <div className="block lg:hidden">
          {/* Compact Mobile Unit Header - Same style as desktop but smaller */}
          <div className={`w-full rounded-lg p-4 text-white flex items-center justify-between relative overflow-hidden transition-all duration-300 ${
            isCompleted 
              ? "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500" 
              : "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"
          }`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
            
            {/* Main Content */}
            <div className="flex items-center gap-3 flex-1 relative z-10">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${
                isCompleted ? "bg-green-600" : "bg-blue-600"
              }`}>
                <span className="text-sm font-bold">{order}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold truncate">{title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm opacity-90">{completedLessons}/{lessons.length}</span>
                  <div className="flex-1 bg-white/20 rounded-full h-1.5 backdrop-blur-sm max-w-[80px]">
                    <div 
                      className="bg-white h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Status Badge */}
            {isCompleted && (
              <div className="flex items-center gap-1 text-green-200 relative z-10">
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          {/* Full Desktop Unit Banner */}
          <UnitBanner 
            title={title} 
            description={description}
            lessonCount={lessons.length}
            completedLessons={completedLessons}
            isCompleted={isCompleted}
          />
        </div>
      </div>
      <div className="flex items-center flex-col relative mb-16 min-h-[400px]">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </div>
  );
};
