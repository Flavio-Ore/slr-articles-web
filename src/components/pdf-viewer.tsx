'use client'

import { checkIsValidPdfUrl } from '#/utils/check-is-valid-pdf-url'
import { useMemo } from 'react'
interface PdfViewerProps {
  initialPdfUrl?: string
}

export default function PdfViewer ({ initialPdfUrl = '' }: PdfViewerProps) {
  const isValidPdfUrl = useMemo(
    () => checkIsValidPdfUrl({ pdfUrl: initialPdfUrl }),
    [initialPdfUrl]
  )
  return (
    <>
      {isValidPdfUrl && (
        <div className='mt'>
          <iframe
            src={`https://docs.google.com/gview?url=${initialPdfUrl}&embedded=true`}
            style={{ width: '100%', height: '50vh', border: 'none' }}
            title='PDF Viewer'
            aria-label='PDF Viewer'
          />
        </div>
      )}
    </>
  )
}
