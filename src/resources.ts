export interface DocumentResource {
  id: string
  number: string
  title: string
  format: string
  /** Archivo dentro de public, por ejemplo: recursos/documento-01.pdf. */
  file?: string
  /** Portada opcional dentro de public. Recomendada para archivos Word. */
  cover?: string
}

export interface VideoResource {
  title: string
  /** Archivo MP4/WebM dentro de public, o URL pública HTTPS. */
  file?: string
  /** Imagen de portada opcional dentro de public. */
  cover?: string
}

export const documents: DocumentResource[] = [
  { id: 'documento-01', number: '01', title: 'Documento 01', format: 'PDF / Word' },
  { id: 'documento-02', number: '02', title: 'Documento 02', format: 'PDF / Word' },
]

export const projectVideo: VideoResource = {
  title: 'Video del proyecto',
}

export function assetUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
