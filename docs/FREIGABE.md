# Offen-Liste vor dem Livegang

Stand 13.10.2026. Alles, was im Code als `[ERSETZEN: ...]` steht, und alle Aussagen, die der
Kunde bestätigen muss. Erst wenn diese Liste abgehakt ist, `live: true` setzen.

## Fehlende Angaben (im Code als [ERSETZEN])
- [ ] Telefonische Erreichbarkeit, z. B. „Mo bis Fr, 8 bis 17 Uhr“ (`src/config.mjs`, `hours`)
- [ ] Impressum: Rechtsform und Firmenname bestätigen (Einzelunternehmen, kein Registereintrag?)
- [ ] Impressum: USt-IdNr. oder Wirtschafts-ID, falls vorhanden. Sonst Abschnitt „Steuer“ entfernen
- [ ] Datenschutz: Löschfrist der Server-Logfiles beim Hoster bestätigen (eingetragen: höchstens 14 Tage)
- [ ] Datenschutz: E-Mail-Anbieter nennen, falls das Postfach nicht bei Hostinger liegt
- [ ] Bildnachweise: Fotograf und Nutzungsrecht der von der alten Website übernommenen Fotos bestätigen (die fünf Unsplash Fotos auf den Leistungsseiten sind bereits nachgewiesen)
- [ ] Über uns: echtes Foto von Leart Spahiu oder dem Team (derzeit Foto eines Mitarbeiters bei der Arbeit)

## Bestätigen
- [ ] Hosting bei Hostinger mit Auftragsverarbeitungsvertrag (Datenschutz nennt Hostinger)
- [ ] Anschrift Neidertstraße 8, 97082 Würzburg (aus dem bisherigen Repository, auf der alten Seite stand keine Straße)
- [ ] Kleinunternehmer nach § 19 UStG gilt weiterhin (Häufige Fragen)
- [ ] „Familiengeführt“ und „inhabergeführt“ (Startseite, Über uns)
- [ ] Gebäudereiniger ist ein zulassungsfreies Handwerk. Besteht eine Eintragung bei der
      Handwerkskammer, kann sie ins Impressum, Pflicht ist sie dort nicht
- [ ] Reinigung außerhalb der Geschäftszeiten möglich
- [ ] Schriftliches Angebot mit Leistungsverzeichnis, Rhythmus, Preis, Laufzeit und Kündigungsfrist
- [ ] Besichtigung oder Fotos vor Grund- und Sonderreinigungen, gemeinsame Abnahme auf Wunsch
- [ ] Schlüssel- und Zugangsregelung wird schriftlich festgehalten
- [ ] Rechnungen je Objekt für Hausverwaltungen
- [ ] Praxisreinigung nach dem Hygieneplan der Praxis
- [ ] Glasreinigung außen nur, soweit sicher erreichbar
- [ ] Privathaushalte nur im Einzelfall

## Google
- [ ] Google-Unternehmensprofil anlegen und um Bewertungen bitten. Sobald es Bewertungen gibt,
      Link, Durchschnitt, Anzahl und drei Bewertungen wörtlich in `src/config.mjs` eintragen.
      Der Abschnitt erscheint dann automatisch auf der Startseite.

## Optional
- [ ] Kontaktformular: Web3Forms-Schlüssel anlegen (siehe README), bis dahin öffnet sich ein E-Mail-Entwurf

## Bewusst nicht behauptet
Keine Bewertungen, Sterne, Jahreszahlen, Teamgröße, Zertifikate, Versicherungssummen, Preise
oder Referenzkunden. Sobald es echte, freigegebene Angaben gibt, können sie ergänzt werden.
