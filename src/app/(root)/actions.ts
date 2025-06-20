'use server'

import type { SlrAnalysis } from "#/schemas/slr-analysis-response.schema"
import { revalidatePath } from "next/cache"

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

  // Here you would typically call an API or perform some action with the data
  // For now, we just log it to the console
  revalidatePath('/')
  return {
    pdfUrls: new Set<string>(),
    slrAnalysis: [{
      "fileName": "article1.pdf",
      "title": "The Rise of Large Language Models: A Survey",
      "url": "https://example.com/article1",
      "source": "Journal of AI Research",
      "year": 2023,
      "countries": ["USA", "UK"],
      "issn": "1234-5678",
      "authors": [
        { "name": "Jane Doe", "affiliation": "AI University", "hIndex": 42 },
        { "name": "John Smith", "affiliation": "Tech Corp", "hIndex": 35 }
      ],
      "quartiles": "Q1",
      "resume": "This paper provides a comprehensive survey of recent advancements in large language models...",
      "keywords": ["LLM", "NLP", "Artificial Intelligence", "Survey"],
      "conclusion": "In conclusion, LLMs have shown remarkable capabilities but also present significant challenges..."

    }],
    success: true,
    message: 'This action was called successfully with the provided PDF URLs.',
  } as SrlAnalysisResponse
}