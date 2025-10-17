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
import { useHeartsModal } from "@/store/use-hearts-modal"

export const HeartsModal = () => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = useHeartsModal()

  useEffect(() => setIsClient(true), [])

  const onClick = () => {
    close()
    router.push("/shop")
  }

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
            You ran out of hearts!
          </NativeDialogTitle>
          <NativeDialogDescription className='text-center text-base'>
            Get Pro for unlimited hearts, or purchase them in the store.
          </NativeDialogDescription>
        </NativeDialogHeader>
        <NativeDialogFooter className='mb-4'>
          <div className='flex flex-col gap-y-4 w-full'>
            <Button variant='primary' className='w-full' size='lg' onClick={onClick}>
              Get unlimited hearts
            </Button>
            <Button variant='outline' className='w-full' size='lg' onClick={close}>
              No thanks
            </Button>
          </div>
        </NativeDialogFooter>
      </NativeDialogContent>
    </NativeDialog>
  )
}
