import { site, standLabel } from './config.mjs';
import { photos, legalItems } from './layout.mjs';

// Rechtsseiten im festen KERNSEITE-Aufbau: Unternavigation, Inhaltsverzeichnis, Angaben als Liste.
// Nur Dienste nennen, die die Website wirklich nutzt. Kein Haftungsausschluss aus Generatoren.

const rows = list => `<dl class="rows">${list.filter(Boolean).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
const tel = `<a href="tel:${site.telephone}">${site.telephoneDisplay}</a>`;
const mail = `<a href="mailto:${site.email}">${site.email}</a>`;
const address = `${site.street}<br>${site.postalCode} ${site.city}<br>Deutschland`;
const ext = (href, text) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;

const websiteBlock = `<section class="legal-credit" aria-labelledby="website"><h2 id="website">Website</h2><p>Konzept, Design und Umsetzung: <a href="https://www.kernseite.com" target="_blank" rel="noopener"><strong>KERNSEITE</strong></a>, Webdesign aus Würzburg</p><p>Fotos: siehe <a href="bildnachweise.html">Bildnachweise</a></p></section>`;

function legalPage(file, { title, description, label, h1, groups, next, noindex = true }) {
  const subnav = legalItems.map(([h, t]) => `<li><a href="${h}"${h === file ? ' aria-current="page"' : ''}>${t}</a></li>`).join('');
  const toc = groups.map(g => `<li><a href="#${g.id}">${g.title}</a></li>`).join('');
  return {
    title, description, label, noindex, legal: true,
    content: `
<header class="legal-head"><div class="wrap">
  <p class="eyebrow">Rechtliches</p>
  <h1>${h1}</h1>
  <div class="legal-meta"><nav class="legal-subnav" aria-label="Rechtliche Seiten"><ul>${subnav}</ul></nav><p class="stand">Stand: ${standLabel}</p></div>
</div></header>
<div class="wrap legal">
  <aside class="toc" aria-label="Inhaltsverzeichnis"><details class="toc-mobile"><summary>Auf dieser Seite</summary><ol>${toc}</ol></details><nav class="toc-desktop"><p>Auf dieser Seite</p><ol>${toc}</ol></nav></aside>
  <div class="legal-body">
    ${groups.map(g => `<section class="group" id="${g.id}" aria-labelledby="${g.id}-titel"><h2 id="${g.id}-titel">${g.title}</h2>${g.html}</section>`).join('\n    ')}
    ${websiteBlock}
    <p class="next"><a href="${next[0]}">${next[1]} →</a></p>
  </div>
