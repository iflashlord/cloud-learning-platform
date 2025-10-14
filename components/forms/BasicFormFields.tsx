"use client";

import { challenges } from "@/db/schema";

interface BasicFormFieldsProps {
  formData: {
    question: string;
    order: number;
    hint?: string;
    audioSrc?: string;
    videoSrc?: string;
    imageSrc?: string;
    correctAnswer?: string;
  };
  challengeType: typeof challenges.$inferSelect["type"];
  onChange: (field: string, value: string | number) => void;
  disabled?: boolean;
}

export const BasicFormFields = ({
  formData,
  challengeType,
  onChange,
  disabled
}: BasicFormFieldsProps) => {
  return (
    <div className="space-y-6">
      {/* Question Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Question <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.question}
          onChange={(e) => onChange("question", e.target.value)}
          placeholder="Enter the challenge question..."
          rows={3}
          required
          disabled={disabled}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Order Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Order</label>
        <input
          type="number"
          value={formData.order}
          onChange={(e) => onChange("order", parseInt(e.target.value) || 1)}
          min={1}
          disabled={disabled}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-sm text-gray-500">Position of this challenge within the lesson</p>
      </div>

      {/* Hint Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Hint (Optional)</label>
        <textarea
          value={formData.hint || ""}
          onChange={(e) => onChange("hint", e.target.value)}
          placeholder="Provide a helpful hint for learners..."
          rows={2}
          disabled={disabled}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Media Fields based on challenge type */}
      {(challengeType === "LISTENING" || challengeType === "SPEECH_INPUT") && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Audio Source URL</label>
          <input
            type="url"
            value={formData.audioSrc || ""}
            onChange={(e) => onChange("audioSrc", e.target.value)}
            placeholder="https://example.com/audio.mp3"
            disabled={disabled}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {challengeType === "VIDEO" && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Video Source URL</label>
          <input
            type="url"
            value={formData.videoSrc || ""}
            onChange={(e) => onChange("videoSrc", e.target.value)}
            placeholder="https://example.com/video.mp4"
            disabled={disabled}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {challengeType === "IMAGE_SELECT" && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Question Image URL</label>
          <input
            type="url"
            value={formData.imageSrc || ""}
            onChange={(e) => onChange("imageSrc", e.target.value)}
            placeholder="https://example.com/image.jpg"
            disabled={disabled}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {(challengeType === "TEXT_INPUT" || challengeType === "SPEECH_INPUT") && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Correct Answer <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.correctAnswer || ""}
            onChange={(e) => onChange("correctAnswer", e.target.value)}
            placeholder="Enter the correct answer..."
            required
            disabled={disabled}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}
    </div>
  );
};