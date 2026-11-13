import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { localeCodes, type SiteLocale } from '@/components/XonHome/content'

export function generateStaticParams() {
  return localeCodes.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!localeCodes.includes(locale as SiteLocale)) notFound()
  return children
}
