"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

import {
  NativeDialog,
  NativeDialogContent,
  NativeDialogDescription,
  NativeDialogFooter,
  NativeDialogHeader,
  NativeDialogTitle,
} from "@/components/ui/native-dialog"
import { Button } from "@/components/ui/button"
import { usePracticeModal } from "@/store/use-practice-modal"

export const PracticeModal = () => {
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = usePracticeModal()

  useEffect(() => setIsClient(true), [])

  if (!isClient) {
    return null
  }

  return (
    <NativeDialog open={isOpen} onOpenChange={close} className='max-w-md'>
      <NativeDialogContent>
        <NativeDialogHeader>
          <div className='flex items-center w-full justify-center mb-5'>
            <Heart className='h-24 w-24 text-red-500 fill-current' />
          </div>
          <NativeDialogTitle className='text-center font-bold text-2xl'>
            Practice lesson
          </NativeDialogTitle>
          <NativeDialogDescription className='text-center text-base'>
            Use practice lessons to regain hearts and points. You&apos;ll see visual feedback when
            you get wrong answers, but your hearts and points are safe in practice mode.
          </NativeDialogDescription>
        </NativeDialogHeader>
        <NativeDialogFooter className='mb-4'>
          <div className='flex flex-col gap-y-4 w-full'>
            <Button variant='primary' className='w-full' size='lg' onClick={close}>
              I understand
            </Button>
          </div>
        </NativeDialogFooter>
      </NativeDialogContent>
    </NativeDialog>
  )
}
