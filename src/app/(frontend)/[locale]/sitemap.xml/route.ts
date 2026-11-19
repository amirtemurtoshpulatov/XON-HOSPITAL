import { getServerSideSitemap } from 'next-sitemap'

import { localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { clinicSitemap } from '@/lib/xonSitemap'

export const dynamic = 'force-dynamic'

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!localeCodes.includes(locale as SiteLocale)) return new Response(null, { status: 404 })
  const entries = (await clinicSitemap()).filter((entry) => {
    const path = new URL(entry.url).pathname
    return path === `/${locale}` || path.startsWith(`/${locale}/`)
  })
  return getServerSideSitemap(entries.map((entry) => ({
    loc: entry.url,
    lastmod: entry.lastModified instanceof Date ? entry.lastModified.toISOString() : entry.lastModified,
    alternateRefs: Object.entries(entry.alternates?.languages || {}).flatMap(([hreflang, href]) => href ? [{ hreflang, href }] : []),
    images: entry.images?.map((url) => ({ loc: new URL(url) })),
  })))
}
