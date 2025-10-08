"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface CourseFormData {
  title: string;
  imageSrc: string;
}

interface CourseFormProps {
  initialData?: CourseFormData;
  courseId?: number;
  mode: "create" | "edit";
}

export const CourseForm = ({ initialData, courseId, mode }: CourseFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<CourseFormData>(
    initialData || {
      title: "",
      imageSrc: "",
    }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = mode === "create" ? "/api/courses" : `/api/courses/${courseId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/courses");
        router.refresh();
      } else {
        alert(`Failed to ${mode} certification`);
      }
    } catch (error) {
      console.error(`Error ${mode}ing course:`, error);
      alert(`Failed to ${mode} certification`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CourseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/admin/courses">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === "create" ? "Add" : "Edit"} Course
          </h1>
          <p className="text-gray-600">
            {mode === "create" ? "Create a new" : "Update the"} course
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Certification Title *
              </label>
              <input
                type="text"
                id="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Cloud Computing Fundamentals"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="imageSrc" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                id="imageSrc"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://example.com/image.svg"
                value={formData.imageSrc}
                onChange={(e) => handleInputChange("imageSrc", e.target.value)}
              />
              {formData.imageSrc && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <div className="w-24 h-24 border rounded-md overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.imageSrc}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Link href="/admin/courses">
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