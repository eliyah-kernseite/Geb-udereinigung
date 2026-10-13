// Öffentliche Firmendaten. Hier zentral pflegen, alle Seiten lesen daraus.
// Niemals Passwörter oder private Zugangsdaten in diese Datei schreiben.
export const site = Object.freeze({
  name: 'König Gebäudereinigung',
  url: 'https://www.koenig-gebaeudereinigung.com/',
  owner: 'Leart Spahiu',
  street: 'Neidertstraße 8',
  postalCode: '97082',
  city: 'Würzburg',
  region: 'Bayern',
  telephone: '+4915123884259',
  telephoneDisplay: '0151 23884259',
  email: 'info@koenig-gebaeudereinigung.com',
  // Web3Forms-Zugangsschlüssel (öffentlich gedacht, erlaubt nur Versand an die bei
  // Web3Forms bestätigte Adresse). Leer = das Formular öffnet einen E-Mail-Entwurf.
  // Wird ein Schlüssel eingetragen, ergänzt der Build die Datenschutzerklärung automatisch.
  formKey: '',
  // Tatsächlicher Webhoster für die Datenschutzerklärung.
  host: { name: 'IONOS SE', address: 'Elgendorfer Str. 57, 56410 Montabaur', privacy: 'https://www.ionos.de/terms-gtc/datenschutzerklaerung/' },
});

// Letzte inhaltliche Prüfung. Wird für sitemap.xml und strukturierte Daten genutzt.
export const updated = '2026-10-13';
