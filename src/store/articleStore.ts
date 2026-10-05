import { create } from 'zustand'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db, firebaseEnabled } from '../lib/firebase'
import { initialArticle, type Article, type ArticleRevision } from '../data/article'

type ArticleDraft = Pick<Article, 'lead' | 'sections'>

type ArticleState = {
  article: Article
  loadArticle: (slug: string) => Promise<void>
  createArticle: (title: string, lead: string) => Promise<string>
  saveRevision: (draft: ArticleDraft, summary: string, author: string) => Promise<void>
  restoreRevision: (revision: ArticleRevision) => Promise<void>
}

const localKey = (slug: string) => `schlachpedia-article-${slug}-v4`

function readLocal(slug = 'schlach'): Article {
  try {
    const stored = localStorage.getItem(localKey(slug))
    return stored ? JSON.parse(stored) as Article : initialArticle
  } catch {
    return initialArticle
  }
}

function articleRef(slug: string) {
  return db ? doc(db, 'articles', slug) : null
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  article: readLocal(),
  loadArticle: async (slug) => {
    const local = readLocal(slug)
    if (local.slug === slug) set({ article: local })
    const ref = firebaseEnabled ? articleRef(slug) : null
    if (!ref) return
    const snapshot = await getDoc(ref)
    if (snapshot.exists()) {
      const remote = snapshot.data() as Article
      if (slug === 'schlach' && remote.contentVersion !== initialArticle.contentVersion) {
        await setDoc(ref, initialArticle)
        set({ article: initialArticle })
      } else set({ article: remote })
    }
    else if (slug === 'schlach') await setDoc(ref, initialArticle)
  },
  createArticle: async (title, lead) => {
    const slug = title.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `artikel-${Date.now()}`
    const createdAt = new Intl.DateTimeFormat('de-DE', { dateStyle: 'long', timeStyle: 'short' }).format(new Date())
    const article: Article = {
      slug,
      title: title.trim(),
      subtitle: 'Artikel im Aufbau',
      lead: lead.trim(),
      sections: [],
      categories: ['Artikel im Aufbau'],
      lastUpdated: createdAt,
      revisionCount: 1,
      contentVersion: 1,
      revisions: [{ id: '1', author: 'Neue Seite', summary: 'Artikel erstellt', createdAt, content: JSON.stringify({ lead: lead.trim(), sections: [] }) }],
    }
    localStorage.setItem(localKey(slug), JSON.stringify(article))
    const ref = firebaseEnabled ? articleRef(slug) : null
    if (ref) await setDoc(ref, article).catch(() => {})
    set({ article })
    return slug
  },
  saveRevision: async (draft, summary, author) => {
    const current = get().article
    const revision: ArticleRevision = {
      id: String(current.revisionCount + 1),
      author,
      summary: summary.trim() || 'Artikel bearbeitet',
      createdAt: new Intl.DateTimeFormat('de-DE', { dateStyle: 'long', timeStyle: 'short' }).format(new Date()),
      content: JSON.stringify(draft),
    }
    const next: Article = {
      ...current,
      ...draft,
      revisionCount: current.revisionCount + 1,
      lastUpdated: revision.createdAt,
      revisions: [revision, ...current.revisions],
    }
    localStorage.setItem(localKey(next.slug), JSON.stringify(next))
    set({ article: next })
    const ref = firebaseEnabled ? articleRef(next.slug) : null
    if (ref) await setDoc(ref, next).catch(() => {})
  },
  restoreRevision: async (revision) => {
    try {
      const draft = JSON.parse(revision.content) as ArticleDraft
      await get().saveRevision(draft, `Version ${revision.id} wiederhergestellt`, 'Angemeldete Nutzerin / angemeldeter Nutzer')
    } catch {
      // Alte Demo-Versionen enthalten keinen strukturierten Artikelinhalt.
      await get().saveRevision({ lead: get().article.lead, sections: get().article.sections }, `Version ${revision.id} wiederhergestellt`, 'Angemeldete Nutzerin / angemeldeter Nutzer')
    }
  },
}))
