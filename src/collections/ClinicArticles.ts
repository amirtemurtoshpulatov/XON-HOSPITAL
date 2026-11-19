import type { CollectionConfig, Validate } from 'payload'

import { canEditContent } from '@/access/roles'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { httpsLink } from '@/lib/xonVideo'

const validateSlug: Validate<string> = (value) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value || '')
  || 'Используйте латинские буквы, цифры и дефисы.'

const validateURL: Validate<string> = (value) => Boolean(httpsLink(value)) || 'Укажите ссылку, начинающуюся с https://.'

export const ClinicArticles: CollectionConfig = {
  slug: 'clinic-articles',
  labels: { singular: 'Статья', plural: 'Статьи для пациентов' },
  admin: { group: 'Клиника', useAsTitle: 'title', defaultColumns: ['title', '_status', 'publishedAt'] },
  access: { create: canEditContent, update: canEditContent, delete: canEditContent, read: authenticatedOrPublished },
  fields: [
    { name: 'title', label: 'Заголовок', type: 'text', localized: true, required: true },
    { name: 'slug', label: 'Адрес статьи', type: 'text', required: true, unique: true, validate: validateSlug },
    { name: 'description', label: 'Анонс и описание для поиска', type: 'textarea', localized: true, required: true },
    { name: 'content', label: 'Текст статьи', type: 'richText', localized: true, required: true },
    { name: 'cover', label: 'Обложка', type: 'upload', relationTo: 'media' },
    { name: 'authorName', label: 'Имя автора', type: 'text', localized: true },
    { name: 'reviewerName', label: 'Кто проверил материал', type: 'text', localized: true, admin: { description: 'Укажите имя только после проверки материала специалистом.' } },
    {
      name: 'sources', label: 'Источники', type: 'array',
      fields: [
        { name: 'label', label: 'Название источника', type: 'text', required: true },
        { name: 'url', label: 'Ссылка', type: 'text', required: true, validate: validateURL },
      ],
    },
    { name: 'relatedService', label: 'Связанное направление', type: 'relationship', relationTo: 'services' },
    {
      name: 'publishedAt', label: 'Дата публикации', type: 'date',
      hooks: { beforeChange: [({ value, siblingData }) => value || (siblingData._status === 'published' ? new Date().toISOString() : undefined)] },
    },
  ],
  versions: { drafts: true, maxPerDoc: 20 },
}
