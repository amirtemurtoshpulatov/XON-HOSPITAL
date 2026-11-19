import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { XonAnalytics } from '@/components/XonAnalytics'
import { AdminBar } from '@/components/AdminBar'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode, headers } from 'next/headers'

import './globals.css'
import { indexableSite, siteOrigin } from '@/lib/xonSeo'
import { xonIcons, xonLogo } from '@/lib/xonBrand'
import { localeCodes } from '@/components/XonHome/content'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [{ isEnabled }, requestHeaders] = await Promise.all([draftMode(), headers()])
  const locale = localeCodes.find((code) => code === requestHeaders.get('x-xon-locale')) || 'ru'

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang={locale} suppressHydrationWarning>
      <head>
        <InitTheme />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {children}
          {!isEnabled && process.env.GA_MEASUREMENT_ID && <XonAnalytics measurementId={process.env.GA_MEASUREMENT_ID} locale={locale} />}
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
  icons: xonIcons,
  openGraph: mergeOpenGraph({
    images: [{ url: xonLogo.src, width: xonLogo.width, height: xonLogo.height, alt: 'XON HOSPITAL' }],
  }),
  twitter: {
    card: 'summary_large_image',
  },
}
