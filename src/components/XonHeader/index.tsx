'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, ChevronDown, Menu } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'

import { content, localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { XonBrand } from '@/components/XonBrand'
import { xonCopy } from '@/lib/xonCopy'
import { serviceNavigation, serviceNavigationLabels } from '@/lib/xonServiceNavigation'

import './styles.css'

const languageNames = { ru: 'Русский', uz: 'O‘zbekcha', en: 'English', kk: 'Қазақша', tg: 'Тоҷикӣ' }
const navigationPaths = ['services', 'doctors', 'about', 'prices', 'contacts']

export function XonHeader({ locale, home = false, translatedLocales, untranslatedPath = '' }: {
  locale: SiteLocale
  home?: boolean
  translatedLocales?: readonly SiteLocale[]
  untranslatedPath?: string
}) {
  const pathname = usePathname()
  const t = content[locale]
  const ui = xonCopy(locale)
  const menu = useRef<HTMLDetailsElement>(null)
  const languages = useRef<HTMLDetailsElement>(null)
  const desktopServices = useRef<HTMLDetailsElement>(null)
  const mobileServices = useRef<HTMLDetailsElement>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cancelHover = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = null
  }, [])
  const serviceGroups = serviceNavigation(locale)
  const serviceLabels = serviceNavigationLabels(locale)
  const prefix = `/${locale}`
  const currentPath = pathname?.startsWith(`${prefix}/`) ? pathname.slice(prefix.length) : ''

  useEffect(() => {
    document.documentElement.lang = locale
    cancelHover()
    if (menu.current) menu.current.open = false
    if (languages.current) languages.current.open = false
    if (desktopServices.current) desktopServices.current.open = false
    if (mobileServices.current) mobileServices.current.open = false
  }, [locale, pathname, cancelHover])

  useEffect(() => {
    const disclosures = [desktopServices, mobileServices, menu, languages]
    const outside = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return
      if (!desktopServices.current?.contains(event.target)) cancelHover()
      for (const ref of disclosures) {
        if (ref.current && !ref.current.contains(event.target)) ref.current.open = false
      }
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      cancelHover()
      const active = disclosures.find((ref) => ref.current?.open && ref.current.contains(document.activeElement))
      const target = active || disclosures.find((ref) => ref.current?.open)
      if (!target?.current) return
      event.preventDefault()
      target.current.open = false
      target.current.querySelector('summary')?.focus()
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      cancelHover()
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [cancelHover])

  const links = navigationPaths.slice(1).map((path, index) => <Link key={path} href={`${prefix}/${path}`}>{t.nav[index + 1]}</Link>)
  const groups = (mobile = false) => <div className={mobile ? 'xon-mobile-service-groups' : 'xon-mega-groups'}>
    {serviceGroups.map((group) => <div className={`xon-service-group xon-service-group-${group.key}`} key={group.key}>
      <h3>{group.title}</h3>
      <ul>{group.items.map((item) => <li key={item.slug}><Link href={`${prefix}/services/${item.slug}`}>{item.title}</Link></li>)}</ul>
    </div>)}
  </div>

  return <header className="xon-header" onClick={(event) => {
    if (!(event.target instanceof Element) || !event.target.closest('a')) return
    cancelHover()
    for (const ref of [menu, languages, desktopServices, mobileServices]) if (ref.current) ref.current.open = false
  }}>
    <XonBrand href={prefix} label={`XON HOSPITAL · ${ui.city}`} />
    <nav className="xon-nav" aria-label={ui.navigation}>
      <details className="xon-services-disclosure" ref={desktopServices}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse' && desktopServices.current) {
            cancelHover()
            hoverTimer.current = setTimeout(() => {
              if (desktopServices.current) desktopServices.current.open = true
              if (languages.current) languages.current.open = false
              hoverTimer.current = null
            }, 140)
          }
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== 'mouse') return
          cancelHover()
          const disclosure = desktopServices.current
          if (disclosure && (!disclosure.contains(document.activeElement) || document.activeElement === disclosure.querySelector('summary'))) disclosure.open = false
        }}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { cancelHover(); event.currentTarget.open = false } }}>
        <summary onClick={cancelHover} onKeyDown={cancelHover}>{t.nav[0]}<ChevronDown size={13} aria-hidden="true" /></summary>
        <div className="xon-mega-panel">
          {groups()}
          <div className="xon-mega-footer">
            <Link href={`${prefix}/services`}>{serviceLabels.all}<ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link href={`${prefix}/contacts#appointment`}>{serviceLabels.help}<ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </details>
      {links}
      <Link href={`${prefix}/articles`}>{ui.journalNav}</Link>
    </nav>
    <div className="xon-header-actions">
      <details className="xon-languages" ref={languages}>
        <summary aria-label={ui.language}>{locale.toUpperCase()} <span aria-hidden="true">⌄</span></summary>
        <div>{localeCodes.map((code) => {
          const path = !translatedLocales || translatedLocales.includes(code) ? currentPath : untranslatedPath
          return <Link key={code} lang={code} hrefLang={code} aria-current={locale === code ? 'true' : undefined} href={`/${code}${path}`}>{languageNames[code]}</Link>
        })}</div>
      </details>
      <details className="xon-mobile-nav" ref={menu}>
        <summary aria-label={ui.navigation}><Menu size={24} /></summary>
        <nav aria-label={ui.navigation}>
          <details className="xon-mobile-services" ref={mobileServices}>
            <summary>{t.nav[0]}<ChevronDown size={17} aria-hidden="true" /></summary>
            {groups(true)}
            <Link className="xon-mobile-all-services" href={`${prefix}/services`}>{serviceLabels.all}<ArrowUpRight size={17} aria-hidden="true" /></Link>
          </details>
          {links}<Link href={`${prefix}/articles`}>{ui.journalNav}</Link>
        </nav>
      </details>
      <Link className="xon-header-cta" href={home ? '#appointment' : `${prefix}/contacts#appointment`}>{t.primaryAction}<ArrowUpRight size={16} /></Link>
    </div>
  </header>
}
