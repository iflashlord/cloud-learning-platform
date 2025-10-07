import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Edit, ArrowLeft } from "lucide-react";

const AdminChallengeViewPage = async ({
  params
}: {
  params: { challengeId: string }
}) => {
  if (!await isAdmin()) {
    return redirect("/");
  }

  const challengeId = parseInt(params.challengeId);
  
  // Fetch challenge data
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/challenges/${challengeId}`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    return redirect("/admin/challenges");
  }
  
  const challenge = await response.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
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
              <h1 className="text-3xl font-bold text-gray-900">Challenge Details</h1>
              <p className="text-gray-600 mt-2">Challenge #{challenge.id}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Link href={`/admin/challenges/${challengeId}/edit`}>
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
        {/* Challenge Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Challenge Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{challenge.question}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <p className="text-gray-900">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    challenge.type === 'SELECT' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {challenge.type}
                  </span>
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <p className="text-gray-900">{challenge.order}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lesson</label>
              <p className="text-gray-900">
                {challenge.lesson?.unit?.course?.title} → {challenge.lesson?.unit?.title} → {challenge.lesson?.title}
              </p>
            </div>
          </div>
        </div>

        {/* Answer Options */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Answer Options</h2>
          
          <div className="space-y-3">
            {challenge.challengeOptions?.map((option: any, index: number) => (
              <div 
                key={option.id}
                className={`p-4 rounded-lg border-2 ${
                  option.correct 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 mr-2">
                        Option {index + 1}
                      </span>
                      {option.correct && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          Correct Answer
                        </span>
                      )}
                    </div>
                    <p className="text-gray-900 mb-2">{option.text}</p>
                    
                    {(option.imageSrc || option.audioSrc) && (
                      <div className="flex space-x-4 text-sm text-gray-600">
                        {option.imageSrc && (
                          <span>📷 Image attached</span>
                        )}
                        {option.audioSrc && (
                          <span>🔊 Audio attached</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenge Preview */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Challenge Preview</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">
              {challenge.question}
            </h3>
            
            <div className="grid gap-3">
              {challenge.challengeOptions?.map((option: any, index: number) => (
                <button
                  key={option.id}
                  className={`p-4 text-left border-2 rounded-lg transition-colors ${
                    option.correct
                      ? 'border-green-500 bg-green-100'
                      : 'border-gray-300 bg-white hover:border-gray-400'
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
                      <span className="text-green-600 font-medium text-sm">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChallengeViewPage;