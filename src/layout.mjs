import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { site, updated } from './site.mjs';

// Inhalts-Hash an CSS/JS-Adressen, damit Browser nach jeder Änderung sofort die neue Datei laden.
const hash = file => createHash('sha256').update(readFileSync(new URL(`../assets/${file}`, import.meta.url))).digest('hex').slice(0, 10);
const version = { css: hash('site.css'), js: hash('site.js') };

export const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const strip = html => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

// Alle Fotos stammen vom Auftraggeber. Größen erzeugt scripts/images.py.
// Alternativtexte beschreiben, was zu sehen ist, nicht was verkauft werden soll.
export const photos = {
  'buerogebaeude-glasfassade': { w: 1536, h: 1024, sizes: [480, 768, 1200, 1536], alt: 'Modernes Bürogebäude mit Glasfassade in der Abenddämmerung, im Inneren brennt Licht.' },
  'empfang-koenig-schriftzug': { w: 1536, h: 1024, sizes: [480, 768, 1200, 1536], alt: 'Dunkle Empfangswand mit beleuchtetem Schriftzug „König Gebäudereinigung“, davor ein glänzender Steinboden.' },
  'glasfront-flur': { w: 683, h: 442, sizes: [480, 683], alt: 'Heller Flur mit raumhohen Glasfronten, Pflanzkübeln und spiegelndem Steinboden.' },
  waschraum: { w: 683, h: 443, sizes: [480, 683], alt: 'Gepflegter Waschraum mit Steinwaschtisch, Armaturen, gefalteten Handtüchern und indirektem Licht.' },
  treppenhaus: { w: 683, h: 442, sizes: [480, 683], alt: 'Sauberes Treppenhaus mit Steinstufen, Metallgeländer und verglaster Eingangstür.' },
  'bueroflaeche-boden': { w: 683, h: 441, sizes: [480, 683], alt: 'Leere, helle Bürofläche mit glattem, frisch gereinigtem Boden und großen Fenstern.' },
  'bodenreinigung-maschine': { w: 1536, h: 1024, sizes: [480, 768, 1200, 1536], alt: 'Mitarbeiter von König Gebäudereinigung reinigt einen Eingangsbereich mit einer Bodenreinigungsmaschine, daneben ein gelbes Warnschild.' },
};

