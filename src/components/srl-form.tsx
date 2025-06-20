'use client'

import { srlAnalysis } from '#/app/(root)/actions'
import PdfViewer from '#/components/pdf-viewer'
import { useDebounce } from '#/hooks/use-debounce'
import { cn } from '#/lib/utils'
import { checkIsValidPdfUrl } from '#/utils/check-is-valid-pdf-url'
import { Button } from '#shadcn/button'
import { Input } from '#shadcn/input'
import { LoaderCircleIcon, Plus } from 'lucide-react'
import { useActionState, useEffect, useMemo, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
export default function SlrForm () {
  const [slrAnalysisState, slrAnalysisFormAction] = useActionState(
    srlAnalysis,
    {
      pdfUrls: new Set<string>(),
      message: 'useFormState initial state',
      slrAnalysis: [],
      success: false
    }
  )
  console.log({
    slrAnalysisState
  })

  const [inputValue, setInputValue] = useState<string>('')
  const debouncedValue = useDebounce(inputValue)
  const [pdfUrls, setPdfUrls] = useState(
    new Set<string>(slrAnalysisState.pdfUrls)
  )
  const [isError, setIsError] = useState<boolean>(false)

  const isRepeatedPdfUrl = useMemo(
    () => pdfUrls.has(debouncedValue),
    [debouncedValue, pdfUrls]
  )
  const isValidPdfUrl = useMemo(
    () =>
      checkIsValidPdfUrl({ pdfUrl: debouncedValue }) &&
      pdfUrls.has(debouncedValue) === false,
    [debouncedValue, pdfUrls]
  )

  useEffect(() => {
    if (slrAnalysisState.success) {
      toast.success(slrAnalysisState.message, {
        description: 'SLR analysis started successfully with the provided PDFs.'
      })
    } else if (slrAnalysisState.message) {
      toast.error(slrAnalysisState.message, {
        description: 'There was an error starting the SLR analysis.'
      })
    }
  }, [slrAnalysisState.success])

  return (
    <form
      action={slrAnalysisFormAction}
      className='w=full flex flex-col gap-y-1'
    >
      {pdfUrls.size > 0 &&
        Array.from(pdfUrls).map(url => (
          <input
            key={url}
            type='hidden'
            name='pdfUrls'
            className='hidden'
            value={url}
          />
        ))}
      <div className='flex flex-col mb-4 gap-y-2'>
        {!isValidPdfUrl && debouncedValue !== '' && (
          <span className='text-red-600 mt-2'>
            Please enter a valid PDF URL.
          </span>
        )}
        {isValidPdfUrl && debouncedValue !== '' && (
          <span className='text-green-600 text-sm'>Valid PDF URL</span>
        )}
        <div className='flex flex-row gap-2 items-center'>
          <Input
            type='text'
            aria-label='PDF URL'
            className={cn(
              'flex-1 px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2',
              {
                'focus:ring-purple-900': !isValidPdfUrl && !isRepeatedPdfUrl,
                'border-red-500':
                  isError || (!isValidPdfUrl && debouncedValue !== ''),
                'border-green-500':
                  isValidPdfUrl && !isRepeatedPdfUrl && !isError,
                'focus:ring-red-500':
                  isError || (!isValidPdfUrl && debouncedValue !== ''),
                'focus:ring-green-500':
                  isValidPdfUrl && !isRepeatedPdfUrl && !isError
              }
            )}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder='Enter your Scientific Article PDF URL...'
            pattern='https?://.+\.pdf'
          />
          <Button
            type='button'
            onClick={e => {
              e.preventDefault()
              if (!debouncedValue) {
                setIsError(true)
                return
              }
              if (
                isValidPdfUrl &&
                !isRepeatedPdfUrl &&
                !isError &&
                debouncedValue
              ) {
                setPdfUrls(prevUrls => new Set([...prevUrls, debouncedValue]))
                setInputValue('')
              }
            }}
            className={cn(
              'px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 hover:cursor-pointer',
              {
                'bg-red-700 opacity-50 cursor-not-allowed':
                  !isValidPdfUrl || isRepeatedPdfUrl || isError
              }
            )}
            disabled={!isValidPdfUrl || isRepeatedPdfUrl || isError}
          >
            <Plus size={18} className='inline-block' />
          </Button>
        </div>
        {!isError && debouncedValue && (
          <PdfViewer initialPdfUrl={debouncedValue} />
        )}
      </div>
      {pdfUrls.size > 0 && (
        <div className='flex flex-col gap-y-2'>
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
                  <Button
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
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <SubmitButton isDisabled={pdfUrls.size <= 0} />
    </form>
  )
}

export function SubmitButton ({ isDisabled = false }: { isDisabled?: boolean }) {
  const formStatus = useFormStatus()
  return (
    <Button
      type='submit'
      className='mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
      disabled={isDisabled}
    >
      {formStatus.pending ? (
        <LoaderCircleIcon
          className='inline-block mr-2 animate-spin'
          size={28}
        />
      ) : (
        <span className='text-sm font-semibold'>START SLR ANALYSIS</span>
      )}
    </Button>
  )
}
