export const checkIsValidPdfUrl = ({ pdfUrl }: { pdfUrl: string }) => {
  return pdfUrl != null && pdfUrl !== '' && (pdfUrl.endsWith('.pdf') || pdfUrl.startsWith('http'))
}