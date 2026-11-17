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
  heroEyebrow: 'XON HOSPITAL · Ташкент',
  heroTitle: 'Многопрофильная клиника',
  heroAccent: 'в Ташкенте.',
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

type LocalizedSections = Pick<Content, 'trust' | 'servicesText' | 'doctorsText' | 'affordabilityText' | 'serviceItems' | 'pathSteps'>

const sections: Record<Exclude<SiteLocale, 'ru'>, LocalizedSections> = {
  uz: {
    trust: ["Turli yo‘nalish shifokorlari","Kompleks Check-up","Reabilitatsiya va statsionar"],
    servicesText: "Shifokorlar jamoasi holatingizni baholaydi va keyingi qadamlarni tushuntiradi.",
    doctorsText: "Mutaxassislarning yo‘nalishi va tajribasi bilan tanishing hamda qabulga yoziling.",
    affordabilityText: "Qabuldan oldin narx va xizmat tarkibini administrator bilan aniqlashtirishingiz mumkin.",
    serviceItems: [["Nevrologiya","Asab tizimi kasalliklari bo‘yicha konsultatsiya, tashxis va kuzatuv."],["Ortopediya va vertebrologiya","Umurtqa pog‘onasi va bo‘g‘imlar bo‘yicha konsultatsiya."],["Gastroenterologiya","Ovqat hazm qilish tizimi bo‘yicha konsultatsiya va tekshiruv."],["Dermatologiya va trixologiya","Teri, soch va bosh terisi muammolari bo‘yicha konsultatsiya."],["Kompleks Check-up","Shaxsiy ehtiyojga mos profilaktik tekshiruvlar."],["Reabilitatsiya","Davolanish yoki jarohatdan keyingi individual tiklanish rejasi."]].map(([title, text], index) => ({ number: String(index + 1).padStart(2, '0'), title, text })),
    pathSteps: [["Suhbat","Shikoyatlaringiz va tibbiy tarixingizni tinglaymiz."],["Tekshiruv","Kerakli tahlil va tekshiruvlarni tanlaymiz."],["Reja","Keyingi qadamlarni tushuntiramiz."],["Kuzatuv","Holatingizga qarab rejani yangilaymiz."]].map(([title, text]) => ({ title, text })),
  },
  en: {
    trust: ["Doctors across specialties","Personalised check-ups","Rehabilitation and inpatient care"],
    servicesText: "Our team assesses your concerns and helps you plan the next step.",
    doctorsText: "Explore our doctors’ specialties and experience and book a consultation.",
    affordabilityText: "Ask our coordinator what your visit includes and how much it costs before booking.",
    serviceItems: [["Neurology","Consultation, diagnosis and follow-up for neurological concerns."],["Orthopaedics and spine care","Assessment of joint, spine and mobility concerns."],["Gastroenterology","Consultation and assessment for digestive concerns."],["Dermatology and hair health","Medical assessment of skin, scalp and hair concerns."],["Comprehensive check-up","Preventive assessments tailored to your health needs."],["Rehabilitation","An individual recovery plan following injury or treatment."]].map(([title, text], index) => ({ number: String(index + 1).padStart(2, '0'), title, text })),
    pathSteps: [["Discuss","Tell us your concerns and medical history."],["Assess","The doctor selects appropriate examinations and tests."],["Plan","Review the next steps with your doctor."],["Follow up","Review progress and adjust the plan when needed."]].map(([title, text]) => ({ title, text })),
  },
  kk: {
    trust: ["Әртүрлі саланың дәрігерлері","Кешенді тексеру","Оңалту және стационар"],
    servicesText: "Дәрігерлер жағдайыңызды бағалап, келесі қадамды жоспарлауға көмектеседі.",
    doctorsText: "Дәрігерлердің мамандығы мен тәжірибесін қарап, қабылдауға жазылыңыз.",
    affordabilityText: "Қабылдауға дейін қызмет құрамын және бағасын әкімшіден біле аласыз.",
    serviceItems: [["Неврология","Жүйке жүйесіне қатысты шағымдар бойынша кеңес, диагностика және бақылау."],["Ортопедия және вертебрология","Омыртқа мен буындарға қатысты шағымдар бойынша кеңес."],["Гастроэнтерология","Ас қорыту жүйесі бойынша кеңес және тексеру."],["Дерматология және трихология","Тері мен шаш мәселелерін бағалау."],["Кешенді Check-up","Жеке қажеттілікке сай профилактикалық тексеру."],["Оңалту","Жарақаттан немесе емнен кейінгі жеке қалпына келу жоспары."]].map(([title, text], index) => ({ number: String(index + 1).padStart(2, '0'), title, text })),
    pathSteps: [["Тыңдау","Шағымдарыңыз бен ауру тарихын талқылаймыз."],["Бағалау","Қажетті талдау мен тексерулерді таңдаймыз."],["Жоспарлау","Келесі қадамдарды түсіндіреміз."],["Бақылау","Жағдайға қарай жоспарды жаңартамыз."]].map(([title, text]) => ({ title, text })),
  },
  tg: {
    trust: ["Табибони ихтисосҳои гуногун","Муоинаи маҷмӯӣ","Барқарорсозӣ ва бистарӣ"],
    servicesText: "Дастаи табибон ҳолатро арзёбӣ мекунад ва дар интихоби қадами навбатӣ кумак мекунад.",
    doctorsText: "Бо ихтисос ва таҷрибаи табибон шинос шавед ва ба қабул нависед.",
    affordabilityText: "Пеш аз қабул нарх ва муҳтавои хизматрасониро аз маъмур пурсед.",
    serviceItems: [["Асабшиносӣ","Машварат, ташхис ва назорати бемориҳои системаи асаб."],["Ортопедия ва вертебрология","Машварат оид ба сутунмуҳра ва буғумҳо."],["Гастроэнтерология","Машварат ва муоинаи системаи ҳозима."],["Дерматология ва трихология","Арзёбии мушкилоти пӯст ва мӯй."],["Check-up-и маҷмӯӣ","Муоинаи пешгирикунанда мувофиқи ниёзи шахсӣ."],["Барқарорсозӣ","Нақшаи инфиродии барқарорсозӣ пас аз табобат ё осеб."]].map(([title, text], index) => ({ number: String(index + 1).padStart(2, '0'), title, text })),
    pathSteps: [["Суҳбат","Шикоятҳо ва таърихи тиббиро баррасӣ мекунем."],["Арзёбӣ","Ташхис ва таҳлилҳои заруриро интихоб мекунем."],["Нақша","Қадамҳои минбаъдаро шарҳ медиҳем."],["Назорат","Вобаста ба ҳолат нақшаро ислоҳ мекунем."]].map(([title, text]) => ({ title, text })),
  },
}

