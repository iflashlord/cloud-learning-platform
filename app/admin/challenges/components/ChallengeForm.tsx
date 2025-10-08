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
  order?: number;
  value?: string;
};

type ChallengeData = {
  question: string;
  type: "SELECT" | "ASSIST" | "TRUE_FALSE" | "DRAG_DROP" | "TEXT_INPUT" | "IMAGE_SELECT" | "LISTENING" | "SPEECH_INPUT";
  lessonId: number;
  order: number;
  hint?: string;
  audioSrc?: string;
  imageSrc?: string;
  correctAnswer?: string;
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
    audioSrc: initialData?.audioSrc || "",
    imageSrc: initialData?.imageSrc || "",
    correctAnswer: initialData?.correctAnswer || "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Type-specific validation
      if (formData.type === "TEXT_INPUT" || formData.type === "SPEECH_INPUT") {
        if (!formData.correctAnswer?.trim()) {
          toast.error("Text input questions must have a correct answer");
          return;
        }
      } else {
        // For all other types that use options
        
        // Validate that at least one option is correct (except DRAG_DROP which uses order)
        if (formData.type !== "DRAG_DROP") {
          const hasCorrectOption = formData.challengeOptions.some(option => option.correct);
          if (!hasCorrectOption) {
            toast.error("At least one option must be marked as correct");
            return;
          }
        }

        // Validate that all options have text
        const hasEmptyOption = formData.challengeOptions.some(option => !option.text.trim());
        if (hasEmptyOption) {
          toast.error("All options must have text");
          return;
        }

        // Validate IMAGE_SELECT has images for all options
        if (formData.type === "IMAGE_SELECT") {
          const hasEmptyImage = formData.challengeOptions.some(option => !option.imageSrc?.trim());
          if (hasEmptyImage) {
            toast.error("Image selection questions require all options to have images");
            return;
          }
        }

        // Validate DRAG_DROP has unique order values
        if (formData.type === "DRAG_DROP") {
          const orders = formData.challengeOptions.map(option => option.order || 0);
          const uniqueOrders = new Set(orders);
          if (orders.length !== uniqueOrders.size || orders.some(o => o < 1 || o > orders.length)) {
            toast.error("Drag & drop questions must have unique order values from 1 to " + orders.length);
            return;
          }
        }
      }

      // Validate LISTENING type has audio
      if (formData.type === "LISTENING" && !formData.audioSrc?.trim()) {
        toast.error("Listening questions must have an audio source");
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
            onChange={(e) => {
              const newType = e.target.value as ChallengeData['type'];
              setFormData(prev => ({ 
                ...prev, 
                type: newType,
                // Reset challenge options based on type
                challengeOptions: newType === 'TRUE_FALSE' 
                  ? [
                      { text: "True", correct: true, guide: "" },
                      { text: "False", correct: false, guide: "" }
                    ]
                  : (newType === 'TEXT_INPUT' || newType === 'SPEECH_INPUT')
                  ? []
                  : prev.challengeOptions
              }));
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="SELECT">📝 Multiple Choice - Students pick from several options</option>
            <option value="ASSIST">✏️ Fill in the Blank - Students complete a sentence</option>
            <option value="TRUE_FALSE">✅ True/False - Students choose true or false</option>
            <option value="DRAG_DROP">🔄 Drag & Drop - Students arrange items in order</option>
            <option value="TEXT_INPUT">⌨️ Text Input - Students type their answer</option>
            <option value="IMAGE_SELECT">🖼️ Image Selection - Students choose from images</option>
            <option value="LISTENING">🎵 Listening - Students listen to audio and answer</option>
            <option value="SPEECH_INPUT">🎤 Speech Input - Students answer using voice recognition</option>
          </select>
          
          {/* Type-specific descriptions */}
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              {formData.type === "SELECT" && (
                <>
                  <strong>Multiple Choice:</strong> Students will see your question and select one correct answer from multiple options. 
                  Mark one option as correct. Great for testing knowledge and concepts.
                </>
              )}
              {formData.type === "ASSIST" && (
                <>
                  <strong>Fill in the Blank:</strong> Students complete a sentence by choosing the right word/phrase. 
                  Use &quot;__&quot; in your question where the blank should appear. Perfect for vocabulary and key terms.
                </>
              )}
              {formData.type === "TRUE_FALSE" && (
                <>
                  <strong>True/False:</strong> Students determine if a statement is true or false. 
                  Mark the correct answer. Ideal for testing facts and understanding of concepts.
                </>
              )}
              {formData.type === "DRAG_DROP" && (
                <>
                  <strong>Drag & Drop:</strong> Students arrange items in the correct order by dragging and dropping. 
                  Set the correct order position for each item (1, 2, 3, etc.). Great for sequences and procedures.
                </>
              )}
              {(formData.type === "TEXT_INPUT" || formData.type === "SPEECH_INPUT") && (
                <>
                  <strong>Text Input:</strong> Students type their answer in a text field. 
                  Set the correct answer below. Perfect for names, definitions, and short answers.
                </>
              )}
              {formData.type === "IMAGE_SELECT" && (
                <>
                  <strong>Image Selection:</strong> Students choose the correct image from multiple visual options. 
                  Each option needs an image URL. Excellent for visual recognition and identification.
                </>
              )}
              {formData.type === "LISTENING" && (
                <>
                  <strong>Listening:</strong> Students listen to audio and answer questions about what they heard. 
                  Requires an audio file URL. Perfect for pronunciation, comprehension, and audio content.
                </>
              )}
              {formData.type === "SPEECH_INPUT" && (
                <>
                  <strong>Speech Input:</strong> Students speak their answer using voice recognition technology. 
                  Their speech is transcribed to text and compared with the correct answer. Ideal for pronunciation practice and oral responses.
                </>
              )}
            </p>
          </div>
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

        {/* Conditional fields based on challenge type */}
        {(formData.type === "LISTENING" || formData.type === "IMAGE_SELECT") && (
          <div>
            <label htmlFor="imageSrc" className="block text-sm font-medium text-gray-700 mb-2">
              {formData.type === "IMAGE_SELECT" ? "Question Image URL" : "Image URL (Optional)"}
            </label>
            <input
              type="url"
              id="imageSrc"
              value={formData.imageSrc}
              onChange={(e) => setFormData(prev => ({ ...prev, imageSrc: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        )}

        {formData.type === "LISTENING" && (
          <div>
            <label htmlFor="audioSrc" className="block text-sm font-medium text-gray-700 mb-2">
              Audio URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="audioSrc"
              value={formData.audioSrc}
              onChange={(e) => setFormData(prev => ({ ...prev, audioSrc: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/audio.mp3"
              required={formData.type === "LISTENING"}
            />
          </div>
        )}

        {(formData.type === "TEXT_INPUT" || formData.type === "SPEECH_INPUT") && (
          <div>
            <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-700 mb-2">
              Correct Answer <span className="text-red-500">*</span>
              <span className="text-sm text-gray-500 ml-1">- Expected user input (case-insensitive)</span>
            </label>
            <input
              type="text"
              id="correctAnswer"
              value={formData.correctAnswer}
              onChange={(e) => setFormData(prev => ({ ...prev, correctAnswer: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the expected answer"
              required={formData.type === "TEXT_INPUT" || formData.type === "SPEECH_INPUT"}
            />
          </div>
        )}

        {!hideOptions && formData.type !== "TEXT_INPUT" && formData.type !== "SPEECH_INPUT" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Answer Options
                {formData.type === "DRAG_DROP" && (
                  <span className="text-sm text-gray-500 ml-1">- Items will be shuffled for drag & drop</span>
                )}
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
                  {/* Correct Answer Toggle - Hide for DRAG_DROP as correctness is determined by order */}
                  {formData.type !== "DRAG_DROP" && (
                    <div className="flex items-center">
                      <input
                        type={formData.type === "TRUE_FALSE" ? "radio" : "radio"}
                        name="correctOption"
                        checked={option.correct}
                        onChange={(e) => handleOptionChange(index, "correct", e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-600">This is the correct answer</span>
                    </div>
                  )}

                  {/* Order field for DRAG_DROP */}
                  {formData.type === "DRAG_DROP" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Correct Order Position
                      </label>
                      <input
                        type="number"
                        value={option.order || index + 1}
                        onChange={(e) => handleOptionChange(index, "order", parseInt(e.target.value))}
                        min="1"
                        max={formData.challengeOptions.length}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  )}
                  
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
                        Image URL {formData.type === "IMAGE_SELECT" ? <span className="text-red-500">*</span> : <span className="text-gray-400">(Optional)</span>}
                      </label>
                      <input
                        type="url"
                        value={option.imageSrc || ""}
                        onChange={(e) => handleOptionChange(index, "imageSrc", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required={formData.type === "IMAGE_SELECT"}
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