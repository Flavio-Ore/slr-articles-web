import PdfUrlManager from '#/components/pdf-url-manager'

export default async function Home () {
  console.log({
    alive: 'alive'
  })
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <header className='text-center'>
        <h1 className='text-4xl font-bold'>
          Systematic Literature Review Articles
        </h1>
        <p className='text-xl text-gray-600'>
          A collection of SLR articles and research papers.
        </p>
      </header>

      <PdfUrlManager />

      <footer className='w-full max-w-4xl mt-8 text-center text-gray-500'>
        <p>
          &copy; {new Date().getFullYear()} SLR-Articles. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
