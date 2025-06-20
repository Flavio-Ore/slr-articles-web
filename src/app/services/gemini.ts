export async function callGeminiApi({ pdfUrls = [] }: { pdfUrls: string[] }) {
  if (!pdfUrls || !Array.isArray(pdfUrls) || pdfUrls.length === 0) {
    throw new Error('At least one PDF URL is required')
  }
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      throw new Error('Failed to get a response from the Gemini API')
    }

    const data = await response.json()
    return data.text
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    throw error
  }
}
