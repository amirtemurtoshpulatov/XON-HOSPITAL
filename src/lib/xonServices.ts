import { content, type SiteLocale } from '@/components/XonHome/content'
import { translate } from './xonCopy'

const baseSlugs = ['neurology', 'orthopedics', 'gastroenterology', 'dermatology', 'check-up', 'rehabilitation'] as const
const additional = {
  oncology: [
    ['Онкология', 'Onkologiya', 'Oncology', 'Онкология', 'Саратоншиносӣ'],
    ['Консультация, оценка обследований и план дальнейших действий.', 'Konsultatsiya, tekshiruv natijalarini baholash va keyingi qadamlarni belgilash.', 'Consultation, review of test results and planning the next steps.', 'Кеңес беру, зерттеулерді бағалау және алдағы қадамдарды жоспарлау.', 'Машварат, арзёбии натиҷаҳои ташхис ва банақшагирии қадамҳои минбаъда.'],
  ],
  ultrasound: [
    ['УЗИ-диагностика', 'Ultratovush diagnostikasi', 'Ultrasound', 'Ультрадыбыстық диагностика', 'Ташхиси ултрасадоӣ'],
    ['УЗИ внутренних органов и сосудов, гинекологические и урологические исследования.', 'Ichki a’zolar va tomirlar UTTsi, ginekologik va urologik tekshiruvlar.', 'Ultrasound of organs and blood vessels, including gynaecological and urological scans.', 'Ішкі ағзалар мен тамырлардың УДЗ-сы, гинекологиялық және урологиялық зерттеулер.', 'УЗИ-и узвҳои дохилӣ ва рагҳо, ташхисҳои гинекологӣ ва урологӣ.'],
  ],
  gynecology: [
    ['Гинекология и репродуктология', 'Ginekologiya va reproduktologiya', 'Gynaecology and reproductive medicine', 'Гинекология және репродуктология', 'Гинекология ва репродуктология'],
    ['Консультации по женскому и репродуктивному здоровью.', 'Ayollar va reproduktiv salomatlik bo‘yicha maslahat.', 'Consultations on women’s reproductive health.', 'Әйелдердің репродуктивті денсаулығы бойынша кеңес.', 'Машварат оид ба саломатии занон ва солимии репродуктивӣ.'],
  ],
  ent: [
    ['Оториноларингология', 'Otorinolaringologiya (LOR)', 'Ear, nose and throat (ENT)', 'Оториноларингология (ЛОР)', 'Гӯшу гулӯ ва бинӣ (ЛОР)'],
    ['Консультация при жалобах со стороны уха, горла и носа.', 'Quloq, tomoq va burun bilan bog‘liq shikoyatlar bo‘yicha maslahat.', 'Consultations for ear, nose and throat concerns.', 'Құлақ, тамақ және мұрынға қатысты шағымдар бойынша кеңес.', 'Машварат оид ба мушкилоти гӯш, гулӯ ва бинӣ.'],
  ],
  therapy: [
    ['Терапия и клиническая фармакология', 'Terapiya va klinik farmakologiya', 'Internal medicine and clinical pharmacology', 'Терапия және клиникалық фармакология', 'Терапия ва фармакологияи клиникӣ'],
    ['Оценка здоровья взрослых и разбор лекарственных назначений.', 'Kattalar salomatligini baholash va dori buyurilmalarini ko‘rib chiqish.', 'Adult health assessments and medication reviews.', 'Ересектердің денсаулығын бағалау және тағайындалған дәрілерді талдау.', 'Арзёбии саломатии калонсолон ва баррасии доруҳои таъйиншуда.'],
  ],
  'chinese-medicine': [
    ['Традиционная китайская медицина', 'An’anaviy Xitoy tibbiyoti', 'Traditional Chinese medicine', 'Дәстүрлі қытай медицинасы', 'Тибби анъанавии чинӣ'],
    ['Консультация о возможных методах и противопоказаниях.', 'Usullar va qarshi ko‘rsatmalar haqida maslahat.', 'Consultation on available methods and contraindications.', 'Әдістер мен қарсы көрсетілімдер туралы кеңес.', 'Машварат дар бораи усулҳо ва зиддинишондодҳо.'],
  ],
  inpatient: [
    ['Стационар', 'Statsionar', 'Inpatient care', 'Стационар', 'Бистарӣ'],
    ['Медицинское наблюдение и лечение в условиях стационара.', 'Statsionar sharoitida tibbiy kuzatuv va davolash.', 'Medical supervision and treatment during an inpatient stay.', 'Стационарда медициналық бақылау және емдеу.', 'Назорати тиббӣ ва табобат дар шароити бистарӣ.'],
  ],
  laboratory: [
    ['Лабораторная диагностика', 'Laboratoriya diagnostikasi', 'Laboratory tests', 'Зертханалық диагностика', 'Ташхиси озмоишгоҳӣ'],
    ['Анализы подбираются с учётом цели обследования.', 'Tahlillar tekshiruv maqsadiga qarab tanlanadi.', 'Tests are selected according to the purpose of the assessment.', 'Талдаулар тексеру мақсатына қарай таңдалады.', 'Таҳлилҳо мувофиқи ҳадафи муоина интихоб мешаванд.'],
  ],
  'salt-room': [
    ['Солевая комната', 'Tuz xonasi', 'Salt room', 'Тұз бөлмесі', 'Ҳуҷраи намак'],
    ['Дополнительная процедура по согласованию со специалистом.', 'Mutaxassis bilan kelishilgan qo‘shimcha muolaja.', 'An optional session to discuss with a clinician.', 'Маманмен келісілетін қосымша емшара.', 'Расмиёти иловагӣ бо мувофиқаи мутахассис.'],
  ],
} as const

export const serviceSlugs = [...baseSlugs, ...Object.keys(additional)]

// The owner confirmed that check-up packages are still being developed.
export function isServiceAvailable(slug: string) {
  return slug !== 'check-up'
}

export function serviceCopy(locale: SiteLocale, slug: string) {
  const base = content[locale].serviceItems[baseSlugs.findIndex((item) => item === slug)]
  if (base) return base
  const extra = additional[slug as keyof typeof additional]
  if (extra && Object.hasOwn(additional, slug)) return { title: translate(locale, extra[0]), text: translate(locale, extra[1]) }
}
