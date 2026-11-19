import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { canEditContent } from '../access/roles'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Направление', plural: 'Направления и услуги' },
  admin: {
    group: 'Клиника',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
  },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: anyone,
    update: canEditContent,
  },
  fields: [
    { name: 'title', label: 'Название', type: 'text', required: true, localized: true },
    { name: 'slug', label: 'Адрес страницы', type: 'text', required: true, unique: true, index: true },
    {
      name: 'category',
      label: 'Категория',
      type: 'select',
      required: true,
      defaultValue: 'treatment',
      options: [
        { label: 'Консультация и лечение', value: 'treatment' },
        { label: 'Диагностика', value: 'diagnostics' },
        { label: 'Восстановление', value: 'rehabilitation' },
        { label: 'Стационар', value: 'inpatient' },
      ],
    },
    { name: 'eyebrow', label: 'Короткая метка', type: 'text', localized: true },
    { name: 'summary', label: 'Краткое описание', type: 'textarea', required: true, localized: true },
    {
      name: 'keyFacts', label: 'Ключевые факты', type: 'array', localized: true, maxRows: 6,
      fields: [
        { name: 'label', label: 'Параметр', type: 'text', required: true },
        { name: 'value', label: 'Значение', type: 'text', required: true },
      ],
    },
    { name: 'content', label: 'Содержание страницы', type: 'richText', localized: true },
    { name: 'cover', label: 'Обложка', type: 'upload', relationTo: 'media' },
    {
      name: 'symptoms', label: 'Когда обращаться / симптомы', type: 'array', localized: true,
      fields: [{ name: 'label', label: 'Симптом или повод', type: 'text', required: true }],
    },
    {
      name: 'conditions', label: 'С чем работает направление', type: 'array', localized: true,
      fields: [{ name: 'label', label: 'Состояние / задача', type: 'text', required: true }],
    },
    {
      name: 'diagnostics', label: 'Диагностика и процедуры', type: 'array', localized: true,
      fields: [
        { name: 'title', label: 'Название', type: 'text', required: true },
        { name: 'text', label: 'Описание', type: 'textarea' },
        { name: 'service', label: 'Связанная услуга', type: 'relationship', relationTo: 'services' },
      ],
    },
    {
      name: 'advantages', label: 'Почему XON / преимущества', type: 'array', localized: true,
      fields: [{ name: 'label', label: 'Преимущество', type: 'text', required: true }],
    },
    {
      name: 'prices', label: 'Основные цены', type: 'array', localized: true,
      fields: [
        { name: 'title', label: 'Услуга', type: 'text', required: true },
        { name: 'category', label: 'Категория', type: 'text' },
        { name: 'price', label: 'Стоимость', type: 'text', required: true },
      ],
    },
    {
      name: 'faq', label: 'Частые вопросы', type: 'array', localized: true,
      fields: [
        { name: 'question', label: 'Вопрос', type: 'text', required: true },
        { name: 'answer', label: 'Ответ', type: 'textarea', required: true },
      ],
    },
    { name: 'doctors', label: 'Врачи направления', type: 'relationship', relationTo: 'doctors', hasMany: true },
    { name: 'featured', label: 'Показывать на главной', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', label: 'Порядок', type: 'number', defaultValue: 100 },
  ],
}
