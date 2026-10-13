import { site } from './site.mjs';
import { photo, icons, button, call, pageHead, faqList, checklist, closing, services } from './layout.mjs';

// Jede Seite hat eigene Texte: Kein Absatz steht auf zwei Seiten (wichtig für Suchmaschinen).
// Titel höchstens 60 Zeichen, Beschreibung 120 bis 160 Zeichen (prüft npm test).

const homeFaq = [
  ['Was kostet eine Gebäudereinigung in Würzburg?', 'Der Preis hängt von Fläche, Art der Räume, Verschmutzung und Häufigkeit ab. Deshalb gibt es bei uns keine Pauschale, sondern ein individuelles Angebot. Schildern Sie uns Ihr Objekt kurz, die Anfrage ist kostenlos und unverbindlich.'],
  ['Reinigen Sie auch außerhalb der Geschäftszeiten?', 'Ja. Viele Kunden möchten, dass gereinigt wird, wenn niemand arbeitet oder behandelt wird. Früh am Morgen, am Abend oder nach Absprache am Wochenende: Den Zeitpunkt legen wir gemeinsam fest.'],
  ['Für welche Orte sind Sie im Einsatz?', 'Unser Schwerpunkt ist die Stadt Würzburg mit ihren Stadtteilen. Objekte im Umland übernehmen wir ebenfalls. Fragen Sie einfach an, wir sagen Ihnen ehrlich, ob die Anfahrt zu Ihrem Standort passt.'],
  ['Wie schnell kann die Reinigung starten?', 'Nach Ihrer Anfrage melden wir uns zeitnah, besprechen das Objekt und schicken Ihnen ein Angebot. Sobald Sie zugesagt haben, vereinbaren wir den ersten Termin. Bei einmaligen Einsätzen geht das oft kurzfristig.'],
];

const reasons = [
  [icons.person, 'Ein fester Ansprechpartner', 'Sie sprechen direkt mit dem Inhaber. Fragen, Wünsche und Änderungen landen nicht in einer Warteschleife, sondern bei der Person, die Ihr Objekt kennt.'],
  [icons.calendar, 'Verlässliche Termine', 'Was im Reinigungsplan steht, wird erledigt, und zwar zum vereinbarten Zeitpunkt. Fällt ein Termin auf einen Feiertag, stimmen wir den Ersatz vorher mit Ihnen ab.'],
  [icons.layers, 'Plan nach Ihrem Objekt', 'Ein Großraumbüro braucht etwas anderes als eine Physiotherapie-Praxis. Umfang und Rhythmus richten sich danach, wie Ihre Räume genutzt werden.'],
  [icons.shield, 'Diskret und sorgfältig', 'Wir arbeiten in Räumen, in denen vertrauliche Unterlagen liegen oder Patienten behandelt werden. Zurückhaltung und ein sorgfältiger Umgang mit Schlüsseln sind für uns selbstverständlich.'],
];

const steps = [
  ['Anfrage', 'Sie schildern uns per Formular, E-Mail oder Telefon, um welches Objekt es geht und was gereinigt werden soll.'],
  ['Objekt besprechen', 'Wir klären Fläche, Räume, Besonderheiten und Zeiten. Auf Wunsch sehen wir uns das Objekt vor Ort an.'],
  ['Angebot', 'Sie erhalten ein schriftliches Angebot mit klar beschriebenem Leistungsumfang, ohne versteckte Posten.'],
  ['Start', 'Nach Ihrer Zusage legen wir den ersten Termin fest. Danach wird nach dem vereinbarten Plan gereinigt.'],
];

const card = (href, img, title, text, linkText) => `<article class="card" data-reveal><a class="card-link" href="${href}"><div class="card-media">${photo(img, { sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw' })}</div><div class="card-body"><h3>${title}</h3><p>${text}</p><span class="card-more">${linkText}${icons.arrow}</span></div></a></article>`;

