import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { articleCopy, articleSlugs } from '@/lib/xonArticles'
import { xonCopy } from '@/lib/xonCopy'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function ArticlesPage({ params }: { params: Promise<{ locale: SiteLocale }> }) {
  const { locale } = await params
  if (!localeCodes.includes(locale)) notFound()
  const ui = xonCopy(locale)
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    locale,
    fallbackLocale: false,
    overrideAccess: false,
    where: { slug: { like: 'guide-' }, _status: { equals: 'published' } },
    limit: 50,
    depth: 0,
  })
  const guides = docs.filter((page) => page.slug?.startsWith('guide-') && page.title && page.layout?.length)
  return <XonInterior locale={locale} eyebrow="XON HOSPITAL" title={ui.journal}>
    <section className="xon-page-content xon-list-grid">
      {articleSlugs.map((slug) => {
        const article = articleCopy(locale, slug)!
        return <Link className="xon-list-card" key={slug} href={`/${locale}/articles/${slug}`}>
          <h2>{article.title}</h2><p>{article.description}</p><ArrowUpRight />
        </Link>
      })}
      {guides.map((page) => <Link className="xon-list-card" key={page.id} href={`/${locale}/page/${page.slug}`}><h2>{page.title}</h2><ArrowUpRight /></Link>)}
    </section>
  </XonInterior>
}
