import PdfViewer from '#/components/PdfViewer'

export default function Home () {
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

      {/* <section className='w-full max-w-4xl mt-8'>
        <h2 className='text-2xl font-semibold mb-4'>Featured Article</h2>
        <article className='p-6 bg-slate-900 rounded-lg shadow-md'>
          <h3 className='text-xl font-bold'>
            The Impact of AI on Software Development
          </h3>
          <p className='mt-2 text-gray-600'>
            This paper explores the various ways Artificial Intelligence is
            changing the landscape of software development, from automated
            testing to AI-powered code generation.
          </p>
          <a
            href='#'
            className='text-blue-500 hover:underline mt-4 inline-block'
          >
            Read More
          </a>
        </article>
      </section> */}

      <PdfViewer />

      <footer className='w-full max-w-4xl mt-8 text-center text-gray-500'>
        <p>
          &copy; {new Date().getFullYear()} SLR-Articles. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
