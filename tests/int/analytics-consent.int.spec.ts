import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createElement, useEffect } from 'react'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import { XonAnalytics } from '@/components/XonAnalytics'

vi.mock('next/navigation', () => ({ usePathname: () => '/ru' }))
vi.mock('next/script', () => ({ default: function FakeScript({ onReady }: { onReady: () => void }) {
  useEffect(() => { onReady() }, [])
  return createElement('span', { 'data-testid': 'google-script' })
} }))
beforeEach(() => { localStorage.clear(); delete window.gtag; delete window.dataLayer })
afterEach(cleanup)

describe('GA4 consent lifecycle', () => {
  it('does not load Google or queue analytics before consent or after decline', () => {
    const ui = render(createElement(XonAnalytics, { measurementId: 'G-TEST123', locale: 'ru' }))
    expect(ui.queryByTestId('google-script')).toBeNull()
    fireEvent.click(ui.getByText('Без аналитики'))
    expect(ui.queryByTestId('google-script')).toBeNull()
    expect(window.dataLayer).toBeUndefined()
    expect(localStorage.getItem('xon-analytics-consent-v1')).toBe('declined')
  })
  it('queues one page view after acceptance and disables collection on revocation', async () => {
    const ui = render(createElement(XonAnalytics, { measurementId: 'G-TEST123', locale: 'ru' }))
    fireEvent.click(ui.getByText('Разрешить'))
    await waitFor(() => expect((window.dataLayer || []).filter((item) => Array.isArray(item) && item[0] === 'event' && item[1] === 'page_view')).toHaveLength(1))
    fireEvent.click(ui.getByText('Аналитика'))
    fireEvent.click(ui.getByText('Без аналитики'))
    expect((window as unknown as Record<string, unknown>)['ga-disable-G-TEST123']).toBe(true)
    expect(ui.queryByTestId('google-script')).toBeNull()
  })
})
