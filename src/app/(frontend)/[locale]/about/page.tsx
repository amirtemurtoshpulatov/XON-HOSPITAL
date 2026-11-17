import { notFound } from 'next/navigation'

import { XonInterior } from '@/components/XonInterior'
import { interiorCopy } from '@/components/XonInterior/copy'
import Link from 'next/link'
import { xonCopy } from '@/lib/xonCopy'
import { content, localeCodes, type SiteLocale } from '@/components/XonHome/content'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!localeCodes.includes(rawLocale as SiteLocale)) notFound()
  const locale = rawLocale as SiteLocale
  const copy = interiorCopy[locale].about
  const t = content[locale]
  const ui = xonCopy(locale)

  return <XonInterior locale={locale} videoSection="about" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} index="03">
    <section className="xon-page-content">
      <div className="xon-about-grid"><h2>{t.pathTitle}</h2><div><p>{t.heroText}</p><Link href={`/${locale}/doctors/xursand-yusupboyevich`} className="xon-social-link">{ui.chooseDoctor} ↗</Link></div></div>
      <div className="xon-values">{t.pathSteps.slice(0, 3).map((step, index) => <article className="xon-value" key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    </section>
  </XonInterior>
}
