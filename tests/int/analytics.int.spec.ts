import { describe, expect, it } from 'vitest'
import { analyticsPage, analyticsReferrer } from '@/lib/xonAnalytics'

describe('Analytics data boundaries', () => {
  it('accepts known public routes and excludes admin, APIs and arbitrary paths', () => {
    expect(analyticsPage('/ru/services/dermatology')).toBe('https://xon-hospital.uz/ru/services/dermatology')
    expect(analyticsPage('/uz')).toBe('https://xon-hospital.uz/uz')
    for (const path of ['/admin', '/api/leads', '/ru/person@example.com', '/ru?phone=123', '/ru/articles/acne#patient', '/zz']) expect(analyticsPage(path)).toBeNull()
  })
  it('keeps only the referring origin, without search terms or patient data', () => {
    expect(analyticsReferrer('https://www.google.com/search?q=patient@example.com')).toBe('https://www.google.com')
    expect(analyticsReferrer('https://xon-hospital.uz/ru?phone=123#private')).toBe('https://xon-hospital.uz')
    expect(analyticsReferrer('javascript:alert(1)')).toBe('')
    expect(analyticsReferrer('')).toBe('')
  })
})
