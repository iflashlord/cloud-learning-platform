import * as schema from "../../db/schema"

export type ChallengeType = (typeof schema.challenges.$inferInsert)["type"]

export type ChallengeOptionSeed = {
  text: string
  correct?: boolean
  imageSrc?: string | null
  audioSrc?: string | null
  guide?: string | null
  order?: number
  value?: string | null
}

export type ChallengeSeed = {
  type: ChallengeType
  order: number
  question: string
  hint?: string
  audioSrc?: string
  videoSrc?: string
  correctAnswer?: string
  options?: ChallengeOptionSeed[]
}

export type LessonSeed = {
  title: string
  order: number
  challenges: ChallengeSeed[]
}

export type UnitSeed = {
  title: string
  description: string
  order: number
  lessons: LessonSeed[]
}

export type CourseSeed = {
  id: number
  title: string
  imageSrc: string
  category: string
  description: string
  level: string
  duration: string
  units: UnitSeed[]
}
