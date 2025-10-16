import Link from "next/link"
import { NotebookText, BookOpen, Target, Award, Crown } from "lucide-react"

import { Button } from "@/components/ui/button"

type Props = {
  title: string
  description: string
  lessonCount?: number
  completedLessons?: number
  isCompleted?: boolean
  isPro?: boolean
}

export const UnitBanner = ({
  title,
  description,
  lessonCount = 0,
  completedLessons = 0,
  isCompleted = false,
  isPro = false,
}: Props) => {
  const progress =
    lessonCount > 0 ? Math.round((completedLessons / lessonCount) * 100) : 0

  return (
    <div
      className={`w-full rounded-lg p-2 text-white flex items-center justify-between relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isCompleted
          ? "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500"
          : "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"
      }`}
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent'></div>

      {/* Decorative Elements */}
      <div className='absolute top-2 right-2 opacity-20'>
        {isCompleted ? (
          <Award className='w-5 h-5' />
        ) : (
          <Target className='w-5 h-5' />
        )}
      </div>

      <div className='space-y-1 flex-1 relative z-10'>
        <div className='flex items-center gap-2'>
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${
              isCompleted ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            <BookOpen className='w-4 h-4' />
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <h3 className='text-lg font-bold'>{title}</h3>
              {isPro && (
                <div className='flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 rounded-md border border-yellow-400/30'>
                  <Crown className='w-3 h-3 text-yellow-200' />
                  <span className='text-xs font-medium text-yellow-200'>PRO ACCESS</span>
                </div>
              )}
            </div>
            {isCompleted && (
              <div className='flex items-center gap-1 text-green-200'>
                <Award className='w-3 h-3' />
                <span className='text-xs font-medium'>Unit Completed!</span>
              </div>
            )}
          </div>
        </div>

        <p className='text-sm opacity-90 leading-snug'>
          {description}
          {isPro && (
            <span className='block mt-1 text-xs text-yellow-200 font-medium'>
              ✨ Pro Access: Jump ahead up to 3 lessons
            </span>
          )}
        </p>

        {/* Progress Info */}
        {lessonCount > 0 && (
          <div className='flex items-center gap-2 mt-1'>
            <div className='bg-white/20 rounded px-1.5 py-0.5 backdrop-blur-sm'>
              <div className='text-xs font-medium opacity-80'>Progress</div>
              <div className='text-xs font-bold'>{progress}%</div>
            </div>
            <div className='bg-white/20 rounded px-1.5 py-0.5 backdrop-blur-sm'>
              <div className='text-xs font-medium opacity-80'>Lessons</div>
              <div className='text-xs font-bold'>
                {completedLessons}/{lessonCount}
              </div>
            </div>
            <div className='flex-1 bg-white/20 rounded-full h-1 backdrop-blur-sm'>
              <div
                className='bg-white h-1 rounded-full transition-all duration-500'
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <Link href='/lesson'>
        <Button
          size='sm'
          variant='secondary'
          className='hidden xl:flex border-2 border-b-4 active:border-b-2 bg-card text-foreground hover:bg-muted font-bold shadow-lg hover:shadow-xl transition-all duration-200 relative z-10'
        >
          <NotebookText className='mr-1 w-4 h-4' />
          {isCompleted ? "Review" : "Continue"}
        </Button>
      </Link>
    </div>
  )
}
