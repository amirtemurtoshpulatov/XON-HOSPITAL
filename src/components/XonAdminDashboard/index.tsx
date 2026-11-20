'use client'

import Link from 'next/link'
import { useAuth } from '@payloadcms/ui'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Lead, LeadComment, User } from '@/payload-types'
import type { TrafficReport } from '@/lib/gaReporting'
import { roleOf } from '@/access/roles'
import './style.css'

const stages = [ ['new', 'Новые'], ['processing', 'В работе'], ['booked', 'Записаны'], ['completed', 'Завершены'], ['unreachable', 'Не удалось связаться'] ] as const
const statusName = (value: string) => stages.find(([id]) => id === value)?.[1] || value
const stamp = (value: string) => new Date(value).toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent', dateStyle: 'short', timeStyle: 'short' })
const reportsURL = 'https://analytics.google.com/analytics/web/#/a417033880p565251087/reports/intelligenthome'
async function jsonRequest(url: string, options?: RequestInit) {
  const response = await fetch(url, { ...options, credentials: 'same-origin', cache: 'no-store', headers: { 'Content-Type': 'application/json', ...options?.headers } })
  if (!response.ok) throw new Error('request_failed')
  return response.json()
}

function TrafficPanel() {
  const [days, setDays] = useState(28)
  const [report, setReport] = useState<TrafficReport | { state: 'setup_required' | 'error' } | null>(null)
  useEffect(() => {
    const abort = new AbortController()
    jsonRequest(`/api/admin/analytics?days=${days}`, { signal: abort.signal }).then(setReport).catch(() => { if (!abort.signal.aborted) setReport({ state: 'error' }) })
    return () => abort.abort()
  }, [days])
  return <section className="xon-dash-panel" aria-label="Посещаемость сайта">
    <header><div><h2>Посещаемость сайта</h2><p>Google Analytics 4 · только посетители с согласием на аналитику</p></div><label>Период <select value={days} onChange={(event) => { setReport(null); setDays(Number(event.target.value)) }}><option value={7}>7 дней</option><option value={28}>28 дней</option><option value={90}>90 дней</option></select></label></header>
    {!report && <p role="status">Загружаю отчёт…</p>}
    {report?.state === 'setup_required' && <p className="xon-dash-notice">Счётчик GA4: G-TR49WKDCGR. Для отчётов внутри CRM осталось разрешить серверу доступ на чтение через Google Analytics Data API. Данные здесь появятся после подключения доступа.</p>}
    {report?.state === 'error' && <p className="xon-dash-notice" role="status">Google пока не вернул отчёт. Проверьте доступ к API или откройте Analytics напрямую.</p>}
    {report?.state === 'ready' && <>
      <div className="xon-dash-metrics">{[['Пользователи', report.users], ['Сеансы', report.sessions], ['Просмотры', report.views], ['За последние 30 минут', report.activeNow]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{Number(value).toLocaleString('ru-RU')}</strong></div>)}</div>
      {report.users === 0 && <p>За выбранный период Google не вернул посещений. Новый счётчик может начать показывать отчёты с задержкой до 48 часов.</p>}
      <div className="xon-dash-tables"><div><h3>Источники</h3><table><thead><tr><th>Канал</th><th>Сеансы</th></tr></thead><tbody>{report.channels.map((row) => <tr key={row.name}><td>{row.name}</td><td>{row.sessions}</td></tr>)}</tbody></table></div><div><h3>Популярные страницы</h3><table><thead><tr><th>Страница</th><th>Просмотры</th></tr></thead><tbody>{report.pages.map((row) => <tr key={row.path}><td>{row.path}</td><td>{row.views}</td></tr>)}</tbody></table></div></div>
      {report.daily.length > 0 && <details><summary>Посещаемость по дням</summary><table><thead><tr><th>Дата</th><th>Пользователи</th><th>Просмотры</th></tr></thead><tbody>{report.daily.map((row) => <tr key={row.date}><td>{row.date.replace(/(\d{4})(\d{2})(\d{2})/, '$3.$2.$1')}</td><td>{row.users}</td><td>{row.views}</td></tr>)}</tbody></table></details>}
      <p className="xon-dash-muted">Обновлено: {stamp(report.updatedAt)}. Кэш отчёта — 5 минут; текущие посетители — за последние 30 минут.</p>
    </>}
    <a href={reportsURL} target="_blank" rel="noreferrer">Открыть Google Analytics ↗</a>
  </section>
}

