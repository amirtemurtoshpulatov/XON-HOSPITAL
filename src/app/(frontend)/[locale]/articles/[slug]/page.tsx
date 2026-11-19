import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { XonInterior } from '@/components/XonInterior'
import { ClinicBreadcrumbs } from '@/components/ClinicBreadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import { XonArticleBody } from '@/components/XonArticleBody'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { articleLocales, findArticle } from '@/lib/clinicContent'
import { articleCopy } from '@/lib/xonArticles'
import { xonCopy } from '@/lib/xonCopy'
import { pageSEO, siteOrigin } from '@/lib/xonSeo'
import { serviceCopy } from '@/lib/xonServices'
import { httpsLink } from '@/lib/xonVideo'

type Props = { params: Promise<{ locale: SiteLocale; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  if (!localeCodes.includes(locale)) return {}
  const entry = await findArticle(locale, slug)
  const baseline = articleCopy(locale, slug)
  const article = entry || baseline
  if (!article) return {}
  const image = typeof entry?.cover === 'object' ? entry.cover : null
  return pageSEO(locale, `/articles/${slug}`, {
    title: article.title,
    description: article.description,
    kind: 'article',
    image: image?.url,
    imageAlt: image?.alt ?? undefined,
    locales: baseline ? localeCodes : await articleLocales(slug),
  })
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params
  if (!localeCodes.includes(locale)) notFound()
  const entry = await findArticle(locale, slug)
  const baseline = articleCopy(locale, slug)
  const article = entry || baseline
  if (!article) notFound()
  const ui = xonCopy(locale)
  const image = typeof entry?.cover === 'object' ? entry.cover : null
  const service = typeof entry?.relatedService === 'object' ? entry.relatedService : null
  const serviceTitle = service ? service.title || serviceCopy(locale, service.slug)?.title : null
  const sources = (entry?.sources || (baseline ? [{ label: 'MedlinePlus', url: baseline.source }] : []))
    .filter((source) => httpsLink(source.url))
  const url = new URL(`/${locale}/articles/${slug}`, siteOrigin()).href
  const languages = baseline ? localeCodes : await articleLocales(slug)

  return <XonInterior locale={locale} videoSection={`articles/${slug}`} eyebrow={ui.journal} title={article.title} intro={article.description} translatedLocales={languages} untranslatedPath="/articles">
    <ClinicBreadcrumbs locale={locale} section={{ path: '/articles', label: ui.journal }} title={article.title} slug={slug} />
    <JsonLd data={{
      '@type': 'Article', mainEntityOfPage: url, headline: article.title, description: article.description,
      inLanguage: locale, datePublished: entry?.publishedAt ?? undefined, dateModified: entry?.updatedAt,
      image: image?.url ? new URL(image.url, siteOrigin()).href : undefined,
      author: entry?.authorName ? { '@type': 'Person', name: entry.authorName } : undefined,
      reviewedBy: entry?.reviewerName ? { '@type': 'Person', name: entry.reviewerName } : undefined,
      publisher: { '@type': 'Organization', '@id': `${siteOrigin()}/ru#clinic`, name: 'XON Hospital', url: `${siteOrigin()}/ru` },
      citation: sources.map((source) => source.url),
    }} />
    <article className="xon-page-content xon-guide">
      <Link href={`/${locale}/articles`}>← {ui.journal}</Link>
      {entry && (entry.publishedAt || entry.authorName || entry.reviewerName) && (
        <div className="xon-article-byline">
          {entry.publishedAt && <time dateTime={entry.publishedAt}>{new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'Asia/Tashkent' }).format(new Date(entry.publishedAt))}</time>}
          {entry.authorName && <span>{ui.articleAuthor} · {entry.authorName}</span>}
          {entry.reviewerName && <span>{ui.articleReviewer} · {entry.reviewerName}</span>}
        </div>
      )}
      {image?.url && <Image className="xon-article-cover" src={image.url} alt={image.alt || article.title} width={image.width || 1000} height={image.height || 560} sizes="(max-width: 760px) 92vw, 760px" unoptimized />}
      {entry ? <XonArticleBody content={entry.content} locale={locale} /> : <div className="xon-article-body">{baseline?.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
      {sources.length > 0 && <section className="xon-article-sources">
        <h2>{ui.sources}</h2>
        <ul>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul>
      </section>}
      {service && serviceTitle && <Link className="xon-text-link" href={`/${locale}/services/${service.slug}`}>{serviceTitle} ↗</Link>}
    </article>
  </XonInterior>
}
