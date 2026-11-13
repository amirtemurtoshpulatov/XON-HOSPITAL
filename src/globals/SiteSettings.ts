import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  admin: { group: 'Сайт' },
  access: { read: () => true, update: authenticated },
  fields: [
    { name: 'clinicName', label: 'Название клиники', type: 'text', defaultValue: 'XON HOSPITAL', localized: true },
    { name: 'tagline', label: 'Короткое позиционирование', type: 'text', localized: true },
    { name: 'phone', label: 'Телефон', type: 'text' },
    { name: 'telegram', label: 'Telegram', type: 'text' },
    { name: 'instagram', label: 'Instagram', type: 'text' },
    { name: 'address', label: 'Адрес', type: 'textarea', localized: true },
    { name: 'workingHours', label: 'Часы работы', type: 'text', localized: true },
    {
      type: 'group',
      name: 'palette',
      label: 'Цветовая палитра',
      fields: [
        { name: 'background', label: 'Фон', type: 'text', defaultValue: '#FAF9F6' },
        { name: 'primary', label: 'Основной цвет', type: 'text', defaultValue: '#173B57' },
        { name: 'dark', label: 'Тёмный фон секций', type: 'text', defaultValue: '#102A3D' },
        { name: 'accent', label: 'Акцент', type: 'text', defaultValue: '#C18A43' },
      ],
    },
    { name: 'privacyText', label: 'Текст согласия', type: 'textarea', localized: true },
    { name: 'emergencyNotice', label: 'Экстренное уведомление', type: 'textarea', localized: true },
  ],
}
