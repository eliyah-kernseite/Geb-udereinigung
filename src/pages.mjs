import { site } from './config.mjs';
import { photo, icons, button, call, pageHead, faqList, checklist, services } from './layout.mjs';

// Startseite nach Bauplan Variante B: Leistungen zuerst.
// Kein Absatz steht auf zwei Seiten, keine Gedankenstriche.
// Titel 50 bis 60 Zeichen, Beschreibung 130 bis 155 Zeichen (prüft npm test).

const stars = n => `<span class="stars" aria-hidden="true">${'★'.repeat(Math.round(n))}</span>`;
const reviews = () => {
  if (!site.reviews.length || !site.reviewSummary || !site.googleProfile) return '';
  const s = site.reviewSummary;
  return `<section class="section reviews" aria-labelledby="bewertungen"><div class="wrap"><div class="reviews-head" data-reveal><h2 id="bewertungen">Bewertungen auf Google</h2><p class="rating"><strong>${String(s.rating).replace('.', ',')}</strong> ${stars(s.rating)} <span>aus ${s.count} Bewertungen auf Google</span></p><a class="text-link" href="${site.googleProfile}" target="_blank" rel="noopener">Alle Bewertungen auf Google ansehen${icons.arrow}</a></div><div class="review-list">${site.reviews.slice(0, 3).map(r => `<figure class="review" data-reveal>${stars(r.stars)}<blockquote><p>${r.text}</p></blockquote><figcaption>${r.name}, ${r.date}</figcaption></figure>`).join('')}</div><p class="hint">Stand: ${s.asOf}</p></div></section>`;
};

const serviceItem = (href, img, title, text, linkText) => `<article class="service" data-reveal><a class="service-link" href="${href}"><div class="service-media">${photo(img, { sizes: '(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 33vw' })}</div><h3>${title}</h3><p>${text}</p><span class="more">${linkText}${icons.arrow}</span></a></article>`;

const homeFaq = [
  ['Was unterscheidet eine Gebäudereinigung von einer Putzhilfe?', 'Bei einer Gebäudereinigung steht im Leistungsverzeichnis schwarz auf weiß, was gemacht wird, und Sie bekommen ordentliche Rechnungen. Mündliche Absprachen, an die sich nach einem halben Jahr keiner mehr so genau erinnert, gibt es dann nicht mehr.'],
  ['Brauche ich für jede Leistung einen eigenen Vertrag?', 'Nein. Unterhaltsreinigung, Fenster und ab und zu eine Sonderreinigung passen in ein gemeinsames Angebot. Das hält auch die Abrechnung übersichtlich.'],
  ['Wie schnell kann die Reinigung starten?', 'Das kommt auf den Umfang an und darauf, wie unsere Planung gerade aussieht. Ist das Angebot angenommen und der Zugang geklärt, machen wir mit Ihnen den ersten Termin aus.'],
  ['Was brauche ich für ein Angebot?', 'Art und ungefähre Größe des Objekts, welche Leistungen Sie möchten und wie oft. Fotos oder ein Grundriss helfen uns, müssen aber nicht sein.'],
];

const home = {
  title: 'Gebäudereinigung Würzburg | König Gebäudereinigung',
  description: 'Gebäudereinigung in Würzburg für Büros, Praxen, Studios und Treppenhäuser. Persönlich geführt, mit festem Ansprechpartner. Jetzt Angebot anfordern.',
  label: 'Startseite',
  faq: homeFaq,
  closing: ['Erzählen Sie uns von Ihrem Objekt', `Rufen Sie an oder schreiben Sie kurz, welche Räume gereinigt werden sollen und wie oft. Sie bekommen dann ein unverbindliches Angebot, egal ob das Objekt mitten in der Stadt liegt oder irgendwo in ${site.area}.`],
  content: `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-media">${photo('buerogebaeude-glasfassade', { priority: true, sizes: '100vw', alt: '' })}</div>
  <div class="wrap hero-inner">
    <p class="eyebrow">Inhabergeführt, aus Würzburg</p>
    <h1 id="hero-title">Gebäudereinigung in Würzburg für Firmen und Hausverwaltungen</h1>
    <p class="lead">Wir reinigen Büros und Praxen, Studios und Gewerbeflächen und für Hausverwaltungen die Treppenhäuser, in der Stadt und im Umland. Ansprechpartner ist der Inhaber selbst, und der kennt Ihr Objekt.</p>
    <div class="actions">${button('kontakt.html', 'Angebot anfordern', 'button light')}${button('bueroreinigung-wuerzburg.html', 'Zur Büroreinigung', 'button outline-light')}</div>
  </div>
</section>

<section class="section" aria-labelledby="leistungen-title">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <p class="eyebrow">Leistungen</p>
      <h2 id="leistungen-title">Was wir reinigen</h2>
      <p>Manche Objekte brauchen jede Woche eine Reinigung, andere nur ein einziges Mal, etwa nach einer Renovierung. Was jeweils dazugehört, steht ausführlich auf der Seite zur jeweiligen Leistung.</p>
    </div>
    <div class="services">
      ${serviceItem('bueroreinigung-wuerzburg.html', 'grossraumbuero', 'Büroreinigung', 'Schreibtische, Besprechungsräume, Teeküche und Toiletten, in einem festen Rhythmus.', 'Zur Büroreinigung')}
      ${serviceItem('praxisreinigung-wuerzburg.html', 'praxis-behandlungsraum', 'Praxisreinigung', 'Für Arzt- und Therapiepraxen, abgestimmt auf Ihren Hygieneplan.', 'Zur Praxisreinigung')}
      ${serviceItem('treppenhausreinigung-wuerzburg.html', 'treppenhaus-altbau', 'Treppenhausreinigung', 'Stufen, Geländer, Eingang und Kellerflur. Für Hausverwaltungen und Eigentümer.', 'Zur Treppenhausreinigung')}
      ${serviceItem('glasreinigung-wuerzburg.html', 'glastueren-buero', 'Glasreinigung', 'Fenster, Glastüren und Schaufenster, auf Wunsch samt Rahmen.', 'Zur Glasreinigung')}
      ${serviceItem('grundreinigung-wuerzburg.html', 'wischeimer-warnschild', 'Grund- und Sonderreinigung', 'Einmalige Einsätze, zum Beispiel nach dem Umbau oder bevor neue Mieter einziehen.', 'Zur Grundreinigung')}
      <div class="service service-all" data-reveal><h3>Alle Leistungen</h3><p>Sanitär- und Bodenreinigung laufen meistens als Teil der Unterhaltsreinigung mit. Hier geht es zur kompletten Übersicht:</p><ul class="link-list"><li><a href="leistungen.html#unterhaltsreinigung">Unterhaltsreinigung</a></li><li><a href="leistungen.html#sanitaerreinigung">Sanitärreinigung</a></li><li><a href="leistungen.html#bodenreinigung">Bodenreinigung</a></li><li><a href="leistungen.html">Alle Leistungen im Überblick</a></li></ul></div>
    </div>
  </div>
</section>
${reviews()}
<section class="section alt" aria-labelledby="einblicke-title">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <h2 id="einblicke-title">Wo der erste Eindruck entsteht</h2>
      <p>Meistens schon an der Eingangstür. Fingerabdrücke auf dem Glas oder ein Waschraum, in dem die Seife fehlt, fallen Besuchern viel schneller auf als ein ordentlicher Schreibtisch, und genau an diesen Stellen fängt eine gute Reinigung an.</p>
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
      <h2 id="gruende-title">Was Sie von uns erwarten können</h2>
      <p>König Gebäudereinigung ist ein inhabergeführter Betrieb aus Würzburg. Wenn Sie anrufen, sprechen Sie mit ${site.owner}, also mit dem, der auch die Einsätze plant und Ihr Objekt kennt.</p>
      <p>Fragen, Änderungswünsche und auch mal eine Beschwerde landen deshalb immer bei derselben Person. Sie müssen also nichts zweimal erklären.</p>
    </div>
    <div data-reveal>${checklist(['Was im Reinigungsplan steht, wird zum vereinbarten Termin erledigt.', 'Umfang und Rhythmus richten sich danach, wie groß Ihre Räume sind und wie sie genutzt werden.', 'Akten, Bildschirme und Patientenunterlagen fassen wir nicht an. Wer in Kanzleien und Praxen reinigt, muss diskret sein.'])}</div>
  </div>
</section>

<section class="section dark" aria-labelledby="ueber-title">
  <div class="wrap split">
    <figure class="framed" data-reveal>${photo('bodenreinigung-maschine')}</figure>
    <div data-reveal>
      <p class="eyebrow">Über uns</p>
      <h2 id="ueber-title">Wer hinter König Gebäudereinigung steht</h2>
      <p>Angefangen hat König Gebäudereinigung als Familienbetrieb. Heute führt ${site.owner} das Unternehmen und betreut die Objekte persönlich, für Unternehmen und Praxen genauso wie für Hausverwaltungen.</p>
      ${button('ueber-uns.html', 'Mehr über uns', 'text-link')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="gebiet-title">
  <div class="wrap split align-start">
    <div data-reveal>
      <h2 id="gebiet-title">Wo wir reinigen</h2>
      <p>Hauptsächlich in Würzburg, in allen Stadtteilen. Liegt Ihr Objekt im Umland, fragen Sie trotzdem an. Wir sagen Ihnen ehrlich, ob die Anfahrt zu Ihrem Standort passt.</p>
      <p>Für einen ersten Termin oder eine Besichtigung erreichen Sie uns am Telefon und per E-Mail.</p>
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
      <h2 id="fragen-start">Vier Fragen, die vor dem ersten Auftrag oft kommen</h2>
      <p>So oder so ähnlich fragen uns Unternehmen und Hausverwaltungen, bevor sie zum ersten Mal eine Gebäudereinigung beauftragen. Mehr Antworten stehen unter <a href="haeufige-fragen.html">Häufige Fragen</a>.</p>
    </div>
    <div data-reveal>${faqList(homeFaq)}</div>
  </div>
</section>`,
};

