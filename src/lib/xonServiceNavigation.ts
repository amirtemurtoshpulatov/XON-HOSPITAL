import type { SiteLocale } from '@/components/XonHome/content'
import { translate } from './xonCopy'
import { isServiceAvailable, serviceCopy } from './xonServices'

const groups = [
  {
    key: 'consultations',
    title: ['Консультации врачей', 'Shifokor maslahatlari', 'Doctor consultations', 'Дәрігер кеңестері', 'Машварати духтурон'],
    slugs: ['neurology', 'orthopedics', 'gastroenterology', 'dermatology', 'oncology', 'gynecology', 'ent', 'therapy'],
  },
  {
    key: 'diagnostics',
    title: ['Диагностика', 'Diagnostika', 'Diagnostics', 'Диагностика', 'Ташхис'],
    slugs: ['ultrasound', 'laboratory'],
  },
  {
    key: 'care',
    title: ['Стационар и восстановление', 'Statsionar va tiklanish', 'Inpatient care and recovery', 'Стационар және оңалту', 'Бистарӣ ва барқарорсозӣ'],
    slugs: ['inpatient', 'rehabilitation', 'chinese-medicine', 'salt-room'],
  },
] as const

export function serviceNavigation(locale: SiteLocale) {
  return groups.map((group) => ({
    key: group.key,
    title: translate(locale, group.title),
    items: group.slugs.filter(isServiceAvailable).flatMap((slug) => {
      const copy = serviceCopy(locale, slug)
      return copy ? [{ slug, title: copy.title }] : []
    }),
  })).filter((group) => group.items.length > 0)
}

export function serviceNavigationLabels(locale: SiteLocale) {
  return {
    all: translate(locale, ['Все направления', 'Barcha yo‘nalishlar', 'All services', 'Барлық бағыттар', 'Ҳамаи самтҳо']),
    help: translate(locale, ['Поможем выбрать врача', 'Shifokor tanlashda yordam', 'Help choosing a doctor', 'Дәрігер таңдауға көмек', 'Кумак дар интихоби духтур']),
  }
}
