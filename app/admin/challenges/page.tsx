"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { AdminPageHeader } from "@/components/ui/admin-page-header";
import { Plus, Edit, Trash2, FileQuestion } from "lucide-react";

interface Challenge {
  id: number;
  question: string;
  type: "SELECT" | "ASSIST" | "TRUE_FALSE" | "DRAG_DROP" | "TEXT_INPUT" | "IMAGE_SELECT" | "LISTENING";
  lessonId: number;
  order: number;
  lesson?: {
    title: string;
    unit?: {
      title: string;
      course?: {
        title: string;
      };
    };
  };
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | Challenge['type']>("all");
  const itemsPerPage = 10;

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await fetch('/api/challenges');
      const data = await response.json();
      setChallenges(data);
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteChallenge = async (id: number) => {
    if (!confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      const response = await fetch(`/api/challenges/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setChallenges(challenges.filter(challenge => challenge.id !== id));
      } else {
        alert('Failed to delete question');
      }
    } catch (error) {
      console.error('Error deleting challenge:', error);
      alert('Failed to delete question');
    }
  };

  const getTypeColor = (type: Challenge['type']) => {
    const colors = {
      SELECT: "bg-purple-100 text-purple-800",
      ASSIST: "bg-orange-100 text-orange-800",
      TRUE_FALSE: "bg-blue-100 text-blue-800",
      DRAG_DROP: "bg-green-100 text-green-800",
      TEXT_INPUT: "bg-yellow-100 text-yellow-800",
      IMAGE_SELECT: "bg-pink-100 text-pink-800",
      LISTENING: "bg-indigo-100 text-indigo-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  // Filter and search challenges
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.lesson?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.lesson?.unit?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.lesson?.unit?.course?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || challenge.type === filter;
    return matchesSearch && matchesFilter;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  const filterOptions = [
    { value: "all", label: "All Types", count: challenges.length },
    { value: "SELECT", label: "Multiple Choice", count: challenges.filter(c => c.type === "SELECT").length },
    { value: "ASSIST", label: "Fill in Blank", count: challenges.filter(c => c.type === "ASSIST").length },
    { value: "TRUE_FALSE", label: "True/False", count: challenges.filter(c => c.type === "TRUE_FALSE").length },
    { value: "DRAG_DROP", label: "Drag & Drop", count: challenges.filter(c => c.type === "DRAG_DROP").length },
    { value: "TEXT_INPUT", label: "Text Input", count: challenges.filter(c => c.type === "TEXT_INPUT").length },
    { value: "IMAGE_SELECT", label: "Image Selection", count: challenges.filter(c => c.type === "IMAGE_SELECT").length },
    { value: "LISTENING", label: "Listening", count: challenges.filter(c => c.type === "LISTENING").length },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Questions"
        description="Manage quiz questions and challenges"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search questions, lessons, or courses..."
        filterOptions={filterOptions}
        activeFilter={filter}
        onFilterChange={(value) => setFilter(value as "all" | "SELECT" | "ASSIST")}
        addNewHref="/admin/challenges/new"
        addNewLabel="Add Question"
        addNewIcon={FileQuestion}
      />

      {/* Challenges List */}
      {challenges.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FileQuestion className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">No questions yet</h3>
            <p className="mb-4">Create your first quiz question to engage learners.</p>
            <Link href="/admin/challenges/new">
              <Button variant="primary">Add Question</Button>
            </Link>
          </div>
        </Card>
      ) : filteredChallenges.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FileQuestion className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">No questions found</h3>
            <p className="mb-4">Try adjusting your search or filter to find what you&apos;re looking for.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredChallenges.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((challenge) => (
            <Card key={challenge.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Order {challenge.order}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(challenge.type)}`}>
                      {challenge.type}
                    </span>
                    {challenge.lesson && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {challenge.lesson.title}
                      </span>
                    )}
                    {challenge.lesson?.unit?.course && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {challenge.lesson.unit.course.title}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {challenge.question}
                  </h3>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/admin/challenges/${challenge.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteChallenge(challenge.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {filteredChallenges.length > itemsPerPage && (
            <div className="mt-6 border-t pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredChallenges.length / itemsPerPage)}
                onPageChange={setCurrentPage}
                showTotal={true}
                totalItems={filteredChallenges.length}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}