import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Edit, Plus, Trash2, Eye, AlertTriangle, Lightbulb } from "lucide-react";
import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { LessonForm } from "../../components/lesson-form";

const AdminLessonEditPage = async ({
  params
}: {
  params: { lessonId: string }
}) => {
  if (!await isAdmin()) {
    return redirect("/");
  }

  const lessonId = parseInt(params.lessonId);
  
  // Fetch lesson data directly from database
  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      unit: {
        columns: {
          id: true,
          title: true,
        },
        with: {
          course: {
            columns: {
              id: true,
              title: true,
            },
          },
        },
      },
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
        },
      },
    },
  });
  
  if (!lesson) {
    return redirect("/admin/lessons");
  }

  // Fetch challenges for this lesson
  const challengesResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/challenges?lessonId=${lessonId}`, {
    cache: 'no-store'
  });
  
  const challenges = challengesResponse.ok ? await challengesResponse.json() : [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/lessons">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Lessons
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Edit Lesson</h1>
              <p className="text-gray-600 mt-2">Modify lesson details and manage challenges</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lesson Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Information</CardTitle>
            </CardHeader>
            <CardContent>
              <LessonForm 
                mode="edit" 
                lessonId={lessonId}
                initialData={{
                  title: lesson.title,
                  unitId: lesson.unitId,
                  order: lesson.order,
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Related Challenges */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  Questions/Challenges ({challenges.length})
                </CardTitle>
                <Link href={`/admin/challenges/new?lessonId=${lessonId}`}>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {challenges.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No questions yet</h3>
                  <p className="text-gray-600 mb-4">Add questions to make this lesson interactive</p>
                  <Link href={`/admin/challenges/new?lessonId=${lessonId}`}>
                    <Button>Add First Question</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {challenges.map((challenge: any, index: number) => (
                    <div key={challenge.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              Question {challenge.order}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                              challenge.type === 'SELECT' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {challenge.type === 'SELECT' ? 'Multiple Choice' : 'Fill in Blank'}
                            </span>
                            {challenge.hint && (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                                <Lightbulb className="w-3 h-3 mr-1" />
                                Has Hint
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1 truncate">
                            {challenge.question}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {challenge.challengeOptions?.length || 0} answer options
                          </p>
                        </div>
                        <div className="flex space-x-1 ml-4">
                          <Link href={`/admin/challenges/${challenge.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/challenges/${challenge.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Warning about deletion */}
          {challenges.length > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-orange-800">
                      Deletion Warning
                    </h3>
                    <p className="mt-1 text-sm text-orange-700">
                      Deleting this lesson will also delete all {challenges.length} questions and their answers. 
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLessonEditPage;
