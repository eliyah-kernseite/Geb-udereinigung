// Baut alle Seiten als statisches HTML in den Projektordner: node scripts/build.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pages } from '../src/pages.mjs';
import { legalPages } from '../src/legal.mjs';
import { layout, pageUrl } from '../src/layout.mjs';
import { updated } from '../src/site.mjs';

const root = path.resolve(import.meta.dirname, '..');
const all = { ...pages, ...legalPages };
for (const [route, page] of Object.entries(all)) {
  if (!/^\/([a-z0-9-]+\/)*([a-z0-9-]+\.html)?$/.test(route)) throw new Error(`Ungültiger Pfad: ${route}`);
  const file = route.endsWith('/') ? path.join(root, route, 'index.html') : path.join(root, route);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, layout(route, page));
}
const urls = Object.entries(all).filter(([, p]) => !p.noindex).map(([route]) => pageUrl(route));
await writeFile(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc><lastmod>${updated}</lastmod></url>`).join('\n')}\n</urlset>\n`);
await writeFile(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${pageUrl('/sitemap.xml')}\n`);
console.log(`${Object.keys(all).length} Seiten, sitemap.xml und robots.txt erzeugt.`);
