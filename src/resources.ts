export interface PdfResource {
  id: string
  number: string
  kind: string
  title: string
  /** Fixed path under public. Replace the PDF at this path to update the preview. */
  file: string
}

export const resources: PdfResource[] = [
  {
    id: 'report',
    number: '01',
    kind: 'TECHNICAL REPORT · PDF',
    title: 'Earth Analog Identification and Evaluation',
    file: 'recursos/lumea.pdf',
  },
  {
    id: 'presentation',
    number: '02',
    kind: 'PROJECT PRESENTATION · PDF',
    title: 'Preparing for the Moon and Mars',
    file: 'recursos/lumea-presentation.pdf',
  },
]

export const projectTeam = [
  'Katia Alejandra Ávalos García',
  'Diego Iván Hernández Muñoz',
  'Luis Angel De la Cruz Ascencio',
]

export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
