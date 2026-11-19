import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Service } from '@/payload-types'
import { serviceCopy } from '@/lib/xonServices'
import { expandedDoctorFocus } from './doctorFocusData'
import { serviceContent } from './serviceContentData'

const textNode = (text: string) => ({ type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text })
const normalize = (label: string) => label.trim().toLocaleLowerCase().replace(/[.!?]+$/, '')

async function main() {
  const payload = await getPayload({ config })
  let updated = 0
  for (const [slug, copy] of Object.entries(serviceContent)) {
    const doctor = (await payload.find({ collection: 'doctors', where: { slug: { equals: copy.doctor } }, depth: 0, limit: 1 })).docs[0]
    for (const locale of ['ru', 'uz'] as const) {
      const record = (await payload.find({ collection: 'services', locale, fallbackLocale: false, where: { slug: { equals: slug } }, depth: 0, limit: 1 })).docs[0]
      if (!record) continue
      const original = record.symptoms || []
      const seen = new Set(original.map((entry) => normalize(entry.label)))
      const additions = expandedDoctorFocus(copy.doctor, locale).filter((label) => !seen.has(normalize(label))).map((label) => ({ label }))
      const children = copy[locale].flatMap(([heading, text]) => [
        { type: 'heading', tag: 'h3', version: 1, direction: 'ltr', format: '', indent: 0, children: [textNode(heading)] },
        { type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children: [textNode(text)] },
      ])
      const content: Service['content'] = { root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0, children } }
      const hasContent = Boolean(record.content?.root?.children.length)
      const doctorIDs = (record.doctors || []).map((entry) => typeof entry === 'object' ? entry.id : entry)
      const addDoctor = doctor && !doctorIDs.includes(doctor.id)
      if (hasContent && !additions.length && !addDoctor) continue
      if (process.env.DRY_RUN !== '1') await payload.update({ collection: 'services', id: record.id, locale, data: {
        title: record.title || serviceCopy(locale, slug)!.title,
        summary: record.summary || serviceCopy(locale, slug)!.text,
        ...(!hasContent ? { content } : {}),
        symptoms: [...original, ...additions],
        ...(addDoctor ? { doctors: [...doctorIDs, doctor.id] } : {}),
      } })
      updated++
      payload.logger.info(`${locale}/${slug}: ${hasContent ? 'existing text preserved' : 'five original content sections'}; ${original.length + additions.length} reasons`)
    }
  }
  payload.logger.info(`Service enrichment ${process.env.DRY_RUN === '1' ? 'preview' : 'update'}: ${updated} localized pages`)
}

main().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1) })
