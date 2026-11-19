import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { ClinicArticle } from '@/payload-types'
import { articleFields, starters } from './preventionArticles'
import { preventionExpansion } from './preventionExpansion'

// Only append to the known starter text: custom CMS edits and unpublished drafts win.
function plain(value: unknown): string {
  if (!value || typeof value !== 'object') return ''
  const node = value as { text?: string; children?: unknown[]; root?: unknown }
  return node.text ?? (node.root ? plain(node.root) : (node.children || []).map(plain).join(' '))
}
const textNode = (text: string) => ({ type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text })

async function main() {
  const payload = await getPayload({ config })
  let changed = 0
  for (const starter of starters) {
    const extra = preventionExpansion[starter.slug as keyof typeof preventionExpansion]
    if (!extra) continue
    for (const locale of ['ru', 'uz'] as const) {
      const record = (await payload.find({ collection: 'clinic-articles', locale, fallbackLocale: false, draft: true, where: { slug: { equals: starter.slug } }, limit: 1, depth: 0 })).docs[0]
      if (!record || record._status !== 'published') {
        payload.logger.info(`${locale}/${starter.slug}: skipped missing or unpublished article`)
        continue
      }
      const baseline = articleFields(starter, locale).content
      if (plain(record.content) !== plain(baseline)) {
        payload.logger.info(`${locale}/${starter.slug}: preserved existing expanded/custom content`)
        continue
      }
      const children = [...(record.content?.root.children || []), ...extra[locale].flatMap(([heading, text]) => [
        { type: 'heading', tag: 'h2', version: 1, direction: 'ltr', format: '', indent: 0, children: [textNode(heading)] },
        { type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children: [textNode(text)] },
      ])]
      const content: ClinicArticle['content'] = { root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0, children } }
      const sources = [...(record.sources || [])]
      for (const source of extra.sources) if (!sources.some((entry) => entry.url === source.url)) sources.push(source)
      if (process.env.DRY_RUN !== '1') await payload.update({ collection: 'clinic-articles', id: record.id, locale, draft: false, data: { content, sources, _status: 'published' } })
      changed++
      payload.logger.info(`${locale}/${starter.slug}: seven sections, ${plain(content).split(/\s+/).filter(Boolean).length} words`)
    }
  }
  payload.logger.info(`Prevention article ${process.env.DRY_RUN === '1' ? 'preview' : 'update'}: ${changed} localized articles`)
}
main().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1) })
