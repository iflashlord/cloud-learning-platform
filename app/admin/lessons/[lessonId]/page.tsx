"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Plus, Eye, Trash2, FileQuestion, ImageIcon, Volume2 } from "lucide-react";

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

interface Unit {
  id: number;
  title: string;
  course: {
    id: number;
    title: string;
  };
}

interface Lesson {
  id: number;
  title: string;
  order: number;
  unit: Unit;
  challenges: Challenge[];
}

export default function LessonViewPage({ params }: { params: { lessonId: string } }) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchLesson = useCallback(async () => {
    try {
      const response = await fetch(`/api/lessons/${params.lessonId}`);
      if (response.ok) {
        const data = await response.json();
        setLesson(data);
      } else {
        console.error('Failed to fetch lesson');
        router.push('/admin/lessons');
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
      router.push('/admin/lessons');
    } finally {
      setLoading(false);
    }
  }, [params.lessonId, router]);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  const deleteChallenge = async (challengeId: number) => {
    if (!confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      const response = await fetch(`/api/challenges/${challengeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchLesson(); // Refresh the data
      } else {
        alert('Failed to delete question');
      }
    } catch (error) {
      console.error('Error deleting challenge:', error);
      alert('Failed to delete question');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h1>
        <Link href="/admin/lessons">
          <Button variant="primary">Back to Lessons</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/admin/courses/${lesson.unit.course.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm text-gray-500">{lesson.unit.course.title}</span>
              <span className="text-sm text-gray-400">→</span>
              <span className="text-sm text-gray-500">{lesson.unit.title}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            <p className="text-gray-600">{lesson.challenges.length} questions</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={`/admin/lessons/${lesson.id}/edit`}>
            <Button variant="primaryOutline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Lesson
            </Button>
          </Link>
          <Link href={`/admin/challenges/new?lessonId=${lesson.id}`}>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </Link>
        </div>
      </div>

      {/* Lesson Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Lesson preview functionality will be implemented here</p>
            <p className="text-sm">This would show how the lesson appears to students</p>
          </div>
        </CardContent>
      </Card>

      {/* Questions/Challenges */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
          <span className="text-sm text-gray-500">{lesson.challenges.length} total</span>
        </div>

        {lesson.challenges.length === 0 ? (
          <Card className="p-8 text-center">
            <FileQuestion className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">No questions yet</h3>
            <p className="text-gray-600 mb-4">Add questions to make this lesson interactive.</p>
            <Link href={`/admin/challenges/new?lessonId=${lesson.id}`}>
              <Button variant="primary">Add First Question</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {lesson.challenges.map((challenge, index) => (
              <Card key={challenge.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                          Question {challenge.order}
                        </span>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          challenge.type === "SELECT" 
                            ? "bg-purple-100 text-purple-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {challenge.type}
                        </span>
                        <span className="text-sm text-gray-500">
                          {challenge.challengeOptions.length} options
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {challenge.question}
                      </h3>

                      {/* Answer Options Preview */}
                      <div className="space-y-2">
                        {challenge.challengeOptions.slice(0, 3).map((option) => (
                          <div 
                            key={option.id} 
                            className={`flex items-center space-x-3 p-3 rounded border ${
                              option.correct 
                                ? "bg-green-50 border-green-200" 
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              option.correct 
                                ? "bg-green-500 border-green-500" 
                                : "border-gray-300"
                            }`}>
                              {option.correct && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                            <span className="flex-1">{option.text}</span>
                            {option.imageSrc && (
                              <ImageIcon className="w-4 h-4 text-gray-500" />
                            )}
                            {option.audioSrc && (
                              <Volume2 className="w-4 h-4 text-gray-500" />
                            )}
                          </div>
                        ))}
                        {challenge.challengeOptions.length > 3 && (
                          <p className="text-sm text-gray-500 text-center">
                            +{challenge.challengeOptions.length - 3} more options
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Link href={`/admin/challenges/${challenge.id}/edit`}>
                        <Button variant="secondaryOutline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="dangerOutline"
                        size="sm"
                        onClick={() => deleteChallenge(challenge.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
