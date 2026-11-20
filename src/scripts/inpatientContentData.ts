import type { SiteLocale } from '@/components/XonHome/content'

type InpatientCopy = {
  summary: string
  facts: [string, string][]
  sections: [string, string][]
  reasons: string[]
  faq: [string, string][]
}

// Clinic facts confirmed by the owner on Nov20: non-surgical care, stays from10 days.
// Do not add room types, included procedures, prices or assigned doctors without confirmation.
export const inpatientContent: Record<SiteLocale, InpatientCopy> = {
  ru: {
    summary: 'Лечение без операций и медицинское наблюдение в стационаре. Плановый курс — от 10 дней.',
    facts: [['Лечение', 'Без операций'], ['Плановый курс', 'От 10 дней'], ['Поступление', 'По согласованию с клиникой']],
    sections: [
      ['Стационарное лечение без операций в Ташкенте', 'В стационаре XON Hospital проводят консервативное лечение: пациент проходит назначенный врачом курс без хирургических операций. Этот формат позволяет оставаться в клинике на период лечения и медицинского наблюдения. Необходимость госпитализации и подходящий план определяются после оценки состояния и имеющихся обследований.'],
      ['Курс от 10 дней: как планировать пребывание', 'Плановое стационарное лечение начинается от 10 дней. При обращении учитывайте этот срок, чтобы заранее организовать работу, дорогу и помощь близких. Точную продолжительность врач согласует с учётом диагноза, состояния и задач лечения. Срок не означает, что каждому пациенту подходит одинаковый набор назначений или что лечение обязательно завершится на десятый день.'],
      ['Когда стоит обсудить госпитализацию', 'Обратиться можно, если врач рекомендовал стационарное лечение, требуется обсудить курс без операций или вы хотите понять, подходит ли стационар при уже установленном диагнозе. Расскажите о жалобах, предыдущем лечении и обследованиях. До приезда уточните, принимают ли в клинике пациентов именно с вашей задачей: наличие стационара не означает возможность лечения любого заболевания.'],
      ['Как согласовать поступление и план лечения', 'Оставьте заявку на странице или позвоните в клинику. Администратор поможет уточнить порядок обращения и согласовать дальнейшие шаги. Медицинские вопросы и выбор лечения обсуждаются с врачом. Перед поступлением выясните, какие обследования уже достаточны, нужны ли дополнительные документы и в какое время следует приехать. Самостоятельно назначать себе процедуры по описанию сайта не нужно.'],
      ['Что подготовить перед приездом', 'Подготовьте документ, удостоверяющий личность, прежние врачебные заключения, выписки и результаты обследований, если они есть. Составьте список принимаемых лекарств с дозировками и сообщите об аллергии и сопутствующих заболеваниях. При записи уточните требования к документам, личным вещам, сопровождению и подготовке. Изменять привычные лекарства перед госпитализацией следует только по согласованию с врачом.'],
      ['Стоимость, условия пребывания и дальнейшее наблюдение', 'До поступления уточните стоимость курса от 10 дней, условия размещения и что входит в согласованную сумму. Отдельно спросите об оплате обследований, препаратов и процедур, если они будут назначены. На странице не указан единый пакет: состав лечения зависит от медицинской задачи. До окончания пребывания обсудите с врачом дальнейшие действия, контрольные визиты и вопросы по назначенному лечению.'],
    ],
    reasons: ['Рекомендация врача пройти лечение в стационаре', 'Обсуждение консервативного лечения без операций', 'Оценка возможности госпитализации с имеющимся диагнозом'],
    faq: [
      ['Проводят ли в стационаре операции?', 'Нет, стационар XON Hospital ориентирован на консервативное лечение без операций. Это не означает, что любое заболевание можно лечить без хирургии: необходимость других методов и подходящего медицинского учреждения обсуждается с врачом.'],
      ['Сколько длится стационарное лечение?', 'Плановый курс — от 10 дней. Точная продолжительность зависит от состояния, диагноза и плана лечения и согласуется с врачом.'],
      ['Можно ли заранее узнать стоимость?', 'Да, до поступления уточните у администратора стоимость согласованного курса, условия размещения и состав оплаты. Перечень обследований, препаратов и процедур следует обсудить отдельно; фиксированный пакет на этой странице не заявлен.'],
      ['Как записаться на стационарное лечение?', 'Оставьте номер телефона в форме на странице или позвоните +998 95 866 19 19. Уточните возможность лечения по вашему диагнозу и согласуйте порядок поступления до приезда. Адрес: Ташкент, 8-й проезд Файзли, 14.'],
      ['Все специалисты доступны круглосуточно?', 'Клиника работает 24/7. Ночью доступны дежурные терапевт и ЛОР. Остальные специалисты принимают с 08:30 примерно до 17:30–18:00 по индивидуальному расписанию. Время планового поступления согласуйте заранее.'],
    ],
  },
  uz: {
    summary: 'Statsionarda operatsiyasiz davolash va tibbiy kuzatuv. Rejali davolash kursi — 10 kundan boshlab.',
    facts: [['Davolash', 'Operatsiyasiz'], ['Rejali kurs', '10 kundan boshlab'], ['Yotqizish', 'Klinika bilan kelishilgan holda']],
    sections: [
      ['Toshkentda operatsiyasiz statsionar davolash', 'XON Hospital statsionarida konservativ davolash olib boriladi: bemor shifokor belgilagan kursni jarrohlik operatsiyalarisiz o‘taydi. Bu davolanish va tibbiy kuzatuv davrida klinikada qolish imkonini beradi. Yotqizish zarurati va mos reja bemorning holati hamda mavjud tekshiruvlar baholangandan so‘ng aniqlanadi.'],
      ['10 kundan boshlanadigan kursni rejalashtirish', 'Rejali statsionar davolash 10 kundan boshlanadi. Ish, yo‘l va yaqinlar yordamini oldindan tashkil qilishda shu muddatni hisobga oling. Aniq davomiylikni shifokor tashxis, holat va davolash vazifalariga qarab kelishadi. Bu muddat barcha bemorlarga bir xil muolajalar buyurilishini yoki davolash aynan o‘ninchi kuni tugashini anglatmaydi.'],
      ['Qachon yotqizish masalasini muhokama qilish mumkin?', 'Shifokor statsionar davolashni tavsiya qilgan bo‘lsa, operatsiyasiz kursni muhokama qilmoqchi bo‘lsangiz yoki mavjud tashxisingiz bilan statsionar mos kelishini bilmoqchi bo‘lsangiz, murojaat qiling. Shikoyatlar, avvalgi davolash va tekshiruvlar haqida ayting. Kelishdan oldin aynan sizning vaziyatingiz bo‘yicha qabul qilish imkoniyatini aniqlashtiring: statsionar mavjudligi har qanday kasallikni davolash mumkinligini anglatmaydi.'],
      ['Yotqizish va davolash rejasini qanday kelishish mumkin?', 'Sahifada ariza qoldiring yoki klinikaga qo‘ng‘iroq qiling. Administrator murojaat tartibi va keyingi qadamlarni aniqlashtirishga yordam beradi. Tibbiy savollar va davolash usulini shifokor bilan muhokama qiling. Yotqizishdan oldin qaysi tekshiruvlar yetarli, qo‘shimcha hujjatlar kerakmi va qachon kelish lozimligini so‘rang. Saytdagi tavsifga qarab o‘zingizga muolaja belgilamang.'],
      ['Kelishdan oldin nimalarni tayyorlash kerak?', 'Shaxsni tasdiqlovchi hujjat, mavjud shifokor xulosalari, ko‘chirmalar va tekshiruv natijalarini tayyorlang. Qabul qilayotgan dorilaringiz va dozalarini yozib oling, allergiya va hamroh kasalliklar haqida ayting. Yozilishda hujjatlar, shaxsiy buyumlar, hamrohlik va tayyorgarlik talablarini aniqlashtiring. Odatdagi dorilarni faqat shifokor bilan kelishib o‘zgartiring.'],
      ['Narx, joylashish sharoiti va keyingi kuzatuv', 'Yotqizishdan oldin 10 kundan boshlanadigan kurs narxi, joylashish sharoiti va kelishilgan summaga nimalar kirishini so‘rang. Buyurilishi mumkin bo‘lgan tekshiruv, dori va muolajalar to‘lovini alohida aniqlashtiring. Sahifada yagona paket ko‘rsatilmagan: davolash tarkibi tibbiy vazifaga bog‘liq. Kurs tugashidan oldin keyingi qadamlar, nazorat qabullari va buyurilgan davolash haqidagi savollarni shifokor bilan muhokama qiling.'],
    ],
    reasons: ['Shifokorning statsionarda davolanish tavsiyasi', 'Operatsiyasiz konservativ davolashni muhokama qilish', 'Mavjud tashxis bilan yotqizish imkoniyatini baholash'],
    faq: [
      ['Statsionarda operatsiyalar o‘tkaziladimi?', 'Yo‘q, XON Hospital statsionari operatsiyasiz konservativ davolashga yo‘naltirilgan. Bu har qanday kasallikni jarrohliksiz davolash mumkin degani emas: boshqa usullar va mos tibbiyot muassasasi zaruratini shifokor bilan muhokama qiling.'],
      ['Statsionar davolash qancha davom etadi?', 'Rejali kurs 10 kundan boshlanadi. Aniq davomiylik holat, tashxis va davolash rejasiga bog‘liq hamda shifokor bilan kelishiladi.'],
      ['Narxni oldindan bilish mumkinmi?', 'Ha, yotqizishdan oldin administratordan kelishilgan kurs narxi, joylashish sharoiti va to‘lov tarkibini so‘rang. Tekshiruv, dori va muolajalar ro‘yxatini alohida muhokama qiling; sahifada qat’iy paket e’lon qilinmagan.'],
      ['Statsionar davolashga qanday yozilish mumkin?', 'Sahifadagi shaklda telefon raqamingizni qoldiring yoki +998 95 866 19 19 raqamiga qo‘ng‘iroq qiling. Tashxisingiz bo‘yicha davolash imkoniyati va yotqizish tartibini kelishib oling. Manzil: Toshkent, Fayzli 8-tor ko‘chasi, 14.'],
      ['Barcha mutaxassislar kecha-kunduz ishlaydimi?', 'Klinika 24/7 ishlaydi. Tunda navbatchi terapevt va LOR qabul qiladi. Boshqa mutaxassislar 08:30 dan taxminan 17:30–18:00 gacha shaxsiy jadval bo‘yicha ishlaydi. Rejali yotqizish vaqtini oldindan kelishing.'],
    ],
  },
  en: {
    summary: 'Non-surgical inpatient treatment and medical supervision. Planned treatment courses start from 10 days.',
    facts: [['Treatment', 'Non-surgical'], ['Planned course', 'From 10 days'], ['Admission', 'By arrangement with the clinic']],
    sections: [
      ['Non-surgical inpatient care in Tashkent', 'XON Hospital provides conservative inpatient treatment: patients follow a doctor-prescribed course without surgical operations. This format allows a stay at the clinic during treatment and medical supervision. The need for admission and a suitable plan are assessed using the patient’s condition and available examination results.'],
      ['Planning a stay of 10 days or more', 'Planned inpatient treatment starts from 10 days. Allow for this when arranging work, travel and support from relatives. The doctor agrees the exact duration according to the diagnosis, condition and treatment objectives. This does not mean every patient receives the same prescriptions or that treatment will necessarily end on the tenth day.'],
      ['When to discuss admission', 'Contact the clinic if a doctor has recommended inpatient treatment, you wish to discuss a non-surgical course, or you want to find out whether admission is suitable for an existing diagnosis. Explain your concerns, previous treatment and examination results. Before travelling, check whether the clinic can accept your particular case; an inpatient service does not cover every condition.'],
      ['Arranging admission and a treatment plan', 'Submit the form on this page or call the clinic. The administrator can clarify how to proceed and arrange the next steps. Medical questions and treatment choices should be discussed with a doctor. Before admission, ask which examination results are sufficient, whether further documents are needed and when to arrive. Do not prescribe procedures for yourself based on a website description.'],
      ['Preparing for your stay', 'Prepare an identity document, available medical reports, discharge summaries and examination results. Make a list of medicines and doses, and tell the doctor about allergies and other conditions. When booking, ask about documents, personal belongings, accompanying visitors and preparation requirements. Change your usual medicines only after discussing this with a doctor.'],
      ['Costs, accommodation and follow-up', 'Before admission, clarify the cost of a course starting from 10 days, accommodation arrangements and what the agreed amount includes. Ask separately about payment for any prescribed tests, medicines and procedures. This page does not advertise a fixed package: treatment depends on the medical task. Before leaving, discuss further steps, follow-up appointments and questions about prescribed care with your doctor.'],
    ],
    reasons: ['A doctor’s recommendation for inpatient treatment', 'Discussion of conservative, non-surgical care', 'Assessment of admission suitability for an existing diagnosis'],
    faq: [
      ['Are operations performed in the inpatient unit?', 'No. XON Hospital’s inpatient service focuses on conservative treatment without operations. This does not mean every condition can be treated without surgery. Discuss any need for other treatment methods and an appropriate facility with a doctor.'],
      ['How long is the treatment course?', 'Planned courses start from 10 days. The exact duration depends on the patient’s condition, diagnosis and treatment plan and is agreed with the doctor.'],
      ['Can I check the cost in advance?', 'Yes. Before admission, ask the administrator about the agreed course, accommodation and included costs. Discuss tests, medicines and procedures separately; this page does not promise a fixed package.'],
      ['How do I request admission?', 'Leave your phone number in the form or call +998 95 866 19 19. Check treatment suitability for your diagnosis and agree admission arrangements before travelling. Address: 14, 8th Fayzli passage, Tashkent.'],
      ['Are all specialists available around the clock?', 'The clinic operates 24/7. Only the on-duty internist and ENT doctor are available overnight. Other specialists follow individual schedules from 08:30 until approximately 17:30–18:00. Arrange planned admission in advance.'],
    ],
  },
  kk: {
    summary: 'Стационарда операциясыз емдеу және медициналық бақылау. Жоспарлы ем курсы — 10 күннен бастап.',
    facts: [['Емдеу', 'Операциясыз'], ['Жоспарлы курс', '10 күннен бастап'], ['Жатқызу', 'Клиникамен келісу арқылы']],
    sections: [
      ['Ташкентте операциясыз стационарлық ем', 'XON Hospital стационарында консервативті ем жүргізіледі: пациент дәрігер тағайындаған курсты хирургиялық операциясыз өтеді. Бұл емдеу және медициналық бақылау кезінде клиникада болуға мүмкіндік береді. Жатқызу қажеттілігі мен тиісті жоспар пациенттің жағдайы және қолда бар тексерулер бағаланғаннан кейін анықталады.'],
      ['10 күннен басталатын курсты жоспарлау', 'Жоспарлы стационарлық ем 10 күннен басталады. Жұмыс, жол және жақындардың көмегін ұйымдастырғанда осы мерзімді ескеріңіз. Нақты ұзақтықты дәрігер диагнозға, жағдайға және ем міндеттеріне қарай келіседі. Бұл барлық пациентке бірдей тағайындау жасалатынын немесе ем оныншы күні міндетті түрде аяқталатынын білдірмейді.'],
      ['Жатқызуды қашан талқылауға болады?', 'Дәрігер стационарлық ем ұсынса, операциясыз курсты талқылағыңыз келсе немесе қойылған диагнозбен стационардың жарамдылығын білгіңіз келсе, хабарласыңыз. Шағымдар, бұрынғы ем және тексерулер туралы айтыңыз. Келмес бұрын нақты сіздің жағдайыңыз бойынша қабылдау мүмкіндігін анықтаңыз: стационардың болуы барлық ауруды емдеу мүмкіндігін білдірмейді.'],
      ['Жатқызу мен ем жоспарын келісу', 'Осы бетте өтінім қалдырыңыз немесе клиникаға қоңырау шалыңыз. Әкімші жүгіну тәртібі мен келесі қадамдарды нақтылауға көмектеседі. Медициналық сұрақтар мен ем таңдауын дәрігермен талқылаңыз. Қандай тексерулер жеткілікті, қосымша құжаттар керек пе және қашан келу қажет екенін сұраңыз. Сайттағы сипаттамаға қарап өзіңізге емшара тағайындамаңыз.'],
      ['Келер алдында не дайындау керек?', 'Жеке басыңызды куәландыратын құжатты, қолда бар дәрігер қорытындыларын, үзінділер мен тексеру нәтижелерін дайындаңыз. Қабылдайтын дәрілер мен мөлшерлерін тізіп, аллергия және қатар жүретін аурулар туралы айтыңыз. Жазылғанда құжаттар, жеке заттар, бірге келетін адам және дайындық талаптарын нақтылаңыз. Әдеттегі дәрілерді тек дәрігермен келісіп өзгертіңіз.'],
      ['Баға, орналастыру және кейінгі бақылау', 'Жатқызу алдында 10 күннен басталатын курс бағасын, орналастыру шарттарын және келісілген сомаға не кіретінін анықтаңыз. Тағайындалатын тексерулер, дәрілер мен емшаралардың төлемін бөлек сұраңыз. Бетте бірыңғай пакет көрсетілмеген: ем құрамы медициналық міндетке байланысты. Курс аяқталмай тұрып дәрігермен кейінгі қадамдар мен бақылау қабылдауларын талқылаңыз.'],
    ],
    reasons: ['Дәрігердің стационарлық ем туралы ұсынысы', 'Операциясыз консервативті емді талқылау', 'Қойылған диагнозбен жатқызу мүмкіндігін бағалау'],
    faq: [
      ['Стационарда операция жасала ма?', 'Жоқ, XON Hospital стационары операциясыз консервативті емге бағытталған. Бұл кез келген ауруды хирургиясыз емдеуге болады деген сөз емес. Басқа әдістер мен тиісті медициналық мекеме қажеттілігін дәрігермен талқылаңыз.'],
      ['Стационарлық ем қанша уақытқа созылады?', 'Жоспарлы курс 10 күннен басталады. Нақты ұзақтық жағдайға, диагнозға және ем жоспарына байланысты дәрігермен келісіледі.'],
      ['Бағаны алдын ала білуге бола ма?', 'Иә, жатқызу алдында әкімшіден келісілген курс бағасын, орналастыру мен төлем құрамын сұраңыз. Тексерулер, дәрілер және емшараларды бөлек талқылаңыз; бетте бекітілген пакет жарияланбаған.'],
      ['Стационарға қалай жазылуға болады?', 'Беттегі нысанда телефон нөміріңізді қалдырыңыз немесе +998 95 866 19 19 нөміріне қоңырау шалыңыз. Диагнозыңыз бойынша ем мүмкіндігі мен жатқызу тәртібін келер алдында келісіңіз. Мекенжай: Ташкент, Файзли 8-өтпесі, 14.'],
      ['Барлық мамандар тәулік бойы қабылдай ма?', 'Клиника 24/7 жұмыс істейді. Түнде кезекші терапевт пен ЛОР қабылдайды. Басқа мамандар 08:30-дан шамамен 17:30–18:00-ге дейін жеке кестемен жұмыс істейді. Жоспарлы жатқызу уақытын алдын ала келісіңіз.'],
    ],
  },
  tg: {
    summary: 'Табобати беҷарроҳӣ ва назорати тиббӣ дар беморхона. Курси нақшавӣ — аз 10 рӯз.',
    facts: [['Табобат', 'Бе ҷарроҳӣ'], ['Курси нақшавӣ', 'Аз 10 рӯз'], ['Бистарӣ шудан', 'Бо мувофиқаи клиника']],
    sections: [
      ['Табобати бистарии беҷарроҳӣ дар Тошканд', 'Дар стационари XON Hospital табобати консервативӣ гузаронида мешавад: бемор курси таъинкардаи духтурро бе амалиёти ҷарроҳӣ мегузарад. Ин шакл имкон медиҳад, ки ҳангоми табобат ва назорати тиббӣ дар клиника бимонед. Зарурати бистарӣ шудан ва нақшаи мувофиқ пас аз арзёбии ҳолат ва натиҷаҳои мавҷудаи ташхис муайян мешавад.'],
      ['Банақшагирии курс аз 10 рӯз', 'Табобати бистарии нақшавӣ аз 10 рӯз оғоз мешавад. Барои ташкил кардани кор, роҳ ва кумаки наздикон ин муҳлатро ба назар гиред. Давомнокии дақиқро духтур вобаста ба ташхис, ҳолат ва вазифаҳои табобат мувофиқа мекунад. Ин маънои онро надорад, ки ҳамаи беморон таъиноти якхела мегиранд ё табобат ҳатман дар рӯзи даҳум анҷом меёбад.'],
      ['Кай масъалаи бистарӣ шуданро муҳокима кардан мумкин аст?', 'Агар духтур табобати бистариро тавсия дода бошад, мехоҳед курси беҷарроҳиро муҳокима кунед ё мувофиқати стационарро барои ташхиси мавҷуда фаҳмед, муроҷиат кунед. Дар бораи шикоятҳо, табобати пешина ва ташхисҳо нақл кунед. Пеш аз омадан имкони қабулро барои ҳолати худ аниқ намоед: мавҷудияти стационар маънои табобати ҳама гуна бемориро надорад.'],
      ['Қабул ва нақшаи табобатро чӣ гуна мувофиқа кардан мумкин аст?', 'Дар саҳифа дархост гузоред ё ба клиника занг занед. Маъмур тартиби муроҷиат ва қадамҳои минбаъдаро мефаҳмонад. Саволҳои тиббӣ ва интихоби табобатро бо духтур муҳокима кунед. Пешакӣ пурсед, ки кадом натиҷаҳои ташхис кофӣ ҳастанд, ҳуҷҷатҳои иловагӣ лозиманд ё не ва кай бояд биёед. Аз рӯйи тавсифи сайт ба худ муолиҷа таъин накунед.'],
      ['Пеш аз омадан чӣ омода кардан лозим аст?', 'Ҳуҷҷати тасдиқкунандаи шахсият, хулосаҳои мавҷудаи духтур, иқтибосҳо ва натиҷаҳои ташхисро омода кунед. Рӯйхати доруҳо ва вояи онҳоро нависед, дар бораи аллергия ва бемориҳои ҳамроҳ хабар диҳед. Ҳангоми сабт талабот ба ҳуҷҷатҳо, ашёи шахсӣ, ҳамроҳӣ ва омодагиро аниқ кунед. Доруҳои маъмулиро танҳо бо мувофиқаи духтур тағйир диҳед.'],
      ['Нарх, шароити будубош ва назорати минбаъда', 'Пеш аз бистарӣ шудан нархи курс аз 10 рӯз, шароити ҷойгиршавӣ ва таркиби маблағи мувофиқашударо пурсед. Пардохти ташхисҳо, доруҳо ва муолиҷаҳои эҳтимолиро алоҳида аниқ намоед. Дар саҳифа бастаи ягона пешниҳод нашудааст: таркиби табобат аз вазифаи тиббӣ вобаста аст. Пеш аз анҷоми курс бо духтур қадамҳои минбаъда ва қабули назоратиро муҳокима кунед.'],
    ],
    reasons: ['Тавсияи духтур барои табобати бистарӣ', 'Муҳокимаи табобати консервативии беҷарроҳӣ', 'Арзёбии имкони бистарӣ шудан бо ташхиси мавҷуда'],
    faq: [
      ['Дар стационар ҷарроҳӣ мегузаронанд?', 'Не, стационари XON Hospital ба табобати консервативӣ бе амалиёти ҷарроҳӣ равона шудааст. Ин маънои онро надорад, ки ҳар бемориро бе ҷарроҳӣ табобат кардан мумкин аст. Зарурати усулҳои дигар ва муассисаи мувофиқро бо духтур муҳокима кунед.'],
      ['Табобати бистарӣ чанд рӯз давом мекунад?', 'Курси нақшавӣ аз 10 рӯз оғоз мешавад. Давомнокии дақиқ аз ҳолат, ташхис ва нақшаи табобат вобаста буда, бо духтур мувофиқа мешавад.'],
      ['Нархро пешакӣ фаҳмидан мумкин аст?', 'Бале, пеш аз қабул аз маъмур нархи курси мувофиқашуда, шароити ҷойгиршавӣ ва таркиби пардохтро пурсед. Ташхисҳо, доруҳо ва муолиҷаҳоро алоҳида муҳокима кунед; дар саҳифа бастаи собит эълон нашудааст.'],
      ['Барои табобати бистарӣ чӣ гуна сабт шавам?', 'Дар шакли саҳифа рақами телефон гузоред ё ба +998 95 866 19 19 занг занед. Имкони табобат аз рӯйи ташхис ва тартиби қабулро пеш аз омадан мувофиқа кунед. Нишонӣ: Тошканд, гузаргоҳи 8-уми Файзли, 14.'],
      ['Ҳамаи мутахассисон шабонарӯзӣ дастрасанд?', 'Клиника 24/7 кор мекунад. Шабона танҳо терапевт ва ЛОР-и навбатдор дастрасанд. Дигар мутахассисон аз 08:30 то тақрибан 17:30–18:00 аз рӯйи ҷадвали инфиродӣ қабул мекунанд. Вақти қабули нақшавиро пешакӣ мувофиқа кунед.'],
    ],
  },
}
