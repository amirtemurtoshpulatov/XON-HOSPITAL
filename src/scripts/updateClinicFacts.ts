import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { localeCodes } from '@/components/XonHome/content'
import { translate } from '@/lib/xonCopy'

// Confirmed directly by the clinic owner on 2026-11-19.
const address = [
  'Ташкент, 8-й проезд Файзли, 14',
  'Toshkent, Fayzli 8-tor ko‘chasi, 14',
  '14, 8th Fayzli Lane, Tashkent',
  'Ташкент, Файзли 8-өтпе көшесі, 14',
  'Тошканд, гузаргоҳи 8-уми Файзли, 14',
] as const

const hours = [
  'Круглосуточно, 24/7. Ночью принимают дежурные терапевт и ЛОР. Остальные специалисты: с 08:30 до 17:30–18:00 по индивидуальному расписанию.',
  'Klinika 24/7 ishlaydi. Tunda navbatchi terapevt va LOR qabul qiladi. Boshqa mutaxassislar: shaxsiy jadval bo‘yicha 08:30 dan 17:30–18:00 gacha.',
  'Open 24/7. An on-duty internist and ENT doctor are available at night. Other specialists: from 08:30 until 17:30–18:00, according to individual schedules.',
  'Тәулік бойы, 24/7. Түнде кезекші терапевт пен ЛОР қабылдайды. Басқа мамандар: жеке кесте бойынша 08:30-дан 17:30–18:00-ге дейін.',
  'Шабонарӯзӣ, 24/7. Шабона терапевт ва ЛОР-и навбатдор қабул мекунанд. Мутахассисони дигар: аз 08:30 то 17:30–18:00 мувофиқи ҷадвали инфиродӣ.',
] as const

const heroText = [
  'Консультации врачей, диагностика, стационар и реабилитация — с понятным маршрутом пациента.',
  'Shifokor maslahati, diagnostika, statsionar va reabilitatsiya — bemor uchun tushunarli yo‘l.',
  'Doctor consultations, diagnostics, inpatient care and rehabilitation, with a clear patient journey.',
  'Дәрігер кеңесі, диагностика, стационар және оңалту — пациентке түсінікті жол.',
  'Машварати табибон, ташхис, табобати бистарӣ ва барқарорсозӣ бо роҳи равшани бемор.',
] as const

async function main() {
  const payload = await getPayload({ config })
  for (const locale of localeCodes) {
    await payload.updateGlobal({ slug: 'site-settings', locale, data: { address: translate(locale, address), workingHours: translate(locale, hours) } })
    const home = await payload.findGlobal({ slug: 'home-page', locale, fallbackLocale: false, depth: 1 })
    if (/check.?up|чек.?ап|chek.?ap/i.test(home.heroText || '')) {
      await payload.updateGlobal({ slug: 'home-page', locale, data: { heroText: translate(locale, heroText) } })
    }
  }
  const services = await payload.find({ collection: 'services', depth: 0, pagination: false, where: { slug: { in: ['check-up', 'therapy'] } } })
  const pending = services.docs.find((service) => service.slug === 'check-up')
  const therapy = services.docs.find((service) => service.slug === 'therapy')
  if (pending?.featured) await payload.update({ collection: 'services', id: pending.id, data: { featured: false } })
  if (pending && therapy) {
    const articles = await payload.find({ collection: 'clinic-articles', depth: 0, pagination: false, where: { and: [{ slug: { equals: 'movement-for-prevention' } }, { relatedService: { equals: pending.id } }] } })
    for (const article of articles.docs) await payload.update({ collection: 'clinic-articles', id: article.id, data: { relatedService: therapy.id } })
  }
  payload.logger.info('Owner-confirmed address and hours updated for five languages; check-up removed from featured services')
}

main().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1) })
