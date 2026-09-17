'use client'

import { Input } from '#shadcn/input'

export default function SlrLocalPdfs ({}) {
  return (
    <>
      <Input
        type='file'
        accept='application/pdf'
        multiple
        className='w-full bg-sky-500 dark:bg-sky-800 text-white placeholder:text-sky-200 dark:placeholder:text-sky-300 focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400'
        placeholder='Select local PDF files'
        aria-label='Select local PDF files'
        id='local-pdfs-input'
        name='localPdfs'
      />
    </>
  )
}
