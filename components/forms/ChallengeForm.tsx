"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Import form components
import { LessonSelector } from "./LessonSelector";
import { TypeSelector } from "./TypeSelector";
import { BasicFormFields } from "./BasicFormFields";
import { OptionsEditor } from "./OptionsEditor";

type Lesson = {
  id: number;
  title: string;
  unit: {
    id: number;
    title: string;
    course: {
      id: number;
      title: string;
    };
  };
};

type ChallengeOption = {
  id?: number;
  text: string;
  correct: boolean;
  imageSrc?: string;
  audioSrc?: string;
  guide?: string;
  order?: number;
  value?: string;
};

type ChallengeData = {
  question: string;
  type: "SELECT" | "ASSIST" | "TRUE_FALSE" | "DRAG_DROP" | "TEXT_INPUT" | "IMAGE_SELECT" | "LISTENING" | "SPEECH_INPUT" | "VIDEO";
  lessonId: number;
  order: number;
  hint?: string;
  audioSrc?: string;
  imageSrc?: string;
  videoSrc?: string;
  correctAnswer?: string;
  challengeOptions: ChallengeOption[];
};

interface ChallengeFormProps {
  challengeId?: number;
  initialData?: ChallengeData;
  hideOptions?: boolean;
  preselectedLessonId?: number;
}

export const ChallengeForm = ({ 
  challengeId, 
  initialData, 
  hideOptions = false, 
  preselectedLessonId 
}: ChallengeFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  
  const [formData, setFormData] = useState<ChallengeData>({
    question: initialData?.question || "",
    type: initialData?.type || "SELECT",
    lessonId: initialData?.lessonId || preselectedLessonId || 0,
    order: initialData?.order || 1,
    hint: initialData?.hint || "",
    audioSrc: initialData?.audioSrc || "",
    videoSrc: initialData?.videoSrc || "",
    imageSrc: initialData?.imageSrc || "",
    correctAnswer: initialData?.correctAnswer || "",
    challengeOptions: initialData?.challengeOptions || [
      { text: "", correct: true, guide: "" },
      { text: "", correct: false, guide: "" },
      { text: "", correct: false, guide: "" },
      { text: "", correct: false, guide: "" },
    ],
  });

  // Fetch lessons
  const fetchLessons = async () => {
    try {
      const response = await fetch("/api/lessons");
      if (response.ok) {
        const data = await response.json();
        setLessons(data);
      }
    } catch (error) {
      console.error("Failed to fetch lessons:", error);
    }
  };

  // Calculate order for new challenges
  const calculateOrder = useCallback(async () => {
    if (formData.lessonId) {
      try {
        const response = await fetch(`/api/challenges?lessonId=${formData.lessonId}`);
        if (response.ok) {
          const challenges = await response.json();
          const nextOrder = challenges.length + 1;
          setFormData(prev => ({ ...prev, order: nextOrder }));
        }
      } catch (error) {
        console.error("Failed to calculate order:", error);
      }
    }
  }, [formData.lessonId]);

  useEffect(() => {
    fetchLessons();
  }, []);

  useEffect(() => {
    if (!initialData && lessons.length > 0 && formData.lessonId) {
      calculateOrder();
    }
  }, [lessons.length, formData.lessonId, initialData, calculateOrder]);

  // Update form data
  const updateFormField = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateLessonId = (lessonId: number) => {
    setFormData(prev => ({ ...prev, lessonId }));
  };

  const updateType = (type: ChallengeData["type"]) => {
    // Reset options based on new type
    let newOptions = formData.challengeOptions;
    
    if (type === "TRUE_FALSE") {
      newOptions = [
        { text: "True", correct: false, guide: "" },
        { text: "False", correct: false, guide: "" },
      ];
    } else if (type === "DRAG_DROP") {
      newOptions = formData.challengeOptions.map((option, index) => ({
        ...option,
        order: index + 1,
        correct: false,
      }));
    }
    
    setFormData(prev => ({ ...prev, type, challengeOptions: newOptions }));
  };

  // Handle options
  const handleOptionChange = (index: number, field: keyof ChallengeOption, value: string | boolean | number) => {
    const newOptions = [...formData.challengeOptions];
    newOptions[index] = { ...newOptions[index], [field]: value };
    
    // If this option is being set as correct, make sure others are false (except for drag-drop)
    if (field === "correct" && value === true && formData.type !== "DRAG_DROP") {
      newOptions.forEach((option, i) => {
        if (i !== index) {
          option.correct = false;
        }
      });
    }
    
    setFormData(prev => ({ ...prev, challengeOptions: newOptions }));
  };

  const addOption = () => {
    const newOption: ChallengeOption = {
      text: "",
      correct: false,
      guide: "",
      ...(formData.type === "DRAG_DROP" && { order: formData.challengeOptions.length + 1 }),
      ...(formData.type === "IMAGE_SELECT" && { imageSrc: "" }),
    };
    
    setFormData(prev => ({
      ...prev,
      challengeOptions: [...prev.challengeOptions, newOption],
    }));
  };

  const removeOption = (index: number) => {
    if (formData.challengeOptions.length > 2) {
      const newOptions = formData.challengeOptions.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, challengeOptions: newOptions }));
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = challengeId ? `/api/challenges/${challengeId}` : "/api/challenges";
      const method = challengeId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(challengeId ? "Challenge updated successfully!" : "Challenge created successfully!");
        router.push(`/admin/lessons/${formData.lessonId}`);
      } else {
        const error = await response.text();
        toast.error(error || "Failed to save challenge");
      }
    } catch (error) {
      console.error("Error saving challenge:", error);
      toast.error("An error occurred while saving the challenge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {challengeId ? "Edit Challenge" : "Create New Challenge"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Lesson Selection */}
          <LessonSelector
            lessons={lessons}
            selectedLessonId={formData.lessonId}
            onChange={updateLessonId}
            disabled={loading}
            preselectedLessonId={preselectedLessonId}
          />

          {/* Challenge Type */}
          <TypeSelector
            selectedType={formData.type}
            onChange={updateType}
            disabled={loading}
          />

          {/* Basic Form Fields */}
          <BasicFormFields
            formData={formData}
            challengeType={formData.type}
            onChange={updateFormField}
            disabled={loading}
          />

          {/* Options Editor */}
          {!hideOptions && (
            <OptionsEditor
              options={formData.challengeOptions}
              challengeType={formData.type}
              onChange={handleOptionChange}
              onAdd={addOption}
              onRemove={removeOption}
              disabled={loading}
            />
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.question.trim() || !formData.lessonId}
              className="min-w-[120px]"
            >
              {loading ? "Saving..." : challengeId ? "Update Challenge" : "Create Challenge"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};