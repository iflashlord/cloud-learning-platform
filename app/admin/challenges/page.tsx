"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2, FileQuestion } from "lucide-react";

interface Challenge {
  id: number;
  question: string;
  type: "SELECT" | "ASSIST";
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

  const getTypeColor = (type: "SELECT" | "ASSIST") => {
    return type === "SELECT" 
      ? "bg-purple-100 text-purple-800" 
      : "bg-orange-100 text-orange-800";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Questions</h1>
          <p className="text-gray-600">Manage quiz questions and challenges</p>
        </div>
        <Link href="/admin/challenges/new">
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </Link>
      </div>

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
      ) : (
        <div className="space-y-4">
          {challenges.map((challenge) => (
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
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}