import Link from 'next/link'
import Image from 'next/image'
import { ArrowDownRight, ArrowUpRight, HeartPulse, ShieldCheck, Sparkles } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { CSSProperties } from 'react'

import { LeadForm } from './LeadForm'
import { content, localeCodes, type SiteLocale } from './content'
import { XonBrand } from '@/components/XonBrand'
import { XonFooter } from '@/components/XonFooter'
import { getSeededDoctorPhoto } from '@/lib/doctorPhotos'
import './styles.css'

const languageLabels: Record<SiteLocale, string> = { ru: 'RU', uz: 'UZ', en: 'EN', kk: 'KZ', tg: 'TJ' }
const fallbackServiceSlugs = ['neurology', 'orthopedics', 'gastroenterology', 'dermatology', 'check-up', 'rehabilitation']
const defaultMetrics = [
  { value: '20', label: 'врачей\nв команде' },
  { value: '15', label: 'направлений\nи служб' },
  { value: '1', label: 'понятный\nмаршрут пациента' },
]
const defaultPrograms = [
  { title: 'Полный Check-up', text: 'Обследования по персональному плану, без обещаний «найти всё» и без лишних назначений.', slug: 'check-up' },
  { title: 'Реабилитация', text: 'Восстановление после инсульта, травм и лечения под наблюдением специалистов.', slug: 'rehabilitation' },
  { title: 'Солевая комната', text: 'Дополнительная оздоровительная процедура в спокойной и комфортной среде.', slug: 'salt-room' },
  { title: 'Лечение без операции', text: 'Консервативные методы, когда они медицински обоснованы и безопасны для пациента.', slug: 'orthopedics' },
]

