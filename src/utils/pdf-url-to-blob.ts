'use server'

export async function pdfUrlToBlob ({ url }: { url: string | URL }) {
  if (typeof url === 'string') {
    url = new URL(url)
    console.log({ url: new URL(url) })
  }
  if (!(url instanceof URL)) {
    throw new Error('Invalid URL provided')
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('URL must be an HTTP or HTTPS URL')
  }
  if (!url.pathname.endsWith('.pdf')) {
    throw new Error('URL must point to a PDF file')
  }
  if (!url.host) {
    throw new Error('URL must have a valid host')
  }
  if (!url.href) {
    throw new Error('URL must be a valid URL with a href')
  }
  if (!url.origin) {
    throw new Error('URL must have a valid origin')
  }
  if (!url.search) {
    url.search = ''
  }
  if (!url.hash) {
    url.hash = ''
  }

  console.log({ url })
  const pdfBuffer = await fetch(url).then(response => response.arrayBuffer())
  if (!pdfBuffer || pdfBuffer.byteLength === 0) {
    throw new Error(
      'Failed to fetch PDF from the provided URL or the PDF is empty'
    )
  }
  console.log({ pdfBuffer })
  return new Blob([pdfBuffer], { type: 'application/pdf' })
}
