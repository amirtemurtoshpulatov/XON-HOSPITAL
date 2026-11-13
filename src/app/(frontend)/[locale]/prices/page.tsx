import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import { interiorCopy } from '@/components/XonInterior/copy'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'

export default async function PricesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'prices', locale, fallbackLocale: 'ru', where: { active: { equals: true } }, limit: 200, sort: 'sortOrder' })
  const copy = interiorCopy[locale].prices

  return <XonInterior locale={locale} eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} index="04">
    <section className="xon-page-content"><div className="xon-price-intro"><h2>Стоимость без скрытых шагов.</h2></div>{result.docs.length ? <div className="xon-prices-list">{result.docs.map((price) => <article className="xon-price-row" key={price.id}><h2>{price.title}</h2><p>{price.description}</p><strong>{price.priceLabel || (price.price ? `${new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'ru-RU').format(price.price)} ${price.currency}` : 'По запросу')}</strong></article>)}</div> : <div className="xon-empty">{copy.empty}</div>}</section>
  </XonInterior>
}
