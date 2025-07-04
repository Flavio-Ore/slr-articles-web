import SlrForm from '#/app/[locale]/(slr)/components/srl-form'
import Footer from '#/components/footer'
import GeminiIcon from '#/components/icons/gemini-icon'
import NextjsIcon from '#/components/icons/nextjs-icon'
import { ModeToggle } from '#/components/mode-toggle'
import { getTranslations } from 'next-intl/server'

export default async function RootHome () {
  const t = await getTranslations('page')

  return (
    <div className='flex min-h-screen flex-col items-center justify-between'>
      <main className='space-y-12 py-8 px-4 lg:px-0 lg:py-12 w-full max-w-3xl'>
        <header className='relative text-center space-y-6'>
          <div className='space-y-2'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-sky-900 to-blue-950 dark:from-sky-50 dark:to-blue-200 bg-clip-text text-transparent'>
              {t('title')}
            </h1>
            <h2 className='text-xl text-amber-900 dark:text-amber-100 font-medium'>
              {t('subtitle')}
            </h2>
          </div>
          <div className='flex items-center justify-center space-x-3 text-sm text-zinc-950 dark:text-zinc-200'>
            <span>{t('poweredBy')}</span>
            <GeminiIcon className='h-5 w-5' />
            <span className='font-medium'>{t('geminiAI')}</span>
            <span>•</span>
            <NextjsIcon className='h-5 w-5' />
            <span className='font-medium'>{t('nextjs')}</span>
          </div>
          <div className='absolute bottom-1/2 top-1/2 right-2'>
            <ModeToggle />
          </div>
        </header>

        <SlrForm />
      </main>
      <Footer />
    </div>
  )
}
