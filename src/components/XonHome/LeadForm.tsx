'use client'

import { FormEvent, useState } from 'react'
import type { SiteLocale } from './content'

type Props = {
  locale: SiteLocale
  defaultService?: string
  labels: {
    name: string; phone: string; direction: string; directionPlaceholder: string; comment: string
    consent: string; submit: string; success: string; error: string
  }
}

export function LeadForm({ locale, labels, defaultService }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('sending')
    const form = event.currentTarget
    const formData = new FormData(form)
    const params = new URLSearchParams(window.location.search)
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'), phone: formData.get('phone'), serviceInterest: formData.get('service'),
        comment: formData.get('comment'), website: formData.get('website'), consent: formData.get('consent') === 'on',
        preferredContact: 'phone', locale, utmSource: params.get('utm_source'), utmCampaign: params.get('utm_campaign'),
      }),
    })

    if (response.ok) {
      form.reset()
      setState('success')
    } else setState('error')
  }

  return (
    <form className="xon-form" onSubmit={submit}>
      <div className="xon-field"><label htmlFor="lead-name">{labels.name}</label><input id="lead-name" name="name" required minLength={2} autoComplete="name" /></div>
      <div className="xon-field"><label htmlFor="lead-phone">{labels.phone}</label><input id="lead-phone" name="phone" required inputMode="tel" autoComplete="tel" placeholder="+998" /></div>
      <div className="xon-field xon-field-wide"><label htmlFor="lead-service">{labels.direction}</label><input id="lead-service" name="service" defaultValue={defaultService} placeholder={labels.directionPlaceholder} /></div>
      <div className="xon-field xon-field-wide"><label htmlFor="lead-comment">{labels.comment}</label><textarea id="lead-comment" name="comment" rows={3} /></div>
      <input className="xon-honeypot" tabIndex={-1} autoComplete="off" name="website" aria-hidden="true" />
      <label className="xon-consent"><input type="checkbox" name="consent" required /><span>{labels.consent}</span></label>
      <button className="xon-submit" disabled={state === 'sending'} type="submit">{state === 'sending' ? '…' : labels.submit}<span aria-hidden="true">↗</span></button>
      {state === 'success' && <p className="xon-form-status success" role="status">{labels.success}</p>}
      {state === 'error' && <p className="xon-form-status error" role="alert">{labels.error}</p>}
    </form>
  )
}
