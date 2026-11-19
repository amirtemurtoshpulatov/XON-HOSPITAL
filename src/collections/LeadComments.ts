import { APIError, type CollectionConfig } from 'payload'
import { canManageLeads, isOwner } from '@/access/roles'

export const LeadComments: CollectionConfig = {
  slug: 'lead-comments',
  labels: { singular: 'Комментарий к заявке', plural: 'Комментарии к заявкам' },
  admin: { group: 'CRM', useAsTitle: 'text', defaultColumns: ['createdAt', 'authorName', 'text'], hidden: true },
  access: { create: canManageLeads, read: canManageLeads, update: () => false, delete: isOwner },
  hooks: { beforeValidate: [async ({ data, req, operation }) => {
    if (operation !== 'create' || !data) return data
    if (!req.user) throw new APIError('Требуется вход', 401)
    await req.payload.findByID({ collection: 'leads', id: data.lead, depth: 0, overrideAccess: false, user: req.user, req })
    return { ...data, author: req.user.id, authorName: req.user.name || 'Сотрудник' }
  }] },
  fields: [
    { name: 'lead', label: 'Заявка', type: 'relationship', relationTo: 'leads', required: true, index: true },
    { name: 'text', label: 'Комментарий', type: 'textarea', required: true, minLength: 1, maxLength: 3000 },
    { name: 'author', label: 'Автор', type: 'relationship', relationTo: 'users', admin: { readOnly: true } },
    { name: 'authorName', label: 'Автор', type: 'text', admin: { readOnly: true } },
  ],
  timestamps: true,
}
