import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { site, updated } from './config.mjs';

// Inhalts-Hash an CSS/JS-Adressen, damit nach jedem Deploy sofort die neue Fassung lädt.
const hash = file => createHash('sha256').update(readFileSync(new URL(`../assets/${file}`, import.meta.url))).digest('hex').slice(0, 10);
const version = { css: hash('site.css'), js: hash('site.js'), init: hash('a11y-init.js') };

export const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const strip = html => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

// Alle Fotos stammen vom Auftraggeber (siehe Bildnachweise). Größen erzeugt scripts/images.py.
export const photos = {
  'buerogebaeude-glasfassade': { w: 1440, h: 960, sizes: [640, 960, 1440], subject: 'Bürogebäude mit Glasfassade', alt: 'Modernes Bürogebäude mit Glasfassade in der Abenddämmerung, im Inneren brennt Licht.' },
  'empfang-koenig-schriftzug': { w: 1440, h: 960, sizes: [640, 960, 1440], subject: 'Empfangswand mit Schriftzug', alt: 'Dunkle Empfangswand mit beleuchtetem Schriftzug König Gebäudereinigung, davor ein glänzender Steinboden.' },
  'bodenreinigung-maschine': { w: 1440, h: 960, sizes: [640, 960, 1440], subject: 'Mitarbeiter bei der Bodenreinigung', alt: 'Mitarbeiter von König Gebäudereinigung reinigt einen Eingangsbereich mit einer Bodenreinigungsmaschine, daneben ein gelbes Warnschild.' },
  'glasfront-flur': { w: 683, h: 442, sizes: [640, 683], subject: 'Flur mit Glasfronten', alt: 'Heller Flur mit raumhohen Glasfronten, Pflanzkübeln und spiegelndem Steinboden.' },
  waschraum: { w: 683, h: 443, sizes: [640, 683], subject: 'Waschraum', alt: 'Gepflegter Waschraum mit Steinwaschtisch, Armaturen, gefalteten Handtüchern und indirektem Licht.' },
  treppenhaus: { w: 683, h: 442, sizes: [640, 683], subject: 'Treppenhaus', alt: 'Sauberes Treppenhaus mit Steinstufen, Metallgeländer und verglaster Eingangstür.' },
  // Unsplash Fotos (Unsplash Lizenz), keine Aufnahmen von König Gebäudereinigung. Nachweis auf der Seite Bildnachweise.
  grossraumbuero: { w: 1440, h: 960, sizes: [640, 960, 1440], subject: 'Großraumbüro', alt: 'Helles Großraumbüro mit weißen Schreibtischen, Bürostühlen und Trennwänden aus Milchglas auf einem hellen Fliesenboden.', credit: { name: 'Adolfo Félix', id: 'PG8NyM_Mcts' } },
  'praxis-behandlungsraum': { w: 1440, h: 960, sizes: [640, 960, 1440], subject: 'Behandlungsraum einer Zahnarztpraxis', alt: 'Heller, aufgeräumter Behandlungsraum einer Zahnarztpraxis mit Behandlungsstuhl, Lampe und weißen Schränken.', credit: { name: 'Kari Bjorn Photography', id: 'Fdku_oMrDvk' } },
  'treppenhaus-altbau': { w: 1440, h: 960, sizes: [640, 960, 1440], subject: 'Treppenhaus im Altbau', alt: 'Treppenhaus in einem Altbau mit rotem Treppenläufer, gedrechseltem Holzgeländer und Tageslicht durch hohe Fenster.', credit: { name: 'Stefan Steinbauer', id: 'hnhE83RhAWg' } },
  'glastueren-buero': { w: 1440, h: 960, sizes: [640, 960, 1440], subject: 'Büroflur mit Glastüren', alt: 'Langer Büroflur zwischen Glaswänden und Glastüren mit schwarzen Rahmen, dahinter eine Sitzecke.', credit: { name: 'Nastuh Abootalebi', id: 'yWwob8kwOCk' } },
  'wischeimer-warnschild': { w: 1440, h: 960, sizes: [640, 960, 1440], subject: 'Wischeimer und Warnschild', alt: 'Gelber Wischeimer mit Mopp und gelbes Warnschild auf einem frisch gewischten, glänzenden Steinboden vor einer Glastürfront.', credit: { name: 'Christian R', id: 'PkFdlMAl85Q' } },
};

