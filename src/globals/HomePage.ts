import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Главная страница',
  admin: { group: 'Сайт' },
  access: { read: () => true, update: authenticated },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Первый экран',
          fields: [
            { name: 'heroEyebrow', label: 'Надзаголовок', type: 'text', localized: true },
            { name: 'heroTitle', label: 'Главный заголовок', type: 'text', localized: true },
            { name: 'heroAccent', label: 'Акцентная строка', type: 'text', localized: true },
            { name: 'heroText', label: 'Описание', type: 'textarea', localized: true },
            { name: 'heroMedia', label: 'Изображение в анимации', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Направления',
          fields: [
            { name: 'servicesTitle', label: 'Заголовок блока', type: 'text', localized: true },
            { name: 'servicesText', label: 'Описание блока', type: 'textarea', localized: true },
            { name: 'featuredServices', label: 'Направления на главной', type: 'relationship', relationTo: 'services', hasMany: true, maxRows: 8 },
          ],
        },
        {
          label: 'Цифры и программы',
          fields: [
            {
              name: 'metrics',
              label: 'Ключевые цифры',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'value', label: 'Значение', type: 'text', required: true },
                { name: 'label', label: 'Подпись', type: 'textarea', localized: true, required: true },
              ],
            },
            { name: 'programsEyebrow', label: 'Надзаголовок программ', type: 'text', localized: true },
            { name: 'programsTitle', label: 'Заголовок программ', type: 'text', localized: true },
            { name: 'programsText', label: 'Описание программ', type: 'textarea', localized: true },
            {
              name: 'programs',
              label: 'Карточки программ',
              type: 'array',
              maxRows: 6,
              fields: [
                { name: 'title', label: 'Название', type: 'text', localized: true, required: true },
                { name: 'text', label: 'Описание', type: 'textarea', localized: true, required: true },
                { name: 'service', label: 'Связанная услуга', type: 'relationship', relationTo: 'services' },
              ],
            },
          ],
        },
        {
          label: 'Команда',
          fields: [
            { name: 'doctorsTitle', label: 'Заголовок блока', type: 'text', localized: true },
            { name: 'doctorsText', label: 'Описание блока', type: 'textarea', localized: true },
            { name: 'featuredDoctors', label: 'Врачи на главной', type: 'relationship', relationTo: 'doctors', hasMany: true, maxRows: 6 },
          ],
        },
        {
          label: 'Ценность и заявка',
          fields: [
            { name: 'affordabilityTitle', label: 'Заголовок о доступности', type: 'text', localized: true },
            { name: 'affordabilityText', label: 'Текст о доступности', type: 'textarea', localized: true },
            { name: 'formTitle', label: 'Заголовок формы', type: 'text', localized: true },
            { name: 'formText', label: 'Описание формы', type: 'textarea', localized: true },
          ],
        },
      ],
    },
  ],
}
