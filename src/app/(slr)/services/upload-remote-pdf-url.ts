import { ai } from '#/config/ai'
import { pdfUrlToBlob } from '#/utils/pdf-url-to-blob'
import type { GetFileParameters } from '@google/genai'

export async function uploadRemotePdfUrl (url: string, displayName: string) {
  if (url.trim() === '') {
    return null
  }
  const fileBlob = await pdfUrlToBlob({ url })
  const file = await ai.files.upload({
    file: fileBlob,
    config: {
      displayName: displayName
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
