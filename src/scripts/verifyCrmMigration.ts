import 'dotenv/config'
import assert from 'node:assert/strict'
import { getPayload, type Migration } from 'payload'
import type { PostgresAdapter } from '@payloadcms/db-postgres'
import config from '@payload-config'
import { migrations } from '@/migrations'

async function main() {
  const url = new URL(process.env.DATABASE_URL || '')
  if (!url.pathname.startsWith('/xon_crm_test_')) throw new Error('Only an isolated xon_crm_test_* database is allowed')
  const payload = await getPayload({ config })
  const typedMigrations = migrations as unknown as Migration[]
  await payload.db.migrate({ migrations: [typedMigrations[0]] })
  const pool = (payload.db as unknown as PostgresAdapter).pool
  await pool.query("INSERT INTO users (email, name) VALUES ('migration@example.invalid', 'Synthetic migration user')")
  await pool.query("INSERT INTO leads (name, phone, consent) VALUES ('Synthetic migration lead', '+00000000000', true)")
  await payload.db.migrate({ migrations: typedMigrations })
  const user = await pool.query("SELECT role FROM users WHERE email='migration@example.invalid'")
  const lead = await pool.query("SELECT status, name FROM leads WHERE name='Synthetic migration lead'")
  assert.equal(user.rows[0]?.role, 'manager')
  assert.equal(lead.rows[0]?.status, 'new')
  assert.equal((await pool.query('SELECT count(*) FROM lead_comments')).rows[0].count, '0')
  await payload.db.migrate({ migrations: typedMigrations })
  payload.logger.info('CRM Postgres clean install, upgrade preservation and repeat migration checks passed')
  await payload.destroy()
}
main().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1) })
