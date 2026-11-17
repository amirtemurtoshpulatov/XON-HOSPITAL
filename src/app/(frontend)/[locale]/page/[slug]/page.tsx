import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { XonInterior } from '@/components/XonInterior'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'

export default async function CmsPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'pages', locale, fallbackLocale: false, overrideAccess: false, where: { slug: { equals: slug } }, limit: 1, depth: 2 })
  const page = result.docs[0]
  if (!page?.title || !page.layout?.length) notFound()

  return <XonInterior locale={locale} eyebrow="XON HOSPITAL" title={page.title} index="06"><section className="xon-page-content"><RenderBlocks blocks={page.layout} /></section></XonInterior>
}
