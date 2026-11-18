import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { doctorProfile } from './xonDoctors'
import { serviceCopy } from './xonServices'
import type { ClinicArticle } from '@/payload-types'

export const cms = cache(() => getPayload({ config }))

export const findDoctor = cache(async (locale: SiteLocale, slug: string) => {
  const payload = await cms()
  const { docs } = await payload.find({ collection: 'doctors', locale, fallbackLocale: false, where: { slug: { equals: slug } }, limit: 1, depth: 2 })
  return doctorProfile(locale, slug, docs[0])
})

export const findService = cache(async (locale: SiteLocale, slug: string) => {
  const payload = await cms()
  const { docs } = await payload.find({ collection: 'services', locale, fallbackLocale: false, where: { slug: { equals: slug } }, limit: 1, depth: 2 })
  return docs[0]
})

export const findCmsPage = cache(async (locale: SiteLocale, slug: string) => {
  const payload = await cms()
  const { docs } = await payload.find({ collection: 'pages', locale, fallbackLocale: false, draft: false, overrideAccess: false, where: { slug: { equals: slug } }, limit: 1, depth: 2 })
  const page = docs[0]
  return page?.title && page.layout?.length ? page : null
})

function hasArticleContent(article: Pick<ClinicArticle, 'title' | 'description' | 'content'>) {
  return Boolean(article.title && article.description && article.content?.root?.children.length)
}

export const findArticle = cache(async (locale: SiteLocale, slug: string) => {
  const payload = await cms()
  const { docs } = await payload.find({
    collection: 'clinic-articles', locale, fallbackLocale: false, draft: false, overrideAccess: false,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1, depth: 1,
  })
  const article = docs[0]
  return article && hasArticleContent(article) ? article : null
})

export const listArticles = cache(async (locale: SiteLocale) => {
  const payload = await cms()
  const { docs } = await payload.find({
    collection: 'clinic-articles', locale, fallbackLocale: false, draft: false, overrideAccess: false,
    where: { _status: { equals: 'published' } }, sort: '-publishedAt', pagination: false, depth: 0,
    select: { title: true, slug: true, description: true, content: true, publishedAt: true, updatedAt: true },
  })
  return docs.filter(hasArticleContent)
})

export async function availableLocales(check: (locale: SiteLocale) => Promise<unknown>) {
  const exists = await Promise.all(localeCodes.map(check))
  return localeCodes.filter((_, index) => Boolean(exists[index]))
}

export const articleLocales = cache((slug: string) => availableLocales((locale) => findArticle(locale, slug)))

export const cmsPageLocales = cache((slug: string) => availableLocales((locale) => findCmsPage(locale, slug)))

export function doctorLocales(slug: string) {
  return doctorProfile('ru', slug) ? Promise.resolve(localeCodes) : availableLocales((code) => findDoctor(code, slug))
}

export function serviceLocales(slug: string) {
  return serviceCopy('ru', slug) ? Promise.resolve(localeCodes) : availableLocales(async (code) => (await findService(code, slug))?.title)
}