const translated = (locale: Exclude<SiteLocale, 'ru'>, overrides: Omit<Content, keyof LocalizedSections>): Content => ({ ...sections[locale], ...overrides })

export const content: Record<SiteLocale, Content> = {
  ru,
  uz: translated('uz', {
    nav: ['Yo‘nalishlar', 'Shifokorlar', 'Klinika haqida', 'Narxlar', 'Aloqa'],
    heroEyebrow: 'XON HOSPITAL · Toshkent', heroTitle: 'Ko‘p tarmoqli klinika', heroAccent: 'Toshkentda.',
    heroText: 'Birinchi konsultatsiya va diagnostikadan davolash, tiklanish va kuzatuvgacha — yagona tushunarli g‘amxo‘rlik tizimida.',
    primaryAction: 'Qabulga yozilish', secondaryAction: 'Yo‘nalishni tanlash', servicesLabel: 'Yo‘nalishlar',
    servicesTitle: 'Alohida muolajalar emas. Sog‘liq sari yaxlit yo‘l.', pathLabel: 'XON yondashuvi', pathTitle: 'Bitta bemor. Bitta kelishilgan reja.',
    doctorsLabel: 'Jamoa', doctorsTitle: 'O‘z mutaxassisligidan kengroq fikrlaydigan shifokor.',
    affordabilityTitle: 'Premium g‘amxo‘rlik — tushunarli va yetarli narxda.', formTitle: 'Suhbatdan boshlang',
    formText: 'Raqamingizni qoldiring — administrator vazifani aniqlab, shifokorni tanlashga yordam beradi.',
    name: 'Ismingiz', phone: 'Telefon raqami', direction: 'Yo‘nalish', directionPlaceholder: 'Masalan, nevrologiya', comment: 'Qisqa izoh (ixtiyoriy)',
    consent: 'Shaxsiy ma’lumotlarimni qayta ishlashga roziman', submit: 'Ariza yuborish', success: 'Rahmat. Arizangiz qabul qilindi.', error: 'Yuborilmadi. Ma’lumotlarni tekshirib, qayta urinib ko‘ring.',
  }),
  en: translated('en', {
    nav: ['Specialties', 'Doctors', 'About', 'Prices', 'Contacts'], heroEyebrow: 'XON HOSPITAL · Tashkent',
    heroTitle: 'Multidisciplinary care', heroAccent: 'in Tashkent.', heroText: 'From the first consultation and diagnostics to treatment, recovery and follow-up — one clear system of care.',
    primaryAction: 'Book an appointment', secondaryAction: 'Explore specialties', servicesLabel: 'Specialties', servicesTitle: 'Not isolated procedures. A complete path to better health.',
    pathLabel: 'The XON approach', pathTitle: 'One patient. One coordinated plan.', doctorsLabel: 'Team', doctorsTitle: 'A doctor who sees beyond one specialty.',
    affordabilityTitle: 'Premium care that still feels accessible.', formTitle: 'Start with a conversation', formText: 'Leave your number and our coordinator will help you choose the right doctor.',
    name: 'Your name', phone: 'Phone number', direction: 'Specialty', directionPlaceholder: 'For example, neurology', comment: 'Short note (optional)',
    consent: 'I agree to the processing of my personal data', submit: 'Send request', success: 'Thank you. We have received your request.', error: 'Could not send. Check the details and try again.',
  }),
  kk: translated('kk', {
    nav: ['Бағыттар', 'Дәрігерлер', 'Клиника туралы', 'Бағалар', 'Байланыс'], heroEyebrow: 'XON HOSPITAL · Ташкент',
    heroTitle: 'Көпсалалы медициналық көмек', heroAccent: 'Ташкентте.', heroText: 'Алғашқы кеңес пен диагностикадан емдеуге, қалпына келуге және бақылауға дейін — бір түсінікті жүйеде.',
    primaryAction: 'Қабылдауға жазылу', secondaryAction: 'Бағытты таңдау', servicesLabel: 'Бағыттар', servicesTitle: 'Жеке процедуралар емес. Денсаулыққа апаратын толық жол.',
    pathLabel: 'XON тәсілі', pathTitle: 'Бір пациент. Бір келісілген жоспар.', doctorsLabel: 'Команда', doctorsTitle: 'Өз мамандығынан кеңірек қарайтын дәрігер.',
    affordabilityTitle: 'Қолжетімсіздік сезімінсіз премиум қамқорлық.', formText: 'Нөміріңізді қалдырыңыз. Әкімші хабарласып, дәрігерді таңдауға көмектеседі.', formTitle: 'Әңгімеден бастаңыз', name: 'Атыңыз', phone: 'Телефон нөмірі', direction: 'Бағыт', directionPlaceholder: 'Мысалы, неврология', comment: 'Қысқаша түсініктеме', consent: 'Дербес деректерді өңдеуге келісемін', submit: 'Өтінім жіберу', success: 'Рақмет. Өтінім қабылданды.', error: 'Жіберілмеді. Деректерді тексеріңіз.',
  }),
  tg: translated('tg', {
    nav: ['Самтҳо', 'Табибон', 'Дар бораи клиника', 'Нархҳо', 'Тамос'], heroEyebrow: 'XON HOSPITAL · Тошканд',
    heroTitle: 'Кӯмаки тиббии бисёрсоҳа', heroAccent: 'дар Тошканд.', heroText: 'Аз машварат ва ташхис то табобат, барқарорсозӣ ва назорат — дар як низоми фаҳмои ғамхорӣ.',
    primaryAction: 'Ба қабул нависед', secondaryAction: 'Самтро интихоб кунед', servicesLabel: 'Самтҳо', servicesTitle: 'На расмиёти ҷудогона. Роҳи пурра ба сӯи саломатӣ.',
    pathLabel: 'Равиши XON', pathTitle: 'Як бемор. Як нақшаи мувофиқашуда.', doctorsLabel: 'Даста', doctorsTitle: 'Табибе, ки васеътар аз ихтисоси худ мебинад.',
    affordabilityTitle: 'Ғамхории олӣ бо нархи фаҳмо.', formText: 'Рақами худро гузоред. Маъмур тамос гирифта, барои интихоби табиб кумак мекунад.', formTitle: 'Аз суҳбат оғоз кунед', name: 'Номи шумо', phone: 'Рақами телефон', direction: 'Самт', directionPlaceholder: 'Масалан, неврология', comment: 'Шарҳи кӯтоҳ', consent: 'Ба коркарди маълумоти шахсӣ розӣ ҳастам', submit: 'Дархост фиристед', success: 'Ташаккур. Дархост қабул шуд.', error: 'Фиристода нашуд. Маълумотро санҷед.',
  }),
}
