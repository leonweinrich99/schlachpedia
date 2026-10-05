export type ArticleSection = {
  id: string
  heading: string
  paragraphs: string[]
}

export type ArticleRevision = {
  id: string
  author: string
  summary: string
  createdAt: string
  content: string
}

export type Article = {
  slug: string
  title: string
  subtitle: string
  lead: string
  sections: ArticleSection[]
  categories: string[]
  lastUpdated: string
  revisionCount: number
  revisions: ArticleRevision[]
}

export const initialArticle: Article = {
  slug: 'schlach',
  title: 'Schlach',
  subtitle: 'Begriff, Geschichte und Bedeutung',
  lead: 'Schlach ist ein Begriff, dessen Bedeutung und Verwendung in unterschiedlichen Zusammenhängen beschrieben werden kann. Dieser Artikel dient als vorläufiger Ausgangspunkt für die gemeinschaftliche Arbeit an Schlachpedia.',
  sections: [
    {
      id: 'ueberblick',
      heading: 'Überblick',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis, nisl at volutpat posuere, erat sapien consequat mauris, vitae faucibus lorem sem a erat. In Schlachpedia werden zentrale Begriffe verständlich, nachvollziehbar und mit Quellen belegt dokumentiert.',
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vel libero eget nunc gravida dignissim. Der vorliegende Text ist ein Platzhalter und kann von registrierten Nutzerinnen und Nutzern erweitert werden.',
      ],
    },
    {
      id: 'geschichte',
      heading: 'Geschichte',
      paragraphs: [
        'Praesent commodo, nisl sit amet porttitor tincidunt, justo lacus tempor erat, vitae dignissim erat neque vitae mi. Die Geschichte des Begriffs lässt sich in mehreren Perspektiven betrachten und soll in zukünftigen Versionen durch belastbare Belege ergänzt werden.',
      ],
    },
    {
      id: 'verwendung',
      heading: 'Verwendung',
      paragraphs: [
        'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. In verschiedenen Kontexten können sich Bedeutung, Aussprache und Gebrauch verändern.',
        'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla porttitor accumsan tincidunt. Diese Sektion ist bewusst offen gehalten, damit die Community sie später gemeinsam präzisieren kann.',
      ],
    },
    {
      id: 'siehe-auch',
      heading: 'Siehe auch',
      paragraphs: ['Lorem ipsum dolor sit amet: verwandte Begriffe und weiterführende Artikel werden hier später verknüpft.'],
    },
  ],
  categories: ['Begriffsklärung', 'Artikel im Aufbau', 'Schlachpedia'],
  lastUpdated: '5. Oktober 2026, 14:32 Uhr',
  revisionCount: 4,
  revisions: [
    { id: '4', author: 'Schlachpedia-Redaktion', summary: 'Platzhalterartikel angelegt', createdAt: '5. Oktober 2026, 14:32 Uhr', content: 'Aktuelle Version des Artikels' },
    { id: '3', author: 'Mira L.', summary: 'Abschnitt Verwendung ergänzt', createdAt: '4. Oktober 2026, 18:11 Uhr', content: 'Vorherige Version des Artikels' },
    { id: '2', author: 'Jonas K.', summary: 'Überblick überarbeitet', createdAt: '2. Oktober 2026, 09:47 Uhr', content: 'Ältere Version des Artikels' },
    { id: '1', author: 'Schlachpedia-Redaktion', summary: 'Artikel erstellt', createdAt: '1. Oktober 2026, 16:20 Uhr', content: 'Erste Version des Artikels' },
  ],
}