</div>`,
  };
}

const impressum = legalPage('impressum.html', {
  title: 'Impressum | König Gebäudereinigung Würzburg, Leart Spahiu',
  description: 'Impressum von König Gebäudereinigung in Würzburg: Inhaber Leart Spahiu, Anschrift in der Neidertstraße 8, Telefon und E-Mail sowie Angaben nach § 5 DDG.',
  label: 'Impressum',
  h1: 'Impressum',
  next: ['datenschutz.html', 'Weiter zum Datenschutz'],
  groups: [
    { id: 'anbieter', title: 'Anbieter', html: `<p>Angaben nach § 5 DDG</p>${rows([['Name', site.owner], ['Unternehmen', site.name], ['Rechtsform', `${site.legalForm} [ERSETZEN: Rechtsform und Firmenname bestätigen, ggf. Registereintrag]`], ['Anschrift', address]])}` },
    { id: 'kontakt', title: 'Kontakt', html: rows([['Telefon', tel], ['E-Mail', mail]]) },
    { id: 'steuer', title: 'Steuer', html: rows([['Umsatzsteuer-ID', '[ERSETZEN: USt-IdNr. nach § 27a UStG oder Wirtschafts-ID, falls vorhanden. Sonst Abschnitt entfernen]']]) },
    { id: 'streitbeilegung', title: 'Verbraucherstreitbeilegung', html: '<p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>' },
  ],
});

const formUsed = Boolean(site.formKey);
const datenschutz = legalPage('datenschutz.html', {
  title: 'Datenschutzerklärung | König Gebäudereinigung Würzburg',
  description: 'Datenschutz bei König Gebäudereinigung in Würzburg: kein Tracking, keine Cookies. Welche Daten bei Besuch und Anfrage anfallen und welche Rechte Sie haben.',
  label: 'Datenschutz',
  h1: 'Datenschutzerklärung',
  noindex: false,
  next: ['barrierefreiheit.html', 'Weiter zur Barrierefreiheit'],
  groups: [
    { id: 'ueberblick', title: 'Auf einen Blick', html: `<p>Verantwortlich für diese Website ist ${site.owner}, Inhaber von ${site.name} in ${site.city}. Beim Besuch fallen nur die technischen Daten an, die jeder Server zum Ausliefern einer Seite braucht. Wir setzen keine Cookies, nutzen keine Analyse- oder Werbedienste und laden nichts von fremden Servern. Wenn Sie uns anrufen oder schreiben, verwenden wir Ihre Angaben nur für Ihre Anfrage. Sie können jederzeit Auskunft verlangen, Daten berichtigen oder löschen lassen und der Verarbeitung widersprechen.</p>` },
    { id: 'verantwortlich', title: 'Verantwortliche Stelle', html: `${rows([['Name', `${site.owner}, ${site.name}`], ['Anschrift', address], ['Telefon', tel], ['E-Mail', mail]])}<p>Einen Datenschutzbeauftragten haben wir nicht bestellt, weil die gesetzlichen Voraussetzungen dafür nicht vorliegen.</p>` },
    { id: 'allgemeines', title: 'Allgemeines', html: rows([
      ['Rechtsgrundlagen', 'Wir verarbeiten Daten auf Grundlage von Art. 6 Abs. 1 DSGVO: lit. a (Einwilligung), lit. b (Vertrag oder Anfrage vor einem Vertrag), lit. c (gesetzliche Pflicht) und lit. f (berechtigtes Interesse). Welche Grundlage gilt, steht bei der jeweiligen Verarbeitung.'],
      ['Speicherdauer', 'Wir speichern Daten nur so lange, wie es für den Zweck nötig ist oder Gesetze es verlangen. Danach werden sie gelöscht.'],
      ['Empfänger', 'Daten erhalten nur unser Hoster als Auftragsverarbeiter und, wenn Sie Auftraggeber werden, gegebenenfalls unsere Steuerberatung. Wir verkaufen keine Daten.'],
      ['Drittländer', formUsed ? 'Beim Anfrageformular kann der Formulardienst Daten außerhalb der EU verarbeiten. Einzelheiten stehen im Abschnitt zum Formular.' : 'Wir übermitteln keine Daten in Staaten außerhalb der EU oder des EWR.'],
      ['Pflicht zur Bereitstellung', 'Sie müssen uns keine Daten geben. Ohne Kontaktdaten können wir eine Anfrage aber nicht beantworten.'],
      ['Automatisierte Entscheidungen', 'Es gibt keine automatisierten Entscheidungen und kein Profiling.'],
      ['Verschlüsselung', 'Die Website ist per TLS verschlüsselt. Sie erkennen das an https:// und dem Schloss in der Adresszeile.'],
    ]) },
    { id: 'hosting', title: 'Hosting und Server-Logfiles', html: rows([
      ['Was', 'IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse, übertragene Datenmenge, Statuscode, zuvor besuchte Seite, Browser und Betriebssystem.'],
      ['Wozu', 'Um die Website auszuliefern, Fehler zu finden und Angriffe abzuwehren.'],
      ['Rechtsgrundlage', 'Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse ist ein sicherer und stabiler Betrieb.'],
      ['Anbieter', `${site.host.name}, ${site.host.address}. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. ${ext(site.host.privacy, 'Datenschutzerklärung von Hostinger')}`],
      ['Speicherdauer', `Die Logfiles werden nach höchstens ${site.host.logDays} Tagen gelöscht. [ERSETZEN: Löschfrist der Logfiles beim Hoster bestätigen]`],
    ]) },
    { id: 'kontakt', title: 'Kontakt per E-Mail und Telefon', html: rows([
      ['Was', 'Name, Kontaktdaten, Firma und was Sie uns zu Ihrem Objekt mitteilen.'],
      ['Wozu', 'Um Ihre Anfrage zu beantworten, eine Besichtigung abzustimmen und ein Angebot zu erstellen.'],
      ['Rechtsgrundlage', 'Art. 6 Abs. 1 lit. b DSGVO, wenn es um einen möglichen Auftrag geht. Sonst Art. 6 Abs. 1 lit. f DSGVO, unser Interesse an der Beantwortung.'],
      ['Empfänger', 'Nur wir. E-Mails liegen im Postfach bei unserem E-Mail-Anbieter. [ERSETZEN: E-Mail-Anbieter nennen, falls nicht Hostinger]'],
      ['Speicherdauer', 'Bis die Anfrage erledigt ist. Kommt kein Auftrag zustande, löschen wir sie spätestens nach sechs Monaten. Bei einem Auftrag gelten die gesetzlichen Aufbewahrungsfristen von sechs bis zehn Jahren.'],
    ]) },
    formUsed
      ? { id: 'formular', title: 'Anfrageformular', html: rows([
        ['Was', 'Die Angaben, die Sie in das Formular eintragen.'],
        ['Wozu', 'Um Ihre Anfrage als E-Mail an uns weiterzuleiten.'],
        ['Rechtsgrundlage', 'Art. 6 Abs. 1 lit. b DSGVO. Für eine Verarbeitung außerhalb der EU Art. 49 Abs. 1 lit. b DSGVO.'],
        ['Anbieter', 'Web3Forms. [ERSETZEN: Anschrift von Web3Forms] ' + ext('https://web3forms.com/privacy', 'Datenschutzerklärung von Web3Forms')],
        ['Speicherdauer', 'Bei uns wie bei E-Mails. Beim Anbieter nach dessen Datenschutzerklärung.'],
      ]) }
      : { id: 'formular', title: 'Anfrageformular', html: '<p>Das Formular auf der Kontaktseite sendet selbst keine Daten. Beim Absenden öffnet sich Ihr eigenes E-Mail-Programm mit einer vorbereiteten Nachricht. Erst wenn Sie diese abschicken, erhalten wir Ihre Angaben wie bei jeder anderen E-Mail. Es gilt der Abschnitt zum Kontakt per E-Mail.</p>' },
    { id: 'darstellung', title: 'Einstellungen zur Darstellung', html: rows([
      ['Was', 'Ihre Auswahl für Textgröße, Kontrast und Bewegung.'],
      ['Wozu', 'Damit die Website beim nächsten Aufruf so aussieht, wie Sie es eingestellt haben.'],
      ['Rechtsgrundlage', '§ 25 Abs. 2 Nr. 2 TDDDG, weil die Speicherung für diese von Ihnen gewünschte Funktion nötig ist.'],
      ['Ort', 'Nur in Ihrem Browser im lokalen Speicher unter dem Namen site-a11y. Es ist kein Cookie und wird nie an uns übertragen.'],
      ['Speicherdauer', 'Bis Sie auf „Einstellungen zurücksetzen“ klicken oder die Websitedaten in Ihrem Browser löschen.'],
    ]) },
    { id: 'schriften', title: 'Schriften und Bilder', html: '<p>Schriften und Bilder liegen auf unserem eigenen Server. Beim Besuch wird keine Verbindung zu Google Fonts, Bilddiensten oder anderen fremden Servern aufgebaut.</p>' },
    ...(site.reviews.length ? [{ id: 'bewertungen', title: 'Google-Bewertungen', html: '<p>Die Bewertungen auf der Startseite haben wir als Text von unserem öffentlichen Google-Unternehmensprofil übernommen. Es wird kein Google-Dienst eingebunden. Erst wenn Sie auf den Link zu Google klicken, öffnet sich die Seite von Google und es gilt deren Datenschutzerklärung.</p>' }] : []),
    { id: 'links', title: 'Links zu Google Maps', html: `<p>Auf der Kontaktseite führt ein Link zur Route in Google Maps. Es ist ein einfacher Verweis ohne eingebettete Karte. Daten gehen erst an Google, wenn Sie den Link anklicken. Anbieter ist dann Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. ${ext('https://policies.google.com/privacy', 'Datenschutzerklärung von Google')}</p>` },
    { id: 'rechte', title: 'Ihre Rechte', html: `${rows([
      ['Auskunft', 'Welche Daten wir über Sie speichern (Art. 15 DSGVO).'],
      ['Berichtigung', 'Falsche Daten korrigieren lassen (Art. 16 DSGVO).'],
      ['Löschung', 'Daten löschen lassen, wenn keine Pflicht zur Aufbewahrung besteht (Art. 17 DSGVO).'],
      ['Einschränkung', 'Die Verarbeitung einschränken lassen (Art. 18 DSGVO).'],
      ['Datenübertragbarkeit', 'Ihre Daten in einem gängigen Format erhalten (Art. 20 DSGVO).'],
      ['Widerruf', 'Eine Einwilligung jederzeit für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).'],
      ['Beschwerde', `Bei der Aufsichtsbehörde. Für uns zuständig ist das Bayerische Landesamt für Datenschutzaufsicht, Promenade 18, 91522 Ansbach, ${ext('https://www.lda.bayern.de', 'www.lda.bayern.de')}.`],
    ])}<div class="notice" role="note"><h3>Widerspruchsrecht nach Art. 21 DSGVO</h3><p>Verarbeiten wir Ihre Daten auf Grundlage eines berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO), können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen. Wir verarbeiten die Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen. Für Werbung nutzen wir Ihre Daten nicht. Täten wir es, könnten Sie dem jederzeit ohne Angabe von Gründen widersprechen. Eine formlose Nachricht an ${mail} genügt.</p></div>` },
    { id: 'aenderungen', title: 'Änderungen und Stand', html: `<p>Wir passen diese Erklärung an, wenn sich die Website oder die Rechtslage ändert. Es gilt die hier veröffentlichte Fassung. Stand: ${standLabel}.</p>` },
  ],
});

const barrierefreiheit = legalPage('barrierefreiheit.html', {
  title: 'Barrierefreiheit | König Gebäudereinigung Würzburg Website',
  description: 'Erklärung zur Barrierefreiheit der Website von König Gebäudereinigung in Würzburg: Ziel WCAG 2.2 AA, Maßnahmen, Grenzen und wie Sie Barrieren melden.',
  label: 'Barrierefreiheit',
  h1: 'Erklärung zur Barrierefreiheit',
  next: ['bildnachweise.html', 'Weiter zu den Bildnachweisen'],
  groups: [
    { id: 'ziel', title: 'Unser Ziel', html: '<p>Diese Website soll für alle gut nutzbar sein: mit Screenreader, nur mit der Tastatur, mit Vergrößerung oder bei eingeschränktem Sehen. Wir richten uns nach den Web Content Accessibility Guidelines (WCAG) 2.2 auf Stufe AA.</p>' },
    { id: 'massnahmen', title: 'Was wir umgesetzt haben', html: `<ul class="plain">
