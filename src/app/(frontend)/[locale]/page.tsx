import { notFound } from 'next/navigation'

import { XonHome } from '@/components/XonHome'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { sectionMetadata } from '@/lib/xonSeo'

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!localeCodes.includes(locale as SiteLocale)) notFound()
  return <XonHome locale={locale as SiteLocale} />
}

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return sectionMetadata(params, '')
}