// Leistungsübersicht: alle sechs Bereiche mit Anker. Liste ist optional, damit nicht jeder Block gleich aussieht.
const overview = [
  ['unterhaltsreinigung', 'Unterhaltsreinigung', 'grossraumbuero', 'Das ist die Reinigung, die einfach regelmäßig läuft, je nach Objekt täglich, ein paar Mal pro Woche oder einmal in der Woche. Dazu gehören Böden, Arbeits- und Kontaktflächen, Küchen und Sanitärräume, außerdem werden die Papierkörbe geleert. Was davon wann gemacht wird, halten wir in einem Leistungsverzeichnis fest, das wir vorher mit Ihnen durchgehen.', ['Für Büros, Praxen, Studios und Gewerbeflächen', 'Leistungsverzeichnis mit festen Intervallen'], ['bueroreinigung-wuerzburg.html', 'Büroreinigung in Würzburg im Detail']],
  ['glasreinigung', 'Glasreinigung', 'glastueren-buero', 'Saubere Fenster lassen mehr Licht herein, und Besucher sehen schon von draußen, ob hier jemand auf Ordnung achtet. Wir reinigen Fenster, Glastüren, Glastrennwände und Schaufenster streifenfrei, auf Wunsch auch Rahmen und Falze. Bei den Außenflächen klären wir vorher, was sicher erreichbar ist, und sagen es Ihnen auch, wenn etwas nicht geht. Ob regelmäßig oder als einzelner Termin, entscheiden Sie.', null, ['glasreinigung-wuerzburg.html', 'Glasreinigung in Würzburg im Detail']],
  ['sanitaerreinigung', 'Sanitärreinigung', 'waschraum', 'Kaum ein Raum wird so kritisch angeschaut wie die Toilette. Wir reinigen WC-Anlagen, Urinale, Waschbecken, Armaturen, Spiegel und Fliesen gründlich und gehen dem Kalk an den Stellen zu Leibe, an denen er sich gern festsetzt. Seife, Papier und Handtücher nachfüllen kann mit in die Vereinbarung.', ['WC-Anlagen, Waschbecken und Armaturen', 'Fliesen, Spiegel und Trennwände', 'Verbrauchsmaterial nach Absprache'], ['praxisreinigung-wuerzburg.html', 'Reinigung von Praxisräumen ansehen']],
  ['treppenhausreinigung', 'Treppenhausreinigung', 'treppenhaus-altbau', 'Durchs Treppenhaus laufen Mieter, Besucher und Paketboten. Wir kehren und wischen Stufen und Podeste, wischen Handläufe, Geländer, Briefkästen, Türen und Lichtschalter ab und halten Eingang und Kellerflur in Ordnung.', ['Für Hausverwaltungen und Eigentümer', 'Fester Reinigungsplan für jedes Haus'], ['treppenhausreinigung-wuerzburg.html', 'Treppenhausreinigung in Würzburg im Detail']],
  ['bodenreinigung', 'Bodenreinigung', 'empfang-koenig-schriftzug', 'Fliesen, Vinyl, Linoleum, Laminat, Naturstein und Teppich brauchen jeweils andere Mittel und Verfahren. Wir nehmen das, was zum Belag passt, damit die Oberfläche lange schön bleibt. Ist ein Boden stark verschmutzt, hilft oft nur noch eine maschinelle Grundreinigung, auch die übernehmen wir.', null, ['grundreinigung-wuerzburg.html', 'Grundreinigung von Böden ansehen']],
  ['sonderreinigung', 'Sonderreinigung', 'bodenreinigung-maschine', 'Manches fällt nur einmal an. Nach einem Umbau zum Beispiel, vor der Übergabe an neue Mieter, nach einer Veranstaltung oder einfach, weil es wieder richtig sauber werden soll. Den Umfang besprechen wir vorher und schreiben ihn ins Angebot.', ['Reinigung nach Umbau oder Renovierung', 'Vor Einzug, Auszug oder Neuvermietung', 'Einmalige Tiefenreinigung'], ['grundreinigung-wuerzburg.html', 'Grund- und Sonderreinigung im Detail']],
];

