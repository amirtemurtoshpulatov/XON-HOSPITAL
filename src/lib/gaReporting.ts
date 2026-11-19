import 'server-only'
import { createSign } from 'node:crypto'
import { readFile } from 'node:fs/promises'

export type TrafficReport = {
  state: 'ready'; days: number; updatedAt: string
  users: number; sessions: number; views: number; activeNow: number
  daily: { date: string; users: number; views: number }[]
  channels: { name: string; sessions: number }[]
  pages: { path: string; views: number }[]
}
type GAResponse = { rows?: { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }[] }
let token: { value: string; expires: number } | null = null
const reports = new Map<number, { expires: number; value: TrafficReport }>()
const flights = new Map<number, Promise<TrafficReport>>()
const endpoint = 'https://analyticsdata.googleapis.com/v1beta'

async function accessToken() {
  if (token && token.expires > Date.now()) return token.value
  const file = process.env.GA_SERVICE_ACCOUNT_FILE
  if (!file) throw new Error('analytics_not_configured')
  const credentials = JSON.parse(await readFile(file, 'utf8')) as { client_email?: string; private_key?: string; type?: string }
  if (credentials.type !== 'service_account' || !credentials.client_email || !credentials.private_key) throw new Error('analytics_credentials_invalid')
  const now = Math.floor(Date.now() / 1000)
  const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString('base64url')
  const input = `${encode({ alg: 'RS256', typ: 'JWT' })}.${encode({ iss: credentials.client_email, scope: 'https://www.googleapis.com/auth/analytics.readonly', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 })}`
  const signature = createSign('RSA-SHA256').update(input).sign(credentials.private_key, 'base64url')
  const response = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${input}.${signature}` }), signal: AbortSignal.timeout(10000), cache: 'no-store' })
  if (!response.ok) throw new Error('analytics_auth_failed')
  const data = await response.json() as { access_token: string; expires_in: number }
  if (!data.access_token) throw new Error('analytics_auth_failed')
  token = { value: data.access_token, expires: Date.now() + Math.max(0, data.expires_in - 120) * 1000 }
  return token.value
}
async function requestReport(method: 'runReport' | 'runRealtimeReport', body: unknown): Promise<GAResponse> {
  const property = process.env.GA_PROPERTY_ID
  if (!property || !/^\d+$/.test(property)) throw new Error('analytics_not_configured')
  const response = await fetch(`${endpoint}/properties/${property}:${method}`, {
    method: 'POST', headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body), cache: 'no-store', signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error(response.status === 429 ? 'analytics_quota' : 'analytics_api_unavailable')
  return response.json()
}
const metric = (row: NonNullable<GAResponse['rows']>[number] | undefined, index = 0) => Number(row?.metricValues?.[index]?.value || 0)
async function load(days: number): Promise<TrafficReport> {
  const dates = { dateRanges: [{ startDate: `${days - 1}daysAgo`, endDate: 'today' }] }
  const [totals, daily, channels, pages, live] = await Promise.all([
    requestReport('runReport', { ...dates, metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }] }),
    requestReport('runReport', { ...dates, dimensions: [{ name: 'date' }], metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }], orderBys: [{ dimension: { dimensionName: 'date' } }] }),
    requestReport('runReport', { ...dates, dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }], orderBys: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 8 }),
    requestReport('runReport', { ...dates, dimensions: [{ name: 'pagePath' }], metrics: [{ name: 'screenPageViews' }], orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 8 }),
    requestReport('runRealtimeReport', { metrics: [{ name: 'activeUsers' }] }),
  ])
  return {
    state: 'ready', days, updatedAt: new Date().toISOString(), users: metric(totals.rows?.[0]), sessions: metric(totals.rows?.[0], 1), views: metric(totals.rows?.[0], 2), activeNow: metric(live.rows?.[0]),
    daily: (daily.rows || []).map((row) => ({ date: row.dimensionValues?.[0]?.value || '', users: metric(row), views: metric(row, 1) })),
    channels: (channels.rows || []).map((row) => ({ name: row.dimensionValues?.[0]?.value || '', sessions: metric(row) })),
    pages: (pages.rows || []).map((row) => ({ path: row.dimensionValues?.[0]?.value || '', views: metric(row) })),
  }
}
export async function trafficReport(days: number) {
  if (![7, 28, 90].includes(days)) throw new Error('invalid_period')
  if (!process.env.GA_PROPERTY_ID || !process.env.GA_SERVICE_ACCOUNT_FILE) return { state: 'setup_required' as const }
  const cached = reports.get(days)
  if (cached && cached.expires > Date.now()) return cached.value
  const pending = flights.get(days)
  if (pending) return pending
  const flight = load(days).then((value) => { reports.set(days, { value, expires: Date.now() + 300000 }); return value }).finally(() => flights.delete(days))
  flights.set(days, flight)
  return flight
}