export function photo(name, { sizes = '(max-width: 800px) 100vw, 50vw', priority = false, cls = '', alt } = {}) {
  const p = photos[name];
  if (!p) throw new Error(`Unbekanntes Foto: ${name}`);
  const src = w => `/assets/img/${name}-${w}.webp`;
  const fallback = p.sizes.includes(768) ? 768 : p.sizes.at(-1);
  return `<img${cls ? ` class="${cls}"` : ''} src="${src(fallback)}" srcset="${p.sizes.map(w => `${src(w)} ${w}w`).join(', ')}" sizes="${sizes}" width="${p.w}" height="${p.h}" alt="${esc(alt ?? p.alt)}" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

const svg = (d, size = 20) => `<svg class="icon" aria-hidden="true" viewBox="0 0 20 20" width="${size}" height="${size}"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const icons = {
  arrow: svg('M4 10h11m-4.5-4.5L15 10l-4.5 4.5', 18),
  phone: svg('M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3.3 11 9 16.7 15.4 17a1.5 1.5 0 0 0 1.6-1.5v-2l-3.4-1.4-1.6 1.6a9 9 0 0 1-4.7-4.7l1.6-1.6Z', 18),
  mail: svg('M3 5h14v10H3zM3 5l7 6 7-6', 18),
  pin: svg('M10 17s5.5-5 5.5-9a5.5 5.5 0 0 0-11 0c0 4 5.5 9 5.5 9Zm0-7.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z', 18),
  check: svg('M4.5 10.5l3.5 3.5 7.5-8', 18),
  person: svg('M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 7c.6-3 3-4.5 6-4.5s5.4 1.5 6 4.5', 24),
  calendar: svg('M3.5 5h13v11.5h-13zM3.5 8.5h13M7 3v3.5M13 3v3.5', 24),
  layers: svg('M10 3 3 7l7 4 7-4-7-4ZM3 10.5l7 4 7-4M3 14l7 4 7-4', 24),
  handshake: svg('M2.5 9 6 5.5l3 1.5 3-1.5L17.5 9M6 12l2 2c.6.6 1.4.6 2 0l4-4M4 10.5l2 1.5M16 10.5 13 13', 24),
  shield: svg('M10 2.5 4 5v4.5c0 3.7 2.6 6.6 6 8 3.4-1.4 6-4.3 6-8V5l-6-2.5Z', 24),
  eye: svg('M2 10s3-5.5 8-5.5S18 10 18 10s-3 5.5-8 5.5S2 10 2 10Zm8 2.3a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z', 24),
};

// Verlinkt immer mit sprechendem Ankertext, nie mit „mehr erfahren“.
export const button = (href, label, cls = 'button') => `<a class="${cls}" href="${href}">${label}${icons.arrow}</a>`;
export const call = (cls = 'button ghost') => `<a class="${cls}" href="tel:${site.telephone}">${icons.phone}${site.telephoneDisplay} anrufen</a>`;

export const pageHead = ({ eyebrow, title, lead, image, pos = '50% 50%', actions = true }) => `<header class="page-head${image ? ' has-image' : ''}">${image ? `<div class="page-head-media" style="--pos:${pos}">${photo(image, { priority: true, sizes: '100vw', alt: '' })}</div>` : ''}<div class="wrap page-head-inner">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}${actions ? `<div class="actions">${button('/kontakt/', 'Kostenloses Angebot anfragen')}${call('button ghost-light')}</div>` : ''}</div></header>`;

export const faqList = items => `<div class="faq">${items.map(([q, a]) => `<details><summary><span>${q}</span><span class="plus" aria-hidden="true"></span></summary><div class="answer"><p>${a}</p></div></details>`).join('')}</div>`;

export const checklist = items => `<ul class="checklist">${items.map(i => `<li>${icons.check}<span>${i}</span></li>`).join('')}</ul>`;

// Abschluss jeder Inhaltsseite: eine klare Einladung, alle Kontaktwege.
export const closing = (title, text) => `<section class="contact-band" aria-labelledby="abschluss"><div class="wrap contact-band-inner"><div data-reveal><h2 id="abschluss">${title}</h2><p>${text}</p><div class="actions">${button('/kontakt/', 'Angebot anfragen', 'button')}${call('button ghost-light')}</div></div><ul class="contact-facts" data-reveal><li>${icons.phone}<span><strong>Telefon</strong><a href="tel:${site.telephone}">${site.telephoneDisplay}</a></span></li><li>${icons.mail}<span><strong>E-Mail</strong><a href="mailto:${site.email}">${site.email}</a></span></li><li>${icons.pin}<span><strong>Einsatzgebiet</strong>Würzburg und Umgebung</span></li></ul></div></section>`;

export const services = [
  ['/bueroreinigung-wuerzburg/', 'Büroreinigung'],
  ['/praxisreinigung-wuerzburg/', 'Praxisreinigung'],
  ['/treppenhausreinigung-wuerzburg/', 'Treppenhausreinigung'],
  ['/glasreinigung-wuerzburg/', 'Glasreinigung'],
  ['/grundreinigung-wuerzburg/', 'Grund- und Sonderreinigung'],
];
const navItems = [
  ['/leistungen/', 'Leistungen', [['/leistungen/', 'Alle Leistungen im Überblick'], ...services]],
  ['/ueber-uns/', 'Über uns'],
  ['/haeufige-fragen/', 'Häufige Fragen'],
];
const legalItems = [['/impressum/', 'Impressum'], ['/datenschutz/', 'Datenschutz'], ['/barrierefreiheit/', 'Barrierefreiheit']];

const chevron = '<svg class="chevron" aria-hidden="true" viewBox="0 0 12 12" width="12" height="12"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
function navigation(path) {
  const here = href => href === path ? ' aria-current="page"' : '';
  return navItems.map(([href, text, sub]) => {
    if (!sub) return `<a class="nav-item" href="${href}"${here(href)}>${text}</a>`;
    const active = sub.some(([h]) => h === path);
    return `<div class="nav-group${active ? ' is-active' : ''}"><a class="nav-item" href="${href}"${here(href)}>${text}${chevron}</a><div class="subnav">${sub.map(([h, t]) => `<a href="${h}"${here(h)}>${t}</a>`).join('')}</div></div>`;
  }).join('');
}

const brand = `<a class="brand" href="/"><img src="/assets/img/logo-180.webp" srcset="/assets/img/logo-180.webp 1x, /assets/img/logo-360.webp 2x" width="180" height="100" alt="König Gebäudereinigung – zur Startseite"></a>`;
// Agentur-Hinweis wie auf allen KERNSEITE-Projekten.
const credit = `<p class="credit">Mit <span aria-label="Liebe">♥</span> erstellt von <a href="https://kernseite.com" title="Webdesign Agentur Würzburg" rel="noopener">KERNSEITE</a> aus Würzburg</p>`;

const a11yDock = `<div class="a11y" data-a11y><button type="button" class="a11y-toggle" data-a11y-toggle aria-expanded="false" aria-controls="a11y-panel"><span aria-hidden="true">Aa</span><span class="visually-hidden">Darstellung anpassen: Textgröße, Kontrast und Bewegung</span></button><div class="a11y-panel" id="a11y-panel" data-a11y-panel hidden><div class="a11y-head"><strong>Darstellung anpassen</strong><button type="button" data-a11y-close aria-label="Einstellungen schließen">×</button></div><fieldset><legend>Textgröße</legend><div class="a11y-choices"><button type="button" data-a11y-size="1" aria-pressed="true">Standard</button><button type="button" data-a11y-size="1.125" aria-pressed="false">Größer</button><button type="button" data-a11y-size="1.25" aria-pressed="false">Sehr groß</button></div></fieldset><button type="button" class="a11y-row" data-a11y-contrast aria-pressed="false">Hoher Kontrast</button><button type="button" class="a11y-row" data-a11y-motion aria-pressed="false">Bewegungen reduzieren</button><button type="button" class="a11y-row quiet" data-a11y-reset>Einstellungen zurücksetzen</button></div><p class="visually-hidden" role="status" aria-live="polite" data-a11y-status></p></div>`;

export const pageUrl = path => new URL(path, site.url).href;
const trail = (path, page) => [['/', 'Startseite'], ...(page.parent ? [page.parent] : []), [path, page.label]];

function schema(path, page) {
  const url = pageUrl(path);
  const id = `${site.url}#unternehmen`;
  const business = {
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'], '@id': id, name: site.name, url: site.url,
    telephone: site.telephone, email: site.email, logo: `${site.url}assets/logo.png`, image: `${site.url}assets/og-image.jpg`,
    description: 'Gebäudereinigung für Büros, Praxen, Studios, Treppenhäuser und Gewerbeflächen in Würzburg und Umgebung.',
    address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.postalCode, addressLocality: site.city, addressRegion: site.region, addressCountry: 'DE' },
    areaServed: { '@type': 'City', name: 'Würzburg' },
    founder: { '@type': 'Person', name: site.owner },
    knowsLanguage: 'de',
  };
  const graph = [
    { '@type': 'WebSite', '@id': `${site.url}#website`, url: site.url, name: site.name, inLanguage: 'de-DE', publisher: { '@id': id } },
    business,
    { '@type': 'WebPage', '@id': `${url}#seite`, url, name: page.title, description: page.description, inLanguage: 'de-DE', isPartOf: { '@id': `${site.url}#website` }, about: { '@id': id }, dateModified: updated, ...(path !== '/' ? { breadcrumb: { '@id': `${url}#brotkruemel` } } : {}) },
  ];
  if (path !== '/') graph.push({ '@type': 'BreadcrumbList', '@id': `${url}#brotkruemel`, itemListElement: trail(path, page).map(([href, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item: pageUrl(href) })) });
  if (page.faq) graph.push({ '@type': 'FAQPage', '@id': `${url}#fragen`, mainEntity: page.faq.map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) });
  if (page.service) graph.push({ '@type': 'Service', '@id': `${url}#leistung`, name: page.service, serviceType: page.service, provider: { '@id': id }, areaServed: { '@type': 'City', name: 'Würzburg' }, url });
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c');
}

