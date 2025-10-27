"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Sparkles, Lightbulb, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

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
  const [showAiDescription, setShowAiDescription] = useState(false);
  const [aiDescriptionPrompt, setAiDescriptionPrompt] = useState("");
  const [aiDescriptionGenerating, setAiDescriptionGenerating] = useState(false);
  const [aiDescriptionSuggestion, setAiDescriptionSuggestion] = useState<null | {
    description: string;
    bulletPoints: string[];
  }>(null);
  const [aiPromptSeeded, setAiPromptSeeded] = useState(false);

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

  const selectedCourse = courses.find(course => course.id === formData.courseId);
  const hasTitleContext = Boolean(formData.title.trim());

  useEffect(() => {
    if (!aiPromptSeeded && hasTitleContext) {
      setAiDescriptionPrompt(
        `Describe the unit "${formData.title}" so students know why it matters and what core AWS skills it covers.`,
      );
      setAiPromptSeeded(true);
    }
  }, [hasTitleContext, formData.title, aiPromptSeeded]);

  const handleGenerateDescription = async () => {
    if (!hasTitleContext) {
      toast.info("Add a unit title before using Prompt AI.");
      return;
    }

    setAiDescriptionGenerating(true);
    setAiDescriptionSuggestion(null);
    try {
      const response = await fetch("/api/ai/unit-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiDescriptionPrompt,
          unitTitle: formData.title,
          courseTitle: selectedCourse?.title,
          mode,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate description");
      }

      const data = await response.json();
      setAiDescriptionSuggestion(data.suggestion);
      toast.success("Prompt AI drafted a description.");
    } catch (error) {
      console.error("AI description failed:", error);
      toast.error("Unable to generate description right now.");
    } finally {
      setAiDescriptionGenerating(false);
    }
  };

  const applyAiDescription = () => {
    if (!aiDescriptionSuggestion) return;
    setFormData(prev => ({ ...prev, description: aiDescriptionSuggestion.description }));
    toast.success("Description applied.");
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

            <div className="space-y-4">
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

              <div className="rounded-lg border border-amber-200 bg-amber-50">
                <button
                  type="button"
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold ${
                    hasTitleContext ? "text-amber-900" : "text-amber-400 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (!hasTitleContext) {
                      toast.info("Enter a unit title to unlock Prompt AI.");
                      return;
                    }
                    setShowAiDescription(prev => !prev);
                  }}
                  disabled={!hasTitleContext}
                >
                  <span className="inline-flex items-center gap-2">
                    {showAiDescription ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    Prompt AI Description
                  </span>
                  <span className={`text-xs ${hasTitleContext ? "text-amber-800" : "text-amber-400"}`}>
                    {hasTitleContext ? "Use unit context" : "Add title first"}
                  </span>
                </button>
                {showAiDescription && hasTitleContext && (
                  <div className="border-t border-amber-100 p-4 space-y-4">
                    <div className="flex flex-col gap-1 text-sm text-amber-900 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <div>
                          <p className="font-semibold">Generate a persuasive description</p>
                          <p className="text-amber-800">
                            AI will highlight outcomes, prerequisites, and AWS tie-ins for this unit.
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-amber-800">
                        Context: {selectedCourse ? `${selectedCourse.title} › ${formData.title}` : formData.title}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-amber-900">Prompt</label>
                      <textarea
                        rows={3}
                        className="w-full rounded-md border border-amber-200 bg-white/80 p-3 text-sm text-gray-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                        value={aiDescriptionPrompt}
                        onChange={(e) => {
                          setAiDescriptionPrompt(e.target.value);
                          setAiPromptSeeded(true);
                        }}
                        placeholder='Ex: "Explain how this unit prepares students for real AWS networking scenarios."'
                        disabled={aiDescriptionGenerating}
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        type="button"
                        onClick={handleGenerateDescription}
                        disabled={aiDescriptionGenerating}
                        className="bg-amber-500 hover:bg-amber-500/90 text-white"
                      >
                        {aiDescriptionGenerating ? "Generating..." : "Generate description"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={applyAiDescription}
                        disabled={!aiDescriptionSuggestion}
                      >
                        Use suggestion
                      </Button>
                    </div>

                    {aiDescriptionSuggestion && (
                      <div className="rounded-lg border border-white bg-white p-4 text-sm text-gray-900 space-y-3">
                        <div className="flex gap-2">
                          <Lightbulb className="h-4 w-4 text-amber-400" />
                          <p className="font-semibold">Suggested description</p>
                        </div>
                        <p className="text-gray-700">{aiDescriptionSuggestion.description}</p>
                        {aiDescriptionSuggestion.bulletPoints.length > 0 && (
                          <div>
                            <p className="font-semibold">Key talking points</p>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                              {aiDescriptionSuggestion.bulletPoints.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
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
