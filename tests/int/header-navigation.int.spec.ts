import { afterEach, describe, expect, it, vi } from 'vitest'
import { createElement } from 'react'
import { act, cleanup, fireEvent, render, within } from '@testing-library/react'
import { XonHeader } from '@/components/XonHeader'
import { localeCodes } from '@/components/XonHome/content'
import { serviceSlugs, isServiceAvailable } from '@/lib/xonServices'

const route = vi.hoisted(() => ({ pathname: '/ru' }))
vi.mock('next/navigation', () => ({ usePathname: () => route.pathname }))
vi.mock('next/link', () => ({ default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => createElement('a', { ...props, onClick: (event: React.MouseEvent<HTMLAnchorElement>) => { event.preventDefault(); props.onClick?.(event) } }, children) }))
vi.mock('@/components/XonBrand', () => ({ XonBrand: () => createElement('a', { href: '/ru' }, 'XON') }))
afterEach(() => { cleanup(); route.pathname = '/ru'; vi.useRealTimers() })

function pointer(element: Element, type: string, pointerType: string) {
  const event = new Event(type, { bubbles: true })
  Object.defineProperty(event, 'pointerType', { value: pointerType })
  fireEvent(element, event)
}

describe('Shared service navigation', () => {
  it('provides every active service once per desktop menu, with localised URLs and no check-up offer', () => {
    for (const locale of localeCodes) {
      const ui = render(createElement(XonHeader, { locale }))
      const menu = ui.container.querySelector('.xon-mega-groups')!
      const links = [...menu.querySelectorAll('a')].map((link) => link.getAttribute('href'))
      expect(links.sort()).toEqual(serviceSlugs.filter(isServiceAvailable).map((slug) => `/${locale}/services/${slug}`).sort())
      expect(new Set(links).size).toBe(links.length)
      expect(menu.querySelectorAll('h3')).toHaveLength(3)
      ui.unmount()
    }
  })

  it('opens by click, dismisses outside, and restores trigger focus on Escape', () => {
    const ui = render(createElement(XonHeader, { locale: 'ru' }))
    const menu = ui.container.querySelector<HTMLDetailsElement>('.xon-services-disclosure')!
    const trigger = menu.querySelector('summary')!
    fireEvent.click(trigger)
    expect(menu.open).toBe(true)
    const link = within(menu).getByRole('link', { name: /^Стационар$/ })
    link.focus()
    fireEvent.keyDown(link, { key: 'Escape' })
    expect(menu.open).toBe(false)
    expect(document.activeElement).toBe(trigger)
    fireEvent.click(trigger)
    fireEvent.pointerDown(document.body)
    expect(menu.open).toBe(false)
  })

  it('closes a service menu even when its link points to the current route', () => {
    route.pathname = '/ru/services/inpatient'
    const ui = render(createElement(XonHeader, { locale: 'ru' }))
    const menu = ui.container.querySelector<HTMLDetailsElement>('.xon-services-disclosure')!
    fireEvent.click(menu.querySelector('summary')!)
    fireEvent.click(within(menu).getByRole('link', { name: /^Стационар$/ }))
    expect(menu.open).toBe(false)
  })

  it('supports nested mobile disclosure and clears both levels on route changes', () => {
    const ui = render(createElement(XonHeader, { locale: 'ru' }))
    const menu = ui.container.querySelector<HTMLDetailsElement>('.xon-mobile-nav')!
    const services = ui.container.querySelector<HTMLDetailsElement>('.xon-mobile-services')!
    fireEvent.click(menu.querySelector('summary')!)
    fireEvent.click(services.querySelector('summary')!)
    const link = within(services).getByRole('link', { name: /^Стационар$/ })
    link.focus()
    fireEvent.keyDown(link, { key: 'Escape' })
    expect(services.open).toBe(false)
    expect(menu.open).toBe(true)
    expect(document.activeElement).toBe(services.querySelector('summary'))
    fireEvent.click(services.querySelector('summary')!)
    route.pathname = '/ru/doctors'
    ui.rerender(createElement(XonHeader, { locale: 'ru' }))
    expect(services.open).toBe(false)
    expect(menu.open).toBe(false)
  })

  it('opens on mouse hover and cancels pending hover after Escape or pointer exit', () => {
    vi.useFakeTimers()
    const ui = render(createElement(XonHeader, { locale: 'ru' }))
    const menu = ui.container.querySelector<HTMLDetailsElement>('.xon-services-disclosure')!
    pointer(menu, 'pointerover', 'mouse')
    act(() => { vi.advanceTimersByTime(150) })
    expect(menu.open).toBe(true)
    pointer(menu, 'pointerout', 'mouse')
    expect(menu.open).toBe(false)
    pointer(menu, 'pointerover', 'mouse')
    fireEvent.keyDown(document.body, { key: 'Escape' })
    act(() => { vi.advanceTimersByTime(150) })
    expect(menu.open).toBe(false)
  })

  it('keeps a tap-opened desktop disclosure open when a touch pointer leaves', () => {
    const ui = render(createElement(XonHeader, { locale: 'ru' }))
    const menu = ui.container.querySelector<HTMLDetailsElement>('.xon-services-disclosure')!
    fireEvent.click(menu.querySelector('summary')!)
    pointer(menu, 'pointerout', 'touch')
    expect(menu.open).toBe(true)
  })
})
