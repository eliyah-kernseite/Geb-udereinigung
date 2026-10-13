import { site, updated } from './site.mjs';

const date = new Date(`${updated}T12:00:00Z`).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
const head = (title, lead) => `<header class="page-head"><div class="wrap page-head-inner"><h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div></header>\n<!--brotkruemel-->`;
const body = html => `<section class="section legal"><div class="wrap narrow">${html}</div></section>`;
const address = `${site.name}<br>Inhaber ${site.owner}<br>${site.street}<br>${site.postalCode} ${site.city}<br>Deutschland`;

const impressum = {
  title: 'Impressum | König Gebäudereinigung Würzburg',
  description: 'Impressum von König Gebäudereinigung, Inhaber Leart Spahiu, Neidertstraße 8 in 97082 Würzburg: Anschrift, Kontakt und Angaben nach § 5 DDG.',
  label: 'Impressum',
  content: `${head('Impressum')}${body(`
<h2>Angaben gemäß § 5 DDG</h2>
<p>${address}</p>
<h2>Kontakt</h2>
<p>Telefon: <a href="tel:${site.telephone}">${site.telephoneDisplay}</a><br>E-Mail: <a href="mailto:${site.email}">${site.email}</a></p>
<h2>Umsatzsteuer</h2>
<p>Kleinunternehmer im Sinne von § 19 UStG. Es wird keine Umsatzsteuer berechnet und ausgewiesen.</p>
<h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
<p>${site.owner}, ${site.street}, ${site.postalCode} ${site.city}</p>
<h2>Verbraucherstreitbeilegung</h2>
<p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
<h2>Haftung für Inhalte und Links</h2>
<p>Wir erstellen die Inhalte dieser Website mit Sorgfalt. Für die Richtigkeit, Vollständigkeit und Aktualität übernehmen wir dennoch keine Gewähr. Für Inhalte externer Websites, auf die wir verlinken, sind ausschließlich deren Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Werden uns solche bekannt, entfernen wir den Link umgehend.</p>
<h2>Urheberrecht</h2>
<p>Texte, Fotos und Gestaltung dieser Website sind urheberrechtlich geschützt. Die Fotos stammen von ${site.name}. Eine Verwendung außerhalb dieser Website ist nur mit unserer Zustimmung erlaubt.</p>
<h2>Gestaltung und Umsetzung</h2>
<p>KERNSEITE, Webdesign aus Würzburg: <a href="https://kernseite.com" rel="noopener">kernseite.com</a></p>`)}`,
};

const formSection = site.formKey
  ? `<p>Wenn Sie das Anfrageformular nutzen, übermittelt Ihr Browser die eingegebenen Daten über eine verschlüsselte Verbindung an den Formulardienst Web3Forms. Web3Forms leitet die Nachricht als E-Mail an uns weiter. Dabei können Daten in Staaten außerhalb der EU verarbeitet werden, für die kein Angemessenheitsbeschluss vorliegt. Die Übermittlung erfolgt, weil Sie das Formular absenden, um eine Anfrage zu stellen (Art. 49 Abs. 1 lit. b DSGVO). Wenn Sie das nicht möchten, schreiben Sie uns direkt per E-Mail oder rufen Sie an. Datenschutzhinweise von Web3Forms: <a href="https://web3forms.com/privacy" rel="noopener">web3forms.com/privacy</a>.</p>`
  : `<p>Das Anfrageformular sendet selbst keine Daten an uns oder an Dritte. Wenn Sie auf „Anfrage senden“ klicken, öffnet sich Ihr eigenes E-Mail-Programm mit einer vorbereiteten Nachricht. Erst wenn Sie diese E-Mail dort abschicken, erhalten wir Ihre Angaben, und zwar so wie bei jeder anderen E-Mail.</p>`;

