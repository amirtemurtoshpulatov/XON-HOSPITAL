import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { localeCodes } from '@/components/XonHome/content'
import { doctorProfile } from '@/lib/xonDoctors'
import { expandedDoctorFocus } from './doctorFocusData'

const normalize = (value: string) => value.trim().toLocaleLowerCase().replace(/[.!?]+$/, '')

async function main() {
  const payload = await getPayload({ config })
  let updated = 0
  for (const locale of localeCodes) {
    const { docs } = await payload.find({ collection: 'doctors', locale, fallbackLocale: false, depth: 0, pagination: false })
    for (const doctor of docs) {
      const additions = expandedDoctorFocus(doctor.slug, locale)
      if (!additions.length) {
        payload.logger.warn(`No confirmed expansion for ${doctor.slug}; preserved`)
        continue
      }
      const profile = doctorProfile(locale, doctor.slug, doctor)
      if (!profile) continue
      const current = profile.focusAreas || []
      const seen = new Set(current.map((entry) => normalize(entry.label)))
      const extra = additions.filter((label) => {
        const key = normalize(label)
        if (seen.has(key)) return false
        seen.add(key)
        return true
      }).map((label) => ({ label }))
      if (!extra.length) continue
      if (process.env.DRY_RUN !== '1') await payload.update({
        collection: 'doctors', id: doctor.id, locale,
        data: {
          ...(!doctor.name ? { name: profile.name } : {}),
          ...(!doctor.specialty ? { specialty: profile.specialty } : {}),
          focusAreas: [...current, ...extra],
        },
      })
      updated++
      payload.logger.info(`${locale}/${doctor.slug}: ${current.length} -> ${current.length + extra.length} reasons${process.env.DRY_RUN === '1' ? ' (preview)' : ''}`)
    }
  }
  payload.logger.info(`Doctor focus ${process.env.DRY_RUN === '1' ? 'preview' : 'update'} complete: ${updated} localized profiles`)
}

main().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1) })
