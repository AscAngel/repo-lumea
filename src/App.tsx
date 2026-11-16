import { useEffect, useState } from 'react'
import { assetUrl, projectTeam, resources, type PdfResource } from './resources'

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
      <div className="placeholder-sheet-title">{variant === 'document' ? 'Technical Report' : 'Project Overview'}</div>
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
    <div className="viewer-card-header"><div><span className="viewer-kind">{resource.kind}</span><h2>{resource.title}</h2></div>{available && <a className="open-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${resource.title} in a new tab`}>Open in new tab <ExternalIcon/></a>}</div>
    <div className={`viewer-frame viewer-${resource.id}`}>
      {available ? <iframe src={`${url}#toolbar=0&navpanes=0`} title={`Preview of ${resource.title}`} loading="lazy"/> : <Placeholder variant={resource.id === 'report' ? 'document' : 'presentation'}/>}
    </div>
  </article>
}

function App() {
  return <div className="site-shell">
    <header className="site-header"><div className="container header-inner"><Logo/><span>PROJECT REPOSITORY</span></div></header>
    <main className="documents-section"><div className="container"><div className="section-heading"><span className="eyebrow">LUMEA / ARCHIVE</span><h1>Project Resources<span>.</span></h1></div>
      <section className="project-link-panel" aria-labelledby="live-project-title">
        <div><span className="eyebrow">LIVE PROJECT</span><h2 id="live-project-title">Explore L.U.M.E.A.</h2><p>lumea.earth</p></div>
        <a className="launch-project-link" href="https://lumea.earth/?lang=en" target="_blank" rel="noopener noreferrer" aria-label="Launch L.U.M.E.A. in a new tab">Launch L.U.M.E.A. <ExternalIcon/></a>
      </section>
      <div className="viewer-list">{resources.map((resource) => <PdfCard key={resource.id} resource={resource}/>)}</div>
    </div></main>
    <footer className="site-footer"><div className="container footer-inner"><div><span className="eyebrow">THE TEAM</span><h2>Created by</h2></div><ul>{projectTeam.map((name) => <li key={name}>{name}</li>)}</ul></div></footer>
  </div>
}

export default App
