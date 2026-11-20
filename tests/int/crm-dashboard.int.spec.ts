import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createElement } from 'react'
import { cleanup, fireEvent, render, waitFor, within } from '@testing-library/react'
import { XonAdminDashboard } from '@/components/XonAdminDashboard'

const auth = vi.hoisted(() => ({ role: 'owner' }))
vi.mock('@payloadcms/ui', () => ({ useAuth: () => ({ user: { id: 1, name: 'Test owner', role: auth.role } }) }))
vi.mock('next/link', () => ({ default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => createElement('a', props, children) }))
let failList = false
let lead = { id: 101, name: 'Synthetic dashboard lead', phone: '+00000000000', locale: 'ru', status: 'new', createdAt: '2026-11-20T05:00:00Z', statusHistory: [] }
let request: ReturnType<typeof vi.fn>
beforeEach(() => {
  auth.role = 'owner'; failList = false; lead = { ...lead, status: 'new' }
  Element.prototype.scrollIntoView = vi.fn()
  request = vi.fn(async (input: string, options?: RequestInit) => {
    const url = String(input)
    const response = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status })
    if (url.startsWith('/api/admin/analytics')) return response({ state: 'setup_required' })
    if (url.startsWith('/api/leads/101') && options?.method === 'PATCH') { lead = { ...lead, ...JSON.parse(options.body as string) }; return response({ doc: lead }) }
    if (url.startsWith('/api/leads?')) return failList ? response({ error: 'failed' }, 500) : response({ docs: [lead], totalDocs: 1, hasNextPage: false })
    if (url.startsWith('/api/lead-comments') && options?.method === 'POST') return response({ doc: { id: 1, ...JSON.parse(options.body as string), authorName: 'Test owner', createdAt: '2026-11-20T05:10:00Z' } })
    if (url.startsWith('/api/lead-comments')) return response({ docs: [] })
    throw new Error(`Unexpected test request ${url}`)
  })
  vi.stubGlobal('fetch', request)
})
afterEach(() => { cleanup(); vi.unstubAllGlobals() })

describe('CRM dashboard workflows', () => {
  it('loads the real API list, puts CRM first and exposes staff-role instructions to the owner', async () => {
    const ui = render(createElement(XonAdminDashboard))
    await ui.findByText(lead.name)
    expect(ui.getByText('Показано 1 из 1 заявок.')).toBeTruthy()
    const headings = ui.getAllByRole('heading', { level: 2 })
    expect(headings[0].textContent).toBe('Заявки · CRM')
    expect(ui.getByRole('link', { name: 'Сотрудники и роли' }).getAttribute('href')).toBe('/admin/collections/users')
    expect(ui.getByRole('link', { name: 'Добавить сотрудника' }).getAttribute('href')).toBe('/admin/collections/users/create')
  })
  it('moves a card by drag and drop, saving the new status through the API', async () => {
    const ui = render(createElement(XonAdminDashboard))
    await ui.findByText(lead.name)
    const values = new Map<string, string>()
    const dataTransfer = { setData: (key: string, value: string) => values.set(key, value), getData: (key: string) => values.get(key) || '', effectAllowed: '', dropEffect: '' }
    fireEvent.dragStart(ui.getByRole('button', { name: /Перетащить/ }), { dataTransfer })
    const destination = ui.getByRole('region', { name: 'Записаны' })
    fireEvent.dragOver(destination, { dataTransfer }); fireEvent.drop(destination, { dataTransfer })
    await waitFor(() => expect(within(destination).getByText(lead.name)).toBeTruthy())
    expect(request).toHaveBeenCalledWith('/api/leads/101?depth=0', expect.objectContaining({ method: 'PATCH', body: JSON.stringify({ status: 'booked' }) }))
  })
  it('supports keyboard movement and saving a staff comment', async () => {
    const ui = render(createElement(XonAdminDashboard))
    await ui.findByText(lead.name)
    fireEvent.keyDown(ui.getByRole('button', { name: /Перетащить/ }), { key: 'ArrowRight' })
    await waitFor(() => expect(within(ui.getByRole('region', { name: 'В работе' })).getByText(lead.name)).toBeTruthy())
    fireEvent.click(ui.getByRole('button', { name: 'Комментарии и история' }))
    await ui.findByText('Комментариев пока нет.')
    fireEvent.change(ui.getByLabelText('Новый комментарий'), { target: { value: 'Synthetic staff comment' } })
    fireEvent.click(ui.getByRole('button', { name: 'Добавить комментарий' }))
    await ui.findByText('Synthetic staff comment')
  })
  it('shows a fetch failure honestly and successfully retries without claiming an empty CRM', async () => {
    failList = true
    const ui = render(createElement(XonAdminDashboard))
    await ui.findByRole('alert')
    expect(ui.queryByText('Показано 0 из 0 заявок.')).toBeNull()
    expect(ui.queryByText('Заявок нет')).toBeNull()
    failList = false; fireEvent.click(ui.getByRole('button', { name: 'Обновить' }))
    await ui.findByText(lead.name)
    expect(ui.queryByRole('alert')).toBeNull()
  })
  it('hides account management and deletion from CRM managers', async () => {
    auth.role = 'manager'
    const ui = render(createElement(XonAdminDashboard))
    await ui.findByText(lead.name)
    expect(ui.queryByRole('link', { name: 'Сотрудники и роли' })).toBeNull()
    fireEvent.click(ui.getByRole('button', { name: 'Комментарии и история' }))
    expect(ui.queryByRole('button', { name: 'Удалить заявку' })).toBeNull()
  })
})
