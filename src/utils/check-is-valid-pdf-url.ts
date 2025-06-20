export const checkIsValidPdfUrl = ({ pdfUrl }: { pdfUrl: string }) => {
  if (!pdfUrl || pdfUrl.trim() === '') {
    return false
  }
  try {
    const url = new URL(pdfUrl)
    return url.pathname.endsWith('.pdf')
  } catch {
    return pdfUrl.endsWith('.pdf')
  }
}
