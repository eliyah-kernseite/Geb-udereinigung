import { site } from './config.mjs';
import { photo, icons, button, call, pageHead, faqList, checklist, services } from './layout.mjs';

// Startseite nach Bauplan Variante B (selbsterklärendes Angebot): Leistungen zuerst.
// Jede Seite hat eigene Texte, kein Absatz steht auf zwei Seiten. Keine Gedankenstriche.
// Titel 50 bis 60 Zeichen, Beschreibung 130 bis 155 Zeichen (prüft npm test).

const stars = n => `<span class="stars" aria-hidden="true">${'★'.repeat(Math.round(n))}</span>`;
const reviews = () => {
  if (!site.reviews.length || !site.reviewSummary || !site.googleProfile) return '';
  const s = site.reviewSummary;
  return `<section class="section reviews" aria-labelledby="bewertungen"><div class="wrap"><div class="reviews-head" data-reveal><h2 id="bewertungen">Bewertungen auf Google</h2><p class="rating"><strong>${String(s.rating).replace('.', ',')}</strong> ${stars(s.rating)} <span>aus ${s.count} Bewertungen auf Google</span></p><a class="text-link" href="${site.googleProfile}" target="_blank" rel="noopener">Alle Bewertungen auf Google ansehen${icons.arrow}</a></div><div class="review-list">${site.reviews.slice(0, 3).map(r => `<figure class="review" data-reveal>${stars(r.stars)}<blockquote><p>${r.text}</p></blockquote><figcaption>${r.name}, ${r.date}</figcaption></figure>`).join('')}</div><p class="hint">Stand: ${s.asOf}</p></div></section>`;
};

const serviceItem = (href, img, title, text, linkText) => `<article class="service" data-reveal><a class="service-link" href="${href}"><div class="service-media">${photo(img, { sizes: '(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 33vw' })}</div><h3>${title}</h3><p>${text}</p><span class="more">${linkText}${icons.arrow}</span></a></article>`;

const homeFaq = [
  ['Was unterscheidet eine Gebäudereinigung von einer Putzhilfe?', 'Eine Gebäudereinigung arbeitet nach einem schriftlich vereinbarten Leistungsverzeichnis und stellt ordentliche Rechnungen. Sie haben einen Vertragspartner mit festen Absprachen statt einzelner mündlicher Vereinbarungen.'],
  ['Brauche ich für jede Leistung einen eigenen Vertrag?', 'Nein. Unterhaltsreinigung, Fenster und gelegentliche Sonderreinigungen lassen sich in einem Angebot zusammenfassen. So bleibt die Abrechnung übersichtlich.'],
  ['Wie schnell kann die Reinigung starten?', 'Das hängt vom Umfang und von unserer Planung ab. Sobald das Angebot angenommen und der Zugang geklärt ist, vereinbaren wir mit Ihnen den ersten Termin.'],
  ['Was brauche ich für ein Angebot?', 'Art und ungefähre Größe des Objekts, die gewünschten Leistungen und den Rhythmus. Fotos oder ein Grundriss helfen, sind aber kein Muss.'],
];

const home = {
  title: 'Gebäudereinigung Würzburg | König Gebäudereinigung',
  description: 'Gebäudereinigung in Würzburg für Büros, Praxen, Studios und Treppenhäuser. Persönlich geführt, mit festem Ansprechpartner. Jetzt Angebot anfordern.',
  label: 'Startseite',
  faq: homeFaq,
  closing: ['Sprechen wir über Ihr Objekt', `Rufen Sie an oder schreiben Sie uns, welche Räume gereinigt werden sollen und wie oft. Sie bekommen ein unverbindliches Angebot für Ihr Objekt in ${site.area}.`],
  content: `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-media">${photo('buerogebaeude-glasfassade', { priority: true, sizes: '100vw', alt: '' })}</div>
  <div class="wrap hero-inner">
    <p class="eyebrow">Reinigung mit Anspruch</p>
    <h1 id="hero-title">Gebäudereinigung in Würzburg. Gründlich und verlässlich.</h1>
    <p class="lead">König Gebäudereinigung reinigt Büros, Praxen, Studios, Treppenhäuser und Gewerbeflächen in Würzburg und Umgebung. Mit klaren Absprachen und einem Ansprechpartner, der Ihr Objekt kennt.</p>
    <div class="actions">${button('kontakt.html', 'Angebot anfordern', 'button light')}${button('bueroreinigung-wuerzburg.html', 'Zur Büroreinigung', 'button outline-light')}</div>
  </div>
</section>

<section class="section" aria-labelledby="leistungen-title">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <p class="eyebrow">Leistungen</p>
      <h2 id="leistungen-title">Reinigung für jeden Bereich Ihres Gebäudes</h2>
      <p>Von der laufenden Unterhaltsreinigung bis zum einmaligen Einsatz nach einer Renovierung. Jede Leistung ist auf einer eigenen Seite ausführlich beschrieben.</p>
    </div>
    <div class="services">
      ${serviceItem('bueroreinigung-wuerzburg.html', 'bueroflaeche-boden', 'Büroreinigung', 'Arbeitsplätze, Besprechungsräume, Küchen und Sanitärbereiche, regelmäßig nach festem Plan.', 'Zur Büroreinigung')}
      ${serviceItem('praxisreinigung-wuerzburg.html', 'waschraum', 'Praxisreinigung', 'Wartebereiche, Behandlungsräume und Sanitärräume für Arzt- und Therapiepraxen.', 'Zur Praxisreinigung')}
      ${serviceItem('treppenhausreinigung-wuerzburg.html', 'treppenhaus', 'Treppenhausreinigung', 'Stufen, Geländer, Eingänge und Kellerflure für Hausverwaltungen und Eigentümer.', 'Zur Treppenhausreinigung')}
      ${serviceItem('glasreinigung-wuerzburg.html', 'glasfront-flur', 'Glasreinigung', 'Fenster, Glastüren, Trennwände und Schaufenster, streifenfrei und mit Rahmen.', 'Zur Glasreinigung')}
      ${serviceItem('grundreinigung-wuerzburg.html', 'bodenreinigung-maschine', 'Grund- und Sonderreinigung', 'Einmalige Einsätze nach einem Umbau, vor einem Einzug oder für stark verschmutzte Böden.', 'Zur Grundreinigung')}
      <div class="service service-all" data-reveal><h3>Alle Leistungen</h3><p>Auch Sanitärreinigung und die materialgerechte Bodenreinigung gehören dazu. Den vollständigen Überblick finden Sie hier:</p><ul class="link-list"><li><a href="leistungen.html#unterhaltsreinigung">Unterhaltsreinigung</a></li><li><a href="leistungen.html#sanitaerreinigung">Sanitärreinigung</a></li><li><a href="leistungen.html#bodenreinigung">Bodenreinigung</a></li><li><a href="leistungen.html">Alle Leistungen im Überblick</a></li></ul></div>
    </div>
  </div>
</section>
${reviews()}
<section class="section alt" aria-labelledby="einblicke-title">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <p class="eyebrow">Einblicke</p>
      <h2 id="einblicke-title">Saubere Räume. Klare Wirkung.</h2>
      <p>Der erste Eindruck entsteht am Eingang: an der Glastür, am Boden im Empfang, im Waschraum, den Ihre Gäste benutzen. Wer dort Sorgfalt sieht, traut Ihnen auch den Rest zu.</p>
    </div>
    <div class="gallery">
      <figure data-reveal>${photo('empfang-koenig-schriftzug', { sizes: '(max-width: 48rem) 100vw, 50vw' })}</figure>
      <figure data-reveal>${photo('glasfront-flur', { sizes: '(max-width: 48rem) 100vw, 25vw' })}</figure>
      <figure data-reveal>${photo('treppenhaus', { sizes: '(max-width: 48rem) 100vw, 25vw' })}</figure>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="gruende-title">
  <div class="wrap split align-start">
    <div data-reveal>
      <p class="eyebrow">Warum König Gebäudereinigung</p>
      <h2 id="gruende-title">Darauf können Sie sich verlassen</h2>
      <p>Wir sind ein inhabergeführter Betrieb aus Würzburg. Das merken Sie an kurzen Wegen und an Absprachen, die gelten.</p>
    </div>
    <ul class="points" data-reveal>
      <li><h3>Ein fester Ansprechpartner</h3><p>Sie sprechen direkt mit dem Inhaber. Fragen und Änderungen landen bei der Person, die Ihr Objekt kennt.</p></li>
      <li><h3>Zuverlässige Ausführung</h3><p>Was im Reinigungsplan vereinbart ist, wird erledigt, und zwar zum vereinbarten Termin.</p></li>
      <li><h3>Reinigung nach Ihrem Objekt</h3><p>Umfang und Rhythmus richten sich danach, wie Ihre Räume genutzt werden und wie groß sie sind.</p></li>
      <li><h3>Diskret und sorgfältig</h3><p>Wir arbeiten in Räumen mit vertraulichen Unterlagen und Patientenkontakt. Zurückhaltung gehört dazu.</p></li>
    </ul>
  </div>
</section>

<section class="section dark" aria-labelledby="ueber-title">
  <div class="wrap split">
    <figure class="framed" data-reveal>${photo('bodenreinigung-maschine')}</figure>
    <div data-reveal>
      <p class="eyebrow">Über uns</p>
      <h2 id="ueber-title">Familiengeführt, aus Würzburg</h2>
      <p>Was als familiengeführtes Unternehmen begann, ist heute ein Reinigungsdienstleister für Unternehmen, Praxen und Hausverwaltungen in Würzburg. Geführt wird König Gebäudereinigung von ${site.owner}, der jedes Objekt persönlich betreut.</p>
      ${button('ueber-uns.html', 'Mehr über uns', 'text-link')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="gebiet-title">
  <div class="wrap split align-start">
    <div data-reveal>
      <p class="eyebrow">Einsatzgebiet</p>
      <h2 id="gebiet-title">In Würzburg und Umgebung für Sie da</h2>
      <p>Unser Schwerpunkt ist die Stadt Würzburg mit ihren Stadtteilen. Objekte im Umland übernehmen wir ebenfalls. Fragen Sie einfach an, wir sagen Ihnen offen, ob die Anfahrt zu Ihrem Standort passt.</p>
      <p>Termine und Besichtigungen vereinbaren wir telefonisch oder per E-Mail, ganz wie es Ihnen lieber ist.</p>
      ${button('ablauf.html', 'So läuft die Zusammenarbeit ab', 'text-link')}
    </div>
    <dl class="facts" data-reveal>
      <div><dt>Standort</dt><dd>${site.street}, ${site.postalCode} ${site.city}</dd></div>
      <div><dt>Erreichbarkeit</dt><dd>${site.hours}</dd></div>
      <div><dt>Telefon</dt><dd><a href="tel:${site.telephone}">${site.telephoneDisplay}</a></dd></div>
      <div><dt>E-Mail</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd></div>
    </dl>
  </div>
</section>
<section class="section alt" aria-labelledby="fragen-start">
  <div class="wrap split align-start">
    <div data-reveal>
      <p class="eyebrow">Gut zu wissen</p>
      <h2 id="fragen-start">Kurz beantwortet</h2>
      <p>Das fragen uns Unternehmen und Hausverwaltungen, bevor sie zum ersten Mal eine Gebäudereinigung beauftragen. Weitere Antworten stehen unter <a href="haeufige-fragen.html">Häufige Fragen</a>.</p>
    </div>
    <div data-reveal>${faqList(homeFaq)}</div>
  </div>
</section>`,
};

