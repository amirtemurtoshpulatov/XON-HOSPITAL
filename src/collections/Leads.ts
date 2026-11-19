import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'

import { canManageLeads, isOwner } from '../access/roles'

const syncLeadToSheets: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create' || !process.env.GOOGLE_SHEETS_WEBHOOK_URL) return doc

  try {
    const response = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: doc.id,
        createdAt: doc.createdAt,
        name: doc.name,
        phone: doc.phone,
        preferredContact: doc.preferredContact,
        service: doc.serviceInterest,
        locale: doc.locale,
        source: doc.source,
        utmSource: doc.utmSource,
        utmCampaign: doc.utmCampaign,
      }),
    })

    if (!response.ok) throw new Error(`Google Sheets webhook returned ${response.status}`)
    await req.payload.update({ collection: 'leads', id: doc.id, data: { sheetSync: 'synced' } })
  } catch {
    await req.payload.update({ collection: 'leads', id: doc.id, data: { sheetSync: 'failed' } })
  }

  return doc
}

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Заявка', plural: 'Заявки' },
  admin: {
    group: 'CRM',
    useAsTitle: 'name',
    defaultColumns: ['createdAt', 'name', 'phone', 'status', 'sheetSync'],
  },
  access: { create: canManageLeads, delete: isOwner, read: canManageLeads, update: canManageLeads },
  hooks: {
    beforeChange: [({ data, originalDoc, req }) => {
      // Never trust a client-provided history. Append changes on the server.
      const previous = originalDoc?.statusHistory || []
      const nextStatus = data.status || originalDoc?.status || 'new'
      data.statusHistory = nextStatus !== originalDoc?.status ? [...previous, {
        from: originalDoc?.status || '', to: nextStatus,
        at: new Date().toISOString(), authorName: req.user?.name || (req.user ? 'Сотрудник' : 'Сайт'),
      }] : previous
      return data
    }],
    beforeDelete: [async ({ id, req }) => {
      await req.payload.delete({ collection: 'lead-comments', where: { lead: { equals: id } }, overrideAccess: true, req })
    }],
    afterChange: [syncLeadToSheets],
  },
  fields: [
    { name: 'name', label: 'Имя', type: 'text', required: true },
    { name: 'phone', label: 'Телефон', type: 'text', required: true, index: true },
    { name: 'preferredContact', label: 'Как связаться', type: 'select', defaultValue: 'phone', options: [
      { label: 'Телефон', value: 'phone' },
      { label: 'Telegram', value: 'telegram' },
      { label: 'WhatsApp', value: 'whatsapp' },
    ] },
    { name: 'serviceInterest', label: 'Интересующее направление', type: 'text' },
    { name: 'comment', label: 'Комментарий', type: 'textarea' },
    { name: 'locale', label: 'Язык', type: 'select', defaultValue: 'ru', options: ['ru', 'uz', 'en', 'kk', 'tg'] },
    { name: 'status', label: 'Статус', type: 'select', defaultValue: 'new', required: true, options: [
      { label: 'Новая', value: 'new' },
      { label: 'В работе', value: 'processing' },
      { label: 'Записан', value: 'booked' },
      { label: 'Завершена', value: 'completed' },
      { label: 'Не удалось связаться', value: 'unreachable' },
    ] },
    { name: 'assignedTo', label: 'Ответственный', type: 'relationship', relationTo: 'users' },
    { name: 'nextContactAt', label: 'Следующий контакт', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'statusHistory', label: 'История статусов', type: 'array', admin: { readOnly: true }, access: { create: () => false, update: () => false }, fields: [
      { name: 'from', label: 'Из', type: 'text' }, { name: 'to', label: 'В', type: 'text' },
      { name: 'at', label: 'Когда', type: 'date' }, { name: 'authorName', label: 'Кто', type: 'text' },
    ] },
    { name: 'source', type: 'text', defaultValue: 'website', admin: { position: 'sidebar' } },
    { name: 'utmSource', type: 'text', admin: { position: 'sidebar' } },
    { name: 'utmCampaign', type: 'text', admin: { position: 'sidebar' } },
    { name: 'sheetSync', label: 'Google Sheets', type: 'select', defaultValue: 'pending', admin: { position: 'sidebar', readOnly: true }, options: [
      { label: 'Ожидает', value: 'pending' },
      { label: 'Синхронизировано', value: 'synced' },
      { label: 'Ошибка', value: 'failed' },
    ] },
    { name: 'consent', label: 'Согласие на обработку данных', type: 'checkbox', required: true },
  ],
}
