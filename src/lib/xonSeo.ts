import type { Metadata } from 'next'

import { content, localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { interiorCopy } from '@/components/XonInterior/copy'
import { xonCopy } from '@/lib/xonCopy'
import { getServerSideURL } from '@/utilities/getURL'

export function siteOrigin() {
  const configured = process.env.SITE_CANONICAL_URL
  if (configured) {
    const url = new URL(configured)
    if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
      throw new Error('SITE_CANONICAL_URL must be the public HTTPS origin, without a path.')
    }
    return url.origin
  }
  return new URL(getServerSideURL()).origin
}

export function indexableSite() {
  return Boolean(process.env.SITE_CANONICAL_URL)
}

export const staticSections = ['', '/services', '/doctors', '/about', '/prices', '/contacts', '/articles'] as const
type StaticSection = (typeof staticSections)[number]

export function localizedURLs(path: string, locales: readonly SiteLocale[] = localeCodes) {
  const pairs = locales.map((code) => [code, new URL(`/${code}${path}`, siteOrigin()).href])
  if (locales.includes('ru')) pairs.push(['x-default', new URL(`/ru${path}`, siteOrigin()).href])
  return Object.fromEntries(pairs)
}

type SEOInput = {
  title: string
  description?: string | null
  image?: string | null
  imageAlt?: string
  kind?: 'website' | 'article'
  locales?: readonly SiteLocale[]
}

export function pageSEO(locale: SiteLocale, path: string, data: SEOInput): Metadata {
  const canonical = new URL(`/${locale}${path}`, siteOrigin()).href
  const description = data.description || undefined
  const image = data.image || '/xon-hospital-logo.jpeg'
  return {
    title: data.title,
    description,
    alternates: { canonical, languages: localizedURLs(path, data.locales) },
    openGraph: {
      type: data.kind || 'website',
      siteName: 'XON Hospital',
      title: data.title,
      description,
      url: canonical,
      images: [{ url: new URL(image, siteOrigin()), alt: data.imageAlt || 'XON Hospital' }],
    },
  }
}

export async function sectionMetadata(params: Promise<{ locale: string }>, path: StaticSection): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = localeCodes.find((code) => code === rawLocale)
  if (!locale) return {}
  if (path === '') {
    const copy = content[locale]
    return pageSEO(locale, path, { title: `${copy.heroTitle} ${copy.heroAccent}`, description: copy.heroText })
  }
  if (path === '/articles') {
    const copy = xonCopy(locale)
    return pageSEO(locale, path, { title: copy.journal, description: copy.journalIntro })
  }
  const key = path.slice(1) as keyof (typeof interiorCopy)[SiteLocale]
  const copy = interiorCopy[locale][key]
  return pageSEO(locale, path, { title: copy.title, description: copy.intro })
}
