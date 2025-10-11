"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { PageHeader } from "@/components/ui/page-header";
import { Loading, PageLoading } from "@/components/ui/loading";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { LessonCard } from "@/components/ui/lesson-card";
import { ArrowLeft, Edit, Plus, BookOpen, ListChecks, FileQuestion, CheckSquare, Type, MousePointer, ImageIcon, Volume2, ArrowUpDown, Mic } from "lucide-react";
import Image from "next/image";
import { CourseThemeConfig } from "../components/course-theme-config";

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
  type: "SELECT" | "ASSIST" | "TRUE_FALSE" | "DRAG_DROP" | "TEXT_INPUT" | "IMAGE_SELECT" | "LISTENING" | "SPEECH_INPUT";
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
}

interface Course {
  id: number;
  title: string;
  imageSrc: string;
  description?: string;
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
    case "SPEECH_INPUT":
      return <Mic className="w-4 h-4" />;
    default:
      return <FileQuestion className="w-4 h-4" />;
  }
};

const getQuestionTypeColor = (type: Challenge["type"]) => {
  switch (type) {
    case "SELECT":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200";
    case "ASSIST":
      return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200";
    case "TRUE_FALSE":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200";
    case "DRAG_DROP":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200";
    case "TEXT_INPUT":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200";
    case "IMAGE_SELECT":
      return "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200";
    case "LISTENING":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200";
    case "SPEECH_INPUT":
      return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200";
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
    return <PageLoading text="Loading course details..." />;
  }

  if (!course) {
    return (
      <EmptyState
        variant="full"
        icon={<BookOpen className="w-12 h-12" />}
        title="Course not found"
        description="The course you're looking for doesn't exist or may have been deleted."
        action={{
          label: "Back to Courses",
          onClick: () => router.push("/admin/courses"),
          variant: "primary"
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/courses">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={course.imageSrc}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <PageHeader
            title={course.title}
            description={`${course.units.length} units`}
            badge={<Badge variant="primary">Course</Badge>}
            actions={
              <div className="flex gap-2">
                <Link href={`/admin/courses/${course.id}/edit`}>
                  <Button variant="outline">
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
            }
          />
        </div>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          variant="primary"
          icon={<BookOpen className="w-6 h-6" />}
          title="Total Units"
          value={course.units.length.toString()}
        />
        <StatCard
          variant="default"
          icon={<ListChecks className="w-6 h-6" />}
          title="Total Lessons"
          value={course.units.reduce((acc, unit) => acc + unit.lessons.length, 0).toString()}
        />
        <StatCard
          variant="success"
          icon={<FileQuestion className="w-6 h-6" />}
          title="Total Challenges"
          value={course.units.reduce((acc, unit) => 
            acc + unit.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.challenges.length, 0), 0
          ).toString()}
        />
        <StatCard
          variant="warning"
          icon={<CheckSquare className="w-6 h-6" />}
          title="Completion Rate"
          value="85%"
          trend={{
            value: "12",
            positive: true
          }}
        />
      </div>

      {/* Course Theme Configuration */}
      <Card className="dark:bg-gray-800/70 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-gray-200">Course Theme Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <CourseThemeConfig courseId={course.id} />
        </CardContent>
      </Card>

      {/* Units and Lessons */}
      <div className="space-y-6">
        {course.units.length === 0 ? (
          <EmptyState
            icon={<BookOpen className="w-12 h-12" />}
            title="No units found"
            description="This course doesn't have any units yet. Create your first unit to get started."
            action={{
              label: "Add First Unit",
              onClick: () => router.push(`/admin/units/new?courseId=${course.id}`),
              variant: "primary"
            }}
          />
        ) : (
          course.units.map((unit) => (
            <Card key={unit.id} className="dark:bg-gray-800/70 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="dark:text-gray-200">{unit.title}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{unit.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/units/${unit.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/lessons/new?unitId=${unit.id}`}>
                      <Button variant="primary" size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Lesson
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {unit.lessons.length === 0 ? (
                  <EmptyState
                    variant="minimal"
                    icon={<ListChecks className="w-8 h-8" />}
                    title="No lessons"
                    description="Add lessons to this unit"
                    action={{
                      label: "Add Lesson",
                      onClick: () => router.push(`/admin/lessons/new?unitId=${unit.id}`),
                      variant: "primary"
                    }}
                  />
                ) : (
                  <div className="space-y-4">
                    {unit.lessons.map((lesson) => (
                      <div key={lesson.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-900/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <LessonCard
                              lesson={{
                                id: lesson.id.toString(),
                                title: lesson.title,
                                order: lesson.order,
                                challenges: lesson.challenges
                              }}
                              status="completed"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/admin/lessons/${lesson.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/challenges/new?lessonId=${lesson.id}`}>
                              <Button variant="primary" size="sm">
                                <Plus className="w-4 h-4 mr-1" />
                                Add Challenge
                              </Button>
                            </Link>
                          </div>
                        </div>
                        
                        {lesson.challenges.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Challenges:</h4>
                            <div className="grid gap-2">
                              {lesson.challenges.map((challenge) => (
                                <div
                                  key={challenge.id}
                                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded-md ${getQuestionTypeColor(challenge.type)}`}>
                                      {getQuestionTypeIcon(challenge.type)}
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {challenge.question}
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {challenge.type.replace('_', ' ')} • {challenge.challengeOptions.length} options
                                      </p>
                                    </div>
                                  </div>
                                  <Link href={`/admin/challenges/${challenge.id}/edit`}>
                                    <Button variant="ghost" size="sm">
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                  </Link>
                                </div>
                              ))}
                            </div>
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