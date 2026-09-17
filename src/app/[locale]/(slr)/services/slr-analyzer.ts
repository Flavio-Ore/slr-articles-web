import { uploadPdfToGemini } from '#/app/[locale]/(slr)/services/upload-pdf-to-gemini'
import { ai } from '#/config/ai'
import type { SlrAnalysis } from '#/schemas/slr-analysis-response.schema'
import { createPartFromUri, type Part } from '@google/genai'

const promptParts: (string | Part)[] = [
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
  
      **For Word Frequency and Text Analysis:**
      - mostFrequentWords: Array of the 10 most frequent meaningful words (excluding stop words) with their counts [{"word": "machine", "count": 45}, {"word": "learning", "count": 38}].
      - titleWords: Array of words from the title for title word cloud analysis.
      - abstractWords: Array of the 10 most frequent words from the abstract.
      - technicalTerms: Array of the 10 most frequent technical terms, acronyms, and specialized vocabulary found in the paper.
      - citedAuthors: Array of the most cited authors mentioned in references (top 10).

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
          "conclusion": "In conclusion, LLMs have shown remarkable capabilities but also present significant challenges...", 
          "mostFrequentWords": [
            {"word": "machine", "count": 89},
            {"word": "learning", "count": 76},
            {"word": "healthcare", "count": 65},
            {"word": "diagnosis", "count": 45},
            {"word": "treatment", "count": 40}
          ],
          "titleWords": ["Machine", "Learning", "Healthcare", "Comprehensive", "Review"],
          "abstractWords": ["machine", "learning", "healthcare", "diagnosis", "treatment", "accuracy"],
          "technicalTerms": ["CNN", "RNN", "SVM", "Random Forest", "Deep Learning"],
        }
      ]
      `
]

export async function slrAnalyzer ({
  pdfs = []
}: {
  pdfs: Array<string | File>
}): Promise<SlrAnalysis[]> {
  if (pdfs.length === 0) {
    console.warn('No PDFs provided for analysis.')
    return []
  }

  for (const [index, pdf] of pdfs.entries()) {
    console.log({
      slrAnalyzer_pdf: pdf
    })
    const file = await uploadPdfToGemini({
      pdf,
      displayName: `PDF ${index + 1}`
    })
    if (file != null && file.uri && file.mimeType) {
      const pdfPart = createPartFromUri(file.uri, file.mimeType)
      console.log({
        fileContent: pdfPart
      })
      promptParts.push(pdfPart)
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptParts,
      config: {
        responseMimeType: 'application/json',
        thinkingConfig: {
          includeThoughts: false
        }
      }
    })

    if (!response || !response.text) {
      console.warn('No response text received from AI model.')
      return []
    }

    console.log({
      responseText: response?.text
    })

    return JSON.parse(response?.text ?? '')
  } catch (error) {
    console.error('Error during SLR analysis:', error)
    return []
  }
}
