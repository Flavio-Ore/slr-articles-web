'use client'

import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '#/components/ui/card'
import Link from 'next/link'

export default function NotFound () {
  return (
    <div className='min-h-screen flex items-center justify-center bg-muted/30 p-4'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='text-center space-y-4'>
          <div className='mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center'>
            <span className='text-2xl font-bold text-destructive'>404</span>
          </div>
          <CardTitle className='text-2xl font-bold'>Page Not Found</CardTitle>
          <CardDescription className='text-muted-foreground'>
            Sorry, we couldn't find the page you're looking for. It might have
            been moved, deleted, or you entered the wrong URL.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button asChild className='w-full'>
            <Link href='/'>Return to Home</Link>
          </Button>
          <Button variant='outline' asChild className='w-full'>
            <Link href='/en'>Go to Main Page</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
