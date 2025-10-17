"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Frown } from "lucide-react"

import {
  NativeDialog,
  NativeDialogContent,
  NativeDialogDescription,
  NativeDialogFooter,
  NativeDialogHeader,
  NativeDialogTitle,
} from "@/components/ui/native-dialog"
import { Button } from "@/components/ui/button"
import { useExitModal } from "@/store/use-exit-modal"

export const ExitModal = () => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = useExitModal()

  useEffect(() => setIsClient(true), [])

  if (!isClient) {
    return null
  }

  return (
    <NativeDialog open={isOpen} onOpenChange={close} className='max-w-md'>
      <NativeDialogContent>
        <NativeDialogHeader>
          <div className='flex items-center w-full justify-center mb-5'>
            <Frown className='h-20 w-20 text-muted-foreground' />
          </div>
          <NativeDialogTitle className='text-center font-bold text-2xl'>
            Wait, don&apos;t go!
          </NativeDialogTitle>
          <NativeDialogDescription className='text-center text-base'>
            You&apos;re about to leave the lesson. Are you sure?
          </NativeDialogDescription>
        </NativeDialogHeader>
        <NativeDialogFooter className='mb-4'>
          <div className='flex flex-col gap-y-4 w-full'>
            <Button variant='primary' className='w-full' size='lg' onClick={close}>
              Keep learning
            </Button>
            <Button
              variant='danger'
              className='w-full'
              size='lg'
              onClick={() => {
                close()
                router.push("/learn")
              }}
            >
              End session
            </Button>
          </div>
        </NativeDialogFooter>
      </NativeDialogContent>
    </NativeDialog>
  )
}
