import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { localeCodes, type SiteLocale } from '@/components/XonHome/content'

// CMS content is loaded from PostgreSQL at request time. Keeping this segment
// dynamic lets the Docker image build before the production database exists.
export const dynamic = 'force-dynamic'

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!localeCodes.includes(locale as SiteLocale)) notFound()
  return children
}
