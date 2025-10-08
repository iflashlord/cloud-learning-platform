import { cn } from "@/lib/utils";
import { challengeOptions, challenges } from "@/db/schema";
import { useState, useEffect } from "react";

import { Card } from "./card";
import { SpeechInput } from "@/components/SpeechInput";

type Props = {
  options: typeof challengeOptions.$inferSelect[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: typeof challenges.$inferSelect["type"];
  challenge?: typeof challenges.$inferSelect;
  onTextSubmit?: (text: string) => void;
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
  challenge,
  onTextSubmit,
}: Props) => {
  const [textInput, setTextInput] = useState("");
  const [draggedItems, setDraggedItems] = useState<typeof options>([]);

  // Initialize drag items for DRAG_DROP when options are available
  useEffect(() => {
    if (type === "DRAG_DROP" && options.length > 0) {
      // Create shuffled array that is guaranteed to be different from correct order
      let shuffled = [...options];
      do {
        shuffled = [...options].sort(() => Math.random() - 0.5);
      } while (shuffled.every((item, index) => item.order === index + 1) && shuffled.length > 1);
      
      setDraggedItems(shuffled);
      // Select first item as placeholder - will be overridden when user checks
      onSelect(shuffled[0]?.id || 1);
    }
  }, [type, options, onSelect]);

  // Handle drag and drop validation - only check when user explicitly submits
  const checkDragDropOrder = () => {
    if (type === "DRAG_DROP" && draggedItems.length > 0) {
      const isCorrect = draggedItems.every((item, index) => item.order === index + 1);
      onSelect(isCorrect ? 999 : 998);
      return isCorrect;
    }
    return false;
  };

  // Initialize selection state for drag and drop - only initially, not on every change
  useEffect(() => {
    if (type === "DRAG_DROP" && draggedItems.length > 0 && !selectedOption) {
      // Set initial selection to indicate user has something to check
      onSelect(998); // Start with incorrect until they get it right
    }
  }, [type, draggedItems.length, selectedOption, onSelect]);

  // Expose drag drop checker function for quiz component
  useEffect(() => {
    if (type === "DRAG_DROP") {
      (window as any).checkCurrentDragOrder = () => {
        const isCorrect = draggedItems.every((item, index) => item.order === index + 1);
        onSelect(isCorrect ? 999 : 998);
        return isCorrect;
      };
    }
    
    // Cleanup function when component unmounts or type changes
    return () => {
      if (type === "DRAG_DROP") {
        delete (window as any).checkCurrentDragOrder;
      }
    };
  }, [draggedItems, type, onSelect]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    
    const newItems = [...draggedItems];
    const draggedItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    
    setDraggedItems(newItems);
  };

  const handleTextInputSubmit = () => {
    if (onTextSubmit && textInput.trim()) {
      onTextSubmit(textInput.trim());
    }
  };

  // Render different UI based on challenge type
  switch (type) {
    case "TEXT_INPUT":
      return (
        <div className="space-y-4">
          <SpeechInput
            value={textInput}
            onChange={setTextInput}
            onSubmit={handleTextInputSubmit}
            disabled={disabled}
            placeholder="Type your answer or use speech recognition..."
          />
        </div>
      );

    case "SPEECH_INPUT":
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                🎤
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Speech Recognition Mode</h3>
                <p className="text-xs text-blue-700">This question requires voice input</p>
              </div>
            </div>
            <SpeechInput
              value={textInput}
              onChange={setTextInput}
              onSubmit={handleTextInputSubmit}
              disabled={disabled}
              placeholder="Click the microphone button and speak your answer..."
            />
          </div>
        </div>
      );

    case "DRAG_DROP":
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              📋 Arrange items in the correct order. You can drag & drop or use the ↑↓ buttons.
            </p>
          </div>
          
          <div className="space-y-3">
            {draggedItems.map((item, index) => {
              const isCorrectPosition = item.order === index + 1;
              return (
                <div
                  key={item.id}
                  className="relative group"
                >
                  <div
                    draggable={!disabled}
                    onDragStart={(e) => {
                      handleDragStart(e, index);
                      e.currentTarget.classList.add('opacity-50');
                    }}
                    onDragEnd={(e) => {
                      e.currentTarget.classList.remove('opacity-50');
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
                      handleDrop(e, index);
                    }}
                    className={cn(
                      "p-4 border-2 rounded-lg transition-all duration-200",
                      !disabled && "cursor-move hover:border-blue-300 hover:shadow-md hover:scale-[1.02]",
                      disabled && "cursor-not-allowed opacity-60",
                      isCorrectPosition 
                        ? "bg-green-50 border-green-200 shadow-sm" 
                        : "bg-white border-gray-200 shadow-sm"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-colors",
                          isCorrectPosition
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-800"
                        )}>
                          {index + 1}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-800 font-medium">{item.text}</span>
                          {isCorrectPosition && (
                            <span className="text-xs text-green-600 flex items-center">
                              ✓ Correct position
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {/* Drag handle */}
                        {!disabled && (
                          <div className="text-gray-400 cursor-move">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                            </svg>
                          </div>
                        )}
                        
                        {/* Arrow controls */}
                        {!disabled && (
                          <div className="flex flex-col space-y-1">
                            <button
                              onClick={() => {
                                if (index > 0) {
                                  const newItems = [...draggedItems];
                                  [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
                                  setDraggedItems(newItems);
                                }
                              }}
                              disabled={index === 0}
                              className={cn(
                                "p-1 rounded transition-colors",
                                "text-blue-500 hover:text-blue-700 hover:bg-blue-100",
                                "disabled:text-gray-300 disabled:cursor-not-allowed"
                              )}
                              title="Move up"
                            >
                              ↑
                            </button>
                            <button
                              onClick={() => {
                                if (index < draggedItems.length - 1) {
                                  const newItems = [...draggedItems];
                                  [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
                                  setDraggedItems(newItems);
                                }
                              }}
                              disabled={index === draggedItems.length - 1}
                              className={cn(
                                "p-1 rounded transition-colors",
                                "text-blue-500 hover:text-blue-700 hover:bg-blue-100",
                                "disabled:text-gray-300 disabled:cursor-not-allowed"
                              )}
                              title="Move down"
                            >
                              ↓
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Progress indicator */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Progress: {draggedItems.filter((item, index) => item.order === index + 1).length} / {draggedItems.length} correct
              </span>
              <div className="flex space-x-1">
                {draggedItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "w-3 h-3 rounded-full transition-colors",
                      item.order === index + 1 ? "bg-green-400" : "bg-gray-300"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case "LISTENING":
      return (
        <div className="space-y-4">
          {challenge?.audioSrc && (
            <div className="flex justify-center">
              <audio controls className="w-full max-w-md">
                <source src={challenge.audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          <div className={cn(
            "grid gap-2",
            "grid-cols-1 lg:grid-cols-2"
          )}>
            {options.map((option, i) => (
              <Card
                key={option.id}
                id={option.id}
                text={option.text}
                imageSrc={option.imageSrc}
                shortcut={`${i + 1}`}
                selected={selectedOption === option.id}
                onClick={() => onSelect(option.id)}
                status={status}
                audioSrc={option.audioSrc}
                disabled={disabled}
                type={type}
              />
            ))}
          </div>
        </div>
      );

    case "IMAGE_SELECT":
      return (
        <div className={cn(
          "grid gap-4",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}>
          {options.map((option, i) => (
            <Card
              key={option.id}
              id={option.id}
              text={option.text}
              imageSrc={option.imageSrc}
              shortcut={`${i + 1}`}
              selected={selectedOption === option.id}
              onClick={() => onSelect(option.id)}
              status={status}
              audioSrc={option.audioSrc}
              disabled={disabled}
              type={type}
            />
          ))}
        </div>
      );

    case "TRUE_FALSE":
      return (
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, i) => (
            <Card
              key={option.id}
              id={option.id}
              text={option.text}
              imageSrc={option.imageSrc}
              shortcut={i === 0 ? "T" : "F"}
              selected={selectedOption === option.id}
              onClick={() => onSelect(option.id)}
              status={status}
              audioSrc={option.audioSrc}
              disabled={disabled}
              type={type}
            />
          ))}
        </div>
      );

    default:
      // SELECT and ASSIST types (existing behavior)
      return (
        <div className={cn(
          "grid gap-2",
          type === "ASSIST" && "grid-cols-1",
          type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
        )}>
          {options.map((option, i) => (
            <Card
              key={option.id}
              id={option.id}
              text={option.text}
              imageSrc={option.imageSrc}
              shortcut={`${i + 1}`}
              selected={selectedOption === option.id}
              onClick={() => onSelect(option.id)}
              status={status}
              audioSrc={option.audioSrc}
              disabled={disabled}
              type={type}
            />
          ))}
        </div>
      );
  }
}
