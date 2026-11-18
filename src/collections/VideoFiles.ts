import { APIError, type CollectionConfig } from 'payload'

const videoMimeTypes = ['video/mp4', 'video/webm']
const maxBytes = 16 * 1024 * 1024

function byteRange(header: string, length: number) {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(header.trim())
  if (!match || (!match[1] && !match[2])) return null
  const start = match[1] ? Number(match[1]) : Math.max(0, length - Number(match[2]))
  const end = match[1] && match[2] ? Math.min(length - 1, Number(match[2])) : length - 1
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= length || start > end) return null
  return { start, end }
}

export const VideoFiles: CollectionConfig = {
  slug: 'video-files',
  labels: { singular: 'Видеофайл', plural: 'Видеофайлы' },
  admin: {
    group: 'Клиника',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'filesize', 'updatedAt'],
    description: 'Файлы MP4 или WebM до 16 МБ. Для более длинных роликов вставьте ссылку на YouTube, Instagram или Vimeo.',
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: ({ isReadingStaticFile }) => isReadingStaticFile ? { id: { exists: true } } : true,
  },
  defaultPopulate: { filename: true },
  fields: [{
    name: 'contents',
    type: 'textarea',
    hidden: true,
    access: { read: () => false },
  }],
  hooks: {
    beforeChange: [({ data, operation, req }) => {
      delete data.contents
      if (!req.file) {
        if (operation === 'create') throw new APIError('Выберите видеофайл MP4 или WebM.', 400)
        return data
      }
      const { data: buffer, mimetype } = req.file
      if (buffer.length > maxBytes) throw new APIError('Максимальный размер видео — 16 МБ.', 413)
      const valid = mimetype === 'video/mp4'
        ? buffer.toString('ascii', 4, 8) === 'ftyp'
        : mimetype === 'video/webm' && buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]))
          && buffer.subarray(0, 256).includes('webm')
      if (!valid) throw new APIError('Загрузите корректный видеофайл MP4 или WebM.', 400)
      return { ...data, contents: buffer.toString('base64') }
    }],
  },
  upload: {
    disableLocalStorage: true,
    focalPoint: false,
    crop: false,
    pasteURL: false,
    hideRemoveFile: true,
    mimeTypes: videoMimeTypes,
    handlers: [(req, { doc }) => {
      const { contents, mimeType } = doc as { contents?: string; mimeType?: string }
      if (!contents || !mimeType || !videoMimeTypes.includes(mimeType)) return new Response(null, { status: 404 })
      const bytes = Uint8Array.from(Buffer.from(contents, 'base64'))
      const headers = new Headers({
        'Accept-Ranges': 'bytes',
        'Content-Type': mimeType,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'public, max-age=60',
      })
      const header = req.headers.get('range')
      if (header) {
        const range = byteRange(header, bytes.length)
        if (!range) {
          headers.set('Content-Range', `bytes */${bytes.length}`)
          return new Response(null, { status: 416, headers })
        }
        const { start, end } = range
        headers.set('Content-Range', `bytes ${start}-${end}/${bytes.length}`)
        headers.set('Content-Length', String(end - start + 1))
        return new Response(req.method === 'HEAD' ? null : bytes.subarray(start, end + 1), { status: 206, headers })
      }
      headers.set('Content-Length', String(bytes.length))
      return new Response(req.method === 'HEAD' ? null : bytes, { headers })
    }],
  },
}
