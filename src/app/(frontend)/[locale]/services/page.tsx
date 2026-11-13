import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import { interiorCopy } from '@/components/XonInterior/copy'
import { content, localeCodes, type SiteLocale } from '@/components/XonHome/content'

const fallbackSlugs = ['neurology', 'orthopedics', 'gastroenterology', 'dermatology', 'check-up', 'rehabilitation']

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'services', locale, fallbackLocale: 'ru', limit: 100, sort: 'sortOrder' })
  const fallback = content[locale].serviceItems.map((item, index) => ({ ...item, slug: fallbackSlugs[index] }))
  const services = result.docs.length ? result.docs.map((service, index) => ({ number: String(index + 1).padStart(2, '0'), title: service.title, text: service.summary, slug: service.slug })) : fallback
  const copy = interiorCopy[locale].services

  return <XonInterior locale={locale} eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} index="01">
    <section className="xon-page-content">
      <div className="xon-filter-note"><span>01 — {String(services.length).padStart(2, '0')}</span><span>XON HOSPITAL</span></div>
      <div className="xon-list-grid">{services.map((service) => <Link className="xon-list-card" key={service.slug} href={`/${locale}/services/${service.slug}`}><span>{service.number}</span><h2>{service.title}</h2><p>{service.text}</p><ArrowUpRight /></Link>)}</div>
    </section>
  </XonInterior>
}
