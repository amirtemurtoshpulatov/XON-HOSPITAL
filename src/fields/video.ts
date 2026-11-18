import type { Field, Validate } from 'payload'

import { videoEmbed } from '@/lib/xonVideo'

const validateVideoSource: Validate<string | null | undefined, unknown, { file?: unknown }> = (value, { siblingData }) => {
  if (value && siblingData.file) return 'Выберите один источник: ссылку или файл.'
  if (value && !videoEmbed(value)) return 'Вставьте ссылку на ролик Instagram, YouTube или Vimeo.'
  return value || siblingData.file ? true : 'Вставьте ссылку или выберите видеофайл.'
}

export function videoFields(localized = false): Field[] {
  return [
    { name: 'title', label: 'Заголовок', type: 'text', required: true, localized },
    { name: 'description', label: 'Описание', type: 'textarea', localized },
    {
      name: 'url',
      label: 'Ссылка на видео',
      type: 'text',
      validate: validateVideoSource,
      admin: { description: 'Скопируйте ссылку на публичный Reels, YouTube (включая Shorts) или Vimeo. Если загружаете файл, оставьте поле пустым.' },
    },
    { name: 'file', label: 'Загрузить или выбрать видеофайл', type: 'upload', relationTo: 'video-files' },
    {
      name: 'format',
      label: 'Формат кадра',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: 'Автоматически', value: 'auto' },
        { label: 'Вертикальный (9:16)', value: 'portrait' },
        { label: 'Горизонтальный (16:9)', value: 'landscape' },
      ],
      admin: { description: 'Reels и Shorts распознаются автоматически. Для загруженного вертикального файла выберите 9:16.' },
    },
  ]
}
