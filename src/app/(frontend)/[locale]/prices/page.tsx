import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import { interiorCopy } from '@/components/XonInterior/copy'
import { xonCopy } from '@/lib/xonCopy'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'

export default async function PricesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'prices', locale, fallbackLocale: false, where: { active: { equals: true } }, limit: 200, sort: 'sortOrder' })
  const copy = interiorCopy[locale].prices
  const prices = result.docs.filter((price) => price.title)
  const ui = xonCopy(locale)

  return <XonInterior locale={locale} videoSection="prices" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} index="04">
    <section className="xon-page-content">{prices.length ? <div className="xon-prices-list">{prices.map((price) => <article className="xon-price-row" key={price.id}><h2>{price.title}</h2><p>{price.description}</p><strong>{price.priceLabel || (typeof price.price === 'number' ? `${new Intl.NumberFormat(locale).format(price.price)} ${price.currency}` : ui.priceOnRequest)}</strong></article>)}</div> : <div className="xon-empty">{copy.empty}</div>}</section>
  </XonInterior>
}
