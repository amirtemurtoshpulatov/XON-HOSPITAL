import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { buildConfig, getPayload, type Payload } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Users } from '@/collections/Users'
import { Leads } from '@/collections/Leads'
import { LeadComments } from '@/collections/LeadComments'
import type { Lead, User } from '@/payload-types'

let payload: Payload
let directory: string
let owner: User, manager: User, editor: User, lead: Lead
beforeAll(async () => {
  directory = await mkdtemp(join(tmpdir(), 'xon-crm-test-'))
  const config = buildConfig({ secret: 'isolated-test-secret-not-for-production', collections: [Users, Leads, LeadComments], db: sqliteAdapter({ client: { url: `file:${directory}/test.db` }, push: true }), typescript: { autoGenerate: false } })
  payload = await getPayload({ config, key: `crm-${directory}` })
  owner = await payload.create({ collection: 'users', data: { email: 'owner@example.invalid', password: 'test-password-only', role: 'owner', name: 'Test owner' } })
  manager = await payload.create({ collection: 'users', data: { email: 'manager@example.invalid', password: 'test-password-only', role: 'manager', name: 'Test manager' } })
  editor = await payload.create({ collection: 'users', data: { email: 'editor@example.invalid', password: 'test-password-only', role: 'editor', name: 'Test editor' } })
  lead = await payload.create({ collection: 'leads', data: { name: 'Synthetic CRM test', phone: '+00000000000', consent: true, status: 'new' } })
}, 60000)
afterAll(async () => { if (payload) await payload.destroy(); if (directory) await rm(directory, { recursive: true, force: true }) })

describe('CRM role enforcement and audit history', () => {
  it('denies anonymous and editor access to patient leads', async () => {
    await expect(payload.find({ collection: 'leads', overrideAccess: false })).rejects.toThrow()
    await expect(payload.findByID({ collection: 'leads', id: lead.id, user: editor, overrideAccess: false })).rejects.toThrow()
  })
  it('allows manager status updates but refuses deletion', async () => {
    const changed = await payload.update({ collection: 'leads', id: lead.id, data: { status: 'processing', statusHistory: [{ from: 'forged', to: 'forged', authorName: 'forged' }] }, user: manager, overrideAccess: false })
    expect(changed.status).toBe('processing')
    expect(changed.statusHistory?.at(-1)).toMatchObject({ from: 'new', to: 'processing', authorName: 'Test manager' })
    expect(changed.statusHistory?.some((row) => row.to === 'forged')).toBe(false)
    await expect(payload.delete({ collection: 'leads', id: lead.id, user: manager, overrideAccess: false })).rejects.toThrow()
    expect((await payload.findByID({ collection: 'leads', id: lead.id })).id).toBe(lead.id)
  })
  it('prevents a manager from creating staff or escalating their role', async () => {
    await expect(payload.create({ collection: 'users', data: { email: 'forbidden@example.invalid', password: 'test-password-only', role: 'owner' }, user: manager, overrideAccess: false })).rejects.toThrow()
    await payload.update({ collection: 'users', id: manager.id, data: { name: 'Test manager', role: 'owner' }, user: manager, overrideAccess: false })
    expect((await payload.findByID({ collection: 'users', id: manager.id })).role).toBe('manager')
    await expect(payload.update({ collection: 'users', id: owner.id, data: { name: 'forged' }, user: manager, overrideAccess: false })).rejects.toThrow()
  })
  it('sets comment authors on the server and prevents staff rewriting history', async () => {
    const note = await payload.create({ collection: 'lead-comments', data: { lead: lead.id, text: 'Synthetic note', author: owner.id, authorName: 'forged' }, user: manager, overrideAccess: false })
    expect(note.authorName).toBe('Test manager')
    expect(typeof note.author === 'object' ? note.author?.id : note.author).toBe(manager.id)
    await expect(payload.update({ collection: 'lead-comments', id: note.id, data: { text: 'rewritten' }, user: manager, overrideAccess: false })).rejects.toThrow()
    await expect(payload.delete({ collection: 'lead-comments', id: note.id, user: manager, overrideAccess: false })).rejects.toThrow()
  })
  it('lets the owner create staff and assign a role', async () => {
    const staff = await payload.create({ collection: 'users', data: { email: 'staff@example.invalid', password: 'test-password-only', role: 'editor', name: 'Synthetic staff' }, user: owner, overrideAccess: false })
    expect(staff.role).toBe('editor')
    const changed = await payload.update({ collection: 'users', id: staff.id, data: { role: 'manager' }, user: owner, overrideAccess: false })
    expect(changed.role).toBe('manager')
  })
  it('protects the last owner from demotion or self-deletion', async () => {
    await expect(payload.update({ collection: 'users', id: owner.id, data: { role: 'manager' }, user: owner, overrideAccess: false })).rejects.toThrow()
    await expect(payload.delete({ collection: 'users', id: owner.id, user: owner, overrideAccess: false })).rejects.toThrow()
  })
  it('allows owner deletion and removes related comments', async () => {
    await payload.delete({ collection: 'leads', id: lead.id, user: owner, overrideAccess: false })
    expect((await payload.count({ collection: 'lead-comments', where: { lead: { equals: lead.id } } })).totalDocs).toBe(0)
  })
})
