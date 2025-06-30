import '#/app/globals.css'
import { ThemeProvider } from '#/components/providers/theme-provider'
import { Toaster } from '#/components/ui/sonner'
import { routing } from '#/i18n/routing'
import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

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
    'This platform allows you to manage and view PDF articles related to Systematic Literature Reviews (SLRs).',
  keywords: [
    'Systematic Literature Review',
    'SLR',
    'AI',
    'artificial intelligence',
    'research papers',
    'academic articles',
    'science',
    'pdf'
  ],
  authors: [{ name: 'Your Name or Organization' }],
  creator: 'Flavio Gonzalo Oré',
  publisher: 'Flavio Gonzalo Oré',
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
  // alternates: {
  //   canonical: 'https://slr-articles.com' // Replace with your actual domain
  // },
  openGraph: {
    title: 'SLR Articles',
    description:
      'A curated collection of Systematic Literature Review (SLR) articles and research papers.',
    // url: 'https://slr-articles.com', // Replace with your actual domain
    siteName: 'SLR Articles',
    // images: [
    //   {
    //     url: '/og-image.png', // Replace with your actual OG image path
    //     width: 1200,
    //     height: 630,
    //     alt: 'SLR Articles'
    //   }
    // ],
    locale: 'en_US',
    type: 'website'
  }
}

export default async function RootLayout ({
  children,
  params
}: Readonly<{
  children: ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name='theme-color' content='#ffffff' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
