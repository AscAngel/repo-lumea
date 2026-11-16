import { useEffect, useState } from 'react'
import { assetUrl, resources, type PdfResource } from './resources'

function ExternalIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 5h6v6M19 5l-9 9"/><path d="M19 14v5H5V5h5"/></svg>
}

function Logo() {
  return <div className="brand" aria-label="LUMEA"><span className="brand-mark" aria-hidden="true"><span className="brand-moon"/><span className="brand-star"/></span><span className="brand-name">LUMEA<span>.</span></span></div>
}

function Placeholder({ variant }: { variant: 'document' | 'presentation' }) {
  return <div className={`placeholder placeholder-${variant}`} aria-hidden="true">
    <div className="placeholder-orbit orbit-one"/><div className="placeholder-orbit orbit-two"/>
    <div className="placeholder-sheet">
      <div className="placeholder-sheet-brand"><span className="mini-moon"/>LUMEA</div>
      <div className="placeholder-sheet-title">{variant === 'document' ? 'Documento' : 'Presentación'}</div>
      <div className="placeholder-rule"/>
      {variant === 'document' ? <><i className="placeholder-line"/><i className="placeholder-line medium"/><i className="placeholder-line short"/><i className="placeholder-line"/><i className="placeholder-line medium"/></> : <div className="placeholder-sphere"/>}
    </div>
  </div>
}

function PdfCard({ resource }: { resource: PdfResource }) {
  const url = assetUrl(resource.file)
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch(url, { method: 'HEAD', signal: controller.signal })
      .then((response) => setAvailable(response.ok && !response.headers.get('content-type')?.includes('text/html')))
      .catch(() => setAvailable(false))
    return () => controller.abort()
  }, [url])

  return <article className="viewer-card">
    <div className="viewer-card-header"><div><span className="viewer-kind">{resource.kind}</span><h2>{resource.title}</h2></div>{available && <a className="open-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${resource.title} en otra pestaña`}>Abrir aparte <ExternalIcon/></a>}</div>
    <div className={`viewer-frame viewer-${resource.id}`}>
      {available ? <iframe src={`${url}#toolbar=0&navpanes=0`} title={`Vista previa de ${resource.title}`} loading="lazy"/> : <Placeholder variant={resource.id === 'documento' ? 'document' : 'presentation'}/>}
    </div>
  </article>
}

function App() {
  return <div className="site-shell">
    <header className="site-header"><div className="container header-inner"><Logo/><span>REPOSITORIO DEL PROYECTO</span></div></header>
    <main className="documents-section"><div className="container"><div className="section-heading"><span className="eyebrow">LUMEA / ARCHIVO</span><h1>Documentos<span>.</span></h1></div>
      <div className="viewer-list">{resources.map((resource) => <PdfCard key={resource.id} resource={resource}/>)}</div>
    </div></main>
  </div>
}

export default App
