// Abnahme-Checkliste aus dem KERNSEITE-Bauplan (Abschnitt 14), soweit automatisch prüfbar.
// Vorher bauen: npm run build && npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { pages } from '../src/pages.mjs';
import { legalPages } from '../src/legal.mjs';
import { site } from '../src/config.mjs';

const root = path.resolve(import.meta.dirname, '..');
const files = Object.keys({ ...pages, ...legalPages });
const html = Object.fromEntries(files.map(f => [f, readFileSync(path.join(root, f), 'utf8')]));
const doc = Object.fromEntries(files.map(f => [f, new JSDOM(html[f]).window.document]));
const content = files.filter(f => f !== '404.html');
const indexable = content.filter(f => !legalPages[f] || f === 'datenschutz.html');
const clean = f => f === 'index.html' ? '' : f.replace(/\.html$/, '');
const words = el => el.textContent.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
const visibleText = d => {
  const c = d.cloneNode(true);
  c.querySelectorAll('script').forEach(s => s.remove());
  return [c.title, c.querySelector('meta[name="description"]')?.content, ...[...c.querySelectorAll('[alt]')].map(i => i.alt), c.body.textContent].join(' ');
};

test('Pflichtseiten vorhanden: Multi-Pager mit Rechtsseiten', () => {
  for (const f of ['index.html', 'leistungen.html', 'ueber-uns.html', 'ablauf.html', 'haeufige-fragen.html', 'kontakt.html', 'impressum.html', 'datenschutz.html', 'barrierefreiheit.html', 'bildnachweise.html', '404.html']) assert.ok(existsSync(path.join(root, f)), f);
  assert.ok(!files.some(f => f.includes('/')), 'Seiten liegen als .html im Hauptordner');
});

test('Keine Gedankenstriche in sichtbaren Texten, Titeln, Beschreibungen und Alt-Texten', () => {
  for (const f of files) {
    const m = visibleText(doc[f]).match(/.{0,30}[–—].{0,30}/);
    assert.equal(m, null, `${f}: ${m?.[0]}`);
    assert.doesNotMatch(html[f], /[–—]/, `${f}: Gedankenstrich im HTML`);
  }
});

test('Titel 50 bis 60 Zeichen, Beschreibung 130 bis 155 Zeichen, eindeutig', () => {
  const t = content.map(f => doc[f].title);
  const d = content.map(f => doc[f].querySelector('meta[name="description"]').content);
  content.forEach((f, i) => {
    assert.ok(t[i].length >= 50 && t[i].length <= 60, `${f}: Titel ${t[i].length} Zeichen: ${t[i]}`);
    assert.ok(d[i].length >= 130 && d[i].length <= 155, `${f}: Beschreibung ${d[i].length} Zeichen`);
  });
  assert.equal(new Set(t).size, t.length, 'doppelte Titel');
  assert.equal(new Set(d).size, d.length, 'doppelte Beschreibungen');
});

test('Genau eine H1, Überschriften ohne Sprünge, Landmarken', () => {
  for (const f of files) {
    const d = doc[f];
    assert.equal(d.querySelectorAll('h1').length, 1, `${f}: Anzahl H1`);
    const levels = [...d.querySelectorAll('main h1, main h2, main h3, main h4')].map(h => Number(h.tagName[1]));
    levels.reduce((a, b) => { assert.ok(b <= a + 1, `${f}: h${a} auf h${b}`); return b; });
    assert.equal(d.documentElement.lang, 'de');
    assert.ok(d.querySelector('header.header') && d.querySelector('footer') && d.querySelector('main#inhalt'), `${f}: Landmarken`);
  }
});

