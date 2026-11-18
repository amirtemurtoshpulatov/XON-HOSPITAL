const seededDoctorPhotos: Record<string, string> = {
  'xursand-yusupboyevich': '/doctors/xursand-yusupboyevich.webp',
  'asiljon-abdullaev': '/doctors/asiljon-abdullaev.webp',
  'asilbek-sharofov': '/doctors/asilbek-sharofov.webp',
  'fayzullo-narzullayevich': '/doctors/fayzullo-narzullayevich.webp',
  'ruslan-alisherovich': '/doctors/ruslan-alisherovich.jpg',
  'vohid-latipov': '/doctors/vohid-latipov.webp',
}

export function getSeededDoctorPhoto(slug?: string | null) {
  return slug ? seededDoctorPhotos[slug] : undefined
}
