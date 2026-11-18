import Image from 'next/image'

export function XonAdminLogo() {
  return <Image src="/xon-hospital-logo.jpeg" alt="XON Hospital" width={136} height={136} unoptimized />
}

export function XonAdminIcon() {
  return <Image src="/xon-favicon.png?v=2" alt="XON Hospital" width={36} height={36} unoptimized />
}