test('Header ohne Infoleiste, Skip-Link zuerst, A11y-Schalter, Agenturnennung', () => {
  for (const f of files) {
    const d = doc[f];
    assert.ok(d.body.firstElementChild.matches('a.skip[href="#inhalt"]'), `${f}: Skip-Link zuerst`);
    assert.ok(d.body.children[1].matches('header.header'), `${f}: Header direkt nach Skip-Link`);
    assert.equal(d.querySelector('.brand').getAttribute('aria-label'), `${site.name}, zur Startseite`);
    const items = d.querySelectorAll('.nav-links > .nav-item, .nav-links > .nav-group > .nav-item');
    assert.ok(items.length >= 4 && items.length <= 6, `${f}: ${items.length} Menüpunkte`);
    assert.ok(d.querySelector('.menu[aria-controls="navigation"][aria-expanded]'), `${f}: Menü-Knopf`);
    assert.ok(d.querySelector('[data-a11y] .a11y-toggle[aria-controls="a11y-panel"]'), `${f}: A11y-Schalter`);
    const credit = d.querySelector('.footer .credit');
    assert.ok(credit && credit.querySelector('a[href="https://www.kernseite.com"]').textContent === 'KERNSEITE', `${f}: Agenturnennung`);
    for (const l of ['Impressum', 'Datenschutz', 'Barrierefreiheit', 'Bildnachweise']) assert.ok([...d.querySelectorAll('.legal-links a')].some(a => a.textContent === l), `${f}: ${l} im Footer`);
    assert.ok(d.querySelector(`.footer address a[href="tel:${site.telephone}"]`) && d.querySelector(`.footer address a[href="mailto:${site.email}"]`), `${f}: Kontakt im Footer`);
  }
});

test('Kontaktblock auf Inhaltsseiten, nicht auf Rechtsseiten', () => {
  for (const f of content) {
    const band = doc[f].querySelector('.contact-band');
    if (legalPages[f]) assert.equal(band, null, `${f}: Kontaktblock auf Rechtsseite`);
    else assert.ok(band?.querySelector(`a[href="tel:${site.telephone}"]`), `${f}: Kontaktblock mit Telefon fehlt`);
  }
});

test('Rechtsseiten: Unternavigation, Inhaltsverzeichnis, Stand, KERNSEITE-Block, noindex', () => {
  for (const f of Object.keys(legalPages)) {
    const d = doc[f];
    assert.ok(d.querySelector('.legal-subnav a[aria-current="page"]'), `${f}: Unternavigation`);
    assert.ok(d.querySelector('.toc details summary') && d.querySelector('.toc-desktop a'), `${f}: Inhaltsverzeichnis`);
    assert.match(d.querySelector('.stand').textContent, /^Stand: /);
    assert.ok(d.querySelector('.legal-credit a[href="https://www.kernseite.com"] strong'), `${f}: Website-Block`);
    assert.ok(d.querySelector('.next a'), `${f}: Weiter-Link`);
    const robots = d.querySelector('meta[name="robots"]').content;
    if (f !== 'datenschutz.html') assert.match(robots, /noindex/, `${f}: noindex`);
  }
  assert.doesNotMatch(html['impressum.html'], /Haftung für (Inhalte|Links)|TMG/);
});

test('Canonical, Open Graph, Favicon, strukturierte Daten ohne aggregateRating', () => {
  for (const f of content) {
    const d = doc[f];
    assert.equal(d.querySelector('link[rel="canonical"]').href, new URL(clean(f), site.url).href);
    assert.ok(d.querySelector('meta[property="og:image"]').content.startsWith('https://'));
    assert.ok(d.querySelector('meta[name="twitter:card"]') && d.querySelector('link[rel="apple-touch-icon"]') && d.querySelector('link[rel="icon"]'));
    const ld = JSON.parse(d.querySelector('script[type="application/ld+json"]').textContent);
    const types = ld['@graph'].map(n => n['@type']);
    assert.ok(types.includes('WebSite') && types.includes('LocalBusiness'), `${f}: JSON-LD`);
    if (f !== 'index.html') assert.ok(types.includes('BreadcrumbList'), `${f}: BreadcrumbList`);
    if (d.querySelector('.faq')) assert.ok(types.includes('FAQPage'), `${f}: FAQPage`);
    assert.doesNotMatch(JSON.stringify(ld), /aggregateRating/);
  }
});

test('Vorschau: noindex auf allen Seiten, solange site.live false ist', () => {
  if (site.live) return;
  for (const f of files) assert.match(doc[f].querySelector('meta[name="robots"]').content, /noindex/, f);
});

