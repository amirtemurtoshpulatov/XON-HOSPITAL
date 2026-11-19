import type { SiteLocale } from '@/components/XonHome/content'
import { translate } from '@/lib/xonCopy'

type Localized = Parameters<typeof translate>[1]

// Reasons for consultation within the existing specialty; no new procedures or qualifications.
const focus: Record<string, Localized[]> = {
  gastroenterology: [
    ['Повторяющаяся боль и дискомфорт в верхней части живота', 'Qorinning yuqori qismida takroriy og‘riq va noqulaylik', 'Recurrent upper abdominal pain and discomfort', 'Іштің жоғарғы бөлігінің қайталанатын ауруы мен жайсыздығы', 'Дарди такрорӣ ва нороҳатӣ дар қисми болоии шикам'],
    ['Изжога и кислый привкус после еды', 'Jig‘ildon qaynashi va ovqatdan keyin nordon ta’m', 'Heartburn and a sour taste after meals', 'Қыжыл және тамақтан кейінгі қышқыл дәм', 'Зардаҷӯшӣ ва таъми турш баъди хӯрок'],
    ['Вздутие и ощущение распирания в животе', 'Qorin dam bo‘lishi va to‘lishib turishi', 'Bloating and abdominal fullness', 'Іштің кебуі және керілу сезімі', 'Дамиши шикам ва эҳсоси пурӣ'],
    ['Тяжесть и дискомфорт после привычной еды', 'Odatdagi ovqatdan keyin og‘irlik va noqulaylik', 'Heaviness and discomfort after meals', 'Тамақтан кейінгі ауырлық пен жайсыздық', 'Вазнинӣ ва нороҳатӣ баъди хӯрок'],
    ['Повторяющаяся тошнота и связанные с пищеварением жалобы', 'Takroriy ko‘ngil aynishi va hazm bilan bog‘liq shikoyatlar', 'Recurrent nausea and digestive symptoms', 'Қайталанатын жүрек айну және ас қорыту шағымдары', 'Дилбеҳузурии такрорӣ ва шикоятҳои ҳозима'],
    ['Вопросы питания при заболеваниях пищеварительной системы', 'Hazm tizimi kasalliklarida ovqatlanish bo‘yicha savollar', 'Dietary questions related to digestive conditions', 'Ас қорыту ауруларындағы тамақтану мәселелері', 'Саволҳои ғизо ҳангоми бемориҳои ҳозима'],
  ],
  therapy: [
    ['Слабость, утомляемость и общее ухудшение самочувствия', 'Holsizlik, tez charchash va umumiy ahvol yomonlashishi', 'Fatigue, weakness and changes in general wellbeing', 'Әлсіздік, тез шаршау және жалпы жағдайдың нашарлауы', 'Беҳолӣ, зуд хаста шудан ва бадшавии ҳолати умумӣ'],
    ['Затяжной кашель и повторяющиеся жалобы со стороны дыхания', 'Uzoq davom etuvchi yo‘tal va takroriy nafas bilan bog‘liq shikoyatlar', 'Persistent cough and recurring respiratory concerns', 'Созылмалы жөтел және тыныс алу шағымдары', 'Сулфаи давомдор ва шикоятҳои такрории нафаскашӣ'],
    ['Плановая оценка показателей давления и дневника самонаблюдения', 'Qon bosimi ko‘rsatkichlari va kuzatuv kundaligini rejali baholash', 'Routine review of blood pressure readings and home logs', 'Қысым көрсеткіштері мен бақылау күнделігін жоспарлы бағалау', 'Арзёбии нақшавии фишори хун ва рӯзномаи мушоҳида'],
    ['Наблюдение при хронических заболеваниях внутренних органов', 'Ichki a’zolarning surunkali kasalliklarida kuzatuv', 'Follow-up for chronic internal medical conditions', 'Ішкі ағзалардың созылмалы ауруларын бақылау', 'Назорат ҳангоми бемориҳои музмини узвҳои дохилӣ'],
    ['Совместимость нескольких лекарств и вопросы побочных реакций', 'Bir nechta dorining mosligi va nojo‘ya ta’sirlar bo‘yicha savollar', 'Medication interactions and possible adverse effects', 'Бірнеше дәрінің үйлесімділігі және жанама әсерлері', 'Мувофиқати чанд дору ва таъсирҳои номатлуб'],
    ['Разбор анализов и выбор следующего специалиста', 'Tahlillarni ko‘rib chiqish va keyingi mutaxassisni tanlash', 'Reviewing test results and deciding which specialist to see', 'Талдауларды түсіндіру және келесі маманды таңдау', 'Баррасии таҳлилҳо ва интихоби мутахассиси минбаъда'],
  ],
  ent: [
    ['Повторяющаяся боль в горле и дискомфорт при глотании', 'Takroriy tomoq og‘rig‘i va yutishdagi noqulaylik', 'Recurring sore throat and swallowing discomfort', 'Қайталанатын тамақ ауруы және жұтыну жайсыздығы', 'Дарди такрории гулӯ ва нороҳатӣ ҳангоми фурӯ бурдан'],
    ['Длительная заложенность носа и затруднённое носовое дыхание', 'Uzoq davom etuvchi burun bitishi va burundan nafas olish qiyinlashishi', 'Persistent nasal congestion and difficulty breathing through the nose', 'Ұзақ мұрын бітелуі және мұрынмен тыныс алудың қиындауы', 'Бандшавии давомдори бинӣ ва душвории нафаскашӣ аз бинӣ'],
    ['Повторяющийся насморк и жалобы в области пазух', 'Takroriy tumov va burun yondosh bo‘shliqlaridagi shikoyatlar', 'Recurring nasal discharge and sinus concerns', 'Қайталанатын тұмау және мұрын қуыстарының шағымдары', 'Оби бинии такрорӣ ва шикоятҳои ҷавфҳои бинӣ'],
    ['Боль, заложенность и дискомфорт в ухе', 'Quloq og‘rig‘i, bitishi va noqulaylik', 'Ear pain, blockage and discomfort', 'Құлақ ауруы, бітелуі және жайсыздығы', 'Дард, бандшавӣ ва нороҳатӣ дар гӯш'],
    ['Изменения слуха — первичная ЛОР-оценка', 'Eshitish o‘zgarishlari — dastlabki LOR baholashi', 'Changes in hearing: initial ENT assessment', 'Естудің өзгеруі — бастапқы ЛОР бағалауы', 'Тағйири шунавоӣ — арзёбии аввалияи ЛОР'],
    ['Вопросы по аденоидам и повторным воспалениям ЛОР-органов', 'Adenoidlar va LOR a’zolarining takroriy yallig‘lanishlari bo‘yicha savollar', 'Questions about adenoids and recurring ENT inflammation', 'Аденоидтар және қайталанатын ЛОР қабынулары', 'Саволҳо дар бораи аденоидҳо ва илтиҳобҳои такрории ЛОР'],
  ],
  neurology: [
    ['Частые и повторяющиеся приступы головной боли', 'Tez-tez takrorlanadigan bosh og‘rig‘i xurujlari', 'Frequent or recurring headache episodes', 'Жиі қайталанатын бас ауруы ұстамалары', 'Ҳамлаҳои зуд-зуд ва такрории дарди сар'],
    ['Длительное или повторяющееся головокружение', 'Uzoq davom etuvchi yoki takroriy bosh aylanishi', 'Persistent or recurrent dizziness', 'Ұзақ немесе қайталанатын бас айналу', 'Сарчархии давомдор ё такрорӣ'],
    ['Онемение, покалывание и изменения чувствительности', 'Uvishish, sanchish va sezuvchanlik o‘zgarishlari', 'Numbness, tingling and altered sensation', 'Ұю, шаншу және сезімталдық өзгерістері', 'Карахтӣ, сӯзанзанӣ ва тағйири ҳиссиёт'],
    ['Боль в шее и спине с неврологическими жалобами', 'Bo‘yin va bel og‘rig‘i bilan birga nevrologik shikoyatlar', 'Neck or back pain with neurological symptoms', 'Неврологиялық шағымдармен бірге мойын және арқа ауруы', 'Дарди гардану пушт бо шикоятҳои асабӣ'],
    ['Наблюдение при эпилепсии и обсуждение назначенной терапии', 'Epilepsiyada kuzatuv va buyurilgan davolashni muhokama qilish', 'Epilepsy follow-up and review of prescribed treatment', 'Эпилепсияны бақылау және тағайындалған емді талқылау', 'Назорати саръ ва баррасии табобати таъйиншуда'],
    ['Дрожание и замедленность движений при паркинсонических симптомах', 'Parkinson belgilarida titroq va harakatlar sekinlashishi', 'Tremor and movement slowing with parkinsonian symptoms', 'Паркинсон белгілеріндегі діріл және қимыл баяулауы', 'Ларзиш ва сустии ҳаракат ҳангоми нишонаҳои паркинсонӣ'],
    ['План восстановления и наблюдения после перенесённого инсульта', 'Insultdan keyingi tiklanish va kuzatuv rejasi', 'Planning recovery and follow-up after stroke', 'Инсульттен кейін қалпына келу мен бақылауды жоспарлау', 'Нақшаи барқарорсозӣ ва назорат пас аз сакта'],
  ],
  orthopedics: [
    ['Боль в колене при ходьбе, подъёме по лестнице и нагрузке', 'Yurish, zinadan chiqish va yuklamada tizza og‘rig‘i', 'Knee pain with walking, stairs or activity', 'Жүргенде, баспалдақпен көтерілгенде және жүктемеде тізе ауруы', 'Дарди зону ҳангоми роҳгардӣ, зинабароӣ ва сарборӣ'],
    ['Боль в плече и ограничение движений руки', 'Yelka og‘rig‘i va qo‘l harakati cheklanishi', 'Shoulder pain and restricted arm movement', 'Иық ауруы және қол қимылының шектелуі', 'Дарди китф ва маҳдудияти ҳаракати даст'],
    ['Боль и скованность в спине или шее', 'Bel yoki bo‘yinda og‘riq va qotish', 'Back or neck pain and stiffness', 'Арқа не мойын ауруы және сіресуі', 'Дард ва шахшавӣ дар пушт ё гардан'],
    ['Жалобы при межпозвонковой грыже и разбор МРТ', 'Umurtqalararo churradagi shikoyatlar va MRT natijalarini ko‘rib chiqish', 'Symptoms associated with disc herniation and MRI review', 'Омыртқааралық жарық шағымдары және МРТ талдауы', 'Шикоятҳо ҳангоми чурраи байнисутунмӯҳравӣ ва баррасии МРТ'],
    ['Ограничение подвижности суставов и дискомфорт при нагрузке', 'Bo‘g‘im harakati cheklanishi va yuklamadagi noqulaylik', 'Restricted joint movement and activity-related discomfort', 'Буын қозғалысының шектелуі және жүктемедегі жайсыздық', 'Маҳдудияти ҳаракати буғумҳо ва нороҳатӣ ҳангоми сарборӣ'],
    ['Плановая оценка восстановления после травм', 'Jarohatdan keyingi tiklanishni rejali baholash', 'Routine assessment of recovery after injury', 'Жарақаттан кейінгі қалпына келуді жоспарлы бағалау', 'Арзёбии нақшавии барқароршавӣ пас аз осеб'],
  ],
  oncology: [
    ['Консультация при подозрении на онкологическое заболевание', 'Onkologik kasallikka shubha bo‘lganda maslahat', 'Consultation when cancer is suspected', 'Онкологиялық ауруға күдік кезіндегі кеңес', 'Машварат ҳангоми гумон ба бемории саратон'],
    ['Разбор заключений биопсии, гистологии и обследований', 'Biopsiya, gistologiya va tekshiruv xulosalarini ko‘rib chiqish', 'Review of biopsy, histology and investigation reports', 'Биопсия, гистология және тексеру қорытындыларын талдау', 'Баррасии хулосаҳои биопсия, гистология ва ташхисҳо'],
    ['Второе мнение о диагнозе и дальнейшем маршруте', 'Tashxis va keyingi yo‘l bo‘yicha ikkinchi fikr', 'A second opinion on diagnosis and next steps', 'Диагноз бен алдағы бағыт туралы екінші пікір', 'Андешаи дуюм дар бораи ташхис ва роҳи минбаъда'],
    ['Обсуждение назначенной лекарственной терапии и её переносимости', 'Buyurilgan dori davosi va uni ko‘tara olishni muhokama qilish', 'Discussion of prescribed medical treatment and tolerability', 'Тағайындалған дәрілік емді және оны көтерімділігін талқылау', 'Баррасии табобати доруӣ ва таҳаммулпазирии он'],
    ['Вопросы наблюдения и контрольных обследований после лечения', 'Davolashdan keyingi kuzatuv va nazorat tekshiruvlari bo‘yicha savollar', 'Questions about follow-up and tests after treatment', 'Емнен кейінгі бақылау және тексерулер туралы сұрақтар', 'Саволҳои назорат ва ташхисҳои санҷишӣ баъди табобат'],
    ['Выбор профильного центра при необходимости дополнительного лечения', 'Qo‘shimcha davolash zarur bo‘lsa, ixtisoslashgan markazni tanlash', 'Referral planning when specialist-centre treatment is needed', 'Қосымша ем қажет болса, бейінді орталықты таңдау', 'Интихоби маркази махсус ҳангоми зарурати табобати иловагӣ'],
  ],
  'chinese-medicine': [
    ['Неврологические жалобы и длительные болевые симптомы', 'Nevrologik shikoyatlar va uzoq davom etuvchi og‘riq', 'Neurological concerns and persistent pain symptoms', 'Неврологиялық шағымдар және ұзақ ауырсыну', 'Шикоятҳои асабӣ ва нишонаҳои дарди давомдор'],
    ['Напряжение и дискомфорт в области шеи и спины', 'Bo‘yin va bel sohasida taranglik va noqulaylik', 'Neck and back tension or discomfort', 'Мойын мен арқаның керілуі және жайсыздығы', 'Кашиш ва нороҳатӣ дар гардану пушт'],
    ['Оценка жалоб с учётом уже выполненных обследований', 'Avvalgi tekshiruvlarni hisobga olib shikoyatlarni baholash', 'Assessment in the context of previous investigations', 'Бұрынғы тексерулерді ескере отырып шағымдарды бағалау', 'Арзёбии шикоятҳо бо назардошти ташхисҳои қаблӣ'],
    ['Обсуждение показаний и противопоказаний к иглорефлексотерапии', 'Igna bilan davolashga ko‘rsatma va qarshi ko‘rsatmalarni muhokama qilish', 'Discussion of indications and contraindications for acupuncture', 'Инемен емдеудің көрсетілімдері мен қарсы көрсетілімдері', 'Баррасии нишондодҳо ва зиддинишондодҳои сӯзантабобат'],
    ['Возможность сочетания дополнительных методов с основным лечением', 'Qo‘shimcha usullarni asosiy davolash bilan birlashtirish imkoniyati', 'Whether complementary methods fit the existing treatment plan', 'Қосымша әдістерді негізгі еммен үйлестіру мүмкіндігі', 'Имкони ҳамоҳангии усулҳои иловагӣ бо табобати асосӣ'],
    ['Выбор дальнейшего обследования и профильного специалиста', 'Keyingi tekshiruv va tegishli mutaxassisni tanlash', 'Planning further assessment and specialist referral', 'Әрі қарайғы тексеру мен бейінді маманды таңдау', 'Интихоби ташхиси минбаъда ва мутахассиси мувофиқ'],
  ],
  dermatology: [
    ['Акне, комедоны и повторяющиеся воспалительные высыпания', 'Akne, komedonlar va takroriy yallig‘langan toshmalar', 'Acne, comedones and recurring inflammatory breakouts', 'Акне, комедондар және қайталанатын қабыну бөртпелері', 'Акне, комедонҳо ва доначаҳои илтиҳобии такрорӣ'],
    ['Покраснение лица и жалобы при розацеа', 'Yuz qizarishi va rozatseadagi shikoyatlar', 'Facial redness and rosacea-related concerns', 'Беттің қызаруы және розацеа шағымдары', 'Сурхшавии рӯй ва шикоятҳо ҳангоми розатсеа'],
    ['Зуд, сухость, шелушение и раздражение кожи', 'Terining qichishishi, qurishi, po‘st tashlashi va ta’sirlanishi', 'Itching, dryness, scaling and skin irritation', 'Терінің қышуы, құрғауы, қабыршақтануы және тітіркенуі', 'Хориш, хушкӣ, пулакчашавӣ ва озурдагии пӯст'],
    ['Выпадение и заметное поредение волос', 'Soch to‘kilishi va sezilarli siyraklashishi', 'Hair loss and noticeable thinning', 'Шаш түсуі және айқын сиреуі', 'Рехтан ва тунукшавии назарраси мӯй'],
    ['Зуд, шелушение и дискомфорт кожи головы', 'Bosh terisining qichishishi, po‘st tashlashi va noqulayligi', 'Scalp itching, scaling and discomfort', 'Бас терісінің қышуы, қабыршақтануы және жайсыздығы', 'Хориш, пулакчашавӣ ва нороҳатии пӯсти сар'],
    ['Изменения пигментации и светлые участки кожи — осмотр', 'Pigmentatsiya o‘zgarishi va teridagi oqish joylar — ko‘rik', 'Assessment of pigmentation changes and pale skin patches', 'Пигментация өзгерістері мен ақшыл дақтарды тексеру', 'Муоинаи тағйири ранги пӯст ва доғҳои равшан'],
    ['Пятна и изменения рельефа кожи после акне', 'Aknedan keyingi dog‘lar va teri yuzasi o‘zgarishlari', 'Post-acne marks and changes in skin texture', 'Акнеден кейінгі дақтар мен тері бедерінің өзгерістері', 'Доғҳо ва тағйири сатҳи пӯст пас аз акне'],
    ['Подбор ухода и обсуждение переносимости назначенного лечения', 'Parvarishni tanlash va buyurilgan davolashni ko‘tara olishni muhokama qilish', 'Skin-care planning and review of treatment tolerability', 'Күтім таңдау және тағайындалған емнің көтерімділігін талқылау', 'Интихоби нигоҳубин ва баррасии таҳаммули табобат'],
  ],
  ultrasound: [
    ['УЗИ внутренних органов по направлению врача', 'Shifokor yo‘llanmasi bilan ichki a’zolar UTTsi', 'Ultrasound of internal organs on clinical referral', 'Дәрігер жолдамасымен ішкі ағзалардың УДЗ-сы', 'УЗИ-и узвҳои дохилӣ бо роҳхати табиб'],
    ['Гинекологические ультразвуковые исследования по показаниям', 'Ko‘rsatma bo‘yicha ginekologik ultratovush tekshiruvlari', 'Gynaecological ultrasound when indicated', 'Көрсетілім бойынша гинекологиялық УДЗ', 'УЗИ-и гинекологӣ аз рӯи нишондод'],
    ['Урологические ультразвуковые исследования по показаниям', 'Ko‘rsatma bo‘yicha urologik ultratovush tekshiruvlari', 'Urological ultrasound when indicated', 'Көрсетілім бойынша урологиялық УДЗ', 'УЗИ-и урологӣ аз рӯи нишондод'],
    ['Ультразвуковое исследование сосудов по направлению', 'Yo‘llanma asosida qon tomirlar ultratovush tekshiruvi', 'Vascular ultrasound on referral', 'Жолдамамен қан тамырларының УДЗ-сы', 'УЗИ-и рагҳо бо роҳхат'],
    ['Подготовка к назначенному УЗИ и вопросы проведения исследования', 'Buyurilgan UTTga tayyorgarlik va tekshiruv bo‘yicha savollar', 'Preparation for a scheduled scan and questions about the examination', 'Тағайындалған УДЗ-ға дайындық және тексеру сұрақтары', 'Омодагӣ ба УЗИ-и таъйиншуда ва саволҳои муоина'],
    ['Разъяснение заключения и сравнение с предыдущим исследованием', 'Xulosani tushuntirish va avvalgi tekshiruv bilan solishtirish', 'Explaining the report and comparing with a previous scan', 'Қорытындыны түсіндіру және алдыңғы зерттеумен салыстыру', 'Шарҳи хулоса ва муқоиса бо ташхиси пешина'],
  ],
  gynecology: [
    ['Нерегулярный цикл и изменения характера менструаций', 'Siklning nomuntazamligi va hayz xususiyatlari o‘zgarishi', 'Irregular cycles and changes in menstrual patterns', 'Циклдің тұрақсыздығы және етеккір өзгерістері', 'Номуназзамии давра ва тағйири ҳайз'],
    ['Повторяющиеся боли и дискомфорт внизу живота', 'Qorin pastida takroriy og‘riq va noqulaylik', 'Recurrent lower abdominal pain and pelvic discomfort', 'Іштің төменгі бөлігінің қайталанатын ауруы мен жайсыздығы', 'Дарди такрорӣ ва нороҳатӣ дар поёни шикам'],
    ['Планирование беременности и подготовка к зачатию', 'Homiladorlikni rejalashtirish va unga tayyorgarlik', 'Pregnancy planning and preconception advice', 'Жүктілікті жоспарлау және ұрықтануға дайындық', 'Банақшагирии ҳомиладорӣ ва омодагӣ ба бордоршавӣ'],
    ['Вопросы репродуктивного здоровья и трудности с зачатием', 'Reproduktiv salomatlik va homilador bo‘lishdagi qiyinchiliklar', 'Reproductive health concerns and difficulty conceiving', 'Репродуктивті денсаулық және бала көтеру қиындығы', 'Масъалаҳои солимии репродуктивӣ ва душвории бордоршавӣ'],
    ['Выбор контрацепции с учётом состояния здоровья', 'Sog‘liq holatini hisobga olib kontratsepsiya tanlash', 'Contraceptive counselling based on individual health', 'Денсаулық жағдайына сай контрацепция таңдау', 'Интихоби пешгирии ҳомиладорӣ бо назардошти саломатӣ'],
    ['Разбор результатов гинекологических обследований и дальнейший план', 'Ginekologik tekshiruv natijalari va keyingi rejani muhokama qilish', 'Review of gynaecological test results and next steps', 'Гинекологиялық тексерулерді талдау және алдағы жоспар', 'Баррасии ташхисҳои гинекологӣ ва нақшаи минбаъда'],
  ],
}

const services: Record<string, string> = {
  'xursand-yusupboyevich': 'gastroenterology',
  'asiljon-abdullaev': 'therapy',
  'asilbek-sharofov': 'ent',
  'fayzullo-narzullayevich': 'neurology',
  'zafar-abdirazzakov': 'orthopedics',
  'dilshod-abdusammatovich': 'oncology',
  'ruslan-alisherovich': 'oncology',
  'li-li': 'chinese-medicine',
  'vohid-latipov': 'dermatology',
  'shakhlo-talipova': 'ultrasound',
  'makhina-khidirova': 'gynecology',
}

export function expandedDoctorFocus(slug: string, locale: SiteLocale) {
  const service = Object.hasOwn(services, slug) ? services[slug] : undefined
  return service ? focus[service].map((label) => translate(locale, label)) : []
}
