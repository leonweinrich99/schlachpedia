import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ChevronDown, Edit3, History, Menu, Search, UserCircle, X } from 'lucide-react'
import { useArticleStore } from '../store/articleStore'
import { useAuthStore } from '../store/authStore'
import type { Article, ArticleRevision } from '../data/article'

export function ArticlePage() {
  const article = useArticleStore((state) => state.article)
  const loadRemote = useArticleStore((state) => state.loadRemote)
  const saveRevision = useArticleStore((state) => state.saveRevision)
  const restoreRevision = useArticleStore((state) => state.restoreRevision)
  const user = useAuthStore((state) => state.user)
  const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle)
  const signOutUser = useAuthStore((state) => state.signOutUser)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(article.lead)
  const [editSummary, setEditSummary] = useState('')
  const [search, setSearch] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const [activeTab, setActiveTab] = useState<'article' | 'discussion' | 'history'>('article')

  useEffect(() => { void loadRemote() }, [loadRemote])

  const searchResults = useMemo(() => {
    if (!search.trim()) return []
    const needle = search.toLowerCase()
    return article.sections.filter((section) => `${section.heading} ${section.paragraphs.join(' ')}`.toLowerCase().includes(needle))
  }, [article.sections, search])

  function startEditing() {
    setDraft(article.lead)
    setEditing(true)
    setActiveTab('article')
  }

  async function publish() {
    await saveRevision(draft, editSummary, user?.displayName || 'Gastbearbeitung')
    setEditing(false)
    setEditSummary('')
  }

  return (
    <div className="wiki-shell">
      <header className="wiki-topbar">
        <button className="wiki-mobile-menu" aria-label="Menü öffnen" onClick={() => setMobileNav((open) => !open)}>{mobileNav ? <X size={20} /> : <Menu size={20} />}</button>
        <Link to="/" className="wiki-brand" aria-label="Schlachpedia Startseite">
          <span className="wiki-brand-mark"><BookOpen size={22} /></span>
          <span><strong>Schlach</strong><em>pedia</em><small>Die freie Enzyklopädie</small></span>
        </Link>
        <div className="wiki-search-wrap">
          <Search size={17} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Schlachpedia durchsuchen" aria-label="Schlachpedia durchsuchen" />
          <kbd>Strg&nbsp; K</kbd>
          {searchResults.length > 0 && <div className="wiki-search-results">{searchResults.map((result) => <button key={result.id} onClick={() => { document.getElementById(result.id)?.scrollIntoView({ behavior: 'smooth' }); setSearch('') }}><strong>{article.title}</strong><span>{result.heading}</span></button>)}</div>}
        </div>
        <div className="wiki-account">
          {user ? <button onClick={() => void signOutUser()} className="wiki-user-button"><UserCircle size={18} /> {user.displayName || 'Konto'} <ChevronDown size={14} /></button> : <button onClick={() => void signInWithGoogle()} className="wiki-login">Anmelden</button>}
        </div>
      </header>

      <div className="wiki-layout">
        <aside className={`wiki-sidebar ${mobileNav ? 'is-open' : ''}`}>
          <nav>
            <p className="wiki-side-heading">Navigation</p>
            <a href="#article">Hauptseite</a><a href="#article">Zufälliger Artikel</a><a href="#history">Aktuelle Änderungen</a><a href="#article">Neue Seite anlegen</a>
            <p className="wiki-side-heading">Mitmachen</p>
            <a href="#edit">Artikel bearbeiten</a><a href="#discussion">Diskussionen</a><a href="#history">Versionsgeschichte</a>
            <p className="wiki-side-heading">Werkzeuge</p>
            <a href="#article">Links auf diese Seite</a><a href="#article">Spezialseiten</a><a href="#article">Druckversion</a>
          </nav>
          <div className="wiki-sidebar-footer">Diese Seite wurde zuletzt am<br /><strong>{article.lastUpdated}</strong> geändert.</div>
        </aside>

        <main className="wiki-main" id="article">
          <div className="wiki-breadcrumb">Schlachpedia <span>/</span> Artikel</div>
          <div className="wiki-tabs-row">
            <div className="wiki-tabs"><button className={activeTab === 'article' ? 'active' : ''} onClick={() => setActiveTab('article')}>Artikel</button><button className={activeTab === 'discussion' ? 'active' : ''} onClick={() => setActiveTab('discussion')}>Diskussion</button></div>
            <div className="wiki-tabs wiki-tabs-right"><button className={activeTab === 'article' ? 'active' : ''} onClick={() => setActiveTab('article')}>Lesen</button><button onClick={startEditing} className={editing ? 'active' : ''}>Bearbeiten</button><button id="history" className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>Versionsgeschichte</button></div>
          </div>

          {activeTab === 'history' ? <HistoryPanel article={article} restoreRevision={restoreRevision} /> : activeTab === 'discussion' ? <DiscussionPanel /> : <>
            <div className="wiki-title-line"><div><h1>{article.title}</h1><p>{article.subtitle}</p></div><span className="wiki-status">Artikel im Aufbau</span></div>
            <div className="wiki-article-meta">Aus Schlachpedia, der freien Enzyklopädie &nbsp;·&nbsp; <a href="#edit">Bearbeiten</a></div>
            <div className="wiki-content-grid">
              <article className="wiki-article-content">
                {editing ? <Editor draft={draft} setDraft={setDraft} editSummary={editSummary} setEditSummary={setEditSummary} publish={publish} cancel={() => setEditing(false)} /> : <>
                  <p className="wiki-lead">{article.lead} <sup>[<a href="#sources">1</a>]</sup></p>
                  <div className="wiki-notice"><strong>Hinweis:</strong> Dieser Artikel ist ein Platzhalter. Hilf mit, ihn zu verbessern, und <button onClick={startEditing}>bearbeite ihn</button>.</div>
                  <div className="wiki-toc"><strong>Inhaltsverzeichnis</strong><button>ausblenden</button>{article.sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><span>{index + 1}</span>{section.heading}</a>)}</div>
                  {article.sections.map((section) => <section className="wiki-section" id={section.id} key={section.id}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
                  <section className="wiki-sources" id="sources"><h2>Einzelnachweise</h2><ol><li>Schlachpedia-Redaktion: Vorläufige Dokumentation des Begriffs „Schlach“, 2026.</li></ol></section>
                </>}
              </article>
              <aside className="wiki-infobox"><h3>Schlach</h3><div className="wiki-infobox-icon">S</div><dl><dt>Artikeltyp</dt><dd>Begriff</dd><dt>Status</dt><dd>Im Aufbau</dd><dt>Sprache</dt><dd>Deutsch</dd><dt>Erste Version</dt><dd>1. Oktober 2026</dd></dl><a href="#edit" onClick={(event) => { event.preventDefault(); startEditing() }}><Edit3 size={14} /> Artikel verbessern</a></aside>
            </div>
            <div className="wiki-categories"><strong>Kategorien:</strong> {article.categories.map((category) => <a key={category} href="#article">{category}</a>)}</div>
          </>}
          <footer className="wiki-footer"><span>Schlachpedia ist ein Projekt der offenen Wissensgemeinschaft.</span><a href="#article">Datenschutz</a><a href="#article">Über Schlachpedia</a><a href="#article">Kontakt</a></footer>
        </main>
      </div>
    </div>
  )
}

