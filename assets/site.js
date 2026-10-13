// König Gebäudereinigung – Menü, Einblenden, Darstellung anpassen, Anfrageformular.
// Ohne JavaScript bleiben alle Inhalte sichtbar und alle Links nutzbar.
(() => {
  const root = document.documentElement;
  const motionOk = () => !matchMedia('(prefers-reduced-motion: reduce)').matches && root.dataset.motion !== 'reduziert';

  // Mobiles Menü
  const menu = document.querySelector('.menu');
  const nav = document.getElementById('navigation');
  const header = document.querySelector('.header');
  if (menu && nav && header) {
    menu.hidden = false;
    const setOffset = () => root.style.setProperty('--header-bottom', `${Math.max(0, header.getBoundingClientRect().bottom)}px`);
    const toggle = open => {
      menu.setAttribute('aria-expanded', String(open));
      menu.querySelector('.menu-label').textContent = open ? 'Schließen' : 'Menü';
      nav.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) setOffset();
    };
    menu.addEventListener('click', () => toggle(menu.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { toggle(false); menu.focus(); }
    });
    nav.addEventListener('click', e => { if (e.target.closest('a')) toggle(false); });
    matchMedia('(min-width: 1024px)').addEventListener('change', e => { if (e.matches) toggle(false); });
  }

  // Sanftes Einblenden beim Scrollen. Der versteckte Zustand wird erst hier gesetzt.
  const items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && items.length && motionOk()) {
    root.classList.add('reveal-armed');
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach(el => {
      if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-visible');
      else io.observe(el);
    });
  }

  // Darstellung anpassen: Textgröße, Kontrast, Bewegung. Nur lokal im Browser gespeichert.
  const KEY = 'koenig-darstellung';
  const SIZES = [1, 1.125, 1.25];
  const dock = document.querySelector('[data-a11y]');
  if (dock) {
    const read = () => {
      try {
        const s = JSON.parse(localStorage.getItem(KEY)) || {};
        return { size: SIZES.includes(Number(s.size)) ? Number(s.size) : 1, contrast: s.contrast === true, motion: s.motion === true };
      } catch { return { size: 1, contrast: false, motion: false }; }
    };
    let state = read();
    const toggleBtn = dock.querySelector('[data-a11y-toggle]');
    const panel = dock.querySelector('[data-a11y-panel]');
    const status = dock.querySelector('[data-a11y-status]');
    const contrastBtn = dock.querySelector('[data-a11y-contrast]');
    const motionBtn = dock.querySelector('[data-a11y-motion]');
    const sizeBtns = [...dock.querySelectorAll('[data-a11y-size]')];
    const apply = () => {
      if (state.size > 1) root.style.setProperty('--scale', state.size); else root.style.removeProperty('--scale');
      if (state.contrast) root.dataset.contrast = 'hoch'; else delete root.dataset.contrast;
      if (state.motion) { root.dataset.motion = 'reduziert'; root.classList.remove('reveal-armed'); } else delete root.dataset.motion;
      contrastBtn.setAttribute('aria-pressed', String(state.contrast));
      motionBtn.setAttribute('aria-pressed', String(state.motion));
      sizeBtns.forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.a11ySize) === state.size)));
      try {
        if (state.size === 1 && !state.contrast && !state.motion) localStorage.removeItem(KEY);
        else localStorage.setItem(KEY, JSON.stringify(state));
      } catch { /* Speicher gesperrt: Einstellung gilt nur für diesen Seitenaufruf. */ }
    };
    const say = text => { status.textContent = ''; setTimeout(() => { status.textContent = text; }, 50); };
    const open = show => {
      panel.hidden = !show;
      toggleBtn.setAttribute('aria-expanded', String(show));
      if (show) panel.querySelector('button').focus();
    };
    apply();
    toggleBtn.addEventListener('click', () => open(panel.hidden));
    dock.querySelector('[data-a11y-close]').addEventListener('click', () => { open(false); toggleBtn.focus(); });
    dock.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { open(false); toggleBtn.focus(); } });
    document.addEventListener('click', e => { if (!panel.hidden && !dock.contains(e.target)) open(false); });
    sizeBtns.forEach(b => b.addEventListener('click', () => { state.size = Number(b.dataset.a11ySize); apply(); say(`Textgröße: ${b.textContent}`); }));
    contrastBtn.addEventListener('click', () => { state.contrast = !state.contrast; apply(); say(state.contrast ? 'Hoher Kontrast an' : 'Hoher Kontrast aus'); });
    motionBtn.addEventListener('click', () => { state.motion = !state.motion; apply(); say(state.motion ? 'Bewegungen reduziert' : 'Bewegungen wieder an'); });
    dock.querySelector('[data-a11y-reset]').addEventListener('click', () => { state = { size: 1, contrast: false, motion: false }; apply(); say('Darstellung zurückgesetzt'); });
  }

  // Anfrageformular: prüft Pflichtfelder, sendet über Web3Forms oder öffnet einen E-Mail-Entwurf.
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const email = form.dataset.email;
    const key = form.dataset.key;
    const status = form.querySelector('[data-form-status]');
    const labels = { name: 'Name', firma: 'Firma', email: 'E-Mail', telefon: 'Telefon', leistung: 'Leistung', haeufigkeit: 'Häufigkeit', ort: 'Ort des Objekts', flaeche: 'Fläche', nachricht: 'Nachricht' };
    const messages = { name: 'Bitte geben Sie Ihren Namen an.', email: 'Bitte geben Sie eine gültige E-Mail-Adresse an, zum Beispiel name@firma.de.', nachricht: 'Bitte beschreiben Sie kurz Ihr Anliegen.' };
    const clear = field => {
      field.removeAttribute('aria-invalid');
      const err = document.getElementById(`${field.id}-fehler`);
      if (err) err.remove();
      field.setAttribute('aria-describedby', (field.getAttribute('aria-describedby') || '').replace(`${field.id}-fehler`, '').trim());
      if (!field.getAttribute('aria-describedby')) field.removeAttribute('aria-describedby');
    };
    const flag = field => {
      clear(field);
      const p = document.createElement('p');
      p.className = 'field-error';
      p.id = `${field.id}-fehler`;
      p.textContent = messages[field.name];
      field.insertAdjacentElement('afterend', p);
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', `${p.id} ${field.getAttribute('aria-describedby') || ''}`.trim());
    };
    form.querySelectorAll('[required]').forEach(f => f.addEventListener('input', () => { if (f.checkValidity()) clear(f); }));
    const show = (html, error = false) => { status.innerHTML = `<div class="box${error ? ' error' : ''}">${html}</div>`; };
    const body = data => Object.entries(labels).map(([k, l]) => data.get(k) ? `${l}: ${data.get(k)}` : '').filter(Boolean).join('\n');
    const mailto = data => `mailto:${email}?subject=${encodeURIComponent(`Anfrage über die Website${data.get('leistung') ? `: ${data.get('leistung')}` : ''}`)}&body=${encodeURIComponent(body(data))}`;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const invalid = [...form.querySelectorAll('[required]')].filter(f => !f.value.trim() || !f.checkValidity());
      form.querySelectorAll('[required]').forEach(f => (invalid.includes(f) ? flag(f) : clear(f)));
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
      show('<p>Ihre Anfrage wird gesendet …</p>');
      data.set('access_key', key);
      data.append('subject', `Anfrage über die Website${data.get('leistung') ? `: ${data.get('leistung')}` : ''}`);
      data.append('from_name', 'Website König Gebäudereinigung');
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
        status.focus?.();
      }
    });
  }
})();