export function XonAdminDashboard() {
  const { user } = useAuth<User>()
  const role = roleOf(user)
  const crmAccess = role === 'owner' || role === 'manager'
  const [leads, setLeads] = useState<Lead[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState<number | null>(null)
  const [dragging, setDragging] = useState<Lead['id'] | null>(null)
  const [dropTarget, setDropTarget] = useState<string | null>(null)
  const [more, setMore] = useState(false)
  const [search, setSearch] = useState('')
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Lead | null>(null)
  const [comments, setComments] = useState<LeadComment[]>([])
  const [comment, setComment] = useState('')
  const [commentsLoading, setCommentsLoading] = useState(false)
  const threadRef = useRef<HTMLElement>(null)
  const load = useCallback(async (next = 1) => {
    setError(''); setLoading(true)
    try {
      const result = await jsonRequest(`/api/leads?depth=0&limit=50&sort=-createdAt&page=${next}`)
      if (!Array.isArray(result.docs)) throw new Error('invalid_lead_list')
      setLeads((previous) => next === 1 ? result.docs : [...previous, ...result.docs])
      setTotal(result.totalDocs); setMore(result.hasNextPage); setPage(next)
    } catch { setError('Не удалось загрузить заявки. Проверьте вход и обновите страницу.') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { if (crmAccess) void load() }, [crmAccess, load])
  const selectedID = selected?.id
  useEffect(() => { if (selectedID) threadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [selectedID])
  useEffect(() => {
    if (!selectedID) return
    const abort = new AbortController()
    setCommentsLoading(true)
    jsonRequest(`/api/lead-comments?depth=0&limit=100&sort=-createdAt&where[lead][equals]=${selectedID}`, { signal: abort.signal }).then((result) => { if (!abort.signal.aborted) setComments(result.docs) }).catch(() => { if (!abort.signal.aborted) setError('Не удалось загрузить комментарии.') }).finally(() => { if (!abort.signal.aborted) setCommentsLoading(false) })
    return () => abort.abort()
  }, [selectedID])

  async function move(id: Lead['id'], status: Lead['status']) {
    if (busy) return
    setBusy(true); setError('')
    try {
      const result = await jsonRequest(`/api/leads/${id}?depth=0`, { method: 'PATCH', body: JSON.stringify({ status }) })
      if (!result.doc?.id) throw new Error('invalid_lead_update')
      setLeads((items) => items.map((item) => item.id === id ? result.doc : item))
      if (selected?.id === id) setSelected(result.doc)
    } catch { setError('Статус не сохранён. Обновите данные и повторите.') }
    finally { setBusy(false) }
  }
  async function addComment(event: React.FormEvent) {
    event.preventDefault()
    if (!selected || !comment.trim() || busy) return
    setBusy(true); setError('')
    try {
      const result = await jsonRequest('/api/lead-comments?depth=0', { method: 'POST', body: JSON.stringify({ lead: selected.id, text: comment.trim() }) })
      setComments((items) => [result.doc, ...items]); setComment('')
    } catch { setError('Комментарий не сохранён. Текст оставлен в форме — попробуйте ещё раз.') }
    finally { setBusy(false) }
  }
  async function remove(lead: Lead) {
    if (role !== 'owner' || !window.confirm(`Удалить заявку «${lead.name}» и её комментарии? Это действие нельзя отменить.`)) return
    setBusy(true); setError('')
    try {
      await jsonRequest(`/api/leads/${lead.id}`, { method: 'DELETE' })
      setLeads((items) => items.filter((item) => item.id !== lead.id)); setSelected(null); setTotal((value) => value === null ? null : value - 1)
    } catch { setError('Не удалось удалить заявку.') }
    finally { setBusy(false) }
  }
  if (!role) return null
  const filtered = leads.filter((lead) => `${lead.name} ${lead.phone} ${lead.serviceInterest || ''}`.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  return <div className="xon-admin-dashboard">
    {crmAccess && <section className="xon-dash-panel">
      <header><div><h2>Заявки · CRM</h2><p>{total === null ? 'Список заявок ещё не загружен.' : `Показано ${leads.length} из ${total} заявок.`}</p></div><div className="xon-dash-actions"><button onClick={() => void load()} disabled={loading || busy}>Обновить</button><Link href="/admin/collections/leads/create">Новая заявка</Link><Link href="/admin/collections/leads">Таблица и фильтры</Link>{role === 'owner' && <><Link href="/admin/collections/users">Сотрудники и роли</Link><Link href="/admin/collections/users/create">Добавить сотрудника</Link></>}</div></header>
      <div className="xon-crm-guide" id="xon-crm-help"><strong>Как менять статус</strong><p>Зажмите «⠿ Перетащить» вверху карточки и перенесите её в нужную колонку. Можно также выбрать «Статус» в карточке — этот способ работает и на телефоне.</p></div>
      {role === 'owner' && <details className="xon-crm-role-guide"><summary>Как назначать доступ сотрудникам</summary><p>Откройте «Сотрудники и роли», выберите человека или нажмите «Добавить сотрудника». В поле «Уровень доступа» выберите роль и сохраните карточку.</p><ul><li><strong>Главный администратор:</strong> все разделы, сотрудники и удаление заявок.</li><li><strong>Менеджер CRM:</strong> заявки, статусы и комментарии, без удаления.</li><li><strong>Редактор сайта:</strong> врачи, услуги и статьи, без доступа к заявкам.</li></ul></details>}
      <label className="xon-dash-search">Поиск среди загруженных заявок<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Имя, телефон или направление" /></label>
      {error && <p className="xon-dash-error" role="alert">{error}</p>}
      {loading && <p role="status">Загружаю заявки…</p>}
      {(!error || leads.length > 0) && <div className="xon-crm-board" aria-busy={busy}>
        {stages.map(([status, label]) => <section className={`xon-crm-column xon-crm-column--${status}${dropTarget === status ? ' xon-crm-column--target' : ''}`} key={status} aria-label={label} onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; if (dragging !== null) setDropTarget(status) }} onDrop={(event) => {
          event.preventDefault(); const id = event.dataTransfer.getData('text/plain') || String(dragging); const lead = leads.find((item) => String(item.id) === id); setDragging(null); setDropTarget(null)
          if (lead && lead.status !== status) void move(lead.id, status)
        }}><h3>{label}<span>{filtered.filter((lead) => lead.status === status).length}</span></h3>
          {filtered.filter((lead) => lead.status === status).map((lead) => <article className={`xon-crm-card${dragging === lead.id ? ' xon-crm-card--dragging' : ''}`} key={lead.id}>
            <button type="button" className="xon-crm-handle" draggable={!busy} disabled={busy} aria-describedby="xon-crm-help" title="Зажмите и перенесите в другую колонку. Клавиши ← и → также меняют статус." onDragStart={(event) => { event.dataTransfer.setData('text/plain', String(lead.id)); event.dataTransfer.effectAllowed = 'move'; setDragging(lead.id) }} onDragEnd={() => { setDragging(null); setDropTarget(null) }} onKeyDown={(event) => {
              if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
              event.preventDefault(); const index = stages.findIndex(([value]) => value === lead.status) + (event.key === 'ArrowRight' ? 1 : -1)
              if (stages[index]) void move(lead.id, stages[index][0])
            }}>⠿ Перетащить</button>
            <button className="xon-crm-name" disabled={busy} onClick={() => { setSelected(lead); setComments([]); setComment(''); setError('') }}>{lead.name}</button>
            <a href={`tel:${lead.phone.replace(/[^+\d]/g, '')}`}>{lead.phone}</a>
            {lead.serviceInterest && <p>{lead.serviceInterest}</p>}<small>{stamp(lead.createdAt)} · {lead.locale?.toUpperCase()}</small>
            <label>Статус<select value={lead.status} disabled={busy} onChange={(event) => void move(lead.id, event.target.value as Lead['status'])}>{stages.map(([value, name]) => <option key={value} value={value}>{name}</option>)}</select></label>
            <button disabled={busy} onClick={() => { setSelected(lead); setComments([]); setComment(''); setError('') }}>Комментарии и история</button>
          </article>)}
          {!loading && total !== null && !filtered.some((lead) => lead.status === status) && <p className="xon-dash-muted">Заявок нет</p>}
        </section>)}
      </div>}
      {more && <button disabled={loading || busy} onClick={() => void load(page + 1)}>Загрузить ещё 50</button>}
      {selected && <section ref={threadRef} className="xon-crm-thread" aria-label={`Заявка: ${selected.name}`}><header><h3>{selected.name}</h3><button disabled={busy} onClick={() => setSelected(null)}>Закрыть</button></header>
        <p><a href={`tel:${selected.phone.replace(/[^+\d]/g, '')}`}>{selected.phone}</a> · {statusName(selected.status)}</p>
        {selected.comment && <p><strong>Комментарий из заявки:</strong> {selected.comment}</p>}
        <div className="xon-dash-actions"><Link href={`/admin/collections/leads/${selected.id}`}>Открыть карточку заявки</Link>{role === 'owner' && <button className="xon-dash-delete" disabled={busy} onClick={() => void remove(selected)}>Удалить заявку</button>}</div>
        <h4>Комментарии сотрудников</h4>{commentsLoading && <p role="status">Загружаю комментарии…</p>}
        {!commentsLoading && comments.length === 0 && <p>Комментариев пока нет.</p>}
        {comments.map((note) => <article className="xon-crm-comment" key={note.id}><small>{note.authorName} · {stamp(note.createdAt)}</small><p>{note.text}</p></article>)}
        <form onSubmit={addComment}><label>Новый комментарий<textarea disabled={busy} maxLength={3000} required rows={3} value={comment} onChange={(event) => setComment(event.target.value)} /></label><button disabled={busy || !comment.trim()} type="submit">Добавить комментарий</button></form>
        <details><summary>История статусов</summary><ol>{[...(selected.statusHistory || [])].reverse().map((item, index) => <li key={item.id || index}>{item.at ? stamp(item.at) : ''} · {item.authorName} · {item.from ? `${statusName(item.from)} → ` : ''}{statusName(item.to || '')}</li>)}</ol></details>
      </section>}
    </section>}
    <TrafficPanel />
  </div>
}