test('Saubere Links ohne .html, alle internen Ziele und Anker vorhanden', () => {
  for (const f of files) {
    for (const a of doc[f].querySelectorAll('a[href]')) {
      const href = a.getAttribute('href');
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      assert.doesNotMatch(href, /\.html/, `${f}: ${href}`);
      const [p, hash] = href.split('#');
      const name = p.replace(/^\//, '').replace(/^\.\/?$/, '');
      const target = p === '' ? f : name === '' ? 'index.html' : `${name}.html`;
      assert.ok(existsSync(path.join(root, target)), `${f}: ${href}`);
      if (hash) assert.ok(readFileSync(path.join(root, target), 'utf8').includes(`id="${hash}"`), `${f}: Anker #${hash}`);
    }
  }
});

test('Bilder: Alt-Text, Breite, Höhe, Dateien vorhanden, nur das Startbild mit fetchpriority', () => {
  for (const f of files) {
    const imgs = [...doc[f].querySelectorAll('img')];
    for (const img of imgs) {
      assert.ok(img.hasAttribute('alt') && img.hasAttribute('width') && img.hasAttribute('height'), `${f}: ${img.outerHTML.slice(0, 80)}`);
      for (const src of [img.getAttribute('src'), ...(img.getAttribute('srcset') || '').split(',').map(s => s.trim().split(' ')[0]).filter(Boolean)]) assert.ok(existsSync(path.join(root, src.replace(/^\//, ''))), `${f}: ${src}`);
    }
    assert.ok(doc[f].querySelectorAll('img[fetchpriority="high"]').length <= 1, `${f}: fetchpriority`);
  }
});

test('Inhaltsseiten mit mindestens 500 Wörtern, kein Absatz doppelt', () => {
  const seen = new Map();
  for (const f of indexable.filter(f => !legalPages[f])) {
    const main = doc[f].querySelector('main');
    const min = f === 'kontakt.html' ? 250 : 500;
    assert.ok(words(main) >= min, `${f}: nur ${words(main)} Wörter`);
    for (const p of main.querySelectorAll('p')) {
      const t = p.textContent.replace(/\s+/g, ' ').trim();
      if (t.length < 70) continue;
      assert.ok(!seen.has(t) || seen.get(t) === f, `Absatz doppelt auf ${seen.get(t)} und ${f}: ${t.slice(0, 60)}`);
      seen.set(t, f);
    }
  }
});

test('Keine externen Anfragen beim Laden: Skripte, Styles, Schriften, Bilder, iframes', () => {
  for (const f of files) {
    const d = doc[f];
    for (const el of d.querySelectorAll('script[src], link[href]:not([rel="canonical"]), img, iframe, source, video, audio')) {
      const url = el.getAttribute('src') || el.getAttribute('href') || '';
      assert.ok(!/^(https?:)?\/\//.test(url), `${f}: externe Anfrage ${url}`);
    }
    assert.equal(d.querySelectorAll('script:not([src]):not([type="application/ld+json"])').length, 0, `${f}: Inline-Skript`);
  }
  for (const css of ['assets/site.css']) assert.doesNotMatch(readFileSync(path.join(root, css), 'utf8'), /url\((['"])?https?:/);
});

test('CSS und JS mit Inhalts-Hash, nur die Hauptschrift vorgeladen', () => {
  for (const f of files) {
    const d = doc[f];
    assert.match(d.querySelector('link[rel="stylesheet"]').getAttribute('href'), /site\.css\?v=[0-9a-f]{10}$/);
    assert.match(d.querySelector('script[type="module"]').getAttribute('src'), /site\.js\?v=[0-9a-f]{10}$/);
    const init = d.querySelector('script[src*="a11y-init.js"]');
    assert.ok(init && init.compareDocumentPosition(d.querySelector('link[rel="stylesheet"]')) & 4, `${f}: a11y-init vor CSS`);
    assert.equal(d.querySelectorAll('link[rel="preload"][as="font"]').length, 1);
  }
});

test('Sitemap: indexierbare Seiten ohne Rechtsseiten außer Datenschutz', () => {
  const locs = [...readFileSync(path.join(root, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]).sort();
  assert.deepEqual(locs, indexable.map(f => new URL(clean(f), site.url).href).sort());
  assert.match(readFileSync(path.join(root, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/www\.koenig-gebaeudereinigung\.com\/sitemap\.xml/);
});

test('Bilder als WebP in 640, 960 und 1440 Pixeln, Schriften lokal mit Lizenz', () => {
  const img = readdirSync(path.join(root, 'assets/img'));
  for (const w of [640, 960, 1440]) assert.ok(img.some(n => n.endsWith(`-${w}.webp`)), `${w} px fehlt`);
  assert.ok(existsSync(path.join(root, 'assets/fonts/OFL.txt')));
});
