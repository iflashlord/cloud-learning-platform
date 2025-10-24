import { courseSeeds } from "./courses"

type Issue = {
  course: string
  unit: string
  lesson: string
  question: string
  detail: string
}

const issues: Issue[] = []
let challengeCount = 0
let optionCount = 0

for (const course of courseSeeds) {
  for (const unit of course.units) {
    for (const lesson of unit.lessons) {
      for (const challenge of lesson.challenges) {
        challengeCount++
        if (!challenge.hint || challenge.hint.trim().length === 0) {
          issues.push({
            course: course.title,
            unit: unit.title,
            lesson: lesson.title,
            question: challenge.question,
            detail: "Missing hint",
          })
        }

        if (challenge.options?.length) {
          for (const option of challenge.options) {
            optionCount++
            if (!option.guide || option.guide.trim().length === 0) {
              issues.push({
                course: course.title,
                unit: unit.title,
                lesson: lesson.title,
                question: challenge.question,
                detail: `Missing guide for option "${option.text}"`,
              })
            }
          }
        }
      }
    }
  }
}

if (issues.length > 0) {
  console.error("❌ Seed validation failed. Details:")
  for (const issue of issues) {
    console.error(
      `- [${issue.course} / ${issue.unit} / ${issue.lesson}] ${issue.detail} -> ${issue.question}`,
    )
  }
  throw new Error(`Seed validation failed with ${issues.length} issue(s).`)
}

console.log(
  `✅ Seed validation passed. Checked ${challengeCount} challenges and ${optionCount} options.`,
)