const datenschutz = {
  title: 'Datenschutzerklärung | König Gebäudereinigung',
  description: 'Datenschutzerklärung von König Gebäudereinigung in Würzburg: welche Daten beim Besuch der Website und bei Anfragen verarbeitet werden und Ihre Rechte.',
  label: 'Datenschutz',
  content: `${head('Datenschutzerklärung', `Stand: ${date}`)}${body(`
<p>Kurz gesagt: Diese Website setzt keine Cookies, verwendet keine Analyse- oder Werbedienste und lädt keine Inhalte von fremden Servern. Personenbezogene Daten verarbeiten wir nur, soweit das für den Betrieb der Website und die Beantwortung Ihrer Anfragen nötig ist.</p>
<h2>1. Verantwortlicher</h2>
<p>${address}<br>Telefon: <a href="tel:${site.telephone}">${site.telephoneDisplay}</a><br>E-Mail: <a href="mailto:${site.email}">${site.email}</a></p>
<p>Einen Datenschutzbeauftragten müssen wir nicht benennen. Bei Fragen zum Datenschutz wenden Sie sich direkt an die oben genannten Kontaktdaten.</p>
<h2>2. Hosting und Server-Logdateien</h2>
<p>Diese Website wird bei ${site.host.name}, ${site.host.address}, gehostet. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Beim Aufruf einer Seite speichert der Server automatisch Informationen, die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse, übertragene Datenmenge, Statuscode, die zuvor besuchte Seite sowie Browser und Betriebssystem.</p>
<p>Diese Daten sind technisch nötig, um die Website auszuliefern und ihre Sicherheit zu gewährleisten, etwa um Angriffe zu erkennen. Rechtsgrundlage ist unser berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO. Die Logdateien werden vom Hoster nach kurzer Zeit automatisch gelöscht. Weitere Informationen: <a href="${site.host.privacy}" rel="noopener">Datenschutzerklärung von ${site.host.name}</a>.</p>
<h2 id="anfragen">3. Kontakt per E-Mail, Telefon und Anfrageformular</h2>
<p>Wenn Sie uns kontaktieren, verarbeiten wir Ihre Angaben (zum Beispiel Name, Firma, E-Mail-Adresse, Telefonnummer und Angaben zu Ihrem Objekt), um Ihre Anfrage zu beantworten und gegebenenfalls ein Angebot zu erstellen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn Ihre Anfrage auf einen Vertrag zielt, ansonsten unser berechtigtes Interesse an der Beantwortung nach Art. 6 Abs. 1 lit. f DSGVO.</p>
${formSection}
<p>Wir löschen Anfragen, sobald sie erledigt sind und kein Auftrag zustande kommt, spätestens nach sechs Monaten. Kommt ein Auftrag zustande, bewahren wir die Unterlagen so lange auf, wie es gesetzliche Aufbewahrungspflichten verlangen, in der Regel sechs bis zehn Jahre.</p>
<h2>4. Einstellungen zur Darstellung</h2>
<p>Über die Schaltfläche „Aa“ können Sie Textgröße, Kontrast und Bewegungen anpassen. Ihre Auswahl wird ausschließlich in Ihrem Browser gespeichert (Local Storage unter dem Namen „koenig-darstellung“) und nie an uns übertragen. Die Speicherung ist für diese von Ihnen gewünschte Funktion unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können sie jederzeit über „Einstellungen zurücksetzen“ oder in Ihrem Browser löschen.</p>
<h2>5. Schriftarten und externe Links</h2>
<p>Die Schriftarten sind auf unserem eigenen Server gespeichert. Beim Besuch der Website wird keine Verbindung zu Google Fonts oder anderen Schriftdiensten aufgebaut.</p>
<p>Links auf andere Websites, etwa zu Google Maps, sind einfache Verweise. Daten werden erst dann an den jeweiligen Anbieter übertragen, wenn Sie den Link anklicken und dessen Seite öffnen. Dort gilt die Datenschutzerklärung des jeweiligen Anbieters.</p>
<h2>6. Ihre Rechte</h2>
<p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO). Eine kurze Nachricht an die oben genannten Kontaktdaten genügt.</p>
<p>Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Für uns zuständig ist das Bayerische Landesamt für Datenschutzaufsicht, Promenade 18, 91522 Ansbach, <a href="https://www.lda.bayern.de" rel="noopener">www.lda.bayern.de</a>.</p>
<h2>7. Änderungen</h2>
<p>Wir passen diese Datenschutzerklärung an, wenn sich die Website oder die Rechtslage ändert. Es gilt die jeweils hier veröffentlichte Fassung.</p>`)}`,
};

const barrierefreiheit = {
  title: 'Barrierefreiheit | König Gebäudereinigung Würzburg',
  description: 'Erklärung zur Barrierefreiheit der Website von König Gebäudereinigung: umgesetzte Maßnahmen, bekannte Einschränkungen und wie Sie uns Barrieren melden.',
  label: 'Barrierefreiheit',
  content: `${head('Erklärung zur Barrierefreiheit', `Stand: ${date}`)}${body(`
<p>Unsere Website soll für alle Menschen gut nutzbar sein, auch mit Screenreader, nur mit der Tastatur, mit Vergrößerung oder bei eingeschränktem Sehvermögen. Wir orientieren uns an den Web Content Accessibility Guidelines (WCAG) 2.2 auf der Stufe AA und an der europäischen Norm EN 301 549.</p>
<h2>Was wir umgesetzt haben</h2>
<ul>
<li>Klare Seitenstruktur mit Überschriften, Orientierungsbereichen und Brotkrümelnavigation</li>
<li>Vollständige Bedienung mit der Tastatur, sichtbarer Fokus und ein Link „Zum Inhalt springen“</li>
<li>Farbkontraste mindestens nach WCAG-Stufe AA, zusätzlich ein Hochkontrastmodus</li>
<li>Textgröße in drei Stufen einstellbar, die Seite bleibt auch bei 200 Prozent Zoom bedienbar</li>
<li>Bewegungen lassen sich abschalten. Die Einstellung „Bewegung reduzieren“ Ihres Geräts wird automatisch berücksichtigt</li>
<li>Beschreibende Alternativtexte für alle aussagekräftigen Bilder</li>
<li>Beschriftete Formularfelder mit verständlichen Hinweisen bei fehlenden Angaben</li>
<li>Alle Inhalte bleiben ohne JavaScript lesbar</li>
</ul>
<h2>Stand der Vereinbarkeit</h2>
<p>Die Website wurde vor der Veröffentlichung mit automatischen Prüfwerkzeugen und manuell mit Tastatur und Zoom geprüft. Uns sind derzeit keine Barrieren bekannt. Eine Prüfung durch eine unabhängige Stelle hat nicht stattgefunden.</p>
<h2>Barriere melden</h2>
<p>Wenn Ihnen etwas auffällt, das Sie bei der Nutzung behindert, sagen Sie uns bitte Bescheid. Wir kümmern uns darum und antworten Ihnen.</p>
<p>E-Mail: <a href="mailto:${site.email}">${site.email}</a><br>Telefon: <a href="tel:${site.telephone}">${site.telephoneDisplay}</a></p>`)}`,
};

export const legalPages = {
  '/impressum/': impressum,
  '/datenschutz/': datenschutz,
  '/barrierefreiheit/': barrierefreiheit,
};