const leistungen = {
  title: 'Leistungen der Gebäudereinigung in Würzburg | König',
  description: 'Unterhalts-, Glas-, Sanitär-, Treppenhaus-, Boden- und Sonderreinigung in Würzburg und Umgebung. Alle Leistungen von König Gebäudereinigung.',
  label: 'Leistungen',
  closing: ['Welche Leistungen braucht Ihr Objekt?', 'Schreiben Sie uns kurz, um welche Räume es geht, wie groß die Fläche ungefähr ist und wie oft gereinigt werden soll. Daraus stellen wir Ihnen ein Angebot zusammen.'],
  content: `
${pageHead({ eyebrow: 'Leistungen', title: 'Leistungen unserer Gebäudereinigung in Würzburg', lead: 'Hier stehen alle sechs Bereiche auf einer Seite. Sie können sie einzeln oder kombiniert als laufende Reinigung beauftragen oder nur für einen einmaligen Einsatz.', image: 'buerogebaeude-glasfassade', pos: '70% 50%' })}
<!--brotkruemel-->
<section class="section" aria-labelledby="ueberblick-title">
  <div class="wrap narrow" data-reveal>
    <h2 id="ueberblick-title">Gebäudereinigung, alles in einem Vertrag</h2>
    <p>In den meisten Objekten kommt einiges zusammen: die regelmäßige Unterhaltsreinigung, ein paar Mal im Jahr die Fenster und hin und wieder eine Grundreinigung der Böden. Dafür brauchen Sie bei König Gebäudereinigung keine drei Firmen. Alles steht in einem gemeinsamen Leistungsverzeichnis, und Ihr Ansprechpartner bleibt derselbe.</p>
    <p>Was genau Ihr Objekt braucht, hängt davon ab, wie die Räume genutzt werden. Ein Büro mit Kundenverkehr braucht einen ordentlichen Empfang und saubere Glastüren, in einer Praxis kommt es vor allem auf gründlich gereinigte Sanitärräume und Böden an. Beim ersten Gespräch gehen wir Ihre Räume zusammen durch und machen Ihnen einen Vorschlag. Was Sie davon beauftragen, entscheiden Sie.</p>
    <p>Die wichtigsten Leistungen haben jeweils eine eigene Seite mit genauer Beschreibung, häufigen Fragen und Tipps, was Sie vorher klären sollten. Weiter unten finden Sie zu jedem Bereich eine kurze Zusammenfassung mit dem Link dorthin. Sanitär- und Bodenreinigung laufen in der Regel als Teil der Unterhaltsreinigung, Sie können sie aber auch einzeln beauftragen.</p>
    <nav class="jump" aria-label="Leistungen auf dieser Seite"><ul>${overview.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ul></nav>
  </div>
</section>
${overview.map(([id, t, img, text, list, [href, linkText]], i) => `
<section class="section service-row${i % 2 ? ' reverse alt' : ''}" id="${id}" aria-labelledby="${id}-title">
  <div class="wrap split">
    <div data-reveal>
      <h2 id="${id}-title">${t}</h2>
      <p>${text}</p>
      ${list ? checklist(list) : ''}
      ${button(href, linkText, 'text-link')}
    </div>
    <figure class="framed" data-reveal>${photo(img)}</figure>
  </div>
</section>`).join('')}`,
};

