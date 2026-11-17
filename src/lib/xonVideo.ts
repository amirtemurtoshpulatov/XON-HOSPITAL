const officialShorts: Record<string, string> = {
  'asilbek-sharofov': 'Pe2UIgiQ92Y',
  'fayzullo-narzullayevich': '_tGdyYBkUlU',
  'vohid-latipov': 'XSZBNr3axQI',
  'zafar-abdirazzakov': 'X9xt6SdZfBI',
  'ruslan-alisherovich': 'N6vEw7bZIWs',
}

const officialReels: Record<string, string> = {
  'xursand-yusupboyevich': 'DfFBaIAoZmj',
  'asilbek-sharofov': 'DfWk_eTINT-',
  'fayzullo-narzullayevich': 'DfOtyIlo8PU',
  'vohid-latipov': 'DfUauc7I9Zd',
  'zafar-abdirazzakov': 'DfWX_HtIDC0',
  'ruslan-alisherovich': 'DfKLM4FIOR3',
}

export function officialDoctorReel(slug: string) {
  const id = officialReels[slug]
  return typeof id === 'string' ? `https://www.instagram.com/reel/${id}/` : undefined
}

export function officialDoctorVideo(slug: string) {
  const id = officialShorts[slug]
  return typeof id === 'string' ? `https://www.youtube.com/shorts/${id}` : undefined
}

export function videoEmbed(url: string) {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') return null
    const parts = parsed.pathname.split('/').filter(Boolean)
    const [section, pathId] = parts
    if (['www.youtube.com', 'youtube.com', 'm.youtube.com', 'youtu.be', 'www.youtube-nocookie.com'].includes(parsed.hostname)) {
      const id = parsed.hostname === 'youtu.be' ? section : ['shorts', 'embed'].includes(section) ? pathId : parsed.searchParams.get('v')
      return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }
    if (['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'].includes(parsed.hostname)) {
      const id = section === 'video' ? pathId : section
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null
    }
    if (['www.instagram.com', 'instagram.com'].includes(parsed.hostname)) {
      const kinds = ['reel', 'reels', 'p', 'tv']
      const [kind, id] = kinds.includes(section) ? parts : parts.slice(1)
      if (kinds.includes(kind) && /^[\w-]+$/.test(id || '')) {
        return `https://www.instagram.com/${kind === 'reels' ? 'reel' : kind}/${id}/embed/`
      }
    }
  } catch {
    return null
  }
  return null
}

export function httpsLink(url?: string | null) {
  if (!url) return null
  try {
    return new URL(url).protocol === 'https:' ? url : null
  } catch {
    return null
  }
}
