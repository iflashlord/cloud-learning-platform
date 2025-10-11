"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { AdminPageHeader } from "@/components/ui/admin-page-header";
import { AdminEmptyState } from "@/components/ui/admin-empty-state";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

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

  // Filter lessons based on search term
  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.unit?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.unit?.course?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
        title="Lessons"
        description="Manage individual lessons within units"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search lessons, units, or courses..."
        addNewHref="/admin/lessons/new"
        addNewLabel="Add Lesson"
        addNewIcon={ListChecks}
      />

      {/* Lessons List */}
      {lessons.length === 0 ? (
        <AdminEmptyState
          icon={ListChecks}
          title="No lessons yet"
          description="Create your first lesson to add learning content."
          action={{
            label: "Add Lesson",
            href: "/admin/lessons/new"
          }}
        />
      ) : filteredLessons.length === 0 ? (
        <AdminEmptyState
          icon={ListChecks}
          title="No lessons found"
          description="Try adjusting your search to find what you're looking for."
        />
      ) : (
        <div className="space-y-4">
          {filteredLessons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((lesson) => (
            <Card key={lesson.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      Order {lesson.order}
                    </span>
                    {lesson.unit && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                        {lesson.unit.title}
                      </span>
                    )}
                    {lesson.unit?.course && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                        {lesson.unit.course.title}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
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

          {filteredLessons.length > itemsPerPage && (
            <div className="mt-6 border-t pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredLessons.length / itemsPerPage)}
                onPageChange={setCurrentPage}
                showTotal={true}
                totalItems={filteredLessons.length}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}