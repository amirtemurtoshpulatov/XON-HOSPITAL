import type { Payload, Where } from 'payload'
import type { SiteLocale } from '@/components/XonHome/content'
import type { VideoPlacement } from '@/payload-types'

export const homeVideoSections = [
  'home:hero', 'home:programs', 'home:services', 'home:path',
  'home:doctors', 'home:prices', 'home:articles', 'home:appointment',
] as const

type HomeVideoSection = (typeof homeVideoSections)[number]
export type InteriorVideoSection = Exclude<VideoPlacement['section'], HomeVideoSection | 'detail'> | `${'doctors' | 'services' | 'articles' | 'page'}/${string}`

async function videoPlacements(payload: Payload, locale: SiteLocale, where: Where) {
  const { docs } = await payload.find({
    collection: 'video-placements',
    locale,
    fallbackLocale: false,
    depth: 1,
    limit: 100,
    sort: ['sortOrder', 'id'],
    where: { and: [{ visible: { equals: true } }, where] },
  })
  return docs
}

export async function homeVideos(payload: Payload, locale: SiteLocale) {
  const videos = await videoPlacements(payload, locale, { section: { in: [...homeVideoSections] } })
  return (section: HomeVideoSection) => videos.filter((video) => video.section === section)
}

export function interiorVideos(payload: Payload, locale: SiteLocale, section: InteriorVideoSection) {
  return videoPlacements(payload, locale, section.includes('/')
    ? { section: { equals: 'detail' }, pagePath: { equals: section } }
    : { section: { equals: section } })
}
