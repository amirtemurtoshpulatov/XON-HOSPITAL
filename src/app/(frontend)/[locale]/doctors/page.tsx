import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import { interiorCopy } from '@/components/XonInterior/copy'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { getSeededDoctorPhoto } from '@/lib/doctorPhotos'

const fallbackDoctors = [
  { slug: 'xursand-yusupboyevich', name: 'Хурсанд Юсупбоевич', specialty: 'Гастроэнтерология', position: 'Основатель, главный врач' },
  { slug: 'fayzullo-narzullayevich', name: 'Файзулло Нарзуллаевич', specialty: 'Неврология', position: 'Врач-невролог' },
  { slug: 'zafar-abdirazzakov', name: 'Зафар Абдираззаков', specialty: 'Ортопедия и вертебрология', position: 'Ортопед-вертебролог' },
  { slug: 'dilshod-abdusammatovich', name: 'Дилшод Абдусамматович', specialty: 'Онкология', position: 'Врач-онколог' },
  { slug: 'ruslan-alisherovich', name: 'Руслан Алишерович', specialty: 'Онкология', position: 'Врач-онколог' },
  { slug: 'vohid-latipov', name: 'Вохид Латипов', specialty: 'Дерматология и трихология', position: 'Врач-дерматолог' },
]

export default async function DoctorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'doctors', locale, fallbackLocale: 'ru', limit: 100, sort: 'sortOrder', depth: 1 })
  const doctors = result.docs.length ? result.docs : fallbackDoctors
  const copy = interiorCopy[locale].doctors

  return <XonInterior locale={locale} eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} index="02">
    <section className="xon-page-content">
      <div className="xon-doctors-grid">{doctors.map((doctor) => {
        const photo = ('photo' in doctor && typeof doctor.photo === 'object' && doctor.photo?.url ? doctor.photo.url : undefined) || getSeededDoctorPhoto(doctor.slug)
        return <Link key={doctor.slug} className="xon-doctor-link" href={`/${locale}/doctors/${doctor.slug}`} style={photo ? { backgroundImage: `linear-gradient(0deg, rgba(23,59,87,.75), transparent 70%), url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff' } : undefined}><span>{doctor.specialty}</span><ArrowUpRight /><h2>{doctor.name}</h2><p>{doctor.position}</p></Link>
      })}</div>
    </section>
  </XonInterior>
}
