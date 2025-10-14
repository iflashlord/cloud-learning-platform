"use client";

import { cn } from "@/lib/utils";
import { statusStyles } from "@/lib/style-utils";
import { ClipboardList } from "lucide-react";
import { useState, useEffect } from "react";
import { challengeOptions } from "@/db/schema";

interface DragDropChallengeProps {
  options: typeof challengeOptions.$inferSelect[];
  disabled?: boolean;
  status: "correct" | "wrong" | "none";
  onSelect: (id: number) => void;
}

export const DragDropChallenge = ({ 
  options, 
  disabled, 
  status, 
  onSelect 
}: DragDropChallengeProps) => {
  const [draggedItems, setDraggedItems] = useState<typeof options>([]);

  // Initialize drag items when options are available
  useEffect(() => {
    if (options.length > 0) {
      // Create shuffled array that is guaranteed to be different from correct order
      let shuffled = [...options];
      do {
        shuffled = [...options].sort(() => Math.random() - 0.5);
      } while (shuffled.every((item, index) => item.order === index + 1) && shuffled.length > 1);
      
      setDraggedItems(shuffled);
      // Select first item as placeholder - will be overridden when user checks
      onSelect(shuffled[0]?.id || 1);
    }
  }, [options, onSelect]);

  // Expose drag drop checker function for quiz component
  useEffect(() => {
    (window as any).checkCurrentDragOrder = () => {
      const isCorrect = draggedItems.every((item, index) => item.order === index + 1);
      onSelect(isCorrect ? 999 : 998);
      return isCorrect;
    };
    
    // Cleanup function when component unmounts
    return () => {
      delete (window as any).checkCurrentDragOrder;
    };
  }, [draggedItems, onSelect]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-primary-400', 'bg-primary-50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('border-primary-400', 'bg-primary-50');
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary-400', 'bg-primary-50');
    
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (dragIndex === dropIndex) return;

    const newItems = [...draggedItems];
    const draggedItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    
    setDraggedItems(newItems);
  };

  const moveItem = (fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= draggedItems.length) return;

    const newItems = [...draggedItems];
    [newItems[fromIndex], newItems[toIndex]] = [newItems[toIndex], newItems[fromIndex]];
    setDraggedItems(newItems);
  };

  return (
    <div className="space-y-4">
      <div className={cn("mt-3 p-3 rounded-lg border", statusStyles.info.bg, statusStyles.info.border)}>
        <p className={cn("text-sm flex items-center gap-2", statusStyles.info.text)}>
          <ClipboardList className="w-4 h-4" />
          <span>Arrange items in the correct order. You can drag & drop or use the ↑↓ buttons.</span>
        </p>
      </div>
      
      <div className="px-6">
        <div className="space-y-3">
          {draggedItems.map((item, index) => {
            const isCorrectPosition = item.order === index + 1;
            return (
              <div key={item.id} className="relative group">
                <div
                  draggable={!disabled}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  className={cn(
                    "p-4 border-2 rounded-lg transition-all duration-200",
                    !disabled && "cursor-move hover:border-primary-300 hover:shadow-md hover:scale-[1.02]",
                    disabled && "cursor-not-allowed opacity-60",
                    isCorrectPosition 
                      ? cn(statusStyles.success.bg, statusStyles.success.border, "shadow-sm")
                      : "bg-white dark:bg-gray-800 border-neutral-200 dark:border-gray-700 shadow-sm"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-colors",
                        isCorrectPosition
                          ? cn(statusStyles.success.bg.replace('bg-', 'bg-').replace('-50', '-100'), statusStyles.success.text)
                          : "bg-primary-100 text-primary-800"
                      )}>
                        {index + 1}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-800 dark:text-gray-100 font-medium">{item.text}</span>
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
                            onClick={() => moveItem(index, 'up')}
                            disabled={index === 0}
                            className={cn(
                              "p-1 rounded transition-colors",
                              statusStyles.info.text + " hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30",
                              "disabled:text-gray-300 disabled:cursor-not-allowed"
                            )}
                            title="Move up"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveItem(index, 'down')}
                            disabled={index === draggedItems.length - 1}
                            className={cn(
                              "p-1 rounded transition-colors",
                              statusStyles.info.text + " hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30",
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
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Progress: {draggedItems.filter((item, index) => item.order === index + 1).length} / {draggedItems.length} correct
            </span>
            <div className="flex space-x-1">
              {draggedItems.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors",
                    item.order === index + 1 ? statusStyles.success.bg : "bg-gray-300 dark:bg-gray-600"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};