"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Plus, BookOpen, ListChecks, FileQuestion, CheckSquare, Type, MousePointer, ImageIcon, Volume2, ArrowUpDown } from "lucide-react";
import Image from "next/image";

interface Unit {
  id: number;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  order: number;
  challenges: Challenge[];
}

interface Challenge {
  id: number;
  question: string;
  type: "SELECT" | "ASSIST" | "TRUE_FALSE" | "DRAG_DROP" | "TEXT_INPUT" | "IMAGE_SELECT" | "LISTENING";
  order: number;
  hint?: string;
  audioSrc?: string;
  imageSrc?: string;
  correctAnswer?: string;
  challengeOptions: ChallengeOption[];
}

interface ChallengeOption {
  id: number;
  text: string;
  correct: boolean;
  imageSrc?: string;
  audioSrc?: string;
  guide?: string;
  order?: number;
  value?: string;
}

interface Course {
  id: number;
  title: string;
  imageSrc: string;
  units: Unit[];
}

const getQuestionTypeIcon = (type: Challenge["type"]) => {
  switch (type) {
    case "SELECT":
      return <CheckSquare className="w-4 h-4" />;
    case "ASSIST":
      return <MousePointer className="w-4 h-4" />;
    case "TRUE_FALSE":
      return <FileQuestion className="w-4 h-4" />;
    case "DRAG_DROP":
      return <ArrowUpDown className="w-4 h-4" />;
    case "TEXT_INPUT":
      return <Type className="w-4 h-4" />;
    case "IMAGE_SELECT":
      return <ImageIcon className="w-4 h-4" />;
    case "LISTENING":
      return <Volume2 className="w-4 h-4" />;
    default:
      return <FileQuestion className="w-4 h-4" />;
  }
};

