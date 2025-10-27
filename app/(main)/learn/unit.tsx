import { lessons, units } from "@/db/schema"
import { UnitBanner } from "./unit-banner"
import { LessonButton } from "./lesson-button"
import { UnitSummaryButton } from "./unit-summary-button"
import { Check } from "lucide-react"

type Props = {
  id: number
  order: number
  title: string
  description: string
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean
  })[]
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect
      })
    | undefined
  activeLessonPercentage: number
  isPro?: boolean
}

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
  isPro = false,
}: Props) => {
  const completedLessons = lessons.filter((lesson) => lesson.completed).length
  const isCompleted = completedLessons === lessons.length

  return (
    <div data-unit-id={id} className='unit-container scroll-mt-24'>
      <div className='sticky top-[65px] z-30 mb-6'>
        <UnitBanner
          unitId={id}
          title={title}
          description={description}
          lessonCount={lessons.length}
          completedLessons={completedLessons}
          isCompleted={isCompleted}
          isPro={isPro}
        />
      </div>
      <div className='flex items-center flex-col relative mb-16 min-h-[400px]'>
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id

          let isLocked
          if (isPro) {
            const currentIndex = lessons.findIndex((l) => l.id === activeLesson?.id)
            const completedIndex = lessons.findIndex((l) => !l.completed) - 1
            const furthestAccessible = Math.max(currentIndex, completedIndex) + 3
            isLocked = index > furthestAccessible && !lesson.completed && !isCurrent
          } else {
            isLocked = !lesson.completed && !isCurrent
          }

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
              isPro={isPro}
            />
          )
        })}
      </div>
    </div>
  )
}
