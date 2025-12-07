import { Github, Linkedin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Footer () {
  const t = useTranslations('footer')
  return (
    <footer className='w-full bg-sky-200 dark:bg-gray-800  text-slate-300'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
        <div className='border-t border-gray-950 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center'>
          <div className='text-sm'>
            {t('copyright', {
              year: new Date().getFullYear()
            })}
          </div>
          <div className='flex space-x-4 mt-4 sm:mt-0'>
            <Link
              rel='noopener noreferrer'
              target='_blank'
              href='https://github.com/Flavio-Ore'
              className='hover:text-blue-400 transition-colors'
            >
              <Github className='h-5 w-5' />
            </Link>
            <Link
              rel='noopener noreferrer'
              target='_blank'
              href='https://www.linkedin.com/in/flavio-ore'
              className='hover:text-blue-400 transition-colors'
            >
              <Linkedin className='h-5 w-5' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