<li>Klare Gliederung mit Überschriften, Orientierungsbereichen und Brotkrümelnavigation</li>
<li>Vollständige Bedienung mit der Tastatur, sichtbarer Fokus und ein Link „Zum Inhalt springen“</li>
<li>Farbkontraste von mindestens 4,5 zu 1 für Fließtext</li>
<li>Bedienelemente mit mindestens 44 mal 44 Pixeln</li>
<li>Kein waagerechtes Scrollen bei 320 Pixeln Breite und bei 200 Prozent Zoom</li>
<li>Beschreibende Alternativtexte für alle Fotos mit Inhalt</li>
<li>Formularfelder mit sichtbarer Beschriftung und verständlichen Hinweisen</li>
<li>Die Einstellung „Bewegung reduzieren“ Ihres Geräts wird beachtet</li>
<li>Alle Inhalte bleiben ohne JavaScript lesbar</li>
</ul>` },
    { id: 'schalter', title: 'Der Schalter „Aa“', html: '<p>Unten links auf jeder Seite öffnet der runde Knopf „Aa“ ein Feld mit vier Einstellungen: hoher Kontrast, Textgröße in drei Stufen (Standard, 112,5 und 125 Prozent), Bewegungen reduzieren und Einstellungen zurücksetzen. Alles ist per Tastatur bedienbar, die Escape-Taste schließt das Feld. Ihre Auswahl bleibt nur in Ihrem Browser gespeichert.</p>' },
    { id: 'stand', title: 'Stand der Prüfung', html: `<p>Die Website ist teilweise geprüft. Vor der Veröffentlichung haben wir sie mit dem automatischen Prüfwerkzeug axe sowie von Hand mit Tastatur, 200 Prozent Zoom und 320 Pixeln Breite getestet. Eine Prüfung durch eine unabhängige Stelle oder mit Menschen, die Hilfstechnik nutzen, hat nicht stattgefunden. Letzte Prüfung: ${standLabel}.</p>` },
    { id: 'grenzen', title: 'Bekannte Einschränkungen', html: `<ul class="plain">
