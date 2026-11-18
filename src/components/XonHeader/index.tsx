'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { content, localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { XonBrand } from '@/components/XonBrand'
import { xonCopy } from '@/lib/xonCopy'

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
  const prefix = `/${locale}`
  const currentPath = pathname?.startsWith(`${prefix}/`) ? pathname.slice(prefix.length) : ''

  useEffect(() => {
    document.documentElement.lang = locale
    if (menu.current) menu.current.open = false
    if (languages.current) languages.current.open = false
  }, [locale, pathname])

  const links = navigationPaths.map((path, index) => <Link key={path} href={`${prefix}/${path}`}>{t.nav[index]}</Link>)

  return <header className="xon-header">
    <XonBrand href={prefix} label={`XON HOSPITAL · ${ui.city}`} />
    <nav className="xon-nav" aria-label={ui.navigation}>
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
        <nav aria-label={ui.navigation}>{links}<Link href={`${prefix}/articles`}>{ui.journalNav}</Link></nav>
      </details>
      <Link className="xon-header-cta" href={home ? '#appointment' : `${prefix}/contacts#appointment`}>{t.primaryAction}<ArrowUpRight size={16} /></Link>
    </div>
  </header>
}
