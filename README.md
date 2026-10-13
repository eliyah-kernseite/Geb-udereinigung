# König Gebäudereinigung – Website

Statische Website für König Gebäudereinigung (Inhaber Leart Spahiu, Würzburg),
umgesetzt von KERNSEITE. Die HTML-Seiten werden aus gemeinsamen Vorlagen erzeugt;
auf dem Webserver wird weder Node noch PHP noch eine Datenbank benötigt.

Ziel-Adresse: **https://www.koenig-gebaeudereinigung.com/** (löst die bisherige WordPress-Seite ab).

## Bearbeiten, bauen, prüfen

Node.js ab 22.12, keine weiteren Pakete nötig:

```sh
npm run build   # erzeugt alle Seiten, sitemap.xml und robots.txt
npm test        # prüft Titel, Beschreibungen, Überschriften, Alttexte, Links, doppelte Texte
npm run serve   # Vorschau unter http://localhost:4173/
```

Nach jeder Textänderung neu bauen und die erzeugten HTML-Dateien mit committen.

| Datei | Inhalt |
| --- | --- |
| `src/site.mjs` | Firmendaten: Name, Anschrift, Telefon, E-Mail, Hoster, Formular-Schlüssel |
| `src/pages.mjs` | Startseite, Leistungen, fünf Leistungsseiten, Über uns, Häufige Fragen, Kontakt, 404 |
| `src/legal.mjs` | Impressum, Datenschutz, Barrierefreiheit |
| `src/layout.mjs` | Kopf, Navigation, Fußzeile, Metadaten, strukturierte Daten, Fotoliste mit Alttexten |
| `assets/site.css`, `assets/site.js` | Gestaltung und Bedienung (Menü, Darstellung anpassen, Formular) |
| `scripts/images.py` | Erzeugt die Bildgrößen aus `assets-source/` (Pillow) |
| `tests/site.test.mjs` | Automatische SEO- und Strukturprüfung |
| `docs/FREIGABE.md` | Aussagen und Angaben, die der Inhaber vor dem Livegang bestätigen sollte |

## Seiten und Adressen

Alle Seiten liegen als Ordner mit `index.html`, damit die Adressen sauber sind und
mit der alten WordPress-Seite übereinstimmen (`/kontakt/`, `/ueber-uns/`, `/impressum/`,
`/datenschutz/` bleiben gleich, es gehen keine Google-Einträge verloren).

`/` · `/leistungen/` · `/bueroreinigung-wuerzburg/` · `/praxisreinigung-wuerzburg/` ·
`/treppenhausreinigung-wuerzburg/` · `/glasreinigung-wuerzburg/` · `/grundreinigung-wuerzburg/` ·
`/ueber-uns/` · `/haeufige-fragen/` · `/kontakt/` · `/impressum/` · `/datenschutz/` · `/barrierefreiheit/`

## Was eingebaut ist

**SEO (Seobility-Kriterien)**
- Eigener Titel (max. 60 Zeichen) und eigene Meta-Beschreibung (120–160 Zeichen) je Seite, vom Test geprüft
- Genau eine H1 je Seite, saubere Überschriften-Reihenfolge, Suchbegriff „Würzburg“ in Titel, H1 und Einleitung
- Mindestens 350 Wörter eigener Text je Inhaltsseite, kein Absatz doppelt auf zwei Seiten
- Sprechende Linktexte statt „mehr erfahren“, interne Verlinkung zwischen allen Leistungsseiten
- Canonical, Open Graph, `sitemap.xml`, `robots.txt`, eigene 404-Seite
- Strukturierte Daten: LocalBusiness, WebSite, WebPage, BreadcrumbList, Service, FAQPage
- Sprechende Bilddateinamen und beschreibende Alttexte

**Ladezeit** (Lighthouse lokal: Leistung 99, Barrierefreiheit 100, Best Practices 100, SEO 100)
- Keine Frameworks, keine externen Skripte, Schriften lokal (nur 3 Dateien)
- WebP in mehreren Größen mit `srcset`, `width`/`height` gegen Layoutsprünge, Lazy Loading
- Startseite rund 190 KB gesamt; `.htaccess` mit Komprimierung und langem Caching

**Barrierefreiheit** (axe-core WCAG 2.2 AA: 0 Verstöße auf allen Seiten, Desktop, Handy und Kontrastmodus)
- Tastaturbedienung, sichtbarer Fokus, „Zum Inhalt springen“, Brotkrümel, Orientierungsbereiche
- Schaltfläche „Aa“: Textgröße in drei Stufen, Hochkontrast, Bewegungen aus (nur lokal gespeichert)
- Formular mit Beschriftungen, Fehlermeldungen am Feld, Statusmeldungen für Screenreader
- Alles bleibt ohne JavaScript lesbar; `prefers-reduced-motion` wird beachtet

**Datenschutz**
- Keine Cookies, kein Tracking, keine eingebetteten Karten → kein Cookie-Banner nötig
- Google Maps nur als einfacher Link

## Kontaktformular

Ohne weitere Einrichtung öffnet „Anfrage senden“ das E-Mail-Programm mit einer fertig
ausgefüllten Nachricht an `info@koenig-gebaeudereinigung.com`.

Für den direkten Versand (wie bei babyschlaf-coach.de):
1. Auf https://web3forms.com mit `info@koenig-gebaeudereinigung.com` einen Zugangsschlüssel anlegen.
2. Den Schlüssel in `src/site.mjs` bei `formKey` eintragen.
3. `npm run build` – die Datenschutzerklärung wird automatisch um Web3Forms ergänzt.

## Veröffentlichen

**Eigene Domain (IONOS-Webspace)**
1. `npm run build && npm test`
2. Per SFTP in das Web-Verzeichnis der Domain hochladen: alle Seitenordner, `index.html`, `404.html`,
   `assets/`, `favicon.ico`, `.htaccess`, `robots.txt`, `sitemap.xml`.
   Nicht nötig (und per `.htaccess` gesperrt): `src/`, `scripts/`, `tests/`, `docs/`, `assets-source/`.
3. SSL in IONOS aktivieren. Die `.htaccess` leitet auf `https://www.` um.
4. Die alte WordPress-Installation erst danach entfernen bzw. die Domain umstellen.

**Vorschau über GitHub Pages**: Einstellungen → Pages → Branch `main`, Ordner `/`. Alle
internen Pfade sind relativ, die Seite funktioniert deshalb auch im Unterordner
`/Geb-udereinigung/`. Die Canonical-Angaben zeigen immer auf die eigene Domain.

**Nach dem Livegang**
- Google Search Console: Domain bestätigen, `https://www.koenig-gebaeudereinigung.com/sitemap.xml` einreichen
- Google-Unternehmensprofil auf die neue Seite verlinken, Anschrift wie im Impressum
- Seobility-Check der Domain laufen lassen

## Bilder

Alle Fotos und das Logo stammen vom Auftraggeber (Originale in `assets-source/`).
Neues Foto: Datei in `assets-source/` ablegen, in `scripts/images.py` und in der Fotoliste
in `src/layout.mjs` (mit Alttext) eintragen, `python3 scripts/images.py` ausführen.
