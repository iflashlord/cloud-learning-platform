"use client";

import { challenges } from "@/db/schema";

interface TypeSelectorProps {
  selectedType: typeof challenges.$inferSelect["type"];
  onChange: (type: typeof challenges.$inferSelect["type"]) => void;
  disabled?: boolean;
}

const challengeTypes = [
  { value: "SELECT", label: "Multiple Choice", description: "Select one correct answer from multiple options" },
  { value: "ASSIST", label: "Assisted Learning", description: "Single column layout with hints" },
  { value: "TRUE_FALSE", label: "True/False", description: "Choose between true and false" },
  { value: "DRAG_DROP", label: "Drag & Drop", description: "Arrange items in correct order" },
  { value: "TEXT_INPUT", label: "Text Input", description: "Type the answer manually" },
  { value: "SPEECH_INPUT", label: "Speech Input", description: "Speak the answer using voice recognition" },
  { value: "IMAGE_SELECT", label: "Image Selection", description: "Select images as answers" },
  { value: "LISTENING", label: "Listening", description: "Listen to audio and answer" },
  { value: "VIDEO", label: "Video", description: "Watch video and answer questions" },
] as const;

export const TypeSelector = ({ selectedType, onChange, disabled }: TypeSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Challenge Type <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {challengeTypes.map((type) => (
          <div
            key={type.value}
            className={`relative cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !disabled && onChange(type.value)}
          >
            <input
              type="radio"
              name="challengeType"
              value={type.value}
              checked={selectedType === type.value}
              onChange={(e) => onChange(e.target.value as typeof challenges.$inferSelect["type"])}
              disabled={disabled}
              className="sr-only"
            />
            <div className={`
              p-4 border-2 rounded-lg transition-all duration-200
              ${selectedType === type.value 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }
            `}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{type.label}</h3>
                {selectedType === type.value && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};