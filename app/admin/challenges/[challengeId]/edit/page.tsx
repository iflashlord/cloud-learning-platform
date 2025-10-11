import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Edit, Plus, Trash2, Eye, AlertTriangle, CheckCircle2, XCircle, ImageIcon, Volume2, Lightbulb } from "lucide-react";
import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { ChallengeForm } from "../../components/ChallengeForm";

const AdminChallengeEditPage = async ({
  params
}: {
  params: { challengeId: string }
}) => {
  if (!await isAdmin()) {
    return redirect("/");
  }

  const challengeId = parseInt(params.challengeId);
  
  // Fetch challenge data with options directly from database
  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
    with: {
      challengeOptions: true,
      lesson: {
        columns: {
          id: true,
          title: true,
        },
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
        },
      },
    },
  });
  
  if (!challenge) {
    return redirect("/admin/challenges");
  }
  
  const challengeOptions = challenge.challengeOptions || [];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/challenges">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Challenges
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Challenge</h1>
              <p className="text-gray-600 mt-2">Modify question and manage answer options</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Challenge Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ChallengeForm 
                challengeId={challengeId} 
                initialData={{
                  ...challenge,
                  hint: challenge.hint || undefined,
                  challengeOptions: challenge.challengeOptions.map(option => ({
                    ...option,
                    imageSrc: option.imageSrc || undefined,
                    audioSrc: option.audioSrc || undefined,
                    guide: option.guide || undefined
                  }))
                }} 
                hideOptions={true} 
              />
            </CardContent>
          </Card>
        </div>

        {/* Answer Options */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  Answer Options ({challengeOptions.length})
                </CardTitle>
                <Link href={`/admin/challenge-options/new?challengeId=${challengeId}`}>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {challengeOptions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No answer options yet</h3>
                  <p className="text-gray-600 mb-4">Add answer choices for this question</p>
                  <Link href={`/admin/challenge-options/new?challengeId=${challengeId}`}>
                    <Button>Add First Option</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {challengeOptions.map((option: any, index: number) => (
                    <div 
                      key={option.id} 
                      className={`border rounded-lg p-4 ${
                        option.correct 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center">
                              {option.correct ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500 mr-1" />
                              )}
                              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                                option.correct 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                Option {index + 1}
                              </span>
                            </div>
                            {(option.imageSrc || option.audioSrc) && (
                              <div className="flex space-x-1">
                                {option.imageSrc && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                    <ImageIcon className="w-3 h-3" />
                                    Image
                                  </span>
                                )}
                                {option.audioSrc && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                    <Volume2 className="w-3 h-3" />
                                    Audio
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">
                            {option.text}
                          </h4>
                          {option.guide && (
                            <p className="text-xs text-gray-600 bg-white px-2 py-1 rounded border flex items-center gap-1">
                              <Lightbulb className="w-3 h-3 text-yellow-500" />
                              <span>
                                <strong>Explanation:</strong> {option.guide}
                              </span>
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-1 ml-4">
                          <Link href={`/admin/challenge-options/${option.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/challenge-options/${option.id}/edit`}>
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

          {/* Warning Cards */}
          <div className="space-y-4">
            {/* Validation Warning */}
            {challengeOptions.length > 0 && !challengeOptions.some((opt: any) => opt.correct) && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Missing Correct Answer
                      </h3>
                      <p className="mt-1 text-sm text-red-700">
                        This question needs at least one correct answer option.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Deletion Warning */}
            {challengeOptions.length > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-orange-800">
                        Deletion Warning
                      </h3>
                      <p className="mt-1 text-sm text-orange-700">
                        Deleting this challenge will also delete all {challengeOptions.length} answer options. 
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
    </div>
  );
};

export default AdminChallengeEditPage;
