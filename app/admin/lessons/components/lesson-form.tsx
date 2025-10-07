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

interface Unit {
  id: number;
  title: string;
  courseId: number;
  course: Course;
}

interface LessonFormData {
  title: string;
  unitId: number;
  order: number;
}

interface LessonFormProps {
  initialData?: LessonFormData;
  lessonId?: number;
  mode: "create" | "edit";
}

export const LessonForm = ({ initialData, lessonId, mode }: LessonFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const unitIdParam = searchParams.get('unitId');
  
  const [formData, setFormData] = useState<LessonFormData>(
    initialData || {
      title: "",
      unitId: unitIdParam ? parseInt(unitIdParam) : 0,
      order: 1,
    }
  );
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(false);
  const [unitsLoading, setUnitsLoading] = useState(true);

  const fetchUnits = useCallback(async () => {
    try {
      const response = await fetch("/api/units");
      if (response.ok) {
        const data = await response.json();
        setUnits(data);
      }
    } catch (error) {
      console.error("Error fetching units:", error);
    } finally {
      setUnitsLoading(false);
    }
  }, []);

  const fetchNextOrder = useCallback(async () => {
    if (!formData.unitId) return;
    
    try {
      const response = await fetch(`/api/units/${formData.unitId}`);
      if (response.ok) {
        const unitData = await response.json();
        setFormData(prev => ({
          ...prev,
          order: unitData.lessons ? unitData.lessons.length + 1 : 1,
        }));
      }
    } catch (error) {
      console.error("Error fetching unit data:", error);
    }
  }, [formData.unitId]);

  useEffect(() => {
    fetchUnits();
    if (mode === "create" && formData.unitId) {
      fetchNextOrder();
    }
  }, [mode, formData.unitId, fetchUnits, fetchNextOrder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = mode === "create" ? "/api/lessons" : `/api/lessons/${lessonId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const selectedUnit = units.find(u => u.id === formData.unitId);
        const backUrl = unitIdParam 
          ? `/admin/courses/${selectedUnit?.courseId}` 
          : "/admin/lessons";
        router.push(backUrl);
        router.refresh();
      } else {
        alert(`Failed to ${mode} lesson`);
      }
    } catch (error) {
      console.error(`Error ${mode}ing lesson:`, error);
      alert(`Failed to ${mode} lesson`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof LessonFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedUnit = units.find(u => u.id === formData.unitId);
  const backUrl = unitIdParam && selectedUnit 
    ? `/admin/courses/${selectedUnit.courseId}` 
    : "/admin/lessons";

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
            {mode === "create" ? "Add" : "Edit"} Lesson
          </h1>
          <p className="text-gray-600">
            {mode === "create" ? "Create a new" : "Update the"} lesson
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="unitId" className="block text-sm font-medium text-gray-700 mb-2">
                Unit *
              </label>
              <select
                id="unitId"
                required
                disabled={unitsLoading || !!unitIdParam}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
                value={formData.unitId}
                onChange={(e) => handleInputChange("unitId", parseInt(e.target.value))}
              >
                <option value="">Select a unit...</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.course?.title} - {unit.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Title *
              </label>
              <input
                type="text"
                id="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Introduction to EC2 Instances"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
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
                Position of this lesson within the unit
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