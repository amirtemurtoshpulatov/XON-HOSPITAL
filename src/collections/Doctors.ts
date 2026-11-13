import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Doctors: CollectionConfig = {
  slug: 'doctors',
  labels: { singular: 'Врач', plural: 'Врачи' },
  admin: {
    group: 'Клиника',
    useAsTitle: 'name',
    defaultColumns: ['name', 'specialty', 'featured', 'updatedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    { name: 'name', label: 'Имя и фамилия', type: 'text', required: true, localized: true },
    { name: 'slug', label: 'Адрес страницы', type: 'text', required: true, unique: true, index: true },
    { name: 'specialty', label: 'Специализация', type: 'text', required: true, localized: true },
    { name: 'position', label: 'Должность', type: 'text', localized: true },
    { name: 'experience', label: 'Стаж / опыт', type: 'text', localized: true },
    { name: 'category', label: 'Категория / учёная степень', type: 'text', localized: true },
    { name: 'schedule', label: 'График приёма', type: 'text', localized: true },
    { name: 'primaryPrice', label: 'Стоимость первичного приёма', type: 'text', localized: true },
    { name: 'followUpPrice', label: 'Стоимость повторного приёма', type: 'text', localized: true },
    {
      name: 'languages', label: 'Языки приёма', type: 'array', localized: true,
      fields: [{ name: 'label', label: 'Язык', type: 'text', required: true }],
    },
    { name: 'birthYear', label: 'Год рождения', type: 'number', min: 1900, max: 2100 },
    { name: 'hometown', label: 'Родной город / регион', type: 'text', localized: true },
    { name: 'education', label: 'Образование', type: 'textarea', localized: true },
    { name: 'instagram', label: 'Instagram', type: 'text' },
    {
      name: 'socialLinks', label: 'Социальные сети и профессиональные профили', type: 'array',
      fields: [
        { name: 'label', label: 'Название', type: 'text', required: true },
        { name: 'url', label: 'Ссылка', type: 'text', required: true },
      ],
    },
    { name: 'photo', label: 'Фотография', type: 'upload', relationTo: 'media' },
    { name: 'videoUrl', label: 'Ссылка на видеовизитку (YouTube / Vimeo)', type: 'text' },
    { name: 'videoTitle', label: 'Заголовок видеовизитки', type: 'text', localized: true },
    { name: 'videoPoster', label: 'Обложка видео', type: 'upload', relationTo: 'media' },
    {
      name: 'videos', label: 'Дополнительные видео врача', type: 'array', localized: true,
      fields: [
        { name: 'title', label: 'Заголовок', type: 'text', required: true },
        { name: 'description', label: 'Описание', type: 'textarea' },
        { name: 'url', label: 'Ссылка YouTube / Vimeo', type: 'text', required: true },
      ],
    },
    { name: 'gallery', label: 'Галерея врача', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'shortBio', label: 'Кратко о враче', type: 'textarea', localized: true },
    { name: 'bio', label: 'Полная биография', type: 'richText', localized: true },
    {
      name: 'focusAreas', label: 'С чем обращаются', type: 'array', localized: true,
      fields: [{ name: 'label', label: 'Направление / проблема', type: 'text', required: true }],
    },
    {
      name: 'procedures', label: 'Процедуры и методы', type: 'array', localized: true,
      fields: [{ name: 'label', label: 'Название', type: 'text', required: true }],
    },
    {
      name: 'credentials', label: 'Образование, сертификаты и квалификация', type: 'array', localized: true,
      fields: [
        { name: 'year', label: 'Год / период', type: 'text' },
        { name: 'title', label: 'Название', type: 'text', required: true },
        { name: 'institution', label: 'Учреждение', type: 'text' },
        { name: 'document', label: 'Скан / документ', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'articles', label: 'Статьи, выступления и профессиональные материалы', type: 'array', localized: true,
      fields: [
        { name: 'title', label: 'Заголовок', type: 'text', required: true },
        { name: 'summary', label: 'Краткое описание', type: 'textarea' },
        { name: 'url', label: 'Ссылка на материал', type: 'text' },
        { name: 'publishedAt', label: 'Дата публикации', type: 'date' },
        { name: 'cover', label: 'Обложка', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'featured', label: 'Показывать на главной', type: 'checkbox', defaultValue: false },
    { name: 'acceptsAppointments', label: 'Доступна запись', type: 'checkbox', defaultValue: true },
    {
      name: 'verificationStatus', label: 'Проверка данных', type: 'select', defaultValue: 'needs-review',
      options: [
        { label: 'Нужно подтвердить', value: 'needs-review' },
        { label: 'Подтверждено клиникой', value: 'verified' },
      ], admin: { position: 'sidebar' },
    },
    {
      name: 'editorialNotes', label: 'Внутренние заметки (не публикуются)', type: 'textarea',
      access: { read: ({ req }) => Boolean(req.user), update: ({ req }) => Boolean(req.user) },
      admin: { position: 'sidebar' },
    },
    { name: 'sortOrder', label: 'Порядок', type: 'number', defaultValue: 100 },
  ],
}
