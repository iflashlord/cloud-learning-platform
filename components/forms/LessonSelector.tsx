"use client";

import { Button } from "@/components/ui/button";

type Lesson = {
  id: number;
  title: string;
  unit: {
    id: number;
    title: string;
    course: {
      id: number;
      title: string;
    };
  };
};

interface LessonSelectorProps {
  lessons: Lesson[];
  selectedLessonId: number;
  onChange: (lessonId: number) => void;
  disabled?: boolean;
  preselectedLessonId?: number;
}

export const LessonSelector = ({
  lessons,
  selectedLessonId,
  onChange,
  disabled,
  preselectedLessonId
}: LessonSelectorProps) => {
  if (preselectedLessonId) {
    const preselectedLesson = lessons.find(lesson => lesson.id === preselectedLessonId);
    if (preselectedLesson) {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Lesson</label>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
            <p className="font-medium">{preselectedLesson.title}</p>
            <p className="text-sm text-gray-600">
              {preselectedLesson.unit.course.title} → {preselectedLesson.unit.title}
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Lesson <span className="text-red-500">*</span>
      </label>
      <select
        value={selectedLessonId}
        onChange={(e) => onChange(parseInt(e.target.value))}
        required
        disabled={disabled}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select a lesson</option>
        {lessons.map((lesson) => (
          <option key={lesson.id} value={lesson.id}>
            {lesson.unit.course.title} → {lesson.unit.title} → {lesson.title}
          </option>
        ))}
      </select>
    </div>
  );
};