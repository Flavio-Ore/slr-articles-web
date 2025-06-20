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
  const isRepeatedPdfUrl = useMemo(() => pdfUrls.has(input), [input, pdfUrls])
  const isValidPdfUrl = useMemo(
    () => checkIsValidPdfUrl({ pdfUrl: input }) && pdfUrls.has(input) === false,
    [input, pdfUrls]
  )

  useEffect(() => {
    console.log({
      pdfUrls
    })
    if ((isValidPdfUrl && !isRepeatedPdfUrl) || input === '') {
      setIsError(false)
    }
    if (isRepeatedPdfUrl || !isValidPdfUrl) {
      setIsError(true)
    }
  }, [input])

  return (
    <form className='flex flex-col gap-y-1'>
      <div className='flex flex-col mb-4 gap-y-2'>
        <div className='flex flex-row flex-wrap gap-2 items-center justify-between'>
          <input
            type='url'
            aria-label='PDF URL'
            className='w-full px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='https://example.com/article.pdf'
            pattern='https?://.+\.pdf'
            required
          />
          <button
            type='button'
            className='md:w-full px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer'
            disabled={isError}
            onClick={e => {
              e.preventDefault()
              if (!input) {
                setIsError(true)
                return
              }
              if (!isError && input) {
                setPdfUrls(prevUrls => new Set([...prevUrls, input]))
                setInput('')
              }
            }}
          >
            Add URL
          </button>
        </div>
        {!isError && input && <PdfViewer initialPdfUrl={input} />}
      </div>
      {pdfUrls.size > 0 && (
        <div className='mt-4'>
          <h3 className='text-xl font-semibold'>Selected PDFs:</h3>
          <ul className='flex flex-col list-disc pl-5 mt-2'>
            {Array.from(pdfUrls).map((url, index) => (
              <li key={index} className='mb-3'>
                <div className='flex items-center justify-between bg-slate-900 border border-slate-950 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'>
                  <a
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block text-gray-300 hover:text-gray-500 text-sm break-all'
                  >
                    {url}
                  </a>
                  <button
                    className='text-red-900 hover:text-red-700 hover:cursor-pointer p-4 text-xs bg-slate-900 border border-red-950 rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={() =>
                      setPdfUrls(prev => {
                        const newSet = new Set(prev)
                        newSet.delete(url)
                        return newSet
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type='submit'
        className='mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Start Analysis
      </button>
    </form>
  )
}
