"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Plus, BookOpen, ListChecks, FileQuestion } from "lucide-react";
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
  type: "SELECT" | "ASSIST";
  order: number;
  challengeOptions: ChallengeOption[];
}

interface ChallengeOption {
  id: number;
  text: string;
  correct: boolean;
  imageSrc?: string;
  audioSrc?: string;
}

interface Course {
  id: number;
  title: string;
  imageSrc: string;
  units: Unit[];
}

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
                fill
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
                <p className="text-2xl font-bold">{course.units.length}</p>
                <p className="text-sm text-gray-600">Units</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ListChecks className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">
                  {course.units.reduce((acc, unit) => acc + unit.lessons.length, 0)}
                </p>
                <p className="text-sm text-gray-600">Lessons</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileQuestion className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">
                  {course.units.reduce((acc, unit) => 
                    acc + unit.lessons.reduce((lessonAcc, lesson) => 
                      lessonAcc + lesson.challenges.length, 0
                    ), 0
                  )}
                </p>
                <p className="text-sm text-gray-600">Questions</p>
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
                <p className="text-2xl font-bold">
                  {course.units.length > 0 ? Math.round((
                    course.units.reduce((acc, unit) => 
                      acc + unit.lessons.reduce((lessonAcc, lesson) => 
                        lessonAcc + lesson.challenges.length, 0
                      ), 0
                    ) / course.units.reduce((acc, unit) => acc + unit.lessons.length, 0) || 0
                  ) * 100) : 0}
                </p>
                <p className="text-sm text-gray-600">Avg Q/Lesson</p>
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
                          <div className="ml-6 space-y-2">
                            {lesson.challenges.slice(0, 3).map((challenge, challengeIndex) => (
                              <div key={challenge.id} className="flex items-center justify-between py-2 px-3 bg-white rounded border text-sm">
                                <div className="flex items-center space-x-2">
                                  <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs">
                                    {challenge.type}
                                  </span>
                                  <span className="truncate max-w-md">{challenge.question}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="text-xs text-gray-500">
                                    {challenge.challengeOptions.length} options
                                  </span>
                                  <Link href={`/admin/challenges/${challenge.id}/edit`}>
                                    <Button variant="ghost" size="sm">
                                      <Edit className="w-3 h-3" />
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            ))}
                            {lesson.challenges.length > 3 && (
                              <p className="text-sm text-gray-500 text-center">
                                +{lesson.challenges.length - 3} more questions
                              </p>
                            )}
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