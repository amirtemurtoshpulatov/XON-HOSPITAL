import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { XonInterior } from '@/components/XonInterior'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { cmsPageLocales, findCmsPage } from '@/lib/clinicContent'
import { pageSEO } from '@/lib/xonSeo'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  if (!localeCodes.includes(locale as SiteLocale)) return {}
  const code = locale as SiteLocale
  const page = await findCmsPage(code, slug)
  if (!page) return {}
  const cover = typeof page.meta?.image === 'object' ? page.meta.image : null
  return pageSEO(code, `/page/${slug}`, {
    title: page.meta?.title || page.title,
    description: page.meta?.description,
    image: cover?.url,
    imageAlt: cover?.alt ?? undefined,
    locales: await cmsPageLocales(slug),
  })
}

export default async function CmsPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const page = await findCmsPage(locale, slug)
  if (!page) notFound()

  const languages = await cmsPageLocales(slug)
  return <XonInterior locale={locale} videoSection={`page/${slug}`} eyebrow="XON HOSPITAL" title={page.title} index="06" translatedLocales={languages}><section className="xon-page-content"><RenderBlocks blocks={page.layout} /></section></XonInterior>
}
