import type { SiteLocale } from '@/components/XonHome/content'
import { translate } from './xonCopy'

type Localized = Parameters<typeof translate>[1]

const articles: Record<string, { title: Localized; description: Localized; paragraphs: Localized[]; source: string }> = {
  'prepare-for-visit': {
    title: ['Как подготовиться к приёму', 'Qabulga qanday tayyorlanish kerak', 'How to prepare for your appointment', 'Қабылдауға қалай дайындалуға болады', 'Ба қабул чӣ гуна омода шудан лозим аст'],
    description: ['Что взять с собой и о чём спросить врача.', 'Nimalarni olib borish va shifokordan nimalarni so‘rash kerak.', 'What to bring and what to ask your doctor.', 'Өзіңізбен не алу керек және дәрігерден не сұрауға болады.', 'Чиро бо худ бурдан ва аз табиб чӣ пурсидан лозим аст.'],
    paragraphs: [
      ['Запишите, когда начались симптомы, как они менялись и в каких ситуациях усиливаются. Возьмите заключения и результаты обследований, которые относятся к жалобам.', 'Alomatlar qachon boshlanganini, qanday o‘zgarganini va qachon kuchayishini yozib qo‘ying. Shikoyatlaringizga tegishli xulosa va tekshiruv natijalarini olib boring.', 'Note when your symptoms began, how they changed and what makes them worse. Bring any reports or results relevant to your concerns.', 'Белгілердің қашан басталғанын, қалай өзгергенін және қай кезде күшейетінін жазып алыңыз. Шағымға қатысты қорытынды мен тексеру нәтижелерін алып келіңіз.', 'Навиштед, ки аломатҳо кай сар шуданд, чӣ гуна тағйир ёфтанд ва дар кадом ҳолат шиддат мегиранд. Хулосаҳо ва натиҷаҳои дахлдори ташхисро биёред.'],
      ['Подготовьте список лекарств и добавок с дозировками. Сообщите врачу об аллергиях и реакциях на лекарства. В конце приёма уточните, когда ждать результаты и нужен ли повторный визит.', 'Dori vositalari va qo‘shimchalar ro‘yxatini dozalari bilan tayyorlang. Allergiya va dorilarga bo‘lgan reaksiyalar haqida ayting. Qabul oxirida natijalar qachon chiqishini va qayta kelish kerakligini so‘rang.', 'List the medicines and supplements you take and their doses. Mention allergies and any reactions to medicines. Before you leave, ask when to expect results and whether to book a follow-up.', 'Дәрілер мен қоспалардың тізімін дозаларымен бірге дайындаңыз. Аллергия мен дәріге реакциялар туралы айтыңыз. Нәтижелер қашан дайын болатынын және қайта келу керегін сұраңыз.', 'Рӯйхати доруҳо ва иловаҳоро бо миқдорашон омода кунед. Дар бораи аллергия ва вокуниш ба доруҳо хабар диҳед. Пурсед, ки натиҷаҳо кай омода мешаванд ва оё қабули такрорӣ лозим аст.'],
    ],
    source: 'https://medlineplus.gov/ency/patientinstructions/000860.htm',
  },
  'preventive-checkup': {
    title: ['Что обсудить на профилактическом осмотре', 'Profilaktik ko‘rikda nimalarni muhokama qilish kerak', 'What to discuss at a preventive check-up', 'Профилактикалық тексеруде нені талқылауға болады', 'Дар муоинаи пешгирикунанда чиро баррасӣ кардан лозим аст'],
    description: ['Какие вопросы помогают составить индивидуальный план профилактики.', 'Individual profilaktika rejasini tuzishga yordam beradigan savollar.', 'Questions that can help you plan preventive care with your doctor.', 'Жеке профилактика жоспарын жасауға көмектесетін сұрақтар.', 'Саволҳое, ки барои нақшаи инфиродии пешгирӣ кумак мекунанд.'],
    paragraphs: [
      ['Подходящие обследования зависят от возраста, состояния здоровья, семейной истории и индивидуальных факторов риска. Расскажите врачу о хронических заболеваниях и принесите результаты предыдущих обследований.', 'Mos tekshiruvlar yosh, sog‘liq holati, oilaviy tibbiy tarix va shaxsiy xavf omillariga bog‘liq. Surunkali kasalliklar haqida ayting va oldingi tekshiruv natijalarini olib keling.', 'Suitable tests depend on age, general health, family history and individual risk factors. Tell your doctor about chronic conditions and bring previous test results.', 'Тексерулер жасқа, денсаулық жағдайына, отбасы тарихына және жеке қауіп факторларына байланысты. Созылмалы аурулар туралы айтып, алдыңғы нәтижелерді алып келіңіз.', 'Интихоби ташхис аз синну сол, вазъи саломатӣ, таърихи оилавӣ ва омилҳои хавфи шахсӣ вобаста аст. Дар бораи бемориҳои музмин хабар диҳед ва натиҷаҳои муоинаҳои қаблиро биёред.'],
      ['Спросите, какие обследования и прививки стоит обсудить сейчас, зачем они нужны и когда вернуться на следующий осмотр. Если уже есть жалобы, опишите их в начале визита: это поможет врачу выбрать подходящий формат обследования.', 'Hozir qaysi tekshiruv va emlashlarni ko‘rib chiqish kerakligini, ular nima uchun zarurligini va navbatdagi ko‘rik qachon bo‘lishini so‘rang. Shikoyat bo‘lsa, qabul boshida ayting: bu mos tekshiruvni tanlashga yordam beradi.', 'Ask which screenings and vaccinations to discuss now, why they are relevant and when to return. If you already have symptoms, bring them up early so your doctor can choose the right assessment.', 'Қазір қандай тексерулер мен екпелерді талқылау керегін, олардың мақсатын және келесі қабылдау уақытын сұраңыз. Шағым болса, оны басында айтыңыз. Бұл тиісті тексеруді таңдауға көмектеседі.', 'Пурсед, ки ҳоло кадом ташхисҳо ва ваксинаҳоро баррасӣ кардан лозим аст, ҳадафашон чист ва муоинаи навбатӣ кай мешавад. Агар аломатҳо дошта бошед, онҳоро дар аввали қабул шарҳ диҳед.'],
    ],
    source: 'https://medlineplus.gov/healthcheckup.html',
  },
}

export const articleSlugs = Object.keys(articles)
export const visitGuideSlug = 'prepare-for-visit'

export function articleCopy(locale: SiteLocale, slug: string) {
  const article = articles[slug]
  if (!article || !Object.hasOwn(articles, slug)) return null
  return {
    slug,
    title: translate(locale, article.title),
    description: translate(locale, article.description),
    paragraphs: article.paragraphs.map((paragraph) => translate(locale, paragraph)),
    source: article.source,
  }
}