export async function XonHome({ locale = 'ru' }: { locale?: SiteLocale }) {
  const fallback = content[locale]
  const payload = await getPayload({ config: configPromise })
  const [home, settings, featuredServices, featuredDoctors] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', locale, fallbackLocale: 'ru', depth: 2 }),
    payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: 'ru', depth: 1 }),
    payload.find({ collection: 'services', locale, fallbackLocale: 'ru', where: { featured: { equals: true } }, limit: 8, sort: 'sortOrder' }),
    payload.find({ collection: 'doctors', locale, fallbackLocale: 'ru', where: { featured: { equals: true } }, limit: 3, sort: 'sortOrder', depth: 1 }),
  ])
  const t = {
    ...fallback,
    heroEyebrow: home.heroEyebrow || fallback.heroEyebrow,
    heroTitle: home.heroTitle || fallback.heroTitle,
    heroAccent: home.heroAccent || fallback.heroAccent,
    heroText: home.heroText || fallback.heroText,
    servicesTitle: home.servicesTitle || fallback.servicesTitle,
    servicesText: home.servicesText || fallback.servicesText,
    doctorsTitle: home.doctorsTitle || fallback.doctorsTitle,
    doctorsText: home.doctorsText || fallback.doctorsText,
    affordabilityTitle: home.affordabilityTitle || fallback.affordabilityTitle,
    affordabilityText: home.affordabilityText || fallback.affordabilityText,
    formTitle: home.formTitle || fallback.formTitle,
    formText: home.formText || fallback.formText,
  }
  const selectedServicesFromHome = Array.isArray(home.featuredServices)
    ? home.featuredServices.filter((item) => typeof item === 'object')
    : []
  const selectedServices = selectedServicesFromHome.length ? selectedServicesFromHome : featuredServices.docs
  const services = selectedServices.length
    ? selectedServices.slice(0, 8).map((service, index) => ({
        number: String(index + 1).padStart(2, '0'),
        title: service.title,
        text: service.summary,
        slug: service.slug,
      }))
    : t.serviceItems.map((service, index) => ({ ...service, slug: fallbackServiceSlugs[index] }))
  const selectedDoctorsFromHome = Array.isArray(home.featuredDoctors)
    ? home.featuredDoctors.filter((item) => typeof item === 'object').slice(0, 3)
    : []
  const selectedDoctors = selectedDoctorsFromHome.length ? selectedDoctorsFromHome : featuredDoctors.docs
  const metrics = home.metrics?.length ? home.metrics : defaultMetrics
  const programs = home.programs?.length
    ? home.programs.map((program) => ({
        title: program.title,
        text: program.text,
        slug: program.service && typeof program.service === 'object' ? program.service.slug : 'services',
      }))
    : defaultPrograms
  const heroMedia = typeof home.heroMedia === 'object' && home.heroMedia?.url ? home.heroMedia.url : undefined
  const palette = settings.palette
  const paletteStyle = {
    '--xon-ivory': palette?.background || '#FAF9F6',
    '--xon-green': palette?.primary || '#173B57',
    '--xon-green-2': palette?.dark || '#102A3D',
    '--xon-gold': palette?.accent || '#C18A43',
  } as CSSProperties
  const localePrefix = `/${locale}`

  return (
    <main className="xon-site" style={paletteStyle}>
      <header className="xon-header">
        <XonBrand href={localePrefix} />
        <nav className="xon-nav" aria-label="Основная навигация">
          <Link href={`${localePrefix}/services`}>{t.nav[0]}</Link><Link href={`${localePrefix}/doctors`}>{t.nav[1]}</Link><Link href={`${localePrefix}/about`}>{t.nav[2]}</Link><Link href={`${localePrefix}/prices`}>{t.nav[3]}</Link><Link href={`${localePrefix}/contacts`}>{t.nav[4]}</Link>
        </nav>
        <div className="xon-header-actions">
          <details className="xon-languages"><summary>{languageLabels[locale]} <span>⌄</span></summary><div>{localeCodes.map((code) => <Link key={code} href={`/${code}`}>{languageLabels[code]}</Link>)}</div></details>
          <a className="xon-header-cta" href="#appointment">{t.primaryAction}<ArrowUpRight size={16} /></a>
        </div>
      </header>

      <section className="xon-hero" id="about">
        <div className="xon-hero-grid" aria-hidden="true" />
        <div className="xon-orbit" aria-hidden="true"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><div className={`orbit-core${heroMedia ? ' has-media' : ''}`} style={heroMedia ? { backgroundImage: `url(${heroMedia})` } : undefined}><span>+</span></div><i className="orbit-point point-one" /><i className="orbit-point point-two" /><i className="orbit-point point-three" /></div>
        <div className="xon-hero-copy">
          <p className="xon-kicker"><span />{t.heroEyebrow}</p>
          <h1>{t.heroTitle}<br /><em>{t.heroAccent}</em></h1>
          <p className="xon-hero-text">{t.heroText}</p>
          <div className="xon-hero-actions"><a className="xon-primary" href="#appointment">{t.primaryAction}<ArrowDownRight size={18} /></a><a className="xon-text-link" href="#services">{t.secondaryAction}<span>↘</span></a></div>
        </div>
        <div className="xon-hero-note"><span>01</span><p>Care,<br />coordinated.</p></div>
      </section>

      <section className="xon-proof-bar" aria-label="Ключевые преимущества">
        <div className="xon-proof-brand"><Image src="/xon-hospital-logo.jpeg" width={150} height={150} alt="XON HOSPITAL" priority /></div>
        {metrics.map((metric) => <div key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><span>{metric.label.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</span></div>)}
      </section>

      <section className="xon-trust" aria-label="Преимущества">
        {t.trust.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p>{index === 0 ? <HeartPulse /> : index === 1 ? <ShieldCheck /> : <Sparkles />}</div>)}
      </section>

      <section className="xon-programs">
        <div className="xon-programs-head"><p className="xon-label">{home.programsEyebrow || 'Популярные программы'}<span>выберите задачу</span></p><h2>{home.programsTitle || 'Не откладывайте здоровье из-за сложного выбора.'}</h2><p>{home.programsText || 'Начните с понятной программы — администратор подскажет, какой специалист и формат подходят именно вам.'}</p></div>
        <div className="xon-program-grid">
          {programs.map((program, index) => <Link href={`${localePrefix}/services/${program.slug}`} key={`${program.title}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><h3>{program.title}</h3><p>{program.text}</p><b>Подробнее ↗</b></Link>)}
        </div>
      </section>

      <section className="xon-services" id="services">
        <div className="xon-section-head"><p className="xon-label">{t.servicesLabel}<span>01 — 06</span></p><h2>{t.servicesTitle}</h2><p>{t.servicesText}</p></div>
        <div className="xon-service-list">
          {services.map((item) => <article key={item.number} className="xon-service-card"><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><Link href={`${localePrefix}/services/${item.slug}`} aria-label={`${item.title} — подробнее`}><ArrowUpRight /></Link></article>)}
        </div>
      </section>

      <section className="xon-path" id="prices">
        <div className="xon-path-intro"><p className="xon-label light">{t.pathLabel}<span>04 шага</span></p><h2>{t.pathTitle}</h2><div className="xon-path-seal" aria-hidden="true"><span>XON</span><small>CARE SYSTEM</small></div></div>
        <ol className="xon-path-steps">{t.pathSteps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
      </section>

      <section className="xon-doctors" id="doctors">
        <div className="xon-doctors-copy"><p className="xon-label">{t.doctorsLabel}<span>экспертиза</span></p><h2>{t.doctorsTitle}</h2><p>{t.doctorsText}</p><a href="#appointment" className="xon-text-link dark">{t.primaryAction}<span>↘</span></a></div>
        <div className="xon-doctor-mosaic" aria-label="Врачи XON HOSPITAL">
          {selectedDoctors.length ? selectedDoctors.map((doctor, index) => {
            const photo = (typeof doctor.photo === 'object' && doctor.photo?.url ? doctor.photo.url : undefined) || getSeededDoctorPhoto(doctor.slug)
            return <Link href={`${localePrefix}/doctors/${doctor.slug}`} key={doctor.id} className={`doctor-card doctor-${['a', 'b', 'c'][index]}`} style={photo ? { backgroundImage: `linear-gradient(0deg, rgba(23,59,87,.72), rgba(23,59,87,0) 70%), url(${photo})`, backgroundSize: 'cover', color: '#fff' } : undefined}><span>{doctor.specialty}</span><strong>{doctor.name}</strong><small>{doctor.position || doctor.experience || ''}</small></Link>
          }) : <><Link href={`${localePrefix}/doctors/xursand-yusupboyevich`} className="doctor-card doctor-a"><span>Гастроэнтерология</span><strong>Хурсанд<br />Юсупбоевич</strong><small>Основатель, главный врач</small></Link><Link href={`${localePrefix}/doctors/fayzullo-narzullayevich`} className="doctor-card doctor-b"><span>Неврология</span><strong>Файзулло<br />Нарзуллаевич</strong><small>Врач-невролог</small></Link><Link href={`${localePrefix}/doctors/zafar-abdirazzakov`} className="doctor-card doctor-c"><span>Ортопедия</span><strong>Зафар<br />Абдираззаков</strong><small>Ортопед-вертебролог</small></Link></>}
        </div>
      </section>

      <section className="xon-affordability">
        <div className="xon-coin" aria-hidden="true"><span>X</span></div><div><h2>{t.affordabilityTitle}</h2><p>{t.affordabilityText}</p></div><a href="#appointment"><ArrowDownRight /></a>
      </section>

      <section className="xon-appointment" id="appointment">
        <div className="xon-appointment-copy"><p className="xon-label light">{t.nav[4]}<span>запись</span></p><h2>{t.formTitle}</h2><p>{t.formText}</p><div className="xon-contact-placeholder"><small>Колл-центр</small><strong>{settings.phone || '+998 ·· ··· ·· ··'}</strong>{!settings.phone && <small>Точный номер добавляется в админке</small>}</div></div>
        <LeadForm locale={locale} labels={t} />
      </section>

      <XonFooter locale={locale} settings={settings} />
    </main>
  )
}
