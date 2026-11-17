import config from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { XonInterior } from '@/components/XonInterior'
import { XonVideoSection, type XonVideoItem } from '@/components/XonVideo'
import RichText from '@/components/RichText'
import { LeadForm } from '@/components/XonHome/LeadForm'
import { content, localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { doctorProfile } from '@/lib/xonDoctors'
import { xonCopy } from '@/lib/xonCopy'
import { httpsLink, officialDoctorReel, officialDoctorVideo, videoEmbed } from '@/lib/xonVideo'
import { visitGuideSlug } from '@/lib/xonArticles'

export default async function DoctorDetailPage({ params }: { params: Promise<{ locale: SiteLocale; slug: string }> }) {
  const { locale, slug } = await params
  if (!localeCodes.includes(locale)) notFound()
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'doctors', locale, fallbackLocale: false, where: { slug: { equals: slug } }, limit: 1, depth: 2 })
  const doctor = doctorProfile(locale, slug, docs[0])
  if (!doctor) notFound()

  const ui = xonCopy(locale)
  const t = content[locale]
  const reel = officialDoctorReel(slug)
  const primaryVideo = (doctor.videoUrl && videoEmbed(doctor.videoUrl) ? doctor.videoUrl : null) || officialDoctorVideo(slug) || reel
  const videos: XonVideoItem[] = [
    ...(doctor.videoLibrary || []),
    ...(primaryVideo ? [{ title: doctor.videoTitle || ui.videoTitle, url: primaryVideo, relatedReel: reel !== primaryVideo ? reel : undefined }] : []),
    ...(doctor.videos || []),
  ]
  const handle = doctor.instagram?.replace(/^@/, '')
  const instagram = handle && /^[\w.]+$/.test(handle) ? `https://www.instagram.com/${handle}/` : httpsLink(doctor.instagram)
  const facts = [
    [ui.specialty, doctor.specialty], [ui.experience, doctor.experience], [ui.category, doctor.category],
    [ui.education, doctor.education], [ui.languages, doctor.languages?.map(({ label }) => label).join(' · ')],
  ]
  const appointment = [[ui.schedule, doctor.schedule], [ui.primaryPrice, doctor.primaryPrice], [ui.followUpPrice, doctor.followUpPrice]]

  return <XonInterior locale={locale} videoSection={`doctors/${slug}`} appointmentHref={doctor.acceptsAppointments !== false ? '#appointment' : undefined} eyebrow={doctor.specialty} title={doctor.name} intro={doctor.position} index="02">
    <section className={`xon-page-content xon-detail${doctor.photoUrl ? '' : ' xon-detail-no-photo'}`}>
      {doctor.photoUrl && <div className="xon-profile-photo"><Image src={doctor.photoUrl} alt={doctor.name} fill sizes="(max-width: 900px) 88vw, 38vw" unoptimized={!doctor.photoUrl.startsWith('/doctors/')} /></div>}
      <div className="xon-detail-copy">
        <h2>{ui.bio}</h2>
        {doctor.bio ? <RichText data={doctor.bio} enableGutter={false} className="xon-richtext" /> : doctor.shortBio && <p>{doctor.shortBio}</p>}
        <dl className="xon-detail-meta">{facts.filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <div className="xon-social-links">
          {instagram && <a className="xon-social-link" href={instagram} target="_blank" rel="noreferrer">Instagram {handle && /^[\w.]+$/.test(handle) ? `· @${handle}` : ''}</a>}
          {doctor.socialLinks?.map((social) => {
            const url = httpsLink(social.url)
            return url && <a className="xon-social-link" href={url} target="_blank" rel="noreferrer" key={social.id || url}>{social.label} ↗</a>
          })}
          <Link className="xon-social-link" href={`/${locale}/articles/${visitGuideSlug}`}>{ui.visit} ↗</Link>
        </div>
      </div>
    </section>
    {appointment.some(([, value]) => value) && <section className="xon-doctor-facts">{appointment.map(([label, value]) => value && <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</section>}
    {Boolean(doctor.focusAreas?.length || doctor.procedures?.length) && <section className="xon-doctor-expertise">
      <div><h2>{ui.reasons}</h2></div>
      <div className="xon-expertise-columns">
        {Boolean(doctor.focusAreas?.length) && <div><h3>{t.nav[0]}</h3><ul>{doctor.focusAreas?.map((item) => <li key={item.id || item.label}>{item.label}</li>)}</ul></div>}
        {Boolean(doctor.procedures?.length) && <div><h3>{ui.procedures}</h3><ul>{doctor.procedures?.map((item) => <li key={item.id || item.label}>{item.label}</li>)}</ul></div>}
      </div>
    </section>}
    <XonVideoSection locale={locale} items={videos} />
    {Boolean(doctor.credentials?.length) && <section className="xon-page-content">
      <div className="xon-section-title"><h2>{ui.education}</h2></div>
      <div className="xon-credentials">{doctor.credentials?.map((item) => <article key={item.id || item.title}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.institution}</p></div></article>)}</div>
    </section>}
    {Boolean(doctor.articles?.length) && <section className="xon-page-content">
      <div className="xon-section-title"><h2>{ui.journal}</h2></div>
      <div className="xon-list-grid">{doctor.articles?.map((article) => {
        const url = httpsLink(article.url)
        const copy = <><h3>{article.title}</h3><p>{article.summary}</p></>
        return url ? <a className="xon-list-card" href={url} target="_blank" rel="noreferrer" key={article.id || article.title}>{copy}</a> : <article className="xon-list-card" key={article.id || article.title}>{copy}</article>
      })}</div>
    </section>}
    {doctor.acceptsAppointments !== false && <section className="xon-doctor-booking" id="appointment">
      <div><h2>{t.primaryAction}</h2><p>{t.formText}</p></div>
      <LeadForm locale={locale} labels={t} defaultService={`${doctor.name} · ${doctor.specialty}`} />
    </section>}
  </XonInterior>
}
