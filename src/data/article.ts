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
  contentVersion: number
  revisions: ArticleRevision[]
}

export const initialArticle: Article = {
  slug: 'schlach',
  title: 'Schlach',
  subtitle: 'Feierkonzept und gemeinschaftliche Lebenseinstellung',
  lead: 'Ein Schlach [ʃlax] (Plural: Schläge [ˈʃlɛːɡə]) bezeichnet eine gemeinschaftlich beschlossene Feier, die durch Alkoholkonsum, ausgedehnten Spaß und eine ausgelassene Atmosphäre bis spät in die Nacht geprägt ist. Der Begriff beschreibt dabei nicht nur eine einzelne Veranstaltung, sondern auch eine Haltung dazu, wie eine Feierung gestaltet werden soll. [1]',
  sections: [
    { id: 'ueberblick', heading: '1 Überblick', paragraphs: ['Ein Schlach ist sowohl eine konkrete Feier als auch eine Lebenseinstellung. Er entsteht durch gemeinsamen Beschluss, kann geplant oder spontan sein und folgt keinem festen Ablauf; jeder Schlach entwickelt sich individuell.', 'Typische Schauplätze sind das Kroko, das Eck und die LS10. Die Regeln der Schlach-Kultur sind in einer Satzung festgehalten.'] },
    { id: 'begriff-sprache', heading: '2 Begriff und Sprache', paragraphs: [] },
    { id: 'aussprache', heading: '2.1 Aussprache und Mehrzahl', paragraphs: ['Schlach wird mit einem Ach-Laut wie in „Bach“ ausgesprochen [ʃlax]. Die Mehrzahl lautet „Schläge“ [ˈʃlɛːɡə]. Die Form „Schlachs“ wird nicht verwendet, da sie sich nach der überlieferten Sprachregel der Schlach-Kultur nicht gut ausspricht.'] },
    { id: 'herleitung', heading: '2.2 Herleitung', paragraphs: ['Die Herleitung aus dem deutschen Wort „Schlag“ beschreibt den Einschlag von Spaß und Freude auf einen Abend. Ob es sich dabei um eine tatsächliche sprachgeschichtliche Herleitung oder um eine nachträgliche Erklärung der Schlach-Kultur handelt, ist nicht abschließend belegt.'] },
    { id: 'schlachruf', heading: '2.3 Schlachruf', paragraphs: ['Der Schlachruf „Wir machen Schlach“ sollte in der Regel erklingen, ist aber keine zwingende Voraussetzung. In den allermeisten Fällen wird er lautstark gerufen.'] },
    { id: 'lebenseinstellung', heading: '2.4 Schlach als Lebenseinstellung', paragraphs: ['Der Begriff Schlach steht sowohl für eine konkrete Feier als auch für eine Lebenseinstellung: eine bewusste Entscheidung, eine Feierung gemeinsam, ausgelassen und bis spät in die Nacht zu gestalten.'] },
    { id: 'merkmale', heading: '3 Merkmale', paragraphs: [] },
    { id: 'entstehung', heading: '3.1 Entstehung', paragraphs: ['Eine Feier muss zunächst als Schlach bezeichnet werden. Ein Schlach entsteht, sobald sich die Mehrheit der anwesenden Gruppe darauf geeinigt hat, einen Schlach zu machen. Jede Person kann einen Schlach ausrufen; eine besondere Autorität des Zettlers besteht dabei nicht. Ein Schlach kann geplant oder spontan entstehen.'] },
    { id: 'teilnehmer', heading: '3.2 Teilnehmer', paragraphs: ['Für einen Schlach gibt es keine feste Mindestanzahl an Personen. Eine Gruppe mit mehr als zwei Personen gilt jedoch als besonders empfehlenswert. Der Zettler muss nicht anwesend sein, wird als Kernmitglied der Schlach-Kultur aber besonders gern gesehen.'] },
    { id: 'dauer-alkohol', heading: '3.3 Dauer und Alkohol', paragraphs: ['Ein Schlach muss bis spät in die Nacht andauern. Außerdem wird ein Besuch im Eck ausdrücklich empfohlen.', 'Als derzeit notwendiges Merkmal gilt der Konsum von Alkohol. Eine Methode, einen Schlach ohne Alkoholeinfluss durchzuführen, ist bislang weder untersucht noch nachgewiesen und gilt daher als Mythos.'] },
    { id: 'ursprung', heading: '4 Ursprung und Überlieferung', paragraphs: ['Die Entstehungsgeschichte des Schlachs beruht derzeit vor allem auf Erzählungen. In diesem Artikel werden belegte Angaben, mündliche Überlieferungen und legendäre Ausschmückungen deshalb getrennt betrachtet.'] },
    { id: 'zettler', heading: '4.1 Der Zettler', paragraphs: ['Der Begriff wird in den überlieferten Erzählungen maßgeblich auf den Zettler zurückgeführt. Der Zettler, bürgerlich Niklas Zettl, prägte und lebte den Begriff seit seiner Ankunft in der Domstadt Fulda vor, insbesondere im Umfeld der LS10.', 'Ein einzelnes Gründungsereignis lässt sich nicht datieren. Wahrscheinlich haben auch andere Personen und Vorgänger zur Entstehung beigetragen. Im gegenwärtigen Kontext gilt der Zettler dennoch als maßgeblicher Präger und frühes Vorbild des Schlachs.'] },
    { id: 'einordnung', heading: '4.2 Einordnung der Überlieferungen', paragraphs: ['Die Entstehungsgeschichte des Schlachs beruht derzeit vor allem auf Erzählungen. In diesem Artikel werden belegte Angaben, mündliche Überlieferungen und legendäre Ausschmückungen deshalb getrennt betrachtet.', 'Ob ein Ereignis ein Schlach war, gilt innerhalb der Gruppe meist als eindeutig. In strittigen Fällen kann die Einordnung jedoch im Komitee diskutiert werden (siehe Abschnitt 7.1).'] },
    { id: 'schauplaetze', heading: '5 Schauplätze', paragraphs: ['Schläge finden an vielen Orten statt, es gibt jedoch einige Hauptplätze. Ein Schlach führt meist vom Kroko weiter ins Eck.'] },
    { id: 'kroko', heading: '5.1 Kroko', paragraphs: ['Das Kroko (offiziell: Krokodil) ist eine Bar in Fulda und die Stammkneipe der Schlach-Kultur. Es etablierte sich unter anderem durch besonders günstige Preise für Studenten.', 'Legenden nennen dabei häufig den „goldenen Zehner“: 2 Bier zu je 3,50 € (7 €) und 3 Pfeffi (Pfefferminzlikör) zu je 1 € (3 €), zusammen 10 €. Der Preis gilt jedoch als einer, nicht aber als der eigentliche Grund für einen Besuch. Man geht gerne dorthin, und das Kroko fungiert als „Wohnzimmer des Schlachs“. Es ist die Hauptanlaufstelle für Schläge, die meist von dort weiter ins Eck führen.'] },
    { id: 'eck', heading: '5.2 Das Eck', paragraphs: ['Das Eck ist eine Kneipe, die meist als letzte noch geöffnet hat und in der man ein letztes Getränk bekommt. Da es in der Regel auf dem Heimweg liegt, gilt ein Nicht-Einkehren als sehr schwer. Ein Besuch dort ist für einen gelungenen Schlach ausdrücklich empfohlen, aber nicht zwingend vorgeschrieben.', 'Im Jahr 2026 wurde das Eck besonders häufig besucht; auch zuvor gehörte es schon zur Schlach-Kultur, jedoch nicht in diesem Ausmaß. Das Eck gilt außerdem als Begründung des Hutmanns und der Hutmänner. Die zugehörige Legende wird in einem eigenen Artikel behandelt.'] },
    { id: 'ls10', heading: '5.3 LS10', paragraphs: ['Die LS10 ist ein Gebäude in Fulda, in dem sich eine Wohngemeinschaft befindet, in der der Zettler lebt. Sie ist nicht der Ursprungsort des Schlachs, spielt aber als Schauplatz eine wichtige Rolle und ist der wichtigste Ort für Schläge im privaten Rahmen.', 'In der LS10 wurden bereits Schläge durchgeführt. Als typische Bereiche gelten insbesondere die Küche und der Flur, in denen WG-Partys und Schläge stattfinden können.'] },
    { id: 'elilolilolilo', heading: '6 Elilolilolilo', paragraphs: ['Elilolilolilo bezeichnet die Afterparty, bei der Spaghetti Aglio e Olio gegessen werden. Das Event findet im Zusammenhang mit Feierungen und Schlägen in der LS10 statt, gehört aber nicht zwangsläufig zu jedem Schlach.', 'Der Name ist eine vereinfachte Aussprache des Gerichts. Zu später Stunde kann Spaghetti Aglio e Olio nicht mehr vollständig ausgesprochen werden, weshalb sich die verkürzte Form Elilolilolilo etabliert hat.', 'Ein guter Schlach kann zu Elilolilolilo führen, muss es aber nicht. Umgekehrt gilt: Ein guter Schlach kann auch ohne Elilolilolilo auskommen. Nach der Satzung dürfen Spaghetti Elilolilo jedoch nur nach einem guten Schlach verzehrt werden.'] },
    { id: 'organisation', heading: '7 Organisation', paragraphs: [] },
    { id: 'komitee', heading: '7.1 Komitee', paragraphs: ['Das Komitee ist keine formale Institution, sondern eine Ansammlung von Freunden, die gerne einen Schlach machen. Sie tauschen sich in der WhatsApp-Gruppe „Wir machen Schlach“ aus. Das Komitee hat die Schlachregeln aufgestellt.', 'Änderungen an diesen Regeln erfordern eine Zustimmung von mindestens 53 Prozent der Mitglieder bei einer Schlachsitzung. Diskussionen, etwa darüber, ob ein Ereignis ein Schlach war, finden sowohl in der Gruppe als auch direkt bei den Schlägen statt.'] },
    { id: 'satzung', heading: '7.2 Satzung', paragraphs: ['1. Wir machen Schlach.\n2. Keine Frauen in der WhatsApp-Gruppe.\n3. Frauen sind gerne gesehen.\n4. Jeder Tag hat die Berechtigung dazu, ein Schlachtag zu sein.\n5. Bananenweizen ist verboten.\n6. Wer früh aufstehen muss, kann auch spät einen Schlach machen.\n6. Regeländerungen müssen von mindestens 53 % der Mitglieder bei einer Schlachsitzung abgesegnet werden.\n7. Die Schlagzahl muss erhöht werden.\n8. Spaghetti Elilolilo dürfen nur nach einem guten Schlach verzehrt werden.\n9. Wo kein Kläger, da kein Richter.'] },
    { id: 'schlachcounter', heading: '7.3 Schlachcounter', paragraphs: ['Der Schlachcounter zählt die Anzahl der Schläge pro Woche. Er ist ein neues Maß zur Erfassung von Schlägen. Frühere Schläge fließen nicht in die Zählung ein, da sie sich nicht nachträglich berechnen lassen. Der aktuelle Stand lautet: 1.'] },
    { id: 'einzelnachweise', heading: '8 Einzelnachweise', paragraphs: ['[1] Schlachpedia-Redaktion: Vorläufige Dokumentation des Begriffs „Schlach“, 2026.'] },
  ],
  categories: ['Schlach-Kultur', 'Feierformen', 'Fulda', 'Artikel im Aufbau'],
  lastUpdated: '5. Oktober 2026, 14:32 Uhr',
  revisionCount: 1,
  contentVersion: 3,
  revisions: [{ id: '1', author: 'Schlachpedia-Redaktion', summary: 'Hauptartikel redaktionell angelegt', createdAt: '5. Oktober 2026, 14:32 Uhr', content: JSON.stringify({ lead: '', sections: [] }) }],
}
