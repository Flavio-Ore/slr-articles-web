import Footer from '#/components/footer'
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
    <div className='flex min-h-screen flex-col items-center justify-between'>
      <main className='space-y-12 py-8 px-4 lg:px-0 lg:py-12'>
        <header className='text-center'>
          <h1 className='text-3xl font-bold mb-4 text-cyan-950 dark:text-cyan-400'>
            Systematic Literature Review Articles
          </h1>
          <p className='text-base text-cyan-600'>
            Powered by Gemini AI and Next.js, this platform allows you to manage
            and view PDF articles related to Systematic Literature Reviews
            (SLRs). You can add PDF URLs, and the system will validate them
            before displaying the articles. The platform is designed to be
            user-friendly, with a focus on accessibility and ease of use.
          </p>
        </header>
        <PdfUrlManager />
      </main>

      <Footer />
      <div className='fixed bottom-4 right-4'>
        <ModeToggle />
      </div>
    </div>
  )
}
