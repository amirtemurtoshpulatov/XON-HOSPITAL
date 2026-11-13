import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import { interiorCopy } from '@/components/XonInterior/copy'
import { LeadForm } from '@/components/XonHome/LeadForm'
import { content, localeCodes, type SiteLocale } from '@/components/XonHome/content'

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: 'ru' })
  const copy = interiorCopy[locale].contacts
  const labels = content[locale]

  return <XonInterior locale={locale} eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} index="05">
    <section className="xon-page-content xon-contacts-grid" id="appointment">
      <div className="xon-contact-lines"><div className="xon-contact-line"><small>Телефон</small><strong>{settings.phone || '+998 ·· ··· ·· ··'}</strong></div><div className="xon-contact-line"><small>Адрес</small><strong>{settings.address || 'Адрес добавляется в админке'}</strong></div><div className="xon-contact-line"><small>Часы работы</small><strong>{settings.workingHours || 'График добавляется в админке'}</strong></div><div className="xon-contact-line"><small>Instagram</small><strong>{settings.instagram || '@xonhospital'}</strong></div></div>
      <div className="xon-contact-form-wrap"><h2>{labels.formTitle}</h2><LeadForm locale={locale} labels={labels} /></div>
    </section>
  </XonInterior>
}
