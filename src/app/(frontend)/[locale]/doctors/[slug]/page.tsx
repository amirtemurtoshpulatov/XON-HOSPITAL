import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import RichText from '@/components/RichText'
import { LeadForm } from '@/components/XonHome/LeadForm'
import { content, localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { getSeededDoctorPhoto } from '@/lib/doctorPhotos'

const fallbackDoctors = {
  'xursand-yusupboyevich': { name: 'Хурсанд Юсупбоевич', specialty: 'Гастроэнтерология', position: 'Основатель, главный врач', shortBio: 'Консультация и сопровождение пациентов по вопросам здоровья пищеварительной системы.' },
  'fayzullo-narzullayevich': { name: 'Файзулло Нарзуллаевич', specialty: 'Неврология', position: 'Врач-невролог', shortBio: 'Диагностика и сопровождение пациентов с заболеваниями нервной системы.' },
  'zafar-abdirazzakov': { name: 'Зафар Абдираззаков', specialty: 'Ортопедия и вертебрология', position: 'Ортопед-вертебролог', shortBio: 'Работа с заболеваниями позвоночника, суставов и нарушениями движения.' },
  'dilshod-abdusammatovich': { name: 'Дилшод Абдусамматович', specialty: 'Онкология', position: 'Врач-онколог', shortBio: 'Консультация по вопросам онкологической диагностики и маршрутизации пациента.' },
  'ruslan-alisherovich': { name: 'Руслан Алишерович', specialty: 'Онкология', position: 'Врач-онколог', shortBio: 'Экспертная консультация и сопровождение в рамках подтверждённых возможностей клиники.' },
  'vohid-latipov': { name: 'Вохид Латипов', specialty: 'Дерматология и трихология', position: 'Врач-дерматолог', shortBio: 'Диагностика и лечение заболеваний кожи, волос и кожи головы.' },
} as const

function getVideoEmbed(url?: string | null) {
  if (!url) return null
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be') return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}`
    if (['youtube.com', 'www.youtube.com'].includes(parsed.hostname)) {
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }
    if (['vimeo.com', 'www.vimeo.com'].includes(parsed.hostname)) return `https://player.vimeo.com/video/${parsed.pathname.split('/').filter(Boolean)[0]}`
  } catch { return null }
  return null
}

