"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
};

type ChallengeData = {
  question: string;
  type: "SELECT" | "ASSIST";
  lessonId: number;
  order: number;
  hint?: string;
  challengeOptions: ChallengeOption[];
};

interface ChallengeFormProps {
  challengeId?: number;
  initialData?: ChallengeData;
  hideOptions?: boolean; // Hide options section when editing in full page
  preselectedLessonId?: number; // Pre-select lesson when creating from lesson page
}

export const ChallengeForm = ({ challengeId, initialData, hideOptions = false, preselectedLessonId }: ChallengeFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [formData, setFormData] = useState<ChallengeData>({
    question: initialData?.question || "",
    type: initialData?.type || "SELECT",
    lessonId: initialData?.lessonId || preselectedLessonId || 0,
    order: initialData?.order || 1,
    hint: initialData?.hint || "",
    challengeOptions: initialData?.challengeOptions || [
      { text: "", correct: true, guide: "" },
      { text: "", correct: false, guide: "" },
      { text: "", correct: false, guide: "" },
      { text: "", correct: false, guide: "" },
    ],
  });

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

  const handleOptionChange = (index: number, field: keyof ChallengeOption, value: string | boolean) => {
    const newOptions = [...formData.challengeOptions];
    newOptions[index] = { ...newOptions[index], [field]: value };
    
    // If this option is being set as correct, make sure others are false
    if (field === "correct" && value === true) {
      newOptions.forEach((option, i) => {
        if (i !== index) {
          option.correct = false;
        }
      });
    }
    
    setFormData(prev => ({ ...prev, challengeOptions: newOptions }));
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      challengeOptions: [...prev.challengeOptions, { text: "", correct: false, guide: "" }],
    }));
  };

  const removeOption = (index: number) => {
    if (formData.challengeOptions.length > 2) {
      const newOptions = formData.challengeOptions.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, challengeOptions: newOptions }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate that at least one option is correct
      const hasCorrectOption = formData.challengeOptions.some(option => option.correct);
      if (!hasCorrectOption) {
        toast.error("At least one option must be marked as correct");
        return;
      }

      // Validate that all options have text
      const hasEmptyOption = formData.challengeOptions.some(option => !option.text.trim());
      if (hasEmptyOption) {
        toast.error("All options must have text");
        return;
      }

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
        toast.success(challengeId ? "Challenge updated successfully" : "Challenge created successfully");
        router.push("/admin/challenges");
        router.refresh();
      } else {
        const error = await response.text();
        toast.error(error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Challenge form error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/challenges");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Question
          </label>
          <textarea
            id="question"
            value={formData.question}
            onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            required
          />
        </div>

        <div>
          <label htmlFor="hint" className="block text-sm font-medium text-gray-700 mb-2">
            Hint (Optional)
            <span className="text-sm text-gray-500 ml-1">- Helps users when they need guidance</span>
          </label>
          <textarea
            id="hint"
            value={formData.hint}
            onChange={(e) => setFormData(prev => ({ ...prev, hint: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            placeholder="Provide a helpful hint for users..."
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            Challenge Type
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as "SELECT" | "ASSIST" }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="SELECT">Select (Multiple Choice)</option>
            <option value="ASSIST">Assist (Fill in the blank)</option>
          </select>
        </div>

        <div>
          <label htmlFor="lessonId" className="block text-sm font-medium text-gray-700 mb-2">
            Lesson
          </label>
          <select
            id="lessonId"
            value={formData.lessonId}
            onChange={(e) => {
              const lessonId = parseInt(e.target.value);
              setFormData(prev => ({ ...prev, lessonId }));
              // Recalculate order when lesson changes
              if (lessonId && !challengeId) {
                setTimeout(calculateOrder, 100);
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a lesson</option>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.unit.course.title} → {lesson.unit.title} → {lesson.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
            Order
          </label>
          <input
            type="number"
            id="order"
            value={formData.order}
            onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            required
          />
        </div>

        {!hideOptions && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Answer Options
              </label>
              <Button
                type="button"
                onClick={addOption}
                variant="secondaryOutline"
                size="sm"
              >
                Add Option
              </Button>
            </div>
          
          <div className="space-y-4">
            {formData.challengeOptions.map((option, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Option {index + 1}</h4>
                  {formData.challengeOptions.length > 2 && (
                    <Button
                      type="button"
                      onClick={() => removeOption(index)}
                      variant="dangerOutline"
                      size="sm"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3">
                  {/* Correct Answer Toggle */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={option.correct}
                      onChange={(e) => handleOptionChange(index, "correct", e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">This is the correct answer</span>
                  </div>
                  
                  {/* Option Text */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Option Text</label>
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(index, "text", e.target.value)}
                      placeholder="Enter the answer option text..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  {/* Explanation/Guide */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Explanation <span className="text-gray-400">(Optional)</span>
                    </label>
                    <textarea
                      value={option.guide || ""}
                      onChange={(e) => handleOptionChange(index, "guide", e.target.value)}
                      placeholder="Explain why this answer is correct or incorrect..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                    />
                  </div>
                  
                  {/* Media URLs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Image URL <span className="text-gray-400">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        value={option.imageSrc || ""}
                        onChange={(e) => handleOptionChange(index, "imageSrc", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Audio URL <span className="text-gray-400">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        value={option.audioSrc || ""}
                        onChange={(e) => handleOptionChange(index, "audioSrc", e.target.value)}
                        placeholder="https://example.com/audio.mp3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        )}

        <div className="flex space-x-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : challengeId ? "Update Challenge" : "Create Challenge"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};