import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import { ClinicBreadcrumbs } from '@/components/ClinicBreadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import RichText from '@/components/RichText'
import { LeadForm } from '@/components/XonHome/LeadForm'
import { content, localeCodes, type SiteLocale } from '@/components/XonHome/content'

import { isServiceAvailable, serviceCopy } from '@/lib/xonServices'
import { doctorProfile } from '@/lib/xonDoctors'
import { xonCopy } from '@/lib/xonCopy'
import { articleCopy, visitGuideSlug } from '@/lib/xonArticles'
import { articlesForService, findService, serviceLocales } from '@/lib/clinicContent'
import { pageSEO, siteOrigin } from '@/lib/xonSeo'
import { serviceSearchCopy } from '@/lib/xonServiceSeo'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) return {}
  const locale = rawLocale as SiteLocale
  const service = await findService(locale, slug)
  const fallback = serviceCopy(locale, slug)
  const title = service?.title || fallback?.title
  if (!title) return {}
  const cover = typeof service?.cover === 'object' ? service.cover : null
  return pageSEO(locale, `/services/${slug}`, {
    ...serviceSearchCopy(locale, slug, title, service?.summary || fallback?.text),
    image: cover?.url,
    imageAlt: cover?.alt ?? undefined,
    locales: await serviceLocales(slug),
    ...(!isServiceAvailable(slug) ? { robots: { index: false, follow: true } } : {}),
  })
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const service = await findService(locale, slug)
  const fallback = serviceCopy(locale, slug)
  const title = service?.title || fallback?.title
  if (!title) notFound()
  const summary = service?.summary || fallback?.text
  const t = content[locale]
  const ui = xonCopy(locale)
  if (!isServiceAvailable(slug)) return <XonInterior locale={locale} videoSection={`services/${slug}`} eyebrow={ui.inDevelopment} title={title} intro={ui.developmentText} index="01">
    <ClinicBreadcrumbs locale={locale} section={{ path: '/services', label: t.nav[0] }} title={title} slug={slug} />
    <section className="xon-page-content"><Link className="xon-text-link" href={`/${locale}/doctors`}>{ui.chooseDoctor} ↗</Link></section>
  </XonInterior>
  const relatedDoctors = (service?.doctors || []).flatMap((doctor) => {
    if (typeof doctor !== 'object' || !doctor) return []
    const profile = doctorProfile(locale, doctor.slug, doctor)
    return profile ? [profile] : []
  })
  const visitGuide = articleCopy(locale, visitGuideSlug)!

  const cover = service && typeof service.cover === 'object' && service.cover?.url ? service.cover.url : undefined
  const facts = service?.keyFacts || []
  const symptoms = service?.symptoms || []
  const conditions = service?.conditions || []
  const diagnostics = service?.diagnostics || []
  const advantages = service?.advantages || []
  const prices = service?.prices || []
  const faq = service?.faq || []
  const articles = service?.id ? await articlesForService(locale, service.id) : []
  const url = new URL(`/${locale}/services/${slug}`, siteOrigin()).href

  return <XonInterior locale={locale} videoSection={`services/${slug}`} eyebrow={service?.eyebrow || ui.info} title={title} intro={summary} index="01">
    <ClinicBreadcrumbs locale={locale} section={{ path: '/services', label: t.nav[0] }} title={title} slug={slug} />
    {['ent', 'therapy'].includes(slug) && <aside className="xon-service-notice"><strong>24/7</strong><p>{ui.nightCare}</p></aside>}
    <JsonLd data={{
      '@type': 'Service', '@id': `${url}#service`, name: title, description: summary,
      url, mainEntityOfPage: url,
      provider: { '@type': 'MedicalClinic', '@id': `${siteOrigin()}/ru#clinic`, name: 'XON Hospital', url: `${siteOrigin()}/ru` },
      areaServed: { '@type': 'City', name: 'Tashkent' },
    }} />
    {facts.length > 0 && <section className="xon-service-facts" aria-label={ui.facts}>{facts.map((fact) => <div key={fact.id || `${fact.label}-${fact.value}`}><small>{fact.label}</small><strong>{fact.value}</strong></div>)}</section>}
    <section className={`xon-page-content xon-detail${cover ? '' : ' xon-detail-no-photo'}`}>
      {cover && <div className="xon-detail-media" style={{ backgroundImage: `url(${cover})` }} />}
      <div className="xon-detail-copy"><h2>{ui.info}</h2><p>{summary}</p>{service?.content && <RichText data={service.content} enableGutter={false} className="xon-richtext" />}<Link href={`/${locale}/articles/${visitGuide.slug}`} className="xon-social-link">{visitGuide.title} ↗</Link></div>
    </section>
    {(symptoms.length > 0 || conditions.length > 0) && <section className="xon-service-reasons"><div className="xon-service-reasons-head"><h2>{ui.reasons}</h2></div><div className="xon-service-reason-grid">{symptoms.length > 0 && <div><span>01</span><h3>{ui.symptoms}</h3><ul>{symptoms.map((item) => <li key={item.id || item.label}><Check size={17} />{item.label}</li>)}</ul></div>}{conditions.length > 0 && <div><span>02</span><h3>{ui.conditions}</h3><ul>{conditions.map((item) => <li key={item.id || item.label}><Check size={17} />{item.label}</li>)}</ul></div>}</div></section>}
    {diagnostics.length > 0 && <section className="xon-page-content"><div className="xon-section-title"><h2>{ui.procedures}</h2></div><div className="xon-diagnostic-grid">{diagnostics.map((item, index) => { const relatedSlug = item.service && typeof item.service === 'object' ? item.service.slug : null; const card = <><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p>{relatedSlug && <ArrowUpRight />}</>; return relatedSlug ? <Link key={item.id || item.title} href={`/${locale}/services/${relatedSlug}`}>{card}</Link> : <article key={item.id || item.title}>{card}</article> })}</div></section>}
    {(advantages.length > 0 || prices.length > 0) && <section className="xon-service-evidence"><div>{advantages.length > 0 && <><h2>{ui.advantages}</h2><ul>{advantages.map((item) => <li key={item.id || item.label}><Check size={18} />{item.label}</li>)}</ul></>}</div>{prices.length > 0 && <div className="xon-service-prices"><p className="xon-label">{t.nav[3]}</p>{prices.map((item) => <div key={item.id || `${item.title}-${item.price}`}><span><strong>{item.title}</strong><small>{item.category}</small></span><b>{item.price}</b></div>)}</div>}</section>}
    {relatedDoctors.length > 0 && <section className="xon-page-content"><div className="xon-section-title"><h2>{t.nav[1]}</h2></div><div className="xon-related-doctors">{relatedDoctors.map((doctor) => <Link key={doctor.slug} href={`/${locale}/doctors/${doctor.slug}`}><span>{doctor.specialty}</span><h3>{doctor.name}</h3><p>{doctor.experience || doctor.position}</p><ArrowUpRight /></Link>)}</div></section>}
    {faq.length > 0 && <section className="xon-page-content xon-faq"><div className="xon-section-title"><h2>{ui.faq}</h2></div><div>{faq.map((item) => <details key={item.id || item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></section>}
    {articles.length > 0 && <section className="xon-page-content xon-service-articles">
      <div className="xon-section-title"><h2>{ui.journal}</h2></div>
      <div className="xon-list-grid">{articles.map((article) => <Link className="xon-list-card" href={`/${locale}/articles/${article.slug}`} key={article.slug}>
        <h3>{article.title}</h3><p>{article.description}</p><ArrowUpRight aria-hidden="true" />
      </Link>)}</div>
    </section>}
    <section className="xon-doctor-booking"><div><h2>{t.primaryAction}</h2><p>{t.formText}</p></div><LeadForm locale={locale} labels={content[locale]} defaultService={title} /></section>
  </XonInterior>
}
