import type { Access, FieldAccess } from 'payload'

export type AdminRole = 'owner' | 'manager' | 'editor'
export function roleOf(user: unknown): AdminRole | null {
  const role = (user as { role?: string } | null)?.role
  return role === 'owner' || role === 'manager' || role === 'editor' ? role : null
}
export const isOwner: Access = ({ req }) => roleOf(req.user) === 'owner'
export const canManageLeads: Access = ({ req }) => ['owner', 'manager'].includes(roleOf(req.user) || '')
export const canEditContent: Access = ({ req }) => ['owner', 'editor'].includes(roleOf(req.user) || '')
export const ownerField: FieldAccess = ({ req }) => roleOf(req.user) === 'owner'
export const ownerOrSelf: Access = ({ req }) => req.user ? roleOf(req.user) === 'owner' || { id: { equals: req.user.id } } : false
