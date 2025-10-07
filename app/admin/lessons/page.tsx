"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2, ListChecks } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  unitId: number;
  order: number;
  unit?: {
    title: string;
    course?: {
      title: string;
    };
  };
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await fetch('/api/lessons');
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteLesson = async (id: number) => {
    if (!confirm('Are you sure you want to delete this lesson?')) {
      return;
    }

    try {
      const response = await fetch(`/api/lessons/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLessons(lessons.filter(lesson => lesson.id !== id));
      } else {
        alert('Failed to delete lesson');
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
      alert('Failed to delete lesson');
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Lessons</h1>
          <p className="text-gray-600">Manage individual lessons within units</p>
        </div>
        <Link href="/admin/lessons/new">
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Lesson
          </Button>
        </Link>
      </div>

      {/* Lessons List */}
      {lessons.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <ListChecks className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">No lessons yet</h3>
            <p className="mb-4">Create your first lesson to add learning content.</p>
            <Link href="/admin/lessons/new">
              <Button variant="primary">Add Lesson</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Order {lesson.order}
                    </span>
                    {lesson.unit && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {lesson.unit.title}
                      </span>
                    )}
                    {lesson.unit?.course && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {lesson.unit.course.title}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {lesson.title}
                  </h3>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/admin/lessons/${lesson.id}/edit`}>
                    <Button variant="secondaryOutline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="dangerOutline"
                    size="sm"
                    onClick={() => deleteLesson(lesson.id)}
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