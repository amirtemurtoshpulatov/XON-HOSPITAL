import Link from 'next/link'
import Image from 'next/image'
import { connection } from 'next/server'
import { ArrowDownRight, ArrowUpRight, HeartPulse, ShieldCheck, Sparkles } from 'lucide-react'
import config from '@payload-config'
import { getPayload } from 'payload'
import type { CSSProperties } from 'react'

import { LeadForm } from './LeadForm'
import { content, type SiteLocale } from './content'
import { XonHeader } from '@/components/XonHeader'
import { XonFooter } from '@/components/XonFooter'
import { clinicSocial, xonCopy } from '@/lib/xonCopy'
import { isServiceAvailable, serviceCopy, serviceSlugs } from '@/lib/xonServices'
import { doctorDirectory, featuredDoctorSlugs } from '@/lib/xonDoctors'
import { articleCopy, articleSlugs } from '@/lib/xonArticles'
import { homeVideos } from '@/lib/xonVideoPlacements'
import { XonVideoSection } from '@/components/XonVideo'
import { JsonLd } from '@/components/JsonLd'
import { listArticles } from '@/lib/clinicContent'
import { siteOrigin } from '@/lib/xonSeo'
import { xonLogo } from '@/lib/xonBrand'
import './styles.css'

const defaultProgramSlugs = ['ultrasound', 'rehabilitation', 'salt-room', 'orthopedics']