function Editor({ draft, setDraft, editSummary, setEditSummary, publish, cancel }: { draft: string; setDraft: (value: string) => void; editSummary: string; setEditSummary: (value: string) => void; publish: () => Promise<void>; cancel: () => void }) {
  return <div className="wiki-editor" id="edit"><div className="wiki-editor-toolbar"><strong>Artikel bearbeiten</strong><span>Quelltext · Vorschau · Hilfe</span></div><textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={12} aria-label="Artikeltext bearbeiten" /><label>Zusammenfassung der Änderung (optional)<input value={editSummary} onChange={(event) => setEditSummary(event.target.value)} placeholder="Was wurde geändert?" /></label><div className="wiki-editor-actions"><button className="wiki-primary" onClick={() => void publish()}>Änderungen veröffentlichen</button><button onClick={cancel}>Abbrechen</button></div><p className="wiki-editor-note">Mit dem Veröffentlichen bestätigst du, dass deine Änderung dem gemeinschaftlichen Aufbau von Schlachpedia dient.</p></div>
}

function HistoryPanel({ article, restoreRevision }: { article: Article; restoreRevision: (revision: ArticleRevision) => Promise<void> }) {
  return <div className="wiki-panel"><div className="wiki-panel-heading"><div><span className="wiki-eyebrow">Artikelpflege</span><h1>Versionsgeschichte</h1></div><History size={30} /></div><p className="wiki-panel-intro">Alle bisherigen Versionen von „{article.title}“. Wähle eine Version aus, um sie wiederherzustellen.</p>{article.revisions.map((revision) => <div className="wiki-revision" key={revision.id}><div className="wiki-revision-dot" /><div className="wiki-revision-info"><strong>Version {revision.id} · {revision.summary}</strong><span>{revision.createdAt} · {revision.author}</span></div><button onClick={() => void restoreRevision(revision)}>Wiederherstellen</button></div>)}</div>
}

function DiscussionPanel() { return <div className="wiki-panel"><span className="wiki-eyebrow">Zusammenarbeit</span><h1>Diskussion: Schlach</h1><p className="wiki-panel-intro">Auf dieser Seite können Fragen, Hinweise und Verbesserungsvorschläge zum Artikel gesammelt werden.</p><div className="wiki-discussion-empty"><BookOpen size={30} /><strong>Noch keine Diskussion</strong><span>Starte die erste Diskussion zu diesem Artikel.</span><button className="wiki-primary">Thema hinzufügen</button></div></div> }
