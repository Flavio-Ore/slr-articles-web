'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '#shadcn/dialog'
import { LoaderCircleIcon } from 'lucide-react'

interface SrlLoaderProps {
  isOpen?: boolean
  loadingText?: string
}

export default function SrlLoader ({
  isOpen = true,
  loadingText = 'Analyzing PDF...'
}: SrlLoaderProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Processing</DialogTitle>
          <DialogDescription>
            Please wait while we process your request.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-center space-y-4 py-6'>
          <LoaderCircleIcon className='h-8 w-8 animate-spin text-primary' />
          <p className='text-sm text-muted-foreground'>{loadingText}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
