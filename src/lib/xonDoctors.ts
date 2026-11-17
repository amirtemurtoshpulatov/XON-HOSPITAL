import type { Doctor } from '@/payload-types'
import type { SiteLocale } from '@/components/XonHome/content'
import { getSeededDoctorPhoto } from './doctorPhotos'
import { translate } from './xonCopy'
import { serviceCopy } from './xonServices'

type Localized = Parameters<typeof translate>[1]
type Profile = {
  name: Localized
  service: string
  position: Localized
  bio?: Localized
  years?: number
  instagram?: string
  education?: 'tashkent' | 'samarkand'
  focus?: Localized[]
}

const profiles: Record<string, Profile> = {
  'xursand-yusupboyevich': {
    name: ["Хурсанд Юсупбоевич Кутумов","Xursand Yusupboyevich Kutumov","Xursand Yusupboyevich Kutumov","Хурсанд Юсупбоевич Кутумов","Хурсанд Юсупбоевич Кутумов"],
    service: 'gastroenterology',
    instagram: 'dr.xursand',
    position: ["Владелец и главный врач","Klinika egasi va bosh shifokor","Clinic owner and chief physician","Клиника иесі және бас дәрігер","Соҳиб ва сартабиби клиника"],
    bio: ["Хурсанд Юсупбоевич руководит медицинской командой XON HOSPITAL. Его профиль — гастроэнтерология: консультации по жалобам со стороны пищеварительной системы и обсуждение дальнейшего обследования.","Xursand Yusupboyevich XON HOSPITAL tibbiy jamoasini boshqaradi. Gastroenterolog sifatida ovqat hazm qilish tizimi bo‘yicha maslahat beradi va keyingi tekshiruvni muhokama qiladi.","Xursand Yusupboyevich leads the XON HOSPITAL medical team. His specialty is gastroenterology, with consultations for digestive concerns and planning further assessment.","Хурсанд Юсупбоевич XON HOSPITAL медициналық командасын басқарады. Мамандығы — гастроэнтерология. Ас қорытуға қатысты шағымдар бойынша кеңес беріп, әрі қарайғы тексеруді талқылайды.","Хурсанд Юсупбоевич дастаи тиббии XON HOSPITAL-ро роҳбарӣ мекунад. Ихтисосаш гастроэнтерология аст: машварат барои мушкилоти ҳозима ва баррасии ташхиси минбаъда."],
    focus: [
      ["Жалобы со стороны пищеварительной системы","Ovqat hazm qilish tizimi bilan bog‘liq shikoyatlar","Digestive concerns","Ас қорытуға қатысты шағымдар","Шикоятҳои вобаста ба ҳозима"],
      ["Разбор ранее выполненных обследований","Avvalgi tekshiruv natijalarini ko‘rib chiqish","Review of previous test results","Алдыңғы тексерулердің нәтижелерін талдау","Баррасии натиҷаҳои ташхисҳои қаблӣ"],
    ],
  },
  'asiljon-abdullaev': {
    name: ["Асилжон Кахрамонович Абдуллаев","Asiljon Qahramonovich Abdullayev","Asiljon Kakhramonovich Abdullaev","Асилжон Кахрамонович Абдуллаев","Асилҷон Қаҳрамонович Абдуллоев"],
    service: 'therapy',
    position: ["Терапевт, клинический фармаколог, доцент","Terapevt, klinik farmakolog, dotsent","Internist, clinical pharmacologist and associate professor","Терапевт, клиникалық фармаколог, доцент","Терапевт, фармакологи клиникӣ, дотсент"],
    bio: ["Принимает взрослых пациентов. На консультации разбирает жалобы и результаты обследований, оценивает назначенные лекарства и при необходимости помогает выбрать профильного специалиста.","Katta yoshdagi bemorlarni qabul qiladi. Shikoyatlar va tekshiruv natijalarini ko‘rib chiqadi, buyurilgan dorilarni baholaydi va zarurat bo‘lsa, tegishli mutaxassisni tanlashga yordam beradi.","He sees adult patients, reviews symptoms and test results, and assesses current prescriptions. When needed, he helps patients find the appropriate specialist.","Ересектерді қабылдайды. Шағымдар мен тексеру нәтижелерін талдайды, тағайындалған дәрілерді бағалайды және қажет болса бейінді маман таңдауға көмектеседі.","Беморони калонсолро қабул мекунад. Шикоятҳо, натиҷаҳои ташхис ва доруҳои таъйиншударо баррасӣ мекунад ва дар ҳолати зарурӣ ба интихоби мутахассис кумак мерасонад."],
    years: 30,
    instagram: 'doctor_asiljon',
    education: 'samarkand',
    focus: [
      ["Жалобы со стороны сердца и лёгких","Yurak va o‘pka bilan bog‘liq shikoyatlar","Heart and lung concerns","Жүрек пен өкпеге қатысты шағымдар","Шикоятҳои дил ва шуш"],
      ["Разбор лекарственных назначений","Dori buyurilmalarini ko‘rib chiqish","Medication review","Дәрілік тағайындауларды талдау","Баррасии доруҳои таъйиншуда"],
    ],
  },
  'asilbek-sharofov': {
    name: ["Асилбек Шарофов","Asilbek Sharofov","Asilbek Sharofov","Асилбек Шарофов","Асилбек Шарофов"],
    service: 'ent',
    position: ["ЛОР-врач","LOR shifokori","ENT doctor","ЛОР дәрігері","Табиби ЛОР"],
    bio: ["Консультирует при жалобах со стороны уха, горла и носа. На приёме уточняет, как давно появились симптомы, проводит ЛОР-осмотр и объясняет, какие обследования могут понадобиться.","Quloq, tomoq va burun shikoyatlari bo‘yicha maslahat beradi. Qabulda alomatlar qachon boshlanganini aniqlaydi, LOR ko‘rigini o‘tkazadi va kerakli tekshiruvlarni tushuntiradi.","He sees patients with ear, nose and throat concerns. At the visit he reviews when symptoms started, examines the affected areas and explains any tests that may be needed.","Құлақ, тамақ және мұрын шағымдары бойынша кеңес береді. Белгілердің басталу уақытын анықтайды, ЛОР тексеруін жүргізеді және қандай зерттеу қажет болуы мүмкін екенін түсіндіреді.","Оид ба мушкилоти гӯш, гулӯ ва бинӣ машварат медиҳад. Оғози нишонаҳоро муайян карда, муоина мегузаронад ва ташхисҳои эҳтимолиро шарҳ медиҳад."],
    years: 5,
    instagram: 'asilbek_lor',
    education: 'tashkent',
    focus: [
      ["Боль в горле и повторяющиеся ЛОР-жалобы","Tomoq og‘rig‘i va takrorlanadigan LOR shikoyatlari","Sore throat and recurring ENT symptoms","Тамақ ауруы және қайталанатын ЛОР шағымдары","Дарди гулӯ ва шикоятҳои такрории ЛОР"],
      ["Заложенность носа, гайморит и аденоиды","Burun bitishi, gaymorit va adenoidlar","Nasal congestion, sinus problems and adenoids","Мұрын бітелуі, гайморит және аденоидтар","Бандшавии бинӣ, гайморит ва аденоидҳо"],
    ],
  },
  'fayzullo-narzullayevich': {
    name: ["Файзулло Нарзуллаевич Одинаев","Fayzulla Nazrullayevich Odinayev","Fayzulla Nazrullayevich Odinayev","Файзулло Нарзуллаевич Одинаев","Файзулло Нарзуллоевич Одинаев"],
    service: 'neurology',
    position: ["Врач-невролог","Nevrolog shifokor","Neurologist","Невролог дәрігер","Табиби асабшинос"],
    bio: ["Консультирует при головной боли и головокружении, наблюдает пациентов с неврологическими заболеваниями и помогает спланировать восстановление после инсульта.","Bosh og‘rig‘i va bosh aylanishi bo‘yicha maslahat beradi, nevrologik kasalliklari bo‘lgan bemorlarni kuzatadi va insultdan keyingi tiklanish rejasini tuzishga yordam beradi.","He sees patients with headaches and dizziness, follows patients with neurological conditions and helps plan rehabilitation after stroke.","Бас ауруы мен бас айналу бойынша кеңес береді, неврологиялық аурулары бар адамдарды бақылайды және инсульттен кейінгі оңалтуды жоспарлауға көмектеседі.","Оид ба дарди сар ва сарчархӣ машварат медиҳад, беморони гирифтори бемориҳои асабро назорат мекунад ва дар банақшагирии барқарорсозии баъди сакта кумак мерасонад."],
    years: 10,
    instagram: 'nevropotolog_fayzulla',
    education: 'tashkent',
    focus: [
      ["Головная боль и головокружение","Bosh og‘rig‘i va bosh aylanishi","Headaches and dizziness","Бас ауруы және бас айналу","Дарди сар ва сарчархӣ"],
      ["Эпилепсия и болезнь Паркинсона","Epilepsiya va Parkinson kasalligi","Epilepsy and Parkinson’s disease","Эпилепсия және Паркинсон ауруы","Саръ ва бемории Паркинсон"],
      ["Восстановление после инсульта","Insultdan keyingi tiklanish","Rehabilitation after stroke","Инсульттен кейінгі оңалту","Барқарорсозӣ пас аз сакта"],
    ],
  },
  'zafar-abdirazzakov': {
    name: ["Зафар Абдираззаков","Zafar Abdirazzakov","Zafar Abdirazzakov","Зафар Абдираззаков","Зафар Абдираззоқов"],
    service: 'orthopedics',
    position: ["Травматолог-ортопед, вертебролог","Travmatolog-ortoped, vertebrolog","Orthopaedic traumatologist and spine specialist","Травматолог-ортопед, вертебролог","Травматолог-ортопед, вертебролог"],
    years: 11,
    instagram: 'ortoped_azm',
    education: 'tashkent',
  },
  'dilshod-abdusammatovich': {
    name: ["Дилшод Абдусамматович","Dilshod Abdusammatovich","Dilshod Abdusammatovich","Дилшод Абдусамматович","Дилшод Абдусамматович"],
    service: 'oncology',
    position: ["Врач-онколог","Onkolog shifokor","Oncologist","Онколог дәрігер","Табиби саратоншинос"],
    years: 13,
  },
  'ruslan-alisherovich': {
    name: ["Руслан Алишерович","Ruslan Alisherovich","Ruslan Alisherovich","Руслан Алишерович","Руслан Алишерович"],
    service: 'oncology',
    position: ["Врач-онколог, онкотерапевт","Onkolog, onkoterapevt","Medical oncologist","Онколог, онкотерапевт","Табиби саратоншинос"],
    years: 5,
    instagram: 'dralisherovich',
  },
  'li-li': {
    name: ["Ли Ли","Li Li","Li Li","Ли Ли","Ли Ли"],
    service: 'chinese-medicine',
    position: ["Невролог, специалист по традиционной китайской медицине","Nevrolog, an’anaviy Xitoy tibbiyoti mutaxassisi","Neurologist and traditional Chinese medicine practitioner","Невролог, дәстүрлі қытай медицинасы маманы","Асабшинос ва мутахассиси тибби анъанавии чинӣ"],
    years: 16,
  },
  'vohid-latipov': {
    name: ["Вохид Латипов","Vohid Latipov","Vohid Latipov","Вохид Латипов","Воҳид Латипов"],
    service: 'dermatology',
    position: ["Врач-дерматолог","Dermatolog shifokor","Dermatologist","Дерматолог дәрігер","Табиби пӯст"],
    years: 10,
    instagram: 'dermatolog.latipov',
  },
  'shakhlo-talipova': {
    name: ["Шахло Рахимжановна Талипова","Shahlo Rahimjanovna Talipova","Shakhlo Rakhimzhanovna Talipova","Шахло Рахимжановна Талипова","Шаҳло Раҳимҷоновна Талипова"],
    service: 'ultrasound',
    position: ["Врач УЗИ, радиолог","UTT shifokori, radiolog","Ultrasound physician, radiologist","УДЗ дәрігері, радиолог","Табиби УЗИ, радиолог"],
    years: 7,
    instagram: 'uzi_shakhlo',
  },
  'makhina-khidirova': {
    name: ["Махина Сохиповна Хидирова","Mahina Sohipovna Xidirova","Makhina Sokhipovna Khidirova","Махина Сохиповна Хидирова","Маҳина Соҳиповна Хидирова"],
    service: 'gynecology',
    position: ["Акушер-гинеколог, репродуктолог","Akusher-ginekolog, reproduktolog","Obstetrician-gynaecologist and fertility specialist","Акушер-гинеколог, репродуктолог","Акушер-гинеколог, мутахассиси репродуктология"],
    years: 8,
    instagram: 'xidirova_mahina',
  },
}

