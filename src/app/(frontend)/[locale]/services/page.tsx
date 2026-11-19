import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import { interiorCopy } from '@/components/XonInterior/copy'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'

import { isServiceAvailable, serviceCopy, serviceSlugs } from '@/lib/xonServices'

import { sectionMetadata } from '@/lib/xonSeo'

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return sectionMetadata(params, '/services')
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'services', locale, fallbackLocale: false, limit: 100, sort: 'sortOrder' })
  const source = new Map(result.docs.map((service) => [service.slug, service]))
  const slugs = [...new Set([...source.keys(), ...serviceSlugs])].filter(isServiceAvailable)
  const services = slugs.flatMap((slug, index) => {
    const service = source.get(slug)
    const fallback = serviceCopy(locale, slug)
    const title = service?.title || fallback?.title
    return title ? [{ number: String(index + 1).padStart(2, '0'), title, text: service?.summary || fallback?.text, slug }] : []
  })
  const copy = interiorCopy[locale].services

  return <XonInterior locale={locale} videoSection="services" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} index="01">
    <section className="xon-page-content">
      <div className="xon-filter-note"><span>01 — {String(services.length).padStart(2, '0')}</span><span>XON HOSPITAL</span></div>
      <div className="xon-list-grid">{services.map((service) => <Link className="xon-list-card" key={service.slug} href={`/${locale}/services/${service.slug}`}><span>{service.number}</span><h2>{service.title}</h2><p>{service.text}</p><ArrowUpRight /></Link>)}</div>
    </section>
  </XonInterior>
}
