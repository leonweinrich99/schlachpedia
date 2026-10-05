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
  subtitle: 'Feierkonzept und gemeinschaftliche Lebenseinstellung',
  lead: 'Ein Schlach bezeichnet eine gemeinschaftlich beschlossene Feier, die durch Alkoholkonsum, ausgedehnten Spaß und eine ausgelassene Atmosphäre bis spät in die Nacht geprägt ist. Der Begriff beschreibt dabei nicht nur eine einzelne Veranstaltung, sondern auch eine Haltung dazu, wie eine Feierung gestaltet werden soll.',
  sections: [
    {
      id: 'ueberblick',
      heading: 'Überblick',
      paragraphs: [
        'Ein Schlach entsteht, sobald sich die Mehrheit der anwesenden Gruppe darauf geeinigt hat, einen Schlach zu machen. Jede Person kann einen Schlach ausrufen; eine besondere Autorität des Zettlers besteht dabei nicht. Ein Schlach kann geplant oder spontan entstehen.',
        'Für einen Schlach gibt es keine feste Mindestanzahl an Personen. Eine Gruppe mit mehr als zwei Personen gilt jedoch als besonders empfehlenswert. Der Zettler muss nicht anwesend sein, wird als Kernmitglied der Schlach-Kultur aber besonders gern gesehen.',
      ],
    },
    {
      id: 'merkmale',
      heading: 'Merkmale',
      paragraphs: [
        'Eine Feier muss zunächst als Schlach bezeichnet werden. Der Schlachruf „Wir machen Schlach“ sollte in der Regel ebenfalls erklingen, ist aber keine zwingende Voraussetzung. In den allermeisten Fällen wird er lautstark gerufen.',
        'Als derzeit notwendiges Merkmal gilt der Konsum von Alkohol. Eine Methode, einen Schlach ohne Alkoholeinfluss durchzuführen, ist bislang weder untersucht noch nachgewiesen und gilt daher als Mythos. Diese Beschreibung ist eine Binnenregel des Konzepts und keine Empfehlung zu riskantem Alkoholkonsum.',
        'Ein Schlach muss bis spät in die Nacht andauern. Außerdem wird ein Besuch im Eck ausdrücklich empfohlen. Eine besondere Anzahl an Gästen oder die Anwesenheit des Zettlers ist dagegen nicht erforderlich.',
      ],
    },
    {
      id: 'ursprung',
      heading: 'Ursprung und Überlieferung',
      paragraphs: [
        'Der Begriff wird in den überlieferten Erzählungen maßgeblich auf den Zettler zurückgeführt. Der Zettler, bürgerlich Niklas Zettl, prägte und lebte den Begriff seit seiner Ankunft in der Domstadt Fulda vor, insbesondere im Umfeld der LS10.',
        'Ein einzelnes Gründungsereignis lässt sich nicht datieren. Wahrscheinlich haben auch andere Personen und Vorgänger zur Entstehung beigetragen. Im gegenwärtigen Kontext gilt der Zettler dennoch als maßgeblicher Präger und frühes Vorbild des Schlachs.',
        'Die Herleitung aus dem deutschen Wort „Schlag“ beschreibt den Einschlag von Spaß und Freude auf einen Abend. Ob es sich dabei um eine tatsächliche sprachgeschichtliche Herleitung oder um eine nachträgliche Erklärung der Schlach-Kultur handelt, ist nicht abschließend belegt.',
      ],
    },
    {
      id: 'ls10',
      heading: 'LS10',
      paragraphs: [
        'Die LS10 ist ein Gebäude in Fulda, in dem sich eine Wohngemeinschaft befindet, in der der Zettler lebt. Sie ist nicht der Ursprungsort des Schlachs, spielt aber als Schauplatz eine wichtige Rolle.',
        'In der LS10 wurden bereits Schläge durchgeführt. Als typische Bereiche gelten insbesondere die Küche und der Flur, in denen WG-Partys und Schläge stattfinden können.',
      ],
    },
    {
      id: 'elilolilolilo',
      heading: 'Elilolilolilo',
      paragraphs: [
        'Elilolilolilo bezeichnet die Afterparty, bei der Spaghetti Aglio e Olio gegessen werden. Das Event findet im Zusammenhang mit Feierungen und Schlägen in der LS10 statt, gehört aber nicht zwangsläufig zu jedem Schlach.',
        'Der Name ist eine vereinfachte Aussprache des Gerichts. Zu später Stunde kann Spaghetti Aglio e Olio nicht mehr vollständig ausgesprochen werden, weshalb sich die verkürzte Form Elilolilolilo etabliert hat.',
        'Ein guter Schlach kann zu Elilolilolilo führen, muss es aber nicht. Umgekehrt gilt: Ein guter Schlach kann auch ohne Elilolilolilo auskommen.',
      ],
    },
    {
      id: 'sprache',
      heading: 'Begriff und Sprache',
      paragraphs: [
        'Die Mehrzahl von Schlach lautet „Schläge“. Die Form „Schlachs“ wird nicht verwendet, da sie sich nach der überlieferten Sprachregel der Schlach-Kultur nicht gut ausspricht.',
        'Der Begriff Schlach steht damit sowohl für eine konkrete Feier als auch für eine Lebenseinstellung: eine bewusste Entscheidung, eine Feierung gemeinsam, ausgelassen und bis spät in die Nacht zu gestalten.',
      ],
    },
    {
      id: 'einordnung',
      heading: 'Einordnung der Überlieferungen',
      paragraphs: [
        'Die Entstehungsgeschichte des Schlachs beruht derzeit vor allem auf Erzählungen. In diesem Artikel werden belegte Angaben, mündliche Überlieferungen und legendäre Ausschmückungen deshalb getrennt betrachtet.',
        'Ob ein Ereignis ein Schlach war, gilt innerhalb der Gruppe meist als eindeutig. In strittigen Fällen kann die Einordnung jedoch im Komitee diskutiert werden. Die Zusammensetzung und Arbeitsweise dieses Komitees ist Gegenstand weiterer Artikel.',
      ],
    },
  ],
  categories: ['Schlach-Kultur', 'Feierformen', 'Fulda', 'Artikel im Aufbau'],
  lastUpdated: '5. Oktober 2026, 14:32 Uhr',
  revisionCount: 4,
  revisions: [
    { id: '4', author: 'Schlachpedia-Redaktion', summary: 'Platzhalterartikel angelegt', createdAt: '5. Oktober 2026, 14:32 Uhr', content: 'Aktuelle Version des Artikels' },
    { id: '3', author: 'Mira L.', summary: 'Abschnitt Verwendung ergänzt', createdAt: '4. Oktober 2026, 18:11 Uhr', content: 'Vorherige Version des Artikels' },
    { id: '2', author: 'Jonas K.', summary: 'Überblick überarbeitet', createdAt: '2. Oktober 2026, 09:47 Uhr', content: 'Ältere Version des Artikels' },
    { id: '1', author: 'Schlachpedia-Redaktion', summary: 'Artikel erstellt', createdAt: '1. Oktober 2026, 16:20 Uhr', content: 'Erste Version des Artikels' },
  ],
}
