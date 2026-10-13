// Baut alle Seiten als statisches HTML in den Projektordner: node scripts/build.mjs
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pages } from '../src/pages.mjs';
import { legalPages } from '../src/legal.mjs';
import { layout, pageUrl } from '../src/layout.mjs';
import { site, updated } from '../src/config.mjs';

const root = path.resolve(import.meta.dirname, '..');
const all = { ...pages, ...legalPages };
for (const [file, page] of Object.entries(all)) {
  if (!/^[a-z0-9-]+\.html$/.test(file)) throw new Error(`Ungültiger Dateiname: ${file}`);
  await writeFile(path.join(root, file), layout(file, page));
}
// In die Sitemap nur Seiten, die indexiert werden sollen (Rechtsseiten außer Datenschutz nicht).
const urls = Object.entries(all).filter(([file, p]) => !p.noindex && file !== '404.html').map(([file]) => pageUrl(file));
await writeFile(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc><lastmod>${updated}</lastmod></url>`).join('\n')}\n</urlset>\n`);
await writeFile(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', site.url).href}\n`);
console.log(`${Object.keys(all).length} Seiten, sitemap.xml und robots.txt erzeugt.`);
