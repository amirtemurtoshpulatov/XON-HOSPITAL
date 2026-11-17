import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { XonHome } from '@/components/XonHome'
import { content, localeCodes, type SiteLocale } from '@/components/XonHome/content'

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!localeCodes.includes(locale as SiteLocale)) notFound()
  return <XonHome locale={locale as SiteLocale} />
}

export async function generateMetadata({ params }: { params: Promise<{ locale: SiteLocale }> }): Promise<Metadata> {
  const { locale } = await params
  if (!localeCodes.includes(locale)) return {}
  const copy = content[locale]
  return { title: `${copy.heroTitle} ${copy.heroAccent}`, description: copy.heroText, alternates: { canonical: `/${locale}`, languages: Object.fromEntries(localeCodes.map((code) => [code, `/${code}`])) } }
}
