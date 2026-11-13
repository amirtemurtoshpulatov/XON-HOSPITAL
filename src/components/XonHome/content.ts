export const localeCodes = ['ru', 'uz', 'en', 'kk', 'tg'] as const
export type SiteLocale = (typeof localeCodes)[number]

type Content = {
  nav: string[]
  heroEyebrow: string
  heroTitle: string
  heroAccent: string
  heroText: string
  primaryAction: string
  secondaryAction: string
  trust: string[]
  servicesLabel: string
  servicesTitle: string
  servicesText: string
  serviceItems: { number: string; title: string; text: string }[]
  pathLabel: string
  pathTitle: string
  pathSteps: { title: string; text: string }[]
  doctorsLabel: string
  doctorsTitle: string
  doctorsText: string
  affordabilityTitle: string
  affordabilityText: string
  formTitle: string
  formText: string
  name: string
  phone: string
  direction: string
  directionPlaceholder: string
  comment: string
  consent: string
  submit: string
  success: string
  error: string
}

const ru: Content = {
  nav: ['Направления', 'Врачи', 'О клинике', 'Цены', 'Контакты'],
  heroEyebrow: 'Многопрофильный медицинский центр · Ташкент',
  heroTitle: 'Врачи, диагностика и лечение',
  heroAccent: 'в одном месте.',
  heroText: '20 врачей, основные медицинские направления, комплексный Check-up, стационар и реабилитация — с понятным маршрутом и прозрачной стоимостью.',
  primaryAction: 'Записаться на приём',
  secondaryAction: 'Выбрать направление',
  trust: ['20 врачей в одной команде', 'Комплексный Check-up', 'Реабилитация и стационар'],
  servicesLabel: 'Направления',
  servicesTitle: 'Не отдельные процедуры. Целый маршрут к здоровью.',
  servicesText: 'Команда XON HOSPITAL рассматривает состояние комплексно и помогает пройти следующий шаг без лишней неопределённости.',
  serviceItems: [
    { number: '01', title: 'Неврология', text: 'Консультация, диагностика и сопровождение пациентов с заболеваниями нервной системы.' },
    { number: '02', title: 'Ортопедия и вертебрология', text: 'Работа с позвоночником, суставами, движением и восстановлением качества жизни.' },
    { number: '03', title: 'Гастроэнтерология', text: 'Комплексный подход к здоровью пищеварительной системы и долгосрочному наблюдению.' },
    { number: '04', title: 'Дерматология и трихология', text: 'Диагностика и лечение заболеваний кожи, волос и кожи головы.' },
    { number: '05', title: 'Диагностика и Check-up', text: 'Обследования и программы профилактики, собранные вокруг конкретной задачи пациента.' },
    { number: '06', title: 'Реабилитация', text: 'Персональный план восстановления после лечения, травм и периодов ограниченной активности.' },
  ],
  pathLabel: 'Подход XON',
  pathTitle: 'Один пациент. Один согласованный план.',
  pathSteps: [
    { title: 'Разобраться', text: 'Выслушиваем, уточняем жалобы и медицинскую историю.' },
    { title: 'Проверить', text: 'Назначаем только обоснованные обследования и анализы.' },
    { title: 'Помочь', text: 'Формируем персональный и понятный план лечения.' },
    { title: 'Сопровождать', text: 'Контролируем динамику и корректируем следующий шаг.' },
  ],
  doctorsLabel: 'Команда',
  doctorsTitle: 'Врач, который видит больше своей специализации.',
  doctorsText: 'Врачи XON HOSPITAL могут работать вместе над одним случаем. Так пациент получает не набор разрозненных мнений, а согласованный маршрут.',
  affordabilityTitle: 'Премиальная забота без ощущения недоступности.',
  affordabilityText: 'Честно объясняем варианты, стоимость и приоритеты. Вы понимаете, за что платите и какой следующий шаг действительно нужен.',
  formTitle: 'Начните с разговора',
  formText: 'Оставьте номер — администратор свяжется, уточнит задачу и поможет выбрать врача.',
  name: 'Ваше имя', phone: 'Номер телефона', direction: 'Направление', directionPlaceholder: 'Например, неврология', comment: 'Короткий комментарий (необязательно)',
  consent: 'Я согласен на обработку персональных данных', submit: 'Отправить заявку', success: 'Спасибо. Заявка получена — мы скоро свяжемся с вами.', error: 'Не удалось отправить. Проверьте данные или попробуйте ещё раз.',
}

const translated = (overrides: Partial<Content>): Content => ({ ...ru, ...overrides })

