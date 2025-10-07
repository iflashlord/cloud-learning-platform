"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, CheckCircle2, XCircle } from "lucide-react";

interface ChallengeOption {
  id: number;
  text: string;
  correct: boolean;
  imageSrc?: string;
  audioSrc?: string;
  guide?: string;
  challenge: {
    id: number;
    question: string;
    lesson?: {
      id: number;
      title: string;
    };
  };
}

const AdminChallengeOptionsPage = () => {
  const [challengeOptions, setChallengeOptions] = useState<ChallengeOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchChallengeOptions();
  }, []);

  const fetchChallengeOptions = async () => {
    try {
      const response = await fetch("/api/challengeOptions");
      if (response.ok) {
        const data = await response.json();
        setChallengeOptions(data);
      }
    } catch (error) {
      console.error("Failed to fetch challenge options:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(challengeOptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOptions = challengeOptions.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">Loading challenge options...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Challenge Options</h1>
          <p className="text-gray-600 mt-1">Manage answer options for challenges</p>
        </div>
        <Link href="/admin/challenge-options/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Challenge Option
          </Button>
        </Link>
      </div>

      {challengeOptions.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">No answer options yet</h3>
            <p className="mb-4">Create answer options for your quiz questions.</p>
            <Link href="/admin/challenge-options/new">
              <Button>Add Challenge Option</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {paginatedOptions.map((option: any) => (
            <Card key={option.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center">
                      {option.correct ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mr-2" />
                      )}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        option.correct 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {option.correct ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    {option.challenge && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Challenge #{option.challengeId}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {option.text}
                  </h3>
                  {option.challenge && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Question:</strong> {option.challenge.question}
                      </p>
                      {option.challenge.lesson && (
                        <p className="text-xs text-gray-500">
                          {option.challenge.lesson.unit?.course?.title} → {option.challenge.lesson.unit?.title} → {option.challenge.lesson.title}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="flex space-x-4 text-sm text-gray-500">
                    {option.imageSrc && (
                      <span>📷 Has image</span>
                    )}
                    {option.audioSrc && (
                      <span>🔊 Has audio</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/admin/challenge-options/${option.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/challenge-options/${option.id}/edit`}>
                    <Button variant="secondaryOutline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="dangerOutline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {challengeOptions.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                showTotal={true}
                totalItems={challengeOptions.length}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminChallengeOptionsPage;