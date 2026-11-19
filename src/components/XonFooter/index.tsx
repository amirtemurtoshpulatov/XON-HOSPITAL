import Link from 'next/link'

import { XonBrand } from '@/components/XonBrand'
import { content, type SiteLocale } from '@/components/XonHome/content'
import { clinicSocial, xonCopy } from '@/lib/xonCopy'
import { serviceCopy } from '@/lib/xonServices'

type FooterSettings = {
  address?: string | null
  phone?: string | null
  telegram?: string | null
  instagram?: string | null
  workingHours?: string | null
}

const labels: Record<SiteLocale, {
  clinic: string
  services: string
  contacts: string
  tagline: string
  medicalNote: string
  developedBy: string
}> = {
  ru: { clinic: 'Клиника', services: 'Направления', contacts: 'Контакты', tagline: 'Многопрофильная клиника с понятным маршрутом пациента — от диагностики до лечения и реабилитации.', medicalNote: 'Информация на сайте не заменяет консультацию врача.', developedBy: 'Разработка сайта' },
  uz: { clinic: 'Klinika', services: "Yo'nalishlar", contacts: 'Aloqa', tagline: "Tashxisdan davolash va reabilitatsiyagacha tushunarli bemor yo'liga ega ko'p tarmoqli klinika.", medicalNote: "Saytdagi ma'lumot shifokor maslahatini almashtirmaydi.", developedBy: 'Sayt ishlab chiqaruvchi' },
  en: { clinic: 'Clinic', services: 'Departments', contacts: 'Contacts', tagline: 'A multidisciplinary clinic with a clear patient journey from diagnostics to treatment and rehabilitation.', medicalNote: 'Information on this website does not replace a medical consultation.', developedBy: 'Website by' },
  kk: { clinic: 'Клиника', services: 'Бағыттар', contacts: 'Байланыс', tagline: 'Диагностикадан емдеу мен оңалтуға дейінгі түсінікті жолы бар көпсалалы клиника.', medicalNote: 'Сайттағы ақпарат дәрігер кеңесін алмастырмайды.', developedBy: 'Сайтты әзірлеген' },
  tg: { clinic: 'Клиника', services: 'Самтҳо', contacts: 'Тамос', tagline: 'Клиникаи бисёрсоҳа бо роҳи равшани бемор аз ташхис то табобат ва барқарорсозӣ.', medicalNote: 'Маълумоти сомона машварати духтурро иваз намекунад.', developedBy: 'Сомонаро сохт' },
}

const clinicLinks = ['services', 'doctors', 'about', 'prices', 'contacts']
const serviceLinks = ['ultrasound', 'rehabilitation', 'neurology', 'orthopedics', 'oncology']

function externalHref(value: string | null | undefined, network: 'telegram' | 'instagram') {
  if (!value) return null
  if (/^https?:\/\//i.test(value)) return value
  const handle = value.replace(/^@/, '')
  return network === 'telegram' ? `https://t.me/${handle}` : `https://instagram.com/${handle}`
}

export function XonFooter({ locale, settings }: { locale: SiteLocale; settings: FooterSettings }) {
  const prefix = `/${locale}`
  const t = labels[locale]
  const ui = xonCopy(locale)
  const telegram = externalHref(settings.telegram, 'telegram') || clinicSocial.telegram
  const phone = settings.phone || clinicSocial.phone
  const instagram = externalHref(settings.instagram, 'instagram') || clinicSocial.instagram

  return (
    <footer className="xon-footer" id="contact">
      <div className="xon-footer-main">
        <div className="xon-footer-brand">
          <XonBrand href={prefix} footer />
          <p>{t.tagline}</p>
        </div>
        <nav className="xon-footer-column" aria-label={t.clinic}>
          <h2>{t.clinic}</h2>
          {clinicLinks.map((slug, index) => <Link href={`${prefix}/${slug}`} key={slug}>{content[locale].nav[index]}</Link>)}
          <Link href={`${prefix}/articles`}>{ui.journal}</Link>
        </nav>
        <nav className="xon-footer-column" aria-label={t.services}>
          <h2>{t.services}</h2>
          {serviceLinks.map((slug) => <Link href={`${prefix}/services/${slug}`} key={slug}>{serviceCopy(locale, slug)?.title}</Link>)}
        </nav>
        <div className="xon-footer-column xon-footer-contacts">
          <h2>{t.contacts}</h2>
          <p>{settings.address || ui.city}</p>
          <a href={clinicSocial.maps} target="_blank" rel="noreferrer">{ui.directions} ↗</a>
          <a className="xon-footer-phone" href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a>
          {settings.workingHours && <p>{settings.workingHours}</p>}
          <div className="xon-footer-socials">
            {telegram && <a href={telegram} target="_blank" rel="noreferrer">Telegram</a>}
            <a href={instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={clinicSocial.youtube} target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </div>
      <div className="xon-footer-bottom">
        <div><p>© {new Date().getFullYear()} XON HOSPITAL</p><p>{t.medicalNote}</p></div>
        <Link className="xon-footer-cms" href="/admin">CMS</Link>
        <p className="xon-footer-credit"><span>{t.developedBy}</span><a href="https://plovagency.uz/" target="_blank" rel="noreferrer">PLOV AGENCY</a></p>
      </div>
    </footer>
  )
}
