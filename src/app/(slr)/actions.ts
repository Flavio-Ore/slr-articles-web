'use server'

import type { SlrAnalysis } from '#/schemas/slr-analysis-response.schema'
import { revalidatePath } from 'next/cache'

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
  const rawpdfUrls = formData.getAll('pdfUrls') as string[]
  const pdfUrls = new Set<string>(rawpdfUrls.filter(url => url.trim() !== ''))

  console.log({
    pdfUrlList: Array.from(pdfUrls)
  })

  try {
    //   const slrAnalysis = await slrAnalyzer({
    //     pdfUrls: pdfUrls
    //   })

    const slrAnalysis = Array.from(pdfUrls).map((url, index) => ({
      title: `Article ${index + 1}`,
      url
    }))

    console.log({
      slrAnalysis
    })

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
