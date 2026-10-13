// Firmendaten und Einstellungen. Einzige Quelle für alle Seiten.
// Niemals Passwörter oder private Zugangsdaten in diese Datei schreiben.
// Fehlende Angaben stehen als [ERSETZEN: ...] und sind in README.md unter "Offen" gelistet.

export const site = Object.freeze({
  name: 'König Gebäudereinigung',
  activity: 'Gebäudereinigung in Würzburg',
  url: 'https://www.koenig-gebaeudereinigung.com/',
  // false = Vorschau: Alle Seiten tragen noindex. Erst nach Freigabe auf true setzen.
  live: false,
  owner: 'Leart Spahiu',
  legalForm: 'Einzelunternehmen',
  street: 'Neidertstraße 8',
  postalCode: '97082',
  city: 'Würzburg',
  region: 'Bayern',
  telephone: '+4915123884259',
  telephoneDisplay: '0151 23884259',
  email: 'info@koenig-gebaeudereinigung.com',
  hours: '[ERSETZEN: Telefonische Erreichbarkeit, z. B. Mo bis Fr, 8 bis 17 Uhr]',
  area: 'Würzburg und Umgebung',
  // Link zum Google-Unternehmensprofil, sobald vorhanden. Leer = kein Bewertungsabschnitt.
  googleProfile: '',
  // Echte Google-Bewertungen wörtlich, z. B. { text, name: 'Anna M.', date: 'Oktober 2026', stars: 5 }.
  reviews: [],
  reviewSummary: null, // z. B. { rating: 4.9, count: 37, asOf: 'Oktober 2026' }
  // Web3Forms-Zugangsschlüssel (öffentlich gedacht). Leer = Formular öffnet einen E-Mail-Entwurf.
  formKey: '',
  host: {
    name: 'Hostinger International Ltd.',
    address: '61 Lordou Vironos Street, 6023 Larnaca, Zypern',
    privacy: 'https://www.hostinger.com/de/datenschutzrichtlinie',
    logDays: 14,
  },
});

// Letzte inhaltliche Prüfung (sitemap.xml, Stand der Rechtstexte).
export const updated = '2026-10-13';
export const standLabel = 'Oktober 2026';
