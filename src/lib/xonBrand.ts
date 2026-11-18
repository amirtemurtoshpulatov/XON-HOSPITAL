import type { Metadata } from 'next'

export const xonLogo = { src: '/xon-hospital-logo.webp', width: 720, height: 720 }
export const xonFavicon = '/xon-favicon.png?v=3'

export const xonIcons = {
  icon: [
    { url: '/favicon.ico?v=3', sizes: 'any', type: 'image/x-icon' },
    { url: xonFavicon, sizes: '96x96', type: 'image/png' },
  ],
  apple: [{ url: '/xon-apple-touch-icon.png?v=3', sizes: '180x180', type: 'image/png' }],
} satisfies NonNullable<Metadata['icons']>
