import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { articleCopy, articleSlugs } from '@/lib/xonArticles'
import { xonCopy } from '@/lib/xonCopy'
import { getPayload } from 'payload'
import config from '@payload-config'
import { listArticles } from '@/lib/clinicContent'
import { sectionMetadata } from '@/lib/xonSeo'

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return sectionMetadata(params, '/articles')
}

export default async function ArticlesPage({ params }: { params: Promise<{ locale: SiteLocale }> }) {
  const { locale } = await params
  if (!localeCodes.includes(locale)) notFound()
  const ui = xonCopy(locale)
  const payload = await getPayload({ config })
  const [{ docs }, articles] = await Promise.all([
    payload.find({
      collection: 'pages',
      locale,
      fallbackLocale: false,
      overrideAccess: false,
      where: { slug: { like: 'guide-' }, _status: { equals: 'published' } },
      limit: 50,
      depth: 0,
    }),
    listArticles(locale),
  ])
  const guides = docs.filter((page) => page.slug?.startsWith('guide-') && page.title && page.layout?.length)
  const publishedSlugs = new Set(articles.map((article) => article.slug))
  return <XonInterior locale={locale} videoSection="articles" eyebrow="XON HOSPITAL" title={ui.journal} intro={ui.journalIntro}>
    <section className="xon-page-content xon-list-grid">
      {articles.map((article) => (
        <Link className="xon-list-card" key={article.slug} href={`/${locale}/articles/${article.slug}`}>
          <h2>{article.title}</h2><p>{article.description}</p><ArrowUpRight aria-hidden="true" />
        </Link>
      ))}
      {articleSlugs.filter((slug) => !publishedSlugs.has(slug)).map((slug) => {
        const article = articleCopy(locale, slug)!
        return <Link className="xon-list-card" key={slug} href={`/${locale}/articles/${slug}`}>
          <h2>{article.title}</h2><p>{article.description}</p><ArrowUpRight />
        </Link>
      })}
      {guides.map((page) => <Link className="xon-list-card" key={page.id} href={`/${locale}/page/${page.slug}`}><h2>{page.title}</h2><ArrowUpRight /></Link>)}
    </section>
  </XonInterior>
}
