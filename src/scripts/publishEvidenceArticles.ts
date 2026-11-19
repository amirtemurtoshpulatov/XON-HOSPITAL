import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { ClinicArticle } from '@/payload-types'
import type { SiteLocale } from '@/components/XonHome/content'
import { acneArticle } from './acneArticle'

const textNode = (text: string) => ({ type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text })

async function main() {
  const payload = await getPayload({ config })
  const article = acneArticle
  const existing = await payload.find({ collection: 'clinic-articles', draft: true, depth: 0, limit: 1, where: { slug: { equals: article.slug } } })
  if (existing.totalDocs) {
    payload.logger.info(`Preserved existing article: ${article.slug}`)
    return
  }
  const services = await payload.find({ collection: 'services', depth: 0, limit: 1, where: { slug: { equals: article.service } } })
  let id: number | undefined
  const entries = Object.entries(article.locales)
  for (const [index, [locale, copy]] of entries.entries()) {
    const content: ClinicArticle['content'] = {
      root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0,
        children: copy.sections.flatMap(({ heading, paragraphs }) => [
          { type: 'heading', tag: 'h2', version: 1, direction: 'ltr', format: '', indent: 0, children: [textNode(heading)] },
          ...paragraphs.map((text) => ({ type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children: [textNode(text)] })),
        ]),
      },
    }
    const publish = index === entries.length - 1
    const data = { title: copy.title, description: copy.description, content, _status: publish ? 'published' as const : 'draft' as const }
    if (id === undefined) {
      const created = await payload.create({ collection: 'clinic-articles', locale: locale as SiteLocale, draft: true,
        data: { ...data, slug: article.slug, sources: article.sources, relatedService: services.docs[0]?.id } })
      id = created.id
    } else {
      await payload.update({ collection: 'clinic-articles', id, locale: locale as SiteLocale, draft: !publish, data })
    }
  }
  payload.logger.info(`Published ${article.slug}: ${entries.map(([locale]) => locale).join(', ')}`)
}

main().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1) })