const schools = {
  tashkent: ['Ташкентская медицинская академия', 'Toshkent tibbiyot akademiyasi', 'Tashkent Medical Academy', 'Ташкент медицина академиясы', 'Академияи тиббии Тошканд'],
  samarkand: ['Самаркандский медицинский институт', 'Samarqand tibbiyot instituti', 'Samarkand Medical Institute', 'Самарқанд медицина институты', 'Донишкадаи тиббии Самарқанд'],
} as const

export const featuredDoctorSlugs = ['xursand-yusupboyevich', 'asiljon-abdullaev', 'asilbek-sharofov', 'fayzullo-narzullayevich']

export function doctorProfile(locale: SiteLocale, slug: string, doctor?: Doctor) {
  const baseline = Object.hasOwn(profiles, slug) ? profiles[slug] : undefined
  const specialty = doctor?.specialty || (baseline && serviceCopy(locale, baseline.service)?.title)
  const legacyName = slug === 'fayzullo-narzullayevich' && doctor?.name === 'Файзулло Нарзуллаевич'
  const name = (!legacyName && doctor?.name) || (baseline && translate(locale, baseline.name))
  if (!specialty || !name) return null

  const education = doctor?.education && !/подтверд|уточнит|исходн/i.test(doctor.education) ? doctor.education : undefined
  const years = baseline?.years
  const legacyExperience = slug === 'asilbek-sharofov' && doctor?.experience === '3 года'
  const handle = doctor?.instagram?.replace(/^@/, '')
  const legacyInstagram = (slug === 'asiljon-abdullaev' && handle === 'doktor_asiljon') ||
    (slug === 'shakhlo-talipova' && handle === 'uzi_shaklo')
  return {
    ...doctor,
    slug,
    name,
    specialty,
    position: doctor?.position || (baseline && translate(locale, baseline.position)),
    shortBio: doctor?.shortBio || (baseline?.bio && translate(locale, baseline.bio)),
    photoUrl: (typeof doctor?.photo === 'object' && doctor.photo?.url) || getSeededDoctorPhoto(slug),
    experience: (!legacyExperience && doctor?.experience) || (years && translate(locale, [
      `${years} ${years === 3 ? 'года' : 'лет'}`, `${years} yil`, `${years} years`, `${years} жыл`, `${years} сол`,
    ])),
    education: education || (baseline?.education && translate(locale, schools[baseline.education])),
    instagram: (!legacyInstagram && doctor?.instagram) || baseline?.instagram,
    focusAreas: doctor?.focusAreas?.length ? doctor.focusAreas : baseline?.focus?.map((item) => ({ label: translate(locale, item), id: undefined })),
  }
}

export function doctorDirectory(locale: SiteLocale, doctors: Doctor[]) {
  const docs = new Map(doctors.map((doctor) => [doctor.slug, doctor]))
  const slugs = [...new Set([...featuredDoctorSlugs, ...docs.keys(), ...Object.keys(profiles)])]
  return slugs.flatMap((slug) => {
    const profile = doctorProfile(locale, slug, docs.get(slug))
    return profile ? [profile] : []
  })
}
