import Link from 'next/link'
import type { ReactNode, CSSProperties } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ArrowUpRight } from 'lucide-react'

import { content, localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { XonBrand } from '@/components/XonBrand'
import { XonFooter } from '@/components/XonFooter'
import '@/components/XonHome/styles.css'
import './styles.css'

const languageLabels: Record<SiteLocale, string> = { ru: 'RU', uz: 'UZ', en: 'EN', kk: 'KZ', tg: 'TJ' }

export async function XonInterior({
  locale,
  eyebrow,
  title,
  intro,
  index = '01',
  children,
}: {
  locale: SiteLocale
  eyebrow: string
  title: string
  intro?: string
  index?: string
  children: ReactNode
}) {
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: 'ru' })
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
    <main className="xon-site xon-interior" style={paletteStyle}>
      <header className="xon-header">
        <XonBrand href={prefix} />
        <nav className="xon-nav" aria-label="Основная навигация">
          <Link href={`${prefix}/services`}>{t.nav[0]}</Link>
          <Link href={`${prefix}/doctors`}>{t.nav[1]}</Link>
          <Link href={`${prefix}/about`}>{t.nav[2]}</Link>
          <Link href={`${prefix}/prices`}>{t.nav[3]}</Link>
          <Link href={`${prefix}/contacts`}>{t.nav[4]}</Link>
        </nav>
        <div className="xon-header-actions">
          <details className="xon-languages"><summary>{languageLabels[locale]} <span>⌄</span></summary><div>{localeCodes.map((code) => <Link key={code} href={`/${code}`}>{languageLabels[code]}</Link>)}</div></details>
          <Link className="xon-header-cta" href={`${prefix}/contacts#appointment`}>{t.primaryAction}<ArrowUpRight size={16} /></Link>
        </div>
      </header>

      <section className="xon-page-hero">
        <div className="xon-page-grid" aria-hidden="true" />
        <p className="xon-kicker"><span />{eyebrow}</p>
        <div className="xon-page-title"><span>{index}</span><h1>{title}</h1></div>
        {intro && <p className="xon-page-intro">{intro}</p>}
      </section>

      {children}

      <section className="xon-page-cta">
        <p>{t.formText}</p>
        <Link href={`${prefix}/contacts#appointment`}>{t.primaryAction}<ArrowUpRight /></Link>
      </section>
      <XonFooter locale={locale} settings={settings} />
    </main>
  )
}
