import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import { interiorCopy } from '@/components/XonInterior/copy'
import { localeCodes, type SiteLocale } from '@/components/XonHome/content'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const copy = interiorCopy[locale].about

  return <XonInterior locale={locale} eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} index="03">
    <section className="xon-page-content">
      <div className="xon-about-grid"><h2>Связанный путь пациента — от вопроса до результата.</h2><div><p>XON HOSPITAL объединяет консультации врачей разных специальностей, диагностику, лабораторные исследования, лечение, стационарное наблюдение и реабилитацию. Наша задача — сделать каждый следующий шаг понятным и медицински обоснованным.</p><p>Мы не обещаем невозможного и не заменяем консультацию универсальными советами. Решения принимаются после осмотра и оценки конкретной клинической ситуации.</p></div></div>
      <div className="xon-values"><article className="xon-value"><span>01</span><h3>Понятность</h3><p>Объясняем, зачем нужен каждый следующий шаг и какие есть варианты.</p></article><article className="xon-value"><span>02</span><h3>Согласованность</h3><p>Специалисты могут объединить экспертизу вокруг одной задачи пациента.</p></article><article className="xon-value"><span>03</span><h3>Сопровождение</h3><p>Не оставляем пациента один на один с результатами обследований.</p></article></div>
    </section>
  </XonInterior>
}