export function photo(name, { sizes = '(max-width: 48rem) 100vw, 50vw', priority = false, cls = '', alt } = {}) {
  const p = photos[name];
  if (!p) throw new Error(`Unbekanntes Foto: ${name}`);
  const src = w => `assets/img/${name}-${w}.webp`;
  const fallback = p.sizes.includes(960) ? 960 : p.sizes.at(-1);
  return `<img${cls ? ` class="${cls}"` : ''} src="${src(fallback)}" srcset="${p.sizes.map(w => `${src(w)} ${w}w`).join(', ')}" sizes="${sizes}" width="${p.w}" height="${p.h}" alt="${esc(alt ?? p.alt)}" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

const svg = (d, size = 20) => `<svg class="icon" aria-hidden="true" viewBox="0 0 20 20" width="${size}" height="${size}"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const icons = {
  arrow: svg('M4 10h11m-4.5-4.5L15 10l-4.5 4.5', 18),
  phone: svg('M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3.3 11 9 16.7 15.4 17a1.5 1.5 0 0 0 1.6-1.5v-2l-3.4-1.4-1.6 1.6a9 9 0 0 1-4.7-4.7l1.6-1.6Z', 18),
  mail: svg('M3 5h14v10H3zM3 5l7 6 7-6', 18),
  pin: svg('M10 17s5.5-5 5.5-9a5.5 5.5 0 0 0-11 0c0 4 5.5 9 5.5 9Zm0-7.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z', 18),
  clock: svg('M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm0 3.5V10l2.5 1.8', 18),
  check: svg('M4.5 10.5l3.5 3.5 7.5-8', 18),
};

export const button = (href, label, cls = 'button') => `<a class="${cls}" href="${href}">${label}${icons.arrow}</a>`;
export const call = (cls = 'button outline') => `<a class="${cls}" href="tel:${site.telephone}">${icons.phone}${site.telephoneDisplay}</a>`;

// Seitenkopf der Unterseiten: H1, kurzer Einleitungssatz, optional Foto.
export const pageHead = ({ eyebrow, title, lead, image, pos }) => `<header class="page-head${image ? ' has-image' : ''}">${image ? `<div class="page-head-media"${pos ? ` style="--pos:${pos}"` : ''}>${photo(image, { priority: true, sizes: '100vw', alt: '' })}</div>` : ''}<div class="wrap page-head-inner">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div></header>`;

export const faqList = items => `<div class="faq">${items.map(([q, a]) => `<details><summary><span>${q}</span><span class="plus" aria-hidden="true"></span></summary><div class="answer"><p>${a}</p></div></details>`).join('')}</div>`;
export const checklist = items => `<ul class="checklist">${items.map(i => `<li>${icons.check}<span>${i}</span></li>`).join('')}</ul>`;

export const services = [
  ['bueroreinigung-wuerzburg.html', 'Büroreinigung'],
  ['praxisreinigung-wuerzburg.html', 'Praxisreinigung'],
  ['treppenhausreinigung-wuerzburg.html', 'Treppenhausreinigung'],
  ['glasreinigung-wuerzburg.html', 'Glasreinigung'],
  ['grundreinigung-wuerzburg.html', 'Grund- und Sonderreinigung'],
];
const navItems = [
  ['leistungen.html', 'Leistungen', [['leistungen.html', 'Alle Leistungen'], ...services]],
  ['ablauf.html', 'Ablauf'],
  ['ueber-uns.html', 'Über uns'],
  ['haeufige-fragen.html', 'Häufige Fragen'],
  ['kontakt.html', 'Kontakt'],
];
export const legalItems = [['impressum.html', 'Impressum'], ['datenschutz.html', 'Datenschutz'], ['barrierefreiheit.html', 'Barrierefreiheit'], ['bildnachweise.html', 'Bildnachweise']];

const chevron = '<svg class="chevron" aria-hidden="true" viewBox="0 0 12 12" width="12" height="12"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
function navigation(file) {
  const here = href => href === file ? ' aria-current="page"' : '';
  return navItems.map(([href, text, sub]) => {
    if (!sub) return `<a class="nav-item" href="${href}"${here(href)}>${text}</a>`;
    const id = `unter-${href.replace('.html', '')}`;
    const active = sub.some(([h]) => h === file);
    return `<div class="nav-group${active ? ' is-active' : ''}"><a class="nav-item" href="${href}"${here(href)}>${text}${chevron}</a><button class="sub-toggle" type="button" aria-expanded="false" aria-controls="${id}" hidden><span class="visually-hidden">Unterseiten ${text} anzeigen</span>${chevron}</button><div class="subnav" id="${id}">${sub.map(([h, t]) => `<a href="${h}"${here(h)}>${t}</a>`).join('')}</div></div>`;
  }).join('');
}

const logo = (cls = 'brand') => `<a class="${cls}" href="index.html" aria-label="${site.name}, zur Startseite"><img src="assets/img/logo-100.webp" srcset="assets/img/logo-100.webp 1x, assets/img/logo-200.webp 2x, assets/img/logo-300.webp 3x" width="100" height="56" alt=""></a>`;
const credit = `<p class="credit">Mit <span class="heart" aria-label="Liebe">♥</span> erstellt von <a href="https://www.kernseite.com" title="Webdesign Agentur Würzburg" target="_blank" rel="noopener">KERNSEITE</a> aus Würzburg</p>`;

// Abschluss-Kontaktblock über dem Footer auf jeder Inhaltsseite.
export const contactBlock = (title, text) => `<section class="contact-band" aria-labelledby="abschluss"><div class="wrap contact-band-inner"><div data-reveal><h2 id="abschluss">${title}</h2><p>${text}</p><div class="actions">${button('kontakt.html', 'Angebot anfordern', 'button light')}${call('button outline-light')}</div></div><ul class="contact-facts" data-reveal><li>${icons.phone}<span><strong>Telefon</strong><a href="tel:${site.telephone}">${site.telephoneDisplay}</a></span></li><li>${icons.mail}<span><strong>E-Mail</strong><a href="mailto:${site.email}">${site.email}</a></span></li><li>${icons.clock}<span><strong>Erreichbarkeit</strong>${site.hours}</span></li><li>${icons.pin}<span><strong>Einsatzgebiet</strong>${site.area}</span></li></ul></div></section>`;

const a11yDock = `<div class="a11y" data-a11y>
  <div class="a11y-panel" id="a11y-panel" hidden>
    <div class="a11y-head"><strong>Darstellung anpassen</strong><button type="button" data-a11y-close aria-label="Einstellungen schließen">×</button></div>
    <button type="button" class="a11y-row" data-a11y-contrast aria-pressed="false">Hoher Kontrast</button>
    <fieldset class="a11y-group"><legend>Textgröße</legend><button type="button" class="a11y-choice" data-a11y-size="1" aria-pressed="true">Standard</button><button type="button" class="a11y-choice" data-a11y-size="1.125" aria-pressed="false">Größer</button><button type="button" class="a11y-choice" data-a11y-size="1.25" aria-pressed="false">Sehr groß</button></fieldset>
    <button type="button" class="a11y-row" data-a11y-motion aria-pressed="false">Bewegungen reduzieren</button>
    <button type="button" class="a11y-row a11y-quiet" data-a11y-reset>Einstellungen zurücksetzen</button>
  </div>
  <button type="button" class="a11y-toggle" aria-expanded="false" aria-controls="a11y-panel" aria-label="Darstellung anpassen: Textgröße, Kontrast und Bewegung"><span aria-hidden="true">Aa</span></button>
  <p class="visually-hidden" role="status" aria-live="polite" data-a11y-status></p>
</div>`;

export const cleanPath = file => file === 'index.html' ? '' : file.replace(/\.html$/, '');
export const pageUrl = file => new URL(cleanPath(file), site.url).href;
const trail = (file, page) => [['index.html', 'Startseite'], ...(page.parent ? [page.parent] : []), [file, page.label]];

function schema(file, page) {
  const url = pageUrl(file);
  const id = `${site.url}#unternehmen`;
  const business = {
    '@type': 'LocalBusiness', '@id': id, name: site.name, url: site.url,
    telephone: site.telephone, email: site.email, logo: `${site.url}assets/logo.png`, image: `${site.url}assets/og-image.jpg`,
    description: 'Gebäudereinigung für Büros, Praxen, Studios, Treppenhäuser und Gewerbeflächen in Würzburg und Umgebung.',
    address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.postalCode, addressLocality: site.city, addressRegion: site.region, addressCountry: 'DE' },
    areaServed: { '@type': 'City', name: 'Würzburg' },
    founder: { '@type': 'Person', name: site.owner },
    ...(site.googleProfile ? { sameAs: [site.googleProfile] } : {}),
  };
  const graph = [
    { '@type': 'WebSite', '@id': `${site.url}#website`, url: site.url, name: site.name, inLanguage: 'de-DE', publisher: { '@id': id } },
    business,
    { '@type': 'WebPage', '@id': `${url}#seite`, url, name: page.title, description: page.description, inLanguage: 'de-DE', isPartOf: { '@id': `${site.url}#website` }, dateModified: updated, ...(file !== 'index.html' && file !== '404.html' ? { breadcrumb: { '@id': `${url}#brotkruemel` } } : {}) },
  ];
  if (file !== 'index.html' && file !== '404.html') graph.push({ '@type': 'BreadcrumbList', '@id': `${url}#brotkruemel`, itemListElement: trail(file, page).map(([href, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item: pageUrl(href) })) });
  if (page.faq) graph.push({ '@type': 'FAQPage', '@id': `${url}#fragen`, mainEntity: page.faq.map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) });
  if (page.service) graph.push({ '@type': 'Service', '@id': `${url}#leistung`, name: `${page.service} in Würzburg`, serviceType: page.service, provider: { '@id': id }, areaServed: { '@type': 'City', name: 'Würzburg' }, url });
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c');
}

