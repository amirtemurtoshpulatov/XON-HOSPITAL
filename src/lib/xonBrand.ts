import type { Metadata } from 'next'

export const xonIcons = {
  icon: [
    { url: '/favicon.ico?v=2', sizes: 'any', type: 'image/x-icon' },
    { url: '/xon-favicon.png?v=2', sizes: '96x96', type: 'image/png' },
  ],
  apple: [{ url: '/xon-apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' }],
} satisfies NonNullable<Metadata['icons']>
