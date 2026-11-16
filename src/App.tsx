import { useEffect, useState } from 'react'
import { assetUrl, documents, projectVideo, type DocumentResource } from './resources'

function Icon({ name, size = 20 }: { name: 'arrow' | 'close' | 'external'; size?: number }) {
  const paths = {
    arrow: <><path d="M4 12h16"/><path d="m13 5 7 7-7 7"/></>,
    close: <><path d="M5 5l14 14M19 5 5 19"/></>,
    external: <><path d="M13 5h6v6M19 5l-9 9"/><path d="M19 14v5H5V5h5"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Logo() {
  return <div className="brand" aria-label="LUMEA">
    <span className="brand-mark" aria-hidden="true"><span className="brand-moon"/><span className="brand-star"/></span>
    <span className="brand-name">LUMEA<span className="brand-dot">.</span></span>
  </div>
}

function DocumentPreview({ resource }: { resource: DocumentResource }) {
  if (resource.cover) {
    return <div className="document-preview has-cover"><img src={assetUrl(resource.cover)} alt={`Portada de ${resource.title}`} loading="lazy" /></div>
  }
  if (resource.file?.toLowerCase().endsWith('.pdf')) {
    return <div className="document-preview pdf-cover"><iframe src={`${assetUrl(resource.file)}#page=1&toolbar=0&navpanes=0`} title={`Primera página de ${resource.title}`} loading="lazy" tabIndex={-1} /></div>
  }
  return <div className={`document-preview preview-${resource.id}`} aria-label={`Vista previa ilustrativa de ${resource.title}`}>
    <div className="preview-orbit preview-orbit-a"/><div className="preview-orbit preview-orbit-b"/>
    <div className="preview-sheet">
      <div className="preview-sheet-top"><span className="mini-moon"/><span>LUMEA / {resource.number}</span></div>
      <div className="preview-sheet-title">{resource.title}</div>
      <div className="preview-sheet-rule"/>
      <div className="preview-sheet-line wide"/><div className="preview-sheet-line"/><div className="preview-sheet-line short"/>
      <div className="preview-sheet-visual"><span/><span/><span/></div>
    </div>
    <span className="preview-corner">{resource.number} / {String(documents.length).padStart(2, '0')}</span>
  </div>
}

function DocumentCard({ resource, onPreview }: { resource: DocumentResource; onPreview: (resource: DocumentResource) => void }) {
  const isPdf = resource.file?.toLowerCase().endsWith('.pdf')
  return <article className="document-card">
    <DocumentPreview resource={resource} />
    <div className="card-body">
      <div className="card-meta"><span>LUMEA / {resource.number}</span><span>{resource.format}</span></div>
      <div className="card-bottom"><h3>{resource.title}</h3>{resource.file && (isPdf
        ? <button type="button" className="card-action" onClick={() => onPreview(resource)} aria-label={`Ver ${resource.title}`}><Icon name="arrow"/></button>
        : <a className="card-action" href={assetUrl(resource.file)} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${resource.title}`}><Icon name="arrow"/></a>)}</div>
    </div>
  </article>
}

function PdfDialog({ resource, onClose }: { resource: DocumentResource; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  if (!resource.file) return null
  const url = assetUrl(resource.file)
  return <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
    <section className="pdf-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onMouseDown={(event) => event.stopPropagation()}>
      <div className="dialog-header"><h2 id="dialog-title">{resource.title}</h2><button className="dialog-close" type="button" onClick={onClose} aria-label="Cerrar"><Icon name="close"/></button></div>
      <iframe className="dialog-viewer" src={url} title={resource.title}/>
      <a className="dialog-link" href={url} target="_blank" rel="noopener noreferrer">Abrir archivo <Icon name="external" size={17}/></a>
    </section>
  </div>
}

function VideoPanel() {
  const file = projectVideo.file
  const isLocalVideo = Boolean(file && /\.(mp4|webm|ogg)$/i.test(file))
  return <section className="video-section" id="video">
    <div className="container">
      <div className="section-heading"><span className="eyebrow">LUMEA / VIDEO</span><h2>Video<span>.</span></h2></div>
      <div className="video-panel">
        <div className="video-visual">
          {isLocalVideo ? <video controls preload="metadata" poster={projectVideo.cover ? assetUrl(projectVideo.cover) : undefined}><source src={assetUrl(file!)}/></video> : <>
            <div className="video-planet"/><div className="video-horizon"/><div className="video-grid"/>
            {projectVideo.cover && <img className="video-cover" src={assetUrl(projectVideo.cover)} alt="Portada del video de LUMEA"/>}
            <span className="video-label">LUMEA / PRESENTACIÓN</span>
          </>}
        </div>
        <div className="video-info"><span className="video-index">03 / PROYECTO</span><h3>{projectVideo.title}</h3>{file && !isLocalVideo && <a className="video-link" href={assetUrl(file)} target="_blank" rel="noopener noreferrer">Ver video <Icon name="external" size={18}/></a>}</div>
      </div>
    </div>
  </section>
}

function App() {
  const [selected, setSelected] = useState<DocumentResource | null>(null)
  return <div className="site-shell">
    <header className="site-header"><div className="container header-inner"><Logo/><span>REPOSITORIO DEL PROYECTO</span></div></header>
    <main>
      <section className="documents-section" id="documentos"><div className="container"><div className="section-heading"><span className="eyebrow">LUMEA / ARCHIVO</span><h1>Documentos<span>.</span></h1></div><div className="document-grid">{documents.map((resource) => <DocumentCard key={resource.id} resource={resource} onPreview={setSelected}/>)}</div></div></section>
      <VideoPanel />
    </main>
    {selected && <PdfDialog resource={selected} onClose={() => setSelected(null)}/>}
  </div>
}

export default App
