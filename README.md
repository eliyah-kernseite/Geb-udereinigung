# König Gebäudereinigung: Website

Statische Website für König Gebäudereinigung (Inhaber Leart Spahiu, Würzburg), gebaut von
KERNSEITE nach dem KERNSEITE-Website-Bauplan. Ein kleines Node-Skript erzeugt alle Seiten aus
gemeinsamen Vorlagen. Auf dem Webserver laufen weder Node noch PHP noch eine Datenbank.

Ziel-Adresse: **https://www.koenig-gebaeudereinigung.com/** (löst die bisherige WordPress-Seite ab).

## Entwicklung

Node.js ab 22.12. Einzige Entwicklungsabhängigkeit ist `jsdom` für die Tests.

```sh
npm install     # einmalig, nur für die Tests
npm run build   # erzeugt alle .html-Seiten, sitemap.xml und robots.txt
npm test        # Abnahme-Checkliste aus dem Bauplan (Abschnitt 14)
npm run serve   # Vorschau unter http://localhost:4173/ (saubere Adressen wie /kontakt)
```

Nach jeder Änderung neu bauen und die erzeugten HTML-Dateien mit committen.

| Datei | Inhalt |
| --- | --- |
| `src/config.mjs` | Firmendaten, Erreichbarkeit, Google-Profil und Bewertungen, Formular-Schlüssel, Hoster, `live` |
| `src/layout.mjs` | `<head>`, Header, Brotkrümel, Kontaktblock, Footer, JSON-LD, A11y-Schalter, Fotoliste mit Alt-Texten |
| `src/pages.mjs` | Startseite (Variante B), Leistungen, fünf Leistungsseiten, Ablauf, Über uns, Häufige Fragen, Kontakt, 404 |
| `src/legal.mjs` | Impressum, Datenschutz, Barrierefreiheit, Bildnachweise |
| `assets/site.css` | Gestaltung mit Design-Tokens |
| `assets/site.js` | Menü, Einblenden beim Scrollen, A11y-Schalter, Formular |
| `assets/a11y-init.js` | Wendet gespeicherte A11y-Einstellungen vor dem ersten Bild an |
| `assets/fonts/` | Inter und Playfair Display als woff2, Lizenz in `OFL.txt` |
| `scripts/images.py` | Erzeugt WebP in 640, 960 und 1440 px aus `assets-source/` (Pillow) |
| `docs/FREIGABE.md` | Offen-Liste: Angaben, die der Kunde liefern oder bestätigen muss |

## Seiten und Adressen

Alle Seiten liegen als `.html` im Hauptordner. Links stehen ohne Endung (`/kontakt`), die
`.htaccess` liefert die Datei aus und leitet die alten WordPress-Adressen mit Schrägstrich
(`/kontakt/`, `/ueber-uns/`, `/impressum/`, `/datenschutz/`) per 301 auf die neue Form um.

`/` · `/leistungen` · `/bueroreinigung-wuerzburg` · `/praxisreinigung-wuerzburg` ·
`/treppenhausreinigung-wuerzburg` · `/glasreinigung-wuerzburg` · `/grundreinigung-wuerzburg` ·
`/ablauf` · `/ueber-uns` · `/haeufige-fragen` · `/kontakt` · `/impressum` · `/datenschutz` ·
`/barrierefreiheit` · `/bildnachweise`

Startseite nach **Variante B** (selbsterklärendes Angebot): Hero, Leistungen, Google-Bewertungen
(erscheinen automatisch, sobald `googleProfile`, `reviews` und `reviewSummary` in `src/config.mjs`
gefüllt sind), Einblicke, Warum wir, Über uns kurz, Einsatzgebiet und Erreichbarkeit,
kurze Fragen, Kontaktblock.

## Farbpalette

Anthrazit und Mint: dunkle Markenfläche, auf der das helle Logo gut steht, dazu ein frisches Mint für Buttons und Links. Das wirkt sauber und freundlich, ohne nach Luxus auszusehen.

| Token | Wert | Einsatz |
| --- | --- | --- |
| `--bg` | `#f7f8f7` | Grundfläche, kühles Weiß |
| `--surface` | `#ffffff` | Formular, Hinweiskästen |
| `--surface-alt` | `#eaf1ef` | Abgesetzte helle Abschnitte |
| `--text` | `#1a1f24` | Fließtext |
| `--muted` | `#4a535a` | Gedämpfter Text (7,4:1) |
| `--line` | `#d3ddd9` | Feine Linien |
| `--accent` | `#5cbfae` | Mint: Buttons, Linien, Herz, A11y-Auswahl. Als Text nur auf Dunkel |
| `--accent-strong` | `#86d3c6` | Hover auf Dunkel |
| `--accent-ink` | `#1b6b61` | Links und Icons auf Hell (5,9:1) |
| `--on-accent` | `#0e1c1b` | Schrift auf Mint (7,9:1) |
| `--dark` | `#1c232b` | Anthrazit, Markenfläche: Header, Footer, Hero, A11y-Schalter, `theme-color` |
| `--dark-2` | `#252e38` | Kontaktblock, Untermenü |
| `--focus` | `#1f5fbf` | Fokusring auf Hell (auf Dunkel Mint) |

## Schriften

Wirkung: **seriös, ruhig, hochwertig**. Überschriften in **Playfair Display** (600), weil die
elegante Serife zum geschwungenen Logo passt. Text in **Inter** (400 und 600), gut lesbar auf
jedem Bildschirm. Beide unter SIL Open Font License, lokal als woff2, nur Inter 400 wird vorgeladen.

## Kontaktformular

Ohne Schlüssel öffnet „Anfrage senden“ das E-Mail-Programm mit einer fertig ausgefüllten
Nachricht. Für den direkten Versand bei https://web3forms.com einen Zugangsschlüssel für
`info@koenig-gebaeudereinigung.com` anlegen, in `src/config.mjs` bei `formKey` eintragen und neu
bauen. Die Datenschutzerklärung bekommt dann automatisch den Abschnitt zu Web3Forms
(Anschrift des Anbieters dort noch eintragen).

## Vorschau und Livegang

**Vorschau (GitHub Pages)**: Solange `live: false` in `src/config.mjs` steht, tragen alle Seiten
`noindex`, die Canonical-Angaben zeigen auf die echte Domain. Alle Pfade sind relativ, die
Vorschau funktioniert auch im Unterordner `/Geb-udereinigung/`.

**Livegang (Hostinger, Git-Deploy aus `main`)**
1. Alle `[ERSETZEN: ...]` und `[PERSÖNLICHE ...]` aus `docs/FREIGABE.md` erledigen
   (`grep -rnE "ERSETZEN|PERSÖNLICHE" src` ist leer).
2. In `src/config.mjs` `live: true` setzen, `npm run build && npm test`, committen.
3. In Hostinger Git-Deploy aus `main` einrichten, SSL aktivieren. Die `.htaccess` erzwingt
   `https://www.`, liefert saubere Adressen, komprimiert und setzt Cache- und Sicherheits-Header.
4. Google Search Console: `https://www.koenig-gebaeudereinigung.com/sitemap.xml` einreichen.

## Bilder

Logo und eigene Fotos stammen vom Kunden, fünf Fotos auf den Leistungsseiten von Unsplash
(Originale in `assets-source/`), Nachweise unter `/bildnachweise`. Neues Foto: Datei in `assets-source/`
ablegen, in `scripts/images.py` und in der Fotoliste in `src/layout.mjs` (mit Alt-Text)
eintragen, `python3 scripts/images.py` ausführen.
