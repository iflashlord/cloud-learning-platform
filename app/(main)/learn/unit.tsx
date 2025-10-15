import { lessons, units } from "@/db/schema"
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

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
      <div className="sticky top-[73px] z-40 mb-6">
        <UnitBanner 
          title={title} 
          description={description}
          lessonCount={lessons.length}
          completedLessons={completedLessons}
          isCompleted={isCompleted}
        />
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
