import type { SiteLocale } from '@/components/XonHome/content'
import RichText from '@/components/RichText'
import { articleSections } from '@/lib/articleOutline'
import { translate } from '@/lib/xonCopy'
import type { ClinicArticle } from '@/payload-types'

export function XonArticleBody({ content, locale }: { content: ClinicArticle['content']; locale: SiteLocale }) {
  const sections = articleSections(content)
  const headings = sections.filter((section) => section.title)
  return <>
    {headings.length > 2 && <nav className="xon-article-outline" aria-label={translate(locale, ['Содержание статьи', 'Maqola mundarijasi', 'Article contents', 'Мақала мазмұны', 'Мундариҷаи мақола'])}>
      <h2>{translate(locale, ['В этой статье', 'Ushbu maqolada', 'In this article', 'Осы мақалада', 'Дар ин мақола'])}</h2>
      <ol>{headings.map(({ id, title }) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}</ol>
    </nav>}
    <div className="xon-article-body">{sections.map(({ id, content: section }) => <section id={id} key={id}>
      <RichText data={section} enableGutter={false} enableProse={false} />
    </section>)}</div>
  </>
}
