// Only public, known route shapes reach Analytics. Never forward query strings,
// fragments, form fields, user identifiers or arbitrary error-page paths.
export function analyticsPage(pathname: string) {
  const publicPath = /^\/(ru|uz|en|kk|tg)(?:\/(?:about|prices|contacts|services|doctors|articles)(?:\/[a-z0-9-]+)?)?$/
  return publicPath.test(pathname) ? `https://xon-hospital.uz${pathname}` : null
}

export function analyticsReferrer(referrer: string) {
  try {
    const url = new URL(referrer)
    return ['https:', 'http:'].includes(url.protocol) ? url.origin : ''
  } catch { return '' }
}
