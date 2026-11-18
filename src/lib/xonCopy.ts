import { localeCodes, type SiteLocale } from '@/components/XonHome/content'

type Translations = readonly [string, string, string, string, string]
export function translate(locale: SiteLocale, values: Translations): string {
  return values[localeCodes.indexOf(locale)]
}

export const clinicSocial = {
  instagram: 'https://www.instagram.com/xonhospital.uz/',
  youtube: 'https://www.youtube.com/@XONHOSPITAL',
  telegram: 'https://t.me/xon_hospital',
  phone: '+998 95 866 19 19',
}

const labels = {
  navigation: ['Навигация', 'Menyu', 'Navigation', 'Мәзір', 'Меню'],
  language: ['Выбрать язык', 'Tilni tanlash', 'Select language', 'Тілді таңдау', 'Интихоби забон'],
  journal: ['Статьи для пациентов', 'Bemorlar uchun maqolalar', 'Patient articles', 'Пациенттерге арналған мақалалар', 'Мақолаҳо барои беморон'],
  journalNav: ['Статьи', 'Maqolalar', 'Articles', 'Мақалалар', 'Мақолаҳо'],
  journalIntro: ['Материалы о профилактике, обследованиях и подготовке к приёму в XON Hospital.', 'XON Hospital’dan profilaktika, tekshiruv va qabulga tayyorgarlik haqida maqolalar.', 'Guides to prevention, health checks and preparing for a visit to XON Hospital.', 'XON Hospital-дың алдын алу, тексерулер және қабылдауға дайындық туралы мақалалары.', 'Мақолаҳои XON Hospital дар бораи пешгирӣ, ташхис ва омодагӣ ба қабул.'],
  articleAuthor: ['Автор', 'Muallif', 'Author', 'Автор', 'Муаллиф'],
  articleReviewer: ['Материал проверил', 'Materialni tekshirgan', 'Reviewed by', 'Материалды тексерген', 'Маводро санҷид'],
  more: ['Подробнее', 'Batafsil', 'Learn more', 'Толығырақ', 'Муфассал'],
  city: ['Ташкент, Узбекистан', 'Toshkent, O‘zbekiston', 'Tashkent, Uzbekistan', 'Ташкент, Өзбекстан', 'Тошканд, Ӯзбекистон'],
  chooseDoctor: ['Выбрать врача', 'Shifokorni tanlash', 'Find a doctor', 'Дәрігерді таңдау', 'Интихоби табиб'],
  programs: ['Популярные программы', 'Ommabop dasturlar', 'Popular programmes', 'Танымал бағдарламалар', 'Барномаҳои маъмул'],
  programsTitle: ['Выберите, с чего начать', 'Nimadan boshlashni tanlang', 'Choose where to start', 'Неден бастау керегін таңдаңыз', 'Аз чӣ оғоз карданро интихоб кунед'],
  programsText: ['Откройте направление и узнайте, что может входить в программу.', 'Yo‘nalishni ochib, dasturga nimalar kirishi mumkinligini bilib oling.', 'Explore each service to see what the programme may include.', 'Бағытты ашып, бағдарламаға не кіруі мүмкін екенін біліңіз.', 'Самтро кушоед ва бо муҳтавои эҳтимолии барнома шинос шавед.'],
  doctorsCount: ['врачей в команде', 'nafar shifokor', 'doctors on the team', 'дәрігер командада', 'табиб дар даста'],
  servicesCount: ['медицинских направлений', 'tibbiy yo‘nalish', 'clinical specialties and services', 'медициналық бағыт', 'самти тиббӣ'],
  phone: ['Телефон', 'Telefon', 'Phone', 'Телефон', 'Телефон'],
  address: ['Адрес', 'Manzil', 'Address', 'Мекенжай', 'Суроға'],
  hours: ['Часы работы', 'Ish vaqti', 'Opening hours', 'Жұмыс уақыты', 'Соатҳои корӣ'],
  priceOnRequest: ['По запросу', 'So‘rov bo‘yicha', 'On request', 'Сұраныс бойынша', 'Бо дархост'],
  info: ['О направлении', 'Yo‘nalish haqida', 'About this service', 'Бағыт туралы', 'Дар бораи самт'],
  facts: ['Ключевая информация', 'Asosiy ma’lumot', 'At a glance', 'Негізгі ақпарат', 'Маълумоти асосӣ'],
  reasons: ['С чем можно обратиться', 'Qanday holatlarda murojaat qilish mumkin', 'Reasons to book a consultation', 'Қандай жағдайда жүгінуге болады', 'Дар кадом ҳолат муроҷиат кардан мумкин аст'],
  symptoms: ['Поводы для обращения', 'Murojaat sabablari', 'Reasons to seek care', 'Жүгіну себептері', 'Сабабҳои муроҷиат'],
  conditions: ['С чем работает отделение', 'Bo‘lim nimalar bilan shug‘ullanadi', 'Conditions we see', 'Бөлімнің жұмыс бағыты', 'Шуъба бо чӣ кор мекунад'],
  procedures: ['Диагностика и процедуры', 'Diagnostika va muolajalar', 'Tests and procedures', 'Диагностика және емшаралар', 'Ташхис ва расмиёт'],
  advantages: ['Подход клиники', 'Klinika yondashuvi', 'Our approach', 'Клиниканың тәсілі', 'Равиши клиника'],
  faq: ['Частые вопросы', 'Ko‘p so‘raladigan savollar', 'Frequently asked questions', 'Жиі қойылатын сұрақтар', 'Саволҳои маъмул'],
  specialty: ['Специализация', 'Ixtisoslik', 'Specialty', 'Мамандығы', 'Ихтисос'],
  experience: ['Стаж', 'Ish tajribasi', 'Experience', 'Еңбек өтілі', 'Таҷриба'],
  category: ['Квалификация', 'Malaka', 'Qualifications', 'Біліктілігі', 'Тахассус'],
  languages: ['Языки приёма', 'Qabul tillari', 'Consultation languages', 'Қабылдау тілдері', 'Забонҳои қабул'],
  education: ['Образование', 'Ta’lim', 'Education', 'Білімі', 'Таҳсилот'],
  bio: ['О враче', 'Shifokor haqida', 'About the doctor', 'Дәрігер туралы', 'Дар бораи табиб'],
  schedule: ['График приёма', 'Qabul jadvali', 'Consultation hours', 'Қабылдау кестесі', 'Ҷадвали қабул'],
  primaryPrice: ['Первичный приём', 'Birlamchi qabul', 'Initial consultation', 'Алғашқы қабылдау', 'Қабули аввал'],
  followUpPrice: ['Повторный приём', 'Takroriy qabul', 'Follow-up consultation', 'Қайта қабылдау', 'Қабули такрорӣ'],
  video: ['Видео', 'Videolar', 'Videos', 'Бейнелер', 'Наворҳо'],
  videoTitle: ['Видеовизитка', 'Video tanishtiruv', 'Video introduction', 'Бейнетаныстырылым', 'Муаррифии видеоӣ'],
  visit: ['Как подготовиться к приёму', 'Qabulga qanday tayyorlanish kerak', 'How to prepare for your visit', 'Қабылдауға қалай дайындалуға болады', 'Ба қабул чӣ гуна омода шудан лозим аст'],
  source: ['Источник', 'Manba', 'Source', 'Дереккөз', 'Манбаъ'],
  sources: ['Источники', 'Manbalar', 'Sources', 'Дереккөздер', 'Манбаъҳо'],
  officialMedia: ['Видео и новости клиники', 'Klinika videolari va yangiliklari', 'Clinic videos and news', 'Клиника бейнелері мен жаңалықтары', 'Наворҳо ва навигариҳои клиника'],
} satisfies Record<string, Translations>

export function xonCopy(locale: SiteLocale) {
  return Object.fromEntries(Object.entries(labels).map(([key, values]) => [key, translate(locale, values)])) as Record<keyof typeof labels, string>
}
