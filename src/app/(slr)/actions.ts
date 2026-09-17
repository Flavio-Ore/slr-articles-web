'use server'

import type { SlrAnalysis } from "#/schemas/slr-analysis-response.schema"
import { revalidatePath } from "next/cache"
import { slrAnalyzer } from "./services/slr-analyzer"

interface SrlAnalysisResponse {
  pdfUrls: Set<string>
  slrAnalysis: SlrAnalysis[]
  success: boolean
  message: string
}

export async function srlAnalysis(
  prevState: {
    success: boolean
    pdfUrls: Set<string>
    slrAnalysis: SlrAnalysis[]
    message: string
  },
  formData: FormData
) {
  const pdfUrlList = formData.getAll('pdfUrls') as string[]

  console.log({
    formDataEntries: Array.from(pdfUrlList)
  })

  try {
    const slrAnalysis = await slrAnalyzer({
      pdfUrls: pdfUrlList
    })

    console.log({
      slrAnalysis
    })

    revalidatePath('/')
    return {
      pdfUrls: new Set<string>(),
      slrAnalysis,
      success: true,
      message: 'SLR analysis run successfully.',
    } as SrlAnalysisResponse
  } catch (error) {
    console.trace('Error during SLR analysis:', error)
    return {
      pdfUrls: new Set<string>(pdfUrlList),
      slrAnalysis: [],
      success: false,
      message: 'There was an error starting the SLR analysis. Please try again later.'
    } as SrlAnalysisResponse
  }
}