function breadcrumb(file, page) {
  if (file === 'index.html' || file === '404.html' || page.legal) return '';
  const items = trail(file, page);
  return `<nav class="wrap breadcrumb" aria-label="Brotkrümelnavigation"><ol>${items.map(([href, name], i) => i === items.length - 1 ? `<li><span aria-current="page">${name}</span></li>` : `<li><a href="${href}">${name}</a></li>`).join('')}</ol></nav>`;
}

// Saubere Adressen ohne .html: kontakt statt kontakt.html. Die .htaccess liefert die Datei aus.
const cleanLinks = html => html
  .replaceAll('href="index.html"', 'href="./"')
  .replace(/href="([a-z0-9-]+)\.html(?=[#"])/g, 'href="$1');
// Die 404-Seite wird unter beliebigen Adressen ausgeliefert: dort Pfade ab der Wurzel.
const rootLinks = html => html
  .replace(/(href|src)="(?!https?:|mailto:|tel:|#|\/)([^"]*)"/g, (_, a, v) => `${a}="/${v === './' ? '' : v}"`)
  .replace(/srcset="([^"]+)"/g, (_, v) => `srcset="${v.replace(/(^|,\s*)(?!\/)/g, '$1/')}"`);

export function layout(file, page) {
  const { title, description, content, closing } = page;
  const indexable = site.live && !page.noindex;
  const url = pageUrl(file);
  const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}">
