import Image from 'next/image'
import Link from 'next/link'
import { xonLogo } from '@/lib/xonBrand'

export function XonBrand({ href, footer = false, label = 'XON HOSPITAL' }: { href: string; footer?: boolean; label?: string }) {
  return (
    <Link
      className={`xon-brand${footer ? ' xon-brand-footer' : ''}`}
      href={href}
      aria-label={label}
    >
      <Image
        {...xonLogo}
        alt="XON HOSPITAL"
        priority={!footer}
        sizes={footer ? '156px' : '(max-width: 720px) 76px, 92px'}
      />
    </Link>
  )
}
