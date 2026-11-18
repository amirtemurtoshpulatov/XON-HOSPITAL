import type { MetadataRoute } from 'next'

import { indexableSite, siteOrigin } from '@/lib/xonSeo'

export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/api/media/file/', '/api/video-files/file/'],
      disallow: ['/admin', '/api', '/next'],
    },
    sitemap: indexableSite() ? `${siteOrigin()}/sitemap.xml` : undefined,
  }
}
