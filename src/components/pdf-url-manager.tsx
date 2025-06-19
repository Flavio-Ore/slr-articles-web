'use client'

import { checkIsValidPdfUrl } from '#/utils/check-is-valid-pdf-url'
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react'
import PdfViewer from './pdf-viewer'

interface PdfUrlManagerProps {
  pdfUrls?: string[]
  setPdfUrls?: Dispatch<SetStateAction<string[]>>
}

export default function PdfUrlManager () {
  const [pdfUrls, setPdfUrls] = useState(new Set<string>())
  const [input, setInput] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const isValidPdfUrl = useMemo(
    () => checkIsValidPdfUrl({ pdfUrl: input }),
    [input]
  )

  useEffect(() => {
    console.log({
      pdfUrls
    })
    if (isValidPdfUrl) {
      setIsError(false)
      setErrorMessage('')
    }
    if (!isValidPdfUrl) {
      setIsError(true)
      setErrorMessage('Please enter a valid PDF URL.')
    }
  }, [input])

  return (
    <section className='w-full max-w-4xl mt-8'>
      <h2 className='text-2xl font-semibold mb-4'>PDF URLs</h2>
      <form className='flex flex-col gap-y-1'>
        <div className='flex flex-col mb-4 gap-y-2'>
          <input
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Enter first PDF URL'
          />
          {isError && <p className='text-red-600'>{errorMessage}</p>}
          {!isError && input && <PdfViewer initialPdfUrl={input} />}
        </div>
        <button
          type='submit'
          className='mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          disabled={isError}
          onClick={e => {
            e.preventDefault()
            if (!input) {
              setIsError(true)
              setErrorMessage('Please enter a PDF URL.')
              return
            }
            if (!isError && input) {
              setPdfUrls(prevUrls => new Set([...prevUrls, input]))
              setInput('')
            }
          }}
        >
          Add Scientific Article PDF URL
        </button>
      </form>
      {pdfUrls.size > 0 && (
        <div className='mt-4'>
          <h3 className='text-xl font-semibold'>Selected PDFs:</h3>
          <ul className='list-disc pl-5 mt-2'>
            {Array.from(pdfUrls).map((url, index) => (
              <li key={index} className='text-blue-600 hover:underline'>
                <a href={url} target='_blank' rel='noopener noreferrer'>
                  <PdfViewer initialPdfUrl={url} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
