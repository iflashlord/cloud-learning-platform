import React from "react"
import { DuolingoLesson, sampleQuestions } from "@/components/lesson"

export const DuolingoLessonExample: React.FC = () => {
  const handleLessonComplete = () => {
    console.log("Lesson completed!")
    // In a real app, this would navigate to the next lesson or update progress
  }

  return (
    <DuolingoLesson
      questions={sampleQuestions}
      hearts={5}
      streak={12}
      onComplete={handleLessonComplete}
    />
  )
}
