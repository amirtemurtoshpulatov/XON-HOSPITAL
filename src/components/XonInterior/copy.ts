import type { SiteLocale } from '@/components/XonHome/content'

type InteriorCopy = {
  services: { eyebrow: string; title: string; intro: string }
  doctors: { eyebrow: string; title: string; intro: string }
  about: { eyebrow: string; title: string; intro: string }
  prices: { eyebrow: string; title: string; intro: string; empty: string }
  contacts: { eyebrow: string; title: string; intro: string }
}

const ru: InteriorCopy = {
  services: { eyebrow: 'Медицина как система', title: 'Направления', intro: 'От первичной консультации до восстановления — специалисты и службы клиники работают как единая команда.' },
  doctors: { eyebrow: 'Команда XON', title: 'Врачи', intro: 'Специалисты, которые слышат пациента, объясняют решения и при необходимости объединяют экспертизу.' },
  about: { eyebrow: 'XON HOSPITAL', title: 'О клинике', intro: 'Мы строим понятный медицинский маршрут вокруг человека, а не вокруг отдельных кабинетов и процедур.' },
  prices: { eyebrow: 'Прозрачность', title: 'Цены', intro: 'Перед началом лечения врач объясняет приоритеты, варианты и ожидаемые расходы.', empty: 'Прайс-лист заполняется. Уточнить стоимость можно у администратора.' },
  contacts: { eyebrow: 'Мы на связи', title: 'Контакты', intro: 'Оставьте заявку или свяжитесь с администратором — поможем выбрать нужного специалиста.' },
}

export const interiorCopy: Record<SiteLocale, InteriorCopy> = {
  ru,
  uz: {
    services: { eyebrow: 'Tibbiyot yagona tizim sifatida', title: 'Yo‘nalishlar', intro: 'Dastlabki konsultatsiyadan tiklanishgacha klinika mutaxassislari yagona jamoa bo‘lib ishlaydi.' },
    doctors: { eyebrow: 'XON jamoasi', title: 'Shifokorlar', intro: 'Bemorni tinglaydigan, qarorlarni tushuntiradigan va zarur bo‘lsa tajribani birlashtiradigan mutaxassislar.' },
    about: { eyebrow: 'XON HOSPITAL', title: 'Klinika haqida', intro: 'Biz tibbiy yo‘lni alohida muolajalar atrofida emas, inson atrofida quramiz.' },
    prices: { eyebrow: 'Shaffoflik', title: 'Narxlar', intro: 'Davolashdan oldin shifokor ustuvor vazifalar, variantlar va xarajatlarni tushuntiradi.', empty: 'Narxlar ro‘yxati to‘ldirilmoqda. Administrator bilan aniqlashtiring.' },
    contacts: { eyebrow: 'Aloqadamiz', title: 'Kontaktlar', intro: 'Ariza qoldiring — administrator kerakli mutaxassisni tanlashga yordam beradi.' },
  },
  en: {
    services: { eyebrow: 'Healthcare as one system', title: 'Specialties', intro: 'From the first consultation to recovery, our specialists work as one coordinated team.' },
    doctors: { eyebrow: 'The XON team', title: 'Doctors', intro: 'Specialists who listen, explain decisions and combine expertise when a case requires it.' },
    about: { eyebrow: 'XON HOSPITAL', title: 'About us', intro: 'We build a clear medical journey around the person, not around isolated rooms and procedures.' },
    prices: { eyebrow: 'Transparency', title: 'Prices', intro: 'Before treatment, the doctor explains priorities, options and expected costs.', empty: 'The price list is being prepared. Please ask our coordinator.' },
    contacts: { eyebrow: 'Get in touch', title: 'Contacts', intro: 'Leave a request and our coordinator will help you choose the right specialist.' },
  },
  kk: {
    services: { eyebrow: 'Медицина бір жүйе ретінде', title: 'Бағыттар', intro: 'Алғашқы кеңестен қалпына келуге дейін мамандар бір команда болып жұмыс істейді.' },
    doctors: { eyebrow: 'XON командасы', title: 'Дәрігерлер', intro: 'Пациентті тыңдап, шешімдерді түсіндіретін және тәжірибені біріктіретін мамандар.' },
    about: { eyebrow: 'XON HOSPITAL', title: 'Клиника туралы', intro: 'Біз медициналық жолды жеке процедуралар емес, адам айналасында құрамыз.' },
    prices: { eyebrow: 'Ашықтық', title: 'Бағалар', intro: 'Ем басталғанға дейін дәрігер басымдықтар мен шығындарды түсіндіреді.', empty: 'Бағалар тізімі толтырылуда. Әкімшімен нақтылаңыз.' },
    contacts: { eyebrow: 'Байланыстамыз', title: 'Байланыс', intro: 'Өтінім қалдырыңыз — әкімші маманды таңдауға көмектеседі.' },
  },
  tg: {
    services: { eyebrow: 'Тиб ҳамчун як низом', title: 'Самтҳо', intro: 'Аз машварати аввал то барқарорсозӣ мутахассисон ҳамчун як даста кор мекунанд.' },
    doctors: { eyebrow: 'Дастаи XON', title: 'Табибон', intro: 'Мутахассисоне, ки беморро мешунаванд, қарорҳоро мефаҳмонанд ва таҷрибаро муттаҳид мекунанд.' },
    about: { eyebrow: 'XON HOSPITAL', title: 'Дар бораи клиника', intro: 'Мо роҳи тиббиро дар атрофи инсон месозем, на расмиёти ҷудогона.' },
    prices: { eyebrow: 'Шаффофият', title: 'Нархҳо', intro: 'Пеш аз табобат табиб афзалиятҳо, вариантҳо ва хароҷотро мефаҳмонад.', empty: 'Рӯйхати нархҳо омода мешавад. Аз администратор пурсед.' },
    contacts: { eyebrow: 'Дар тамос', title: 'Тамос', intro: 'Дархост гузоред — администратор барои интихоби мутахассис кумак мекунад.' },
  },
}