// Der Block "details" einer Leistungsseite kann unterschiedlich aussehen:
// Paare [Titel, Text] als Punkte, { steps } als nummerierte Schritte, { text } als Fließtext.
function detailBlock(title, details) {
  if (details.steps) return `<div class="wrap narrow"><h2 id="besonderheiten" data-reveal>${title}</h2><ol class="steps">${details.steps.map(([t, x]) => `<li data-reveal><h3>${t}</h3><p>${x}</p></li>`).join('')}</ol></div>`;
  if (details.text) return `<div class="wrap narrow" data-reveal><h2 id="besonderheiten">${title}</h2>${details.text.map(p => `<p>${p}</p>`).join('')}</div>`;
  return `<div class="wrap"><div class="section-head" data-reveal><h2 id="besonderheiten">${title}</h2></div><ul class="points${details.length === 3 ? ' three' : ''}">${details.map(([t, x]) => `<li data-reveal><h3>${t}</h3><p>${x}</p></li>`).join('')}</ul></div>`;
}

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
  ${detailBlock(detailTitle, details)}
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
    file: 'bueroreinigung-wuerzburg.html', service: 'Büroreinigung', image: 'grossraumbuero',
    title: 'Büroreinigung in Würzburg | König Gebäudereinigung',
    description: 'Büroreinigung in Würzburg: Arbeitsplätze, Küchen und Sanitärräume nach festem Plan, abgestimmt auf Ihre Arbeitszeiten. Jetzt Angebot anfordern.',
    h1: 'Büroreinigung in Würzburg',
    lead: 'Wir reinigen Ihr Büro regelmäßig und zu Zeiten, die Ihren Betrieb nicht stören. Am nächsten Morgen ist die Küche wieder ordentlich und der Empfang so, wie Kunden ihn sehen sollen.',
    introTitle: 'Ein sauberes Büro, um das sich keiner kümmern muss',
    intro: [
      'In einem Büro fällt Schmutz selten auf einen Schlag an. Kaffeeringe auf dem Besprechungstisch, Krümel unter den Schreibtischen, Fingerabdrücke an der Glastür: Es sind die vielen Kleinigkeiten, die über die Woche den Eindruck verändern. Eine regelmäßige Büroreinigung fängt das auf, bevor es jemandem auffällt.',
      'Welche Räume wie oft drankommen, legen wir mit Ihnen zusammen fest. Die Teeküche braucht vielleicht jeden Tag jemanden, beim Archiv reicht es alle zwei Wochen. Sie zahlen also für das, was wirklich nötig ist, und Ihr Team arbeitet trotzdem jeden Tag in ordentlichen Räumen.',
      'Dass das auch etwas mit der Stimmung zu tun hat, merkt man spätestens am Montagmorgen, wenn auf dem Schreibtisch noch die Krümel vom Freitag liegen. Kunden und Bewerber sehen außerdem, wie Sie mit Ihren Räumen umgehen, und gepflegte Böden und Möbel halten schlicht länger.',
    ],
    listTitle: 'Das gehört zur Büroreinigung',
    listText: 'Welche dieser Aufgaben bei jedem Termin anfallen und welche seltener, steht im Leistungsverzeichnis. Das passen wir an, wenn sich Ihr Bedarf ändert, zum Beispiel weil das Team wächst oder ein Raum anders genutzt wird.',
    list: ['Arbeitsplätze, Schreibtische und Kontaktflächen', 'Böden saugen und feucht wischen', 'Küchen, Teeküchen und Pausenräume', 'Sanitärräume und Waschbecken', 'Papierkörbe leeren', 'Besprechungsräume und Empfang'],
    detailTitle: 'So arbeiten wir in Ihrem Büro',
    details: { text: [
      'Gereinigt wird, wenn es Ihnen passt, also so, dass Telefonate, Kundentermine und konzentriertes Arbeiten nicht gestört werden. Die Zeiten stimmen wir vorher mit Ihnen ab.',
      'Auf den Schreibtischen bleibt alles, wo es ist. Ordner, Akten und persönliche Sachen räumen wir nicht weg, gewischt werden die freien Flächen. Was bei jedem Termin passiert, steht im Leistungsverzeichnis, und wenn sich bei Ihnen etwas ändert, ändern wir eben das Verzeichnis.',
    ] },
    guide: ['Worauf es bei der Büroreinigung ankommt', [
      'Bevor Sie eine Büroreinigung beauftragen, lohnt sich ein ehrlicher Blick auf den Alltag in Ihren Räumen. Wie viele Menschen arbeiten dort, und wie viele Besucher kommen am Tag? Gibt es eine Küche, die mittags stark genutzt wird? Welche Böden liegen in den Räumen, Teppich, Vinyl oder Fliesen? Diese Fragen bestimmen, wie oft gereinigt werden sollte und wie lange ein Termin dauert.',
      'Schreiben Sie sich außerdem auf, was Sie bisher gestört hat. Vielleicht wurde die Spülmaschine nie ausgeräumt, oder die Heizkörper hat seit Monaten keiner abgewischt. So etwas gehört gleich ins Leistungsverzeichnis. Dann ist klar, was erwartet wird, und Sie müssen später nicht hinterhertelefonieren.',
      'Und dann ist da noch der Zugang. Soll vor Arbeitsbeginn gereinigt werden, nach Feierabend oder während des Betriebs? Gibt es eine Alarmanlage, und wer bekommt einen Schlüssel? Je früher das geklärt ist, desto reibungsloser fängt die Zusammenarbeit an.',
    ]],
    faq: [
      ['Wie oft sollte ein Büro gereinigt werden?', 'Das hängt von der Zahl der Mitarbeitenden ab, vom Kundenverkehr und von der Art der Räume. Küchen und Sanitärräume brauchen meist öfter Aufmerksamkeit als die Büroflächen selbst. Wir empfehlen Ihnen einen Rhythmus, der zu Nutzung und Größe passt.'],
      ['Kann auch außerhalb der Arbeitszeiten gereinigt werden?', 'Ja, die Reinigung kann vor Arbeitsbeginn oder nach Feierabend stattfinden. Wie der Zugang dann geregelt wird, besprechen wir vorab und halten es schriftlich fest.'],
      ['Reinigen Sie auch kleine Büros?', 'Ja. Auch eine Kanzlei mit wenigen Räumen oder ein kleines Agenturbüro kann eine regelmäßige Reinigung gut gebrauchen. Wichtig ist nur, dass Umfang und Preis zueinander passen.'],
    ],
    closing: ['Büroreinigung in Würzburg anfragen', 'Schicken Sie uns die ungefähre Fläche, die Zahl der Räume und wie oft gereinigt werden soll. Daraus machen wir ein Angebot für die Reinigung Ihres Büros.'],
  }),
  landing({
    file: 'praxisreinigung-wuerzburg.html', service: 'Praxisreinigung', image: 'praxis-behandlungsraum',
    title: 'Praxisreinigung in Würzburg | König Gebäudereinigung',
    description: 'Praxisreinigung in Würzburg für Arzt-, Zahnarzt- und Therapiepraxen: gründlich, nach Ihrem Hygieneplan und außerhalb der Sprechzeiten möglich.',
    h1: 'Praxisreinigung in Würzburg',
    lead: 'Patienten schauen genau hin, wie eine Praxis aussieht. Wir reinigen Wartebereich, Behandlungsräume und Toiletten gründlich, und zwar dann, wenn keine Sprechstunde ist.',
    introTitle: 'Was Patienten zuerst sehen',
    intro: [
      'Ob sich jemand in Ihrer Praxis gut aufgehoben fühlt, entscheidet sich oft schon im Wartezimmer, an der Anmeldung oder auf der Patiententoilette. Für Behandlungsräume gelten dabei andere Anforderungen als für ein Büro, deshalb planen wir die Reinigung Raum für Raum.',
      'Grundlage ist Ihr Hygieneplan. Darin steht, welche Flächen Ihr Praxisteam selbst desinfiziert und welche Aufgaben der Reinigungsdienst übernimmt. Ist das sauber aufgeteilt, wird nichts doppelt gemacht und auch nichts vergessen.',
      'In Praxen mit vielen Patienten am Tag kommt einiges zusammen, vom Straßenschmutz im Eingang bis zu den Fingerabdrücken an Türen und Griffen. Mit einer festen Reinigung sieht Ihre Praxis jeden Morgen wieder so aus, wie Ihre Patienten es erwarten.',
    ],
    listTitle: 'Das gehört zur Praxisreinigung',
    listText: 'Für jeden Raum halten wir fest, was gereinigt wird und wie oft. Bereiche mit besonderen Anforderungen, etwa Eingriffs- oder Sterilisationsräume, bleiben nach Absprache in der Verantwortung Ihres Praxisteams.',
    list: ['Wartezimmer, Anmeldung und Flure', 'Böden in Behandlungs- und Funktionsräumen', 'Patienten- und Personaltoiletten', 'Türgriffe, Lichtschalter und Handläufe', 'Sozialräume und Teeküche', 'Abfall nach Vorgabe der Praxis'],
    detailTitle: 'Worauf wir in Praxen achten',
    details: [
      ['Außerhalb der Sprechzeiten', 'Wir kommen, wenn keine Patienten da sind. Wann genau, stimmen wir mit Ihnen ab.'],
      ['Nach Ihrem Hygieneplan', 'Mittel und Verfahren richten sich nach den Vorgaben Ihrer Praxis. Was der Plan für den Reinigungsdienst vorsieht, setzen wir so um.'],
      ['Verschwiegenheit', 'Patientenakten und Bildschirme bleiben unberührt. Was wir in Ihrer Praxis sehen, bleibt auch dort.'],
    ],
    guide: ['Was Praxen vor der Beauftragung klären sollten', [
      'Der wichtigste Schritt ist ein Blick in Ihren Hygieneplan. Darin steht, welche Flächen und Gegenstände wie oft gereinigt oder desinfiziert werden und wer dafür zuständig ist. Je klarer diese Aufteilung ist, desto genauer lässt sich der Auftrag für den Reinigungsdienst beschreiben. Am besten bringen Sie den Plan gleich zum ersten Gespräch mit.',
      'Genauso wichtig sind die Zeiten. Viele Praxen haben an einzelnen Tagen Abendsprechstunde oder machen mittwochs früher zu. Die Reinigung sollte so liegen, dass sie weder Patienten noch Ihr Team stört und die Räume am nächsten Morgen fertig sind.',
      'Dann die Frage nach dem Abfall. Normaler Praxismüll, Papier und Verpackungen lassen sich meist problemlos mitnehmen, für Abfälle mit besonderen Anforderungen gelten eigene Regeln, die Ihre Praxis vorgibt. Auch das gehört schriftlich in die Vereinbarung. Und legen Sie fest, wer im Team für den Reinigungsdienst ansprechbar ist, sonst landen Rückfragen am Ende bei der Anmeldung.',
    ]],
    faq: [
      ['Für welche Praxen reinigen Sie?', 'Für Arztpraxen, Zahnarztpraxen, Physiotherapie, Ergotherapie, Logopädie und psychotherapeutische Praxen. Welche Räume wir übernehmen, legen wir gemeinsam fest.'],
      ['Übernehmen Sie auch die Desinfektion?', 'Welche Flächen desinfiziert werden und von wem, legt Ihr Hygieneplan fest. Die Aufgaben, die dort für den Reinigungsdienst vorgesehen sind, übernehmen wir mit den vorgegebenen Mitteln.'],
      ['Können Sie in der Mittagspause reinigen?', 'Für kurze Aufgaben wie die Patiententoilette kann das sinnvoll sein. Die komplette Reinigung legen wir lieber in eine Zeit, in der niemand in der Praxis ist.'],
    ],
    closing: ['Praxisreinigung in Würzburg anfragen', 'Sagen Sie uns, um welche Art von Praxis es geht, wie viele Räume sie hat und wann gereinigt werden soll. Wir melden uns mit einem Angebot.'],
  }),
  landing({
    file: 'treppenhausreinigung-wuerzburg.html', service: 'Treppenhausreinigung', image: 'treppenhaus-altbau',
    title: 'Treppenhausreinigung in Würzburg | König Gebäudereinigung',
    description: 'Treppenhausreinigung in Würzburg für Hausverwaltungen und Eigentümer: Stufen, Geländer, Eingänge und Kellerflure nach festem Plan. Jetzt anfragen.',
    h1: 'Treppenhausreinigung in Würzburg',
    lead: 'Wir übernehmen die regelmäßige Reinigung im Treppenhaus für Hausverwaltungen, Eigentümergemeinschaften und Vermieter in Würzburg und Umgebung.',
    introTitle: 'Schluss mit dem Putzplan im Hausflur',
    intro: [
      'Wenn die Bewohner das Treppenhaus selbst putzen sollen, gibt es früher oder später Streit: Der eine wischt gründlich, die andere gar nicht. Mit einer Treppenhausreinigung ist das Thema erledigt. Das Haus sieht immer gleich gepflegt aus, und niemand muss Nachbarn an ihren Putztag erinnern.',
      'Gereinigt wird in einem festen Rhythmus, den wir mit Ihnen vereinbaren. Für Hausverwaltungen mit mehreren Objekten in Würzburg stimmen wir die Termine gemeinsam ab und sind für alle Häuser derselbe Ansprechpartner.',
      'Wird eine Wohnung neu vermietet, ist das Treppenhaus übrigens das Erste, was Interessenten vom Haus sehen. Ein verdreckter Eingang mit Werbezetteln auf dem Boden ist da keine gute Empfehlung.',
    ],
    listTitle: 'Das gehört zur Treppenhausreinigung',
    listText: 'Der genaue Umfang hängt vom Haus ab: Anzahl der Etagen, Aufzug, Keller und Gemeinschaftsräume. Wir halten im Angebot fest, was bei jedem Termin gereinigt wird und was in größeren Abständen.',
    list: ['Stufen und Podeste kehren und feucht wischen', 'Handläufe und Geländer abwischen', 'Eingangstüren, Glaseinsätze und Klingelanlage', 'Briefkästen, Lichtschalter und Fensterbänke', 'Kellerflure und Gemeinschaftsräume', 'Fußmatten absaugen oder ausschütteln'],
    detailTitle: 'Was Hausverwaltungen wichtig ist',
    details: { text: [
      'Die Reinigung läuft nach einem festen Plan, die Bewohner wissen also, an welchem Tag das Treppenhaus dran ist. Ob Sie uns ein einzelnes Haus anvertrauen oder mehrere, Sie haben eine Telefonnummer und eine Person, die Ihre Objekte kennt.',
      'Die Rechnungen stellen wir so, dass Sie jede einem Objekt zuordnen können. Bei mehreren Häusern behalten Sie so den Überblick, und für die Betriebskostenabrechnung ist es auch einfacher.',
    ] },
    guide: ['Tipps für Hausverwaltungen und Eigentümer', [
      'Bevor Sie eine Treppenhausreinigung vergeben, sollten Sie festhalten, welche Bereiche dazugehören. Neben Treppen und Podesten sind das oft der Eingangsbereich, der Aufzug, der Kellerflur, der Fahrradraum oder der Weg zu den Mülltonnen. Was nicht genannt ist, wird im Zweifel auch nicht gereinigt. Eine einfache Liste erspart hier allen Beteiligten Ärger.',
      'Die Bewohner möchten wissen, woran sie sind. Ein Aushang im Treppenhaus mit Reinigungstag und Ansprechpartner erspart viele Rückfragen. Dann weiß jeder, wann gewischt wird, und kann Schuhe oder Kinderwagen vorher zur Seite stellen.',
      'Für die Betriebskostenabrechnung helfen nachvollziehbare Rechnungen je Objekt. Wenn Sie mehrere Häuser verwalten, lohnt sich ein gemeinsamer Ansprechpartner, der alle Objekte kennt. Und denken Sie an die Jahreszeiten: Im Herbst und Winter tragen Bewohner deutlich mehr Laub, Nässe und Streusalz ins Haus, da kann ein angepasster Rhythmus für diese Monate sinnvoll sein.',
    ]],
    faq: [
      ['Wie oft wird ein Treppenhaus gereinigt?', 'Das hängt von der Zahl der Parteien und vom Verkehr im Haus ab. In vielen Häusern ist ein wöchentlicher Rhythmus üblich, kleinere Häuser kommen oft mit weniger aus. Den passenden Rhythmus stimmen wir mit Ihnen ab.'],
      ['Können die Kosten auf die Mieter umgelegt werden?', 'Die Kosten der Gebäudereinigung zählen nach der Betriebskostenverordnung zu den umlagefähigen Betriebskosten, wenn der Mietvertrag das vorsieht. Die Prüfung im Einzelfall übernimmt Ihre Hausverwaltung oder Ihre Steuerberatung.'],
      ['Reinigen Sie auch die Fenster im Treppenhaus?', 'Treppenhausfenster und die Glasflächen der Haustür können Teil der regelmäßigen Reinigung sein oder separat als Glasreinigung vereinbart werden.'],
    ],
    closing: ['Treppenhausreinigung in Würzburg anfragen', 'Nennen Sie uns Adresse, Anzahl der Etagen und den gewünschten Rhythmus. Für mehrere Objekte erstellen wir gern ein gemeinsames Angebot.'],
  }),
  landing({
    file: 'glasreinigung-wuerzburg.html', service: 'Glasreinigung', image: 'glastueren-buero',
    title: 'Glasreinigung in Würzburg | König Gebäudereinigung',
    description: 'Glas- und Fensterreinigung in Würzburg: Fenster, Glastüren, Trennwände und Schaufenster streifenfrei, mit Rahmen. Unverbindliches Angebot anfordern.',
    h1: 'Glasreinigung in Würzburg',
    lead: 'Wir reinigen Fenster und Glasflächen in Büros, Praxen, Läden und Wohnanlagen. Innen sowieso, außen überall dort, wo man sicher drankommt.',
    introTitle: 'Glas zeigt jeden Fingerabdruck',
    intro: [
      'Große Fensterfronten, Glastüren und gläserne Trennwände wirken modern und hell, solange sie sauber sind. Fingerabdrücke, Regenspuren und Staub sieht man darauf allerdings sofort, vor allem wenn die Sonne tief steht. Deshalb lohnt sich eine regelmäßige Glasreinigung.',
      'Damit keine Schlieren zurückbleiben, kommt es auf das richtige Werkzeug und die richtige Reihenfolge an. Rahmen, Falze und Fensterbänke nehmen wir auf Wunsch mit, denn ein sauberes Glas in einem verstaubten Rahmen sieht nur halb so gut aus.',
      'Saubere Fenster haben auch einen ganz praktischen Nutzen, weil spürbar mehr Tageslicht in die Räume kommt. Und bei Schaufenstern und Eingangstüren entscheidet die Scheibe oft darüber, ob jemand hereinkommt oder weitergeht.',
    ],
    listTitle: 'Das gehört zur Glasreinigung',
    listText: 'Welche Flächen innen und außen gereinigt werden, legen wir vorab fest. Bei Außenflächen in großer Höhe klären wir offen, was sicher erreichbar ist und was nicht.',
    list: ['Fenster innen und außen', 'Rahmen, Falze und Fensterbänke', 'Glastüren und Eingangsbereiche', 'Glastrennwände in Büros', 'Schaufenster und Vitrinen', 'Spiegel und Glasflächen im Innenraum'],
    detailTitle: 'Gut zu wissen',
    details: [
      ['Regelmäßig oder einmalig', 'Fenster lassen sich in festen Abständen reinigen, Schaufenster meist deutlich öfter. Ein einzelner Termin geht aber genauso. Höhe, Zugang und Anzahl der Flächen besprechen wir vorher, damit Sie genau wissen, was gereinigt wird.'],
      ['Mit der Unterhaltsreinigung kombinierbar', 'Wenn wir bei Ihnen ohnehin regelmäßig reinigen, kann die Glasreinigung einfach mit in den Plan. Dann haben Sie für Böden, Flächen und Fenster einen Ansprechpartner.'],
    ],
    guide: ['Was Sie vor einer Glasreinigung klären sollten', [
      'Für ein genaues Angebot ist die Zahl der Fenster und Glasflächen der wichtigste Punkt. Zählen Sie am besten die Fensterflügel, nicht nur die Fenster, und notieren Sie, ob es Sprossen, Oberlichter oder sehr große Scheiben gibt. Fotos von Fassade und Innenräumen helfen bei der Einschätzung und ersparen oft einen zusätzlichen Termin.',
      'Klären Sie außerdem, wie man an die Außenseiten kommt. Fenster, die sich öffnen oder kippen lassen, sind meist unkompliziert. Feste Verglasungen in den oberen Etagen oder über einem Vordach brauchen dagegen eine andere Lösung. Was sicher erreichbar ist, besprechen wir vorab offen mit Ihnen.',
      'Planen Sie die Reinigung möglichst zu einer Zeit, in der man gut an die Fenster herankommt. Pflanzen, Deko und alles, was auf den Fensterbänken steht, sollte vorher weggeräumt sein, sonst lassen sich Rahmen und Bänke nicht vollständig reinigen. Noch ein Tipp zum Schluss: Wer Fenster und Rahmen regelmäßig reinigen lässt, verhindert, dass sich Schmutz und Ablagerungen festsetzen, und das schont auf Dauer Dichtungen und Oberflächen.',
    ]],
    faq: [
      ['Wie oft sollten Fenster gereinigt werden?', 'Für Büros und Praxen sind einige Reinigungen im Jahr üblich. Schaufenster und Eingangstüren, die viele Menschen anfassen, brauchen meist öfter eine Reinigung.'],
      ['Was passiert bei Regen?', 'Für die Innenseite spielt das Wetter keine Rolle. Ist für die Außenflächen starker Regen angesagt, machen wir mit Ihnen einen neuen Termin aus.'],
      ['Reinigen Sie auch Fenster in Privatwohnungen?', 'Unser Schwerpunkt sind gewerbliche Objekte und Wohnanlagen. Fragen Sie trotzdem gern an, wenn es um eine Wohnung geht.'],
    ],
    closing: ['Glasreinigung in Würzburg anfragen', 'Sagen Sie uns, wie viele Fenster oder welche Glasflächen gereinigt werden sollen und ob innen, außen oder beides. Ein Foto hilft bei der Einschätzung.'],
  }),
  landing({
    file: 'grundreinigung-wuerzburg.html', service: 'Grundreinigung', image: 'wischeimer-warnschild',
    title: 'Grundreinigung in Würzburg | König Gebäudereinigung',
    description: 'Grund- und Sonderreinigung in Würzburg: nach Umbau, vor Einzug oder Neuvermietung und für stark verschmutzte Böden. Jetzt Angebot anfordern.',
    h1: 'Grund- und Sonderreinigung in Würzburg',
    lead: 'Wir übernehmen einmalige Reinigungen nach Umbauten und vor Übergaben, und überall da, wo die normale Reinigung einfach nicht mehr hinterherkommt.',
    introTitle: 'Wenn Wischen nicht mehr reicht',
    intro: [
      'Nach einer Renovierung liegt feiner Staub auf jeder Oberfläche, auf den Böden kleben Farbspritzer und Folienreste. Vor der Übergabe an neue Mieter soll die Fläche einwandfrei aussehen. Und manchmal hat sich auf einem Boden über lange Zeit so viel festgesetzt, dass nur noch eine maschinelle Grundreinigung hilft.',
      'Für solche Einsätze sehen wir uns die Fläche vorher an oder lassen uns Fotos schicken. Danach bekommen Sie ein Angebot, in dem der Umfang genau beschrieben ist, und wissen vorher, was Sie erwartet.',
      'Eine Grundreinigung ist auch ein guter Neustart. Ist ein Objekt einmal gründlich sauber, lässt sich der Zustand mit einer regelmäßigen Unterhaltsreinigung viel leichter halten.',
    ],
    listTitle: 'Typische Einsätze',
    listText: 'Jeder Einsatz ist anders. Deshalb klären wir vorher, welche Flächen gereinigt werden, welche Beläge es gibt und ob die Räume leer oder möbliert sind.',
    list: ['Reinigung nach Umbau oder Renovierung', 'Übergabe- und Einzugsreinigung', 'Maschinelle Grundreinigung von Böden', 'Entfernen von Kalk und Ablagerungen in Sanitärräumen', 'Reinigung nach Veranstaltungen', 'Reinigung von Leerstandsflächen'],
    detailTitle: 'So läuft eine Grundreinigung ab',
    details: { steps: [
      ['Ansehen', 'Wir schauen uns Belag, Verschmutzung und Zugang an, vor Ort oder anhand Ihrer Fotos. Einen Preis nennen wir erst danach.'],
      ['Reinigen', 'Für Fliesen, Stein, Vinyl oder Linoleum nehmen wir Mittel und Verfahren, die gründlich reinigen und den Belag dabei nicht angreifen.'],
      ['Übergeben', 'Zum Schluss gehen wir die Fläche auf Wunsch gemeinsam mit Ihnen durch.'],
    ] },
    guide: ['So bereiten Sie eine Grundreinigung vor', [
      'Je besser wir die Fläche vorher kennen, desto genauer wird das Angebot. Schicken Sie uns am besten ein paar Fotos der Räume und der Böden aus der Nähe. Hilfreich sind außerdem die ungefähre Fläche in Quadratmetern, die Art der Beläge und der Anlass der Reinigung, denn nach einem Umbau sieht die Aufgabe anders aus als vor einer Wohnungsübergabe.',
      'Klären Sie vor dem Termin, ob vor Ort Strom und Wasser da sind. Gerade in frisch renovierten oder leer stehenden Objekten ist das nicht immer selbstverständlich. Auch Zufahrt und Parkmöglichkeit spielen eine Rolle, wenn Maschinen und Material gebracht werden müssen.',
      'Nach einer Grundreinigung sollten Sie etwas Zeit einplanen, bevor Möbel zurückgestellt oder die Räume wieder genutzt werden. Die Böden müssen vollständig trocken sein. Wenn Sie danach eine regelmäßige Reinigung vereinbaren, bleibt das Ergebnis lange erhalten, und bis zur nächsten Grundreinigung dauert es deutlich länger. Bei Übergaben an Mieter lohnt es sich, den Zustand nach der Reinigung zu fotografieren. Dann lässt sich später leicht belegen, wie die Räume übergeben wurden.',
    ]],
    faq: [
      ['Was ist der Unterschied zwischen Unterhalts- und Grundreinigung?', 'Die Unterhaltsreinigung erhält einen sauberen Zustand in regelmäßigen Abständen. Die Grundreinigung stellt diesen Zustand erst wieder her, indem sie hartnäckige Verschmutzungen und alte Pflegeschichten entfernt.'],
      ['Wie lange dauert eine Grundreinigung?', 'Das hängt von Fläche, Belag und Verschmutzung ab. Die voraussichtliche Dauer nennen wir Ihnen im Angebot.'],
      ['Müssen die Räume dafür leer sein?', 'Leere Räume lassen sich am gründlichsten reinigen. Wenn das nicht geht, besprechen wir, wie wir abschnittsweise vorgehen.'],
    ],
    closing: ['Grund- oder Sonderreinigung anfragen', 'Beschreiben Sie kurz die Fläche und den Anlass, gern mit ein paar Fotos per E-Mail. Sie bekommen ein Angebot für den Einsatz.'],
  }),
];