export async function XonHome({ locale = 'ru' }: { locale?: SiteLocale }) {
  await connection()
  const ui = xonCopy(locale)
  const fallback = content[locale]
  const prefix = `/${locale}`
  const origin = siteOrigin()
  const payload = await getPayload({ config })
  const [home, settings, services, doctors, videos, articles] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', locale, fallbackLocale: false, depth: 2 }),
    payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: false, depth: 1 }),
    payload.find({ collection: 'services', locale, fallbackLocale: false, where: { featured: { equals: true } }, limit: 8, sort: 'sortOrder' }),
    payload.find({ collection: 'doctors', locale, fallbackLocale: false, limit: 100, sort: 'sortOrder', depth: 1 }),
    homeVideos(payload, locale),
    listArticles(locale),
  ])

  const phone = settings.phone || clinicSocial.phone
  const publishedSlugs = new Set(articles.map((article) => article.slug))
  const latestArticles = [
    ...articles,
    ...articleSlugs.filter((slug) => !publishedSlugs.has(slug)).map((slug) => articleCopy(locale, slug)!),
  ].slice(0, 4)
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

  const chosenServices = (home.featuredServices || []).filter((item) => typeof item === 'object')
  const serviceCards = (chosenServices.length ? chosenServices : services.docs).flatMap((service) => {
    if (!isServiceAvailable(service.slug)) return []
    const copy = serviceCopy(locale, service.slug)
    const title = service.title || copy?.title
    return title ? [{ slug: service.slug, title, text: service.summary || copy?.text }] : []
  })
  const directory = new Map(doctorDirectory(locale, doctors.docs).map((doctor) => [doctor.slug, doctor]))
  const chosenDoctors = (home.featuredDoctors || []).flatMap((item) => typeof item === 'object' ? [item.slug] : [])
  const selectedDoctors = (chosenDoctors.length ? chosenDoctors : featuredDoctorSlugs).flatMap((slug) => {
    const doctor = directory.get(slug)
    return doctor ? [doctor] : []
  }).slice(0, 6)
  const heroMedia = typeof home.heroMedia === 'object' ? home.heroMedia : null
  const metrics = home.metrics?.filter((item) => item.label)
  const programmes = home.programs?.filter((item) => item.title && item.text).map((item) => ({
    title: item.title,
    text: item.text,
    slug: typeof item.service === 'object' ? item.service?.slug : undefined,
  }))
  const programmeCards = (programmes?.length ? programmes : defaultProgramSlugs.map((slug) => ({ slug, ...serviceCopy(locale, slug)! })))
    .filter((item) => !item.slug || isServiceAvailable(item.slug))
  const shortcuts = [
    { href: '/doctors', label: t.nav[1], Icon: HeartPulse },
    { href: '/services/ultrasound', label: serviceCopy(locale, 'ultrasound')!.title, Icon: ShieldCheck },
    { href: '/services/rehabilitation', label: serviceCopy(locale, 'rehabilitation')!.title, Icon: Sparkles },
  ]
  const style = {
    '--xon-ivory': settings.palette?.background || '#FAF9F6',
    '--xon-green': settings.palette?.primary || '#173B57',
    '--xon-green-2': settings.palette?.dark || '#102A3D',
    '--xon-gold': settings.palette?.accent || '#C18A43',
  } as CSSProperties

  return <main className="xon-site" lang={locale} style={style}>
    <JsonLd data={{
      '@graph': [
        {
          '@type': 'WebSite', '@id': `${origin}/#website`, name: 'XON Hospital', alternateName: 'XON HOSPITAL', url: `${origin}/`,
          publisher: { '@id': `${origin}/ru#clinic` },
        },
        {
          '@type': 'MedicalClinic', name: settings.clinicName || 'XON Hospital',
          '@id': `${origin}/ru#clinic`, url: `${origin}/ru`, telephone: phone.replace(/[^\d+]/g, ''),
          address: { '@type': 'PostalAddress', streetAddress: settings.address || undefined, addressLocality: 'Tashkent', addressCountry: 'UZ' },
          sameAs: [clinicSocial.instagram, clinicSocial.youtube],
          hasMap: clinicSocial.maps,
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00', closes: '23:59',
          },
          image: `${origin}${xonLogo.src}`, logo: `${origin}${xonLogo.src}`,
        },
      ],
    }} />
    <XonHeader locale={locale} home />
    <section className="xon-hero-v2" id="about">
      <div className="xon-hero-main">
        <div className="xon-hero-intro">
          <p className="xon-kicker"><span />{t.heroEyebrow}</p>
          <h1>{t.heroTitle} <em>{t.heroAccent}</em></h1>
          <p>{t.heroText}</p>
          <div className="xon-hero-actions">
            <a className="xon-primary" href="#appointment">{t.primaryAction}<ArrowDownRight size={18} /></a>
            <Link className="xon-text-link dark" href={`${prefix}/doctors`}>{ui.chooseDoctor}<ArrowUpRight size={17} /></Link>
          </div>
          <dl className="xon-hero-metrics">
            {(metrics?.length ? metrics : [{ value: '20', label: ui.doctorsCount }, { value: String(serviceSlugs.filter(isServiceAvailable).length), label: ui.servicesCount }]).map(({ value, label }) =>
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            )}
          </dl>
          <a className="xon-hero-phone" href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{ui.phone}<strong>{phone}</strong></a>
        </div>
        <div className="xon-hero-clinic">
          <Link className={`xon-clinic-visual${heroMedia?.url ? ' has-photo' : ''}`} href={`${prefix}/about`} aria-label={t.nav[2]}>
            {heroMedia?.url
              ? <Image src={heroMedia.url} alt={heroMedia.alt || ''} fill sizes="(max-width: 760px) 94vw, 42vw" preload unoptimized />
              : <Image src={xonLogo.src} alt="" width={176} height={176} preload />}
            <span className="xon-clinic-caption">{t.nav[2]}<ArrowUpRight size={18} aria-hidden="true" /></span>
          </Link>
          <nav className="xon-hero-shortcuts" aria-label={ui.navigation}>
            {shortcuts.map(({ href, label, Icon }) => <Link key={href} href={`${prefix}${href}`}><Icon size={19} aria-hidden="true" /><span>{label}</span><ArrowUpRight size={15} aria-hidden="true" /></Link>)}
          </nav>
        </div>
      </div>
    </section>
    <XonVideoSection locale={locale} items={videos('home:hero')} />

    <section className="xon-programs">
      <div className="xon-programs-head"><p className="xon-label">{home.programsEyebrow || ui.programs}</p><h2>{home.programsTitle || ui.programsTitle}</h2><p>{home.programsText || ui.programsText}</p></div>
      <div className="xon-program-grid">
        {programmeCards.map((item, index) => <Link href={`${prefix}/services${item.slug ? `/${item.slug}` : ''}`} key={`${item.title}-${index}`}><h3>{item.title}</h3><p>{item.text}</p><b>{ui.more} ↗</b></Link>)}
      </div>
    </section>
    <XonVideoSection locale={locale} items={videos('home:programs')} />

    <section className="xon-services" id="services">
      <div className="xon-section-head"><p className="xon-label">{t.servicesLabel}</p><h2>{t.servicesTitle}</h2><p>{t.servicesText}</p></div>
      <div className="xon-service-list">
        {(serviceCards.length ? serviceCards : serviceSlugs.filter(isServiceAvailable).slice(0, 8).map((slug) => ({ slug, ...serviceCopy(locale, slug)! }))).map((item, index) => (
          <article key={item.slug} className="xon-service-card"><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p><Link href={`${prefix}/services/${item.slug}`} aria-label={`${item.title} · ${ui.more}`}><ArrowUpRight /></Link></article>
        ))}
      </div>
    </section>
    <XonVideoSection locale={locale} items={videos('home:services')} />

    <section className="xon-path" id="prices">
      <div className="xon-path-intro"><p className="xon-label light">{t.pathLabel}</p><h2>{t.pathTitle}</h2></div>
      <ol className="xon-path-steps">{t.pathSteps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
    </section>
    <XonVideoSection locale={locale} items={videos('home:path')} />

    <section className="xon-team-section" id="doctors">
      <div className="xon-programs-head"><p className="xon-label">{t.doctorsLabel}</p><h2>{t.doctorsTitle}</h2><p>{t.doctorsText}</p><Link href={`${prefix}/doctors`} className="xon-text-link dark">{ui.chooseDoctor}<ArrowUpRight size={17} /></Link></div>
      <div className="xon-team-portraits">
        {selectedDoctors.map((doctor) => <Link className="xon-portrait-card" href={`${prefix}/doctors/${doctor.slug}`} key={doctor.slug}>
          {doctor.photoUrl && <Image src={doctor.photoUrl} alt="" width={500} height={600} sizes="(max-width: 620px) 46vw, 23vw" unoptimized={!doctor.photoUrl.startsWith('/doctors/')} />}
          <div><span>{doctor.specialty}</span><h3>{doctor.name}</h3><p>{doctor.position}</p></div><ArrowUpRight size={18} />
        </Link>)}
      </div>
    </section>
    <XonVideoSection locale={locale} items={videos('home:doctors')} />

    <section className="xon-affordability">
      <div className="xon-coin" aria-hidden="true"><span>X</span></div><div><h2>{t.affordabilityTitle}</h2><p>{t.affordabilityText}</p></div><a href="#appointment" aria-label={t.primaryAction}><ArrowDownRight /></a>
    </section>
    <XonVideoSection locale={locale} items={videos('home:prices')} />

    <section className="xon-programs xon-journal">
      <div className="xon-programs-head"><h2>{ui.journal}</h2><Link className="xon-text-link dark" href={`${prefix}/articles`}>{ui.more}<ArrowUpRight size={16} /></Link></div>
      <div className="xon-guide-links">{latestArticles.map((article) =>
        <Link href={`${prefix}/articles/${article.slug}`} key={article.slug}><h3>{article.title}</h3><p>{article.description}</p><ArrowUpRight size={19} /></Link>
      )}</div>
      <div className="xon-social-links"><span>{ui.officialMedia}</span><a href={clinicSocial.youtube} target="_blank" rel="noreferrer">YouTube ↗</a><a href={clinicSocial.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></div>
    </section>
    <XonVideoSection locale={locale} items={videos('home:articles')} />

    <section className="xon-appointment" id="appointment">
      <div className="xon-appointment-copy"><p className="xon-label light">{t.nav[4]}</p><h2>{t.formTitle}</h2><p>{t.formText}</p>
        <a className="xon-contact-placeholder" href={`tel:${phone.replace(/[^\d+]/g, '')}`}><small>{ui.phone}</small><strong>{phone}</strong></a>
      </div>
      <LeadForm locale={locale} labels={t} />
    </section>
    <XonVideoSection locale={locale} items={videos('home:appointment')} />
    <XonFooter locale={locale} settings={settings} />
  </main>
}
