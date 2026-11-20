import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'
import type { NextRequest } from 'next/server'
import { roleOf } from '@/access/roles'

const attempts = new Map<string, { count: number; resetAt: number }>()

export const dynamic = 'force-dynamic'

const collectionContext = () => ({ params: Promise.resolve({ slug: ['leads'] }) })
// Keep the public booking endpoint compatible with the CMS collection API.
export async function GET(request: NextRequest) {
  return REST_GET(configPromise)(request, collectionContext())
}
export const DELETE = (request: NextRequest) => REST_DELETE(configPromise)(request, collectionContext())
export const PATCH = (request: NextRequest) => REST_PATCH(configPromise)(request, collectionContext())
export const PUT = (request: NextRequest) => REST_PUT(configPromise)(request, collectionContext())
export const OPTIONS = (request: NextRequest) => REST_OPTIONS(configPromise)(request, collectionContext())

export async function POST(request: Request) {
  if (request.headers.get('cookie')?.includes('payload-token=') || request.headers.has('authorization')) {
    const payload = await getPayload({ config: configPromise })
    const { user } = await payload.auth({ headers: request.headers })
    if (['owner', 'manager'].includes(roleOf(user) || '')) return REST_POST(configPromise)(request as NextRequest, collectionContext())
  }

  const forwarded = request.headers.get('x-forwarded-for') || 'local'
  const ip = forwarded.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const current = attempts.get(ip)

  if (current && current.resetAt > now && current.count >= 5) {
    return Response.json({ error: 'rate_limit' }, { status: 429 })
  }

  attempts.set(ip, {
    count: current && current.resetAt > now ? current.count + 1 : 1,
    resetAt: current && current.resetAt > now ? current.resetAt : now + 10 * 60 * 1000,
  })

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 })
  }

  if (body.website) return Response.json({ ok: true })

  const name = String(body.name || '').trim().slice(0, 100)
  const phone = String(body.phone || '').trim().slice(0, 40)
  const comment = String(body.comment || '').trim().slice(0, 1000)
  const locale = ['ru', 'uz', 'en', 'kk', 'tg'].includes(String(body.locale))
    ? (String(body.locale) as 'ru' | 'uz' | 'en' | 'kk' | 'tg')
    : 'ru'

  if (name.length < 2 || !/^[+\d\s()\-]{7,40}$/.test(phone) || body.consent !== true) {
    return Response.json({ error: 'validation' }, { status: 422 })
  }

  const payload = await getPayload({ config: configPromise })
  const lead = await payload.create({
    collection: 'leads',
    overrideAccess: true,
    draft: false,
    data: {
      name,
      phone,
      comment,
      consent: true,
      locale,
      preferredContact: ['phone', 'telegram', 'whatsapp'].includes(String(body.preferredContact))
        ? (String(body.preferredContact) as 'phone' | 'telegram' | 'whatsapp')
        : 'phone',
      status: 'new',
      sheetSync: 'pending',
      serviceInterest: String(body.serviceInterest || '').trim().slice(0, 160),
      source: 'website',
      utmSource: String(body.utmSource || '').trim().slice(0, 120),
      utmCampaign: String(body.utmCampaign || '').trim().slice(0, 120),
    },
  })

  return Response.json({ ok: true, id: lead.id }, { status: 201 })
}
