import type { CollectionConfig, Validate } from 'payload'

import { videoFields } from '@/fields/video'
import { authenticated } from '@/access/authenticated'

const sections = [
  ['home:hero', 'Главная — после первого экрана'],
  ['home:programs', 'Главная — программы'],
  ['home:services', 'Главная — направления'],
  ['home:path', 'Главная — путь пациента'],
  ['home:doctors', 'Главная — врачи'],
  ['home:prices', 'Главная — доступность лечения'],
  ['home:articles', 'Главная — полезные материалы'],
  ['home:appointment', 'Главная — запись'],
  ['services', 'Список направлений'],
  ['doctors', 'Каталог врачей'],
  ['about', 'О клинике'],
  ['prices', 'Цены'],
  ['contacts', 'Контакты'],
  ['articles', 'Список статей'],
  ['detail', 'Отдельная страница направления, врача, статьи или дополнительная страница'],
] as const

const validatePagePath: Validate<string | null | undefined, unknown, { section?: string }> = (value, { siblingData }) => {
  if (siblingData.section !== 'detail') return true
  return /^(doctors|services|articles|page)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value || '')
    || 'Укажите путь вида doctors/vohid-latipov, без домена и языка.'
}

export const VideoPlacements: CollectionConfig = {
  slug: 'video-placements',
  labels: { singular: 'Видео на сайте', plural: 'Видео на сайте' },
  admin: {
    group: 'Клиника',
    useAsTitle: 'title',
    defaultColumns: ['title', 'section', 'visible', 'sortOrder'],
  },
  access: { create: authenticated, update: authenticated, delete: authenticated, read: ({ req }) => req.user ? true : { visible: { equals: true } } },
  fields: [
    {
      name: 'section', label: 'Где показать', type: 'select', index: true, required: true,
      options: sections.map(([value, label]) => ({ label, value })),
    },
    {
      name: 'pagePath', label: 'Путь к отдельной странице', type: 'text', index: true,
      admin: {
        condition: (_, siblingData) => siblingData.section === 'detail',
        description: 'Без домена и языка. Например: doctors/vohid-latipov или services/check-up.',
      },
      validate: validatePagePath,
    },
    ...videoFields(true),
    { name: 'sortOrder', label: 'Порядок показа', type: 'number', defaultValue: 0 },
    { name: 'visible', label: 'Показать посетителям', type: 'checkbox', defaultValue: false },
  ],
}