const ablauf = {
  title: 'Ablauf der Zusammenarbeit | König Gebäudereinigung',
  description: 'So läuft die Zusammenarbeit mit König Gebäudereinigung in Würzburg ab: Anfrage, Objekt besprechen, Angebot und Start der Reinigung nach festem Plan.',
  label: 'Ablauf',
  closing: ['Am Anfang steht eine kurze Nachricht', 'Schildern Sie uns Ihr Objekt über das Formular, per E-Mail oder am Telefon. Wir melden uns und besprechen den Rest mit Ihnen.'],
  content: `
${pageHead({ eyebrow: 'Ablauf', title: 'So läuft die Zusammenarbeit ab', lead: 'Von der ersten Anfrage bis zur laufenden Reinigung sind es vier Schritte. Ihr Ansprechpartner ist dabei von Anfang an derselbe.' })}
<!--brotkruemel-->
<section class="section" aria-labelledby="schritte">
  <div class="wrap narrow">
    <h2 id="schritte" data-reveal>Die vier Schritte im Einzelnen</h2>
    <ol class="steps">
      <li data-reveal><h3>Anfrage</h3><p>Sie schreiben uns über das Formular, per E-Mail oder rufen an und sagen, um welches Objekt es geht und was gereinigt werden soll. Ein paar Stichworte genügen: Art der Räume, ungefähre Größe und wie oft Sie sich eine Reinigung vorstellen. Fehlt etwas, fragen wir nach.</p></li>
      <li data-reveal><h3>Objekt besprechen</h3><p>Wir klären Fläche, Räume, Bodenbeläge und die Zeiten, zu denen gereinigt werden kann, und was es sonst noch Besonderes gibt. Bei regelmäßigen Reinigungen ist es oft sinnvoll, das Objekt gemeinsam anzusehen. Bei einmaligen Einsätzen reichen manchmal schon ein paar Fotos.</p></li>
      <li data-reveal><h3>Angebot</h3><p>Sie bekommen ein schriftliches Angebot. Darin steht, welche Leistungen in welchem Rhythmus erbracht werden und was das kostet. Ob Sie es annehmen, entscheiden Sie in Ruhe.</p></li>
      <li data-reveal><h3>Start</h3><p>Nach Ihrer Zusage legen wir den ersten Termin fest und regeln den Zugang zum Objekt. Danach wird nach dem vereinbarten Plan gereinigt, und für alle Fragen haben Sie denselben Ansprechpartner wie am Anfang.</p></li>
    </ol>
  </div>
</section>
<section class="section alt" aria-labelledby="vorbereiten">
  <div class="wrap split align-start">
    <div data-reveal>
      <h2 id="vorbereiten">Was Sie für die Anfrage vorbereiten können</h2>
      <p>Je mehr wir über Ihr Objekt wissen, desto genauer wird das Angebot. Ausmessen müssen Sie dafür nichts. Ungefähre Angaben reichen für den Anfang, den Rest klären wir im Gespräch.</p>
      <p>Was uns auch hilft, sind Ihre Erfahrungen mit der bisherigen Reinigung. Was lief gut, was hat Sie gestört? Daraus lässt sich für den neuen Reinigungsplan eine Menge ableiten.</p>
    </div>
    <div data-reveal>${checklist(['Art des Objekts, zum Beispiel Büro, Praxis oder Wohnhaus', 'Ungefähre Fläche oder Anzahl der Räume und Etagen', 'Bodenbeläge und Anzahl der Sanitärräume', 'Gewünschter Rhythmus und mögliche Uhrzeiten', 'Besonderheiten wie Zugang, Schlüssel oder Parkmöglichkeiten'])}</div>
  </div>
</section>
<section class="section" aria-labelledby="angebot">
  <div class="wrap narrow" data-reveal>
    <h2 id="angebot">Was in Ihrem Angebot steht</h2>
    <p>Ein Angebot für die Gebäudereinigung sollte man ohne Rückfragen verstehen können. Unseres beschreibt deshalb, welche Räume und Flächen gereinigt werden, welche Aufgaben bei jedem Termin anfallen und welche in größeren Abständen. Dazu kommen der Rhythmus, die geplanten Zeiten und der Preis.</p>
    <p>Bei regelmäßigen Reinigungen gehören auch Laufzeit und Kündigungsfrist dazu und die Frage, wer Verbrauchsmaterial wie Seife und Papier stellt. Bei einmaligen Einsätzen kommt es vor allem auf den genauen Umfang an, damit hinterher nicht diskutiert werden muss, was zur Leistung gehört und was nicht.</p>
    <p>Lesen Sie das Angebot in Ruhe durch und sagen Sie uns, wenn Ihnen etwas fehlt oder zu viel ist. Jetzt lässt sich noch alles leicht ändern.</p>
    <p>Wenn Sie bisher mit einem anderen Reinigungsdienst gearbeitet haben, legen Sie das alte Leistungsverzeichnis ruhig daneben. Dann sehen Sie auf einen Blick, wo sich die Angebote unterscheiden. Achten Sie dabei weniger auf einzelne Formulierungen als darauf, ob alle Räume und Aufgaben vorkommen, die Ihnen wichtig sind, und ob die Häufigkeit zu Ihrem Alltag passt. Ein günstiger Preis nützt wenig, wenn wichtige Aufgaben fehlen.</p>
  </div>
</section>
<section class="section alt" aria-labelledby="laufend">
  <div class="wrap split align-start">
    <div data-reveal>
      <h2 id="laufend">Wenn die Reinigung läuft</h2>
      <p>Den Reinigungsplan passen wir an, sobald sich bei Ihnen etwas ändert, weil zum Beispiel das Team wächst, ein Raum umgebaut wird oder eine Veranstaltung ansteht. Das ist der Vorteil an einem inhabergeführten Betrieb: Sie rufen an, und die Sache ist geklärt.</p>
      <p>Und wenn Ihnen mal etwas auffällt, das nicht so ist, wie es sein soll, sagen Sie uns bitte direkt Bescheid. Nur so können wir die Reinigung für Ihr Objekt besser machen.</p>
    </div>
    <figure class="framed" data-reveal>${photo('empfang-koenig-schriftzug')}</figure>
  </div>
</section>`,
};

