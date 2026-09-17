import { uploadRemotePDF } from "#/utils/upload-remote-pdf";
import { createPartFromUri, GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error('GOOGLE_API_KEY environment variable is not set.');
}
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const content: (string | any)[] = [
  `Analyze the following scientific papers. For each paper, extract the following information:
      - fileName: The display name of the file.
      - title: The full title of the paper.
      - url: The source URL of the paper.
      - source: The journal or conference where it was published.
      - year: The publication year.
      - countries: An array of countries of the authors' affiliations.
      - issn: The ISSN of the journal.
      - authors: An array of objects, each with the author's 'name', 'affiliation', and 'hIndex' (if available, otherwise null).
      - quartiles: The journal's quartile (e.g., 'Q1', 'Q2').
      - resume: A brief summary or abstract of the paper.
      - keywords: A list of keywords.
      - conclusion: The main conclusion of the paper.

      The output must be a single JSON array of objects. Each object should represent one paper. Do not include any other text or explanations outside of the JSON array. If a value is not found, use null.

      Here is an example of the desired output format:
      [
        {
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
        }
      ]
      `,
];
export async function POST(req: NextRequest) {
  try {
    const { pdfUrls } = await req.json()
    console.log({
      pdfUrls
    })

    if (!pdfUrls || !Array.isArray(pdfUrls) || pdfUrls.length === 0) {
      return NextResponse.json({ error: 'At least one PDF URL is required' }, { status: 400 })
    }
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    for (const [index, url] of pdfUrls.entries()) {
      const file = await uploadRemotePDF({
        ai,
        url,
        displayName: `paper-${index + 1}.pdf`,
      });
      if (file.uri && file.mimeType) {
        const fileContent = createPartFromUri(file.uri, file.mimeType);
        content.push(fileContent);
      }
    }

    // const response = await ai.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   contents: content,
    // });

    // console.log({
    //   response_text: response.text
    // });

    return NextResponse.json({ text: 'Get API' }, { status: 200 })
  } catch (error) {
    console.error('Error in Gemini API route:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
