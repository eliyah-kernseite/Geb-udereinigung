// König Gebäudereinigung: Menü, Einblenden beim Scrollen, A11y-Schalter, Anfrageformular.
// Ohne JavaScript bleiben alle Inhalte sichtbar und alle Links nutzbar.
const root = document.documentElement;
const desktop = matchMedia('(min-width: 64rem)');
root.classList.add('js'); // setzt a11y-init.js schon im <head>, hier nur zur Sicherheit

function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobiles Menü: Escape schließt, Fokus bleibt im Menü, Seite scrollt nicht mit.
function initMenu() {
  const menu = document.querySelector('.menu');
  const nav = document.getElementById('navigation');
  if (!menu || !nav) return;
  menu.hidden = false;
  const label = menu.querySelector('.menu-label');
  const isOpen = () => menu.getAttribute('aria-expanded') === 'true';
  const toggle = (open, focusMenu = false) => {
    menu.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Schließen' : 'Menü';
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (open) nav.querySelector('a')?.focus();
    else if (focusMenu) menu.focus();
  };
  menu.addEventListener('click', () => toggle(!isOpen()));
  document.addEventListener('keydown', e => {
    if (!isOpen()) return;
    if (e.key === 'Escape') { toggle(false, true); return; }
    if (e.key !== 'Tab') return;
    const items = [menu, ...nav.querySelectorAll('a, button')].filter(el => el.offsetParent !== null);
    const first = items[0], last = items.at(-1);
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  nav.addEventListener('click', e => { if (e.target.closest('a') && isOpen()) toggle(false); });
  desktop.addEventListener('change', e => { if (e.matches && isOpen()) toggle(false); });

  // Untermenüs mobil aufklappbar
  nav.querySelectorAll('.sub-toggle').forEach(btn => {
    btn.hidden = false;
    const sub = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      sub.classList.toggle('is-open', open);
    });
  });
}

