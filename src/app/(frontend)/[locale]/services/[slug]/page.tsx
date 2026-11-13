import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import RichText from '@/components/RichText'
import { LeadForm } from '@/components/XonHome/LeadForm'
import { content, localeCodes, type SiteLocale } from '@/components/XonHome/content'

const fallbackSlugs = ['neurology', 'orthopedics', 'gastroenterology', 'dermatology', 'check-up', 'rehabilitation']

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'services', locale, fallbackLocale: 'ru', where: { slug: { equals: slug } }, limit: 1, depth: 2 })
  const service = result.docs[0]
  const fallbackIndex = fallbackSlugs.indexOf(slug)
  if (!service && fallbackIndex === -1) notFound()
  const fallback = content[locale].serviceItems[fallbackIndex]
  const title = service?.title || fallback.title
  const summary = service?.summary || fallback.text
  const cover = service && typeof service.cover === 'object' && service.cover?.url ? service.cover.url : undefined
  const facts = service?.keyFacts || []
  const symptoms = service?.symptoms || []
  const conditions = service?.conditions || []
  const diagnostics = service?.diagnostics || []
  const advantages = service?.advantages || []
  const prices = service?.prices || []
  const faq = service?.faq || []

  return <XonInterior locale={locale} eyebrow={service?.eyebrow || 'Направление XON'} title={title} intro={summary} index="01">
    {facts.length > 0 && <section className="xon-service-facts" aria-label="Ключевые факты">{facts.map((fact) => <div key={fact.id || `${fact.label}-${fact.value}`}><small>{fact.label}</small><strong>{fact.value}</strong></div>)}</section>}
    <section className="xon-page-content xon-detail">
      <div className="xon-detail-media" style={cover ? { backgroundImage: `url(${cover})` } : undefined} />
      <div className="xon-detail-copy"><h2>Персональный маршрут вместо набора процедур.</h2><p>{summary}</p>{service?.content && <RichText data={service.content} enableGutter={false} className="xon-richtext" />}<p><small>Информация носит ознакомительный характер. Диагноз и план лечения определяются врачом после консультации.</small></p></div>
    </section>
    {(symptoms.length > 0 || conditions.length > 0) && <section className="xon-service-reasons"><div className="xon-service-reasons-head"><p className="xon-label light">Когда обращаться<span>ориентиры</span></p><h2>Симптомы и задачи направления</h2><p>Этот список помогает выбрать подходящего специалиста, но не заменяет медицинскую консультацию.</p></div><div className="xon-service-reason-grid">{symptoms.length > 0 && <div><span>01</span><h3>Поводы для обращения</h3><ul>{symptoms.map((item) => <li key={item.id || item.label}><Check size={17} />{item.label}</li>)}</ul></div>}{conditions.length > 0 && <div><span>02</span><h3>С чем работает отделение</h3><ul>{conditions.map((item) => <li key={item.id || item.label}><Check size={17} />{item.label}</li>)}</ul></div>}</div></section>}
    {diagnostics.length > 0 && <section className="xon-page-content"><div className="xon-section-title"><p className="xon-label">Диагностика и процедуры<span>{String(diagnostics.length).padStart(2, '0')}</span></p><h2>Что может входить в маршрут пациента</h2></div><div className="xon-diagnostic-grid">{diagnostics.map((item, index) => { const relatedSlug = item.service && typeof item.service === 'object' ? item.service.slug : null; const card = <><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p>{relatedSlug && <ArrowUpRight />}</>; return relatedSlug ? <Link key={item.id || item.title} href={`/${locale}/services/${relatedSlug}`}>{card}</Link> : <article key={item.id || item.title}>{card}</article> })}</div></section>}
    {(advantages.length > 0 || prices.length > 0) && <section className="xon-service-evidence"><div>{advantages.length > 0 && <><p className="xon-label">Почему XON<span>подход</span></p><h2>Медицина без лишней неопределённости.</h2><ul>{advantages.map((item) => <li key={item.id || item.label}><Check size={18} />{item.label}</li>)}</ul></>}</div>{prices.length > 0 && <div className="xon-service-prices"><p className="xon-label">Стоимость<span>основные позиции</span></p>{prices.map((item) => <div key={item.id || `${item.title}-${item.price}`}><span><strong>{item.title}</strong><small>{item.category}</small></span><b>{item.price}</b></div>)}<small>Окончательная стоимость зависит от консультации и необходимого объёма обследований.</small></div>}</section>}
    {service?.doctors && service.doctors.some((doctor) => typeof doctor === 'object') && <section className="xon-page-content"><div className="xon-section-title"><p className="xon-label">Команда направления<span>врачи</span></p><h2>Специалисты, которые ведут приём</h2></div><div className="xon-related-doctors">{service.doctors.map((doctor) => typeof doctor === 'object' ? <Link key={doctor.id} href={`/${locale}/doctors/${doctor.slug}`}><span>{doctor.specialty}</span><h3>{doctor.name}</h3><p>{doctor.experience || doctor.position}</p><ArrowUpRight /></Link> : null)}</div></section>}
    {faq.length > 0 && <section className="xon-page-content xon-faq"><div className="xon-section-title"><p className="xon-label">Вопросы<span>FAQ</span></p><h2>Что важно знать до визита</h2></div><div>{faq.map((item) => <details key={item.id || item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></section>}
    <section className="xon-doctor-booking"><div><p className="xon-label light">Запись<span>онлайн</span></p><h2>Записаться по направлению «{title}»</h2><p>Администратор уточнит задачу и поможет выбрать врача, время и формат приёма.</p></div><LeadForm locale={locale} labels={content[locale]} defaultService={title} /></section>
  </XonInterior>
}