const about = {
  title: 'Über König Gebäudereinigung | Reinigung aus Würzburg',
  description: 'König Gebäudereinigung aus Würzburg: familiengeführt und persönlich betreut von Inhaber Leart Spahiu. Wie wir arbeiten und was uns wichtig ist.',
  label: 'Über uns',
  closing: ['Am besten einfach anrufen', 'Nach einem kurzen Telefonat weiß man oft schon, ob es passt. Rufen Sie an oder schreiben Sie uns, wir melden uns bei Ihnen.'],
  content: `
${pageHead({ eyebrow: 'Über uns', title: 'Gebäudereinigung aus Würzburg, persönlich geführt', lead: 'König Gebäudereinigung ist ein inhabergeführter Reinigungsbetrieb aus Würzburg. Wenn Sie anrufen, sprechen Sie mit dem Inhaber selbst.' })}
<!--brotkruemel-->
<section class="section" aria-labelledby="geschichte">
  <div class="wrap split">
    <div data-reveal>
      <h2 id="geschichte">Wie alles angefangen hat</h2>
      <p>König Gebäudereinigung hat als Familienbetrieb angefangen und ist Schritt für Schritt gewachsen. [PERSÖNLICHE ANEKDOTE: Wann und warum der Betrieb gegründet wurde und wie ${site.owner} dazugekommen ist] Heute reinigen wir Büros und Praxen, Studios und Gewerbeflächen sowie Treppenhäuser in Würzburg und im Umland.</p>
      <p>Geführt wird das Unternehmen von ${site.owner}. Er kennt die Objekte seiner Kunden, plant die Einsätze und ist selbst erreichbar, wenn etwas zu klären ist. Genau deshalb arbeiten viele Kunden lieber mit einem kleineren Betrieb als mit einer großen Zentrale.</p>
    </div>
    <figure class="framed" data-reveal>${photo('bodenreinigung-maschine')}</figure>
  </div>
</section>
<section class="section alt" aria-labelledby="werte">
  <div class="wrap narrow" data-reveal>
    <h2 id="werte">Was uns wichtig ist</h2>
    <p>Wir versprechen nur, was wir auch halten können. Passt etwas nicht in unser Angebot, sagen wir das vorher und nicht erst, wenn es schiefgegangen ist.</p>
    <p>Gründlich heißt für uns auch die Ecke hinter der Tür und die Unterseite vom Waschbecken, also die Stellen, an denen man nicht sofort hinschaut. [PERSÖNLICHES DETAIL: Ein Beispiel von ${site.owner}, worauf er bei einer Reinigung immer zuerst achtet]</p>
    <p>In Ihren Räumen bewegen wir uns wie Gäste. Unterlagen, Bildschirme und persönliche Sachen bleiben unberührt, egal ob es um eine kleine Kanzlei oder ein ganzes Bürogebäude geht. Und für jedes Objekt gibt es eine Person, die dafür verantwortlich ist, Lob und Kritik kommen also direkt bei ihr an.</p>
  </div>
</section>
<section class="section" aria-labelledby="kunden">
  <div class="wrap split align-start">
    <div data-reveal>
      <h2 id="kunden">Für wen wir arbeiten</h2>
      <p>Unsere Kunden sind Unternehmen, Praxen, Studios und Hausverwaltungen in Würzburg und Umgebung. Die Objekte könnten unterschiedlicher kaum sein, erwartet wird aber überall dasselbe: Die Räume sollen verlässlich sauber sein, ohne dass sich im Betrieb jemand darum kümmern muss.</p>
      <p>Kleinere Betriebe schätzen vor allem, dass sie bei uns direkt mit dem Inhaber sprechen. Wer mehrere Objekte betreut, etwa eine Hausverwaltung, hat für alle Häuser denselben Ansprechpartner. Ein einzelnes Treppenhaus bekommt dabei dieselbe Sorgfalt wie eine ganze Bürofläche.</p>
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
      <p>Am Anfang steht immer ein Gespräch über Ihr Objekt. Welche Räume gibt es, wie werden sie genutzt, wann darf gereinigt werden, und was hat Sie bisher gestört? Daraus entsteht ein Leistungsverzeichnis, in dem jede Aufgabe mit ihrem Intervall steht. Das ist dann die gemeinsame Grundlage für Sie und für uns.</p>
      <p>Läuft die Reinigung, bleiben wir in Kontakt. Wenn sich Ihr Bedarf ändert, weil ein Team wächst oder ein Raum umgebaut wird, passen wir den Plan an, und zwar ohne lange Abstimmungsrunden. Gereinigt wird auf Wunsch auch vor Arbeitsbeginn oder nach Feierabend, wenn niemand mehr in den Räumen ist. Wie wir dann hineinkommen, halten wir schriftlich fest.</p>
      <p>Wer bei uns anruft, erreicht den Menschen, der den Einsatz plant, und bekommt eine Antwort, ohne dass die Anfrage erst durch mehrere Abteilungen wandert. Unser Einsatzgebiet ist Würzburg mit allen Stadtteilen und die Region drumherum. Liegt Ihr Objekt weiter draußen, sprechen Sie uns einfach an.</p>
      ${button('ablauf.html', 'So läuft die Zusammenarbeit ab', 'text-link')}
    </div>
  </div>
</section>`,
};

