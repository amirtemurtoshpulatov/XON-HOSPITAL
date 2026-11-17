import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

import { XonInterior } from '@/components/XonInterior'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { articleCopy, articleSlugs } from '@/lib/xonArticles'
import { xonCopy } from '@/lib/xonCopy'

type Props = { params: Promise<{ locale: SiteLocale; slug: string }> }

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const article = localeCodes.includes(locale) && articleCopy(locale, slug)
  return article ? { title: article.title, description: article.description } : {}
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params
  if (!localeCodes.includes(locale)) notFound()
  const article = articleCopy(locale, slug)
  if (!article) notFound()
  const ui = xonCopy(locale)
  return <XonInterior locale={locale} videoSection={`articles/${slug}`} eyebrow={ui.journal} title={article.title} intro={article.description}>
    <article className="xon-page-content xon-guide">
      {article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <p>{ui.source} · <a href={article.source} target="_blank" rel="noreferrer">MedlinePlus (EN) ↗</a></p>
      <Link href={`/${locale}/articles`}>← {ui.journal}</Link>
    </article>
  </XonInterior>
}
