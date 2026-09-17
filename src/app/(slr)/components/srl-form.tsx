'use client'

import { srlAnalysis } from '#/app/(slr)/actions'
import { cn } from '#/lib/utils'
import { checkIsValidPdfUrl } from '#/utils/check-is-valid-pdf-url'
import { Button } from '#shadcn/button'
import { Input } from '#shadcn/input'
import {
  ExternalLinkIcon,
  FileIcon,
  LoaderCircleIcon,
  PlusIcon,
  TrashIcon,
  XIcon
} from 'lucide-react'
import { useActionState, useEffect, useMemo, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import SlrResults from './slr-results'

export default function SlrForm () {
  const [slrAnalysisState, slrAnalysisFormAction] = useActionState(
    srlAnalysis,
    {
      message: 'The SLR analysis is ready to be started. 🔍',
      slrAnalysis: [],
      success: false
    }
  )
  const [inputValue, setInputValue] = useState<string>('')
  const [pdfUrls, setPdfUrls] = useState(new Set<string>(new Set<string>()))
  const [isError, setIsError] = useState<boolean>(false)

  console.log({
    slrAnalysisState
  })

  const isRepeatedPdfUrl = useMemo(
    () => pdfUrls.has(inputValue),
    [inputValue, pdfUrls]
  )
  const isValidPdfUrl = useMemo(
    () =>
      checkIsValidPdfUrl({ pdfUrl: inputValue }) &&
      pdfUrls.has(inputValue) === false,
    [inputValue, pdfUrls]
  )

  useEffect(() => {
    if (isRepeatedPdfUrl || !isValidPdfUrl) {
      setIsError(true)
    } else {
      setIsError(false)
    }
  }, [isRepeatedPdfUrl, isValidPdfUrl, inputValue])

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
      toast.error(slrAnalysisState.message)
    }
  }, [slrAnalysisState])

  return (
    <div className='flex flex-col'>
      <form action={slrAnalysisFormAction} className='flex flex-col gap-y-6'>
        {pdfUrls.size > 0 &&
          Array.from(pdfUrls).map(url => (
            <input
              key={url}
              type='hidden'
              name='pdfUrls'
              className='hidden'
              value={url}
              pattern='https?://.+\.pdf'
            />
          ))}
        <div className='flex flex-col gap-y-2'>
          <div className='flex flex-row gap-x-2 items-center'>
            <Input
              type='text'
              name='pdfUrls'
              aria-label='PDF URL'
              className='px-2 py-6 border border-blue-500/50 dark:border-sky-500/50 rounded-md focus:ring-1 focus:ring-sky-500 dark:focus:ring-blue-400 w-full'
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder='https://example.com/document.pdf'
              pattern='https?://.+\.pdf'
            />
            <Button
              type='button'
              className={cn(
                'p-6 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 hover:cursor-pointer',
                {
                  'bg-red-500/70 hover:bg-red-600 text-white':
                    !isValidPdfUrl ||
                    isRepeatedPdfUrl ||
                    isError ||
                    inputValue === ''
                }
              )}
              onClick={e => {
                e.preventDefault()
                if (!inputValue || inputValue.trim() === '') {
                  setIsError(true)
                  return
                }
                if (
                  isValidPdfUrl &&
                  !isRepeatedPdfUrl &&
                  !isError &&
                  inputValue
                ) {
                  setPdfUrls(prevUrls => new Set([...prevUrls, inputValue]))
                  setInputValue('')
                }
              }}
              disabled={
                !isValidPdfUrl ||
                isRepeatedPdfUrl ||
                isError ||
                inputValue === ''
              }
            >
              <PlusIcon className='size-6' />
            </Button>
          </div>
          <Input
            type='file'
            accept='application/pdf'
            id='local-pdfs-input'
            name='localPdfs'
            className='w-full border border-amber-400/50 text-amber-600 dark:text-amber-200 focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 hover:cursor-pointer'
            onChange={e => {
              const files = e.target.files
              if (!files) {
                toast.error('No files selected. Please select PDF files.', {
                  position: 'top-center',
                  richColors: true
                })
                return
              }

              const newUrls = new Set<string>(pdfUrls)
              for (const file of files) {
                if (file.type === 'application/pdf') {
                  newUrls.add(URL.createObjectURL(file))
                } else {
                  toast.error(
                    `File ${file.name} is not a valid PDF. Please select only PDF files.`,
                    {
                      position: 'top-center',
                      richColors: true
                    }
                  )
                }
              }
              setPdfUrls(newUrls)
              e.target.value = ''
            }}
            aria-label='Select local PDF files'
            multiple
          />

          {isRepeatedPdfUrl && inputValue !== '' && (
            <span className='text-red-500 dark:text-red-400 mt-2'>
              This PDF has already been added.
            </span>
          )}
          {!isValidPdfUrl && !isRepeatedPdfUrl && inputValue !== '' && (
            <span className='text-red-500 dark:text-red-400 mt-2'>
              Please enter a valid PDF URL.
            </span>
          )}
          {isValidPdfUrl && inputValue !== '' && (
            <span className='text-green-600 text-sm'>Valid PDF URL</span>
          )}
        </div>
        {pdfUrls.size > 0 && (
          <div className='flex flex-col gap-y-2'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-xl font-semibold bg-gradient-to-r from-sky-50 to-sky-200 bg-clip-text text-transparent'>
                Selected Documents
              </h3>
              <div className='flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full'>
                <span className='text-sm font-medium text-slate-600 dark:text-slate-300'>
                  {pdfUrls.size} {pdfUrls.size === 1 ? 'document' : 'documents'}
                </span>
              </div>
            </div>
            <ul className='grid gap-3'>
              {Array.from(pdfUrls).map((url, index) => (
                <li
                  key={url}
                  className={cn(
                    'group flex items-center gap-3 p-4 bg-gradient-to-r outline rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01] from-zinc-50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-950/50 hover:from-zinc-100 hover:to-zinc-150 dark:hover:from-zinc-800/50 dark:hover:to-zinc-900/50',
                    {
                      'outline-amber-200 dark:outline-amber-700':
                        url.startsWith('blob:'),
                      'outline-blue-200 dark:outline-blue-700':
                        url.startsWith('http') || url.startsWith('https')
                    }
                  )}
                >
                  <div
                    className={cn('flex-shrink-0 p-2 rounded-lg', {
                      'bg-amber-100 dark:bg-amber-900/30':
                        url.startsWith('blob:'),
                      'bg-blue-100 dark:bg-blue-900/30':
                        url.startsWith('http') || url.startsWith('https')
                    })}
                  >
                    {url.startsWith('blob:') && (
                      <FileIcon
                        size={18}
                        className='text-amber-600 dark:text-amber-400'
                      />
                    )}
                    {(url.startsWith('http') || url.startsWith('https')) && (
                      <ExternalLinkIcon
                        size={18}
                        className='text-blue-600 dark:text-blue-400'
                      />
                    )}
                  </div>

                  <div className='flex-1 min-w-0'>
                    <a
                      href={url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={cn(
                        'block hover:underline text-sm md:break-normal break-all overflow-ellipsis font-medium truncate transition-colors duration-200 text-wrap',
                        {
                          'text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200':
                            url.startsWith('blob:'),
                          'text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200':
                            url.startsWith('http') || url.startsWith('https')
                        }
                      )}
                      title={url}
                    >
                      {url}
                    </a>
                    <p
                      className={cn(
                        'text-xs text-slate-500 dark:text-slate-400 mt-1',
                        {
                          'text-amber-500 dark:text-amber-400':
                            url.startsWith('blob:'),
                          'text-sky-500 dark:text-sky-400':
                            url.startsWith('http') || url.startsWith('https')
                        }
                      )}
                    >
                      {url.startsWith('blob:') ? 'Local PDF' : 'External PDF'} #
                      {index + 1}
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
      {slrAnalysisState.success && slrAnalysisState.slrAnalysis.length > 0 && (
        <>
          <hr className='border-t border-slate-200 dark:border-slate-700 my-8' />
          <SlrResults slrAnalysis={slrAnalysisState.slrAnalysis} />
        </>
      )}
    </div>
  )
}

export function SubmitButton ({ isDisabled = false }: { isDisabled?: boolean }) {
  const formStatus = useFormStatus()

  return (
    <Button
      type='submit'
      className='group px-8 py-5 bg-black dark:bg-white hover:bg-sky-500 dark:hover:bg-amber-200 text-white dark:text-black text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-gray-300 hover:cursor-pointer'
      disabled={isDisabled}
    >
      <div className='flex items-center justify-center gap-3'>
        {formStatus.pending ? (
          <>
            <LoaderCircleIcon className='animate-spin' size={20} />
            <span>Analyzing PDFs...</span>
          </>
        ) : (
          <span className='relative before:content-["🔍"] before:absolute before:-left-8 before:top-1/2 before:-translate-y-1/2 before:text-xl before:animate-pulse before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-200 after:content-["🚀"] after:absolute after:-right-8 after:top-1/2 after:-translate-y-1/2 after:text-xl after:animate-pulse after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-200'>
            Start Analysis
          </span>
        )}
      </div>
    </Button>
  )
}