// Leistungsübersicht: alle sechs Bereiche mit Anker.
const overview = [
  ['unterhaltsreinigung', 'Unterhaltsreinigung', 'bueroflaeche-boden', 'Die Unterhaltsreinigung ist das Fundament: Ihre Räume werden in einem festen Rhythmus gereinigt, täglich, mehrmals pro Woche oder wöchentlich. Dazu gehören Böden, Arbeits- und Kontaktflächen, Papierkörbe, Küchen und Sanitärräume. Was wann gemacht wird, steht in einem Leistungsverzeichnis, das wir mit Ihnen abstimmen.', ['Büros, Praxen, Studios und Gewerbeflächen', 'Rhythmus von täglich bis wöchentlich', 'Leistungsverzeichnis mit festen Intervallen'], ['bueroreinigung-wuerzburg.html', 'Büroreinigung in Würzburg im Detail']],
  ['glasreinigung', 'Glasreinigung', 'glasfront-flur', 'Saubere Fenster lassen Licht herein und zeigen Besuchern schon von außen, dass hier Wert auf Ordnung gelegt wird. Wir reinigen Fenster, Glastüren, Glastrennwände und Schaufenster streifenfrei, auf Wunsch mit Rahmen und Falzen. Welche Außenflächen erreichbar sind, klären wir vorab.', ['Fenster, Glastüren und Trennwände', 'Rahmen, Falze und Fensterbänke', 'Regelmäßig oder als Einzeltermin'], ['glasreinigung-wuerzburg.html', 'Glasreinigung in Würzburg im Detail']],
  ['sanitaerreinigung', 'Sanitärreinigung', 'waschraum', 'Kaum ein Raum wird so kritisch betrachtet wie die Toilette. Wir reinigen WC-Anlagen, Urinale, Waschbecken, Armaturen, Spiegel und Fliesen gründlich und entfernen Kalk an den Stellen, an denen er sich gern festsetzt. Das Nachfüllen von Seife, Papier und Handtüchern kann Teil der Vereinbarung sein.', ['WC-Anlagen, Waschbecken und Armaturen', 'Fliesen, Spiegel und Trennwände', 'Verbrauchsmaterial nach Absprache'], ['praxisreinigung-wuerzburg.html', 'Reinigung von Praxisräumen ansehen']],
  ['treppenhausreinigung', 'Treppenhausreinigung', 'treppenhaus', 'Im Treppenhaus begegnen sich Mieter, Besucher und Lieferanten. Wir kehren und wischen Stufen und Podeste, reinigen Handläufe, Geländer, Briefkästen, Türen und Lichtschalter und halten Eingangsbereiche und Kellerflure in Ordnung.', ['Stufen, Podeste und Eingangsbereiche', 'Handläufe, Geländer, Türen und Briefkästen', 'Für Hausverwaltungen und Eigentümer'], ['treppenhausreinigung-wuerzburg.html', 'Treppenhausreinigung in Würzburg im Detail']],
  ['bodenreinigung', 'Bodenreinigung', 'empfang-koenig-schriftzug', 'Jeder Belag verlangt eine eigene Behandlung. Fliesen, Vinyl, Linoleum, Laminat, Naturstein und Teppich reinigen wir mit passenden Mitteln und Verfahren, damit die Oberfläche lange schön bleibt. Bei stärkerer Verschmutzung kommt eine maschinelle Grundreinigung infrage.', ['Hartböden und textile Beläge', 'Materialgerechte Reinigungsmittel', 'Maschinelle Reinigung größerer Flächen'], ['grundreinigung-wuerzburg.html', 'Grundreinigung von Böden ansehen']],
  ['sonderreinigung', 'Sonderreinigung', 'bodenreinigung-maschine', 'Manche Aufgaben fallen nur einmal an: die Reinigung nach einem Umbau, vor der Übergabe an neue Mieter, nach einer Veranstaltung oder einfach, weil es wieder richtig sauber werden soll. Den Umfang besprechen wir vorab und halten ihn im Angebot fest.', ['Reinigung nach Umbau oder Renovierung', 'Vor Einzug, Auszug oder Neuvermietung', 'Einmalige Tiefenreinigung'], ['grundreinigung-wuerzburg.html', 'Grund- und Sonderreinigung im Detail']],
];

const leistungen = {
  title: 'Leistungen der Gebäudereinigung in Würzburg | König',
  description: 'Unterhalts-, Glas-, Sanitär-, Treppenhaus-, Boden- und Sonderreinigung in Würzburg und Umgebung. Alle Leistungen von König Gebäudereinigung.',
  label: 'Leistungen',
  closing: ['Welche Leistungen braucht Ihr Objekt?', 'Beschreiben Sie uns kurz Räume, Fläche und gewünschten Rhythmus. Wir stellen daraus ein Angebot zusammen, das zu Ihrem Objekt passt.'],
  content: `
${pageHead({ eyebrow: 'Leistungen', title: 'Leistungen unserer Gebäudereinigung in Würzburg', lead: 'Sechs Bereiche, ein Ansprechpartner. Wir stellen die Leistungen so zusammen, wie Ihr Objekt sie braucht, als laufende Reinigung oder als einmaligen Einsatz.', image: 'buerogebaeude-glasfassade', pos: '70% 50%' })}
<!--brotkruemel-->
<section class="section" aria-labelledby="ueberblick-title">
  <div class="wrap narrow" data-reveal>
    <h2 id="ueberblick-title">Gebäudereinigung aus einer Hand</h2>
    <p>Die meisten Objekte brauchen eine Kombination: regelmäßige Unterhaltsreinigung, dazu ein paar Mal im Jahr die Fenster und gelegentlich eine Grundreinigung der Böden. Statt dafür mehrere Firmen zu beauftragen, bekommen Sie bei König Gebäudereinigung alles aus einer Hand, mit einem abgestimmten Leistungsverzeichnis und einem festen Ansprechpartner.</p>
    <p>Welche Bausteine Ihr Objekt braucht, hängt von der Nutzung ab. Ein Büro mit Kundenverkehr braucht einen gepflegten Empfang und saubere Glastüren, eine Praxis gründliche Sanitärräume und Böden, ein Wohnhaus vor allem ein ordentliches Treppenhaus. Im ersten Gespräch gehen wir Ihre Räume gemeinsam durch und schlagen eine Kombination vor, die zu Ihrem Alltag passt. Sie entscheiden, welche Leistungen Sie davon beauftragen.</p>
    <p>Für die wichtigsten Leistungen gibt es eigene Seiten mit ausführlichen Beschreibungen, häufigen Fragen und Tipps zur Vorbereitung. Unten finden Sie zu jedem Bereich eine kurze Übersicht und den Link dorthin. Sanitär- und Bodenreinigung sind meist Teil der Unterhaltsreinigung, können aber auch einzeln beauftragt werden.</p>
    <nav class="jump" aria-label="Leistungen auf dieser Seite"><ul>${overview.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ul></nav>
  </div>
</section>
${overview.map(([id, t, img, text, list, [href, linkText]], i) => `
<section class="section service-row${i % 2 ? ' reverse alt' : ''}" id="${id}" aria-labelledby="${id}-title">
  <div class="wrap split">
    <div data-reveal>
      <h2 id="${id}-title">${t}</h2>
      <p>${text}</p>
      ${checklist(list)}
      ${button(href, linkText, 'text-link')}
    </div>
    <figure class="framed" data-reveal>${photo(img)}</figure>
  </div>
</section>`).join('')}`,
};

