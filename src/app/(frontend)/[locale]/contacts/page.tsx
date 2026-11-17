import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import { interiorCopy } from '@/components/XonInterior/copy'
import { LeadForm } from '@/components/XonHome/LeadForm'
import { xonCopy, clinicSocial } from '@/lib/xonCopy'
import { content, localeCodes, type SiteLocale } from '@/components/XonHome/content'

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: false })
  const copy = interiorCopy[locale].contacts
  const labels = content[locale]
  const ui = xonCopy(locale)
  const phone = settings.phone || clinicSocial.phone

  return <XonInterior locale={locale} eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} index="05">
    <section className="xon-page-content xon-contacts-grid" id="appointment">
      <div className="xon-contact-lines">
        <div className="xon-contact-line"><small>{ui.phone}</small><a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a></div>
        <div className="xon-contact-line"><small>{ui.address}</small><strong>{settings.address || ui.city}</strong></div>
        {settings.workingHours && <div className="xon-contact-line"><small>{ui.hours}</small><strong>{settings.workingHours}</strong></div>}
        <div className="xon-social-links"><a href={clinicSocial.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={clinicSocial.youtube} target="_blank" rel="noreferrer">YouTube ↗</a></div>
      </div>
      <div className="xon-contact-form-wrap"><h2>{labels.formTitle}</h2><LeadForm locale={locale} labels={labels} /></div>
    </section>
  </XonInterior>
}
