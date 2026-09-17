'use client'

import { type ChangeEvent, useState } from 'react'

interface PdfViewerProps {
  initialPdfUrl?: string
}

export default function PdfViewer ({ initialPdfUrl = '' }: PdfViewerProps) {
  const [pdfUrl, setPdfUrl] = useState(initialPdfUrl)
  const [inputUrl, setInputUrl] = useState('')

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value)
  }

  const handleLoadPdf = () => {
    if (inputUrl) {
      setPdfUrl(inputUrl)
    }
  }

  return (
    <section>
      <h2>PDF Viewer</h2>
      <div>
        <input
          type='text'
          value={inputUrl}
          onChange={handleUrlChange}
          placeholder='Enter PDF URL'
          aria-label='PDF URL Input'
        />
        <button onClick={handleLoadPdf}>Load PDF</button>
      </div>
      {pdfUrl && (
        <div style={{ marginTop: '20px' }}>
          <iframe
            src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
            style={{ width: '100%', height: '75vh', border: 'none' }}
            title='PDF Viewer'
            aria-label='PDF Viewer'
          />
        </div>
      )}
    </section>
  )
}
