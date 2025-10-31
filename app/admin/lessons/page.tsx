"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { AdminPageHeader } from "@/components/ui/admin-page-header";
import { AdminEmptyState } from "@/components/ui/admin-empty-state";
import { FilterSelector } from "@/components/ui/filter-selector";
import { Plus, Edit, Trash2, ListChecks } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  unitId: number;
  order: number;
  unit?: {
    id: number;
    title: string;
    order: number;
    course?: {
      id: number;
      title: string;
    };
  };
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("all");
  const [selectedUnitId, setSelectedUnitId] = useState<string>("all");
  const itemsPerPage = 10;

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await fetch('/api/lessons');
      const data: Lesson[] = await response.json();

      const sortedLessons = [...data].sort((a, b) => {
        const unitOrderA = a.unit?.order ?? Number.MAX_SAFE_INTEGER;
        const unitOrderB = b.unit?.order ?? Number.MAX_SAFE_INTEGER;

        if (unitOrderA !== unitOrderB) {
          return unitOrderA - unitOrderB;
        }

        if (a.order !== b.order) {
          return a.order - b.order;
        }

        return a.id - b.id;
      });

      setLessons(sortedLessons);
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

  const courseFilters = useMemo(() => {
    const coursesMap = new Map<string, { id: string; name: string }>();

    lessons.forEach((lesson) => {
      const course = lesson.unit?.course;
      if (course && !coursesMap.has(String(course.id))) {
        coursesMap.set(String(course.id), {
          id: String(course.id),
          name: course.title,
        });
      }
    });

    return [
      { id: "all", name: "All Courses" },
      ...Array.from(coursesMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
    ];
  }, [lessons]);

  const unitFilters = useMemo(() => {
    const filteredLessonsByCourse = lessons.filter((lesson) => {
      if (selectedCourseId === "all") {
        return true;
      }
      return lesson.unit?.course?.id === Number(selectedCourseId);
    });

    const unitsMap = new Map<string, { id: string; name: string; order: number }>();

    filteredLessonsByCourse.forEach((lesson) => {
      if (lesson.unit && !unitsMap.has(String(lesson.unit.id))) {
        unitsMap.set(String(lesson.unit.id), {
          id: String(lesson.unit.id),
          name: lesson.unit.title,
          order: lesson.unit.order,
        });
      }
    });

    const unitList = Array.from(unitsMap.values()).sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return a.name.localeCompare(b.name);
    });

    return [
      { id: "all", name: "All Units" },
      ...unitList.map(({ id, name }) => ({ id, name })),
    ];
  }, [lessons, selectedCourseId]);

  useEffect(() => {
    if (selectedUnitId === "all") {
      return;
    }

    const unitExists = unitFilters.some((unit) => unit.id === selectedUnitId);

    if (!unitExists) {
      setSelectedUnitId("all");
    }
  }, [unitFilters, selectedUnitId]);

  const filteredLessons = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return lessons.filter((lesson) => {
      const lessonTitle = lesson.title.toLowerCase();
      const unitTitle = lesson.unit?.title?.toLowerCase() ?? "";
      const courseTitle = lesson.unit?.course?.title?.toLowerCase() ?? "";

      const matchesSearch =
        search.length === 0 ||
        lessonTitle.includes(search) ||
        unitTitle.includes(search) ||
        courseTitle.includes(search);

      const matchesCourse =
        selectedCourseId === "all" ||
        lesson.unit?.course?.id === Number(selectedCourseId);

      const matchesUnit =
        selectedUnitId === "all" ||
        lesson.unitId === Number(selectedUnitId);

      return matchesSearch && matchesCourse && matchesUnit;
    });
  }, [lessons, searchTerm, selectedCourseId, selectedUnitId]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCourseId, selectedUnitId]);

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

      {(courseFilters.length > 1 || unitFilters.length > 1) && (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {courseFilters.length > 1 && (
            <FilterSelector
              filters={courseFilters}
              selectedFilter={selectedCourseId}
              onFilterChange={setSelectedCourseId}
              label="Course"
            />
          )}
          {unitFilters.length > 1 && (
            <FilterSelector
              filters={unitFilters}
              selectedFilter={selectedUnitId}
              onFilterChange={setSelectedUnitId}
              label="Unit"
            />
          )}
        </div>
      )}

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
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
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
