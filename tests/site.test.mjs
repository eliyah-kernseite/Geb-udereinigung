// Prüft die erzeugten Seiten auf die Punkte, die Seobility und WCAG bemängeln würden.
// Vorher bauen: npm run build && npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { pages } from '../src/pages.mjs';
import { legalPages } from '../src/legal.mjs';

const root = path.resolve(import.meta.dirname, '..');
const routes = Object.keys({ ...pages, ...legalPages });
const fileOf = route => path.join(root, route.endsWith('/') ? `${route}index.html` : route);
const html = Object.fromEntries(routes.map(r => [r, readFileSync(fileOf(r), 'utf8')]));
const indexable = routes.filter(r => !html[r].includes('noindex'));
const text = s => s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const main = s => s.match(/<main[\s\S]*<\/main>/)[0];
const one = (s, re) => (s.match(re) || [])[1];

test('Titel: vorhanden, eindeutig, höchstens 60 Zeichen', () => {
  const titles = indexable.map(r => one(html[r], /<title>([^<]+)<\/title>/).replaceAll('&amp;', '&'));
  for (const [i, t] of titles.entries()) assert.ok(t.length >= 30 && t.length <= 60, `${indexable[i]}: ${t.length} Zeichen – ${t}`);
  assert.equal(new Set(titles).size, titles.length, 'doppelte Titel');
});

test('Meta-Beschreibung: 120 bis 160 Zeichen, eindeutig', () => {
  const ds = indexable.map(r => one(html[r], /<meta name="description" content="([^"]+)"/).replaceAll('&amp;', '&'));
  for (const [i, d] of ds.entries()) assert.ok(d.length >= 120 && d.length <= 160, `${indexable[i]}: ${d.length} Zeichen`);
  assert.equal(new Set(ds).size, ds.length, 'doppelte Beschreibungen');
});

test('Genau eine H1, keine übersprungenen Überschriftenebenen', () => {
  for (const r of routes) {
    assert.equal((html[r].match(/<h1[\s>]/g) || []).length, 1, `${r}: Anzahl H1`);
    const levels = [...main(html[r]).matchAll(/<h([1-6])[\s>]/g)].map(m => Number(m[1]));
    levels.reduce((prev, cur) => { assert.ok(cur <= prev + 1, `${r}: h${prev} → h${cur}`); return cur; });
  }
});

test('Canonical, Sprache, Viewport, Open Graph und strukturierte Daten', () => {
  for (const r of indexable) {
    const s = html[r];
    assert.match(s, /<html lang="de">/);
    assert.match(s, /<meta name="viewport"/);
    assert.equal(one(s, /<link rel="canonical" href="([^"]+)"/), `https://www.koenig-gebaeudereinigung.com${r}`);
    assert.match(s, /<meta property="og:image" content="https:\/\//);
    JSON.parse(one(s, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/));
  }
});

test('Bilder: Alternativtext, Breite und Höhe, Dateien vorhanden', () => {
  for (const r of routes) {
    for (const [img] of html[r].matchAll(/<img[^>]+>/g)) {
      assert.match(img, /\salt="[^"]*"/, `${r}: alt fehlt: ${img}`);
      assert.match(img, /\swidth="\d+"/, `${r}: width fehlt`);
      assert.match(img, /\sheight="\d+"/, `${r}: height fehlt`);
      const src = one(img, /\ssrc="([^"]+)"/);
      if (!src.startsWith('http')) assert.ok(existsSync(path.resolve(path.dirname(fileOf(r)), src.split('?')[0].replace(/^\//, `${root}/`))), `${r}: ${src}`);
    }
  }
});

test('Interne Links und Anker führen zu vorhandenen Zielen', () => {
  for (const r of routes) {
    const base = path.dirname(fileOf(r));
    for (const [, href] of html[r].matchAll(/href="([^"]+)"/g)) {
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      const [p, hash] = href.split('#');
      const clean = p.split('?')[0];
      let target = clean ? (clean.startsWith('/') ? path.join(root, clean) : path.resolve(base, clean)) : fileOf(r);
      if (!path.extname(target)) target = path.join(target, 'index.html');
      assert.ok(existsSync(target), `${r}: ${href}`);
      if (hash) assert.ok(readFileSync(target, 'utf8').includes(`id="${hash}"`), `${r}: Anker #${hash} fehlt`);
    }
  }
});

test('Genug eigener Text je Inhaltsseite und kein doppelter Absatz', () => {
  const seen = new Map();
  for (const r of indexable) {
    const words = text(main(html[r])).split(' ').length;
    const min = legalPages[r] ? 0 : r === '/kontakt/' ? 250 : 350;
    assert.ok(words >= min, `${r}: nur ${words} Wörter`);
    for (const [, p] of main(html[r]).matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)) {
      const t = text(p);
      if (t.length < 70) continue;
      assert.ok(!seen.has(t) || seen.get(t) === r, `Absatz doppelt auf ${seen.get(t)} und ${r}: ${t.slice(0, 60)}…`);
      seen.set(t, r);
    }
  }
});

test('Keine externen Skripte, Schriften oder Stylesheets', () => {
  for (const r of routes) {
    assert.doesNotMatch(html[r], /<script[^>]+src="https?:/);
    assert.doesNotMatch(html[r], /<link[^>]+rel="stylesheet"[^>]+href="https?:/);
    assert.doesNotMatch(html[r], /fonts\.googleapis|fonts\.gstatic/);
  }
});

test('Sitemap enthält genau die indexierbaren Seiten', () => {
  const sitemap = readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.deepEqual(locs.sort(), indexable.map(r => `https://www.koenig-gebaeudereinigung.com${r}`).sort());
});
