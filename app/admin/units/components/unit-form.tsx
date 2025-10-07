"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
}

interface UnitFormData {
  title: string;
  description: string;
  courseId: number;
  order: number;
}

interface UnitFormProps {
  initialData?: UnitFormData;
  unitId?: number;
  mode: "create" | "edit";
}

export const UnitForm = ({ initialData, unitId, mode }: UnitFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseIdParam = searchParams.get('courseId');
  
  const [formData, setFormData] = useState<UnitFormData>(
    initialData || {
      title: "",
      description: "",
      courseId: courseIdParam ? parseInt(courseIdParam) : 0,
      order: 1,
    }
  );
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setCoursesLoading(false);
    }
  };

  const fetchNextOrder = useCallback(async () => {
    if (!formData.courseId) return;
    
    try {
      const response = await fetch(`/api/courses/${formData.courseId}`);
      if (response.ok) {
        const courseData = await response.json();
        setFormData(prev => ({
          ...prev,
          order: courseData.units ? courseData.units.length + 1 : 1,
        }));
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  }, [formData.courseId]);

  useEffect(() => {
    fetchCourses();
    if (mode === "create" && !courseIdParam) {
      fetchNextOrder();
    }
  }, [mode, courseIdParam, fetchNextOrder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = mode === "create" ? "/api/units" : `/api/units/${unitId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const backUrl = courseIdParam ? `/admin/courses/${courseIdParam}` : "/admin/units";
        router.push(backUrl);
        router.refresh();
      } else {
        alert(`Failed to ${mode} unit`);
      }
    } catch (error) {
      console.error(`Error ${mode}ing unit:`, error);
      alert(`Failed to ${mode} unit`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UnitFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === "courseId" && mode === "create") {
      fetchNextOrder();
    }
  };

  const backUrl = courseIdParam ? `/admin/courses/${courseIdParam}` : "/admin/units";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href={backUrl}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === "create" ? "Add" : "Edit"} Unit
          </h1>
          <p className="text-gray-600">
            {mode === "create" ? "Create a new" : "Update the"} course unit
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Unit Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-2">
                Course *
              </label>
              <select
                id="courseId"
                required
                disabled={coursesLoading || !!courseIdParam}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
                value={formData.courseId}
                onChange={(e) => handleInputChange("courseId", parseInt(e.target.value))}
              >
                <option value="">Select a course...</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Unit Title *
              </label>
              <input
                type="text"
                id="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Cloud Computing Basics"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Describe what students will learn in this unit..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
                Order *
              </label>
              <input
                type="number"
                id="order"
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.order}
                onChange={(e) => handleInputChange("order", parseInt(e.target.value))}
              />
              <p className="mt-1 text-sm text-gray-500">
                Position of this unit within the course
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <Link href={backUrl}>
                <Button variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" variant="primary" disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : mode === "create" ? "Create" : "Update"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};