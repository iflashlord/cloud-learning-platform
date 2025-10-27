"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, Lightbulb, ChevronDown, ChevronRight } from "lucide-react";

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

type AIDifficulty = "Beginner" | "Intermediate" | "Advanced";

type AISuggestion = {
  question: string;
  hint: string;
  explanation: string;
  writingTips: string[];
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
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiPromptSeeded, setAiPromptSeeded] = useState(false);
  const [aiDifficulty, setAiDifficulty] = useState<AIDifficulty>("Intermediate");
  const [aiSuggestion, setAiSuggestion] = useState<AISuggestion | null>(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiAnswersSuggestion, setAiAnswersSuggestion] = useState<ChallengeOption[] | null>(null);
  const [aiAnswersGenerating, setAiAnswersGenerating] = useState(false);
  const [aiAnswerCount, setAiAnswerCount] = useState(4);
  const [showAiBuilder, setShowAiBuilder] = useState(false);
  const [showAiAnswers, setShowAiAnswers] = useState(false);
  const hasQuestionContext = Boolean(formData.question.trim());

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

  const selectedLesson = lessons.find((lesson) => lesson.id === formData.lessonId);

  useEffect(() => {
    if (!aiPromptSeeded && selectedLesson) {
      setAiPrompt(`Create a ${formData.type.replace("_", " ").toLowerCase()} question about ${selectedLesson.title}`);
      setAiPromptSeeded(true);
    }
  }, [selectedLesson, formData.type, aiPromptSeeded]);

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

  const handleGenerateSuggestion = async () => {
    setAiGenerating(true);
    setAiSuggestion(null);

    try {
      const response = await fetch("/api/ai/challenge-builder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          challengeType: formData.type,
          difficulty: aiDifficulty,
          lesson: selectedLesson
            ? {
                title: selectedLesson.title,
                unitTitle: selectedLesson.unit.title,
                courseTitle: selectedLesson.unit.course.title,
              }
            : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate suggestion");
      }

      const data = await response.json();
      setAiSuggestion(data.suggestion);
      toast.success("Prompt AI drafted a question for you.");
    } catch (error) {
      console.error("AI prompt failed:", error);
      toast.error("Unable to generate a suggestion right now.");
    } finally {
      setAiGenerating(false);
    }
  };

  const applyAiSuggestion = () => {
    if (!aiSuggestion) return;

    setFormData((prev) => ({
      ...prev,
      question: aiSuggestion.question,
      hint: aiSuggestion.hint,
      challengeOptions: aiSuggestion.challengeOptions.map((option, index) => ({
        ...option,
        order: prev.type === "DRAG_DROP" ? option.order || index + 1 : option.order,
      })),
    }));
    toast.success("AI suggestion applied to the form.");
  };

  const handleGenerateAnswerSuggestion = async () => {
    if (!formData.question.trim()) {
      toast.error("Enter the question prompt before generating answers.");
      return;
    }

    setAiAnswersGenerating(true);
    setAiAnswersSuggestion(null);

    try {
      const payload: Record<string, unknown> = {
        prompt: aiPrompt,
        challengeType: formData.type,
        difficulty: aiDifficulty,
        lesson: selectedLesson
          ? {
              title: selectedLesson.title,
              unitTitle: selectedLesson.unit.title,
              courseTitle: selectedLesson.unit.course.title,
            }
          : undefined,
        mode: "answers",
        questionContext: {
          question: formData.question,
          hint: formData.hint,
        },
      }

      if (!["TRUE_FALSE", "DRAG_DROP"].includes(formData.type)) {
        payload.answerCount = aiAnswerCount
      }

      const response = await fetch("/api/ai/challenge-builder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to generate answers");
      }

      const data = await response.json();
      setAiAnswersSuggestion(data.suggestion.challengeOptions);
      toast.success("Answer ideas drafted from the question context.");
    } catch (error) {
      console.error("AI answers prompt failed:", error);
      toast.error("Unable to generate answers right now.");
    } finally {
      setAiAnswersGenerating(false);
    }
  };

  const applyAiAnswersSuggestion = () => {
    if (!aiAnswersSuggestion || aiAnswersSuggestion.length === 0) return;

    setFormData((prev) => ({
      ...prev,
      challengeOptions: aiAnswersSuggestion.map((option, index) => ({
        ...option,
        order: prev.type === "DRAG_DROP" ? option.order || index + 1 : option.order,
      })),
    }));
    toast.success("AI-generated answers applied.");
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

          {/* Prompt AI Assistant */}
          <div className="rounded-lg border border-amber-200 bg-amber-50">
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-amber-900"
              onClick={() => setShowAiBuilder((prev) => !prev)}
            >
              <span className="inline-flex items-center gap-2">
                {showAiBuilder ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                Prompt AI Builder
              </span>
              <span className="text-xs text-amber-800">
                {aiSuggestion ? "Last draft ready" : "Generate question & hint"}
              </span>
            </button>
            {showAiBuilder && (
              <div className="border-t border-amber-100 p-4 space-y-4">
                <div className="flex flex-col gap-1 text-sm text-amber-900 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <div>
                      <p className="font-semibold">Describe the scenario</p>
                      <p className="text-amber-800">
                        Prompt AI drafts the question, hint, and answer ideas.
                      </p>
                    </div>
                  </div>
                  {selectedLesson ? (
                    <p className="text-xs text-amber-900">
                      Context: {selectedLesson.unit.course.title} › {selectedLesson.unit.title}
                    </p>
                  ) : (
                    <p className="text-xs text-amber-900">Select a lesson to enrich the prompt.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-amber-900">Topic or requirement</label>
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => {
                      setAiPrompt(e.target.value);
                      setAiPromptSeeded(true);
                    }}
                    rows={3}
                    className="w-full rounded-md border border-amber-200 bg-white/80 p-3 text-sm text-gray-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    placeholder="Example: Draft an advanced question about multi-AZ database failover for the Resilient Architectures lesson."
                    disabled={aiGenerating}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-900">Guidance level</label>
                    <select
                      value={aiDifficulty}
                      onChange={(e) => setAiDifficulty(e.target.value as AIDifficulty)}
                      className="w-full rounded-md border border-amber-200 bg-white/80 p-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                      disabled={aiGenerating}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-900">Challenge type</label>
                    <div className="rounded-md border border-amber-100 bg-white/60 p-2.5 text-sm text-amber-900">
                      {formData.type.replace("_", " ")}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    onClick={handleGenerateSuggestion}
                    disabled={aiGenerating}
                    className="bg-amber-500 hover:bg-amber-500/90 text-white"
                  >
                    {aiGenerating ? "Generating..." : "Generate with Prompt AI"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={applyAiSuggestion}
                    disabled={!aiSuggestion}
                  >
                    Apply suggestion
                  </Button>
                </div>

                {aiSuggestion && (
                  <div className="rounded-lg border border-white bg-white p-4 text-sm text-gray-900 space-y-3">
                    <div>
                      <p className="font-semibold">Suggested question</p>
                      <p className="text-gray-700">{aiSuggestion.question}</p>
                    </div>
                    <div className="flex gap-2 text-gray-700">
                      <Lightbulb className="h-4 w-4 shrink-0 text-amber-400" />
                      <p>
                        <span className="font-semibold">Hint:</span> {aiSuggestion.hint}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Answer ideas</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                        {aiSuggestion.challengeOptions.map((option, index) => (
                          <li key={`${option.text}-${index}`}>
                            <span className={option.correct ? "font-semibold text-emerald-600" : "text-gray-700"}>
                              {option.text}
                            </span>
                            {option.guide && <span className="text-gray-500"> — {option.guide}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {aiSuggestion.writingTips.length > 0 && (
                      <div>
                        <p className="font-semibold">Writing tips</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                          {aiSuggestion.writingTips.map((tip) => (
                            <li key={tip}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

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

          {!hideOptions && (
            <div className="rounded-lg border border-sky-200 bg-sky-50">
              <button
                type="button"
                className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium ${
                  hasQuestionContext ? "text-sky-900" : "text-sky-400 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (!hasQuestionContext) {
                    toast.info("Enter the question prompt before generating answers.");
                    return;
                  }
                  setShowAiAnswers((prev) => !prev);
                }}
                disabled={!hasQuestionContext}
              >
                <span className="inline-flex items-center gap-2">
                  {showAiAnswers ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  Prompt AI Answers
                </span>
                <span className={`text-xs ${hasQuestionContext ? "text-sky-800" : "text-sky-400"}`}>
                  {hasQuestionContext ? "Use question context" : "Enter question to unlock"}
                </span>
              </button>
              {showAiAnswers && hasQuestionContext && (
                <div className="border-t border-sky-100 p-4 space-y-4">
                  <div className="flex flex-col gap-1 text-sm text-sky-900 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-sky-600" />
                      <div>
                        <p className="font-semibold">Generate contextual answers</p>
                        <p className="text-sky-800">
                          AI proposes one correct and multiple incorrect answers from your question prompt.
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-sky-800">
                      Based on: {formData.question ? `"${formData.question.slice(0, 60)}${formData.question.length > 60 ? "…" : ""}"` : "Add a question first"}
                    </p>
                  </div>

                  {!["TRUE_FALSE", "DRAG_DROP"].includes(formData.type) ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-sky-900">Number of answers</label>
                        <select
                          value={aiAnswerCount}
                          onChange={(e) => setAiAnswerCount(Number(e.target.value))}
                          className="w-full rounded-md border border-sky-200 bg-white/80 p-2.5 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
                        >
                          {[3, 4, 5, 6].map((count) => (
                            <option key={count} value={count}>
                              {count} options ({count - 1} incorrect)
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="text-xs text-sky-800 self-end">
                        Generates a single correct answer plus {aiAnswerCount - 1} distractors tailored to your prompt.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-md border border-sky-100 bg-white/70 p-3 text-xs text-sky-900">
                      TRUE/FALSE and Drag & Drop challenges manage their own answer structure automatically.
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="button"
                      onClick={handleGenerateAnswerSuggestion}
                      disabled={!hasQuestionContext || aiAnswersGenerating}
                      className="bg-sky-600 hover:bg-sky-600/90 text-white"
                    >
                      {aiAnswersGenerating ? "Generating..." : "Generate answers"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={applyAiAnswersSuggestion}
                      disabled={
                        !hasQuestionContext || !aiAnswersSuggestion || aiAnswersSuggestion.length === 0
                      }
                    >
                      Use generated answers
                    </Button>
                  </div>

                  {aiAnswersSuggestion && aiAnswersSuggestion.length > 0 && (
                    <div className="rounded-lg border border-white bg-white p-4 text-sm text-gray-900 space-y-2">
                      <p className="font-semibold">Suggested answers</p>
                      <ul className="space-y-1">
                        {aiAnswersSuggestion.map((option, index) => (
                          <li key={`${option.text}-${index}`} className="flex items-start gap-2">
                            <span
                              className={`mt-1 h-2 w-2 rounded-full ${option.correct ? "bg-emerald-500" : "bg-gray-300"}`}
                            />
                            <div>
                              <p className={option.correct ? "font-semibold text-emerald-600" : "text-gray-700"}>
                                {option.text}
                              </p>
                              {option.guide && <p className="text-xs text-gray-500">{option.guide}</p>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
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