const allFaq = [
  ['Welche Leistungen bietet König Gebäudereinigung an?', 'Unterhaltsreinigung für Büros, Praxen, Studios und Gewerbeflächen, Glasreinigung, Sanitärreinigung, Treppenhausreinigung, Bodenreinigung sowie Grund- und Sonderreinigungen. Eine Übersicht finden Sie unter <a href="leistungen.html">Leistungen</a>.'],
  ['Was kostet eine Gebäudereinigung in Würzburg?', 'Der Preis hängt von Fläche, Raumarten, Bodenbelägen, Verschmutzung und Häufigkeit ab. Weil das von Objekt zu Objekt anders ist, gibt es keine Pauschale. Wir rechnen jedes Angebot für Ihr Objekt einzeln, und die Anfrage kostet Sie nichts.'],
  ['Ist die Anfrage verbindlich?', 'Nein. Eine Anfrage über das Formular, per E-Mail oder Telefon verpflichtet Sie zu nichts. Ein Auftrag kommt erst zustande, wenn Sie ein Angebot annehmen. Über die Website wird kein Vertrag geschlossen.'],
  ['Wie lange läuft ein Reinigungsvertrag?', 'Laufzeit und Kündigungsfrist halten wir im Angebot fest und besprechen sie vorher mit Ihnen. Einmalige Einsätze wie eine Grundreinigung laufen ohnehin ohne festen Vertrag.'],
  ['Wer stellt Reinigungsmittel und Verbrauchsmaterial?', 'Was wir mitbringen und was Sie stellen, zum Beispiel Toilettenpapier, Seife oder Papierhandtücher, legen wir im Angebot fest. Dann muss später niemand darüber rätseln.'],
  ['Kann außerhalb der Geschäftszeiten gereinigt werden?', 'Ja. Viele Kunden möchten, dass gereinigt wird, wenn niemand arbeitet oder behandelt wird. Den Zeitpunkt legen wir gemeinsam fest.'],
  ['Was passiert, wenn einmal etwas nicht sauber ist?', 'Sagen Sie uns bitte direkt Bescheid. Wir sehen uns die Stelle an und kümmern uns darum. Solche Rückmeldungen helfen uns, den Reinigungsplan für Ihr Objekt zu verbessern.'],
  ['Wie wird der Zugang zum Objekt geregelt?', 'Wenn wir außerhalb Ihrer Öffnungszeiten reinigen, braucht es einen Schlüssel oder einen Zugangscode. Wie die Übergabe abläuft, besprechen wir vorab und halten es schriftlich fest.'],
  ['Für welche Orte sind Sie im Einsatz?', 'Vor allem für die Stadt Würzburg mit ihren Stadtteilen. Objekte im Umland übernehmen wir ebenfalls. Fragen Sie an, wir sagen Ihnen offen, ob die Anfahrt zu Ihrem Standort passt.'],
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
  closing: ['Ihre Frage war nicht dabei?', 'Dann fragen Sie uns direkt, am Telefon oder mit einer kurzen Nachricht.'],
  content: `
${pageHead({ eyebrow: 'Häufige Fragen', title: 'Häufige Fragen zur Gebäudereinigung', lead: 'Hier steht, was Kunden uns vor der ersten Zusammenarbeit am häufigsten fragen. Fehlt Ihre Frage, schreiben Sie uns oder rufen Sie an.' })}
<!--brotkruemel-->
<section class="section" aria-labelledby="alle-fragen">
  <div class="wrap narrow">
    <h2 id="alle-fragen" class="visually-hidden">Fragen und Antworten</h2>
    <div data-reveal>${faqList(allFaq)}</div>
    <div class="note" data-reveal>
      <h3>Fragen zu einer bestimmten Leistung?</h3>
      <p>Auf den Seiten zu den einzelnen Leistungen beantworten wir Fragen, die nur dort eine Rolle spielen, etwa zur Desinfektion in Praxen oder zur Umlage der Treppenhausreinigung auf die Nebenkosten. Dort steht auch, was Sie vor der Beauftragung klären sollten, damit das Angebot von Anfang an zu Ihrem Objekt passt. Und wenn Sie nicht sicher sind, welche Leistung Sie überhaupt brauchen, rufen Sie einfach an.</p>
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
  closing: ['Lieber direkt sprechen?', 'Manches ist am Telefon schneller geklärt als per E-Mail. Rufen Sie an, dann besprechen wir Ihr Objekt gleich direkt.'],
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
      <p>Wir reinigen in ganz Würzburg und im Umland.</p>
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
    <p>Jede Anfrage lesen wir selbst. Wir melden uns per E-Mail oder Telefon, je nachdem, was Sie angegeben haben, und klären mit Ihnen die Einzelheiten zu Ihrem Objekt. Danach bekommen Sie ein schriftliches Angebot mit Leistungsumfang, Rhythmus und Preis. Sie entscheiden in Ruhe, erst mit Ihrer Zusage entsteht ein Auftrag. Wie es dann weitergeht, steht unter <a href="ablauf.html">Ablauf</a>.</p>
    <p>Für eine schnelle Einschätzung helfen uns ein paar Angaben: die Art des Objekts, die ungefähre Fläche, die gewünschten Leistungen und wie oft gereinigt werden soll. Fotos können Sie nach unserer ersten Antwort einfach per E-Mail schicken. Wer lieber redet als schreibt, ruft einfach an.</p>
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
