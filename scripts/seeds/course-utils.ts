import { CourseSeed, ChallengeSeed, ChallengeOptionSeed } from "./types"

type ChallengeContext = {
  courseTitle: string
  unitTitle: string
  lessonTitle: string
  provider: "AWS" | "Google Cloud" | "Microsoft Azure"
}

const detectProvider = (courseTitle: string): ChallengeContext["provider"] => {
  const lower = courseTitle.toLowerCase()
  if (lower.includes("google")) {
    return "Google Cloud"
  }
  if (lower.includes("azure") || lower.includes("microsoft")) {
    return "Microsoft Azure"
  }
  return "AWS"
}

const summarizeQuestion = (challenge: ChallengeSeed): string => {
  const base = challenge.question
    .replace(/\s+/g, " ")
    .trim()
    .replace(/["?]/g, "")
  return base.length > 0 ? base : "the concept described"
}

const STOP_WORDS = new Set([
  "what",
  "which",
  "does",
  "this",
  "that",
  "these",
  "those",
  "are",
  "is",
  "the",
  "a",
  "an",
  "of",
  "for",
  "and",
  "or",
  "to",
  "in",
  "your",
  "their",
  "with",
  "when",
  "how",
  "why",
  "true",
  "false",
  "complete",
  "name",
  "type",
  "select",
  "choose",
  "fill",
])

const formatConcept = (concept: string) => {
  if (!concept) return "this concept"
  return concept
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ""))
    .join(" ")
}

const extractConcept = (question: string): string => {
  const tokens = question
    .replace(/____+/g, " blank ")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token && !STOP_WORDS.has(token))

  const keywords = tokens.slice(0, 4).join(" ")
  return formatConcept(keywords || question.replace(/[?]/g, "").trim())
}

const hintTemplates = [
  (context: ChallengeContext, concept: string) =>
    `Think back to "${context.lessonTitle}" and how it framed ${concept}. Apply the same reasoning here.`,
  (context: ChallengeContext, concept: string) =>
    `Use the example from "${context.lessonTitle}" about ${concept} to guide your answer.`,
  (context: ChallengeContext, concept: string) =>
    `Remember the pattern you practiced in "${context.lessonTitle}"—it explained how ${concept} works within ${context.provider}.`,
] as const

const getHintCopy = (context: ChallengeContext, concept: string) => {
  const index =
    Math.abs(
      context.lessonTitle.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0),
    ) % hintTemplates.length
  return hintTemplates[index](context, concept)
}

const ensureHint = (
  challenge: ChallengeSeed,
  context: ChallengeContext,
  overwrite: boolean,
): string => {
  if (!overwrite && challenge.hint && challenge.hint.trim().length > 0) {
    return challenge.hint
  }

  const concept = extractConcept(challenge.question)
  return getHintCopy(context, concept)
}

const summarizeOption = (text: string): string => {
  const cleaned = text.trim()
  if (!cleaned) return "this option"
  if (cleaned.length <= 80) return cleaned
  return `${cleaned.slice(0, 77)}…`
}

const ensureGuide = (
  option: ChallengeOptionSeed,
  challenge: ChallengeSeed,
  context: ChallengeContext,
  overwrite: boolean,
): string => {
  if (!overwrite && option.guide && option.guide.trim().length > 0) {
    return option.guide
  }

  const optionSummary = summarizeOption(option.text ?? "")
  const concept = extractConcept(challenge.question)

  if (option.correct) {
    return `Correct: ${optionSummary} matches the ${concept} behavior highlighted in "${context.lessonTitle}".`
  }

  return `This assumes ${optionSummary}, but "${context.lessonTitle}" showed ${concept} behaves differently, so this isn’t the best choice.`
}

const enrichChallenge = (
  challenge: ChallengeSeed,
  context: ChallengeContext,
  overwrite: boolean,
): ChallengeSeed => {
  const enrichedOptions = challenge.options?.map((option) => ({
    ...option,
    guide: ensureGuide(option, challenge, context, overwrite),
  }))

  return {
    ...challenge,
    hint: ensureHint(challenge, context, overwrite),
    options: enrichedOptions,
  }
}

export const enrichCourseWithGuidance = (
  course: CourseSeed,
  options?: { overwrite?: boolean },
): CourseSeed => {
  const overwrite = options?.overwrite ?? false
  return {
    ...course,
    units: course.units.map((unit) => ({
      ...unit,
      lessons: unit.lessons.map((lesson) => ({
        ...lesson,
        challenges: lesson.challenges.map((challenge) =>
          enrichChallenge(
            challenge,
            {
              courseTitle: course.title,
              unitTitle: unit.title,
              lessonTitle: lesson.title,
              provider: detectProvider(course.title),
            },
            overwrite,
          ),
        ),
      })),
    })),
  }
}

export const enrichCourses = (courses: CourseSeed[]): CourseSeed[] =>
  courses.map((course) => enrichCourseWithGuidance(course))
