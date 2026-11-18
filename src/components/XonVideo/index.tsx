import type { SiteLocale } from '@/components/XonHome/content'
import { translate, xonCopy } from '@/lib/xonCopy'
import { videoEmbed } from '@/lib/xonVideo'
import type { VideoFile } from '@/payload-types'

import './styles.css'

export type XonVideoItem = {
  id?: number | string | null
  title?: string | null
  description?: string | null
  url?: string | null
  file?: number | VideoFile | null
  format?: 'auto' | 'portrait' | 'landscape' | null
  relatedReel?: string | null
}

export function XonVideoSection({ items, locale }: {
  items: XonVideoItem[]
  locale: SiteLocale
}) {
  const ui = xonCopy(locale)
  const openOn = translate(locale, ['Открыть в', 'Ochish:', 'Open on', 'Ашу:', 'Кушодан:'])
  const seen = new Set<string>()
  const videos = items.flatMap((item) => {
    const embed = item.url ? videoEmbed(item.url) : null
    const filename = typeof item.file === 'object' ? item.file?.filename : null
    const src = filename ? `/api/video-files/file/${encodeURIComponent(filename)}` : null
    const key = src || embed
    if (!item.title || !key || seen.has(key)) return []
    seen.add(key)
    const portrait = item.format === 'portrait' || (item.format !== 'landscape'
      && Boolean(embed?.includes('/reel/') || item.url?.includes('/shorts/')))
    const provider = embed?.includes('instagram.com/') ? 'Instagram' : embed?.includes('vimeo.com/') ? 'Vimeo' : 'YouTube'
    return [{ ...item, title: item.title, key, src, embed, portrait, provider }]
  })

  if (!videos.length) return null
  return <section className="xon-video-section">
    <h2>{ui.video}</h2>
    <div className="xon-video-list">{videos.map(({ key, title, description, src, embed, url, portrait, provider, relatedReel }) => (
      <article key={key} className={`xon-video-card${portrait ? ' is-portrait' : ''}`}>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <div className="xon-player">
          {src
            ? <video src={src} aria-label={title} controls playsInline preload="metadata" />
            : embed && <iframe src={embed} title={title} loading="lazy" allow="encrypted-media; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />}
        </div>
        {(embed && url || relatedReel) && <div className="xon-video-links">
          {embed && url && <a href={url} target="_blank" rel="noreferrer">{openOn} {provider} ↗</a>}
          {relatedReel && <a href={relatedReel} target="_blank" rel="noreferrer">{openOn} Instagram ↗</a>}
        </div>}
      </article>
    ))}</div>
  </section>
}
