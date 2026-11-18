import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import { interiorCopy } from '@/components/XonInterior/copy'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { doctorDirectory } from '@/lib/xonDoctors'

import { sectionMetadata } from '@/lib/xonSeo'

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return sectionMetadata(params, '/doctors')
}

export default async function DoctorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'doctors', locale, fallbackLocale: false, limit: 100, sort: 'sortOrder', depth: 1 })
  const doctors = doctorDirectory(locale, result.docs)
  const copy = interiorCopy[locale].doctors

  return <XonInterior locale={locale} videoSection="doctors" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} index="02">
    <section className="xon-page-content">
      <div className="xon-team-portraits">{doctors.map((doctor) =>
        <Link key={doctor.slug} className="xon-portrait-card" href={`/${locale}/doctors/${doctor.slug}`}>
          {doctor.photoUrl && <Image src={doctor.photoUrl} alt="" width={500} height={600} sizes="(max-width: 620px) 46vw, 24vw" unoptimized={!doctor.photoUrl.startsWith('/doctors/')} />}
          <div><span>{doctor.specialty}</span><h2>{doctor.name}</h2><p>{doctor.position}</p></div><ArrowUpRight size={18} />
        </Link>
      )}</div>
    </section>
  </XonInterior>
}
