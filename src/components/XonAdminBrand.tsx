import Image from 'next/image'
import { xonFavicon, xonLogo } from '@/lib/xonBrand'

export function XonAdminLogo() {
  return <Image src={xonLogo.src} alt="XON Hospital" width={136} height={136} unoptimized />
}

export function XonAdminIcon() {
  return <Image src={xonFavicon} alt="XON Hospital" width={36} height={36} unoptimized />
}
