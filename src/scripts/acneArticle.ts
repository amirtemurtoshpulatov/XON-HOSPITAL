// Original patient information, informed by the references below; not a rewrite of a clinic's article.
export const acneArticle = {
  slug: 'acne-causes-care-treatment',
  service: 'dermatology',
  sources: [
    { label: 'NIAMS · Acne: overview, symptoms and causes', url: 'https://www.niams.nih.gov/health-topics/acne' },
    { label: 'NIAMS · Diagnosis, treatment and steps to take', url: 'https://www.niams.nih.gov/health-topics/acne/diagnosis-treatment-and-steps-to-take' },
    { label: 'NHS · Acne', url: 'https://www.nhs.uk/conditions/acne/' },
    { label: 'NHS · Causes of acne', url: 'https://www.nhs.uk/conditions/acne/causes/' },
    { label: 'NHS · Acne treatment', url: 'https://www.nhs.uk/conditions/acne/treatment/' },
    { label: 'American Academy of Dermatology · Updated acne guidelines, 2024', url: 'https://www.aad.org/news/updated-guidelines-acne-management' },
    { label: 'American Academy of Dermatology · Skin care tips', url: 'https://www.aad.org/public/diseases/acne/skin-care/tips' },
    { label: 'American Academy of Dermatology · Diet and acne', url: 'https://www.aad.org/public/diseases/acne/causes/diet' },
  ],
  locales: {
    ru: {
      title: 'Акне: почему появляются прыщи и как с ними справиться',
      description: 'Понятный разбор акне: причины высыпаний, ежедневный уход, возможности лечения, пятна и рубцы. Когда стоит обратиться к дерматологу.',
      sections: [
        {
          heading: 'Что такое акне и почему умывания бывает недостаточно',
          paragraphs: [
            'Акне — заболевание кожи, при котором появляются комедоны, воспалённые прыщи или более глубокие болезненные узлы. Высыпания бывают на лице, спине, груди и плечах. Они встречаются у подростков и взрослых. Акне можно лечить: ждать, пока оно обязательно пройдёт само, особенно при боли или рубцах, не стоит.',
            'Проблема начинается внутри волосяного фолликула — небольшого канала в коже. Кожное сало смешивается с отмершими клетками и затрудняет его выход. В закупоренном фолликуле меняется среда, а воспалительная реакция усиливается. Поэтому попытка просто «отмыть лицо до скрипа» не устраняет причину.',
          ],
        },
        {
          heading: 'Какими бывают высыпания',
          paragraphs: [
            'Чёрные и белые точки называют комедонами. Чёрный цвет открытого комедона связан с изменением содержимого на воздухе, а не с грязью. Небольшие воспалённые бугорки — папулы; если заметна гнойная верхушка, это пустулы. Глубокие болезненные образования могут быть узлами.',
            'На одном участке кожи нередко встречаются разные элементы. Количество прыщей — лишь часть оценки: врачу также важны их глубина, боль, рубцы и влияние болезни на жизнь. Похожие высыпания бывают и при других состояниях, поэтому фотография из интернета не заменяет осмотр.',
          ],
        },
        {
          heading: 'Что влияет на появление акне',
          paragraphs: [
            'Роль играют наследственность и чувствительность сальных желёз к гормональным изменениям. Поэтому высыпания часто начинаются в период полового созревания, а у части людей сохраняются позже. Некоторые лекарства и средства, закупоривающие поры, тоже могут ухудшать состояние.',
            'Акне само по себе не доказывает «гормональный сбой». Если высыпания появились на фоне нового лекарства, расскажите об этом врачу, но не отменяйте назначение самостоятельно. При нерегулярных менструациях или других изменениях здоровья сообщите о них на приёме: это поможет решить, нужно ли дополнительное обследование.',
          ],
        },
        {
          heading: 'Какой ежедневный уход действительно нужен',
          paragraphs: [
            'Начните с мягкого очищения без интенсивного трения. Обычно достаточно умываться до двух раз в день и после сильного потоотделения. Скрабы, жёсткие щётки и спиртовые средства могут раздражать кожу. Сильное жжение после ухода не означает, что средство лечит лучше.',
            'Подбирайте увлажняющий крем и косметику с пометкой «некомедогенно». На открытых участках кожи используйте солнцезащитное средство широкого спектра SPF 30 или выше. При склонности к раздражению обсуждайте новые активные средства с дерматологом, особенно если лечение уже назначено.',
          ],
        },
        {
          heading: 'Нужно ли сдавать анализы перед лечением',
          paragraphs: [
            'На приёме врач осматривает кожу и спрашивает, когда начались высыпания, какие средства уже применялись и какие лекарства вы принимаете. Могут иметь значение семейная история, изменения менструального цикла и сопутствующие симптомы. Анализы назначают, если нужно уточнить возможную причину или безопасно выбрать лечение.',
            'Не покупайте заранее большой набор исследований «от прыщей». Сначала полезнее подготовить список средств и препаратов, вспомнить длительность их применения и объяснить, что изменилось. Это помогает отличить отсутствие эффекта от ситуации, когда лечение было слишком коротким или плохо переносилось.',
          ],
        },
        {
          heading: 'Какие методы лечения используют',
          paragraphs: [
            'В современных рекомендациях есть наружные ретиноиды, бензоилпероксид и другие средства; при необходимости применяют комбинированное лечение. Выбор зависит от характера высыпаний и особенностей человека. Препарат, помогший знакомому, может не подходить вам из-за раздражения, противопоказаний или другого диагноза.',
            'При более выраженном акне врач может назначить таблетки. Антибиотики используют ограниченно и в подходящих сочетаниях, чтобы уменьшать риск устойчивости бактерий. Изотретиноин применяют при определённых тяжёлых или устойчивых формах под наблюдением специалиста. Это обзор подходов, а не схема для самостоятельного назначения.',
          ],
        },
        {
          heading: 'Когда ждать результата и что делать при раздражении',
          paragraphs: [
            'Лечение акне требует времени: заметное улучшение часто оценивают через несколько недель, иногда через два-три месяца. Менять средство каждые несколько дней — плохой способ проверить его действие. Лучше заранее уточнить срок контрольного визита и признаки, по которым врач будет оценивать результат.',
            'Сухость и раздражение возможны у наружных препаратов. Если кожа сильно болит, отекает или реакция выраженная, свяжитесь с врачом, не пытаясь «перетерпеть любой ценой». При беременности, её планировании или грудном вскармливании выбор средств нужно обсудить отдельно: ретиноиды при беременности не применяют.',
          ],
        },
        {
          heading: 'Поможет ли отказ от сладкого и молока',
          paragraphs: [
            'Исследования изучают связь акне с пищей с высокой гликемической нагрузкой и молоком. Результаты неоднородны: связь в исследовании не означает, что конкретный продукт вызывает прыщи у каждого человека. Универсального списка продуктов, отказ от которых гарантированно вылечит акне, нет.',
            'Если вы замечаете повторяющуюся связь с едой, запишите наблюдения и обсудите их с врачом. Не стоит резко исключать большие группы продуктов, особенно подросткам. Сбалансированное питание полезно для здоровья, но оно не заменяет уход и лечение, когда они нужны.',
          ],
        },
        {
          heading: 'Почему нельзя выдавливать прыщи и «лечить» их загаром',
          paragraphs: [
            'Выдавливание повреждает кожу и повышает вероятность стойких пятен и рубцов. Домашние агрессивные пилинги тоже способны ухудшить состояние. Если хочется постоянно трогать высыпания, скажите врачу: это важная часть реальной проблемы, а не повод для упрёков.',
            'Загар не является лечением акне. Ультрафиолет повреждает кожу, а некоторые препараты повышают её чувствительность к солнцу. Косметические процедуры и аппаратные методы обсуждают отдельно; обещание «одной процедуры навсегда» не отражает обычный путь лечения хронических высыпаний.',
          ],
        },
        {
          heading: 'Пятна после прыщей и рубцы — это одно и то же?',
          paragraphs: [
            'После воспаления может остаться изменение цвета кожи. Рубец меняет её рельеф: появляются углубления или приподнятые участки. Для этих состояний требуются разные подходы. Не все следы можно убрать кремом, и ни один метод не гарантирует одинаковый результат всем.',
            'Профилактика новых рубцов начинается с контроля активного акне. Если следы уже появились, врач оценит их тип и обсудит дальнейшие возможности. План процедур важно согласовывать с текущим лечением, чувствительностью кожи и ожиданиями пациента.',
          ],
        },
        {
          heading: 'Когда обращаться к дерматологу',
          paragraphs: [
            'Запишитесь на консультацию, если есть глубокие болезненные узлы, появляются рубцы, высыпаний много или предыдущие средства не помогли. Не нужно ждать тяжёлой формы, если состояние кожи мешает общению, работе или вызывает тревогу. Влияние на самочувствие — достаточная причина обсудить помощь.',
            'Перед визитом подготовьте названия использованных средств, сроки лечения и фотографии изменений, если они есть. Спросите, как сочетать назначение с уходом, когда оценивать эффект и что делать при побочных реакциях. В XON Hospital можно обратиться к дерматологу и обсудить индивидуальный план.',
          ],
        },
      ],
    },
    uz: {
      title: 'Akne: husnbuzar nima uchun chiqadi va uni qanday davolash mumkin',
      description: 'Husnbuzar sabablari, kundalik parvarish, davolash usullari, dog‘ va chandiqlar haqida sodda qo‘llanma. Dermatologga qachon murojaat qilish kerak?',
      sections: [
        { heading: 'Akne nima va nega faqat yuvinish yetarli emas?', paragraphs: [
          'Akne — qora yoki oq nuqtalar, yallig‘langan husnbuzarlar va ba’zan chuqur og‘riqli tugunlar bilan kechadigan teri kasalligi. U yuz, orqa, ko‘krak va yelkada uchraydi. Faqat o‘smirlarda emas, kattalarda ham bo‘lishi mumkin. Og‘riq yoki chandiq paydo bo‘lsa, o‘zi o‘tib ketishini kutmasdan shifokorga murojaat qiling.',
          'Tuk follikuli ichida teri yog‘i va o‘lik hujayralar to‘planib, yo‘lni berkitishi mumkin. Bu muhitda yallig‘lanish rivojlanadi. Yuzni juda qattiq ishqalab yuvish muammoning ichki sababini yo‘qotmaydi va terini yanada ta’sirlantirishi mumkin.',
        ] },
        { heading: 'Toshmalar bir-biridan qanday farq qiladi?', paragraphs: [
          'Qora va oq nuqtalar komedonlar deyiladi. Qora nuqtaning rangi kir tufayli emas, uning tarkibi havo bilan ta’sirlashgani uchun o‘zgaradi. Mayda yallig‘langan bo‘rtmalar papula, yiringli uchi borlari pustula deb ataladi. Chuqur va og‘riqli hosilalar tugun bo‘lishi mumkin.',
          'Bir odamda bir necha turdagi toshma uchraydi. Shifokor faqat ularning sonini emas, chuqurligi, og‘riq, chandiq va kundalik hayotga ta’sirini ham baholaydi. Internetdagi suratga qarab o‘ziga tashxis qo‘yish qiyin: boshqa teri holatlari ham o‘xshash ko‘rinishi mumkin.',
        ] },
        { heading: 'Husnbuzarga nimalar ta’sir qiladi?', paragraphs: [
          'Irsiyat va yog‘ bezlarining gormonal o‘zgarishlarga sezgirligi muhim. Shu sababli akne ko‘pincha balog‘at davrida boshlanadi, ayrim odamlarda esa kattalikda ham saqlanadi. Ba’zi dorilar va teshikchalarni berkitadigan kosmetika holatni og‘irlashtirishi mumkin.',
          'Husnbuzarning o‘zi albatta gormonal kasallik borligini anglatmaydi. Yangi dori boshlagandan keyin toshma chiqqan bo‘lsa, shifokorga ayting, lekin dorini o‘zboshimchalik bilan to‘xtatmang. Hayz siklidagi o‘zgarishlar va boshqa alomatlarni ham qabulda muhokama qiling.',
        ] },
        { heading: 'Kundalik parvarishni qanday tashkil qilish kerak?', paragraphs: [
          'Yumshoq tozalovchi vositadan foydalaning. Odatda yuzni kuniga ikki martagacha va ko‘p terlagandan so‘ng yuvish yetarli. Qattiq skrab, cho‘tka va spirtli vositalar terini ta’sirlantirishi mumkin. Achishish kuchliroq bo‘lsa, bu vosita yaxshiroq davolayapti degani emas.',
          'Namlagich va kosmetikada «non-comedogenic» yozuvini qidiring. Ochiq teri uchun keng spektrli SPF 30 yoki undan yuqori quyoshdan himoya vositasini tanlang. Davolash olayotgan bo‘lsangiz, yangi faol vositalarni qanday qo‘shishni dermatolog bilan kelishib oling.',
        ] },
        { heading: 'Hamma odamga tahlil topshirish kerakmi?', paragraphs: [
          'Shifokor terini ko‘radi, toshmalar qachon boshlanganini, qanday vositalar ishlatilganini va qaysi dorilar qabul qilinayotganini so‘raydi. Oilaviy tarix, hayz sikli va qo‘shimcha belgilar ham ahamiyatli bo‘lishi mumkin. Tahlillar sababni aniqlashtirish yoki davolash xavfsizligini baholash zarur bo‘lsa buyuriladi.',
          'Qabuldan oldin katta «husnbuzar tahlillari» to‘plamini sotib olish shart emas. Ishlatgan vositalaringiz nomi, ularni qancha vaqt qo‘llaganingiz va qanday o‘zgarish bo‘lganini yozib boring. Bu shifokorga keyingi qadamni tanlashda yordam beradi.',
        ] },
        { heading: 'Davolashda qanday usullar qo‘llanadi?', paragraphs: [
          'Zamonaviy tavsiyalarda tashqi retinoidlar, benzoilperoksid va boshqa vositalar bor. Ba’zan ularni birga qo‘llash kerak bo‘ladi. Tanlov toshma turi, terining sezgirligi va odamning sog‘lig‘iga bog‘liq. Tanishingizga yordam bergan dori sizga mos kelmasligi mumkin.',
          'Og‘irroq akneda shifokor ichiladigan dori buyurishi mumkin. Antibiotiklar bakteriyalarning chidamliligi xavfini kamaytiradigan tartibda, cheklangan muddat qo‘llanadi. Izotretinoin ayrim og‘ir yoki boshqa davoga javob bermagan holatlarda mutaxassis nazorati bilan qo‘llanadi. Bu ma’lumot mustaqil davolanish sxemasi emas.',
        ] },
        { heading: 'Natijani qachon kutish mumkin?', paragraphs: [
          'Natija darhol bilinmaydi. O‘zgarishni ko‘rish uchun bir necha hafta, ba’zan ikki-uch oy kerak bo‘ladi. Vositalarni har bir necha kunda almashtirish ularning foydasini baholashni qiyinlashtiradi. Nazorat qabulining muddatini va qaysi o‘zgarishlarni kuzatishni oldindan so‘rang.',
          'Ba’zi tashqi dorilar quruqlik yoki achishish chaqirishi mumkin. Kuchli og‘riq, shish yoki jiddiy reaksiya bo‘lsa, shifokor bilan bog‘laning. Homiladorlik, uni rejalashtirish yoki emizish davrida davolash alohida tanlanadi: homiladorlikda retinoidlar qo‘llanmaydi.',
        ] },
        { heading: 'Shirinlik yoki sutdan voz kechish yordam beradimi?', paragraphs: [
          'Olimlar yuqori glikemik yuklamali ovqatlar va sut bilan akne orasidagi bog‘liqlikni o‘rganmoqda. Natijalar bir xil emas. Tadqiqotdagi bog‘liqlik bir mahsulot har bir odamda husnbuzar keltirib chiqarishini isbotlamaydi. Hammaga mos, akneni albatta yo‘qotadigan parhez yo‘q.',
          'Ovqat bilan takroriy bog‘liqlik sezsangiz, kuzatuvlaringizni yozib, shifokor bilan muhokama qiling. Ayniqsa o‘smirlar katta oziq-ovqat guruhlarini keskin cheklamasligi kerak. Muvozanatli ovqatlanish foydali, ammo zarur parvarish va davolash o‘rnini bosmaydi.',
        ] },
        { heading: 'Siqish va quyoshda toblanish nega yaxshi yechim emas?', paragraphs: [
          'Husnbuzarni siqish terini shikastlaydi va uzoq saqlanadigan dog‘ yoki chandiq xavfini oshiradi. Kuchli uy pilinglari ham holatni yomonlashtirishi mumkin. Toshmalarga qo‘l tekkizish odatini nazorat qilish qiyin bo‘lsa, bu haqda shifokorga ayting.',
          'Quyoshda toblanish akneni davolamaydi. Ultrabinafsha nurlar terini shikastlaydi, ayrim dorilar esa quyoshga sezgirlikni oshiradi. Kosmetik va apparat muolajalari alohida muhokama qilinadi. Bitta muolaja bilan muammoni butunlay hal qilish va’dasiga ehtiyotkor qarang.',
        ] },
        { heading: 'Dog‘ va chandiq bir xilmi?', paragraphs: [
          'Yallig‘lanishdan keyin terining rangi o‘zgarib qolishi mumkin. Chandiqda esa uning yuzasi o‘zgaradi: chuqurcha yoki bo‘rtma paydo bo‘ladi. Ular turlicha yondashuvni talab qiladi. Barcha izlarni bitta krem bilan yo‘qotish mumkin emas.',
          'Yangi chandiqlarning oldini olish faol akneni nazorat qilishdan boshlanadi. Izlar paydo bo‘lgan bo‘lsa, dermatolog ularning turini baholab, keyingi usullarni tushuntiradi. Muolajalar joriy davolash va terining holati bilan muvofiqlashtirilishi kerak.',
        ] },
        { heading: 'Dermatologga qachon borish kerak?', paragraphs: [
          'Chuqur og‘riqli tugunlar, chandiqlar, ko‘p toshma bo‘lsa yoki oldingi vositalar foyda bermasa, maslahatga yoziling. Teri holati muloqotga, ishga yoki ruhiy holatga ta’sir qilsa, og‘ir bosqichni kutish shart emas.',
          'Qabulga ishlatgan vositalaringiz ro‘yxati, davolash muddati va mavjud bo‘lsa o‘zgarishlarning suratlarini olib boring. Davolashni parvarish bilan qanday birlashtirish, natijani qachon baholash va nojo‘ya ta’sirda nima qilishni so‘rang. XON Hospital dermatologi bilan individual reja tuzishni muhokama qilishingiz mumkin.',
        ] },
      ],
    },
  },
}
