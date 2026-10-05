import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { BookOpen, ChevronDown, Edit3, History, Menu, Search, UserCircle, X } from 'lucide-react'
import { useArticleStore } from '../store/articleStore'
import { useAuthStore } from '../store/authStore'
import type { Article, ArticleRevision, ArticleSection } from '../data/article'

export function ArticlePage() {
  const article = useArticleStore((state) => state.article)
  const loadArticle = useArticleStore((state) => state.loadArticle)
  const saveRevision = useArticleStore((state) => state.saveRevision)
  const restoreRevision = useArticleStore((state) => state.restoreRevision)
  const user = useAuthStore((state) => state.user)
  const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle)
  const signOutUser = useAuthStore((state) => state.signOutUser)
  const [editing, setEditing] = useState(false)
  const [draftLead, setDraftLead] = useState(article.lead)
  const [draftSections, setDraftSections] = useState<ArticleSection[]>(article.sections)
  const [editSummary, setEditSummary] = useState('')
  const [search, setSearch] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const [activeTab, setActiveTab] = useState<'article' | 'discussion' | 'history'>('article')
  const { slug = 'schlach' } = useParams()
  const [searchParams] = useSearchParams()

  useEffect(() => { void loadArticle(slug) }, [loadArticle, slug])
  useEffect(() => {
    if (searchParams.get('edit') !== '1' || article.slug !== slug) return
    setDraftLead(article.lead)
    setDraftSections(article.sections.map((section) => ({ ...section, paragraphs: [...section.paragraphs] })))
    setEditing(true)
  }, [article, searchParams, slug])

  const searchResults = useMemo(() => {
    if (!search.trim()) return []
    const needle = search.toLowerCase()
    return article.sections.filter((section) => `${section.heading} ${section.paragraphs.join(' ')}`.toLowerCase().includes(needle))
  }, [article.sections, search])

  function startEditing() {
    setDraftLead(article.lead)
    setDraftSections(article.sections.map((section) => ({ ...section, paragraphs: [...section.paragraphs] })))
    setEditing(true)
    setActiveTab('article')
  }

  async function publish() {
    await saveRevision({ lead: draftLead, sections: draftSections }, editSummary, user?.displayName || 'Gastbearbeitung')
    setEditing(false)
    setEditSummary('')
  }

  return (
    <div className="wiki-shell">
      <header className="wiki-topbar">
        <button className="wiki-mobile-menu" aria-label="Menü öffnen" onClick={() => setMobileNav((open) => !open)}>{mobileNav ? <X size={20} /> : <Menu size={20} />}</button>
        <Link to="/" className="wiki-brand" aria-label="Schlachpedia Startseite">
          <span className="wiki-brand-mark"><BookOpen size={22} /></span>
          <span><strong>Schlach</strong><em>pedia</em><small>Das Nachschlachwerk</small></span>
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
            <a href="#article">Hauptseite</a><a href="#article">Zufälliger Artikel</a><a href="#history">Aktuelle Änderungen</a><Link to="/neu">Neue Seite anlegen</Link>
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
                {editing ? <Editor lead={draftLead} setLead={setDraftLead} sections={draftSections} setSections={setDraftSections} editSummary={editSummary} setEditSummary={setEditSummary} publish={publish} cancel={() => setEditing(false)} /> : <>
                  <p className="wiki-lead">{article.lead} <sup>[<a href="#sources">1</a>]</sup></p>
                  <div className="wiki-notice"><strong>Hinweis:</strong> Dieser Artikel ist ein Platzhalter. Hilf mit, ihn zu verbessern, und <button onClick={startEditing}>bearbeite ihn</button>.</div>
                  <TableOfContents sections={article.sections} />
                  {article.sections.map((section) => {
                    const subsectionIds = ['aussprache', 'herleitung', 'schlachruf', 'lebenseinstellung', 'entstehung', 'teilnehmer', 'dauer-alkohol', 'zettler', 'einordnung', 'kroko', 'eck', 'ls10', 'komitee', 'satzung', 'schlachcounter']
                    const isSubsection = subsectionIds.includes(section.id)
                    return <section className={`wiki-section ${isSubsection ? 'wiki-subsection' : ''}`} id={section.id} key={section.id}>{isSubsection ? <h3>{section.heading}</h3> : <h2>{section.heading}</h2>}{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
                  })}
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

function Editor({ lead, setLead, sections, setSections, editSummary, setEditSummary, publish, cancel }: { lead: string; setLead: (value: string) => void; sections: ArticleSection[]; setSections: (value: ArticleSection[]) => void; editSummary: string; setEditSummary: (value: string) => void; publish: () => Promise<void>; cancel: () => void }) {
  function updateSection(id: string, patch: Partial<ArticleSection>) {
    setSections(sections.map((section) => section.id === id ? { ...section, ...patch } : section))
  }

  return <div className="wiki-editor" id="edit"><div className="wiki-editor-toolbar"><strong>Artikel vollständig bearbeiten</strong><span>Alle Bereiche · Vorschau · Hilfe</span></div><label>Einleitung<textarea value={lead} onChange={(event) => setLead(event.target.value)} rows={5} aria-label="Einleitung bearbeiten" /></label>{sections.map((section) => <fieldset className="wiki-editor-section" key={section.id}><legend>{section.heading}</legend><label>Überschrift<input value={section.heading} onChange={(event) => updateSection(section.id, { heading: event.target.value })} /></label><label>Abschnittstext<textarea value={section.paragraphs.join('\n\n')} onChange={(event) => updateSection(section.id, { paragraphs: event.target.value.split(/\n\s*\n/).filter(Boolean) })} rows={7} aria-label={`${section.heading} bearbeiten`} /></label></fieldset>)}<label>Zusammenfassung der Änderung (optional)<input value={editSummary} onChange={(event) => setEditSummary(event.target.value)} placeholder="Was wurde geändert?" /></label><div className="wiki-editor-actions"><button className="wiki-primary" onClick={() => void publish()}>Änderungen veröffentlichen</button><button onClick={cancel}>Abbrechen</button></div><p className="wiki-editor-note">Mit dem Veröffentlichen bestätigst du, dass deine Änderung dem gemeinschaftlichen Aufbau von Schlachpedia dient.</p></div>
}

function HistoryPanel({ article, restoreRevision }: { article: Article; restoreRevision: (revision: ArticleRevision) => Promise<void> }) {
  return <div className="wiki-panel"><div className="wiki-panel-heading"><div><span className="wiki-eyebrow">Artikelpflege</span><h1>Versionsgeschichte</h1></div><History size={30} /></div><p className="wiki-panel-intro">Alle bisherigen Versionen von „{article.title}“. Wähle eine Version aus, um sie wiederherzustellen.</p>{article.revisions.map((revision) => <div className="wiki-revision" key={revision.id}><div className="wiki-revision-dot" /><div className="wiki-revision-info"><strong>Version {revision.id} · {revision.summary}</strong><span>{revision.createdAt} · {revision.author}</span></div><button onClick={() => void restoreRevision(revision)}>Wiederherstellen</button></div>)}</div>
}

function DiscussionPanel() { return <div className="wiki-panel"><span className="wiki-eyebrow">Zusammenarbeit</span><h1>Diskussion: Schlach</h1><p className="wiki-panel-intro">Auf dieser Seite können Fragen, Hinweise und Verbesserungsvorschläge zum Artikel gesammelt werden.</p><div className="wiki-discussion-empty"><BookOpen size={30} /><strong>Noch keine Diskussion</strong><span>Starte die erste Diskussion zu diesem Artikel.</span><button className="wiki-primary">Thema hinzufügen</button></div></div> }

function TableOfContents({ sections }: { sections: ArticleSection[] }) {
  const topLevelIds = ['ueberblick', 'begriff-sprache', 'merkmale', 'ursprung', 'schauplaetze', 'elilolilolilo', 'organisation', 'einzelnachweise']
  const childGroups: Record<string, string[]> = {
    'begriff-sprache': ['aussprache', 'herleitung', 'schlachruf', 'lebenseinstellung'],
    merkmale: ['entstehung', 'teilnehmer', 'dauer-alkohol'],
    ursprung: ['zettler', 'einordnung'],
    schauplaetze: ['kroko', 'eck', 'ls10'],
    organisation: ['komitee', 'satzung', 'schlachcounter'],
  }
  const topLevel = topLevelIds.map((id) => sections.find((section) => section.id === id)).filter((section): section is ArticleSection => Boolean(section))
  return <div className="wiki-toc"><strong>Inhaltsverzeichnis</strong><button>ausblenden</button>{topLevel.map((parent) => {
    const children = (childGroups[parent.id] || []).map((id) => sections.find((section) => section.id === id)).filter((section): section is ArticleSection => Boolean(section))
    return <div className="wiki-toc-group" key={parent.id}><a href={`#${parent.id}`}>{parent.heading}</a>{children.length > 0 && <div className="wiki-toc-children">{children.map((child) => <a key={child.id} href={`#${child.id}`}>{child.heading}</a>)}</div>}</div>
  })}</div>
}
