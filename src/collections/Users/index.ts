import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { isOwner, ownerField, ownerOrSelf } from '../../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Сотрудник', plural: 'Сотрудники' },
  access: {
    admin: authenticated,
    create: isOwner,
    delete: isOwner,
    read: ownerOrSelf,
    update: ownerOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
    description: 'Назначать роли и создавать сотрудников может только главный администратор. Выберите сотрудника, измените «Уровень доступа» и сохраните карточку.',
  },
  auth: true,
  fields: [
    { name: 'role', label: 'Уровень доступа', admin: { description: 'Менеджер: заявки без удаления. Редактор: контент без заявок. Главный администратор: полный доступ.' }, type: 'select', required: true, defaultValue: 'manager', saveToJWT: true, access: { create: ownerField, update: ownerField }, options: [
      { label: 'Главный администратор', value: 'owner' },
      { label: 'Менеджер CRM', value: 'manager' },
      { label: 'Редактор сайта', value: 'editor' },
    ] },
    {
      name: 'name',
      label: 'Имя сотрудника',
      type: 'text',
    },
  ],
  hooks: {
    beforeChange: [async ({ data, originalDoc, operation, req }) => {
      // Payload's first-user bootstrap is allowed only before any account exists.
      if (operation === 'create' && !req.user) {
        const existing = await req.payload.count({ collection: 'users', overrideAccess: true, req })
        if (existing.totalDocs === 0) data.role = 'owner'
      }
      if (operation === 'update' && originalDoc?.role === 'owner' && data.role && data.role !== 'owner') {
        const otherOwners = await req.payload.count({ collection: 'users', where: { and: [{ role: { equals: 'owner' } }, { id: { not_equals: originalDoc.id } }] }, overrideAccess: true, req })
        if (!otherOwners.totalDocs) throw new Error('Нельзя понизить доступ последнего главного администратора.')
      }
      return data
    }],
    beforeDelete: [async ({ id, req }) => {
      if (String(id) === String(req.user?.id)) throw new Error('Нельзя удалить собственную учётную запись.')
    }],
  },
  timestamps: true,
}
