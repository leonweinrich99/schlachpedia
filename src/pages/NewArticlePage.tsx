import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FilePlus2, ArrowLeft } from 'lucide-react'
import { useArticleStore } from '../store/articleStore'

export function NewArticlePage() {
  const createArticle = useArticleStore((state) => state.createArticle)
  const [title, setTitle] = useState('')
  const [lead, setLead] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (title.trim().length < 2) { setError('Bitte gib einen aussagekräftigen Titel ein.'); return }
    if (lead.trim().length < 20) { setError('Bitte schreibe mindestens einen kurzen Einleitungstext.'); return }
    const slug = await createArticle(title, lead)
    navigate(`/artikel/${slug}?edit=1`)
  }

  return <main className="wiki-main wiki-new-article"><Link to="/" className="wiki-back-link"><ArrowLeft size={15} /> Zurück zum Artikel</Link><div className="wiki-panel-heading"><div><span className="wiki-eyebrow">Schlachpedia</span><h1>Neue Seite anlegen</h1></div><FilePlus2 size={30} /></div><p className="wiki-panel-intro">Lege einen neuen Artikel an. Nach dem Erstellen kannst du weitere Abschnitte, Kategorien und Quellen ergänzen.</p><form className="wiki-new-form" onSubmit={(event) => void submit(event)}><label>Titel<input value={title} onChange={(event) => { setTitle(event.target.value); setError('') }} placeholder="Zum Beispiel: Elilolilolilo" autoFocus /></label><label>Einleitung<textarea value={lead} onChange={(event) => { setLead(event.target.value); setError('') }} rows={7} placeholder="Worum geht es in diesem Artikel?" /></label>{error && <p className="wiki-form-error">{error}</p>}<div className="wiki-editor-actions"><button className="wiki-primary" type="submit">Artikel erstellen</button><Link to="/" className="wiki-cancel-link">Abbrechen</Link></div></form></main>
}
