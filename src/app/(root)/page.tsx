import { ModeToggle } from '#/components/mode-toggle'
import PdfUrlManager from '#/components/pdf-url-manager'

export async function serverSideProps () {
  // This function can be used to fetch data or perform server-side operations
  // before rendering the page. Currently, it does nothing.
  return {
    props: {}
  }
}

export default async function RootHome () {
  console.log({
    alive: 'alive'
  })
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-12 md:p-24'>
      <main className='flex flex-col items-center justify-center w-full max-w-4xl gap-4'>
        <header className='text-center'>
          <h1 className='text-3xl font-bold mb-4 text-cyan-950 dark:text-cyan-400'>
            Systematic Literature Review Articles
          </h1>
          <p className='text-base text-cyan-600'>
            A collection of SLR articles and research papers.
          </p>
        </header>
        <PdfUrlManager />
      </main>

      <footer className='w-full max-w-4xl mt-8 text-center text-gray-500'>
        <p>
          &copy; {new Date().getFullYear()} SLR-Articles. All rights reserved.
        </p>
      </footer>
      <div className='fixed bottom-4 right-4'>
        <ModeToggle />
      </div>
    </div>
  )
}
