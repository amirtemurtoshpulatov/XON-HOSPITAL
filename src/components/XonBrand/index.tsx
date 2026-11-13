import Image from 'next/image'
import Link from 'next/link'

export function XonBrand({ href, footer = false }: { href: string; footer?: boolean }) {
  return (
    <Link
      className={`xon-brand${footer ? ' xon-brand-footer' : ''}`}
      href={href}
      aria-label="XON HOSPITAL — главная"
    >
      <Image
        src="/xon-hospital-logo.jpeg"
        width={720}
        height={720}
        alt="XON HOSPITAL"
        priority={!footer}
        sizes={footer ? '156px' : '(max-width: 720px) 76px, 92px'}
      />
    </Link>
  )
}
