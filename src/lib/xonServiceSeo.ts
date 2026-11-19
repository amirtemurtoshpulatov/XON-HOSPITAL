import type { SiteLocale } from '@/components/XonHome/content'
import { translate } from '@/lib/xonCopy'

type Localized = Parameters<typeof translate>[1]

const titles: Record<string, Localized> = {
  neurology: ['Невролог в Ташкенте', 'Toshkentda nevrolog', 'Neurologist in Tashkent', 'Ташкенттегі невролог', 'Асабшинос дар Тошканд'],
  orthopedics: ['Ортопед и вертебролог в Ташкенте', 'Toshkentda ortoped va vertebrolog', 'Orthopaedic and spine consultation in Tashkent', 'Ташкенттегі ортопед және вертебролог', 'Ортопед ва вертебролог дар Тошканд'],
  gastroenterology: ['Гастроэнтеролог в Ташкенте', 'Toshkentda gastroenterolog', 'Gastroenterologist in Tashkent', 'Ташкенттегі гастроэнтеролог', 'Гастроэнтеролог дар Тошканд'],
  dermatology: ['Дерматолог и трихолог в Ташкенте', 'Toshkentda dermatolog va trixolog', 'Dermatology and hair consultation in Tashkent', 'Ташкенттегі дерматолог және трихолог', 'Табиби пӯст ва мӯй дар Тошканд'],
  'check-up': ['Чекап в Ташкенте — обследование здоровья', 'Toshkentda chek-ap — salomatlik tekshiruvi', 'Health check-up in Tashkent', 'Ташкентте денсаулықты кешенді тексеру', 'Муоинаи ҳамаҷонибаи саломатӣ дар Тошканд'],
  rehabilitation: ['Медицинская реабилитация в Ташкенте', 'Toshkentda tibbiy reabilitatsiya', 'Medical rehabilitation in Tashkent', 'Ташкенттегі медициналық оңалту', 'Барқарорсозии тиббӣ дар Тошканд'],
  oncology: ['Консультация онколога в Ташкенте', 'Toshkentda onkolog maslahati', 'Oncology consultation in Tashkent', 'Ташкентте онколог кеңесі', 'Машварати саратоншинос дар Тошканд'],
  ultrasound: ['УЗИ в Ташкенте — ультразвуковая диагностика', 'Toshkentda UTT — ultratovush diagnostikasi', 'Ultrasound in Tashkent', 'Ташкенттегі ультрадыбыстық диагностика', 'Ташхиси ултрасадоӣ дар Тошканд'],
  gynecology: ['Гинеколог и репродуктолог в Ташкенте', 'Toshkentda ginekolog va reproduktolog', 'Gynaecology and fertility consultation in Tashkent', 'Ташкенттегі гинеколог және репродуктолог', 'Гинеколог ва репродуктолог дар Тошканд'],
  ent: ['ЛОР в Ташкенте — дежурный приём 24/7', 'Toshkentda LOR — navbatchi qabul 24/7', 'ENT in Tashkent — on-duty care 24/7', 'Ташкенттегі ЛОР — кезекші қабылдау 24/7', 'ЛОР дар Тошканд — қабули навбатдор 24/7'],
  therapy: ['Терапевт в Ташкенте — дежурный приём 24/7', 'Toshkentda terapevt — navbatchi qabul 24/7', 'Internist in Tashkent — on-duty care 24/7', 'Ташкенттегі терапевт — кезекші қабылдау 24/7', 'Терапевт дар Тошканд — қабули навбатдор 24/7'],
  'chinese-medicine': ['Иглорефлексотерапия в Ташкенте — консультация', 'Toshkentda igna bilan davolash bo‘yicha maslahat', 'Acupuncture consultation in Tashkent', 'Ташкентте инемен емдеу туралы кеңес', 'Машварат оид ба сӯзантабобат дар Тошканд'],
  inpatient: ['Стационарное лечение в Ташкенте', 'Toshkentda statsionar davolash', 'Inpatient care in Tashkent', 'Ташкенттегі стационарлық ем', 'Табобати бистарӣ дар Тошканд'],
  laboratory: ['Лабораторные анализы в Ташкенте', 'Toshkentda laboratoriya tahlillari', 'Laboratory tests in Tashkent', 'Ташкенттегі зертханалық талдаулар', 'Таҳлилҳои озмоишгоҳӣ дар Тошканд'],
  'salt-room': ['Солевая комната в Ташкенте', 'Toshkentda tuz xonasi', 'Salt room in Tashkent', 'Ташкенттегі тұз бөлмесі', 'Ҳуҷраи намак дар Тошканд'],
}

export function serviceSearchCopy(locale: SiteLocale, slug: string, title: string, summary?: string | null) {
  const searchTitle = Object.hasOwn(titles, slug) ? translate(locale, titles[slug]) : title
  const booking = translate(locale, [
    'XON Hospital, Ташкент. Запись на приём онлайн.',
    'XON Hospital, Toshkent. Qabulga onlayn yozilish.',
    'XON Hospital, Tashkent. Request an appointment online.',
    'XON Hospital, Ташкент. Қабылдауға онлайн жазылу.',
    'XON Hospital, Тошканд. Дархост барои қабул онлайн.',
  ])
  return { title: searchTitle, description: [summary?.trim(), booking].filter(Boolean).join(' ') }
}
