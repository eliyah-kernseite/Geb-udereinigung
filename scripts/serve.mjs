// Lokale Vorschau ohne Zusatzpakete: node scripts/serve.mjs, dann http://localhost:4173/
// Wie die .htaccess: /kontakt liefert kontakt.html aus.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const port = Number(process.env.PORT) || 4173;
const isFile = f => stat(f).then(s => s.isFile(), () => false);
createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(root, path.normalize(p));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  if (p === '/') file = path.join(root, 'index.html');
  else if (!path.extname(file) && await isFile(`${file}.html`)) file = `${file}.html`;
  if (await isFile(file)) {
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }).end(await readFile(file));
  } else {
    res.writeHead(404, { 'Content-Type': types['.html'] }).end(await readFile(path.join(root, '404.html')).catch(() => 'Nicht gefunden'));
  }
}).listen(port, () => console.log(`Vorschau: http://localhost:${port}/`));
