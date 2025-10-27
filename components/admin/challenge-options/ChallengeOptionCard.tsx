/**
 * Challenge Option Card Component
 *
 * Individual challenge option display card with status indicators,
 * media badges, and action buttons for view, edit, and delete operations.
 */

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle, ImageIcon, Volume2, Eye, Edit, Trash2 } from "lucide-react"
import { ChallengeOption } from "./types"

interface ChallengeOptionCardProps {
  option: ChallengeOption
  onDelete: (id: number) => void
}

export const ChallengeOptionCard: React.FC<ChallengeOptionCardProps> = ({ option, onDelete }) => {
  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this challenge option?")) {
      onDelete(option.id)
    }
  }

  return (
    <Card className='p-6'>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          {/* Status and badges */}
          <div className='flex items-center space-x-3 mb-3'>
            <div className='flex items-center'>
              {option.correct ? (
                <CheckCircle2 className='w-5 h-5 text-green-500 dark:text-green-400 mr-2' />
              ) : (
                <XCircle className='w-5 h-5 text-red-500 dark:text-red-400  mr-2' />
              )}
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  option.correct
                    ? "bg-green-100 text-green-800 dark:bg-green-400 dark:text-green-100"
                    : "bg-red-100 text-red-800 dark:bg-red-400 dark:text-red-100"
                }`}
              >
                {option.correct ? "Correct" : "Incorrect"}
              </span>
            </div>
            {option.challenge && (
              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:text-purple-400'>
                Challenge #{option.challengeId}
              </span>
            )}
          </div>

          {/* Option text */}
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-400 mb-2'>
            {option.text}
          </h3>

          {/* Challenge context */}
          {option.challenge && (
            <div className='mb-3'>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                <strong>Question:</strong> {option.challenge.question}
              </p>
              {option.challenge.lesson && (
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  {option.challenge.lesson.unit?.course?.title && (
                    <>
                      {option.challenge.lesson.unit.course.title}
                      {" → "}
                    </>
                  )}
                  {option.challenge.lesson.unit?.title && (
                    <>
                      {option.challenge.lesson.unit.title}
                      {" → "}
                    </>
                  )}
                  {option.challenge.lesson.title}
                </p>
              )}
            </div>
          )}

          {/* Media indicators */}
          <div className='flex space-x-4 text-sm text-gray-500'>
            {option.imageSrc && (
              <span className='inline-flex items-center gap-1'>
                <ImageIcon className='w-4 h-4' />
                Has image
              </span>
            )}
            {option.audioSrc && (
              <span className='inline-flex items-center gap-1'>
                <Volume2 className='w-4 h-4' />
                Has audio
              </span>
            )}
            {option.guide && (
              <span className='inline-flex items-center gap-1'>
                <Edit className='w-4 h-4' />
                Has guide
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className='flex space-x-2'>
          <Link href={`/admin/challenge-options/${option.id}`}>
            <Button variant='ghost' size='sm' title='View details'>
              <Eye className='w-4 h-4' />
            </Button>
          </Link>
          <Link href={`/admin/challenge-options/${option.id}/edit`}>
            <Button variant='outline' size='sm' title='Edit option'>
              <Edit className='w-4 h-4' />
            </Button>
          </Link>
          <Button variant='danger' size='sm' onClick={handleDeleteClick} title='Delete option'>
            <Trash2 className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </Card>
  )
}
