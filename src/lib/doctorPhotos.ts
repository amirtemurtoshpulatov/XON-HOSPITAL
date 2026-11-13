const seededDoctorPhotos: Record<string, string> = {
  'ruslan-alisherovich': '/doctors/ruslan-alisherovich.jpg',
  'vohid-latipov': '/doctors/vohid-latipov.jpg',
}

export function getSeededDoctorPhoto(slug?: string | null) {
  return slug ? seededDoctorPhotos[slug] : undefined
}
