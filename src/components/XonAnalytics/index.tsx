'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { SiteLocale } from '@/components/XonHome/content'
import { translate } from '@/lib/xonCopy'
import { analyticsPage, analyticsReferrer } from '@/lib/xonAnalytics'
import './style.css'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}
const preferenceKey = 'xon-analytics-consent-v1'
const preferenceEvent = 'xon-analytics-preference'
type Choice = 'accepted' | 'declined' | 'unknown'
function readChoice(): Choice {
  try {
    const value = localStorage.getItem(preferenceKey)
    return value === 'accepted' || value === 'declined' ? value : 'unknown'
  } catch { return 'unknown' }
}
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener(preferenceEvent, callback)
  return () => { window.removeEventListener('storage', callback); window.removeEventListener(preferenceEvent, callback) }
}

export function XonAnalytics({ measurementId, locale }: { measurementId: string; locale: SiteLocale }) {
  const pathname = usePathname()
  const choice = useSyncExternalStore(subscribe, readChoice, () => 'unknown' as const)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const sent = useRef<string | null>(null)
  const location = analyticsPage(pathname)
  const enabled = choice === 'accepted' && Boolean(location)
  const title = translate(locale, ['Аналитика сайта', 'Sayt tahlili', 'Website analytics', 'Сайт аналитикасы', 'Таҳлили сомона'])

  useEffect(() => {
    const flags = window as unknown as Record<string, unknown>
    flags[`ga-disable-${measurementId}`] = !enabled
    if (!enabled) { sent.current = null; return }
    if (!ready || !window.gtag || !location || sent.current === location) return
    // Override the automatic document fields; URLs never contain patient data.
    window.gtag('set', { page_location: location, page_referrer: analyticsReferrer(document.referrer), page_title: 'XON Hospital' })
    window.gtag('event', 'page_view', { page_location: location, page_title: 'XON Hospital' })
    sent.current = location
  }, [enabled, location, measurementId, ready])

  function choose(value: Exclude<Choice, 'unknown'>) {
    try { localStorage.setItem(preferenceKey, value) } catch { /* Consent is required again if storage is unavailable. */ }
    if (value === 'declined') {
      ;(window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
      // Remove first-party GA cookies previously set with this site's consent.
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim()
        if (!/^_ga(?:_|$)/.test(name)) continue
        for (const domain of ['', ';domain=xon-hospital.uz', ';domain=.xon-hospital.uz']) {
          document.cookie = `${name}=;Max-Age=0;path=/${domain};Secure;SameSite=Lax`
        }
      }
    } else window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
    window.dispatchEvent(new Event(preferenceEvent))
    setSettingsOpen(false)
  }

  if (!/^G-[A-Z0-9]+$/.test(measurementId) || !location) return null
  return <>
    {enabled && <Script id="xon-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" onReady={() => {
      if (readChoice() !== 'accepted') return
      window.dataLayer = window.dataLayer || []
      window.gtag = window.gtag || function () {
        // Google's documented queue uses an Arguments object for each command.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments)
      }
      window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
      window.gtag('js', new Date())
      window.gtag('config', measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: location,
        page_referrer: analyticsReferrer(document.referrer),
        page_title: 'XON Hospital',
        cookie_flags: 'SameSite=Lax;Secure',
      })
      setReady(true)
    }} />}
    {(choice === 'unknown' || settingsOpen) ? <section className="xon-analytics-notice" aria-label={title}>
      <strong>{title}</strong>
      <p>{translate(locale, [
        'С вашего согласия Google Analytics помогает понять посещаемость сайта. Имена, телефоны и данные из форм записи не передаются. Выбор можно изменить кнопкой «Аналитика» внизу экрана.',
        'Roziligingiz bilan Google Analytics saytga tashriflarni tahlil qiladi. Ism, telefon va qabul shaklidagi ma’lumotlar uzatilmaydi. Tanlovni ekranning pastidagi «Tahlil» tugmasida o‘zgartirishingiz mumkin.',
        'With your consent, Google Analytics measures website visits. Names, phone numbers and appointment form data are not sent. Change your choice using “Analytics” at the bottom of the screen.',
        'Келісіміңізбен Google Analytics сайтқа кіруді талдайды. Аты-жөн, телефон және қабылдау формасындағы деректер жіберілмейді. Таңдауды экранның төменгі жағындағы «Аналитика» арқылы өзгертуге болады.',
        'Бо розигии шумо Google Analytics ташрифҳои сомонаро таҳлил мекунад. Ном, телефон ва маълумоти шакли қабул фиристода намешаванд. Интихобро бо тугмаи «Таҳлил» дар поёни экран иваз кардан мумкин аст.',
      ])} <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">{translate(locale, ['Политика Google', 'Google maxfiylik siyosati', 'Google privacy policy', 'Google құпиялық саясаты', 'Сиёсати махфияти Google'])}</a></p>
      <div><button type="button" onClick={() => choose('declined')}>{translate(locale, ['Без аналитики', 'Tahlilsiz', 'Without analytics', 'Аналитикасыз', 'Бе таҳлил'])}</button><button type="button" onClick={() => choose('accepted')}>{translate(locale, ['Разрешить', 'Ruxsat berish', 'Allow', 'Рұқсат беру', 'Иҷозат додан'])}</button></div>
    </section> : <button className="xon-analytics-settings" type="button" onClick={() => setSettingsOpen(true)}>{translate(locale, ['Аналитика', 'Tahlil', 'Analytics', 'Аналитика', 'Таҳлил'])}</button>}
  </>
}
