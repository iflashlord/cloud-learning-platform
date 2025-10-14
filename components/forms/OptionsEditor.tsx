"use client";

import { Button } from "@/components/ui/button";
import { challenges } from "@/db/schema";
import { Trash2, Plus, Upload, Image as ImageIcon } from "lucide-react";

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

interface OptionsEditorProps {
  options: ChallengeOption[];
  challengeType: typeof challenges.$inferSelect["type"];
  onChange: (index: number, field: keyof ChallengeOption, value: string | boolean | number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  disabled?: boolean;
}

export const OptionsEditor = ({
  options,
  challengeType,
  onChange,
  onAdd,
  onRemove,
  disabled
}: OptionsEditorProps) => {
  const needsOptions = !["TEXT_INPUT", "SPEECH_INPUT"].includes(challengeType);
  
  if (!needsOptions) {
    return null;
  }

  const getOptionLabel = (index: number) => {
    switch (challengeType) {
      case "TRUE_FALSE":
        return index === 0 ? "True" : "False";
      case "DRAG_DROP":
        return `Item ${index + 1}`;
      default:
        return `Option ${index + 1}`;
    }
  };

  const shouldShowCorrectToggle = challengeType !== "DRAG_DROP";
  const shouldShowOrder = challengeType === "DRAG_DROP";
  const shouldShowImages = challengeType === "IMAGE_SELECT";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Answer Options</h3>
        {challengeType !== "TRUE_FALSE" && (
          <Button
            type="button"
            onClick={onAdd}
            disabled={disabled}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Option
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {options.map((option, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-medium text-gray-800">{getOptionLabel(index)}</h4>
              {challengeType !== "TRUE_FALSE" && options.length > 2 && (
                <Button
                  type="button"
                  onClick={() => onRemove(index)}
                  disabled={disabled}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Text Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Text <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => onChange(index, "text", e.target.value)}
                  placeholder="Enter option text..."
                  required
                  disabled={disabled}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Order Field for Drag Drop */}
              {shouldShowOrder && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Correct Position <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={option.order || index + 1}
                    onChange={(e) => onChange(index, "order", parseInt(e.target.value) || index + 1)}
                    min={1}
                    max={options.length}
                    disabled={disabled}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              {/* Correct Toggle */}
              {shouldShowCorrectToggle && (
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={option.correct}
                      onChange={(e) => onChange(index, "correct", e.target.checked)}
                      disabled={disabled}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Correct Answer</span>
                  </label>
                </div>
              )}

              {/* Image Field for Image Select */}
              {shouldShowImages && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="url"
                      value={option.imageSrc || ""}
                      onChange={(e) => onChange(index, "imageSrc", e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      disabled={disabled}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {option.imageSrc && (
                      <div className="w-10 h-10 border border-gray-300 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Guide Field */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Guide/Explanation (Optional)
                </label>
                <textarea
                  value={option.guide || ""}
                  onChange={(e) => onChange(index, "guide", e.target.value)}
                  placeholder="Explain why this is correct/incorrect..."
                  rows={2}
                  disabled={disabled}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Validation Messages */}
      {shouldShowCorrectToggle && (
        <div className="text-sm text-gray-600">
          <p>⚠️ Make sure to mark exactly one option as correct.</p>
        </div>
      )}
      
      {shouldShowOrder && (
        <div className="text-sm text-gray-600">
          <p>⚠️ Ensure each item has a unique position number (1, 2, 3, etc.).</p>
        </div>
      )}
    </div>
  );
};