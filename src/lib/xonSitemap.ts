import type { MetadataRoute } from 'next'

import { localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { cms, listArticles } from '@/lib/clinicContent'
import { articleSlugs } from '@/lib/xonArticles'
import { doctorDirectory } from '@/lib/xonDoctors'
import { localizedURLs, siteOrigin, staticSections } from '@/lib/xonSeo'
import { isServiceAvailable, serviceSlugs } from '@/lib/xonServices'

export async function clinicSitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await cms()
  const paths = new Map<string, Map<SiteLocale, { updated?: string; image?: string | null }>>()

  function add(path: string, locale: SiteLocale, updated?: string, image?: string | null) {
    if (!paths.has(path)) paths.set(path, new Map())
    paths.get(path)!.set(locale, { updated, image })
  }

  await Promise.all(localeCodes.map(async (locale) => {
    const localized = { locale, fallbackLocale: false, depth: 0, pagination: false } as const
    const [doctors, services, pages, articles] = await Promise.all([
      payload.find({
        ...localized, collection: 'doctors', depth: 1,
        select: { slug: true, name: true, specialty: true, photo: true, updatedAt: true, createdAt: true },
      }),
      payload.find({ ...localized, collection: 'services', select: { slug: true, title: true, updatedAt: true } }),
      payload.find({
        ...localized, collection: 'pages', draft: false, overrideAccess: false,
        select: { slug: true, title: true, layout: true, updatedAt: true },
        where: { _status: { equals: 'published' } },
      }),
      listArticles(locale),
    ])

    for (const path of staticSections) add(path, locale)
    for (const doctor of doctorDirectory(locale, doctors.docs)) {
      add(`/doctors/${doctor.slug}`, locale, doctor.updatedAt, doctor.photoUrl)
    }
    for (const slug of serviceSlugs.filter(isServiceAvailable)) add(`/services/${slug}`, locale)
    for (const service of services.docs) {
      if (service.title && isServiceAvailable(service.slug)) add(`/services/${service.slug}`, locale, service.updatedAt)
    }
    for (const page of pages.docs) {
      if (page.slug && page.title && page.layout?.length) add(`/page/${page.slug}`, locale, page.updatedAt)
    }
    for (const slug of articleSlugs) add(`/articles/${slug}`, locale)
    for (const article of articles) add(`/articles/${article.slug}`, locale, article.updatedAt)
  }))

  return [...paths].sort(([a], [b]) => a.localeCompare(b)).flatMap(([path, byLocale]) => {
    const languages = localizedURLs(path, localeCodes.filter((code) => byLocale.has(code)))
    return localeCodes.flatMap((locale) => {
      const entry = byLocale.get(locale)
      if (!entry) return []
      return [{
        url: languages[locale],
        lastModified: entry.updated,
        images: entry.image ? [new URL(entry.image, siteOrigin()).href] : undefined,
        alternates: { languages },
      }]
    })
  })
}