// Leistungsseiten: eigene Einleitung, Leistungsliste, Besonderheiten und Fragen. Mindestens 500 Wörter.
function landing({ file, service, title, description, h1, lead, image, introTitle, intro, listTitle, list, listText, detailTitle, details, guide, faq, closing }) {
  return [file, {
    title, description, label: service, parent: ['leistungen.html', 'Leistungen'], service, faq, closing,
    content: `
${pageHead({ eyebrow: 'Würzburg und Umgebung', title: h1, lead })}
<!--brotkruemel-->
<section class="section" aria-labelledby="einleitung">
  <div class="wrap split align-start">
    <div data-reveal>
      <h2 id="einleitung">${introTitle}</h2>
      ${intro.map(p => `<p>${p}</p>`).join('')}
    </div>
    <figure class="framed sticky" data-reveal>${photo(image)}</figure>
  </div>
</section>
<section class="section alt" aria-labelledby="umfang">
  <div class="wrap split align-start">
    <div data-reveal>
      <h2 id="umfang">${listTitle}</h2>
      <p>${listText}</p>
    </div>
    <div data-reveal>${checklist(list)}</div>
  </div>
</section>
<section class="section" aria-labelledby="besonderheiten">
  <div class="wrap">
    <div class="section-head" data-reveal><h2 id="besonderheiten">${detailTitle}</h2></div>
    <ul class="points three">${details.map(([t, x]) => `<li data-reveal><h3>${t}</h3><p>${x}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="section alt" aria-labelledby="ratgeber">
  <div class="wrap narrow" data-reveal>
    <h2 id="ratgeber">${guide[0]}</h2>
    ${guide[1].map(p => `<p>${p}</p>`).join('')}
  </div>
</section>
<section class="section" aria-labelledby="fragen">
  <div class="wrap split align-start">
    <div data-reveal>
      <h2 id="fragen">Fragen zur ${service}</h2>
      <p>Ihre Frage zur ${service} ist nicht dabei? Dann rufen Sie an oder lesen Sie die <a href="haeufige-fragen.html">häufigen Fragen zur Gebäudereinigung</a>.</p>
      <h3 class="small-head">Weitere Leistungen</h3>
      <ul class="link-list">${services.filter(([h]) => h !== file).map(([h, t]) => `<li><a href="${h}">${t} in Würzburg</a></li>`).join('')}</ul>
    </div>
    <div data-reveal>${faqList(faq)}</div>
  </div>
</section>`,
  }];
}

const landings = [
  landing({
    file: 'bueroreinigung-wuerzburg.html', service: 'Büroreinigung', image: 'bueroflaeche-boden',
    title: 'Büroreinigung in Würzburg | König Gebäudereinigung',
    description: 'Büroreinigung in Würzburg: Arbeitsplätze, Küchen und Sanitärräume nach festem Plan, abgestimmt auf Ihre Arbeitszeiten. Jetzt Angebot anfordern.',
    h1: 'Büroreinigung in Würzburg',
    lead: 'Saubere Arbeitsplätze, eine aufgeräumte Küche und ein gepflegter Empfang. Wir reinigen Ihr Büro regelmäßig und zu Zeiten, die zu Ihrem Betrieb passen.',
    introTitle: 'Ein sauberes Büro, ohne dass Sie daran denken müssen',
    intro: [
      'In einem Büro fällt Schmutz selten auf einen Schlag an. Kaffeeringe auf dem Besprechungstisch, Krümel unter den Schreibtischen, Fingerabdrücke an der Glastür: Es sind die vielen Kleinigkeiten, die über die Woche den Eindruck verändern. Eine regelmäßige Büroreinigung fängt das auf, bevor es jemandem auffällt.',
      'Zusammen mit Ihnen legen wir fest, welche Räume wie oft gereinigt werden. Die Küche braucht vielleicht jeden Tag Aufmerksamkeit, das Archiv nur alle zwei Wochen. So bezahlen Sie für das, was wirklich nötig ist, und Ihr Team arbeitet jeden Tag in einer gepflegten Umgebung.',
      'Ein sauberes Büro ist dabei mehr als eine Frage der Optik. Wer morgens an einen aufgeräumten Platz kommt, fängt entspannter an. Kunden und Bewerber nehmen wahr, wie Sie mit Ihren Räumen umgehen. Und gepflegte Böden, Möbel und Geräte halten schlicht länger.',
    ],
    listTitle: 'Das gehört zur Büroreinigung',
    listText: 'Welche dieser Aufgaben bei jedem Termin anfallen und welche seltener, steht im Leistungsverzeichnis. Das passen wir an, wenn sich Ihr Bedarf ändert, zum Beispiel weil das Team wächst oder ein Raum anders genutzt wird.',
    list: ['Arbeitsplätze, Schreibtische und Kontaktflächen', 'Böden saugen und feucht wischen', 'Küchen, Teeküchen und Pausenräume', 'Sanitärräume und Waschbecken', 'Papierkörbe leeren', 'Besprechungsräume und Empfang'],
    detailTitle: 'So arbeiten wir in Ihrem Büro',
    details: [
      ['Zu passenden Zeiten', 'Wir stimmen die Reinigungszeiten mit Ihnen ab, damit Telefonate, Termine und konzentriertes Arbeiten ungestört bleiben.'],
      ['Mit Rücksicht auf Unterlagen', 'Ordner, Akten und persönliche Dinge auf den Schreibtischen bleiben, wo sie sind. Gereinigt werden die freien Flächen.'],
      ['Mit klarem Leistungsverzeichnis', 'Sie sehen schwarz auf weiß, was bei jedem Termin passiert. Ändert sich Ihr Bedarf, passen wir das Verzeichnis an.'],
    ],
    guide: ['Worauf es bei der Büroreinigung ankommt', [
      'Bevor Sie eine Büroreinigung beauftragen, lohnt sich ein ehrlicher Blick auf den Alltag in Ihren Räumen. Wie viele Menschen arbeiten dort, und wie viele Besucher kommen am Tag? Gibt es eine Küche, die mittags stark genutzt wird? Welche Böden liegen in den Räumen, Teppich, Vinyl oder Fliesen? Diese Fragen bestimmen, wie oft gereinigt werden sollte und wie lange ein Termin dauert.',
      'Hilfreich ist auch eine kurze Liste mit Punkten, die Sie bisher gestört haben. Vielleicht wurden die Spülmaschine nie ausgeräumt oder die Heizkörper nie abgewischt. Solche Wünsche gehören von Anfang an ins Leistungsverzeichnis. Dann ist klar, was erwartet wird, und Sie müssen später nicht nachfragen.',
      'Denken Sie außerdem an den Zugang. Soll vor Arbeitsbeginn gereinigt werden, nach Feierabend oder während des Betriebs? Gibt es eine Alarmanlage, und wer bekommt einen Schlüssel? Je früher diese Fragen geklärt sind, desto reibungsloser startet die Zusammenarbeit.',
    ]],
    faq: [
      ['Wie oft sollte ein Büro gereinigt werden?', 'Das hängt von der Zahl der Mitarbeitenden, dem Kundenverkehr und der Art der Räume ab. Küchen und Sanitärräume brauchen meist häufiger Aufmerksamkeit als Büroflächen. Wir empfehlen Ihnen einen Rhythmus, der zu Nutzung und Größe passt.'],
      ['Kann auch außerhalb der Arbeitszeiten gereinigt werden?', 'Ja, die Reinigung kann vor Arbeitsbeginn oder nach Feierabend stattfinden. Wie der Zugang dann geregelt wird, besprechen wir vorab und halten es schriftlich fest.'],
      ['Reinigen Sie auch kleine Büros?', 'Ja. Auch eine Kanzlei mit wenigen Räumen oder ein kleines Agenturbüro kann eine regelmäßige Reinigung brauchen. Wichtig ist, dass Umfang und Preis zueinander passen.'],
    ],
    closing: ['Büroreinigung in Würzburg anfragen', 'Nennen Sie uns Fläche, Anzahl der Räume und den gewünschten Rhythmus. Sie bekommen ein klares Angebot für die Reinigung Ihres Büros.'],
  }),
  landing({
    file: 'praxisreinigung-wuerzburg.html', service: 'Praxisreinigung', image: 'waschraum',
    title: 'Praxisreinigung in Würzburg | König Gebäudereinigung',
    description: 'Praxisreinigung in Würzburg für Arzt-, Zahnarzt- und Therapiepraxen: gründlich, nach Ihrem Hygieneplan und außerhalb der Sprechzeiten möglich.',
    h1: 'Praxisreinigung in Würzburg',
    lead: 'Patienten achten genau darauf, wie eine Praxis aussieht. Wir reinigen Wartebereiche, Behandlungsräume und Sanitärräume gründlich und ohne den Praxisbetrieb zu stören.',
    introTitle: 'Sauberkeit, die Ihre Patienten sehen',
    intro: [
      'Im Wartezimmer, an der Anmeldung und auf der Patiententoilette entscheidet sich, ob sich Menschen in Ihrer Praxis gut aufgehoben fühlen. Gleichzeitig gelten für Behandlungsräume andere Anforderungen als für ein Büro. Wir planen die Reinigung deshalb Raum für Raum.',
      'Grundlage ist Ihr Hygieneplan. Er legt fest, welche Flächen Ihr Praxisteam selbst desinfiziert und welche Aufgaben der Reinigungsdienst übernimmt. So greifen beide Seiten sauber ineinander, und nichts wird doppelt oder gar nicht erledigt.',
      'Gerade in Praxen mit vielen Patienten am Tag summiert sich der Schmutz schnell: Straßenschmutz im Eingang, Fingerabdrücke an Türen und Griffen, benutzte Sanitärräume. Eine feste Reinigung sorgt dafür, dass Ihre Praxis jeden Morgen so aussieht, wie Ihre Patienten es erwarten.',
    ],
    listTitle: 'Das gehört zur Praxisreinigung',
    listText: 'Für jeden Raum halten wir fest, was gereinigt wird und wie oft. Bereiche mit besonderen Anforderungen, etwa Eingriffs- oder Sterilisationsräume, bleiben nach Absprache in der Verantwortung Ihres Praxisteams.',
    list: ['Wartezimmer, Anmeldung und Flure', 'Böden in Behandlungs- und Funktionsräumen', 'Patienten- und Personaltoiletten', 'Türgriffe, Lichtschalter und Handläufe', 'Sozialräume und Teeküche', 'Abfall nach Vorgabe der Praxis'],
    detailTitle: 'Worauf wir in Praxen achten',
    details: [
      ['Außerhalb der Sprechzeiten', 'Die Reinigung findet statt, wenn keine Patienten da sind. Den passenden Zeitpunkt stimmen wir mit Ihnen ab.'],
      ['Nach Ihrem Hygieneplan', 'Mittel und Verfahren richten sich nach den Vorgaben Ihrer Praxis. Was der Plan für den Reinigungsdienst vorsieht, setzen wir um.'],
      ['Verschwiegenheit', 'Patientenakten und Bildschirme bleiben unberührt. Was wir in Ihrer Praxis sehen, bleibt in Ihrer Praxis.'],
    ],
    guide: ['Was Praxen vor der Beauftragung klären sollten', [
      'Der wichtigste Schritt ist ein Blick in Ihren Hygieneplan. Darin steht, welche Flächen und Gegenstände wie oft gereinigt oder desinfiziert werden und wer dafür zuständig ist. Je klarer diese Aufteilung ist, desto genauer lässt sich der Auftrag für den Reinigungsdienst beschreiben. Bringen Sie den Plan am besten zum ersten Gespräch mit.',
      'Ebenso wichtig sind die Zeiten. Viele Praxen haben an einzelnen Tagen Abendsprechstunden oder schließen mittwochs früher. Die Reinigung sollte so liegen, dass sie weder Patienten noch Ihr Team stört und die Räume am nächsten Morgen fertig sind.',
      'Klären Sie außerdem, wie mit Abfällen umgegangen wird. Normaler Praxismüll, Papier und Verpackungen lassen sich meist problemlos mitnehmen. Für Abfälle mit besonderen Anforderungen gelten eigene Regeln, die Ihre Praxis vorgibt. Auch das gehört schriftlich in die Vereinbarung, damit später keine Fragen offen bleiben. Und schließlich: Legen Sie fest, wer im Team Ansprechpartner für den Reinigungsdienst ist.',
    ]],
    faq: [
      ['Für welche Praxen reinigen Sie?', 'Für Arztpraxen, Zahnarztpraxen, Physiotherapie, Ergotherapie, Logopädie und psychotherapeutische Praxen. Welche Räume wir übernehmen, legen wir gemeinsam fest.'],
      ['Übernehmen Sie auch die Desinfektion?', 'Welche Flächen desinfiziert werden und von wem, legt Ihr Hygieneplan fest. Die Aufgaben, die dort für den Reinigungsdienst vorgesehen sind, übernehmen wir mit den vorgegebenen Mitteln.'],
      ['Können Sie in der Mittagspause reinigen?', 'Für kurze Aufgaben wie die Patiententoilette kann das sinnvoll sein. Die vollständige Reinigung legen wir lieber in eine Zeit, in der niemand in der Praxis ist.'],
    ],
    closing: ['Praxisreinigung in Würzburg anfragen', 'Sagen Sie uns, um welche Art von Praxis es geht, wie viele Räume sie hat und wann gereinigt werden soll. Wir melden uns mit einem Angebot.'],
  }),
  landing({
    file: 'treppenhausreinigung-wuerzburg.html', service: 'Treppenhausreinigung', image: 'treppenhaus',
    title: 'Treppenhausreinigung in Würzburg | König Gebäudereinigung',
    description: 'Treppenhausreinigung in Würzburg für Hausverwaltungen und Eigentümer: Stufen, Geländer, Eingänge und Kellerflure nach festem Plan. Jetzt anfragen.',
    h1: 'Treppenhausreinigung in Würzburg',
    lead: 'Ein gepflegtes Treppenhaus ist die Visitenkarte jedes Hauses. Wir übernehmen die regelmäßige Reinigung für Hausverwaltungen, Eigentümergemeinschaften und Vermieter.',
    introTitle: 'Schluss mit dem Putzplan im Hausflur',
    intro: [
      'Wenn die Bewohner das Treppenhaus selbst putzen sollen, gibt es früher oder später Streit: Der eine wischt gründlich, die andere gar nicht. Eine professionelle Treppenhausreinigung beendet das Thema. Das Haus sieht immer gleich gepflegt aus, und niemand muss Nachbarn an ihren Putztag erinnern.',
      'Gereinigt wird in einem festen Rhythmus, den wir mit Ihnen vereinbaren. Für Hausverwaltungen mit mehreren Objekten in Würzburg stimmen wir die Termine gemeinsam ab und sind für alle Häuser derselbe Ansprechpartner.',
      'Ein sauberes Treppenhaus wirkt sich auch auf die Bewohner aus. Wer täglich durch einen gepflegten Eingang geht, geht pfleglicher mit dem Haus um. Und bei einer Wohnungsbesichtigung ist das Treppenhaus das Erste, was Interessenten sehen.',
    ],
    listTitle: 'Das gehört zur Treppenhausreinigung',
    listText: 'Der genaue Umfang hängt vom Haus ab: Anzahl der Etagen, Aufzug, Keller und Gemeinschaftsräume. Wir halten im Angebot fest, was bei jedem Termin gereinigt wird und was in größeren Abständen.',
    list: ['Stufen und Podeste kehren und feucht wischen', 'Handläufe und Geländer abwischen', 'Eingangstüren, Glaseinsätze und Klingelanlage', 'Briefkästen, Lichtschalter und Fensterbänke', 'Kellerflure und Gemeinschaftsräume', 'Fußmatten absaugen oder ausschütteln'],
    detailTitle: 'Was Hausverwaltungen wichtig ist',
    details: [
      ['Feste Termine', 'Die Reinigung läuft nach einem vereinbarten Plan. Bewohner wissen, wann das Treppenhaus gereinigt wird.'],
      ['Ein Ansprechpartner', 'Ob ein Haus oder mehrere: Sie haben eine Telefonnummer und eine Person, die Ihre Objekte kennt.'],
      ['Klare Rechnungen', 'Rechnungen lassen sich je Objekt zuordnen. So behalten Sie bei mehreren Häusern den Überblick.'],
    ],
    guide: ['Tipps für Hausverwaltungen und Eigentümer', [
      'Bevor Sie eine Treppenhausreinigung vergeben, sollten Sie festhalten, welche Bereiche dazugehören. Neben Treppen und Podesten sind das oft der Eingangsbereich, der Aufzug, der Kellerflur, der Fahrradraum oder der Weg zu den Mülltonnen. Was nicht genannt ist, wird im Zweifel auch nicht gereinigt. Eine einfache Liste schafft hier Klarheit für alle Beteiligten.',
      'Für die Bewohner ist Transparenz wichtig. Ein Aushang im Treppenhaus, der Reinigungstag und Ansprechpartner nennt, beugt vielen Rückfragen vor. Dann wissen alle, wann gewischt wird, und können zum Beispiel Schuhe oder Kinderwagen rechtzeitig zur Seite stellen.',
      'Für die Betriebskostenabrechnung sind nachvollziehbare Rechnungen je Objekt hilfreich. Verwalten Sie mehrere Häuser, lohnt sich ein gemeinsamer Ansprechpartner, der alle Objekte kennt. Und denken Sie an die Jahreszeiten: Im Herbst und Winter tragen Bewohner deutlich mehr Laub, Nässe und Streusalz ins Haus. Ein angepasster Rhythmus in diesen Monaten kann sinnvoll sein.',
    ]],
    faq: [
      ['Wie oft wird ein Treppenhaus gereinigt?', 'Das hängt von der Zahl der Parteien und vom Verkehr im Haus ab. In vielen Häusern ist ein wöchentlicher Rhythmus üblich, kleinere Häuser kommen oft mit weniger aus. Den passenden Rhythmus stimmen wir mit Ihnen ab.'],
      ['Können die Kosten auf die Mieter umgelegt werden?', 'Die Kosten der Gebäudereinigung zählen nach der Betriebskostenverordnung zu den umlagefähigen Betriebskosten, wenn der Mietvertrag das vorsieht. Die Prüfung im Einzelfall übernimmt Ihre Hausverwaltung oder Ihre Steuerberatung.'],
      ['Reinigen Sie auch die Fenster im Treppenhaus?', 'Treppenhausfenster und die Glasflächen der Haustür können Teil der regelmäßigen Reinigung sein oder separat als Glasreinigung vereinbart werden.'],
    ],
    closing: ['Treppenhausreinigung in Würzburg anfragen', 'Nennen Sie uns Adresse, Anzahl der Etagen und den gewünschten Rhythmus. Für mehrere Objekte erstellen wir gern ein gemeinsames Angebot.'],
  }),
  landing({
    file: 'glasreinigung-wuerzburg.html', service: 'Glasreinigung', image: 'glasfront-flur',
    title: 'Glasreinigung in Würzburg | König Gebäudereinigung',
    description: 'Glas- und Fensterreinigung in Würzburg: Fenster, Glastüren, Trennwände und Schaufenster streifenfrei, mit Rahmen. Unverbindliches Angebot anfordern.',
    h1: 'Glasreinigung in Würzburg',
    lead: 'Klare Sicht nach draußen und ein glänzender erster Eindruck. Wir reinigen Fenster und Glasflächen in Büros, Praxen, Läden und Wohnanlagen.',
    introTitle: 'Glas zeigt jeden Fingerabdruck',
    intro: [
      'Große Fensterfronten, Glastüren und gläserne Trennwände wirken modern und hell, solange sie sauber sind. Fingerabdrücke, Regenspuren und Staub sieht man darauf allerdings sofort, vor allem wenn die Sonne tief steht. Deshalb lohnt sich eine regelmäßige Glasreinigung.',
      'Damit keine Schlieren zurückbleiben, kommt es auf das richtige Werkzeug und die richtige Reihenfolge an. Rahmen, Falze und Fensterbänke nehmen wir auf Wunsch mit, denn ein sauberes Glas in einem verstaubten Rahmen sieht nur halb so gut aus.',
      'Saubere Fenster haben auch einen praktischen Nutzen: Es kommt spürbar mehr Tageslicht in die Räume. Und bei Schaufenstern und Eingangstüren entscheidet die Glasfläche oft darüber, ob jemand hereinkommt oder weitergeht.',
    ],
    listTitle: 'Das gehört zur Glasreinigung',
    listText: 'Welche Flächen innen und außen gereinigt werden, legen wir vorab fest. Bei Außenflächen in großer Höhe klären wir offen, was sicher erreichbar ist und was nicht.',
    list: ['Fenster innen und außen', 'Rahmen, Falze und Fensterbänke', 'Glastüren und Eingangsbereiche', 'Glastrennwände in Büros', 'Schaufenster und Vitrinen', 'Spiegel und Glasflächen im Innenraum'],
    detailTitle: 'Gut zu wissen',
    details: [
      ['Regelmäßig oder einmalig', 'Fenster lassen sich in festen Abständen reinigen, Schaufenster meist deutlich öfter. Auch ein einzelner Termin ist möglich.'],
      ['Vorab geklärt', 'Höhe, Zugang und Anzahl der Flächen besprechen wir vor dem Termin. So wissen Sie genau, was gereinigt wird.'],
      ['Kombinierbar', 'Die Glasreinigung lässt sich mit der Unterhaltsreinigung verbinden. Dann haben Sie für Böden, Flächen und Fenster einen Ansprechpartner.'],
    ],
    guide: ['Was Sie vor einer Glasreinigung klären sollten', [
      'Für ein genaues Angebot ist die Zahl der Fenster und Glasflächen der wichtigste Punkt. Zählen Sie am besten die Fensterflügel, nicht nur die Fenster, und notieren Sie, ob es Sprossen, Oberlichter oder sehr große Scheiben gibt. Fotos von Fassade und Innenräumen helfen bei der Einschätzung und ersparen oft einen zusätzlichen Termin.',
      'Klären Sie außerdem, wie die Außenseiten erreichbar sind. Fenster, die sich öffnen oder kippen lassen, sind meist unkompliziert. Feste Verglasungen in den oberen Etagen oder über einem Vordach brauchen dagegen eine andere Lösung. Was sicher erreichbar ist, besprechen wir vorab offen mit Ihnen.',
      'Planen Sie die Reinigung möglichst zu einer Zeit, in der die Räume gut zugänglich sind. Pflanzen, Deko und Gegenstände auf den Fensterbänken sollten vorher zur Seite geräumt werden, damit Rahmen und Bänke vollständig gereinigt werden können. Und noch ein Tipp: Wer Fenster und Rahmen regelmäßig reinigen lässt, verhindert, dass sich Schmutz und Ablagerungen festsetzen. Das schont Dichtungen und Oberflächen.',
    ]],
    faq: [
      ['Wie oft sollten Fenster gereinigt werden?', 'Für Büros und Praxen sind einige Reinigungen im Jahr üblich. Schaufenster und Eingangstüren, die viele Menschen berühren, brauchen meist häufiger eine Reinigung.'],
      ['Was passiert bei Regen?', 'Für die Innenseite spielt das Wetter keine Rolle. Ist für Außenflächen starker Regen angesagt, stimmen wir einen neuen Termin mit Ihnen ab.'],
      ['Reinigen Sie auch Fenster in Privatwohnungen?', 'Unser Schwerpunkt sind gewerbliche Objekte und Wohnanlagen. Fragen Sie gern an, wenn es um eine Wohnung geht.'],
    ],
    closing: ['Glasreinigung in Würzburg anfragen', 'Sagen Sie uns, wie viele Fenster oder welche Glasflächen gereinigt werden sollen und ob innen, außen oder beides. Ein Foto hilft bei der Einschätzung.'],
  }),
  landing({
    file: 'grundreinigung-wuerzburg.html', service: 'Grundreinigung', image: 'bodenreinigung-maschine',
    title: 'Grundreinigung in Würzburg | König Gebäudereinigung',
    description: 'Grund- und Sonderreinigung in Würzburg: nach Umbau, vor Einzug oder Neuvermietung und für stark verschmutzte Böden. Jetzt Angebot anfordern.',
    h1: 'Grund- und Sonderreinigung in Würzburg',
    lead: 'Wenn es einmal richtig sauber werden muss. Wir übernehmen einmalige Reinigungen nach Umbauten, vor Übergaben und überall dort, wo die normale Reinigung nicht mehr reicht.',
    introTitle: 'Für die Fälle, in denen Wischen nicht genügt',
    intro: [
      'Nach einer Renovierung liegt feiner Staub auf jeder Oberfläche, auf Böden kleben Farbspritzer und Folienreste. Vor der Übergabe an neue Mieter soll die Fläche einwandfrei aussehen. Und manchmal hat sich auf einem Boden über lange Zeit so viel festgesetzt, dass nur noch eine maschinelle Grundreinigung hilft.',
      'Für solche Einsätze sehen wir uns die Fläche vorher an oder lassen uns Fotos schicken. Danach bekommen Sie ein Angebot mit genau beschriebenem Umfang. So wissen Sie vorab, was Sie erwartet.',
      'Eine Grundreinigung lohnt sich auch als Neustart: Ist ein Objekt einmal gründlich gereinigt, lässt sich der gute Zustand mit einer regelmäßigen Unterhaltsreinigung viel leichter halten.',
    ],
    listTitle: 'Typische Einsätze',
    listText: 'Jeder Einsatz ist anders. Deshalb klären wir vorher, welche Flächen gereinigt werden, welche Beläge es gibt und ob die Räume leer oder möbliert sind.',
    list: ['Reinigung nach Umbau oder Renovierung', 'Übergabe- und Einzugsreinigung', 'Maschinelle Grundreinigung von Böden', 'Entfernen von Kalk und Ablagerungen in Sanitärräumen', 'Reinigung nach Veranstaltungen', 'Reinigung von Leerstandsflächen'],
    detailTitle: 'So läuft eine Grundreinigung ab',
    details: [
      ['Vorab ansehen', 'Wir prüfen Belag, Verschmutzung und Zugang. Erst danach nennen wir einen Preis.'],
      ['Passendes Verfahren', 'Für Fliesen, Stein, Vinyl oder Linoleum wählen wir Mittel und Verfahren, die gründlich reinigen, ohne den Belag anzugreifen.'],
      ['Gemeinsame Übergabe', 'Zum Schluss gehen wir die Fläche auf Wunsch gemeinsam mit Ihnen durch.'],
    ],
    guide: ['So bereiten Sie eine Grundreinigung vor', [
      'Je besser wir die Fläche vorher kennen, desto genauer wird das Angebot. Senden Sie uns am besten einige Fotos der Räume und der Böden aus der Nähe. Hilfreich sind außerdem die ungefähre Fläche in Quadratmetern, die Art der Beläge und der Anlass der Reinigung. Nach einem Umbau sieht die Aufgabe anders aus als vor einer Wohnungsübergabe.',
      'Klären Sie vor dem Termin, ob Strom und Wasser vor Ort verfügbar sind. Gerade in frisch renovierten oder leer stehenden Objekten ist das nicht immer selbstverständlich. Auch Zufahrt und Parkmöglichkeit spielen eine Rolle, wenn Maschinen und Material gebracht werden müssen.',
      'Planen Sie nach einer Grundreinigung etwas Zeit ein, bevor Möbel zurückgestellt oder Räume wieder genutzt werden. Böden sollten vollständig trocken sein. Wenn Sie danach eine regelmäßige Reinigung vereinbaren, bleibt das Ergebnis lange erhalten und die nächste Grundreinigung lässt deutlich länger auf sich warten. Bei Übergaben an Mieter lohnt es sich, den Zustand nach der Reinigung mit Fotos festzuhalten. So lässt sich später leicht belegen, in welchem Zustand die Räume übergeben wurden.',
    ]],
    faq: [
      ['Was ist der Unterschied zwischen Unterhalts- und Grundreinigung?', 'Die Unterhaltsreinigung erhält einen sauberen Zustand in regelmäßigen Abständen. Die Grundreinigung stellt diesen Zustand erst wieder her, indem sie hartnäckige Verschmutzungen und alte Pflegeschichten entfernt.'],
      ['Wie lange dauert eine Grundreinigung?', 'Das hängt von Fläche, Belag und Verschmutzung ab. Die voraussichtliche Dauer nennen wir Ihnen im Angebot.'],
      ['Müssen die Räume dafür leer sein?', 'Leere Räume lassen sich am gründlichsten reinigen. Wenn das nicht möglich ist, besprechen wir, wie wir abschnittsweise vorgehen.'],
    ],
    closing: ['Grund- oder Sonderreinigung anfragen', 'Beschreiben Sie kurz die Fläche und den Anlass, gern mit ein paar Fotos per E-Mail. Sie bekommen ein Angebot für den Einsatz.'],
  }),
];

const ablauf = {
  title: 'Ablauf der Zusammenarbeit | König Gebäudereinigung',
  description: 'So läuft die Zusammenarbeit mit König Gebäudereinigung in Würzburg ab: Anfrage, Objekt besprechen, Angebot und Start der Reinigung nach festem Plan.',
  label: 'Ablauf',
  closing: ['Bereit für den ersten Schritt?', 'Schildern Sie uns Ihr Objekt per Formular, E-Mail oder Telefon. Wir melden uns und besprechen mit Ihnen alles Weitere.'],
  content: `
${pageHead({ eyebrow: 'Ablauf', title: 'So läuft die Zusammenarbeit ab', lead: 'Von der ersten Anfrage bis zur laufenden Reinigung in vier Schritten. Ohne Kleingedrucktes und mit einem Ansprechpartner von Anfang an.' })}
<!--brotkruemel-->
<section class="section" aria-labelledby="schritte">
  <div class="wrap narrow">
    <h2 id="schritte" data-reveal>Vier Schritte bis zur sauberen Lösung</h2>
    <ol class="steps">
      <li data-reveal><h3>Anfrage</h3><p>Sie schildern uns per Formular, E-Mail oder Telefon, um welches Objekt es geht und was gereinigt werden soll. Ein paar Stichworte genügen: Art der Räume, ungefähre Größe und wie oft Sie sich eine Reinigung vorstellen. Fehlt etwas, fragen wir nach.</p></li>
      <li data-reveal><h3>Objekt besprechen</h3><p>Wir klären Fläche, Räume, Bodenbeläge, Besonderheiten und die Zeiten, zu denen gereinigt werden kann. Bei regelmäßigen Reinigungen ist es oft sinnvoll, das Objekt gemeinsam anzusehen. Bei einmaligen Einsätzen reichen manchmal schon einige Fotos.</p></li>
      <li data-reveal><h3>Angebot</h3><p>Sie erhalten ein schriftliches Angebot. Darin steht, welche Leistungen in welchem Rhythmus erbracht werden und was das kostet. Sie entscheiden in Ruhe, ob Sie das Angebot annehmen.</p></li>
      <li data-reveal><h3>Start</h3><p>Nach Ihrer Zusage legen wir den ersten Termin fest und regeln den Zugang zum Objekt. Danach wird nach dem vereinbarten Plan gereinigt, und Sie haben für alle Fragen denselben Ansprechpartner.</p></li>
    </ol>
  </div>
</section>
<section class="section alt" aria-labelledby="vorbereiten">
  <div class="wrap split align-start">
    <div data-reveal>
      <h2 id="vorbereiten">Was Sie für die Anfrage vorbereiten können</h2>
      <p>Je mehr wir über Ihr Objekt wissen, desto genauer wird das Angebot. Sie müssen dafür nichts ausmessen. Ungefähre Angaben reichen für den Anfang, den Rest klären wir im Gespräch.</p>
      <p>Hilfreich sind auch Ihre Erfahrungen mit der bisherigen Reinigung: Was hat gut funktioniert, was hat Sie gestört? Daraus lässt sich viel für den neuen Reinigungsplan ableiten.</p>
    </div>
    <div data-reveal>${checklist(['Art des Objekts, zum Beispiel Büro, Praxis oder Wohnhaus', 'Ungefähre Fläche oder Anzahl der Räume und Etagen', 'Bodenbeläge und Anzahl der Sanitärräume', 'Gewünschter Rhythmus und mögliche Uhrzeiten', 'Besonderheiten wie Zugang, Schlüssel oder Parkmöglichkeiten'])}</div>
  </div>
</section>
<section class="section" aria-labelledby="angebot">
  <div class="wrap narrow" data-reveal>
    <h2 id="angebot">Was in Ihrem Angebot steht</h2>
    <p>Ein Angebot für die Gebäudereinigung sollte so klar sein, dass Sie es ohne Rückfragen verstehen. Deshalb beschreibt unser Angebot, welche Räume und Flächen gereinigt werden, welche Aufgaben bei jedem Termin anfallen und welche in größeren Abständen. Dazu kommen der Rhythmus, die geplanten Zeiten und der Preis.</p>
    <p>Bei regelmäßigen Reinigungen gehören auch Laufzeit und Kündigungsfrist dazu sowie die Frage, wer Verbrauchsmaterial wie Seife und Papier stellt. Bei einmaligen Einsätzen steht der genaue Umfang im Mittelpunkt, damit am Ende kein Missverständnis darüber entsteht, was zur Leistung gehört.</p>
    <p>Prüfen Sie das Angebot in Ruhe und sprechen Sie uns an, wenn Ihnen etwas fehlt oder zu viel ist. Änderungen sind an dieser Stelle einfach und vermeiden spätere Diskussionen.</p>
    <p>Wenn Sie bisher mit einem anderen Reinigungsdienst gearbeitet haben, legen Sie das alte Leistungsverzeichnis gern daneben. Dann sehen Sie auf einen Blick, wo sich die Angebote unterscheiden. Achten Sie dabei weniger auf einzelne Formulierungen als darauf, ob alle Räume und Aufgaben vorkommen, die Ihnen wichtig sind, und ob die Häufigkeit zu Ihrem Alltag passt. Ein günstiger Preis nützt wenig, wenn wichtige Aufgaben fehlen.</p>
  </div>
</section>
<section class="section alt" aria-labelledby="laufend">
  <div class="wrap split align-start">
    <div data-reveal>
      <h2 id="laufend">Wenn die Reinigung läuft</h2>
      <p>Ein Reinigungsplan ist kein starres Dokument. Wächst Ihr Team, wird ein Raum umgebaut oder steht eine Veranstaltung an, passen wir den Plan an. Kurze Wege sind der Vorteil eines inhabergeführten Betriebs: Sie rufen an, und die Sache wird geklärt.</p>
      <p>Fällt Ihnen etwas auf, das nicht so ist, wie es sein soll, sagen Sie uns bitte direkt Bescheid. Rückmeldungen helfen uns, die Reinigung für Ihr Objekt weiter zu verbessern.</p>
    </div>
    <figure class="framed" data-reveal>${photo('empfang-koenig-schriftzug')}</figure>
  </div>
</section>`,
};

const about = {
  title: 'Über König Gebäudereinigung | Reinigung aus Würzburg',
  description: 'König Gebäudereinigung aus Würzburg: familiengeführt und persönlich betreut von Inhaber Leart Spahiu. Wie wir arbeiten und was uns wichtig ist.',
  label: 'Über uns',
  closing: ['Lernen Sie uns kennen', 'Ein kurzes Telefonat genügt oft, um zu sehen, ob wir zueinander passen. Rufen Sie an oder schreiben Sie uns, wir melden uns.'],
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
    <figure class="framed" data-reveal>${photo('bodenreinigung-maschine')}<figcaption class="visually-hidden">[ERSETZEN: Foto von Leart Spahiu oder dem Team]</figcaption></figure>
  </div>
</section>
<section class="section alt" aria-labelledby="werte">
  <div class="wrap">
    <div class="section-head" data-reveal><p class="eyebrow">Unsere Werte</p><h2 id="werte">Was uns wichtig ist</h2><p>Diese Werte stehen hinter jedem Auftrag, egal ob es um eine kleine Kanzlei oder ein ganzes Bürogebäude geht.</p></div>
    <ul class="points">
      <li data-reveal><h3>Zuverlässigkeit</h3><p>Wir versprechen nur, was wir halten können. Wenn etwas nicht in unser Angebot passt, sagen wir das offen.</p></li>
      <li data-reveal><h3>Blick fürs Detail</h3><p>Die Ecke hinter der Tür, der Rand der Fußleiste, die Unterseite des Waschbeckens: Gründlichkeit zeigt sich dort, wo man nicht sofort hinsieht.</p></li>
      <li data-reveal><h3>Diskrete Arbeitsweise</h3><p>Wir bewegen uns in Ihren Räumen wie Gäste. Unterlagen, Bildschirme und persönliche Dinge bleiben unberührt.</p></li>
      <li data-reveal><h3>Persönliche Verantwortung</h3><p>Für jedes Objekt gibt es eine verantwortliche Person. Lob und Kritik kommen bei ihr direkt an.</p></li>
    </ul>
  </div>
</section>
<section class="section" aria-labelledby="kunden">
  <div class="wrap split align-start">
    <div data-reveal>
      <h2 id="kunden">Für wen wir arbeiten</h2>
      <p>Unsere Kunden sind Unternehmen, Praxen, Studios und Hausverwaltungen in Würzburg und Umgebung, also überall dort, wo Menschen arbeiten, behandelt werden oder wohnen. So unterschiedlich die Objekte sind, die Erwartung ist dieselbe: Die Räume sollen verlässlich sauber sein, ohne dass sich jemand im Betrieb darum kümmern muss.</p>
      <p>Gerade kleinere Betriebe schätzen, dass sie bei uns keine Hotline anrufen, sondern direkt mit dem Inhaber sprechen. Und wer mehrere Objekte betreut, etwa eine Hausverwaltung, hat für alle Häuser denselben Ansprechpartner. Die Größe des Auftrags spielt dabei keine Rolle: Ein einzelnes Treppenhaus behandeln wir mit derselben Sorgfalt wie eine ganze Bürofläche.</p>
    </div>
    <ul class="points" data-reveal>
      <li><h3>Unternehmen und Büros</h3><p>Vom kleinen Büro mit wenigen Arbeitsplätzen bis zur Bürofläche über mehrere Etagen.</p></li>
      <li><h3>Arzt- und Therapiepraxen</h3><p>Reinigung nach dem Hygieneplan der Praxis und außerhalb der Sprechzeiten.</p></li>
      <li><h3>Studios und Gewerbeflächen</h3><p>Räume mit viel Publikumsverkehr, in denen der erste Eindruck zählt.</p></li>
      <li><h3>Hausverwaltungen und Eigentümer</h3><p>Treppenhäuser, Eingänge und Gemeinschaftsflächen in Wohnanlagen.</p></li>
    </ul>
  </div>
</section>
<section class="section alt" aria-labelledby="arbeitsweise">
  <div class="wrap split align-start">
    <figure class="framed sticky" data-reveal>${photo('empfang-koenig-schriftzug')}</figure>
    <div data-reveal>
      <h2 id="arbeitsweise">Wie wir arbeiten</h2>
      <p>Am Anfang steht immer ein Gespräch über Ihr Objekt: Welche Räume gibt es, wie werden sie genutzt, wann darf gereinigt werden, was hat Sie bisher gestört? Jedes Objekt betrachten wir einzeln. Daraus entsteht ein Leistungsverzeichnis, in dem jede Aufgabe mit ihrem Intervall steht. Es ist die gemeinsame Grundlage für Sie und für uns.</p>
      <p>Läuft die Reinigung, halten wir Kontakt. Wenn sich Ihr Bedarf ändert, weil ein Team wächst oder ein Raum umgebaut wird, passen wir den Plan an. Kurze Wege und schnelle Entscheidungen sind der Vorteil eines inhabergeführten Betriebs.</p>
      <p>Bei uns steht die persönliche Betreuung im Vordergrund und nicht eine anonyme Großstruktur. Wer anruft, erreicht den Menschen, der den Einsatz plant, und bekommt eine Antwort, ohne dass die Anfrage durch mehrere Abteilungen wandert. Unser Einsatzgebiet ist Würzburg mit allen Stadtteilen und die umliegende Region. Für Objekte weiter außerhalb sprechen Sie uns einfach an.</p>
      ${button('ablauf.html', 'So läuft die Zusammenarbeit ab', 'text-link')}
    </div>
  </div>
</section>`,
};

const allFaq = [
  ['Welche Leistungen bietet König Gebäudereinigung an?', 'Unterhaltsreinigung für Büros, Praxen, Studios und Gewerbeflächen, Glasreinigung, Sanitärreinigung, Treppenhausreinigung, Bodenreinigung sowie Grund- und Sonderreinigungen. Eine Übersicht finden Sie unter <a href="leistungen.html">Leistungen</a>.'],
  ['Was kostet eine Gebäudereinigung in Würzburg?', 'Der Preis hängt von Fläche, Raumarten, Bodenbelägen, Verschmutzung und Häufigkeit ab. Weil sich diese Punkte von Objekt zu Objekt unterscheiden, gibt es keine Pauschale. Wir erstellen jedes Angebot individuell, die Anfrage kostet Sie nichts.'],
  ['Ist die Anfrage verbindlich?', 'Nein. Eine Anfrage über das Formular, per E-Mail oder Telefon verpflichtet Sie zu nichts. Ein Auftrag kommt erst zustande, wenn Sie ein Angebot annehmen. Über die Website wird kein Vertrag geschlossen.'],
  ['Wie lange läuft ein Reinigungsvertrag?', 'Laufzeit und Kündigungsfrist halten wir im Angebot fest und besprechen sie vorher mit Ihnen. Einmalige Einsätze wie eine Grundreinigung sind ohnehin ohne laufenden Vertrag.'],
  ['Wer stellt Reinigungsmittel und Verbrauchsmaterial?', 'Was wir mitbringen und was Sie stellen, zum Beispiel Toilettenpapier, Seife oder Papierhandtücher, legen wir im Angebot fest. So gibt es dazu später keine Unklarheiten.'],
  ['Kann außerhalb der Geschäftszeiten gereinigt werden?', 'Ja. Viele Kunden möchten, dass gereinigt wird, wenn niemand arbeitet oder behandelt wird. Den Zeitpunkt legen wir gemeinsam fest.'],
  ['Was passiert, wenn einmal etwas nicht sauber ist?', 'Sagen Sie uns bitte direkt Bescheid. Wir sehen uns die Stelle an und kümmern uns darum. Rückmeldungen helfen uns, den Reinigungsplan für Ihr Objekt zu verbessern.'],
  ['Wie wird der Zugang zum Objekt geregelt?', 'Wenn wir außerhalb Ihrer Öffnungszeiten reinigen, braucht es einen Schlüssel oder einen Zugangscode. Wie die Übergabe abläuft, besprechen wir vorab und halten es schriftlich fest.'],
  ['Für welche Orte sind Sie im Einsatz?', 'Unser Schwerpunkt ist die Stadt Würzburg mit ihren Stadtteilen. Objekte im Umland übernehmen wir ebenfalls. Fragen Sie an, wir sagen Ihnen offen, ob die Anfahrt zu Ihrem Standort passt.'],
  ['Arbeiten Sie auch für Privathaushalte?', 'Unser Schwerpunkt liegt auf gewerblichen Objekten, Praxen und Wohnanlagen. Anfragen von Privatpersonen prüfen wir im Einzelfall.'],
  ['Muss ich bei der Reinigung anwesend sein?', 'Nein. Viele Kunden lassen reinigen, wenn niemand vor Ort ist. Voraussetzung ist, dass Zugang, Schlüssel und gegebenenfalls die Alarmanlage vorher geregelt sind. Beim ersten Termin kann es trotzdem sinnvoll sein, dass jemand die Räume kurz zeigt.'],
  ['Kann ich den Umfang später ändern?', 'Ja. Wenn Räume dazukommen, ein Bereich anders genutzt wird oder Sie einen anderen Rhythmus brauchen, passen wir das Leistungsverzeichnis an. Ändert sich dadurch der Preis, bekommen Sie vorher ein neues Angebot.'],
  ['Wird Umsatzsteuer berechnet?', 'Nein. König Gebäudereinigung ist Kleinunternehmer im Sinne von § 19 UStG. Auf unseren Rechnungen wird deshalb keine Umsatzsteuer berechnet und ausgewiesen.'],
];

const faqPage = {
  title: 'Häufige Fragen zur Gebäudereinigung | König Würzburg',
  description: 'Antworten auf häufige Fragen zur Gebäudereinigung in Würzburg: Preise, Vertragslaufzeit, Reinigungsmittel, Zugang zum Objekt und Ablauf bei König.',
  label: 'Häufige Fragen',
  faq: allFaq,
  closing: ['Ihre Frage war nicht dabei?', 'Wir beantworten sie gern persönlich. Rufen Sie an oder schreiben Sie uns eine kurze Nachricht.'],
  content: `
${pageHead({ eyebrow: 'Häufige Fragen', title: 'Häufige Fragen zur Gebäudereinigung', lead: 'Was Kunden uns vor der ersten Zusammenarbeit fragen, haben wir hier gesammelt. Fehlt Ihre Frage, schreiben Sie uns oder rufen Sie an.' })}
<!--brotkruemel-->
<section class="section" aria-labelledby="alle-fragen">
  <div class="wrap narrow">
    <h2 id="alle-fragen" class="visually-hidden">Fragen und Antworten</h2>
    <div data-reveal>${faqList(allFaq)}</div>
    <div class="note" data-reveal>
      <h3>Fragen zu einer bestimmten Leistung?</h3>
      <p>Auf den Seiten zu den einzelnen Leistungen beantworten wir Fragen, die nur dort eine Rolle spielen, etwa zur Desinfektion in Praxen oder zur Umlage der Treppenhausreinigung auf die Nebenkosten. Dort finden Sie auch Hinweise, was Sie vor der Beauftragung klären sollten, damit das Angebot von Anfang an zu Ihrem Objekt passt. Wenn Sie unsicher sind, welche Leistung Sie brauchen, rufen Sie einfach an.</p>
      <ul class="link-list">${services.map(([h, t]) => `<li><a href="${h}">${t} in Würzburg</a></li>`).join('')}</ul>
    </div>
  </div>
</section>`,
};

const options = list => list.map(o => `<option>${o}</option>`).join('');
const contact = {
  title: 'Kontakt und Angebot | König Gebäudereinigung Würzburg',
  description: 'Kontakt zu König Gebäudereinigung in Würzburg: Telefon, E-Mail oder Anfrageformular. Fordern Sie ein unverbindliches Angebot für Ihre Reinigung an.',
  label: 'Kontakt',
  closing: ['Lieber direkt sprechen?', 'Manches lässt sich am Telefon schneller klären als per E-Mail. Rufen Sie an, wir besprechen Ihr Objekt und die nächsten Schritte.'],
  content: `
${pageHead({ eyebrow: 'Kontakt', title: 'Kontakt und Angebot', lead: 'Schreiben Sie uns, worum es geht, oder rufen Sie direkt an. Je genauer Sie Ihr Objekt beschreiben, desto schneller bekommen Sie ein passendes Angebot.' })}
<!--brotkruemel-->
<section class="section" aria-labelledby="direkt">
  <div class="wrap contact-grid">
    <div class="contact-aside" data-reveal>
      <h2 id="direkt">So erreichen Sie uns</h2>
      <ul class="contact-facts plain">
        <li>${icons.phone}<span><strong>Telefon</strong><a class="big" href="tel:${site.telephone}">${site.telephoneDisplay}</a></span></li>
        <li>${icons.mail}<span><strong>E-Mail</strong><a href="mailto:${site.email}">${site.email}</a></span></li>
        <li>${icons.clock}<span><strong>Erreichbarkeit</strong>${site.hours}</span></li>
        <li>${icons.pin}<span><strong>Anschrift</strong>${site.name}<br>${site.street}<br>${site.postalCode} ${site.city}</span></li>
      </ul>
      <p>Wir sind im Stadtgebiet Würzburg und in der Umgebung für Sie im Einsatz.</p>
      <p><a class="text-link" href="https://www.google.com/maps/dir/?api=1&amp;destination=${encodeURIComponent(`${site.street}, ${site.postalCode} ${site.city}`)}" target="_blank" rel="noopener">Route in Google Maps öffnen${icons.arrow}</a></p>
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
          <div class="field"><label for="ort">Ort des Objekts</label><input id="ort" name="ort" type="text" autocomplete="address-level2" aria-describedby="ort-hilfe"><p class="hint" id="ort-hilfe">Zum Beispiel Würzburg-Zellerau</p></div>
          <div class="field"><label for="flaeche">Fläche ungefähr</label><input id="flaeche" name="flaeche" type="text" aria-describedby="flaeche-hilfe"><p class="hint" id="flaeche-hilfe">Zum Beispiel 250 m²</p></div>
        </div>
        <div class="field"><label for="nachricht">Ihre Nachricht <span aria-hidden="true">*</span></label><textarea id="nachricht" name="nachricht" rows="6" required aria-required="true" aria-describedby="nachricht-hilfe"></textarea><p class="hint" id="nachricht-hilfe">Zum Beispiel: Art der Räume, Bodenbeläge, gewünschte Reinigungszeiten.</p></div>
        ${site.formKey ? `<input type="hidden" name="access_key" value="${site.formKey}">` : ''}<input type="checkbox" name="botcheck" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
        <p class="hint">Ihre Angaben verwenden wir nur, um Ihre Anfrage zu beantworten. Mehr dazu in der <a href="datenschutz.html#formular">Datenschutzerklärung</a>.</p>
        <button class="button" type="submit">Anfrage senden${icons.arrow}</button>
        <div class="form-status" role="status" aria-live="polite" tabindex="-1" data-form-status></div>
      </form>
      <noscript><p class="hint">Ohne JavaScript schreiben Sie uns bitte direkt an <a href="mailto:${site.email}">${site.email}</a>.</p></noscript>
    </div>
  </div>
</section>
<section class="section alt" aria-labelledby="nach-der-anfrage">
  <div class="wrap narrow" data-reveal>
    <h2 id="nach-der-anfrage">Was nach Ihrer Anfrage passiert</h2>
    <p>Wir lesen jede Anfrage persönlich und melden uns per E-Mail oder Telefon, je nachdem, was Sie angegeben haben. Gemeinsam klären wir die Einzelheiten zu Ihrem Objekt. Danach bekommen Sie ein schriftliches Angebot mit Leistungsumfang, Rhythmus und Preis. Sie entscheiden in Ruhe, erst mit Ihrer Zusage entsteht ein Auftrag. Wie es dann weitergeht, steht unter <a href="ablauf.html">Ablauf</a>.</p>
    <p>Für eine schnelle Einschätzung helfen uns ein paar Angaben: die Art des Objekts, die ungefähre Fläche, die gewünschten Leistungen und wie oft gereinigt werden soll. Fotos können Sie nach unserer ersten Antwort einfach per E-Mail schicken. Wenn Sie lieber sprechen, rufen Sie an und wir klären alles am Telefon.</p>
  </div>
</section>`,
};

const notFound = {
  title: 'Seite nicht gefunden | König Gebäudereinigung Würzburg',
  description: 'Diese Seite gibt es nicht oder nicht mehr. Hier finden Sie den Weg zurück zu den Leistungen und zum Kontakt von König Gebäudereinigung in Würzburg.',
  label: 'Seite nicht gefunden',
  noindex: true,
  content: `
<header class="page-head"><div class="wrap page-head-inner"><p class="eyebrow">Fehler 404</p><h1>Diese Seite gibt es nicht</h1><p class="lead">Vielleicht hat sich die Adresse geändert, oder sie wurde falsch eingegeben. Von hier aus geht es weiter:</p><div class="actions">${button('index.html', 'Zur Startseite', 'button light')}${button('leistungen.html', 'Zu den Leistungen', 'button outline-light')}</div></div></header>`,
};

export const pages = {
  'index.html': home,
  'leistungen.html': leistungen,
  ...Object.fromEntries(landings),
  'ablauf.html': ablauf,
  'ueber-uns.html': about,
  'haeufige-fragen.html': faqPage,
  'kontakt.html': contact,
  '404.html': notFound,
};
