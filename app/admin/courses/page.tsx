"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { AdminPageHeader } from "@/components/ui/admin-page-header";
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
    if (!confirm('Are you sure you want to delete this certification? This will also delete all units, lessons, and questions associated with it.')) {
      return;
    }

    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCourses(courses.filter(course => course.id !== id));
        alert('Certification deleted successfully');
      } else {
        alert('Failed to delete certification');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete certification');
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
        searchPlaceholder="Search certifications..."
        addNewHref="/admin/courses/new"
        addNewLabel="Add Certification"
        addNewIcon={Plus}
      />

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">No certifications yet</h3>
            <p className="mb-4">Get started by creating your first course.</p>
            <Link href="/admin/courses/new">
              <Button variant="primary">Add Certification</Button>
            </Link>
          </div>
        </Card>
      ) : filteredCourses.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">No certifications found</h3>
            <p className="mb-4">Try adjusting your search to find what you&apos;re looking for.</p>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video relative bg-gray-100">
                  <Image
                    src={course.imageSrc}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    {course.title}
                  </h3>
                  <div className="flex space-x-2">
                    <Link href={`/admin/courses/${course.id}`} className="flex-1">
                      <Button variant="primaryOutline" className="w-full" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/admin/courses/${course.id}/edit`}>
                      <Button variant="secondaryOutline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="dangerOutline"
                      size="sm"
                      onClick={() => deleteCourse(course.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
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
