import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { ReactNode } from 'react'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    default: 'SLR Articles',
    template: '%s | SLR Articles'
  },
  description:
    'A curated collection of Systematic Literature Review (SLR) articles and research papers on various topics.',
  keywords: [
    'Systematic Literature Review',
    'SLR',
    'research papers',
    'academic articles',
    'science'
  ],
  authors: [{ name: 'Your Name or Organization' }],
  creator: 'Your Name or Organization',
  publisher: 'Your Name or Organization',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: 'https://slr-articles.com' // Replace with your actual domain
  },
  openGraph: {
    title: 'SLR Articles',
    description:
      'A curated collection of Systematic Literature Review (SLR) articles and research papers.',
    url: 'https://slr-articles.com', // Replace with your actual domain
    siteName: 'SLR Articles',
    images: [
      {
        url: '/og-image.png', // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: 'SLR Articles'
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
}

export default function RootLayout ({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en' className={geistSans.className}>
      <head>
        <meta name='theme-color' content='#ffffff' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
