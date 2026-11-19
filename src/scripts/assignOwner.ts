import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const email = process.env.OWNER_EMAIL?.trim().toLowerCase()
  if (!email) throw new Error('OWNER_EMAIL is required')
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'users', where: { email: { equals: email } }, depth: 0, limit: 2, overrideAccess: true })
  if (docs.length !== 1) throw new Error('The designated existing owner account was not found uniquely; no access changed')
  await payload.update({ collection: 'users', id: docs[0].id, data: { role: 'owner' }, overrideAccess: true })
  payload.logger.info('Designated existing account has owner access; all other roles preserved')
}
main().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1) })
