import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer () {
  return (
    <footer className='w-full bg-slate-900 text-slate-300'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
        <div className='border-t border-slate-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center'>
          <div className='text-sm'>
            © {new Date().getFullYear()} SLR Articles. All rights reserved.
          </div>
          <div className='flex space-x-4 mt-4 sm:mt-0'>
            <Link href='#' className='hover:text-blue-400 transition-colors'>
              <Github className='h-5 w-5' />
            </Link>
            <Link href='#' className='hover:text-blue-400 transition-colors'>
              <Linkedin className='h-5 w-5' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