${file === '404.html' ? '' : `<link rel="canonical" href="${url}">\n`}<meta name="theme-color" content="#1c232b">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<script src="assets/a11y-init.js?v=${version.init}"></script>
<link rel="preload" href="assets/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/site.css?v=${version.css}">
<script type="module" src="assets/site.js?v=${version.js}"></script>
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
<script type="application/ld+json">${schema(file, page)}</script>
</head>
<body>
<a class="skip" href="#inhalt">Zum Inhalt springen</a>
<header class="header"><div class="wrap nav">${logo()}<button class="menu" type="button" aria-controls="navigation" aria-expanded="false" hidden><span class="menu-label">Menü</span><span class="menu-icon" aria-hidden="true"><i></i><i></i></span></button><nav class="nav-links" id="navigation" aria-label="Hauptnavigation">${navigation(file)}<a class="button nav-cta" href="kontakt.html">Angebot anfordern</a></nav></div></header>
<main id="inhalt" tabindex="-1">${content.replace('<!--brotkruemel-->', breadcrumb(file, page))}</main>
${closing ? contactBlock(...closing) : ''}
<footer class="footer"><div class="wrap footer-main"><div class="footer-brand">${logo('brand footer-logo')}<p>König Gebäudereinigung reinigt Büros, Praxen, Studios, Treppenhäuser und Gewerbeflächen. Für Unternehmen, Praxen und Hausverwaltungen in Würzburg und Umgebung, persönlich geführt von ${site.owner}.</p></div><nav aria-labelledby="f-leistungen"><h2 id="f-leistungen">Leistungen</h2><ul>${services.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}<li><a href="leistungen.html">Alle Leistungen</a></li></ul></nav><nav aria-labelledby="f-unternehmen"><h2 id="f-unternehmen">Unternehmen</h2><ul><li><a href="ueber-uns.html">Über uns</a></li><li><a href="ablauf.html">Ablauf</a></li><li><a href="haeufige-fragen.html">Häufige Fragen</a></li><li><a href="kontakt.html">Kontakt</a></li></ul></nav><div><h2>Kontakt</h2><address>${site.name}<br>Inhaber ${site.owner}<br>${site.street}<br>${site.postalCode} ${site.city}<br><a href="tel:${site.telephone}">${site.telephoneDisplay}</a><br><a href="mailto:${site.email}">${site.email}</a><br>${site.hours}</address></div></div><div class="footer-bottom"><div class="wrap footer-bottom-inner"><span>© 2026 ${site.name} · ${site.activity}</span><nav class="legal-links" aria-label="Rechtliches">${legalItems.map(([h, t]) => `<a href="${h}"${h === file ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav></div>${credit}</div></footer>
<nav class="mobile-cta" aria-label="Schnellkontakt"><a href="tel:${site.telephone}">${icons.phone}Anrufen</a><a href="kontakt.html">${icons.mail}Angebot anfordern</a></nav>
${a11yDock}
</body>
</html>
`;
  const out = cleanLinks(html);
  return file === '404.html' ? rootLinks(out) : out;
}
