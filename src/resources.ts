export interface PdfResource {
  id: string
  number: string
  kind: string
  title: string
  /** Ruta fija dentro de public. Basta con copiar el PDF con este nombre. */
  file: string
}

export const resources: PdfResource[] = [
  {
    id: 'documento',
    number: '01',
    kind: 'GOOGLE DOCS · PDF',
    title: 'Documento de LUMEA',
    file: 'recursos/lumea.pdf',
  },
  {
    id: 'presentacion',
    number: '02',
    kind: 'CANVA · PDF',
    title: 'Presentación de LUMEA',
    file: 'recursos/lumea-presentation.pdf',
  },
]

export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