<li>Die Texte sind nicht zusätzlich in Leichter Sprache oder Gebärdensprache verfügbar.</li>
<li>${site.formKey ? 'Das Anfrageformular nutzt einen externen Formulardienst.' : 'Das Anfrageformular öffnet Ihr E-Mail-Programm. Ist keines eingerichtet, schreiben Sie uns bitte direkt an die unten genannte Adresse.'}</li>
<li>Der Link zur Route führt zu Google Maps. Für dessen Barrierefreiheit ist Google verantwortlich.</li>
</ul>` },
    { id: 'melden', title: 'Barriere melden', html: `<p>Fällt Ihnen etwas auf, das Sie bei der Nutzung behindert, sagen Sie uns bitte Bescheid. Wir kümmern uns darum und antworten Ihnen.</p>${rows([['E-Mail', mail], ['Telefon', tel]])}` },
  ],
});

const photoRows = Object.values(photos).map(p => [p.subject, p.credit ? `<a href="https://unsplash.com/photos/${p.credit.id}">${p.credit.name} auf Unsplash</a>, Unsplash Lizenz` : 'König Gebäudereinigung, übernommen von der bisherigen Website']);
const bildnachweise = legalPage('bildnachweise.html', {
  title: 'Bildnachweise | König Gebäudereinigung Würzburg Website',
  description: 'Bildnachweise der Website von König Gebäudereinigung in Würzburg: Herkunft aller Fotos, des Logos und der verwendeten Schriften mit der jeweiligen Lizenz.',
  label: 'Bildnachweise',
  h1: 'Bildnachweise',
  next: ['impressum.html', 'Weiter zum Impressum'],
  groups: [
    { id: 'fotos', title: 'Fotos', html: `${rows(photoRows)}<p>Fotos mit dem Hinweis Unsplash stammen von unsplash.com und dürfen nach der Unsplash Lizenz kostenlos genutzt werden. Sie zeigen keine Räume und keine Mitarbeiter von König Gebäudereinigung.</p><p>[ERSETZEN: Fotograf und Nutzungsrecht der übernommenen Fotos der bisherigen Website bestätigen]</p>` },
    { id: 'logo', title: 'Logo', html: rows([['Wortmarke König Gebäudereinigung', 'König Gebäudereinigung']]) },
    { id: 'schriften', title: 'Schriften', html: rows([['Playfair Display', 'Claus Eggers Sørensen, SIL Open Font License 1.1'], ['Inter', 'Rasmus Andersson, SIL Open Font License 1.1']]) },
  ],
});

export const legalPages = {
  'impressum.html': impressum,
  'datenschutz.html': datenschutz,
  'barrierefreiheit.html': barrierefreiheit,
  'bildnachweise.html': bildnachweise,
};
