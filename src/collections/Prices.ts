import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Prices: CollectionConfig = {
  slug: 'prices',
  labels: { singular: 'Цена', plural: 'Цены и программы' },
  admin: { group: 'Клиника', useAsTitle: 'title', defaultColumns: ['title', 'price', 'active'] },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  fields: [
    { name: 'title', label: 'Название', type: 'text', required: true, localized: true },
    { name: 'description', label: 'Описание', type: 'textarea', localized: true },
    { name: 'price', label: 'Стоимость', type: 'number', min: 0 },
    { name: 'priceLabel', label: 'Подпись вместо точной цены', type: 'text', localized: true },
    { name: 'currency', label: 'Валюта', type: 'select', defaultValue: 'UZS', options: ['UZS', 'USD'] },
    { name: 'service', label: 'Направление', type: 'relationship', relationTo: 'services' },
    { name: 'active', label: 'Показывать на сайте', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', label: 'Порядок', type: 'number', defaultValue: 100 },
  ],
}
