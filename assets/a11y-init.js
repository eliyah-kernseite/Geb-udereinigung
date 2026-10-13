(function () {
  document.documentElement.classList.add('js');
  try {
    var s = JSON.parse(localStorage.getItem('site-a11y') || '{}');
    var r = document.documentElement;
    if ([1, 1.125, 1.25].indexOf(Number(s.size)) > -1) r.style.setProperty('--a11y-scale', String(s.size));
    if (s.contrast === true) r.dataset.a11yContrast = 'high';
    if (s.motion === true) r.dataset.a11yMotion = 'reduced';
  } catch (e) {}
})();
