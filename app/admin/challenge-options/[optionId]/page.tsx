import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/admin";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Edit, ArrowLeft, CheckCircle2, XCircle, ImageIcon, Volume2 } from "lucide-react";
import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";

const AdminChallengeOptionViewPage = async ({
  params
}: {
  params: { optionId: string }
}) => {
  if (!await isAdmin()) {
    return redirect("/");
  }

  const optionId = parseInt(params.optionId);
  
  // Fetch challenge option data directly from database
  const option = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, optionId),
    with: {
      challenge: {
        columns: {
          id: true,
          question: true,
          type: true,
        },
        with: {
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
      },
    },
  });
  
  if (!option) {
    return redirect("/admin/challenge-options");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/challenge-options">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Options
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Challenge Option Details</h1>
              <p className="text-gray-600 mt-2">Option #{option.id}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Link href={`/admin/challenge-options/${optionId}/edit`}>
              <Button variant="secondary">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button variant="danger">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Option Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Option Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer Text</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{option.text}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correctness</label>
              <div className="flex items-center">
                {option.correct ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Correct Answer
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Incorrect Answer
                    </span>
                  </>
                )}
              </div>
            </div>

            {(option.imageSrc || option.audioSrc) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Media Files</label>
                <div className="space-y-2">
                  {option.imageSrc && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ImageIcon className="w-4 h-4" />
                      <span>Image:</span>
                      <a 
                        href={option.imageSrc} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline truncate max-w-xs"
                      >
                        {option.imageSrc}
                      </a>
                    </div>
                  )}
                  {option.audioSrc && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Volume2 className="w-4 h-4" />
                      <span>Audio:</span>
                      <a 
                        href={option.audioSrc} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline truncate max-w-xs"
                      >
                        {option.audioSrc}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Challenge Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Associated Challenge</h2>
          
          {option.challenge ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Challenge Question</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{option.challenge.question}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  option.challenge.type === 'SELECT' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {option.challenge.type}
                </span>
              </div>
              
              {option.challenge.lesson && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Path</label>
                  <p className="text-gray-900 text-sm">
                    {option.challenge.lesson.unit?.course?.title} → {option.challenge.lesson.unit?.title} → {option.challenge.lesson.title}
                  </p>
                </div>
              )}
              
              <div className="pt-4">
                <Link href={`/admin/challenges/${option.challengeId}`}>
                  <Button variant="secondary" size="sm">
                    View Full Challenge
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No challenge information available</p>
          )}
        </div>
      </div>

      {/* Media Preview */}
      {(option.imageSrc || option.audioSrc) && (
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Media Preview</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {option.imageSrc && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
                <div className="border border-gray-200 rounded-lg p-4">
                  <Image
                    src={option.imageSrc}
                    alt={option.text}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              </div>
            )}
            
            {option.audioSrc && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Audio Preview</label>
                <div className="border border-gray-200 rounded-lg p-4">
                  <audio controls className="w-full">
                    <source src={option.audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Option Preview in Challenge Context */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Preview in Challenge</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">
              {option.challenge?.question || "Sample Question"}
            </h3>
            
            <div className="space-y-3">
              <button
                className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                  option.correct
                    ? 'border-green-500 bg-green-100'
                    : 'border-gray-300 bg-white'
                }`}
                disabled
              >
                <div className="flex items-center">
                  {option.imageSrc && (
                    <Image 
                      src={option.imageSrc} 
                      alt={option.text}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-cover rounded mr-3"
                    />
                  )}
                  <span className="flex-1">{option.text}</span>
                  {option.correct && (
                    <span className="text-green-600 font-medium text-sm">✓ Correct</span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChallengeOptionViewPage;
