"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Challenge = {
  id: number;
  question: string;
  lesson: {
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
};

type ChallengeOptionData = {
  text: string;
  correct: boolean;
  imageSrc?: string;
  audioSrc?: string;
  guide?: string;
  challengeId: number;
};

interface ChallengeOptionFormProps {
  optionId?: number;
  initialData?: ChallengeOptionData;
  preselectedChallengeId?: number; // Pre-select challenge when creating from challenge page
}

export const ChallengeOptionForm = ({ optionId, initialData, preselectedChallengeId }: ChallengeOptionFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [formData, setFormData] = useState<ChallengeOptionData>({
    text: initialData?.text || "",
    correct: initialData?.correct || false,
    imageSrc: initialData?.imageSrc || "",
    audioSrc: initialData?.audioSrc || "",
    guide: initialData?.guide || "",
    challengeId: initialData?.challengeId || preselectedChallengeId || 0,
  });

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await fetch("/api/challenges");
      if (response.ok) {
        const data = await response.json();
        setChallenges(data);
      }
    } catch (error) {
      console.error("Failed to fetch challenges:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = optionId ? `/api/challengeOptions/${optionId}` : "/api/challengeOptions";
      const method = optionId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(optionId ? "Challenge option updated successfully" : "Challenge option created successfully");
        router.push("/admin/challenge-options");
        router.refresh();
      } else {
        const error = await response.text();
        toast.error(error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Challenge option form error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/challenge-options");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="challengeId" className="block text-sm font-medium text-gray-700 mb-2">
            Challenge
          </label>
          <select
            id="challengeId"
            value={formData.challengeId}
            onChange={(e) => setFormData(prev => ({ ...prev, challengeId: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a challenge</option>
            {challenges.map((challenge) => (
              <option key={challenge.id} value={challenge.id}>
                {challenge.lesson.unit.course.title} → {challenge.lesson.unit.title} → {challenge.lesson.title} → {challenge.question.substring(0, 50)}...
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
            Option Text
          </label>
          <input
            type="text"
            id="text"
            value={formData.text}
            onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="correct"
              checked={formData.correct}
              onChange={(e) => setFormData(prev => ({ ...prev, correct: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="correct" className="ml-2 block text-sm text-gray-700">
              This is the correct answer
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="guide" className="block text-sm font-medium text-gray-700 mb-2">
            Explanation (Optional)
            <span className="text-sm text-gray-500 ml-1">- Explain why this answer is correct or incorrect</span>
          </label>
          <textarea
            id="guide"
            value={formData.guide}
            onChange={(e) => setFormData(prev => ({ ...prev, guide: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Provide an explanation for why this answer is correct or incorrect..."
          />
        </div>

        <div>
          <label htmlFor="imageSrc" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL (Optional)
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

        <div>
          <label htmlFor="audioSrc" className="block text-sm font-medium text-gray-700 mb-2">
            Audio URL (Optional)
          </label>
          <input
            type="url"
            id="audioSrc"
            value={formData.audioSrc}
            onChange={(e) => setFormData(prev => ({ ...prev, audioSrc: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/audio.mp3"
          />
        </div>

        <div className="flex space-x-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : optionId ? "Update Option" : "Create Option"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};