function breadcrumb(path, page) {
  if (path === '/' || page.noindex) return '';
  const items = trail(path, page);
  return `<nav class="wrap breadcrumb" aria-label="Brotkrümelnavigation"><ol>${items.map(([href, name], i) => i === items.length - 1 ? `<li><span aria-current="page">${name}</span></li>` : `<li><a href="${href}">${name}</a></li>`).join('')}</ol></nav>`;
}

// Alle internen Adressen werden als /pfad/ geschrieben und hier in relative Pfade
// umgewandelt. So läuft dieselbe Ausgabe unter der eigenen Domain und in einer
// GitHub-Pages-Vorschau mit Unterordner.
function relativize(html, path, absolute) {
  if (absolute) return html;
  const depth = path.split('/').filter(Boolean).length;
  const base = depth ? '../'.repeat(depth) : './';
  return html
    .replace(/(href|src)="\/(?!\/)/g, `$1="${base}`)
    .replace(/srcset="([^"]+)"/g, (_, v) => `srcset="${v.replace(/(^|,\s*)\/(?!\/)/g, `$1${base}`)}"`);
}

export function layout(path, page) {
  const { title, description, content, noindex = false } = page;
  const url = pageUrl(path);
  const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
${noindex ? '' : `<link rel="canonical" href="${url}">\n`}<meta name="theme-color" content="#11151c">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/playfair-display-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css?v=${version.css}">
<script>document.documentElement.classList.add('js');try{var a=JSON.parse(localStorage.getItem('koenig-darstellung'));if(a){var r=document.documentElement;if(a.size>1)r.style.setProperty('--scale',a.size);if(a.contrast)r.dataset.contrast='hoch';if(a.motion)r.dataset.motion='reduziert'}}catch(e){}</script>
<script src="/assets/site.js?v=${version.js}" defer></script>
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}assets/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Logo von König Gebäudereinigung vor einem Bürogebäude in der Dämmerung">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${schema(path, page)}</script>
</head>
<body>
<a class="skip" href="#inhalt">Zum Inhalt springen</a>
<aside class="topbar" aria-label="Schnellkontakt"><div class="wrap topbar-inner"><p>Gebäudereinigung in Würzburg und Umgebung</p><ul><li><a href="tel:${site.telephone}">${icons.phone}${site.telephoneDisplay}</a></li><li><a href="mailto:${site.email}">${icons.mail}${site.email}</a></li></ul></div></aside>
<header class="header"><div class="wrap nav">${brand}<button class="menu" type="button" aria-controls="navigation" aria-expanded="false" hidden><span class="menu-label">Menü</span><span class="menu-icon" aria-hidden="true"><i></i><i></i></span></button><nav class="nav-links" id="navigation" aria-label="Hauptnavigation">${navigation(path)}<a class="button small nav-cta" href="/kontakt/"${path === '/kontakt/' ? ' aria-current="page"' : ''}>Angebot anfragen</a></nav></div></header>
<main id="inhalt" tabindex="-1">${content.replace('<!--brotkruemel-->', breadcrumb(path, page))}</main>
<footer class="footer"><div class="wrap footer-main"><div class="footer-brand">${brand}<p>Gebäudereinigung für Büros, Praxen, Studios, Treppenhäuser und Gewerbeflächen in Würzburg und Umgebung. Persönlich geführt von ${site.owner}.</p></div><nav aria-label="Leistungen"><h2>Leistungen</h2><ul>${services.map(([h, t]) => `<li><a href="${h}">${t} Würzburg</a></li>`).join('')}<li><a href="/leistungen/">Alle Leistungen</a></li></ul></nav><nav aria-label="Unternehmen"><h2>Unternehmen</h2><ul><li><a href="/ueber-uns/">Über uns</a></li><li><a href="/haeufige-fragen/">Häufige Fragen</a></li><li><a href="/kontakt/">Kontakt und Anfrage</a></li></ul></nav><div><h2>Kontakt</h2><address>${site.name}<br>Inhaber ${site.owner}<br>${site.street}<br>${site.postalCode} ${site.city}</address><p><a href="tel:${site.telephone}">${site.telephoneDisplay}</a><br><a href="mailto:${site.email}">${site.email}</a></p></div></div><div class="footer-bottom"><div class="wrap footer-bottom-inner"><span>© 2026 ${site.name} · Inhaber ${site.owner}</span><nav class="legal-links" aria-label="Rechtliches">${legalItems.map(([h, t]) => `<a href="${h}"${here(path, h)}>${t}</a>`).join('')}</nav></div>${credit}</div></footer>
<nav class="mobile-cta" aria-label="Kontakt aufnehmen"><a href="tel:${site.telephone}">${icons.phone}Anrufen</a><a href="/kontakt/">${icons.mail}Anfrage</a></nav>
${a11yDock}
</body>
</html>
`;
  return relativize(html, path, page.absolute);
}
const here = (path, href) => path === href ? ' aria-current="page"' : '';