const home = {
  title: 'Gebäudereinigung Würzburg | König Gebäudereinigung',
  description: 'Gebäudereinigung in Würzburg für Büros, Praxen, Studios und Treppenhäuser: fester Ansprechpartner, verlässliche Termine. Jetzt kostenlos anfragen.',
  label: 'Startseite',
  faq: homeFaq,
  content: `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-media">${photo('buerogebaeude-glasfassade', { priority: true, sizes: '100vw', alt: '' })}</div>
  <div class="wrap hero-inner">
    <p class="eyebrow">Reinigung mit Anspruch</p>
    <h1 id="hero-title">Gebäudereinigung in Würzburg für Büros, Praxen und Treppenhäuser</h1>
    <p class="lead">Saubere Räume, klare Absprachen und ein Ansprechpartner, der Ihr Objekt kennt. König Gebäudereinigung reinigt Büros, Praxen, Studios, Treppenhäuser und Gewerbeflächen in Würzburg und Umgebung.</p>
    <div class="actions">${button('/kontakt/', 'Kostenloses Angebot anfragen')}${call('button ghost-light')}</div>
    <ul class="hero-facts">
      <li>${icons.check}Persönlich geführt</li>
      <li>${icons.check}Reinigungsplan nach Ihrem Objekt</li>
      <li>${icons.check}Würzburg und Umgebung</li>
    </ul>
  </div>
</section>

<section class="section intro" aria-labelledby="intro-title">
  <div class="wrap split">
    <div data-reveal>
      <p class="eyebrow">König Gebäudereinigung</p>
      <h2 id="intro-title">Saubere Räume. Klare Wirkung.</h2>
      <p>Der erste Eindruck entsteht am Eingang: an der Glastür, am Boden im Empfang, im Waschraum, den Ihre Gäste benutzen. Wer dort Sorgfalt sieht, traut Ihnen auch den Rest zu. Genau dafür sorgen wir, regelmäßig und ohne dass Sie sich darum kümmern müssen.</p>
      <p>Was als familiengeführtes Unternehmen begann, ist heute ein Reinigungsdienstleister für Unternehmen, Praxen und Hausverwaltungen in Würzburg. Geblieben ist der Anspruch: gründlich arbeiten, Absprachen einhalten und erreichbar sein, wenn Sie etwas brauchen.</p>
      ${button('/ueber-uns/', 'Mehr über König Gebäudereinigung', 'text-link')}
    </div>
    <figure class="framed" data-reveal>${photo('empfang-koenig-schriftzug')}</figure>
  </div>
</section>

<section class="section tinted" aria-labelledby="leistungen-title">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <p class="eyebrow">Leistungen</p>
      <h2 id="leistungen-title">Reinigung für jeden Bereich Ihres Gebäudes</h2>
      <p>Von der laufenden Unterhaltsreinigung bis zum einmaligen Großeinsatz nach einer Renovierung. Wählen Sie den Bereich, der Sie interessiert.</p>
    </div>
    <div class="cards">
      ${card('/bueroreinigung-wuerzburg/', 'bueroflaeche-boden', 'Büroreinigung', 'Arbeitsplätze, Besprechungsräume, Küchen und Sanitärbereiche, regelmäßig nach festem Plan.', 'Zur Büroreinigung')}
      ${card('/praxisreinigung-wuerzburg/', 'waschraum', 'Praxisreinigung', 'Gründliche Reinigung für Arzt-, Zahnarzt- und Therapiepraxen, abgestimmt auf Ihren Hygieneplan.', 'Zur Praxisreinigung')}
      ${card('/treppenhausreinigung-wuerzburg/', 'treppenhaus', 'Treppenhausreinigung', 'Stufen, Geländer, Eingänge und Kellerflure für Hausverwaltungen und Eigentümergemeinschaften.', 'Zur Treppenhausreinigung')}
      ${card('/glasreinigung-wuerzburg/', 'glasfront-flur', 'Glasreinigung', 'Fenster, Glastüren, Trennwände und Schaufenster streifenfrei, mit Rahmen und Falzen.', 'Zur Glasreinigung')}
      ${card('/grundreinigung-wuerzburg/', 'bodenreinigung-maschine', 'Grund- und Sonderreinigung', 'Einmalige Einsätze nach Umbau, vor dem Einzug oder wenn der Boden eine Tiefenreinigung braucht.', 'Zur Grundreinigung')}
      <article class="card card-text" data-reveal><div class="card-body"><h3>Sanitär- und Bodenreinigung</h3><p>Hygienische Waschräume und materialgerechte Pflege für Fliesen, Vinyl, Linoleum, Stein und Teppich gehören in jedes unserer Reinigungskonzepte.</p>${button('/leistungen/', 'Alle Leistungen im Überblick', 'text-link')}</div></article>
    </div>
  </div>
</section>

<section class="section dark" aria-labelledby="zielgruppen-title">
  <div class="wrap split align-start">
    <div data-reveal>
      <p class="eyebrow">Für wen wir arbeiten</p>
      <h2 id="zielgruppen-title">Für Unternehmen, Praxen und Hausverwaltungen</h2>
      <p>Wir übernehmen Objekte, in denen täglich Menschen arbeiten, behandelt werden oder ein und aus gehen. Jedes hat seine eigenen Anforderungen, und genau so planen wir die Reinigung.</p>
    </div>
    <ul class="audience" data-reveal>
      <li><strong>Büros und Agenturen</strong><span>Gepflegte Arbeitsplätze, saubere Küchen und Besprechungsräume, in denen Sie Kunden gern empfangen.</span></li>
      <li><strong>Arzt- und Therapiepraxen</strong><span>Wartezimmer, Behandlungsräume und Sanitärbereiche nach den Vorgaben Ihrer Praxis.</span></li>
      <li><strong>Studios</strong><span>Fitness-, Yoga- und Kosmetikstudios, in denen Sauberkeit zum Erlebnis Ihrer Kunden gehört.</span></li>
      <li><strong>Gewerbe- und Verkaufsflächen</strong><span>Ladenlokale, Showrooms und Ausstellungsflächen, die jeden Morgen einladend aussehen.</span></li>
      <li><strong>Hausverwaltungen</strong><span>Treppenhäuser und Gemeinschaftsflächen mehrerer Objekte mit einem Ansprechpartner für alle.</span></li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="gruende-title">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <p class="eyebrow">Warum König Gebäudereinigung</p>
      <h2 id="gruende-title">Darauf können Sie sich verlassen</h2>
    </div>
    <div class="reasons">${reasons.map(([icon, t, x]) => `<div class="reason" data-reveal>${icon}<h3>${t}</h3><p>${x}</p></div>`).join('')}</div>
  </div>
</section>

<section class="section tinted" aria-labelledby="ablauf-title">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <p class="eyebrow">Ablauf</p>
      <h2 id="ablauf-title">In vier Schritten zur sauberen Lösung</h2>
    </div>
    <ol class="steps">${steps.map(([t, x]) => `<li data-reveal><h3>${t}</h3><p>${x}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="section" aria-labelledby="faq-title">
  <div class="wrap split align-start">
    <div data-reveal>
      <p class="eyebrow">Häufige Fragen</p>
      <h2 id="faq-title">Kurz beantwortet</h2>
      <p>Hier finden Sie die Fragen, die uns bei neuen Anfragen am häufigsten gestellt werden. Alles Weitere klären wir gern persönlich.</p>
      ${button('/haeufige-fragen/', 'Alle Fragen und Antworten', 'text-link')}
    </div>
    <div data-reveal>${faqList(homeFaq)}</div>
  </div>
</section>
${closing('Lassen Sie uns über Ihr Objekt sprechen', 'Erzählen Sie uns, welche Räume gereinigt werden sollen und wie oft. Wir melden uns mit einem passenden, unverbindlichen Angebot für Würzburg und Umgebung.')}`,
};

// Leistungsübersicht: alle sechs Bereiche mit Anker, damit Startseite und Menü gezielt verlinken können.
const overview = [
  ['unterhaltsreinigung', 'Unterhaltsreinigung', 'bueroflaeche-boden', 'Die Unterhaltsreinigung ist das Fundament: Ihre Räume werden in einem festen Rhythmus gereinigt, täglich, mehrmals pro Woche oder wöchentlich. Dazu gehören Böden, Arbeits- und Kontaktflächen, Papierkörbe, Küchen und Sanitärräume. Was wann gemacht wird, steht in einem Leistungsverzeichnis, auf das Sie sich verlassen können.', ['Büros, Praxen, Studios und Gewerbeflächen', 'Rhythmus von täglich bis wöchentlich', 'Leistungsverzeichnis mit festen Intervallen'], ['/bueroreinigung-wuerzburg/', 'Büroreinigung in Würzburg im Detail']],
  ['glasreinigung', 'Glasreinigung', 'glasfront-flur', 'Saubere Fenster lassen Licht herein und zeigen Besuchern schon von außen, dass hier Wert auf Ordnung gelegt wird. Wir reinigen Fenster, Glastüren, Glastrennwände und Schaufenster streifenfrei, auf Wunsch einschließlich Rahmen und Falzen. Außenflächen reinigen wir, soweit sie sicher erreichbar sind.', ['Fenster, Glastüren und Trennwände', 'Rahmen, Falze und Fensterbänke', 'Regelmäßig oder als Einzeltermin'], ['/glasreinigung-wuerzburg/', 'Glasreinigung in Würzburg im Detail']],
  ['sanitaerreinigung', 'Sanitärreinigung', 'waschraum', 'Kaum ein Raum wird so kritisch betrachtet wie die Toilette. Wir reinigen WC-Anlagen, Urinale, Waschbecken, Armaturen, Spiegel und Fliesen gründlich und entfernen Kalk an den Stellen, an denen er sich gern festsetzt. Auf Wunsch füllen wir Seife, Papier und Handtücher nach, damit nichts fehlt.', ['WC-Anlagen, Waschbecken und Armaturen', 'Fliesen, Spiegel und Trennwände', 'Nachfüllen von Verbrauchsmaterial nach Absprache'], ['/praxisreinigung-wuerzburg/', 'Reinigung von Praxisräumen ansehen']],
  ['treppenhausreinigung', 'Treppenhausreinigung', 'treppenhaus', 'Im Treppenhaus begegnen sich Mieter, Besucher und Lieferanten. Wir kehren und wischen Stufen und Podeste, reinigen Handläufe, Geländer, Briefkästen, Türen und Lichtschalter und halten Eingangsbereiche und Kellerflure in Ordnung. Für Hausverwaltungen dokumentieren wir die Termine nachvollziehbar.', ['Stufen, Podeste und Eingangsbereiche', 'Handläufe, Geländer, Türen und Briefkästen', 'Für Hausverwaltungen und Eigentümer'], ['/treppenhausreinigung-wuerzburg/', 'Treppenhausreinigung in Würzburg im Detail']],
  ['bodenreinigung', 'Bodenreinigung', 'empfang-koenig-schriftzug', 'Jeder Belag verlangt eine eigene Behandlung. Fliesen, Vinyl, Linoleum, Laminat, Naturstein und Teppich reinigen wir mit passenden Mitteln und Verfahren, damit die Oberfläche lange schön bleibt. Bei stärkerer Verschmutzung übernehmen wir die maschinelle Grundreinigung.', ['Hartböden und textile Beläge', 'Materialgerechte Reinigungsmittel', 'Maschinelle Reinigung größerer Flächen'], ['/grundreinigung-wuerzburg/', 'Grundreinigung von Böden ansehen']],
  ['sonderreinigung', 'Sonderreinigung', 'bodenreinigung-maschine', 'Manche Aufgaben fallen nur einmal an: die Reinigung nach einem Umbau, vor der Übergabe an neue Mieter, nach einer Veranstaltung oder einfach, weil es wieder richtig sauber werden soll. Wir besprechen den Umfang vorab und reinigen zum vereinbarten Festpreis.', ['Reinigung nach Umbau oder Renovierung', 'Vor Einzug, Auszug oder Neuvermietung', 'Einmalige Tiefenreinigung'], ['/grundreinigung-wuerzburg/', 'Grund- und Sonderreinigung im Detail']],
];

const leistungen = {
  title: 'Leistungen der Gebäudereinigung in Würzburg | König',
  description: 'Unterhalts-, Glas-, Sanitär-, Treppenhaus-, Boden- und Sonderreinigung in Würzburg und Umgebung. Alle Leistungen von König Gebäudereinigung im Überblick.',
  label: 'Leistungen',
  content: `
${pageHead({ eyebrow: 'Leistungen', title: 'Leistungen unserer Gebäudereinigung in Würzburg', lead: 'Sechs Bereiche, ein Ansprechpartner. Wir stellen die Leistungen so zusammen, wie Ihr Objekt sie braucht, als laufende Reinigung oder als einmaligen Einsatz.', image: 'buerogebaeude-glasfassade', pos: '70% 50%' })}
<!--brotkruemel-->
<section class="section" aria-labelledby="ueberblick-title">
  <div class="wrap narrow" data-reveal>
    <h2 id="ueberblick-title">Gebäudereinigung aus einer Hand</h2>
    <p>Die meisten Objekte brauchen eine Kombination: regelmäßige Unterhaltsreinigung, dazu ein paar Mal im Jahr die Fenster und gelegentlich eine Grundreinigung der Böden. Statt dafür drei Firmen zu beauftragen, bekommen Sie bei König Gebäudereinigung alles aus einer Hand, mit einem Leistungsverzeichnis und einem festen Ansprechpartner.</p>
    <nav class="jump" aria-label="Leistungen auf dieser Seite"><ul>${overview.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ul></nav>
  </div>
</section>
${overview.map(([id, t, img, text, list, [href, linkText]], i) => `
<section class="section service-row${i % 2 ? ' reverse tinted' : ''}" id="${id}" aria-labelledby="${id}-title">
  <div class="wrap split">
    <div data-reveal>
      <h2 id="${id}-title">${t}</h2>
      <p>${text}</p>
      ${checklist(list)}
      ${button(href, linkText, 'text-link')}
    </div>
    <figure class="framed" data-reveal>${photo(img)}</figure>
  </div>
</section>`).join('')}
${closing('Welche Leistungen braucht Ihr Objekt?', 'Beschreiben Sie uns kurz Räume, Fläche und gewünschten Rhythmus. Wir stellen daraus ein Angebot zusammen, das genau zu Ihnen passt.')}`,
};

// Lokale Landingpages. Jede hat eigene Einleitung, Leistungsliste, Besonderheiten und Fragen.
function landing({ path, service, title, description, h1, lead, image, introTitle, intro, listTitle, list, detailTitle, details, faq, closingTitle, closingText }) {
  return [path, {
    title, description, label: service, parent: ['/leistungen/', 'Leistungen'], service, faq,
    content: `
${pageHead({ eyebrow: 'Würzburg und Umgebung', title: h1, lead })}
<!--brotkruemel-->
<section class="section" aria-labelledby="einleitung">
  <div class="wrap split align-start">
    <div data-reveal>
      <h2 id="einleitung">${introTitle}</h2>
      ${intro.map(p => `<p>${p}</p>`).join('')}
      <div class="panel">
        <h3>${listTitle}</h3>
        ${checklist(list)}
      </div>
    </div>
    <figure class="framed sticky" data-reveal>${photo(image)}</figure>
  </div>
</section>
<section class="section tinted" aria-labelledby="besonderheiten">
  <div class="wrap">
    <div class="section-head" data-reveal><h2 id="besonderheiten">${detailTitle}</h2></div>
    <div class="reasons three">${details.map(([t, x]) => `<div class="reason" data-reveal><h3>${t}</h3><p>${x}</p></div>`).join('')}</div>
  </div>
</section>
<section class="section" aria-labelledby="fragen">
  <div class="wrap split align-start">
    <div data-reveal>
      <h2 id="fragen">Fragen zur ${service}</h2>
      <p>Ihre Frage zur ${service} ist nicht dabei? Dann rufen Sie uns an oder lesen Sie die <a href="/haeufige-fragen/">häufigen Fragen zur Gebäudereinigung</a>.</p>
      <h3 class="small-head">Weitere Leistungen</h3>
      <ul class="link-list">${services.filter(([h]) => h !== path).map(([h, t]) => `<li><a href="${h}">${t} in Würzburg</a></li>`).join('')}</ul>
    </div>
    <div data-reveal>${faqList(faq)}</div>
  </div>
</section>
${closing(closingTitle, closingText)}`,
  }];
}

const landings = [
  landing({
    path: '/bueroreinigung-wuerzburg/', service: 'Büroreinigung', image: 'bueroflaeche-boden',
    title: 'Büroreinigung Würzburg | König Gebäudereinigung',
    description: 'Büroreinigung in Würzburg: Arbeitsplätze, Küchen und Sanitärräume nach festem Plan, auch abends oder früh am Morgen. Kostenloses Angebot anfragen.',
    h1: 'Büroreinigung in Würzburg',
    lead: 'Saubere Arbeitsplätze, eine aufgeräumte Küche und ein gepflegter Empfang. Wir reinigen Ihr Büro regelmäßig und dann, wenn es Ihren Betrieb nicht stört.',
    introTitle: 'Ein sauberes Büro, ohne dass Sie daran denken müssen',
    intro: [
      'In einem Büro fällt Schmutz selten auf einen Schlag an. Kaffeeringe auf dem Besprechungstisch, Krümel unter den Schreibtischen, Fingerabdrücke an der Glastür: Es sind die vielen Kleinigkeiten, die über die Woche den Eindruck verändern. Eine regelmäßige Büroreinigung fängt das auf, bevor es jemandem auffällt.',
      'Zusammen mit Ihnen legen wir fest, welche Räume wie oft gereinigt werden. Die Küche braucht vielleicht jeden Tag Aufmerksamkeit, das Archiv nur alle zwei Wochen. So zahlen Sie für das, was wirklich nötig ist, und Ihr Team arbeitet jeden Tag in einer gepflegten Umgebung.',
    ],
    listTitle: 'Das gehört zur Büroreinigung',
    list: ['Arbeitsplätze, Schreibtische und Kontaktflächen', 'Böden saugen und feucht wischen', 'Küchen, Teeküchen und Pausenräume', 'Sanitärräume und Waschbecken', 'Papierkörbe leeren und Müll trennen', 'Besprechungsräume und Empfang'],
    detailTitle: 'So arbeiten wir in Ihrem Büro',
    details: [
      ['Zu Ihren Zeiten', 'Wir reinigen vor Arbeitsbeginn, am Abend oder in den Randzeiten, damit Telefonate und Termine ungestört bleiben.'],
      ['Mit Rücksicht auf Unterlagen', 'Ordner, Akten und persönliche Dinge auf den Schreibtischen bleiben, wo sie sind. Wir reinigen die freien Flächen.'],
      ['Mit klarem Leistungsverzeichnis', 'Sie sehen schwarz auf weiß, was bei jedem Termin passiert. Ändert sich Ihr Bedarf, passen wir das Verzeichnis an.'],
    ],
    faq: [
      ['Wie oft sollte ein Büro gereinigt werden?', 'Für die meisten Büros reichen zwei bis drei Termine pro Woche, Küchen und Sanitärräume brauchen oft mehr. Bei viel Kundenverkehr oder großen Teams ist eine tägliche Reinigung sinnvoll. Wir empfehlen Ihnen einen Rhythmus nach Nutzung und Größe.'],
      ['Brauchen Sie einen Schlüssel für unser Büro?', 'Wenn wir außerhalb Ihrer Arbeitszeiten reinigen, ja. Die Übergabe halten wir schriftlich fest, und der Schlüssel bleibt in unserer Verantwortung. Alternativ richten wir uns nach Ihren Öffnungszeiten.'],
      ['Reinigen Sie auch kleine Büros?', 'Ja. Auch eine Kanzlei mit drei Räumen oder ein kleines Agenturbüro gehört zu unseren Kunden. Wichtig ist uns, dass Umfang und Preis zueinander passen.'],
    ],
    closingTitle: 'Büroreinigung in Würzburg anfragen',
    closingText: 'Nennen Sie uns Fläche, Anzahl der Räume und den gewünschten Rhythmus. Sie bekommen ein klares Angebot für die Reinigung Ihres Büros.',
  }),
  landing({
    path: '/praxisreinigung-wuerzburg/', service: 'Praxisreinigung', image: 'waschraum',
    title: 'Praxisreinigung Würzburg | König Gebäudereinigung',
    description: 'Praxisreinigung in Würzburg für Arzt-, Zahnarzt- und Therapiepraxen: gründlich, nach Ihrem Hygieneplan und außerhalb der Sprechzeiten. Jetzt anfragen.',
    h1: 'Praxisreinigung in Würzburg',
    lead: 'Patienten achten genau darauf, wie eine Praxis aussieht. Wir reinigen Wartebereiche, Behandlungsräume und Sanitärräume gründlich und ohne den Praxisbetrieb zu stören.',
    introTitle: 'Sauberkeit, die Ihre Patienten sehen',
    intro: [
      'Im Wartezimmer, an der Anmeldung und auf der Patiententoilette entscheidet sich, ob sich Menschen in Ihrer Praxis gut aufgehoben fühlen. Gleichzeitig gelten für Behandlungsräume andere Anforderungen als für ein Büro. Wir planen die Reinigung deshalb Raum für Raum.',
      'Grundlage ist Ihr Hygieneplan. Er legt fest, welche Flächen Ihr Praxisteam selbst desinfiziert und welche Aufgaben wir als Reinigungsdienst übernehmen. So greifen beide Seiten sauber ineinander, und nichts wird doppelt oder gar nicht erledigt.',
    ],
    listTitle: 'Das gehört zur Praxisreinigung',
    list: ['Wartezimmer, Anmeldung und Flure', 'Böden in Behandlungs- und Funktionsräumen', 'Patienten- und Personaltoiletten', 'Türgriffe, Lichtschalter und Handläufe', 'Sozialräume und Teeküche', 'Abfall nach Vorgabe der Praxis'],
    detailTitle: 'Worauf wir in Praxen achten',
    details: [
      ['Nach den Sprechzeiten', 'Wir kommen, wenn keine Patienten da sind, abends oder am frühen Morgen. Ihr Praxisalltag läuft ungestört weiter.'],
      ['Getrennte Reinigungstücher', 'Für Sanitärräume und übrige Flächen verwenden wir getrennte, farblich unterschiedene Tücher, damit nichts verschleppt wird.'],
      ['Verschwiegenheit', 'Patientenakten und Bildschirme rühren wir nicht an. Was wir in Ihrer Praxis sehen, bleibt in Ihrer Praxis.'],
    ],
    faq: [
      ['Für welche Praxen reinigen Sie?', 'Für Arztpraxen, Zahnarztpraxen, Physiotherapie, Ergotherapie, Logopädie und psychotherapeutische Praxen. Spezielle Bereiche wie Eingriffs- oder Sterilisationsräume bleiben nach Absprache in der Hand Ihres Praxisteams.'],
      ['Übernehmen Sie auch die Desinfektion?', 'Welche Flächen desinfiziert werden und von wem, legt Ihr Hygieneplan fest. Die Aufgaben, die dort für den Reinigungsdienst vorgesehen sind, übernehmen wir mit den vorgegebenen Mitteln.'],
      ['Können Sie auch in der Mittagspause reinigen?', 'Für kurze Aufgaben wie die Patiententoilette ist das möglich. Die vollständige Reinigung legen wir aber lieber in eine Zeit, in der niemand in der Praxis ist.'],
    ],
    closingTitle: 'Praxisreinigung in Würzburg anfragen',
    closingText: 'Sagen Sie uns, um welche Art von Praxis es geht, wie viele Räume sie hat und wann gereinigt werden soll. Wir melden uns mit einem Angebot.',
  }),
  landing({
    path: '/treppenhausreinigung-wuerzburg/', service: 'Treppenhausreinigung', image: 'treppenhaus',
    title: 'Treppenhausreinigung Würzburg | König',
    description: 'Treppenhausreinigung in Würzburg für Hausverwaltungen und Eigentümer: Stufen, Geländer, Eingänge und Keller nach festem Plan. Kostenlos anfragen.',
    h1: 'Treppenhausreinigung in Würzburg',
    lead: 'Ein gepflegtes Treppenhaus ist die Visitenkarte jedes Hauses. Wir übernehmen die regelmäßige Reinigung für Hausverwaltungen, Eigentümergemeinschaften und Vermieter.',
    introTitle: 'Schluss mit dem Putzplan im Hausflur',
    intro: [
      'Wenn die Bewohner das Treppenhaus selbst putzen sollen, gibt es früher oder später Streit: Der eine wischt gründlich, die andere gar nicht. Eine professionelle Treppenhausreinigung beendet das Thema. Das Haus sieht immer gleich gepflegt aus, und die Kosten lassen sich über die Nebenkosten umlegen.',
      'Wir reinigen in einem festen Rhythmus, meist wöchentlich oder alle zwei Wochen. Für Hausverwaltungen mit mehreren Objekten in Würzburg bündeln wir die Termine und sind für alle Häuser derselbe Ansprechpartner.',
    ],
    listTitle: 'Das gehört zur Treppenhausreinigung',
    list: ['Stufen und Podeste kehren und feucht wischen', 'Handläufe und Geländer abwischen', 'Eingangstüren, Glaseinsätze und Klingelanlage', 'Briefkästen, Lichtschalter und Fensterbänke', 'Kellerflure und Gemeinschaftsräume', 'Fußmatten absaugen oder ausschütteln'],
    detailTitle: 'Was Hausverwaltungen an uns schätzen',
    details: [
      ['Nachvollziehbare Termine', 'Jeder Reinigungstermin wird festgehalten. Bei Rückfragen von Eigentümern haben Sie die Angaben sofort zur Hand.'],
      ['Ein Ansprechpartner für alle Objekte', 'Ob ein Haus oder zehn: Sie haben eine Telefonnummer und eine Person, die Ihre Objekte kennt.'],
      ['Umlagefähige Leistung', 'Die Treppenhausreinigung zählt zu den Betriebskosten. Wir stellen Rechnungen so aus, dass Sie sie direkt zuordnen können.'],
    ],
    faq: [
      ['Wie oft wird ein Treppenhaus gereinigt?', 'Üblich ist eine Reinigung pro Woche. In kleinen Häusern mit wenig Verkehr reicht oft ein Termin alle zwei Wochen, in großen Wohnanlagen kann es mehr sein. Den passenden Rhythmus stimmen wir mit Ihnen ab.'],
      ['Können die Kosten auf die Mieter umgelegt werden?', 'Die Kosten der Hausreinigung gehören nach der Betriebskostenverordnung zu den umlagefähigen Betriebskosten, sofern der Mietvertrag das vorsieht. Die Prüfung im Einzelfall übernimmt Ihre Hausverwaltung oder Ihr Steuerberater.'],
      ['Reinigen Sie auch die Fenster im Treppenhaus?', 'Ja. Treppenhausfenster und die Glasflächen der Haustür können wir in die regelmäßige Reinigung aufnehmen oder ein paar Mal im Jahr separat reinigen.'],
    ],
    closingTitle: 'Treppenhausreinigung in Würzburg anfragen',
    closingText: 'Nennen Sie uns Adresse, Anzahl der Etagen und den gewünschten Rhythmus. Für mehrere Objekte erstellen wir gern ein gemeinsames Angebot.',
  }),
  landing({
    path: '/glasreinigung-wuerzburg/', service: 'Glasreinigung', image: 'glasfront-flur',
    title: 'Glasreinigung Würzburg | König Gebäudereinigung',
    description: 'Glas- und Fensterreinigung in Würzburg: Fenster, Glastüren, Trennwände und Schaufenster streifenfrei, mit Rahmen. Unverbindliches Angebot anfragen.',
    h1: 'Glasreinigung in Würzburg',
    lead: 'Klare Sicht nach draußen und ein glänzender erster Eindruck. Wir reinigen Fenster und Glasflächen in Büros, Praxen, Läden und Wohnanlagen.',
    introTitle: 'Glas zeigt jeden Fingerabdruck',
    intro: [
      'Große Fensterfronten, Glastüren und gläserne Trennwände wirken modern und hell, solange sie sauber sind. Fingerabdrücke, Regenspuren und Staub sieht man darauf allerdings sofort, vor allem wenn die Sonne tief steht. Deshalb lohnt sich eine regelmäßige Glasreinigung.',
      'Wir reinigen mit Einwascher, Abzieher und klarem Wasser, damit keine Schlieren zurückbleiben. Rahmen, Falze und Fensterbänke nehmen wir auf Wunsch mit, denn ein sauberes Glas in einem verstaubten Rahmen sieht nur halb so gut aus.',
    ],
    listTitle: 'Das gehört zur Glasreinigung',
    list: ['Fenster innen und außen', 'Rahmen, Falze und Fensterbänke', 'Glastüren und Eingangsbereiche', 'Glastrennwände in Büros', 'Schaufenster und Vitrinen', 'Spiegel und Glasflächen im Innenraum'],
    detailTitle: 'Gut zu wissen',
    details: [
      ['Regelmäßig oder einmalig', 'Viele Kunden lassen die Fenster zwei- bis viermal im Jahr reinigen, Schaufenster deutlich öfter. Beides ist möglich.'],
      ['Sicher erreichbar', 'Wir reinigen alle Flächen, die vom Boden, mit Leiter oder Teleskopstange sicher erreichbar sind. Bei hohen Fassaden sprechen wir vorab offen über die Möglichkeiten.'],
      ['Kombinierbar', 'Die Glasreinigung lässt sich mit der Unterhaltsreinigung verbinden. Dann kümmert sich ein Team um Böden, Flächen und Fenster.'],
    ],
    faq: [
      ['Wie oft sollten Fenster gereinigt werden?', 'Für Büros und Praxen sind zwei bis vier Reinigungen im Jahr üblich. Schaufenster und Eingangstüren, die viele Menschen berühren, brauchen meist eine wöchentliche oder monatliche Reinigung.'],
      ['Reinigen Sie auch bei Regen?', 'Leichter Regen ist für die Innenseite kein Problem. Außenflächen reinigen wir lieber bei trockenem Wetter und verschieben den Termin in Absprache mit Ihnen, wenn es stark regnet.'],
      ['Reinigen Sie auch Fenster in Privatwohnungen?', 'Unser Schwerpunkt sind gewerbliche Objekte und Wohnanlagen. Fragen Sie gern an, wenn es um eine Wohnung geht, wir sagen Ihnen offen, ob wir den Auftrag übernehmen können.'],
    ],
    closingTitle: 'Glasreinigung in Würzburg anfragen',
    closingText: 'Sagen Sie uns, wie viele Fenster oder welche Glasflächen gereinigt werden sollen und ob innen, außen oder beides. Ein Foto hilft bei der Einschätzung.',
  }),
  landing({
    path: '/grundreinigung-wuerzburg/', service: 'Grundreinigung', image: 'bodenreinigung-maschine',
    title: 'Grundreinigung Würzburg | König Gebäudereinigung',
    description: 'Grund- und Sonderreinigung in Würzburg: nach Umbau, vor Einzug oder Neuvermietung und für stark verschmutzte Böden. Festpreis-Angebot anfragen.',
    h1: 'Grund- und Sonderreinigung in Würzburg',
    lead: 'Wenn es einmal richtig sauber werden muss. Wir übernehmen einmalige Reinigungen nach Umbauten, vor Übergaben und überall dort, wo die normale Reinigung nicht mehr reicht.',
    introTitle: 'Für die Fälle, in denen Wischen nicht genügt',
    intro: [
      'Nach einer Renovierung liegt feiner Staub auf jeder Oberfläche, auf Böden kleben Farbspritzer und Folienreste. Vor der Übergabe an neue Mieter soll die Fläche einwandfrei aussehen. Und manchmal hat sich auf einem Boden über Jahre so viel festgesetzt, dass nur noch eine maschinelle Grundreinigung hilft.',
      'Für solche Einsätze sehen wir uns die Fläche vorher an oder lassen uns Fotos schicken. Danach bekommen Sie ein Festpreisangebot mit genau beschriebenem Umfang. So wissen Sie vorab, was Sie erwartet und was es kostet.',
    ],
    listTitle: 'Typische Einsätze',
    list: ['Reinigung nach Umbau oder Renovierung', 'Übergabe- und Einzugsreinigung', 'Maschinelle Grundreinigung von Böden', 'Entfernen von Kalk und Ablagerungen in Sanitärräumen', 'Reinigung nach Veranstaltungen', 'Reinigung von Leerstandsflächen'],
    detailTitle: 'So läuft eine Grundreinigung ab',
    details: [
      ['Vorab ansehen', 'Wir prüfen Belag, Verschmutzung und Zugang. Erst danach nennen wir einen Preis, damit es keine Überraschungen gibt.'],
      ['Passendes Verfahren', 'Für Fliesen, Stein, Vinyl oder Linoleum wählen wir Mittel und Maschinen, die gründlich reinigen, ohne den Belag anzugreifen.'],
      ['Übergabe', 'Zum Schluss gehen wir die Fläche auf Wunsch gemeinsam mit Ihnen durch. Was nicht passt, wird nachgebessert.'],
    ],
    faq: [
      ['Was ist der Unterschied zwischen Unterhalts- und Grundreinigung?', 'Die Unterhaltsreinigung erhält einen sauberen Zustand in regelmäßigen Abständen. Die Grundreinigung stellt diesen Zustand erst wieder her, indem sie hartnäckige Verschmutzungen und alte Pflegeschichten gründlich entfernt.'],
      ['Wie lange dauert eine Grundreinigung?', 'Das hängt von Fläche, Belag und Verschmutzung ab. Eine Büroetage ist häufig an einem Tag erledigt. Die genaue Dauer nennen wir Ihnen im Angebot.'],
      ['Müssen die Räume dafür leer sein?', 'Leere Räume lassen sich am gründlichsten reinigen. Wenn das nicht möglich ist, stellen wir Möbel nach Absprache um und reinigen abschnittsweise.'],
    ],
    closingTitle: 'Grund- oder Sonderreinigung anfragen',
    closingText: 'Beschreiben Sie kurz die Fläche und den Anlass, gern mit ein paar Fotos per E-Mail. Sie bekommen ein Festpreisangebot für den Einsatz.',
  }),
];

const about = {
  title: 'Über uns | König Gebäudereinigung Würzburg',
  description: 'König Gebäudereinigung aus Würzburg: familiengeführt, persönlich betreut von Inhaber Leart Spahiu. Erfahren Sie, wie wir arbeiten und was uns wichtig ist.',
  label: 'Über uns',
  content: `
${pageHead({ eyebrow: 'Über uns', title: 'Gebäudereinigung mit persönlichem Anspruch', lead: 'König Gebäudereinigung ist ein inhabergeführter Reinigungsdienstleister aus Würzburg. Hinter dem Namen steht kein Konzern, sondern ein Mensch, den Sie anrufen können.' })}
<!--brotkruemel-->
<section class="section" aria-labelledby="geschichte">
  <div class="wrap split">
    <div data-reveal>
      <h2 id="geschichte">Aus der Familie, für die Region</h2>
      <p>König Gebäudereinigung hat als familiengeführtes Unternehmen begonnen und ist Schritt für Schritt gewachsen. Heute reinigen wir Büros, Praxen, Studios, Treppenhäuser und Gewerbeflächen in Würzburg und dem Umland.</p>
      <p>Geführt wird das Unternehmen von ${site.owner}. Er kennt die Objekte seiner Kunden, plant die Einsätze und ist selbst erreichbar, wenn etwas zu klären ist. Diese Nähe ist der Grund, warum viele Kunden lieber mit einem kleineren Betrieb arbeiten als mit einer großen Zentrale.</p>
    </div>
    <figure class="framed" data-reveal>${photo('empfang-koenig-schriftzug')}</figure>
  </div>
</section>
<section class="section tinted" aria-labelledby="werte">
  <div class="wrap">
    <div class="section-head" data-reveal><p class="eyebrow">Unsere Werte</p><h2 id="werte">Was uns wichtig ist</h2></div>
    <div class="reasons">
      <div class="reason" data-reveal>${icons.handshake}<h3>Ehrliche Absprachen</h3><p>Wir versprechen nur, was wir halten können. Wenn etwas nicht in unser Angebot passt, sagen wir das offen.</p></div>
      <div class="reason" data-reveal>${icons.eye}<h3>Blick fürs Detail</h3><p>Die Ecke hinter der Tür, der Rand der Fußleiste, die Unterseite des Waschbeckens: Gründlichkeit zeigt sich dort, wo man nicht sofort hinsieht.</p></div>
      <div class="reason" data-reveal>${icons.shield}<h3>Diskretion</h3><p>Wir bewegen uns in Ihren Räumen wie Gäste. Unterlagen, Bildschirme und persönliche Dinge bleiben unberührt.</p></div>
      <div class="reason" data-reveal>${icons.person}<h3>Persönliche Verantwortung</h3><p>Für jedes Objekt gibt es eine verantwortliche Person. Lob und Kritik kommen bei ihr direkt an.</p></div>
    </div>
  </div>
</section>
<section class="section" aria-labelledby="arbeitsweise">
  <div class="wrap split align-start">
    <figure class="framed sticky" data-reveal>${photo('bodenreinigung-maschine')}</figure>
    <div data-reveal>
    <h2 id="arbeitsweise">Wie wir arbeiten</h2>
    <p>Am Anfang steht immer ein Gespräch über Ihr Objekt: Welche Räume gibt es, wie werden sie genutzt, wann darf gereinigt werden, was hat Sie bisher gestört? Daraus entsteht ein Leistungsverzeichnis, in dem jede Aufgabe mit ihrem Intervall steht. Es ist die gemeinsame Grundlage für Sie und für uns.</p>
    <p>Läuft die Reinigung, halten wir Kontakt. Wenn sich Ihr Bedarf ändert, weil ein Team wächst, ein Raum umgebaut wird oder die Weihnachtsfeier ansteht, passen wir den Plan an. Kurze Wege und schnelle Entscheidungen sind der Vorteil eines inhabergeführten Betriebs.</p>
    <p>Unser Einsatzgebiet ist Würzburg mit allen Stadtteilen und die umliegende Region. Weil wir aus Würzburg kommen, sind die Wege kurz: Wenn einmal schnell etwas erledigt werden muss, etwa vor einem wichtigen Kundentermin oder nach einem Wasserschaden im Flur, sind wir nicht weit weg. Für Objekte weiter außerhalb sprechen Sie uns einfach an.</p>
    </div>
  </div>
</section>
${closing('Lernen Sie uns kennen', 'Ein kurzes Telefonat genügt oft, um zu sehen, ob wir zueinander passen. Rufen Sie an oder schreiben Sie uns, wir melden uns zeitnah.')}`,
};

const allFaq = [
  ['Welche Leistungen bietet König Gebäudereinigung an?', 'Unterhaltsreinigung für Büros, Praxen, Studios und Gewerbeflächen, Glasreinigung, Sanitärreinigung, Treppenhausreinigung, Bodenreinigung sowie Grund- und Sonderreinigungen. Eine Übersicht finden Sie unter <a href="/leistungen/">Leistungen</a>.'],
  ['Wie kommt der Preis für eine Reinigung zustande?', 'Wir kalkulieren nach Fläche, Raumarten, Bodenbelägen, Verschmutzungsgrad und Häufigkeit. Weil sich diese Faktoren von Objekt zu Objekt unterscheiden, erstellen wir jedes Angebot individuell. Die Anfrage kostet Sie nichts.'],
  ['Ist die Anfrage verbindlich?', 'Nein. Eine Anfrage über das Formular, per E-Mail oder Telefon verpflichtet Sie zu nichts. Ein Auftrag kommt erst zustande, wenn Sie unser Angebot annehmen.'],
  ['Gibt es eine Mindestlaufzeit?', 'Die Laufzeit und Kündigungsfrist halten wir im Angebot fest und besprechen sie vorher mit Ihnen. Einmalige Einsätze wie eine Grundreinigung sind ohnehin ohne Vertragsbindung.'],
  ['Bringen Sie Reinigungsmittel und Geräte mit?', 'Ja, Reinigungsmittel, Tücher und Geräte bringen wir mit. Verbrauchsmaterial wie Toilettenpapier, Seife und Papierhandtücher stellen in der Regel Sie, auf Wunsch kümmern wir uns um das Nachfüllen.'],
  ['Was passiert, wenn einmal etwas nicht sauber ist?', 'Sagen Sie uns bitte direkt Bescheid. Wir sehen uns die Stelle an und bessern zeitnah nach. Rückmeldungen helfen uns, den Reinigungsplan für Ihr Objekt weiter zu verbessern.'],
  ['Wie gehen Sie mit unseren Schlüsseln um?', 'Jede Schlüsselübergabe wird schriftlich festgehalten. Schlüssel werden nicht beschriftet, sodass niemand Rückschlüsse auf Ihre Adresse ziehen kann, und bleiben in unserer Verantwortung.'],
  ['Reinigen Sie auch am Wochenende?', 'Nach Absprache ja. Gerade für Grundreinigungen oder Objekte, die unter der Woche durchgehend genutzt werden, ist ein Termin am Samstag oft die beste Lösung.'],
  ['Arbeiten Sie auch für Privathaushalte?', 'Unser Schwerpunkt liegt auf gewerblichen Objekten, Praxen und Wohnanlagen. Anfragen von Privatpersonen prüfen wir im Einzelfall.'],
  ['Weist König Gebäudereinigung Umsatzsteuer aus?', 'Nein. König Gebäudereinigung ist Kleinunternehmer im Sinne von § 19 UStG. Auf unseren Rechnungen wird deshalb keine Umsatzsteuer berechnet.'],
];

const faqPage = {
  title: 'Häufige Fragen zur Gebäudereinigung | König Würzburg',
  description: 'Antworten auf häufige Fragen zur Gebäudereinigung in Würzburg: Preise, Vertragslaufzeit, Reinigungsmittel, Schlüssel, Termine und Ablauf bei König.',
  label: 'Häufige Fragen',
  faq: allFaq,
  content: `
${pageHead({ eyebrow: 'Häufige Fragen', title: 'Häufige Fragen zur Gebäudereinigung', lead: 'Was Kunden uns vor der ersten Zusammenarbeit fragen, haben wir hier gesammelt. Fehlt Ihre Frage, schreiben Sie uns oder rufen Sie an.' })}
<!--brotkruemel-->
<section class="section" aria-labelledby="alle-fragen">
  <div class="wrap narrow">
    <h2 id="alle-fragen" class="visually-hidden">Fragen und Antworten</h2>
    <div data-reveal>${faqList(allFaq)}</div>
    <div class="note" data-reveal>
      <h3>Fragen zu einer bestimmten Leistung?</h3>
      <p>Auf den Seiten zu den einzelnen Leistungen beantworten wir Fragen, die nur dort eine Rolle spielen, etwa zur Desinfektion in Praxen oder zur Umlage der Treppenhausreinigung auf die Nebenkosten.</p>
      <ul class="link-list">${services.map(([h, t]) => `<li><a href="${h}">${t} in Würzburg</a></li>`).join('')}</ul>
    </div>
  </div>
</section>
${closing('Ihre Frage war nicht dabei?', 'Wir beantworten sie gern persönlich. Rufen Sie an oder schreiben Sie uns eine kurze Nachricht, wir melden uns zeitnah zurück.')}`,
};

const options = list => list.map(o => `<option>${o}</option>`).join('');
const contact = {
  title: 'Kontakt und Angebot | König Gebäudereinigung Würzburg',
  description: 'Kontakt zu König Gebäudereinigung in Würzburg: Telefon, E-Mail oder Anfrageformular. Kostenloses, unverbindliches Angebot für Ihre Reinigung anfragen.',
  label: 'Kontakt',
  content: `
${pageHead({ eyebrow: 'Kontakt', title: 'Kontakt und kostenloses Angebot', lead: 'Schreiben Sie uns, worum es geht, oder rufen Sie direkt an. Je genauer Sie Ihr Objekt beschreiben, desto schneller bekommen Sie ein passendes Angebot.', actions: false })}
<!--brotkruemel-->
<section class="section" aria-labelledby="anfrage">
  <div class="wrap contact-grid">
    <div class="contact-aside" data-reveal>
      <h2 id="direkt">So erreichen Sie uns</h2>
      <ul class="contact-facts plain">
        <li>${icons.phone}<span><strong>Telefon</strong><a href="tel:${site.telephone}">${site.telephoneDisplay}</a></span></li>
        <li>${icons.mail}<span><strong>E-Mail</strong><a href="mailto:${site.email}">${site.email}</a></span></li>
        <li>${icons.pin}<span><strong>Anschrift</strong>${site.name}<br>${site.street}<br>${site.postalCode} ${site.city}</span></li>
      </ul>
      <p>Wir sind im gesamten Stadtgebiet Würzburg und in der Umgebung für Sie im Einsatz. Rückrufwünsche erledigen wir in der Regel am selben oder am nächsten Werktag.</p>
      <p><a class="text-link" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(`${site.street}, ${site.postalCode} ${site.city}`)}" rel="noopener">Anschrift in Google Maps öffnen${icons.arrow}</a></p>
      <p class="hint">Der Link öffnet Google Maps in einem neuen Fenster. Erst dann werden Daten an Google übertragen.</p>
    </div>
    <div class="form-card" data-reveal>
      <h2 id="anfrage">Anfrage senden</h2>
      <p class="hint">Felder mit <span aria-hidden="true">*</span><span class="visually-hidden">Stern</span> sind Pflichtfelder.</p>
      <form class="contact-form" data-contact-form data-email="${site.email}" data-key="${site.formKey}" ${site.formKey ? 'action="https://api.web3forms.com/submit" method="post"' : `action="mailto:${site.email}" method="post" enctype="text/plain"`} novalidate>
        <div class="field-row">
          <div class="field"><label for="name">Name <span aria-hidden="true">*</span></label><input id="name" name="name" type="text" autocomplete="name" required aria-required="true"></div>
          <div class="field"><label for="firma">Firma oder Hausverwaltung</label><input id="firma" name="firma" type="text" autocomplete="organization"></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="email">E-Mail <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autocomplete="email" required aria-required="true"></div>
          <div class="field"><label for="telefon">Telefon</label><input id="telefon" name="telefon" type="tel" autocomplete="tel"></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="leistung">Gewünschte Leistung</label><select id="leistung" name="leistung"><option value="">Bitte wählen</option>${options(['Büroreinigung', 'Praxisreinigung', 'Treppenhausreinigung', 'Glasreinigung', 'Grund- oder Sonderreinigung', 'Sanitär- oder Bodenreinigung', 'Mehrere Leistungen', 'Sonstiges'])}</select></div>
          <div class="field"><label for="haeufigkeit">Wie oft?</label><select id="haeufigkeit" name="haeufigkeit"><option value="">Bitte wählen</option>${options(['Einmalig', 'Täglich', 'Mehrmals pro Woche', 'Wöchentlich', 'Alle zwei Wochen', 'Monatlich', 'Noch offen'])}</select></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="ort">Ort des Objekts</label><input id="ort" name="ort" type="text" autocomplete="address-level2" placeholder="z. B. Würzburg-Zellerau"></div>
          <div class="field"><label for="flaeche">Fläche ungefähr</label><input id="flaeche" name="flaeche" type="text" inputmode="numeric" placeholder="z. B. 250 m²"></div>
        </div>
        <div class="field"><label for="nachricht">Ihre Nachricht <span aria-hidden="true">*</span></label><textarea id="nachricht" name="nachricht" rows="6" required aria-required="true" aria-describedby="nachricht-hilfe"></textarea><p class="hint" id="nachricht-hilfe">Zum Beispiel: Art der Räume, Bodenbeläge, gewünschte Reinigungszeiten.</p></div>
        ${site.formKey ? `<input type="hidden" name="access_key" value="${site.formKey}">` : ''}<input type="checkbox" name="botcheck" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
        <p class="hint">Ihre Angaben verwenden wir nur, um Ihre Anfrage zu beantworten. Mehr dazu in der <a href="/datenschutz/#anfragen">Datenschutzerklärung</a>.</p>
        <button class="button" type="submit">Anfrage senden${icons.arrow}</button>
        <div class="form-status" role="status" aria-live="polite" data-form-status></div>
      </form>
      <noscript><p class="hint">Ohne JavaScript schreiben Sie uns bitte direkt an <a href="mailto:${site.email}">${site.email}</a>.</p></noscript>
    </div>
  </div>
</section>
<section class="section tinted" aria-labelledby="nach-der-anfrage">
  <div class="wrap split align-start">
    <div data-reveal>
      <h2 id="nach-der-anfrage">Was nach Ihrer Anfrage passiert</h2>
      <p>Wir lesen jede Anfrage persönlich und melden uns per E-Mail oder Telefon, je nachdem, was Sie angegeben haben. Bei regelmäßigen Reinigungen vereinbaren wir meist einen kurzen Termin, um das Objekt kennenzulernen. Bei einmaligen Einsätzen reichen oft ein paar Fotos.</p>
      <p>Danach bekommen Sie ein schriftliches Angebot mit Leistungsumfang, Rhythmus und Preis. Sie entscheiden in Ruhe. Erst wenn Sie zusagen, entsteht ein Auftrag.</p>
    </div>
    <div class="panel" data-reveal>
      <h3>Diese Angaben helfen uns beim Angebot</h3>
      ${checklist(['Art des Objekts, zum Beispiel Büro, Praxis oder Wohnhaus', 'Ungefähre Fläche oder Anzahl der Räume und Etagen', 'Bodenbeläge und Anzahl der Sanitärräume', 'Gewünschter Rhythmus und bevorzugte Uhrzeiten', 'Besonderheiten wie Zugang, Schlüssel oder Parkmöglichkeiten'])}
    </div>
  </div>
</section>`,
};

const notFound = {
  title: 'Seite nicht gefunden | König Gebäudereinigung',
  description: 'Diese Seite gibt es nicht oder nicht mehr. Hier finden Sie den Weg zurück zu den Leistungen und zum Kontakt von König Gebäudereinigung in Würzburg.',
  label: 'Seite nicht gefunden',
  noindex: true,
  absolute: true,
  content: `
<header class="page-head"><div class="wrap page-head-inner"><p class="eyebrow">Fehler 404</p><h1>Diese Seite gibt es nicht</h1><p class="lead">Vielleicht hat sich die Adresse geändert, oder sie wurde falsch eingegeben. Von hier aus geht es weiter:</p><div class="actions">${button('/', 'Zur Startseite')}${button('/leistungen/', 'Zu den Leistungen', 'button ghost-light')}</div></div></header>`,
};

export const pages = {
  '/': home,
  '/leistungen/': leistungen,
  ...Object.fromEntries(landings),
  '/ueber-uns/': about,
  '/haeufige-fragen/': faqPage,
  '/kontakt/': contact,
  '/404.html': notFound,
};
