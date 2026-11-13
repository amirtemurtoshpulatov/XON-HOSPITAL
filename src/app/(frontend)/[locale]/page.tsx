import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { XonHome } from '@/components/XonHome'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!localeCodes.includes(locale as SiteLocale)) notFound()
  return <XonHome locale={locale as SiteLocale} />
}

export const metadata: Metadata = {
  title: 'XON HOSPITAL — многопрофильная клиника',
  description: 'Консультация, диагностика, лечение, восстановление и наблюдение в одной системе заботы.',
}