// Sanftes Einblenden. Was beim Laden schon sichtbar ist, erscheint sofort.
function initReveal() {
  const items = [...document.querySelectorAll('[data-reveal]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || root.dataset.a11yMotion === 'reduced';
  if (reduced || !('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('is-visible')); return; }
  items.forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-visible'); });
  root.classList.add('reveal-on');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = [...el.parentElement.children].filter(c => c.hasAttribute('data-reveal'));
      el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 3) * 80}ms`;
      el.classList.add('is-visible');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  items.filter(el => !el.classList.contains('is-visible')).forEach(el => io.observe(el));
}

function initA11y() {
  const dock = document.querySelector('[data-a11y]');
  if (!dock) return;
  const KEY = 'site-a11y', SIZES = [1, 1.125, 1.25];
  const $ = (s) => dock.querySelector(s);
  const panel = $('#a11y-panel'), toggle = $('.a11y-toggle'), status = $('[data-a11y-status]');
  const sizeBtns = [...dock.querySelectorAll('[data-a11y-size]')];
  let state = { size: 1, contrast: false, motion: false };
  try { const s = JSON.parse(localStorage.getItem(KEY) || '{}');
    state = { size: SIZES.includes(+s.size) ? +s.size : 1, contrast: s.contrast === true, motion: s.motion === true };
  } catch {}
  const save = (msg) => {
    root.style.setProperty('--a11y-scale', String(state.size));
    if (state.contrast) root.dataset.a11yContrast = 'high'; else delete root.dataset.a11yContrast;
    if (state.motion) root.dataset.a11yMotion = 'reduced'; else delete root.dataset.a11yMotion;
    if (msg) { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }
    $('[data-a11y-contrast]').setAttribute('aria-pressed', state.contrast);
    $('[data-a11y-motion]').setAttribute('aria-pressed', state.motion);
    sizeBtns.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.a11ySize === state.size));
    if (msg) status.textContent = msg;
  };
  const open = () => { panel.hidden = false; toggle.setAttribute('aria-expanded', 'true'); panel.querySelector('button').focus(); };
  const close = (focus) => { panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); if (focus) toggle.focus(); };
  toggle.addEventListener('click', () => (panel.hidden ? open() : close()));
  $('[data-a11y-close]').addEventListener('click', () => close(true));
  $('[data-a11y-contrast]').addEventListener('click', () => { state.contrast = !state.contrast; save(state.contrast ? 'Hoher Kontrast an.' : 'Hoher Kontrast aus.'); });
  $('[data-a11y-motion]').addEventListener('click', () => { state.motion = !state.motion; save(state.motion ? 'Bewegungen reduziert.' : 'Bewegungen erlaubt.'); });
  sizeBtns.forEach((b) => b.addEventListener('click', () => { state.size = +b.dataset.a11ySize; save(`Textgröße: ${b.textContent.trim()}.`); }));
  $('[data-a11y-reset]').addEventListener('click', () => { state = { size: 1, contrast: false, motion: false }; save('Einstellungen zurückgesetzt.'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(true); });
  document.addEventListener('pointerdown', (e) => { if (!panel.hidden && !dock.contains(e.target)) close(); });
  save();
}

// Anfrageformular: prüft Pflichtfelder, sendet über Web3Forms (wenn ein Schlüssel gesetzt ist)
// oder öffnet einen vorbereiteten E-Mail-Entwurf.
function initForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const { email, key } = form.dataset;
  const status = form.querySelector('[data-form-status]');
  const labels = { name: 'Name', firma: 'Firma', email: 'E-Mail', telefon: 'Telefon', leistung: 'Leistung', haeufigkeit: 'Häufigkeit', ort: 'Ort des Objekts', flaeche: 'Fläche', nachricht: 'Nachricht' };
  const messages = { name: 'Bitte geben Sie Ihren Namen an.', email: 'Bitte geben Sie eine gültige E-Mail-Adresse an, zum Beispiel name@firma.de.', nachricht: 'Bitte beschreiben Sie kurz Ihr Anliegen.' };
  const describedBy = (field, add, remove) => {
    const ids = new Set((field.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
    if (remove) ids.delete(remove);
    if (add) ids.add(add);
    if (ids.size) field.setAttribute('aria-describedby', [...ids].join(' ')); else field.removeAttribute('aria-describedby');
  };
  const clear = field => {
    field.removeAttribute('aria-invalid');
    document.getElementById(`${field.id}-fehler`)?.remove();
    describedBy(field, null, `${field.id}-fehler`);
  };
  const flag = field => {
    clear(field);
    const p = document.createElement('p');
    p.className = 'field-error';
    p.id = `${field.id}-fehler`;
    p.textContent = messages[field.name];
    field.insertAdjacentElement('afterend', p);
    field.setAttribute('aria-invalid', 'true');
    describedBy(field, p.id);
  };
  const required = [...form.querySelectorAll('[required]')];
  required.forEach(f => f.addEventListener('input', () => { if (f.checkValidity()) clear(f); }));
  const show = (html, error = false) => { status.innerHTML = `<div class="box${error ? ' error' : ''}">${html}</div>`; };
  const subject = data => `Anfrage über die Website${data.get('leistung') ? `: ${data.get('leistung')}` : ''}`;
  const body = data => Object.entries(labels).map(([k, l]) => data.get(k) ? `${l}: ${data.get(k)}` : '').filter(Boolean).join('\n');
  const mailto = data => `mailto:${email}?subject=${encodeURIComponent(subject(data))}&body=${encodeURIComponent(body(data))}`;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const invalid = required.filter(f => !f.value.trim() || !f.checkValidity());
    required.forEach(f => (invalid.includes(f) ? flag(f) : clear(f)));
    if (invalid.length) {
      show(`<p>Bitte prüfen Sie ${invalid.length === 1 ? 'das markierte Feld' : `die ${invalid.length} markierten Felder`}.</p>`, true);
      invalid[0].focus();
      return;
    }
    const data = new FormData(form);
    if (data.get('botcheck')) return;
    if (!key) {
      const href = mailto(data);
      show(`<p><strong>Fast geschafft.</strong> Ihr E-Mail-Programm öffnet sich mit Ihrer Anfrage. Bitte senden Sie die E-Mail dort ab.</p><p>Es öffnet sich nichts? <a href="${href.replaceAll('"', '&quot;')}">E-Mail-Entwurf erneut öffnen</a> oder schreiben Sie direkt an <a href="mailto:${email}">${email}</a>.</p>`);
      location.href = href;
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    show('<p>Ihre Anfrage wird gesendet.</p>');
    data.set('access_key', key);
    data.set('subject', subject(data));
    data.set('from_name', 'Website König Gebäudereinigung');
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Fehler');
      form.reset();
      show('<p><strong>Vielen Dank für Ihre Anfrage.</strong> Wir melden uns so bald wie möglich bei Ihnen.</p>');
    } catch {
      show(`<p>Die Anfrage konnte gerade nicht gesendet werden. Bitte <a href="${mailto(data).replaceAll('"', '&quot;')}">senden Sie sie per E-Mail</a> oder rufen Sie uns an.</p>`, true);
    } finally {
      button.disabled = false;
      status.focus();
    }
  });
}

initHeader();
initMenu();
initReveal();
initA11y();
initForm();
