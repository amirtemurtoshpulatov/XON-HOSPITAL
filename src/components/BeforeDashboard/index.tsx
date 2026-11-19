import { XonAdminDashboard } from '@/components/XonAdminDashboard'
import { XonAdminIcon } from '@/components/XonAdminBrand'
import Link from 'next/link'

import './index.scss'

export default function BeforeDashboard() {
  return (
    <>
    <section className="before-dashboard">
      <div className="before-dashboard__heading">
        <XonAdminIcon />
        <h2>Управление сайтом XON Hospital</h2>
      </div>
      <nav aria-label="Быстрые ссылки">
        <Link href="/admin/collections/leads">Заявки</Link>
        <Link href="/admin/collections/doctors">Врачи</Link>
        <Link href="/admin/collections/services">Услуги</Link>
        <Link href="/admin/collections/clinic-articles">Статьи</Link>
        <Link href="/ru">Открыть сайт</Link>
      </nav>
    </section>
    <XonAdminDashboard />
    </>
  )
}
