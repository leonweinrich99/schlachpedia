import { create } from 'zustand'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db, firebaseEnabled } from '../lib/firebase'
import { initialArticle, type Article, type ArticleRevision } from '../data/article'

type ArticleDraft = Pick<Article, 'lead' | 'sections'>

type ArticleState = {
  article: Article
  saveRevision: (draft: ArticleDraft, summary: string, author: string) => Promise<void>
  restoreRevision: (revision: ArticleRevision) => Promise<void>
  loadRemote: () => Promise<void>
}

const localKey = 'schlachpedia-article-v2'

function readLocal(): Article {
  try {
    const stored = localStorage.getItem(localKey)
    return stored ? JSON.parse(stored) as Article : initialArticle
  } catch {
    return initialArticle
  }
}

function articleRef() {
  return db ? doc(db, 'articles', 'schlach') : null
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  article: readLocal(),
  loadRemote: async () => {
    const ref = firebaseEnabled ? articleRef() : null
    if (!ref) return
    const snapshot = await getDoc(ref)
    if (snapshot.exists()) set({ article: snapshot.data() as Article })
    else await setDoc(ref, initialArticle)
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
    localStorage.setItem(localKey, JSON.stringify(next))
    set({ article: next })
    const ref = firebaseEnabled ? articleRef() : null
    if (ref) await setDoc(ref, next)
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
