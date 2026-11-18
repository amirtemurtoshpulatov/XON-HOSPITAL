import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { indexableSite, siteOrigin } from '@/lib/xonSeo'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="ru" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {children}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  robots: { index: indexableSite(), follow: true },
  title: {
    default: 'XON HOSPITAL — многопрофильная клиника',
    template: '%s | XON HOSPITAL',
  },
  description: 'Диагностика, лечение и реабилитация в многопрофильной клинике XON HOSPITAL.',
  icons: {
    icon: [{ url: '/xon-hospital-logo.jpeg', type: 'image/jpeg' }],
    apple: '/xon-hospital-logo.jpeg',
  },
  openGraph: mergeOpenGraph({
    images: [{ url: '/xon-hospital-logo.jpeg', width: 720, height: 720, alt: 'XON HOSPITAL' }],
  }),
  twitter: {
    card: 'summary_large_image',
  },
}
