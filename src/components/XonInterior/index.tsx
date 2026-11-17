import Link from 'next/link'
import { connection } from 'next/server'
import type { ReactNode, CSSProperties } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ArrowUpRight } from 'lucide-react'

import { content, type SiteLocale } from '@/components/XonHome/content'
import { XonHeader } from '@/components/XonHeader'
import { XonFooter } from '@/components/XonFooter'
import { XonVideoSection } from '@/components/XonVideo'
import { interiorVideos, type InteriorVideoSection } from '@/lib/xonVideoPlacements'
import '@/components/XonHome/styles.css'
import './styles.css'

export async function XonInterior({
  locale,
  eyebrow,
  title,
  intro,
  index = '01',
  videoSection,
  appointmentHref,
  children,
}: {
  locale: SiteLocale
  eyebrow: string
  title: string
  intro?: string
  index?: string
  videoSection: InteriorVideoSection
  appointmentHref?: string
  children: ReactNode
}) {
  await connection()
  const payload = await getPayload({ config: configPromise })
  const [settings, videos] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: false }),
    interiorVideos(payload, locale, videoSection),
  ])
  const t = content[locale]
  const prefix = `/${locale}`
  const palette = settings.palette
  const paletteStyle = {
    '--xon-ivory': palette?.background || '#FAF9F6',
    '--xon-green': palette?.primary || '#173B57',
    '--xon-green-2': palette?.dark || '#102A3D',
    '--xon-gold': palette?.accent || '#C18A43',
  } as CSSProperties

  return (
    <main className="xon-site xon-interior" lang={locale} style={paletteStyle}>
      <XonHeader locale={locale} />

      <section className="xon-page-hero">
        <div className="xon-page-grid" aria-hidden="true" />
        <p className="xon-kicker"><span />{eyebrow}</p>
        <div className="xon-page-title"><span>{index}</span><h1>{title}</h1></div>
        {intro && <p className="xon-page-intro">{intro}</p>}
      </section>

      {children}
      <XonVideoSection locale={locale} items={videos} />

      <section className="xon-page-cta">
        <p>{t.formText}</p>
        <Link className="xon-primary xon-page-cta-button" href={appointmentHref || `${prefix}/contacts#appointment`}>
          <span>{t.primaryAction}</span><ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </section>
      <XonFooter locale={locale} settings={settings} />
    </main>
  )
}
