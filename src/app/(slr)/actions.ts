'use server'

import type { SlrAnalysis } from '#/schemas/slr-analysis-response.schema'
import { revalidatePath } from 'next/cache'
import { slrAnalyzer } from './services/slr-analyzer'

interface SrlAnalysisResponse {
  slrAnalysis: SlrAnalysis[]
  success: boolean
  message: string
}

export async function srlAnalysis (
  prevState: {
    success: boolean
    slrAnalysis: SlrAnalysis[]
    message: string
  },
  formData: FormData
) {
  const pdfUrls = Array.from(formData.getAll('pdfUrls') as string[])
  const pdfUrlsOrders = Array.from(formData.getAll('pdfUrls-order') as string[])

  const localPdfFiles = Array.from(formData.getAll('localPdfFiles') as File[])
  const localPdfsOrders = Array.from(
    formData.getAll('localPdfs-order') as string[]
  )

  const pdfUrlsWithOrder = pdfUrls.map((url, index) => ({
    type: 'url' as const,
    value: url,
    order: parseInt(pdfUrlsOrders[index] || '0', 10)
  }))

  const pdfFilesWithOrder = localPdfFiles.map((file, index) => ({
    type: 'file' as const,
    value: file,
    order: parseInt(localPdfsOrders[index] || '0', 10)
  }))

  const pdfsToAnalyze = [...pdfUrlsWithOrder, ...pdfFilesWithOrder]
    .sort((a, b) => a.order - b.order)
    .map(pdf => pdf.value)
    .filter(pdf => pdf != null && pdf !== '')

  console.log({ allPdfs: pdfsToAnalyze })
  try {
    const slrAnalysis = await slrAnalyzer({
      pdfs: pdfsToAnalyze
    })

    // console.log({
    //   slrAnalysis
    // })

    revalidatePath('/')
    return {
      slrAnalysis,
      success: true,
      message: 'SLR analysis run successfully.'
    } as SrlAnalysisResponse
  } catch (error) {
    console.trace('Error during SLR analysis:', error)
    return {
      slrAnalysis: [],
      success: false,
      message:
        'There was an error starting the SLR analysis. Please try again later.'
    } as SrlAnalysisResponse
  }
}
