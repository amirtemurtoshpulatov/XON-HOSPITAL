import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { localeCodes } from '@/components/XonHome/content'
import { serviceCopy } from '@/lib/xonServices'
import type { Service } from '@/payload-types'
import { inpatientContent } from './inpatientContentData'

const textNode = (text: string) => ({ type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text })
const normalize = (value: string) => value.trim().toLocaleLowerCase().replace(/[.!?]+$/, '')

async function main() {
  const payload = await getPayload({ config })
  let updated = 0
  for (const locale of localeCodes) {
    const record = (await payload.find({ collection: 'services', locale, fallbackLocale: false, where: { slug: { equals: 'inpatient' } }, depth: 0, limit: 1 })).docs[0]
    if (!record) throw new Error(`Missing inpatient record (${locale}); refusing to create a duplicate service`)
    const copy = inpatientContent[locale]
    const fallback = serviceCopy(locale, 'inpatient')!
    const data: Partial<Service> = {}
    if (!record.title) data.title = fallback.title
    if (!record.summary || record.summary === fallback.text) data.summary = copy.summary
    if (!record.content?.root?.children.length) data.content = { root: {
      type: 'root', version: 1, direction: 'ltr', format: '', indent: 0,
      children: copy.sections.flatMap(([heading, text]) => [
        { type: 'heading', tag: 'h3', version: 1, direction: 'ltr', format: '', indent: 0, children: [textNode(heading)] },
        { type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children: [textNode(text)] },
      ]),
    } }
    const facts = record.keyFacts || []
    const factLabels = new Set(facts.map((item) => normalize(item.label)))
    const factAdditions = copy.facts.filter(([label]) => !factLabels.has(normalize(label))).map(([label, value]) => ({ label, value }))
    if (factAdditions.length) {
      if (facts.length + factAdditions.length > 6) throw new Error(`Review custom key facts before updating (${locale})`)
      data.keyFacts = [...facts, ...factAdditions]
    }
    const symptoms = record.symptoms || []
    const symptomLabels = new Set(symptoms.map((item) => normalize(item.label)))
    const symptomAdditions = copy.reasons.filter((label) => !symptomLabels.has(normalize(label))).map((label) => ({ label }))
    if (symptomAdditions.length) data.symptoms = [...symptoms, ...symptomAdditions]
    const faq = record.faq || []
    const questions = new Set(faq.map((item) => normalize(item.question)))
    const faqAdditions = copy.faq.filter(([question]) => !questions.has(normalize(question))).map(([question, answer]) => ({ question, answer }))
    if (faqAdditions.length) data.faq = [...faq, ...faqAdditions]
    if (!Object.keys(data).length) continue
    if (process.env.DRY_RUN !== '1') await payload.update({ collection: 'services', id: record.id, locale, data })
    updated++
    payload.logger.info(`${locale}/inpatient: ${Object.keys(data).join(', ')}; existing custom text, prices, doctors and media preserved`)
  }
  payload.logger.info(`Inpatient ${process.env.DRY_RUN === '1' ? 'preview' : 'update'}: ${updated} localized pages`)
}

main().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1) })
