"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { AdminPageHeader } from "@/components/ui/admin-page-header";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "correct" | "incorrect">("all");
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

  // Filter and search challenge options
  const filteredOptions = challengeOptions.filter(option => {
    const matchesSearch = option.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         option.challenge.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         option.challenge.lesson?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === "all" || 
      (filter === "correct" && option.correct) || 
      (filter === "incorrect" && !option.correct);
    return matchesSearch && matchesFilter;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  const totalPages = Math.ceil(filteredOptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOptions = filteredOptions.slice(startIndex, endIndex);

  const filterOptions = [
    { value: "all", label: "All Options", count: challengeOptions.length },
    { value: "correct", label: "Correct", count: challengeOptions.filter(o => o.correct).length },
    { value: "incorrect", label: "Incorrect", count: challengeOptions.filter(o => !o.correct).length },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">Loading challenge options...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Challenge Options"
        description="Manage answer options for challenges"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search options or questions..."
        filterOptions={filterOptions}
        activeFilter={filter}
        onFilterChange={(value) => setFilter(value as "all" | "correct" | "incorrect")}
        addNewHref="/admin/challenge-options/new"
        addNewLabel="Add Option"
        addNewIcon={Plus}
      />

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
      ) : filteredOptions.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">No options found</h3>
            <p className="mb-4">Try adjusting your search or filter to find what you&apos;re looking for.</p>
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

          {filteredOptions.length > itemsPerPage && (
            <div className="mt-6 border-t pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                showTotal={true}
                totalItems={filteredOptions.length}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminChallengeOptionsPage;