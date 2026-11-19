import type { Payload } from 'payload'

import { localeCodes, type SiteLocale } from '@/components/XonHome/content'
import { translate } from '@/lib/xonCopy'
import type { ClinicArticle } from '@/payload-types'

type Localized = Parameters<typeof translate>[1]
type Starter = {
  slug: string
  service: string
  title: Localized
  description: Localized
  sections: { heading: Localized; text: Localized }[]
  sources: { label: string; url: string }[]
}

export const starters: Starter[] = [
  {
    slug: 'blood-pressure-at-home',
    service: 'therapy',
    title: ['Как правильно измерять давление дома', 'Uyda qon bosimini qanday to‘g‘ri o‘lchash mumkin', 'How to measure your blood pressure at home', 'Үйде қан қысымын қалай дұрыс өлшеуге болады', 'Фишори хунро дар хона чӣ гуна дуруст чен кардан мумкин аст'],
    description: ['Как подготовиться к измерению, вести дневник давления и обсудить показания с врачом.', 'O‘lchovga tayyorlanish, qon bosimi kundaligini yuritish va natijalarni shifokor bilan muhokama qilish.', 'How to prepare for a reading, keep a blood pressure log and discuss the results with your doctor.', 'Өлшеуге дайындалу, қысым күнделігін жүргізу және нәтижені дәрігермен талқылау жолы.', 'Чӣ гуна ба ченкунӣ омода шудан, рӯзномаи фишорро бурдан ва натиҷаҳоро бо табиб муҳокима кардан.'],
    sections: [
      {
        heading: ['Подготовьтесь к измерению', 'O‘lchovga tayyorlaning', 'Prepare before taking a reading', 'Өлшеуге дайындалыңыз', 'Ба ченкунӣ омода шавед'],
        text: ['Используйте проверенный автоматический тонометр с манжетой по размеру плеча. Посидите спокойно не менее пяти минут. Стопы поставьте на пол, спину обоприте на спинку стула, а руку положите на опору так, чтобы манжета была на уровне сердца.', 'Yelkaga mos manjetli, aniqligi tekshirilgan avtomatik tonometrdan foydalaning. Kamida besh daqiqa tinch o‘tiring. Oyoqlaringizni polga qo‘ying, belingizni stulga suyang va manjet yurak balandligida turishi uchun qo‘lingizni tayanchga qo‘ying.', 'Use a validated automatic upper-arm monitor with a correctly sized cuff. Sit quietly for at least five minutes. Put your feet flat on the floor, support your back and rest your arm so the cuff is at heart level.', 'Өлшемі иыққа сай манжетасы бар, дәлдігі тексерілген автоматты тонометр қолданыңыз. Кемінде бес минут тыныш отырыңыз. Аяқты еденге қойып, арқаңызды орындыққа сүйеңіз. Манжета жүрек деңгейінде тұруы үшін қолыңызды тіреңіз.', 'Аз дастгоҳи худкори санҷидашуда бо манжетаи мувофиқ ба андозаи бозу истифода баред. Камаш панҷ дақиқа ором нишинед. Пойҳоро ба фарш гузоред, пуштро ба курсӣ такя диҳед ва дастро тавре гузоред, ки манжета дар сатҳи дил бошад.'],
      },
      {
        heading: ['Записывайте результаты', 'Natijalarni yozib boring', 'Keep a record', 'Нәтижелерді жазып жүріңіз', 'Натиҷаҳоро сабт кунед'],
        text: ['Не разговаривайте во время измерения. Можно сделать два замера с интервалом в минуту и записать оба вместе с датой и временем. Уточните у врача, как часто измерять давление и какие результаты важно ему показать.', 'O‘lchash paytida gaplashmang. Bir daqiqa farq bilan ikki marta o‘lchab, ikkala natijani sana va vaqt bilan yozish mumkin. Shifokordan bosimni qanchalik tez-tez o‘lchash va qaysi natijalarni ko‘rsatish kerakligini so‘rang.', 'Avoid talking during a reading. You can take two readings a minute apart and record both with the date and time. Ask your doctor how often to measure and which results they need to see.', 'Өлшеу кезінде сөйлеспеңіз. Бір минут аралықпен екі рет өлшеп, екеуін де күні мен уақытын көрсетіп жазуға болады. Дәрігерден қаншалықты жиі өлшеу және қандай нәтижелерді көрсету қажет екенін сұраңыз.', 'Ҳангоми ченкунӣ гап назанед. Метавонед бо фосилаи як дақиқа ду бор чен кунед ва ҳар ду натиҷаро бо сана ва вақт нависед. Аз табиб пурсед, ки фишорро чанд вақт як бор чен кунед ва кадом натиҷаҳоро нишон диҳед.'],
      },
      {
        heading: ['Обсудите повторяющиеся высокие показатели', 'Takroran yuqori natijalarni muhokama qiling', 'Discuss repeated high readings', 'Қайта-қайта жоғары шыққан көрсеткіштерді талқылаңыз', 'Натиҷаҳои пайдарпайи баландро муҳокима кунед'],
        text: ['Повышенное давление иногда протекает без симптомов. Если высокие показатели повторяются, покажите дневник врачу. Если вам назначены лекарства, меняйте схему лечения только после консультации.', 'Qon bosimi yuqori bo‘lsa ham, ba’zan alomat sezilmaydi. Yuqori natijalar takrorlansa, kundalikni shifokorga ko‘rsating. Agar dori buyurilgan bo‘lsa, davolash tartibini shifokor bilan maslahatlashgandan keyin o‘zgartiring.', 'High blood pressure can occur without symptoms. If high readings recur, share the log with your clinician. If you take prescribed medicine, talk to your clinician before changing your treatment.', 'Қан қысымы жоғары болса да, кейде белгілері білінбейді. Жоғары көрсеткіштер қайталанса, күнделікті дәрігерге көрсетіңіз. Дәрі тағайындалса, емдеу тәртібін дәрігермен кеңескен соң өзгертіңіз.', 'Фишори баланди хун баъзан бе аломат мегузарад. Агар натиҷаҳои баланд такрор шаванд, рӯзномаро ба табиб нишон диҳед. Агар ба шумо дору таъин шуда бошад, тарзи табобатро баъд аз машварат иваз кунед.'],
      },
    ],
    sources: [
      { label: 'WHO · Hypertension', url: 'https://www.who.int/news-room/fact-sheets/detail/hypertension' },
      { label: 'American Heart Association · Home monitoring', url: 'https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home' },
    ],
  },
  {
    slug: 'movement-for-prevention',
    service: 'therapy',
    title: ['Физическая активность для профилактики', 'Profilaktika uchun jismoniy faollik', 'Physical activity for preventive health', 'Алдын алу үшін дене белсенділігі', 'Фаъолияти ҷисмонӣ барои пешгирӣ'],
    description: ['Как добавить движение в привычный день и постепенно выстроить регулярную нагрузку.', 'Odatiy kunga ko‘proq harakat qo‘shish va muntazam faollikni asta-sekin yo‘lga qo‘yish.', 'Ways to move more during a typical day and build a regular activity routine.', 'Күнделікті өмірге қозғалыс қосу және тұрақты жүктемені біртіндеп қалыптастыру.', 'Чӣ гуна ҳаракатро ба рӯзгор ворид карда, машқи мунтазамро тадриҷан ба роҳ мондан мумкин аст.'],
    sections: [
      {
        heading: ['Начните с того, что вам удобно', 'O‘zingizga qulay mashg‘ulotdan boshlang', 'Start with something manageable', 'Өзіңізге ыңғайлы қозғалыстан бастаңыз', 'Аз ҳаракате оғоз кунед, ки бароятон қулай аст'],
        text: ['Прогулка, велосипед и активная работа по дому помогают больше двигаться. Если вы давно малоактивны, начните с коротких прогулок и добавляйте время постепенно. При сидячей работе делайте небольшие перерывы, чтобы встать и пройтись.', 'Piyoda yurish, velosiped haydash va uy ishlarida harakat qilish faollikni oshiradi. Agar uzoq vaqt kam harakat qilgan bo‘lsangiz, qisqa sayrlardan boshlang va vaqtni sekin oshiring. O‘tirib ishlaganda turib yurish uchun qisqa tanaffuslar qiling.', 'Walking, cycling and active household tasks all help you move more. If you have been inactive, start with short walks and increase the time gradually. During desk work, take brief breaks to stand up and walk around.', 'Серуендеу, велосипед тебу және үйдегі белсенді жұмыс қозғалысты арттырады. Бұрын аз қозғалған болсаңыз, қысқа серуеннен бастап, уақытын біртіндеп ұзартыңыз. Отырып жұмыс істегенде тұрып жүруге қысқа үзілістер жасаңыз.', 'Пиёдагардӣ, велосипедронӣ ва корҳои фаъоли хона ба бештар ҳаракат кардан ёрӣ медиҳанд. Агар дер боз камҳаракат бошед, аз сайри кӯтоҳ сар кунед ва вақти онро тадриҷан зиёд намоед. Ҳангоми кори нишаста каме танаффус карда, бархезеду роҳ равед.'],
      },
      {
        heading: ['Подберите недельный ритм', 'Haftalik tartibni belgilang', 'Build a weekly routine', 'Апталық тәртіпті қалыптастырыңыз', 'Тартиби ҳафтаинаро интихоб кунед'],
        text: ['ВОЗ рекомендует взрослым 150–300 минут умеренной аэробной активности в неделю, например быстрой ходьбы. Распределите нагрузку по нескольким дням. Если нагрузка давно непривычна, ориентир ВОЗ может быть постепенной целью.', 'JSST kattalarga haftasiga 150–300 daqiqa o‘rtacha jadallikdagi aerob faollikni, masalan, tez yurishni tavsiya qiladi. Mashg‘ulotlarni bir necha kunga taqsimlang. Bu yuklamaga o‘rganmagan bo‘lsangiz, maqsadga asta-sekin yaqinlashing.', 'WHO recommends 150–300 minutes of moderate aerobic activity a week for adults, such as brisk walking. Spread activity across several days. If activity is new to you, work towards that target gradually.', 'ДДҰ ересектерге аптасына орташа қарқындағы 150–300 минут аэробты қозғалысты, мысалы, қарқынды жүруді ұсынады. Жүктемені бірнеше күнге бөліңіз. Қозғалысқа үйренбеген болсаңыз, осы мақсатқа біртіндеп жетіңіз.', 'Созмони ҷаҳонии тандурустӣ ба калонсолон дар як ҳафта 150–300 дақиқа фаъолияти аэробии миёна, мисли пиёдагардии тезро, тавсия медиҳад. Машқҳоро ба чанд рӯз тақсим кунед. Агар ба ин сарборӣ одат надошта бошед, ба ҳадаф тадриҷан наздик шавед.'],
      },
      {
        heading: ['Учтите особенности своего здоровья', 'Sog‘lig‘ingizni hisobga oling', 'Take your health into account', 'Денсаулық жағдайыңызды ескеріңіз', 'Вазъи саломатии худро ба назар гиред'],
        text: ['Если есть хроническое заболевание, ограничения после травмы или вопросы о переносимости нагрузки, обсудите вид активности с врачом. Полезно выбрать занятие, которое можно регулярно включать в свой обычный день.', 'Surunkali kasallik, jarohatdan keyingi cheklovlar yoki yuklamani ko‘tara olish borasida savollar bo‘lsa, mashg‘ulot turini shifokor bilan muhokama qiling. Odatiy kuningizga muntazam qo‘sha oladigan mashg‘ulotni tanlang.', 'If you have a chronic condition, restrictions after an injury or questions about how much exercise you can tolerate, discuss your options with a clinician. Choose an activity that fits into your routine.', 'Созылмалы ауру, жарақаттан кейінгі шектеу немесе жүктемені көтеру туралы сұрақ болса, белсенділік түрін дәрігермен талқылаңыз. Күн тәртібіне тұрақты енгізуге болатын қозғалысты таңдаңыз.', 'Агар бемории музмин, маҳдудияти баъди осеб ё савол оид ба таҳаммули сарборӣ дошта бошед, навъи фаъолиятро бо табиб муҳокима кунед. Машғулиятеро интихоб кунед, ки ба реҷаи рӯзатон пайваста мувофиқ ояд.'],
      },
    ],
    sources: [{ label: 'WHO Europe · Physical activity', url: 'https://www.who.int/europe/news-room/fact-sheets/item/physical-activity' }],
  },
]

export function articleFields(starter: Starter, locale: SiteLocale) {
  const children = starter.sections.flatMap(({ heading, text }) => [
    { type: 'heading', tag: 'h2', version: 1, direction: 'ltr', format: '', indent: 0, children: [textNode(translate(locale, heading))] },
    { type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children: [textNode(translate(locale, text))] },
  ])
  const content: ClinicArticle['content'] = {
    root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0, children },
  }
  return { title: translate(locale, starter.title), description: translate(locale, starter.description), content }
}

function textNode(text: string) {
  return { type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text }
}

export async function seedPreventionArticles(payload: Payload) {
  for (const starter of starters) {
    const existing = await payload.find({ collection: 'clinic-articles', draft: true, where: { slug: { equals: starter.slug } }, limit: 1, depth: 0 })
    if (existing.totalDocs) continue
    const { docs } = await payload.find({ collection: 'services', where: { slug: { equals: starter.service } }, limit: 1, depth: 0 })
    const record = await payload.create({
      collection: 'clinic-articles',
      locale: 'ru',
      draft: true,
      data: { ...articleFields(starter, 'ru'), slug: starter.slug, sources: starter.sources, relatedService: docs[0]?.id },
    })
    for (const locale of localeCodes.filter((code) => code !== 'ru')) {
      const publish = locale === localeCodes.at(-1)
      await payload.update({
        collection: 'clinic-articles', id: record.id, locale, draft: !publish,
        data: { ...articleFields(starter, locale), _status: publish ? 'published' : 'draft' },
      })
    }
  }
}
