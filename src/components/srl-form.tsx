'use client'

import { srlAnalysis } from '#/app/(root)/actions'
import PdfViewer from '#/components/pdf-viewer'
import { useDebounce } from '#/hooks/use-debounce'
import { cn } from '#/lib/utils'
import { checkIsValidPdfUrl } from '#/utils/check-is-valid-pdf-url'
import { Button } from '#shadcn/button'
import { Input } from '#shadcn/input'
import {
  LinkIcon,
  LoaderCircleIcon,
  PlusIcon,
  TrashIcon,
  XIcon
} from 'lucide-react'
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
        id: 'slr-analysis-success',
        richColors: true,
        position: 'top-center',
        action: {
          label: <XIcon size={16} className='inline-block' />,
          onClick: () => {
            toast.dismiss('slr-analysis-success')
          }
        }
      })
    } else if (slrAnalysisState.message) {
      toast.error(slrAnalysisState.message, {
        description: 'There was an error starting the SLR analysis.'
      })
    }
  }, [slrAnalysisState])

  return (
    <form action={slrAnalysisFormAction} className='flex flex-col gap-y-1'>
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
        {isRepeatedPdfUrl && debouncedValue !== '' && (
          <span className='text-red-500 dark:text-red-400 mt-2'>
            This PDF has already been added.
          </span>
        )}
        {!isValidPdfUrl && !isRepeatedPdfUrl && debouncedValue !== '' && (
          <span className='text-red-500 dark:text-red-400 mt-2'>
            Please enter a valid PDF URL.
          </span>
        )}
        {isValidPdfUrl && debouncedValue !== '' && (
          <span className='text-green-600 text-sm'>Valid PDF URL</span>
        )}
        <div className='flex flex-row gap-x-2 items-center'>
          <Input
            type='text'
            name='pdfUrls'
            aria-label='PDF URL'
            className={cn('px-2 py-6 border border-sky-900 rounded-md', {
              'focus:ring-purple-900': !isValidPdfUrl && !isRepeatedPdfUrl,
              'border-red-500':
                isError || (!isValidPdfUrl && debouncedValue !== ''),
              'border-green-500':
                isValidPdfUrl && !isRepeatedPdfUrl && !isError,
              'focus:ring-red-500':
                isError || (!isValidPdfUrl && debouncedValue !== ''),
              'focus:ring-green-500':
                isValidPdfUrl && !isRepeatedPdfUrl && !isError
            })}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder='Enter your Scientific Article PDF URL...'
            pattern='https?://.+\.pdf'
          />
          <Button
            type='button'
            className={cn(
              'p-6 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 hover:cursor-pointer',
              {
                'bg-red-500/70 hover:bg-red-600 text-white':
                  !isValidPdfUrl || isRepeatedPdfUrl || isError
              }
            )}
            onClick={e => {
              e.preventDefault()
              if (!inputValue) {
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
            disabled={!isValidPdfUrl || isRepeatedPdfUrl || isError}
          >
            <PlusIcon className='size-6' />
          </Button>
        </div>
        {!isError && debouncedValue && (
          <PdfViewer initialPdfUrl={debouncedValue} />
        )}
      </div>
      {pdfUrls.size > 0 && (
        <div className='flex flex-col gap-y-2'>
          <h3 className='text-xl font-semibold'>Selected Documents:</h3>
          <ul className='grid gap-3'>
            {Array.from(pdfUrls).map((url, index) => (
              <li
                key={url}
                className='group flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]'
              >
                <div className='flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
                  <LinkIcon
                    className='text-blue-600 dark:text-blue-400'
                    size={18}
                  />
                </div>

                <div className='flex-1 min-w-0'>
                  <a
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm md:break-normal break-all overflow-ellipsis font-medium truncate transition-colors duration-200 text-wrap'
                    title={url}
                  >
                    {url}
                  </a>
                  <p className='text-xs text-slate-500 dark:text-slate-400 mt-1'>
                    PDF #{index + 1}
                  </p>
                </div>

                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  className='flex-shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-800/20 border-red-200 dark:border-red-800 hover:cursor-pointer transition-colors duration-200 opacity-80 group-hover:opacity-100'
                  onClick={() =>
                    setPdfUrls(prevUrls => {
                      const newUrls = new Set(prevUrls)
                      newUrls.delete(url)
                      return newUrls
                    })
                  }
                >
                  <TrashIcon size={18} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <SubmitButton isDisabled={pdfUrls.size === 0} />
    </form>
  )
}
export function SubmitButton ({ isDisabled = false }: { isDisabled?: boolean }) {
  const formStatus = useFormStatus()

  return (
    <Button
      type='submit'
      className='mt-6 px-8 py-5 bg-blue-600 dark:bg-blue-300 hover:bg-blue-700 text-white dark:text-black text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-blue-600 hover:cursor-pointer'
      disabled={isDisabled}
    >
      <div className='flex items-center justify-center gap-3'>
        {formStatus.pending ? (
          <>
            <LoaderCircleIcon className='animate-spin' size={20} />
            <span>Analyzing PDFs...</span>
          </>
        ) : (
          <span>Start Analysis!</span>
        )}
      </div>
    </Button>
  )
}
