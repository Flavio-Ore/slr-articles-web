'use server'

import type { SlrAnalysis } from "#/schemas/slr-analysis-response.schema"
import { revalidatePath } from "next/cache"
import { slrAnalyzer } from "./services/slr-analyzer"

interface SrlAnalysisResponse {
  slrAnalysis: SlrAnalysis[]
  success: boolean
  message: string
}

export async function srlAnalysis(
  prevState: {
    success: boolean
    slrAnalysis: SlrAnalysis[]
    message: string
  },
  formData: FormData
) {
  const pdfUrls = formData.getAll('pdfUrls') as string[]

  console.log({
    pdfUrlList: Array.from(pdfUrls)
  })

  try {
    const slrAnalysis = await slrAnalyzer({
      pdfUrls: pdfUrls
    })

    console.log({
      slrAnalysis
    })

    revalidatePath('/')
    return {
      success: true,
      message: 'SLR analysis run successfully.',
    } as SrlAnalysisResponse
  } catch (error) {
    console.trace('Error during SLR analysis:', error)
    return {
      slrAnalysis: [],
      success: false,
      message: 'There was an error starting the SLR analysis. Please try again later.'
    } as SrlAnalysisResponse
  }
}