'use server'

import type { SlrAnalysis } from "#/schemas/slr-analysis-response.schema"
import { revalidatePath } from "next/cache"

export async function srlAnalysis(
  prevState: {
    success: boolean
    pdfUrls: Set<string>
    slrAnalysis: SlrAnalysis[]
    message: string
  },
  formData: FormData
) {
  const pdfUrl = formData.get('pdfUrl') as string
  console.log({
    pdfUrl
  })

  // Here you would typically call an API or perform some action with the data
  // For now, we just log it to the console
  revalidatePath('/')
  return {
    pdfUrls: new Set<string>([...prevState.pdfUrls, pdfUrl]),
    slrAnalysis: [],
    success: true,
    message: 'Systematic Literature Review started successfully'
  }
}