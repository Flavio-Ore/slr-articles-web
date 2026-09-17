import { ai } from '#/config/ai'
import { checkIsValidPdfUrl } from '#/utils/check-is-valid-pdf-url'
import { pdfUrlToBlob } from '#/utils/pdf-url-to-blob'
import type { GetFileParameters } from '@google/genai'

export async function uploadPdfToGemini ({
  pdf,
  displayName
}: {
  pdf: string | File
  displayName: string
}) {
  let fileBlob: Blob

  if (typeof pdf === 'string') {
    if (
      !checkIsValidPdfUrl({
        pdfUrl: pdf
      })
    ) {
      return null
    }
    fileBlob = await pdfUrlToBlob({ url: pdf })
  } else {
    fileBlob = pdf
  }
  console.log({
    fileBlob
  })
  const file = await ai.files.upload({
    file: fileBlob,
    config: {
      displayName
    }
  })

  const config: GetFileParameters = {
    name: file?.name ?? ''
  }

  console.log({
    config
  })

  let getFile = await ai.files.get(config)

  while (getFile.state === 'PROCESSING') {
    console.log(`current file status (before ai): ${getFile.state}`)
    getFile = await ai.files.get(config)
    console.log(`current file status (after ai): ${getFile.state}`)
  }

  if (file.state === 'FAILED') {
    throw new Error('File processing failed.')
  }

  return file
}