export default async function DoctorDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'doctors', locale, fallbackLocale: 'ru', where: { slug: { equals: slug } }, limit: 1, depth: 2 })
  const doctor = result.docs[0]
  const fallback = fallbackDoctors[slug as keyof typeof fallbackDoctors]
  if (!doctor && !fallback) notFound()
  const name = doctor?.name || fallback.name
  const specialty = doctor?.specialty || fallback.specialty
  const position = doctor?.position || fallback.position
  const shortBio = doctor?.shortBio || fallback.shortBio
  const photo = (doctor && typeof doctor.photo === 'object' && doctor.photo?.url ? doctor.photo.url : undefined) || getSeededDoctorPhoto(slug)
  const videoEmbed = getVideoEmbed(doctor?.videoUrl)
  const videos = [
    ...(videoEmbed ? [{ title: doctor?.videoTitle || `Знакомство с врачом — ${name}`, description: 'Врач рассказывает о своём подходе, опыте и ситуациях, с которыми к нему обращаются.', embed: videoEmbed }] : []),
    ...(doctor?.videos || []).map((video) => ({ title: video.title, description: video.description, embed: getVideoEmbed(video.url) })).filter((video) => video.embed),
  ]
  const labels = content[locale]

  return <XonInterior locale={locale} eyebrow={specialty} title={name} intro={shortBio} index="02">
    <section className="xon-page-content xon-detail">
      <div className="xon-detail-media" style={photo ? { backgroundImage: `url(${photo})` } : undefined} />
      <div className="xon-detail-copy"><h2>{position}</h2><div className="xon-detail-meta"><div><small>Специализация</small><strong>{specialty}</strong></div><div><small>Опыт</small><strong>{doctor?.experience || 'Уточняется'}</strong></div>{doctor?.category && <div><small>Категория</small><strong>{doctor.category}</strong></div>}{doctor?.languages?.length ? <div><small>Языки приёма</small><strong>{doctor.languages.map((item) => item.label).join(' · ')}</strong></div> : null}{doctor?.education && <div><small>Образование</small><strong>{doctor.education}</strong></div>}{doctor?.hometown && <div><small>Город</small><strong>{doctor.hometown}</strong></div>}</div>{doctor?.bio ? <RichText data={doctor.bio} enableGutter={false} className="xon-richtext" /> : <p>{shortBio}</p>}<div className="xon-social-links">{doctor?.instagram && <a className="xon-social-link" href={`https://instagram.com/${doctor.instagram.replace('@', '')}`} target="_blank" rel="noreferrer">Instagram · {doctor.instagram}</a>}{doctor?.socialLinks?.map((social) => <a className="xon-social-link" href={social.url} target="_blank" rel="noreferrer" key={social.id || `${social.label}-${social.url}`}>{social.label} ↗</a>)}</div><p><small>Информация о квалификации и стаже будет дополнена после документального подтверждения клиникой.</small></p></div>
    </section>
    {(doctor?.schedule || doctor?.primaryPrice || doctor?.followUpPrice) && <section className="xon-doctor-facts"><div><small>График приёма</small><strong>{doctor.schedule || 'По предварительной записи'}</strong></div><div><small>Первичный приём</small><strong>{doctor.primaryPrice || 'Уточняется'}</strong></div><div><small>Повторный приём</small><strong>{doctor.followUpPrice || 'Уточняется'}</strong></div></section>}
    {(doctor?.focusAreas?.length || doctor?.procedures?.length) && <section className="xon-doctor-expertise"><div><p className="xon-label light">Профиль врача<span>экспертиза</span></p><h2>С чем можно обратиться</h2></div><div className="xon-expertise-columns">{doctor.focusAreas?.length ? <div><h3>Направления</h3><ul>{doctor.focusAreas.map((item) => <li key={item.id || item.label}>{item.label}</li>)}</ul></div> : null}{doctor.procedures?.length ? <div><h3>Методы и процедуры</h3><ul>{doctor.procedures.map((item) => <li key={item.id || item.label}>{item.label}</li>)}</ul></div> : null}</div></section>}
    {videos.length > 0 && <section className="xon-doctor-videos"><div className="xon-section-title"><p className="xon-kicker"><span />Видео врача</p><h2>Знакомство и полезные материалы</h2></div><div className="xon-video-grid">{videos.map((video, index) => <article key={`${video.title}-${index}`}><div className="xon-video-frame"><iframe src={video.embed || undefined} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div><span>{String(index + 1).padStart(2, '0')}</span><h3>{video.title}</h3>{video.description && <p>{video.description}</p>}</article>)}</div></section>}
    {doctor?.credentials?.length ? <section className="xon-page-content"><div className="xon-filter-note"><span>Образование</span><span>квалификация</span></div><div className="xon-credentials">{doctor.credentials.map((item) => <article key={item.id || item.title}><span>{item.year || '—'}</span><div><h3>{item.title}</h3><p>{item.institution}</p></div></article>)}</div></section> : null}
    {doctor?.articles?.length ? <section className="xon-page-content"><div className="xon-filter-note"><span>Материалы врача</span><span>статьи и выступления</span></div><div className="xon-list-grid">{doctor.articles.map((article, index) => article.url ? <a className="xon-list-card" href={article.url} target="_blank" rel="noreferrer" key={article.id || article.title}><span>{String(index + 1).padStart(2, '0')}</span><h2>{article.title}</h2><p>{article.summary}</p></a> : <article className="xon-list-card" key={article.id || article.title}><span>{String(index + 1).padStart(2, '0')}</span><h2>{article.title}</h2><p>{article.summary}</p></article>)}</div></section> : null}
    <section className="xon-doctor-booking"><div><p className="xon-label light">Запись к врачу<span>онлайн</span></p><h2>Записаться к {name}</h2><p>Администратор свяжется, уточнит задачу и предложит доступное время.</p></div><LeadForm locale={locale} labels={labels} defaultService={`${name} — ${specialty}`} /></section>
  </XonInterior>
}
