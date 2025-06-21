import { uploadRemotePdfUrl } from '#/app/(slr)/services/upload-remote-pdf-url'
import { ai } from '#/config/ai'
import type { SlrAnalysis } from '#/schemas/slr-analysis-response.schema'
import { createPartFromUri, type Part } from '@google/genai'

const PROMPT: (string | Part)[] = [
  `Analyze the following scientific papers. For each paper, extract the following information:
      - title: The full title of the paper.
      - url: The source URL of the paper.
      - source: The journal or conference where it was published.
      - year: The publication year.
      - countries: An array of countries of the authors' affiliations.
      - issn: The ISSN of the journal.
      - publicationType: The type of publication (e.g., 'Scientific Article', 'Review Paper').
      - numberOfCitations: The total number of citations the paper has received.
      - authors: An array of objects, each with the author's 'name', 'affiliation', and 'hIndex' (if available, otherwise null).
      - quartiles: The journal's quartile (e.g., 'Q1', 'Q2').
      - resume: A brief summary or abstract of the paper.
      - keywords: A list of keywords.
      - conclusion: The main conclusion of the paper.

      The output must be a single JSON array of objects. Each object should represent one paper. Do not include any other text or explanations outside of the JSON array. If a value is not found, use null.

      Here is an example of the desired output format:
      [
        {
          "title": "The Rise of Large Language Models: A Survey",
          "url": "https://example.com/article1",
          "source": "Journal of AI Research",
          "year": 2023,
          "countries": ["USA", "UK"],
          "issn": "1234-5678",
          "publicationType": "Scientific Article",
          "numberOfCitations": 150,
          "authors": [
            { "name": "Jane Doe", "affiliation": "AI University", "hIndex": 42 },
            { "name": "John Smith", "affiliation": "Tech Corp", "hIndex": 35 }
          ],
          "quartiles": "Q1",
          "resume": "This paper provides a comprehensive survey of recent advancements in large language models...",
          "keywords": ["LLM", "NLP", "Artificial Intelligence", "Survey"],
          "conclusion": "In conclusion, LLMs have shown remarkable capabilities but also present significant challenges..."
        }
      ]
      `
]

export async function slrAnalyzer ({
  pdfUrls = []
}: {
  pdfUrls: string[]
}): Promise<SlrAnalysis[]> {
  for (const [index, url] of pdfUrls.entries()) {
    const file = await uploadRemotePdfUrl(url, `PDF ${index + 1}`)
    if (file != null && file.uri && file.mimeType) {
      const fileContent = createPartFromUri(file.uri, file.mimeType)
      console.log({
        fileContent
      })
      PROMPT.push(fileContent)
    }
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: PROMPT,
    config: {
      responseMimeType: 'application/json'
    }
  })

  console.log({
    responseText: response?.text
  })

  try {
    return JSON.parse(response?.text ?? '')
  } catch (error) {
    console.error('Error parsing JSON response:', error)
    return []
  }
}
