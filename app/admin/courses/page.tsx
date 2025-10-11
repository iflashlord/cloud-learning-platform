"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { AdminPageHeader } from "@/components/ui/admin-page-header";
import { AdminEmptyState } from "@/components/ui/admin-empty-state";
import { AdminCard } from "@/components/ui/admin-card";
import { Plus, Edit, Trash2, Eye, GraduationCap } from "lucide-react";
import Image from "next/image";

interface Course {
  id: number;
  title: string;
  imageSrc: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id: number) => {
    if (!confirm('Are you sure you want to delete this course? This will also delete all units, lessons, and questions associated with it.')) {
      return;
    }

    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCourses(courses.filter(course => course.id !== id));
        alert('Course deleted successfully');
      } else {
        alert('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    }
  };

  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
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
        title="Courses"
        description="Manage courses and learning content"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search courses..."
        addNewHref="/admin/courses/new"
        addNewLabel="Add Course"
        addNewIcon={Plus}
      />

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <AdminEmptyState
          icon={GraduationCap}
          title="No courses yet"
          description="Get started by creating your first course."
          action={{
            label: "Add Course",
            href: "/admin/courses/new"
          }}
        />
      ) : filteredCourses.length === 0 ? (
        <AdminEmptyState
          icon={GraduationCap}
          title="No courses found"
          description="Try adjusting your search to find what you're looking for."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((course) => (
              <AdminCard
                key={course.id}
                title={course.title}
                image={course.imageSrc}
                imageAlt={course.title}
                actions={[
                  {
                    label: "View",
                    href: `/admin/courses/${course.id}`,
                    variant: "primary"
                  },
                  {
                    label: "Edit", 
                    href: `/admin/courses/${course.id}/edit`,
                    variant: "secondary"
                  },
                  {
                    label: "Delete",
                    onClick: () => deleteCourse(course.id),
                    variant: "danger"
                  }
                ]}
              />
            ))}
          </div>

          {filteredCourses.length > itemsPerPage && (
            <div className="mt-8 border-t pt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredCourses.length / itemsPerPage)}
                onPageChange={setCurrentPage}
                showTotal={true}
                totalItems={filteredCourses.length}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