export const content: Record<SiteLocale, Content> = {
  ru,
  uz: translated({
    nav: ['Yo‘nalishlar', 'Shifokorlar', 'Klinika haqida', 'Narxlar', 'Aloqa'],
    heroEyebrow: 'O‘zbekistondagi ko‘p tarmoqli klinika', heroTitle: 'Barcha bosqichlari', heroAccent: 'o‘zaro bog‘liq tibbiyot.',
    heroText: 'Birinchi konsultatsiya va diagnostikadan davolash, tiklanish va kuzatuvgacha — yagona tushunarli g‘amxo‘rlik tizimida.',
    primaryAction: 'Qabulga yozilish', secondaryAction: 'Yo‘nalishni tanlash', servicesLabel: 'Yo‘nalishlar',
    servicesTitle: 'Alohida muolajalar emas. Sog‘liq sari yaxlit yo‘l.', pathLabel: 'XON yondashuvi', pathTitle: 'Bitta bemor. Bitta kelishilgan reja.',
    doctorsLabel: 'Jamoa', doctorsTitle: 'O‘z mutaxassisligidan kengroq fikrlaydigan shifokor.',
    affordabilityTitle: 'Premium g‘amxo‘rlik — tushunarli va yetarli narxda.', formTitle: 'Suhbatdan boshlang',
    formText: 'Raqamingizni qoldiring — administrator vazifani aniqlab, shifokorni tanlashga yordam beradi.',
    name: 'Ismingiz', phone: 'Telefon raqami', direction: 'Yo‘nalish', directionPlaceholder: 'Masalan, nevrologiya', comment: 'Qisqa izoh (ixtiyoriy)',
    consent: 'Shaxsiy ma’lumotlarimni qayta ishlashga roziman', submit: 'Ariza yuborish', success: 'Rahmat. Arizangiz qabul qilindi.', error: 'Yuborilmadi. Ma’lumotlarni tekshirib, qayta urinib ko‘ring.',
  }),
  en: translated({
    nav: ['Specialties', 'Doctors', 'About', 'Prices', 'Contacts'], heroEyebrow: 'Multidisciplinary clinic in Uzbekistan',
    heroTitle: 'Healthcare where', heroAccent: 'everything connects.', heroText: 'From the first consultation and diagnostics to treatment, recovery and follow-up — one clear system of care.',
    primaryAction: 'Book an appointment', secondaryAction: 'Explore specialties', servicesLabel: 'Specialties', servicesTitle: 'Not isolated procedures. A complete path to better health.',
    pathLabel: 'The XON approach', pathTitle: 'One patient. One coordinated plan.', doctorsLabel: 'Team', doctorsTitle: 'A doctor who sees beyond one specialty.',
    affordabilityTitle: 'Premium care that still feels accessible.', formTitle: 'Start with a conversation', formText: 'Leave your number and our coordinator will help you choose the right doctor.',
    name: 'Your name', phone: 'Phone number', direction: 'Specialty', directionPlaceholder: 'For example, neurology', comment: 'Short note (optional)',
    consent: 'I agree to the processing of my personal data', submit: 'Send request', success: 'Thank you. We have received your request.', error: 'Could not send. Check the details and try again.',
  }),
  kk: translated({
    nav: ['Бағыттар', 'Дәрігерлер', 'Клиника туралы', 'Бағалар', 'Байланыс'], heroEyebrow: 'Өзбекстандағы көпсалалы клиника',
    heroTitle: 'Барлығы байланысқан', heroAccent: 'медицина.', heroText: 'Алғашқы кеңес пен диагностикадан емдеуге, қалпына келуге және бақылауға дейін — бір түсінікті жүйеде.',
    primaryAction: 'Қабылдауға жазылу', secondaryAction: 'Бағытты таңдау', servicesLabel: 'Бағыттар', servicesTitle: 'Жеке процедуралар емес. Денсаулыққа апаратын толық жол.',
    pathLabel: 'XON тәсілі', pathTitle: 'Бір пациент. Бір келісілген жоспар.', doctorsLabel: 'Команда', doctorsTitle: 'Өз мамандығынан кеңірек қарайтын дәрігер.',
    affordabilityTitle: 'Қолжетімсіздік сезімінсіз премиум қамқорлық.', formTitle: 'Әңгімеден бастаңыз', name: 'Атыңыз', phone: 'Телефон нөмірі', direction: 'Бағыт', directionPlaceholder: 'Мысалы, неврология', comment: 'Қысқаша түсініктеме', consent: 'Дербес деректерді өңдеуге келісемін', submit: 'Өтінім жіберу', success: 'Рақмет. Өтінім қабылданды.', error: 'Жіберілмеді. Деректерді тексеріңіз.',
  }),
  tg: translated({
    nav: ['Самтҳо', 'Табибон', 'Дар бораи клиника', 'Нархҳо', 'Тамос'], heroEyebrow: 'Клиникаи бисёрсоҳа дар Ӯзбекистон',
    heroTitle: 'Тиббе, ки дар он', heroAccent: 'ҳама чиз пайваст аст.', heroText: 'Аз машварат ва ташхис то табобат, барқарорсозӣ ва назорат — дар як низоми фаҳмои ғамхорӣ.',
    primaryAction: 'Ба қабул нависед', secondaryAction: 'Самтро интихоб кунед', servicesLabel: 'Самтҳо', servicesTitle: 'На расмиёти ҷудогона. Роҳи пурра ба сӯи саломатӣ.',
    pathLabel: 'Равиши XON', pathTitle: 'Як бемор. Як нақшаи мувофиқашуда.', doctorsLabel: 'Даста', doctorsTitle: 'Табибе, ки васеътар аз ихтисоси худ мебинад.',
    affordabilityTitle: 'Ғамхории олӣ бо нархи фаҳмо.', formTitle: 'Аз суҳбат оғоз кунед', name: 'Номи шумо', phone: 'Рақами телефон', direction: 'Самт', directionPlaceholder: 'Масалан, неврология', comment: 'Шарҳи кӯтоҳ', consent: 'Ба коркарди маълумоти шахсӣ розӣ ҳастам', submit: 'Дархост фиристед', success: 'Ташаккур. Дархост қабул шуд.', error: 'Фиристода нашуд. Маълумотро санҷед.',
  }),
}
