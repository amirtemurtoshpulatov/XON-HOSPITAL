import { localizedURLs, siteOrigin } from '@/lib/xonSeo'
import type { SiteLocale } from '@/components/XonHome/content'

import { JsonLd } from './JsonLd'

export function ClinicBreadcrumbs({ locale, section, title, slug }: {
  locale: SiteLocale
  section: { path: '/articles' | '/doctors' | '/services'; label: string }
  title: string
  slug: string
}) {
  const sectionURL = localizedURLs(section.path, [locale])[locale]

  return <JsonLd data={{
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'XON Hospital', item: `${siteOrigin()}/${locale}` },
      { '@type': 'ListItem', position: 2, name: section.label, item: sectionURL },
      { '@type': 'ListItem', position: 3, name: title, item: `${sectionURL}/${slug}` },
    ],
  }} />
}
