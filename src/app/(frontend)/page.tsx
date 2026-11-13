import type { Metadata } from 'next'
import { XonHome } from '@/components/XonHome'

export default function HomePage() {
  return <XonHome locale="ru" />
}

export const metadata: Metadata = {
  title: 'XON HOSPITAL — многопрофильная клиника',
  description: 'Консультация, диагностика, лечение, восстановление и наблюдение в одной системе заботы.',
}