const getQuestionTypeColor = (type: Challenge["type"]) => {
  switch (type) {
    case "SELECT":
      return "bg-blue-100 text-blue-800";
    case "ASSIST":
      return "bg-green-100 text-green-800";
    case "TRUE_FALSE":
      return "bg-purple-100 text-purple-800";
    case "DRAG_DROP":
      return "bg-orange-100 text-orange-800";
    case "TEXT_INPUT":
      return "bg-yellow-100 text-yellow-800";
    case "IMAGE_SELECT":
      return "bg-pink-100 text-pink-800";
    case "LISTENING":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function CourseViewPage({ params }: { params: { courseId: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCourse = useCallback(async () => {
    try {
      const response = await fetch(`/api/courses/${params.courseId}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      } else {
        console.error('Failed to fetch course');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  }, [params.courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
        <Link href="/admin/courses">
          <Button variant="primary">Back to Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/courses">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={course.imageSrc}
                alt={course.title}
                fill={true}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-600">{course.units.length} units</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={`/admin/courses/${course.id}/edit`}>
            <Button variant="primaryOutline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Course
            </Button>
          </Link>
          <Link href={`/admin/units/new?courseId=${course.id}`}>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Unit
            </Button>
          </Link>
        </div>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold">{course.units.length}</div>
                <div className="text-sm text-gray-600">Units</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ListChecks className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <div className="text-2xl font-bold">
                  {course.units.reduce((acc, unit) => acc + unit.lessons.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileQuestion className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <div className="text-2xl font-bold">
                  {course.units.reduce((acc, unit) => 
                    acc + unit.lessons.reduce((lessonAcc, lesson) => 
                      lessonAcc + lesson.challenges.length, 0
                    ), 0
                  )}
                </div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-600 font-bold">%</span>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {course.units.length > 0 ? Math.round((
                    course.units.reduce((acc, unit) => 
                      acc + unit.lessons.reduce((lessonAcc, lesson) => 
                        lessonAcc + lesson.challenges.length, 0
                      ), 0
                    ) / course.units.reduce((acc, unit) => acc + unit.lessons.length, 0) || 0
                  ) * 100) : 0}
                </div>
                <div className="text-sm text-gray-600">Avg Q/Lesson</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Units and Lessons */}
      <div className="space-y-6">
        {course.units.length === 0 ? (
          <Card className="p-8 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">No units yet</h3>
            <p className="text-gray-600 mb-4">Create your first unit to organize the course content.</p>
            <Link href={`/admin/units/new?courseId=${course.id}`}>
              <Button variant="primary">Add First Unit</Button>
            </Link>
          </Card>
        ) : (
          course.units.map((unit, unitIndex) => (
            <Card key={unit.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                      Unit {unit.order}
                    </span>
                    <CardTitle className="text-xl">{unit.title}</CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/admin/lessons/new?unitId=${unit.id}`}>
                      <Button variant="secondaryOutline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Lesson
                      </Button>
                    </Link>
                    <Link href={`/admin/units/${unit.id}/edit`}>
                      <Button variant="primaryOutline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <p className="text-gray-600">{unit.description}</p>
              </CardHeader>
              <CardContent>
                {unit.lessons.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ListChecks className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No lessons in this unit yet</p>
                    <Link href={`/admin/lessons/new?unitId=${unit.id}`}>
                      <Button variant="primaryOutline" size="sm" className="mt-2">
                        Add First Lesson
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {unit.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                              Lesson {lesson.order}
                            </span>
                            <h4 className="font-semibold">{lesson.title}</h4>
                            <span className="text-sm text-gray-500">
                              ({lesson.challenges.length} questions)
                            </span>
                          </div>
                          <div className="flex space-x-1">
                            <Link href={`/admin/challenges/new?lessonId=${lesson.id}`}>
                              <Button variant="ghost" size="sm">
                                <Plus className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/lessons/${lesson.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                        
                        {lesson.challenges.length > 0 && (
                          <div className="ml-6 space-y-3">
                            {lesson.challenges.map((challenge, challengeIndex) => (
                              <div key={challenge.id} className="bg-white rounded-lg border p-4 shadow-sm">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-start space-x-3 flex-1">
                                    <span className={`flex items-center px-2 py-1 rounded text-xs font-medium ${getQuestionTypeColor(challenge.type)}`}>
                                      {getQuestionTypeIcon(challenge.type)}
                                      <span className="ml-1">{challenge.type}</span>
                                    </span>
                                    <div className="flex-1">
                                      <p className="font-medium text-sm text-gray-900 mb-1">
                                        Q{challenge.order}: {challenge.question}
                                      </p>
                                      {challenge.hint && (
                                        <p className="text-xs text-gray-600 italic">Hint: {challenge.hint}</p>
                                      )}
                                    </div>
                                  </div>
                                  <Link href={`/admin/challenges/${challenge.id}/edit`}>
                                    <Button variant="ghost" size="sm">
                                      <Edit className="w-3 h-3" />
                                    </Button>
                                  </Link>
                                </div>

                                {/* Audio/Image indicators */}
                                <div className="flex items-center space-x-2 mb-2">
                                  {challenge.audioSrc && (
                                    <span className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                      <Volume2 className="w-3 h-3 mr-1" />
                                      Audio
                                    </span>
                                  )}
                                  {challenge.imageSrc && (
                                    <span className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                                      <ImageIcon className="w-3 h-3 mr-1" />
                                      Image
                                    </span>
                                  )}
                                </div>

                                {/* Question-specific details */}
                                <div className="text-xs text-gray-700">
                                  {challenge.type === "TEXT_INPUT" && challenge.correctAnswer && (
                                    <div className="mb-2">
                                      <span className="font-medium">Correct Answer:</span> {challenge.correctAnswer}
                                    </div>
                                  )}
                                  
                                  {challenge.challengeOptions.length > 0 && (
                                    <div className="space-y-1">
                                      <span className="font-medium">Options ({challenge.challengeOptions.length}):</span>
                                      <div className="ml-2 space-y-1">
                                        {challenge.challengeOptions
                                          .sort((a, b) => (a.order || 0) - (b.order || 0))
                                          .map((option, optionIndex) => (
                                          <div key={option.id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                              {challenge.type === "DRAG_DROP" && (
                                                <span className="text-gray-400 text-xs">#{option.order || optionIndex + 1}</span>
                                              )}
                                              <span className={`px-1.5 py-0.5 rounded text-xs ${
                                                option.correct 
                                                  ? "bg-green-100 text-green-800 font-medium" 
                                                  : "bg-gray-100 text-gray-700"
                                              }`}>
                                                {option.text}
                                              </span>
                                              {option.correct && (
                                                <span className="text-green-600 font-bold">✓</span>
                                              )}
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              {option.imageSrc && (
                                                <ImageIcon className="w-3 h-3 text-blue-500" />
                                              )}
                                              {option.audioSrc && (
                                                <Volume2 className="w-3 h-3 text-blue-500" />
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      {challenge.type === "DRAG_DROP" && (
                                        <div className="text-xs text-blue-600 mt-1 italic">
                                          ↑ Correct order shown above
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}