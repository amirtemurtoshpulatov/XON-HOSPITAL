import { getPayload } from 'payload'
import config from '@payload-config'
import { roleOf } from '@/access/roles'
import { trafficReport } from '@/lib/gaReporting'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'private, no-store', 'Vary': 'Cookie' }
export async function GET(request: Request) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!roleOf(user)) return Response.json({ error: 'forbidden' }, { status: 403, headers })
  const days = Number(new URL(request.url).searchParams.get('days') || 28)
  if (![7, 28, 90].includes(days)) return Response.json({ error: 'invalid_period' }, { status: 400, headers })
  try { return Response.json(await trafficReport(days), { headers }) }
  catch (error) {
    const message = error instanceof Error && error.message === 'analytics_quota' ? 'analytics_quota' : 'analytics_unavailable'
    return Response.json({ state: 'error', error: message }, { status: 503, headers })
  }
}
